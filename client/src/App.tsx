import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ActivityList from './ActivityLists';
import ActivityDetails from './activityDetails';
import NewActivityForm from './activityForm';
import ButtonAppBar from './navbar';
import type { Activity } from './types';

export default function App() {
    const [showNewForm, setShowNewForm] = useState(false);
    const [selectedActivity, setSelectedActivity] = React.useState<Activity | null>(null);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

    //Fetching data using axios and react query
    const { data: activities = [], isLoading, error } = useQuery<Activity[]>({
        queryKey: ['activities'], // cache key
        queryFn: async () => {
            const res = await fetch('https://localhost:7050/Activity');
            if (!res.ok) throw new Error('Failed to fetch activities');
            return res.json();
        },
    });

    if (isLoading) return <Typography>Loading activities...</Typography>;
    if (error instanceof Error) return <Typography color="error">{error.message}</Typography>;


    //const handleNewActivityClick = () => {
    //    setShowNewForm(true);
    //};

    //const handleCardClick = (activity: React.SetStateAction<Activity | null>) => {
    //    setSelectedActivity(activity);
    //};

    return (
        <>
            <ButtonAppBar onNewActivity={() => setShowNewForm(true)} />
            <Box sx={{ padding: '1rem' }}>
                <Typography variant="h4">Hello, We are starting our activity now...</Typography>
                <Grid container spacing={2}>
                    {/* Left: 8/12 for activity cards */}
                    <ActivityList
                        activities={activities}
                        onCardClick={setSelectedActivity}             // click card -> show details
                        onEditClick={(activity) => {                  // click edit -> open form
                            setEditingActivity(activity);
                            setShowNewForm(true);
                        }}
                    />


                    {/* Right: 4/12 for details */}
                    <Grid size={4}>
                        <ActivityDetails selectedActivity={selectedActivity} EditActivity={(activity) => {
                            setEditingActivity(activity);
                            setShowNewForm(true);
                        }} />
                        <Box sx={{ marginTop: 2 }}>
                            {showNewForm && <NewActivityForm onSubmit={() => setShowNewForm(false)} selectedActivity={editingActivity} />}
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}





//<ul>
//    {activities.map(activity => (
//        <li key={activity.id} style={{ textAlign: "left" }}>
//            <strong>{activity.title}</strong> -
//            <span className={activity.isCompleted ? 'status-done' : 'status-pending'}>
//                {activity.isCompleted ? 'Done' : 'Pending'}
//            </span>
//        </li>
//    ))}
//</ul>