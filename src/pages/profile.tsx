import { Tabs, Tab, Box, Avatar, Typography, Paper, Button, IconButton, Menu, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react"
import axios from "axios";

import { MoreVert as MoreVertIcon } from "@mui/icons-material";
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
    const [id, setId] = useState<string | null>(null);
    const [followed, setFollowed] = useState<boolean>(false);
    const [blocked, setBlocked] = useState<boolean>(false);

    // Status of anchored element - relates to menu opening
    const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
    const menuOpened = Boolean(menuAnchorElement);

    // Opens the menu - runs when user clicks on three dots
    const menuHandleOpen = (event: React.MouseEvent<HTMLButtonElement>) : void => {
        setMenuAnchorElement(event.currentTarget);
    }

    // Closes the menu - runs when user clicks away from menu
    const menuHandleClose = () => {
        setMenuAnchorElement(null);
    }

    // Runs on page component load
    useEffect(() => {
        async function load() {
            const id = new URLSearchParams(window.location.search).get("id");
            setId(id);
            const response = await axiosInstance.get("/api/users/profile?id=" + id);
            
            if(response.data.success) {
                setHoots(response.data.data.hoots);
                setUser(response.data.data.user);
                setFollowed(response.data.data.followed);
                setBlocked(response.data.data.blocked);
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
    const fetchFollowing = async () => {
        if(following == null) return;

        const response = await axiosInstance.get("/api/users/following?id=" + id);
        setFollowing(response.data.docs);
    };

    // Runs when user clicks the followers tab
    // This function is fetching all followers if not fetched already
    const fetchFollowers = async () => {
        if(followers == null) return;

        const response = await axiosInstance.get("/api/users/followers?id=" + id);

        setFollowers(response.data.docs);
    };

    // Runs when user clicks follow or unfollow button
    const handleFollow = async () => {
        const request = await axiosInstance({
            method: followed ? "DELETE" : "POST",
            url: "/api/user/relationships/followers?id=" + user?._id
        });

        if(!request.data.success) return;

        setFollowed(followed ? false : true);
    };

    const handleBlock = async () => {
        const request = await axiosInstance({
            method: blocked ? "DELETE" : "POST",
            url: "/api/user/relationships/block?id=" + user?._id
        });

        if(!request.data.success) return;

        setBlocked(blocked ? false : true);
    };

    return (
        <Paper variant="elevation" elevation={10} sx={{ width: 400, marginLeft: "auto", marginRight: "auto", padding: 3, backgroundColor: "#273345" }}>
            <IconButton onClick={menuHandleOpen} id="menu-expand-button" color="secondary" sx={{ float: "right", clear: "both" }}>
                <MoreVertIcon/>
            </IconButton>

            <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                <Avatar sx={{ height: "70px", width: "70px", borderRadius: 5, }}>{ user && user.username.slice(0, 1) }</Avatar>
            </div>

            <Typography sx={{ color: "primary.main", textAlign: "center" }} variant="h6">{ user && user.username }</Typography>
            <Typography sx={{ width: "200px", marginLeft: "auto", marginRight: "auto", marginBottom: 1.5, color: "white", textAlign: "center" }} variant="body2">{ user && user.bio }</Typography>

            <div style={{ marginBottom: 20, width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                <Button 
                onClick={handleFollow}
                variant={ followed === true ? "outlined" : "contained" } 
                disabled={followed === null ? true : false}>
                    { followed === true ? "Unfollow" : "Follow" }
                </Button>
            </div>

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

            <Menu anchorEl={menuAnchorElement} onClose={menuHandleClose} open={menuOpened} MenuListProps={{ 'aria-labelledby': 'menu-expand-button' }} id="more-menu">
                <MenuItem onClick={handleBlock}>{ blocked === true ? "Unblock" : "Block" }</MenuItem>
            </Menu>
        </Paper>
    )
}

export default ProfilePage