// Import MUI components and icons
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
              <Typography variant="body2">You will be logged out.</Typography>
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