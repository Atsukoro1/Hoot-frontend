import { Tabs, Tab, Box, Avatar, Typography, Paper, Button, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios";

import { IHoot, IUser } from "../interfaces/app.interfaces";

import HootsTab from "../components/HootsTab";
import FollowingTab from "../components/FollowingTab";
import FollowersTab from "../components/FollowersTab";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const ProfilePage = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [user, setUser] = useState<IUser | null>(null);
    const [hoots, setHoots] = useState<IHoot[] | object>([]);
    const [followers, setFollowers] = useState<object>([]);
    const [following, setFollowing] = useState<object>([]);

    // Runs on page component load
    useEffect(() => {
        async function load() {
            const response = await axiosInstance.get("/api/user/profile?id=61fd0e5f845eb1dfce7416d1");
            
            if(response.data.success) {
                setHoots(response.data.data.hoots);
                setUser(response.data.data.user);
            }
        }

        load();
    }, []);

    // Runs when user clicks on tab
    const changeTab = (event : React.SyntheticEvent<unknown>, value : number) => {
        setTabValue(value);
    }

    // Runs when user clicks the following tab
    // This function is fetching all following if not fetched already
    const fetchFollowing = () => {
        if(following) return;


    };

    // Runs when user clicks the followers tab
    // This function is fetching all followers if not fetched already
    const fetchFollowers = () => {
        if(followers) return;


    };

    return (
        <Paper variant="elevation" elevation={10} sx={{ width: 400, marginLeft: "auto", marginRight: "auto", padding: 3, backgroundColor: "#273345" }}>
            <Avatar sx={{ height: "70px", width: "70px", borderRadius: 5, marginLeft: "auto", marginRight: "auto" }}>{ user && user.username.slice(0, 1) }</Avatar>
            <Typography sx={{ color: "primary.main", textAlign: "center" }} variant="h6">Atsukoro</Typography>
            <Typography sx={{ width: "200px", marginLeft: "auto", marginRight: "auto", marginBottom: 1.5, color: "white", textAlign: "center" }} variant="body2">{ user && user.bio }</Typography>

            <Grid container sx={{ width: "fit-content", marginLeft: "auto", marginRight: "auto", marginBottom: 3 }}>
                <Grid sx={{ marginRight: 2 }} item>
                    <Button variant="contained">
                        Follow
                    </Button>
                </Grid>

                <Grid item>
                    <Button variant="contained">
                        Block
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ marginBottom: 2, width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                <Tabs sx={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }} onChange={changeTab} scrollButtons={false} aria-label="tabs" variant="scrollable" value={tabValue}>    
                    <Tab disableRipple disableFocusRipple label="Hoots"/>
                    <Tab onClick={fetchFollowers} disableRipple disableFocusRipple label="Followers"/>
                    <Tab onClick={fetchFollowing} disableRipple disableFocusRipple label="Following"/>
                </Tabs>

                <div style={{ marginTop: 25 }}>
                    { tabValue === 0 && <HootsTab hoots={hoots}/> }
                    { tabValue === 1 && <FollowersTab followers={followers}/> }
                    { tabValue === 2 && <FollowingTab followers={following}/> }
                </div>
            </Box>
        </Paper>
    )
}

export default ProfilePage