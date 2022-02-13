import { Tabs, Tab, Box, Avatar, Typography, Paper } from "@mui/material"
import { useState } from "react"

const ProfilePage = () => {
    const [tabValue, setTabValue] = useState<number>(0);

    // Runs when user clicks on tab
    const changeTab = (event : React.SyntheticEvent<unknown>, value : number) => {
        setTabValue(value);
    }

    return (
        <Paper variant="outlined" elevation={5} sx={{ width: "fit-content", marginLeft: "auto", marginRight: "auto", textAlign: "center", padding: 3 }}>
            <Avatar sx={{ height: "70px", width: "70px", borderRadius: 5, marginLeft: "auto", marginRight: "auto" }}>A</Avatar>
            <Typography sx={{ color: "primary.main" }} variant="h6">Atsukoro</Typography>
            <Typography sx={{ width: "200px", marginLeft: "auto", marginRight: "auto", marginBottom: 1.5, color: "white" }} variant="body2">Hi, im Atsukoro 17 years developer making web apps</Typography>
            <Box>
                <Tabs onChange={changeTab} scrollButtons={false} aria-label="tabs" variant="scrollable" value={tabValue}>    
                    <Tab disableRipple disableFocusRipple label="Hoots"/>
                    <Tab disableRipple disableFocusRipple label="Followers"/>
                    <Tab disableRipple disableFocusRipple label="Following"/>
                </Tabs>
            </Box>
        </Paper>
    )
}

export default ProfilePage