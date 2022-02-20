// Import MUI components and icons
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

// Import other libraries
import { useState } from "react"

const EditPostModal = ({ onClose, onEdit } : any) => {
    const [newContent, setNewContent] = useState<string>("");

    return (
      <div style={{ padding: 10 }}>
          <DialogTitle>
              Edit post
              <IconButton onClick={onClose} sx={{ position: "absolute", top: 21, right: 10, color: "#94a3b8" }}>
                  <CloseIcon sx={{ color: "primary" }}/>
              </IconButton>
          </DialogTitle>    
          <DialogContent>
                <TextField 
                    onChange={event => setNewContent(event.target.value)} 
                    sx={{ marginTop: 2 }}
                    label="New hoot content" 
                    variant="outlined">
                </TextField>
          </DialogContent>  
          <DialogActions>
              <Button onClick={() => { onEdit(newContent) }} variant="contained">
                  Edit
              </Button> 
              <Button onClick={onClose}>
                  Close
              </Button>
          </DialogActions>
      </div>
    )
}

export default EditPostModal