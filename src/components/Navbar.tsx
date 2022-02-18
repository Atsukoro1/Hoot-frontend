import { Box, AppBar, Toolbar } from "@mui/material"
import { AutoStoriesTwoTone as Logo } from "@mui/icons-material"

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo sx={{ fontSize: 40 }}/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar