import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

import { gql, useMutation } from "@apollo/client";

import { loginSchema } from "../utils/schema";
import { HeaderFooter } from "../components/HeaderFooter";

const initialValues = {
  email: "",
  password: "",
};

const Login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const SignIn = () => {
  const navigate = useNavigate();

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setopenSuccess(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const onSubmit = async (values) => {
    const { data } = await login({
      variables: { email: values.email, password: values.password },
    });
    if (data?.login?.token) {
      setopenSuccess(true);
      setTimeout(() => {
        localStorage.setItem("token", `${data.login.token}`);
        localStorage.setItem("id", `${data.login.user.id}`);
        navigate("/dashboard");
      }, 2200);
    } else {
      setOpenError(true);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [login] = useMutation(Login);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <HeaderFooter>
      <Grid
        sx={{
          display: "flex",
          height: "80vh",
          flexDirection: "row",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "80%",
            width: { xs: "100%", md: "50%" },
            marginTop: 8,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderRadius: "7px",
              width: "100%",
              margin: { xs: "0px 20px", sm: "0px 80px" },
            }}
            component={Paper}
            elevation={10}
            mx={10}
          >
            <Box
              sx={{
                my: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "primary.main",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5">ورود</Typography>
              <Box
                sx={{
                  width: "100%",
                  px: { xs: 3, md: 8 },
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    helperText={
                      formik.touched.email && formik.errors.email ? (
                        <Box sx={{ color: "error.main" }}>
                          {formik.errors.email}
                        </Box>
                      ) : (
                        "لطفا ایمیل خود را وارد کنید"
                      )
                    }
                    margin="normal"
                    id="email"
                    name="email"
                    label="ایمیل"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{
                      "& fieldset": {
                        transition: " border 1s",
                        borderColor:
                          formik.touched.email && formik.errors.email
                            ? "#E63946 !important"
                            : "",
                      },
                      width: "100%",
                      "& .MuiFormLabel-root": {
                        color:
                          formik.touched.email && formik.errors.email
                            ? "#E63946 !important"
                            : "",
                      },
                    }}
                  />

                  <FormControl
                    disabled={formik.errors.email || !formik.values.email}
                    sx={{
                      my: 1,
                      "& fieldset": {
                        transition: " border 1s",
                        borderColor:
                          formik.touched.password && formik.errors.password
                            ? "#E63946 !important"
                            : "",
                      },
                      "& .MuiFormLabel-root": {
                        color:
                          formik.touched.password && formik.errors.password
                            ? "#E63946 !important"
                            : "",
                      },
                    }}
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel
                      sx={{
                        color:
                          formik.touched.password && formik.errors.password
                            ? "#E63946 !important"
                            : "",
                      }}
                      htmlFor="outlined-adornment-password"
                    >
                      رمز
                    </InputLabel>
                    <OutlinedInput
                      name="password"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            sx={{
                              color:
                                formik.touched.password &&
                                formik.errors.password
                                  ? "#E63946 !important"
                                  : "",
                            }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label={<Box>رمز</Box>}
                    />

                    <FormHelperText
                      sx={{
                        color:
                          formik.touched.password && formik.errors.password
                            ? "#E63946 !important"
                            : "",
                      }}
                    >
                      {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : "  رمز را وارد کنید"}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    disabled={
                      !formik.values.email ||
                      !formik.values.password ||
                      formik.errors.email ||
                      formik.errors.password
                    }
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <Typography variant="button">ورود</Typography>
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: { xs: "none", md: "flex" },
          }}
        >
          <img
            src="/images/login.svg"
            alt="login svg"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            ورود ناموفق. نام کاربری یا رمز عبور نامعتبر است!
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={openSuccess}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            ورود با موفقیت انجام شد.
          </MuiAlert>
        </Snackbar>
      </Grid>
    </HeaderFooter>
  );
};
