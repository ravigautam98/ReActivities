import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Activity } from "./types";

import { useEffect } from "react";

type Props = {
    onSubmit: () => void;
    selectedActivity?: Activity | null;
};


function generateGuid() {
    return crypto.randomUUID(); // works in modern browsers
}


export default function NewActivityForm({ onSubmit, selectedActivity }: Props) {

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

    const editActivityMutation = useMutation({
        mutationFn: async (updated: Activity) => {
            const res = await fetch("https://localhost:7050/Activity", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData<Activity[]>(["activities"], (old = []) =>
                old.map(a => a.id === data.id ? data : a)
            );
            onSubmit();
        }
    });



    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (selectedActivity) {
            setTitle(selectedActivity.title);
            setDescription(selectedActivity.description);
            setIsCompleted(selectedActivity.isCompleted);
        }
    }, [selectedActivity]);

    const handleSubmit = () => {
        const activity: Activity = {
            id: selectedActivity?.id ?? generateGuid(),
            title,
            description,
            isCompleted,
        };

        if (selectedActivity) {
            editActivityMutation.mutate(activity);
        } else {
            addActivityMutation.mutate(activity);
        }

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
