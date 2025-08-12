import React from "react";
import { Grid } from "@mui/material";
import ActivityCard from "./activityCard";
import { type Activity } from "./types";

type ActivityListProps = {
    activities: Activity[];
    onCardClick: (activity: Activity) => void;
};

export default function ActivityList({ activities, onCardClick }: ActivityListProps) {
    return (
        <Grid size={8}>
            {activities.map((activity) => (
                <div key={activity.id} onClick={() => onCardClick(activity)}>
                    <ActivityCard activity={activity} />
                </div>
            ))}
        </Grid>
    );
}
