import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState } from "react";
import Link from "@material-ui/core/Link";
import { FormControl } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Team 15 @ JPMC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFormValues = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cpassword: "",
  employeeNumber: "",
};

export default function Signup() {
  const { signup, currentUser } = useAuth();
  const [radioValue, setRadioValue] = useState("smc");
  const [values, setValues] = useState(initialFormValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    // console.log("New state is ");
    // console.log(values);
  };

  const classes = useStyles();

  const formSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = {
      ...values,
      radioValue: radioValue,
    };
    console.log(":DDD");
    console.log(finalFormData);

    if (finalFormData.password !== finalFormData.cpassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(finalFormData.email, finalFormData.password);
    } catch {
      setError("Failed to create user");
    }
    setLoading(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ height: "84vh", backgroundColor: "white" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* shows you if there's a current user logged in - uski email */}
            {/* <Grid item xs={12} sm={6}>
              {currentUser.email}
            </Grid> */}

            <Grid item xs={12} sm={6}>
              {error && <h1>{error}</h1>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                onChange={handleInputChange}
                type="password"
                id="cpassword"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="employeeNumber"
                label="Employee Number"
                // type="cpassword"
                id="employeeNumber"
                autoComplete="Employee Number"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="userTtpe"
                  name="userType"
                  value={radioValue}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="smc"
                    control={<Radio />}
                    label="SMC Employee"
                  />
                  <FormControlLabel
                    value="govt"
                    control={<Radio />}
                    label="Government Employee"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={formSubmit}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/signin" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
