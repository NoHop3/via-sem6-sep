import * as React from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Box,
} from "@mui/material";
import { SignUpProps } from "../authentication.props";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/NoHop3/via-sem6-sep">
        SEP6 Yoana &amp; Stefan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const _SignUp = (props: SignUpProps) => {
  const [formState, setFormState] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    birthYear: undefined,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return formState.email !== "" &&
      formState.email.includes("@") &&
      formState.email.includes(".") &&
      formState.email.length > 6 &&
      formState.email.length < 30 &&
      formState.username !== "" &&
      formState.username.length > 3 &&
      formState.username.length < 21 &&
      formState.firstName !== "" &&
      formState.firstName.length > 3 &&
      formState.firstName.length < 21 &&
      formState.lastName !== "" &&
      formState.lastName.length > 3 &&
      formState.lastName.length < 21 &&
      formState.password !== "" &&
      formState.password.length > 5 &&
      formState.password.length < 21 &&
      formState.birthYear !== undefined
      ? !!(formState.birthYear > 1900 && formState.birthYear < 2021)
      : false;
  };

  const theme = useTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      props.signUp(formState);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: theme.spacing(1),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.text.primary }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={
                  formState.firstName !== ""
                    ? !(
                        formState.firstName.length < 3 ||
                        formState.firstName.length > 20
                      )
                    : false
                }
                helperText={
                  formState.firstName !== ""
                    ? formState.firstName.length < 3 ||
                      formState.firstName.length > 20
                      ? "Must be between 3 and 20 characters"
                      : ""
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={
                  formState.lastName !== ""
                    ? !(
                        formState.lastName.length < 3 ||
                        formState.lastName.length > 20
                      )
                    : false
                }
                helperText={
                  formState.lastName !== ""
                    ? formState.lastName.length < 3 ||
                      formState.lastName.length > 20
                      ? "Must be between 3 and 20 characters"
                      : ""
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={
                  formState.email !== ""
                    ? !(
                        !formState.email.includes("@") ||
                        !formState.email.includes(".") ||
                        formState.email.length < 7 ||
                        formState.email.length > 30
                      )
                    : false
                }
                helperText={
                  formState.email !== ""
                    ? !formState.email.includes("@") ||
                      !formState.email.includes(".")
                      ? "Invalid email address, must contain '@' and '.'"
                      : formState.email.length < 7 ||
                        formState.email.length > 30
                      ? "Must be between 7 and 30 characters"
                      : ""
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                error={
                  formState.username !== ""
                    ? !(
                        formState.username.length < 3 ||
                        formState.username.length > 20
                      )
                    : false
                }
                helperText={
                  formState.username !== ""
                    ? formState.username.length < 3 ||
                      formState.username.length > 20
                      ? "Must be between 3 and 20 characters"
                      : ""
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={
                  formState.password !== ""
                    ? !(
                        formState.password.length > 5 &&
                        formState.password.length < 21
                      )
                    : false
                }
                helperText={
                  formState.password !== ""
                    ? formState.password.length < 6 ||
                      formState.password.length > 20
                      ? "Must be between 6 and 20 characters"
                      : ""
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                fullWidth
                name="birthYear"
                label="Year of birth"
                type="number"
                id="birthYear"
                autoComplete="birthYear"
                error={
                  formState.birthYear !== undefined
                    ? !!(
                        formState.birthYear < 1900 || formState.birthYear > 2021
                      )
                    : false
                }
                helperText={
                  formState.birthYear !== undefined
                    ? formState.birthYear < 1900 || formState.birthYear > 2021
                      ? "Must be between 1900 and 2021"
                      : ""
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
