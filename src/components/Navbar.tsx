import { Box, AppBar, Toolbar } from "@mui/material"
import { AutoStoriesTwoTone as Logo } from "@mui/icons-material"

const Navbar = () => {
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