import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Activity = {
    id: string;
    title: string;
    isCompleted: boolean; 
    description: string;
};

type Props = {
    activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
    return (
        <Card sx={{ marginBottom: 2, bgcolor: "azure", maxWidth : 400 }}>
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