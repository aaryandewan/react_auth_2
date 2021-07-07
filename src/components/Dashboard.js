import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { Box, Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
// import DateFnsUtils from "@date-io/date-fns";

// import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core/";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f3f4f8",
    "& .MuiFormControl-root": {
      backgroundColor: "white",
      //   width: "100%",
      //   marginTop: theme.spacing(2),
      //   marginLeft: theme.spacing(3),
      //   marginRight: "auto",
      //   marginLeft: "auto",

      //   marginBottom: theme.spacing(2),
    },
    "& .MuiGrid-container": {
      backgroundColor: "white",
      // marginTop: "50px",
      marginBottom: "35px",
    },
  },
  paper: {
    backgroundColor: "white",
    width: "75%",
    padding: "20px",
    // margin: "0 auto",
  },
  formControl: {
    minWidth: 120,
    marginBottom: "35px",
  },
  dateTimePicker: {
    marginBottom: theme.spacing(1),
  },
  temp: {
    maxWidth: "200px",
  },
}));

const initialFValues = {
  fullName: "",
  branch: "",
  grName: "",
  email: "",
  mobile: "",
};

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const uid = currentUser.uid;
  const history = useHistory();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    isSwitched: false,
  });

  const [radioValue, setRadioValue] = useState("CS");
  const [error, setError] = useState("");

  const [values, setValues] = useState(initialFValues);
  const classes = useStyles();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleLogout = async () => {
    setError("");
    history.push("/signin");
    try {
      await logout();
    } catch {
      setError("failed to logout");
    }
  };

  const [passingYear, setPassingYear] = useState("");
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const [sliderValue, setSliderValue] = useState(4);
  const sliderValueChange = (event, newValue) => {
    console.log(newValue);
    setSliderValue(newValue);
  };
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleDateChangee = (event) => {
    handleDateChange(event);
  };

  const handlePassingYearChange = (event) => {
    setPassingYear(event.target.value);
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
  function valuetext(value) {
    return `${value}°C`;
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    // console.log(initialFValues);
    // console.log("------------------------------");
    // console.log(values);
    // console.log(state);
    // console.log(selectedDate);

    const finalFormData = {
      ...values,
      ...state,
      radioValuee: radioValue,
      selectedDatee: selectedDate,
      sliderValuee: sliderValue,
    };
    console.log("FATAAAAA");
    console.log(finalFormData);

    db.collection("userFormData")
      .doc(uid)
      .set(finalFormData)
      .then(() => {
        console.log("Data uploaded successfully");
      })
      .catch((err) => {
        console.log("ERRRRRRRRRR", err);
      });

    // const {
    //   fullName,
    //   branch,
    //   grName,
    //   checkedA,
    //   checkedB,
    //   checkedC,
    //   checkedD,
    //   email,
    //   mobile,
    //   isSwitched,
    //   radioValuee,
    //   selectedDatee,
    //   sliderValuee,
    // } = finalFormData;
    // const res = await fetch("register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     fullName,
    //     branch,
    //     grName,
    //     checkedA,
    //     checkedB,
    //     checkedC,
    //     checkedD,
    //     email,
    //     mobile,
    //     isSwitched,
    //     radioValuee,
    //     selectedDatee,
    //     sliderValuee,
    //   }),
    // });
    // console.log("Aaryan");
    // console.log(typeof radioValuee);
    // console.log(typeof selectedDatee);
    // const data = await res.json();
  };
  const themee = useTheme();
  const matches = useMediaQuery(themee.breakpoints.up("sm"));

  return (
    // <>
    <div style={{ backgroundColor: "#f3f4f8" }}>
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: "#f3f4f8", marginTop: "30px" }}>
          <Typography variant="h2" gutterBottom align="center">
            Student Application Form
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f3f4f8",
          }}
        >
          <Box
            variant="outlined"
            className={classes.paper}
            border={1}
            borderColor="primary.main"
            borderRadius="borderRadius"
          >
            <form method="post" className={classes.root}>
              <Grid container direction="column">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="fullName"
                      label="Full Name"
                      value={values.fullName}
                      onChange={handleInputChange}
                      fullWidth
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="email"
                      label="College Email"
                      value={values.email}
                      onChange={handleInputChange}
                      fullWidth
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      id="filled-number"
                      name="mobile"
                      label="Roll Number"
                      type="number"
                      value={values.mobile}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="branch"
                      label="Branch"
                      value={values.branch}
                      onChange={handleInputChange}
                      fullWidth
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="grName"
                      label="GR Name"
                      value={values.grName}
                      onChange={handleInputChange}
                      fullWidth
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={5}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Passing Year
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={passingYear}
                        onChange={handlePassingYearChange}
                      >
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container>
                  <FormControl>
                    <FormLabel component="legend">
                      Please choose your subjects
                    </FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedA}
                            onChange={handleChange}
                            name="checkedA"
                          />
                        }
                        label="Microwave Engg."
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                          />
                        }
                        label="Information and Communication Technology"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedC}
                            onChange={handleChange}
                            name="checkedC"
                          />
                        }
                        label="Optimization Techniques"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedD}
                            onChange={handleChange}
                            name="checkedD"
                          />
                        }
                        label="Engineering Design"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid container>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Choose your minor</FormLabel>
                    <RadioGroup
                      // aria-label="gender"
                      // name="gender1"
                      value={radioValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="CS"
                        control={<Radio />}
                        label="Computer Sci."
                      />
                      <FormControlLabel
                        value="AR"
                        control={<Radio />}
                        label="Augmented Reality"
                      />
                      <FormControlLabel
                        value="French"
                        control={<Radio />}
                        label="French"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid container>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    id="discrete-slider"
                    gutterBottom
                  >
                    How would you rate your teachers overall?
                  </Typography>
                  <Slider
                    value={sliderValue}
                    onChange={sliderValueChange}
                    // onChangeCommitted={sliderValueChange}
                    defaultValue={3}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                  />
                </Grid>

                <Grid container>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Do you wish to receive emails from us?
                    </FormLabel>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.isSwitched}
                          onChange={handleChange}
                          name="isSwitched"
                        />
                      }
                      // label="Gilad Gray"
                    />
                  </FormControl>
                </Grid>

                <Grid container>
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      className={classes.dateTimePicker}
                    >
                      Please select the Date and Time of your prospective return
                      to your univeristy
                    </FormLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        className={classes.temp}
                        // label="Time pick"
                        inputVariant="outlined"
                        value={selectedDate}
                        onChange={handleDateChangee}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>

                <Grid container>
                  <Button
                    // type="submit"
                    onClick={formSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Button
              // type="submit"
              onClick={handleLogout}
              variant="contained"
              color="secondary"
            >
              Log out
            </Button>
          </Box>
        </div>
      </ThemeProvider>
      {/* </> */}
    </div>
  );
}
