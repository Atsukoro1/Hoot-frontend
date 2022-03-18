// React dependencies
import React, { useState, forwardRef , useImperativeHandle} from "react";

// MUI library components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SnackBar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Other libraries
import axios from "axios";

// Create a new Axios instance
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

const SettingsModal = forwardRef((props : any, ref : any) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [snackbarState, setSnackbarState] = useState<any>({ opened: false, message: "", severity: "error" });

    // Expose close function to parent component
    useImperativeHandle(ref, () => ({
        open: () => {
            setOpened(true);
        },

        close: () => {
            setOpened(false);
        }
    }));

    const onClose = () : void => {
        ref.current.close();
    }

    const hideSnackBar = () : void => {
        return setSnackbarState({ message: "", severity: "error", opened: false });
    }

    // Will be emitted when user submits the settings form
    const onFormSubmit = async (e : React.SyntheticEvent) : Promise<void> => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          newUsername: { value?: string };
          newEmail: { value?: string };
          newPassword: { value?: string };
          password: { value: string };
        };

        const formData = {
            newEmail: target.newEmail.value,
            newUsername: target.newUsername.value,
            newPassword: target.newPassword.value,
            password: target.password.value
        };

        const response = await instance({
            url: `${process.env.REACT_APP_BASE_URL}/api/user/settings/change`,
            method: "PATCH",
            data: formData
        });

        if(!response.data.success) return setSnackbarState({ opened: true, message: response.data.errors, severity: "error" });

        onClose();
        return setSnackbarState({ opened: true, message: "Successfully changed settings", severity: "success" });
    };

    return (
        <>
        <Dialog onClose={onClose} open={opened}>
            <form onSubmit={onFormSubmit}>
                <DialogTitle>Settings</DialogTitle>

                <DialogContent>
                        <TextField 
                            label="New username" 
                            name="newUsername" 
                            variant="outlined"
                            sx={{ marginBottom: 1.5, marginTop: 1 }}
                            type="text"/>
                            
                        <br/>
                        <TextField 
                            label="New email" 
                            name="newEmail" 
                            variant="outlined"
                            sx={{ marginBottom: 1.5 }}
                            type="email"/>

                        <br/>
                        <TextField 
                            label="New password" 
                            name="newPassword" 
                            variant="outlined"
                            sx={{ marginBottom: 1.5 }}
                            type="password"/>

                        <br/>
                        <TextField 
                            required
                            label="Password" 
                            name="password" 
                            variant="outlined"
                            type="password"/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} variant="outlined">Close</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </DialogActions>
            </form>
        </Dialog>

        <SnackBar onClose={hideSnackBar} autoHideDuration={3000} open={snackbarState.opened}>
            <Alert severity={snackbarState.severity}>
                {snackbarState.message}
            </Alert>
        </SnackBar>
        </>
      )
});

export default SettingsModal