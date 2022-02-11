import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Card,
  Divider,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { Lock, Refresh } from "@mui/icons-material";

import { ISnackbar } from "../interfaces/login.interfaces";

const LoginPage = () => {
  const [buttonLoadingState, setButtonLoadingState] = useState<Boolean>(false);
  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    opened: false,
    message: "",
  });

  function closeAlert() {
    setSnackbarState({ opened: false, message: "" });
  }

  async function formSubmit(e: React.SyntheticEvent): Promise<void> {
    e.preventDefault();

    setButtonLoadingState(true);

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const { email, password } = target;

    axios({
      method: "POST",
      url: process.env.REACT_APP_BASE_URL + "/api/user/auth/login/",
      data: {
        email: email.value,
        password: password.value,
      },
    }).then((response) => {
      setButtonLoadingState(false);

      if (!response.data.success)
        return setSnackbarState({
          opened: true,
          message: response.data.errors,
        });

      document.cookie = "token=" + response.data.data.token + "; path=/";
      window.location.href = "/";
    });
  }

  return (
    <div>
      <form onSubmit={formSubmit}>
        <Card
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            padding: "10px",
            transform: "translate(-50%, -50%)",
            minWidth: "250px",
          }}
        >
          <CardContent>
            <Typography variant="h6" component="h2">
              Login
            </Typography>
            <Link underline="none" variant="body2" href="../auth/register">
              Don't have an account?
            </Link>
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <TextField
              required
              name="email"
              id="filled-basic"
              label="Email"
              type={"email"}
              margin={"dense"}
              variant="outlined"
            />
            <br />
            <TextField
              required
              name="password"
              id="filled-basic"
              label="Password"
              type={"password"}
              margin={"dense"}
              variant="outlined"
            />
          </CardContent>
          <CardActions>
            {!buttonLoadingState && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<Lock />}
              >
                Register
              </Button>
            )}
            {buttonLoadingState && (
              <Button
                disabled
                fullWidth
                variant="contained"
                startIcon={<Refresh />}
              >
                Registering...
              </Button>
            )}
          </CardActions>
        </Card>

        <Snackbar
          open={snackbarState.opened}
          onClose={closeAlert}
          autoHideDuration={6000}
        >
          <Alert onClose={closeAlert} severity="error" sx={{ width: "100%" }}>
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default LoginPage;