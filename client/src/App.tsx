import { useEffect, useState } from 'react'
import './App.css'
import { Typography } from '@mui/material'
import ButtonAppBar from './navbar'

type Activity = {
    id: string
    title: string
    isCompleted: boolean
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
            <ButtonAppBar ></ButtonAppBar><>
            <Typography> Hello, We are stating are activity now...</Typography>
            <h1>Activities List</h1>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id} style={{ textAlign: "left" }}>
                        <strong>{activity.title}</strong> -
                        <span className={activity.isCompleted ? 'status-done' : 'status-pending'}>
                            {activity.isCompleted ? 'Done' : 'Pending'}
                        </span>
                    </li>
                ))}
            </ul>
        </></>
    )
}

export default App

