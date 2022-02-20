// MUI library components and icons
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "@mui/icons-material/AutoStoriesTwoTone";

const Navbar = () => {
  
  // Redirects user to main page after clicking the logo
  const redirectToAppPage = () => {
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo 
            sx={{ "&:hover": { cursor: "pointer" }, fontSize: 40 }} 
            onClick={redirectToAppPage}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar