import { DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

const LogoutModal = ({ onClose } : any) => {
    const logoutAction = () => {
        document.cookie = "token=";
        window.location.href = "/auth/login";
    }

    return (
      <div style={{ padding: 10 }}>
          <DialogTitle>
              Logout?   
              <IconButton onClick={onClose} sx={{ position: "absolute", top: 21, right: 10, color: "#94a3b8" }}>
                  <CloseIcon sx={{ color: "primary" }}/>
              </IconButton>
          </DialogTitle>    
          <DialogContent sx={{ float: "left" }}>
              <Typography variant="body2">Your progress will be saved.</Typography>
          </DialogContent>  
          <DialogActions sx={{ marginTop: -2, float: "left" }}>
              <Button onClick={logoutAction} variant="contained">
                  Logout
              </Button> 
              <Button onClick={onClose}>
                  Close
              </Button>
          </DialogActions>
      </div>
    )
}

export default LogoutModal