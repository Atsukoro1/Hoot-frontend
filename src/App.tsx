// External libraries
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Register from "./pages/register";
import Login from "./pages/login";
import AppPage from "./pages/app";
import ProfilePage from "./pages/profile";
import Navbar from "./components/Navbar";
import SelectMenu from "./components/SelectMenu";

// Theme for MUI
const theme = createTheme({
  palette: {
    primary: {
      main: "#8b5cf6",
      dark: "#8b5cf6",
      light: "#8b5cf6",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#8b5cf6",
      dark: "#8b5cf6",
    },
    background: {
      default: "#1e293b",
      paper: "#334155",
    },
    error: {
      main: "#f12222",
    },
    success: {
      main: "#754caf",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "#c9c8ce",
      disabled: "#94a3b8",
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Navbar/>
      <SelectMenu/>

        <Router>
          <Routes>
            <Route path="auth/register" element={<Register />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="/" element={<AppPage />} />
            <Route path="/profile" element={<ProfilePage/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
