// MUI library components
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Dialog from "@mui/material/Dialog";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

// Context
import { AuthorIdContext } from "App";

// Self-made components
import LogoutModal from "./LogoutModal";

// Other libraries
import { useState, useContext } from "react";


const SelectMenu = () => {
  const [logoutModalState, setLogoutModalState] = useState<boolean>(false);
  const currentlyLoggedUserId = useContext(AuthorIdContext);

  // Redirect currently logged user to their profile
  const redirectToMyProfile = () => {
    window.location.href = "/profile?id=" + currentlyLoggedUserId;
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        color="primary"
        icon={<MoreHorizIcon />}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <SpeedDialAction
          onClick={() => setLogoutModalState(true)}
          key={"logout"}
          icon={<LogoutIcon />}
          tooltipTitle={"Logout"}
        />

        <SpeedDialAction
          onClick={redirectToMyProfile}
          key={"myprofile"}
          icon={<PersonIcon />}
          tooltipTitle={"My profile"}
        />
      </SpeedDial>

      <Dialog onClose={() => setLogoutModalState(false)} open={logoutModalState}>
        <LogoutModal onClose={() => setLogoutModalState(false)}/>
      </Dialog>
    </div>
  );
};

export default SelectMenu;
