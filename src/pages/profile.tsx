// MUI library components and icons
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Self-made components
import HootsTab from "../components/HootsTab";
import FollowingTab from "../components/FollowingTab";
import FollowersTab from "../components/FollowersTab";
import SettingsModal from "components/SettingsModal";

// Other libraries components
import React, { useEffect, useState, useContext, useRef } from "react"
import axios from "axios";

// Interfaces
import { IHoot, IUser } from "../interfaces/app.interfaces";

// Currently logged in user's id
import { AuthorIdContext } from "../App";

// Create new instance of axios client
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
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const loggedUserId = useContext(AuthorIdContext);
    const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const settingsModalRef : any = useRef();

    // Status of the anchored menu
    const menuOpened = Boolean(menuAnchorElement);

    // Opens the menu - runs when user clicks on three dots
    const menuHandleOpen = (event: React.MouseEvent<HTMLButtonElement>) : void => {
        setMenuAnchorElement(event.currentTarget);
    }

    // Runs when user clicks on pagination
    // Will change page and useEffect hook will then change content depending on the selected page
    const handlePageChange = (event : React.SyntheticEvent<unknown>, value : number) => {
        setPage(value);
    };

    // Closes the menu - runs when user clicks away from menu
    const menuHandleClose = () => {
        setMenuAnchorElement(null);
    }

    // Runs on page component load
    useEffect(() => {
        async function load() {
            const id = new URLSearchParams(window.location.search).get("id");
            setId(id);
            fetchHoots();
        }

        load();
    }, []);

    // Runs when page changes and fetches a new page
    useEffect(() => {
        switch (tabValue) {
            case 0:
                if(!firstLoad) {
                    fetchHoots();
                }

                setFirstLoad(false);
                break;

            case 1:
                fetchFollowers();
                break;

            case 2:
                fetchFollowing();
                break;
        }
    }, [page]);

    // Runs when user clicks on tab
    const changeTab = (event : React.SyntheticEvent<unknown>, value : number) => {
        setTabValue(value);
    }

    // Runs when user clicks the hoot tab
    // This function is fetching all following if not fetched already
    const fetchHoots = async () => {
        const id2 = new URLSearchParams(window.location.search).get("id");
        await setId(id2);

        const response = await axiosInstance.get("/api/users/profile?id=" + id2 + "&page=" + page);
        
        if(!response.data.success) return;

        setPageCount(response.data.data.hoots.totalPages);
        setHoots(response.data.data.hoots.docs);
        setUser(response.data.data.user);
        setFollowed(response.data.data.followed);
        setBlocked(response.data.data.blocked);
    }

    // Runs when user clicks the following tab
    // This function is fetching all following if not fetched already
    const fetchFollowing = async () => {
        if(following == null) return;

        const response = await axiosInstance.get("/api/users/following?id=" + id + "&page=" + page);

        setPageCount(response.data.totalPages);
        setFollowing(response.data.docs);
    };

    // Runs when user clicks the followers tab
    // This function is fetching all followers if not fetched already
    const fetchFollowers = async () => {
        if(followers == null) return;

        const response = await axiosInstance.get("/api/users/followers?id=" + id + "&page=" + page);

        setPageCount(response.data.totalPages);
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

    // Runs when user clicks the block button
    const handleBlock = async () => {
        const request = await axiosInstance({
            method: blocked ? "DELETE" : "POST",
            url: "/api/user/relationships/block?id=" + user?._id
        });

        if(!request.data.success) return;

        setBlocked(blocked ? false : true);
    };

    return (
        <Paper variant="elevation" elevation={10} sx={{ width: 420, marginLeft: "auto", marginRight: "auto", padding: 3, backgroundColor: "#273345" }}>
            <IconButton onClick={menuHandleOpen} id="menu-expand-button" color="secondary" sx={{ float: "right", clear: "both" }}>
                <MoreVertIcon/>
            </IconButton>

            <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                <Avatar sx={{ height: "70px", width: "70px", borderRadius: 5, }}>{ user && user.username.slice(0, 1) }</Avatar>
            </div>

            <Typography sx={{ color: "primary.main", textAlign: "center" }} variant="h6">{ user && user.username }</Typography>
            <Typography sx={{ width: "200px", marginLeft: "auto", marginRight: "auto", marginBottom: 1.5, color: "white", textAlign: "center" }} variant="body2">{ user && user.bio }</Typography>

            <div style={{ marginBottom: 20, width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                { loggedUserId !== user?._id &&
                    <Button 
                        onClick={handleFollow}
                        variant={ followed === true ? "outlined" : "contained" } 
                        disabled={followed === null ? true : false}>
                            { followed === true ? "Unfollow" : "Follow" }
                    </Button>
                }
            </div>

            <Box sx={{ marginBottom: 2, width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                <Tabs sx={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }} onChange={changeTab} scrollButtons={false} aria-label="tabs" variant="scrollable" value={tabValue}>    
                    <Tab onClick={() => { setPageCount(0); fetchHoots(); }} disableRipple disableFocusRipple label="Hoots"/>
                    <Tab onClick={() => { setPageCount(0); fetchFollowers(); }} disableRipple disableFocusRipple label="Followers"/>
                    <Tab onClick={() => { setPageCount(0); fetchFollowing(); }} disableRipple disableFocusRipple label="Following"/>
                </Tabs>

                <div style={{ marginTop: 25 }}>
                    { tabValue === 0 && <HootsTab hoots={hoots}/> }
                    { tabValue === 1 && <FollowersTab followers={followers}/> }
                    { tabValue === 2 && <FollowingTab followers={following}/> }

                    <div style={{ marginTop: 30, width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                        <Pagination page={page} onChange={handlePageChange} count={pageCount}/>
                    </div>
                </div>


            </Box>

            <Menu anchorEl={menuAnchorElement} onClose={menuHandleClose} open={menuOpened} MenuListProps={{ 'aria-labelledby': 'menu-expand-button' }} id="more-menu">
                { loggedUserId !== user?._id && 
                    <MenuItem 
                        onClick={handleBlock}>
                            { blocked === true ? "Unblock" : "Block" }
                    </MenuItem>
                }

                { loggedUserId === user?._id && 
                    <MenuItem onClick={() => { settingsModalRef.current.open(); }}>Settings</MenuItem>
                }
            </Menu>

            <SettingsModal ref={settingsModalRef}/>
        </Paper>
    )
}

export default ProfilePage