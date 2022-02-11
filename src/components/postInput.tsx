import { Paper, TextField, Button, Typography } from "@mui/material"

import { useState } from "react"

const PostInput = () => {
    const [buttonLoadingState, setButtonLoadingState] = useState<boolean>(false);

    return (
        <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto", marginBottom: 30 }}>
            <Paper elevation={12} sx={{ width: 330, height: "fit-content", padding: 1 }}>
                <TextField 
                  rows={2} 
                  multiline
                  sx={{ width: "100%" }} 
                  id="outlined-basic" 
                  label="Something on mind?" 
                  variant="outlined"
                />

                { !buttonLoadingState && <Button sx={{ width: "100%", marginTop: 1 }} variant="contained">Hoot it!</Button>}
                { buttonLoadingState && <Button sx={{ width: "100%", marginTop: 1 }} disabled variant="contained">Hooting...</Button>}
            </Paper>
        </div>
    )
}

export default PostInput