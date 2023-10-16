import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FormikProvider, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { login } from "../store/userSlice";
import { logErrorMsg } from "../store/userSlice";
import { logMsgDis } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const logMsg = useSelector((state) => state.users.logMsg);
  const mail = useSelector((state) => state.users.logedEmail);
  const logedUserName = useSelector((state) => state.users.logedUserName);
  const errorMsg = useSelector((state) => state.users.logedError);

  const EndAdorement = ({ visible, setVisible }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <VisibilityIcon /> : <VisibilityOffOutlinedIcon />}
        </IconButton>
      </InputAdornment>
    );
  };
  const loginSchema = Yup.object().shape({
    email: Yup.string().required("email is Required"),
    password: Yup.string().required("password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (logMsg) {
      console.log(logMsg);
      localStorage.setItem("email", mail);
      localStorage.setItem("user", logedUserName);
      setTimeout(() => {
        dispatch(logMsgDis());
        navigate("/home");
      }, 1500);
    }
    if (errorMsg) {
      console.log(errorMsg);
      setTimeout(() => {
        dispatch(logErrorMsg());
      }, 5000);
    }
  }, [logMsg, mail, errorMsg]);

  const { errors, handleSubmit, handleChange, touched } = formik;
  return (
    <div
      style={{
        backgroundColor: "lightpink",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={1} md={4} sm={2}></Grid>
          <Grid item xs={10} md={4} sm={8} style={{ textAlign: "center" }}>
            <FormikProvider value={formik}>
              <Grid sx={{ fontSize: 50, fontFamily: "serif", marginBottom: 4 }}>
                Login User
              </Grid>
              <Form
                onSubmit={handleSubmit}
                class="animate__animated animate__pulse"
              >
                <Grid
                  container
                  spacing={2}
                  sx={{
                    border: "1px solid",
                    color: "transparent",
                    borderRadius: "55px",
                    padding: "56px",
                    paddingLeft: "50px",
                    backgroundColor: "lightgray",
                    boxShadow: "2px 3px 5px 3px #888",
                  }}
                >
                  <Grid item md={12} xs={12}>
                    {/* /// */}
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter the User Email"
                          rows={2}
                          name="email"
                          onChange={handleChange}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="email">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ marginBottom: 1 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter Password"
                          rows={2}
                          name="password"
                          type={visible ? "text" : "password"}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <EndAdorement
                                visible={visible}
                                setVisible={setVisible}
                              />
                            ),
                          }}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="password">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ marginTop: "12px", color: "black" }}>
                      New User? &nbsp;
                      <Link to={"/register"} style={{ textDecoration: "none" }}>
                        <span>Sign UP</span>
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {logMsg ? <CircularProgress color="success" /> : ""}
                    <Grid container style={{ justifyContent: "right" }}>
                      <Button type="submit" variant="contained">
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
            {errorMsg ? (
              <Alert severity="error" variant="filled" sx={{ marginTop: 5 }}>
                {errorMsg}
              </Alert>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={1} md={4} sm={2}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
