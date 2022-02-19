import { SpeedDial, SpeedDialAction, Dialog } from "@mui/material";
import { AuthorIdContext } from "../App";
import {
  MoreHoriz as MoreHorizIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";

import LogoutModal from "./LogoutModal";

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
