import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Activity } from './types';



type Props = {
    activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
    return (
        <Card sx={{ marginBottom: 2, background: 'linear-gradient(135deg, #e0f7fa 0%, #3399FF 100%)'}}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://via.placeholder.com/300x140" // Optional: Replace with actual image
                title={activity.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {activity.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Status: {activity.isCompleted ? 'Done' : 'Pending'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'blue' }}>
                    {activity.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}