import { Box, Typography } from "@mui/material";
import type { Activity } from "./types";

type Props = { selectedActivity: Activity | null };

export default function ActivityDetails({ selectedActivity }: Props) {
    if (!selectedActivity) {
        return (
            <Typography variant="body1" color="error">
                Click on a card to view activity details.
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #e0f7fa 0%, #3399FF 100%)",
                padding: 2,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" sx={{ color: "primary.main" }}>
                Activity Details
            </Typography>
            <Typography sx={{ color: "text.primary" }}>
                <strong>Title:</strong> {selectedActivity.title}
            </Typography>
            <Typography sx={{ color: "green" }}>
                <strong>Status:</strong>{" "}
                {selectedActivity.isCompleted ? "Done" : "Pending"}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                <strong>Id:</strong> {selectedActivity.id}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                <strong>Description:</strong> {selectedActivity.description}
            </Typography>
        </Box>
    );
}
