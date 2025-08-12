import React from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";

type Props = { onSubmit: () => void };

export default function NewActivityForm({ onSubmit }: Props) {
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
            <TextField fullWidth label="Title" sx={{ mb: 2 }} />
            <TextField fullWidth label="Description" multiline rows={3} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel control={<Checkbox />} label="Is Completed" sx={{ color: "black" }} />
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" onClick={onSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
