import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Activity } from "./types";

type Props = { onSubmit: () => void };

function generateGuid() {
    return crypto.randomUUID(); // works in modern browsers
}

export default function NewActivityForm({ onSubmit }: Props) {
    const queryClient = useQueryClient();

    const addActivityMutation = useMutation({
        mutationFn: async (newActivity: Activity) => {
            const res = await fetch("https://localhost:7050/Activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newActivity),
            });
            if (!res.ok) throw new Error("Failed to add activity");
            return res.json();
        },
        onSuccess: (data) => {
            // Update the cached list without refetching
            queryClient.setQueryData<Activity[]>(["activities"], (old = []) => [...old, data]);
            onSubmit(); // Notify parent if needed
        },
    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = () => {
        const newActivity: Activity = {
            id: generateGuid(),
            title,
            description,
            isCompleted,
        };

        addActivityMutation.mutate(newActivity);

        // Reset form
        setTitle("");
        setDescription("");
        setIsCompleted(false);
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #e0f7fa 0%, #3399FF 100%)",
                padding: 2,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" sx={{ color: "black" }}>
                Create New Activity
            </Typography>
            <TextField
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
                multiline
                rows={3}
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isCompleted}
                            onChange={(e) => setIsCompleted(e.target.checked)}
                        />
                    }
                    label="Is Completed"
                    sx={{ color: "black" }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={addActivityMutation.isPending}
                    sx={{ bgcolor: "chocolate" }}>
                    {addActivityMutation.isPending ? "Saving..." : "Submit"}
                </Button>
            </Box>
        </Box>
    );
}
