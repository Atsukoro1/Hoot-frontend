import { Tabs, Tab, Box, Avatar, Typography, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios";

import { IHoot } from "../interfaces/app.interfaces";

import HootsTab from "../components/HootsTab";
import FollowingTab from "../components/FollowingTab";
import FollowersTab from "../components/FollowersTab";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const ProfilePage = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [hoots, setHoots] = useState<IHoot[] | object>([]);
    const [followers, setFollowers] = useState<object>([]);
    const [following, setFollowing] = useState<object>([]);

    // Runs on page component load
    useEffect(() => {
        async function load() {
            const response = await axiosInstance.get("/api/user/profile?id=61fd0e5f845eb1dfce7416d1");
            
            if(response.data.success) {
                setHoots(response.data.data.hoots);
            }
        }

        load();
    }, []);

    // Runs when user clicks on tab
    const changeTab = (event : React.SyntheticEvent<unknown>, value : number) => {
        setTabValue(value);
    }

    return (
        <Paper variant="elevation" elevation={10} sx={{ width: "fit-content", marginLeft: "auto", marginRight: "auto", textAlign: "center", padding: 3, backgroundColor: "#273345" }}>
            <Avatar sx={{ height: "70px", width: "70px", borderRadius: 5, marginLeft: "auto", marginRight: "auto" }}>A</Avatar>
            <Typography sx={{ color: "primary.main" }} variant="h6">Atsukoro</Typography>
            <Typography sx={{ width: "200px", marginLeft: "auto", marginRight: "auto", marginBottom: 1.5, color: "white" }} variant="body2">Hi, im Atsukoro 17 years developer making web apps</Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Tabs onChange={changeTab} scrollButtons={false} aria-label="tabs" variant="scrollable" value={tabValue}>    
                    <Tab disableRipple disableFocusRipple label="Hoots"/>
                    <Tab disableRipple disableFocusRipple label="Followers"/>
                    <Tab disableRipple disableFocusRipple label="Following"/>
                </Tabs>
            </Box>

            { tabValue === 0 && <HootsTab hoots={hoots}/> }
            { tabValue === 1 && <FollowersTab/> }
            { tabValue === 2 && <FollowingTab/> }
        </Paper>
    )
}

export default ProfilePage