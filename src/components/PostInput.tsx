// MUI library compoennts
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

// Other libraries
import axios from "axios";
import React, { useState, useEffect } from "react"

// Create a new Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const PostInput = ({ onPostCreate } : any) => {
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [hashtags, setHashtags] = useState<string[]>([]);

    // Handle when user posts a new Hoot
    const post = async (e: React.SyntheticEvent) : Promise<void> => {
        e.preventDefault();

        setLoadingState(true);

        const target = e.target as typeof e.target & {
            textContent: { value: string };
        };

        const hashtags = target.textContent.value.match(/\B\#\w\w+\b/g);

        let data : any = {};
        data.textContent = target.textContent.value;
        if(hashtags) data.hashtags = hashtags;

        const res = await axiosInstance.post("/api/hoots", data);

        if(!res.data.success) return;
        
        setLoadingState(false);
        setInputValue("");
        onPostCreate(res.data.data);
    };

    // Everytime input content changes, parse hashtags and set it to hashtags state
    useEffect(() => {
        const foundHashtags = inputValue.match(/\B\#\w\w+\b/g) || [];
        setHashtags(foundHashtags);
    }, [inputValue])

    return (
        <form onSubmit={post} style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto", marginBottom: 30 }}>
            <Paper elevation={12} sx={{ width: 325, marginLeft: -1.5, height: "fit-content", padding: 1 }}>
                <TextField 
                  rows={2} 
                  multiline
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  sx={{ width: "100%", marginBottom: 1 }} 
                  name="textContent"
                  type="text"
                  id="outlined-basic" 
                  label="Something on mind?" 
                  variant="outlined"
                />

                {hashtags.map((el : string, idx : number) => {
                    return <Chip key={idx} label={el} onClick={() => {}}></Chip>
                })}

                { !loadingState && <Button type="submit" sx={{ width: "100%", marginTop: 1 }} variant="contained">Hoot it!</Button>}
                { loadingState && <Button sx={{ width: "100%", marginTop: 1 }} disabled variant="contained">Hooting...</Button>}
            </Paper>

            <Backdrop sx={{ zIndex: 2 }} open={loadingState}>
                <CircularProgress/>
            </Backdrop>
        </form>
    )
}

export default PostInput