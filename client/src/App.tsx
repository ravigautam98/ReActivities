import { useQuery } from '@tanstack/react-query';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import ButtonAppBar from './navbar';
import ActivityCard from './activityCard';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';

type Activity = {
    id: string;
    title: string;
    isCompleted: boolean;
    description: string;
};

export default function App() {
    const [showNewForm, setShowNewForm] = useState(false);
    const [selectedActivity, setSelectedActivity] = React.useState<Activity | null>(null);

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


    const handleNewActivityClick = () => {
        setShowNewForm(true);
    };

    const handleCardClick = (activity: React.SetStateAction<Activity | null>) => {
        setSelectedActivity(activity);
    };

    return (
        <>
            <ButtonAppBar onNewActivity={handleNewActivityClick} />
            <Box sx={{ padding: '1rem' }}>
                <Typography variant="h4">Hello, We are starting our activity now...</Typography>
                <Grid container spacing={2}>
                    {/* Left: 8/12 for activity cards */}
                    <Grid size={8}>
                        {activities.map((activity) => (
                            <div key={activity.id} onClick={() => handleCardClick(activity)}>
                                <ActivityCard activity={activity} />
                            </div>
                        ))}
                    </Grid>

                    {/* Right: 4/12 for details */}
                    <Grid size={4}>
                        {/*{selectedActivity ? (*/}
                        {/*    <Box sx={{ bgcolor: 'azure', padding: 2, borderRadius: 2 }}>*/}
                        {/*        <Typography variant="h6" sx={{ color: 'primary.main' }}>*/}
                        {/*            Activity Details*/}
                        {/*        </Typography>*/}
                        {/*        <Typography sx={{ color: 'text.primary' }}>*/}
                        {/*            <strong>Title:</strong> {selectedActivity.title}*/}
                        {/*        </Typography>*/}
                        {/*        <Typography sx={{ color: 'green' }}>*/}
                        {/*            <strong>Status:</strong> {selectedActivity.isCompleted ? 'Done' : 'Pending'}*/}
                        {/*        </Typography>*/}
                        {/*        <Typography sx={{ color: 'text.secondary' }}>*/}
                        {/*            <strong>Id:</strong> {selectedActivity.id}*/}
                        {/*        </Typography>*/}
                        {/*        <Typography sx={{ color: 'text.secondary' }}>*/}
                        {/*            <strong>Description:</strong> {selectedActivity.description}*/}
                        {/*        </Typography>*/}
                        {/*    </Box>*/}
                        {/*) : (*/}
                        {/*    <Typography variant="body1" color="error">*/}
                        {/*        Click on a card to view activity details.*/}
                        {/*    </Typography>*/}
                        {/*)}*/}

                        { selectedActivity ? (
                            <Box  sx={{
                                background: 'linear-gradient(135deg, #e0f7fa 0%, #3399FF 100%)', padding: 2, borderRadius: 2 }}>
                                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                                            Activity Details
                                        </Typography>
                                        <Typography sx={{ color: 'text.primary' }}>
                                            <strong>Title:</strong> {selectedActivity.title}
                                        </Typography>
                                        <Typography sx={{ color: 'green' }}>
                                            <strong>Status:</strong> {selectedActivity.isCompleted ? 'Done' : 'Pending'}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            <strong>Id:</strong> {selectedActivity.id}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            <strong>Description:</strong> {selectedActivity.description}
                                        </Typography>
                            </Box>
                                  )  : (
                                <Typography variant="body1" color="error">
                                    Click on a card to view activity details.
                                </Typography>
                            )}
                            

                        {showNewForm && (
                            <Box sx={{
                                background: 'linear-gradient(135deg, #e0f7fa 0%, #3399FF 100%)', padding: 2, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ color: 'black' }}>Create New Activity</Typography>
                                {/* Your form here */}
                                <TextField fullWidth label="Title" sx={{ mb: 2 }} />
                                <TextField fullWidth label="Description" multiline rows={3} sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Is Completed"
                                        sx={{ color: 'black' }}
                                    />
                                    <Box sx={{ flexGrow: 1 }} /> {/* pushes button to the right */}
                                    <Button variant="contained">Submit</Button>
                                </Box>
                            </Box>
                        )}
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