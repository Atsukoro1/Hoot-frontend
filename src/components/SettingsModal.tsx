import React, { useState, forwardRef , useImperativeHandle} from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SettingsModal = forwardRef((props : any, ref : any) => {
    const [opened, setOpened] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setOpened(true);
        },

        close: () => {
            setOpened(false);
        }
    }));

    const onChangeSettings = async (e : React.SyntheticEvent) : Promise<void> => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            newEmail: { value: string };
            newPassword: { value: string };
            newUsername: { value: string };
            password: { value: string };
        };

        console.log(target.newUsername)
    };

    return (
        <form onSubmit={onChangeSettings}>
            <Dialog onClose={() => { ref.current.close(); }} open={opened}>
                <DialogTitle>Settings</DialogTitle>

                <DialogContent>
                    <TextField type="text" name="newUsername" variant="outlined" required sx={{ marginTop: 1, marginBottom: 1.5 }} label="Email"></TextField><br/>
                    <TextField type="email" name="newEmail" variant="outlined" required sx={{ marginBottom: 1.5 }} label="Password"></TextField><br/>
                    <TextField type="password" name="newPassword" variant="outlined" required sx={{ marginBottom: 1.5 }} label="New password"></TextField><br/>
                    <TextField type="password" name="password" variant="outlined" required label="Password"></TextField>
                </DialogContent>
    
                <DialogActions>
                    <Button onClick={() => { ref.current.close() }}>Close</Button>
                    <Button type="submit" variant="contained" onClick={onChangeSettings}>Save</Button>
                </DialogActions>
            </Dialog>
        </form>
      )
});

export default SettingsModal