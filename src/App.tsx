// External libraries
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";

// Redux store
import store from "./slices/store";
import { Provider } from "react-redux";

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

// Get specific cookie by name because document.cookie returns string
function getCookie(name : string) {
  const value = `; ${document.cookie}`;
  const parts : any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const AuthorIdContext = React.createContext(null);

function App() {
  const [currentlyLoggedUserId, setCurrentlyLoggedUserId] = useState(null);

  // Set currently logged user's id from cookies
  // Also check if user is authenticated
  useEffect(() => {
    const token = getCookie("token");

    if(!token && !["/auth/login", "/auth/register"].includes(window.location.pathname)) {
      window.location.href = "/auth/login";
    } else {
      setCurrentlyLoggedUserId(getCookie("id"));
    }
  }, []);

  return (
    <div>
      <Provider store={store}>
        <AuthorIdContext.Provider value={currentlyLoggedUserId}>
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
        </AuthorIdContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
