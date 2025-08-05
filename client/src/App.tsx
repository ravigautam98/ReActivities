import { useEffect, useState } from 'react'
import './App.css'
import { Typography } from '@mui/material'
import ButtonAppBar from './navbar'
import ActivityCard from './activityCard'

type Activity = {
    id: string
    title: string
    isCompleted: boolean
    description : string
}

function App() {
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        fetch('https://localhost:7050/Activity') 
            .then(response => response.json())
            .then(data => setActivities(data))
            .catch(err => console.error("Error fetching activities", err))
    }, [])

    return (
        <>
            <ButtonAppBar />
            <div style={{ padding : "1rem" }}>
            <Typography variant="h4"> Hello, We are stating are activity now...</Typography>
            <h1>Activities List</h1>
                {activities.map((activity) => (<ActivityCard key={activity.id} activity={activity} />))}
            </div>
        </>
    )
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