import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Activity } from './types';
import { useMutation, useQueryClient } from '@tanstack/react-query';



type Props = {
    activity: Activity;
    EditActivity: (activity: Activity) => void;
};

export default function ActivityCard({ activity, EditActivity }: Props) {

    const queryClient = useQueryClient();

    const deleteActivityMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`https://localhost:7050/Activity/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Delete failed");
            return res.json();
        },
        onSuccess: (data, id) => {
            queryClient.setQueryData<Activity[]>(["activities"], (old = []) =>
                old.filter(a => a.id !== id)
            );
            //onSubmit();
        }
    });

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
                <Button size="small" onClick={(e) => {
                    e.stopPropagation(); 
                    console.log("Edit clicked:", activity);
                    EditActivity(activity);
                }}>Edit</Button>
                <Button size="small" onClick={(e) => { e.stopPropagation(); deleteActivityMutation.mutate(activity.id) }}>Delete</Button>
            </CardActions>
        </Card>
    );
}