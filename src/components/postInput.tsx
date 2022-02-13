import { Paper, TextField, Button } from "@mui/material"

import axios from "axios";
import React, { useState } from "react"

// Create a new Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const PostInput = ({ onPostCreate } : any) => {
    const [buttonLoadingState, setButtonLoadingState] = useState<boolean>(false);

    // Handle when user posts a new Hoot
    const post = async (e: React.SyntheticEvent) : Promise<void> => {
        e.preventDefault();

        setButtonLoadingState(true);

        const target = e.target as typeof e.target & {
            textContent: { value: string };
        };

        const hashtags = target.textContent.value.match(/\B\#\w\w+\b/g);

        let data : any = {};
        data.textContent = target.textContent.value;
        if(hashtags) data.hashtags = hashtags;

        const res = await axiosInstance.post("/api/hoots", data);

        if(!res.data.success) return;
        
        setButtonLoadingState(false);
        onPostCreate(res.data.data);
    }

    return (
        <form onSubmit={post} style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto", marginBottom: 30 }}>
            <Paper elevation={12} sx={{ width: 320, height: "fit-content", padding: 1 }}>
                <TextField 
                  rows={2} 
                  multiline
                  sx={{ width: "100%" }} 
                  name="textContent"
                  type="text"
                  id="outlined-basic" 
                  label="Something on mind?" 
                  variant="outlined"
                />

                { !buttonLoadingState && <Button type="submit" sx={{ width: "100%", marginTop: 1 }} variant="contained">Hoot it!</Button>}
                { buttonLoadingState && <Button sx={{ width: "100%", marginTop: 1 }} disabled variant="contained">Hooting...</Button>}
            </Paper>
        </form>
    )
}

export default PostInput