import { SpeedDial, SpeedDialAction, Dialog } from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";

import LogoutModal from "./LogoutModal";

import { useState } from "react";

const SelectMenu = () => {
  const [logoutModalState, setLogoutModalState] = useState<boolean>(false);

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
          onClick={() => {}}
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
