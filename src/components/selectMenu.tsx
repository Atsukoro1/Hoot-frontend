import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const SelectMenu = () => {
  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        color="primary"
        icon={<MoreHorizIcon />}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <SpeedDialAction
          key={"logout"}
          icon={<LogoutIcon />}
          tooltipTitle={"Logout"}
        />

        <SpeedDialAction
          key={"settings"}
          icon={<SettingsIcon />}
          tooltipTitle={"Settings"}
        />

        <SpeedDialAction
          key={"myprofile"}
          icon={<PersonIcon />}
          tooltipTitle={"My profile"}
        />

        <SpeedDialAction
          key={"post"}
          icon={<SendIcon />}
          tooltipTitle={"Make a post"}
        />
      </SpeedDial>
    </div>
  );
};

export default SelectMenu;
