import { Paper, Typography, Avatar, Grid } from "@mui/material"

const Follower = ({ _id, username } : any) => {
    return (
    <Paper sx={{ padding: 1.5, marginBottom: 2 }} variant="elevation" elevation={5}>
        <Grid container spacing={2}>
            <Grid item>
                <Avatar>{ username[0] }</Avatar>
            </Grid>

            <Grid item>
                <Typography variant="body2">{ username }</Typography>
            </Grid>
        </Grid>
    </Paper>
    )
}

export default Follower