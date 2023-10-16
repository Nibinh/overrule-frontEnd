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
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { register } from "../store/userSlice";
import { regErrorMsg } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibletwo, setVisibletwo] = useState(false);
  const regMsg = useSelector((state) => state.users.regMsg);
  const regError = useSelector((state) => state.users.regError);
  const regMail = useSelector((state) => state.users.regMail);
  const regLoading = useSelector((state) => state.users.regLoading);
  console.log(regLoading);

  const EndAdorement = ({ visible, setVisible }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <VisibilityIcon /> : <VisibilityOffOutlinedIcon />}
        </IconButton>
      </InputAdornment>
    );
  };
  const EndAdorementtwo = ({ visibletwo, setVisibletwo }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisibletwo(!visibletwo)}>
          {visibletwo ? <VisibilityIcon /> : <VisibilityOffOutlinedIcon />}
        </IconButton>
      </InputAdornment>
    );
  };
  const registerSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    confirmpassword: Yup.string().required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  useEffect(() => {
    if (regMsg) {
      console.log(regMsg);
      localStorage.setItem("regEmail", regMail);
      setTimeout(() => {
        navigate("/otp");
      }, 2000);
    }
    if (regError) {
      console.log(regError);
      setTimeout(() => {
        dispatch(regErrorMsg());
      }, 5000);
    }
  }, [regMsg, regError]);

  const { errors, handleSubmit, handleChange, touched } = formik;
  return (
    <div
      style={{
        backgroundColor: "lightpink",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        {/* <div class="animate__animated animate__pulse">Example</div> */}
        <Grid container spacing={2}>
          <Grid item xs={1} md={4} sm={2}></Grid>
          <Grid item xs={10} md={4} sm={8} style={{ textAlign: "center" }}>
            <FormikProvider value={formik}>
              <Grid sx={{ fontSize: 50, fontFamily: "serif", marginBottom: 4 }}>
                Register User
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
                          label="Enter your name"
                          rows={2}
                          name="name"
                          onChange={handleChange}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="name">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ marginBottom: 4 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Enter Email"
                          rows={2}
                          name="email"
                          type="email"
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
                    <Grid sx={{ marginBottom: 4 }}>
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
                    <Grid sx={{ marginBottom: 1 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Confirm Password"
                          rows={2}
                          name="confirmpassword"
                          type={visibletwo ? "text" : "password"}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <EndAdorementtwo
                                visibletwo={visibletwo}
                                setVisibletwo={setVisibletwo}
                              />
                            ),
                          }}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                        <ErrorMessage name="confirmpassword">
                          {(error) => (
                            <div style={{ color: "red" }}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    {regMsg || regLoading === "pending" ? (
                      <CircularProgress color="success" />
                    ) : (
                      ""
                    )}
                    <Grid container style={{ justifyContent: "right" }}>
                      <Button type="submit" variant="contained">
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
            {regError ? (
              <Alert severity="error" variant="filled" sx={{ marginTop: 3 }}>
                {regError}
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

export default Register;
