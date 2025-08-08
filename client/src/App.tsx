import { useEffect, useState } from 'react'
import './App.css'
import { Box, Typography } from '@mui/material'
import ButtonAppBar from './navbar'
import ActivityCard from './activityCard'
import Grid  from '@mui/material/Grid';

type Activity = {
    id: string
    title: string
    isCompleted: boolean
    description : string
}

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    useEffect(() => {
        fetch('https://localhost:7050/Activity')
            .then(response => response.json())
            .then(data => setActivities(data))
            .catch(err => console.error("Error fetching activities", err));
    }, []);

    return (
        <>
            <ButtonAppBar />
            <Box sx={{ padding: "1rem" }}>
                <Typography variant="h4">Hello, We are starting our activity now...</Typography>
                <Grid container spacing={2}>
                    {/* Left: 7/12 for activity cards */}
                    <Grid size={8}>
                        {/*<Typography variant="h5">Activities List</Typography>*/}
                        {activities.map((activity) => (
                            <div key={activity.id} onClick={() => setSelectedActivity(activity)}>
                                <ActivityCard activity={activity} />
                            </div>
                        ))}
                    </Grid>

                    {/* Right: 5/12 for details */}
                    <Grid size={4}>
                        {selectedActivity ? (
                            <Box sx={{ bgcolor: "azure" ,padding: 2, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ color: 'primary.main' }}>Activity Details</Typography>
                                <Typography sx={{ color: 'text.primary' }}>
                                    <strong>Title:</strong> {selectedActivity.title}
                                </Typography>
                                <Typography sx={{ color: 'green' }}>
                                    <strong>Status:</strong> {selectedActivity.isCompleted ? "Done" : "Pending"}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    <strong>Id:</strong> {selectedActivity.id}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    <strong>Description:</strong> {selectedActivity.description}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body1" color="error">
                                Click on a card to view activity details.
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}


export default App

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