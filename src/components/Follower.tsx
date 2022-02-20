import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import Grid from "@mui/material/Grid"

const Follower = ({ _id, username, createdAt } : any) => {
    return (
    <a style={{ textDecoration: "none" }} href={"/profile?id=" + _id}>
        <Paper sx={{ padding: 1.5, marginBottom: 2 }} variant="elevation" elevation={5}>
            <Grid container spacing={2}>
                <Grid item>
                    <Avatar>{ username[0] }</Avatar>
                </Grid>

                <Grid item>
                    <Typography variant="body2">{ username }</Typography>
                    <Typography color="text.secondary" variant="caption">Since { new Date(createdAt).toDateString() }</Typography>
                </Grid>
            </Grid>
        </Paper>
    </a>
    )
}

export default Follower