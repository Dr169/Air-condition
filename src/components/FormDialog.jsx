import { useState, useEffect, Fragment } from "react";
import { useFormik } from "formik";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { PersonAddAlt1, Visibility, VisibilityOff } from "@mui/icons-material";

import { gql, useQuery, useMutation } from "@apollo/client";

import { loginSchema } from "../utils/schema";

const getDeps = gql`
  query getDeps {
    departments {
      results {
        name
      }
    }
  }
`;

const MakeUser = gql`
  mutation makeUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phoneNumber: String!
    $departmentName: ID!
  ) {
    createUser(
      departmentName: $departmentName
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      phoneNumber: $phoneNumber
    ) {
      user {
        id
      }
    }
  }
`;

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  department: "",
  email: "",
  password: "",
};

export const FormDialog = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseCancel = (values) => {
    setOpen(false);
  };

  const handleCloseAdd = (values) => {
    setOpen(false);
    console.log(values);

    const { data } = makeUser({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phone,
        departmentName: values.department,
        email: values.email,
        password: values.password,
      },
    });

    if (data?.user?.id) {
      setopenSuccess(true);
    } else {
      setOpenError(true);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: handleCloseAdd,
  });

  const [makeUser] = useMutation(MakeUser);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const { loading, error, data, startPolling, stopPolling } = useQuery(getDeps);

  useEffect(() => {
    startPolling(1000); // poll interval

    return () => {
      stopPolling();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>Error!{error.message}</div>;
  }

  return (
    <>
      <PersonAddAlt1
        sx={{
          marginRight: "5px",
          transition: "0.3s",
          ":hover": {
            cursor: "pointer",
            scale: "1.1",
          },
        }}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleCloseCancel}>
        <DialogTitle sx={{ paddingBottom: "10px" }}>
          اضافه کردن کاربر
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ padding: "0px 30px" }}>
            <TextField
              required
              fullWidth
              variant="outlined"
              id="firstName"
              name="firstName"
              label="نام"
              margin="normal"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                "& fieldset": {
                  transition: " border 1s",
                  borderColor:
                    formik.touched.firstName && formik.errors.firstName
                      ? "#E63946 !important"
                      : "",
                },
                "& .MuiFormLabel-root": {
                  color:
                    formik.touched.firstName && formik.errors.firstName
                      ? "#E63946 !important"
                      : "",
                },
              }}
              helperText={
                formik.touched.firstName && formik.errors.firstName ? (
                  <Box sx={{ color: "error.main" }}>
                    {formik.errors.firstName}
                  </Box>
                ) : (
                  "نام را وارد کنید"
                )
              }
            />

            <TextField
              required
              fullWidth
              variant="outlined"
              id="lastName"
              name="lastName"
              label="نام خانوادگی"
              margin="normal"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                "& fieldset": {
                  transition: " border 1s",
                  borderColor:
                    formik.touched.lastName && formik.errors.lastName
                      ? "#E63946 !important"
                      : "",
                },
                "& .MuiFormLabel-root": {
                  color:
                    formik.touched.firstName && formik.errors.lastName
                      ? "#E63946 !important"
                      : "",
                },
              }}
              helperText={
                formik.touched.lastName && formik.errors.lastName ? (
                  <Box sx={{ color: "error.main" }}>
                    {formik.errors.lastName}
                  </Box>
                ) : (
                  "نام خانوادگی را وارد کنید"
                )
              }
            />

            <TextField
              required
              fullWidth
              variant="outlined"
              id="phone"
              name="phone"
              label="تلفن"
              margin="normal"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                "& fieldset": {
                  transition: " border 1s",
                  borderColor:
                    formik.touched.phone && formik.errors.phone
                      ? "#E63946 !important"
                      : "",
                },
                "& .MuiFormLabel-root": {
                  color:
                    formik.touched.phone && formik.errors.phone
                      ? "#E63946 !important"
                      : "",
                },
              }}
              helperText={
                formik.touched.phone && formik.errors.phone ? (
                  <Box sx={{ color: "error.main" }}>{formik.errors.phone}</Box>
                ) : (
                  "تلفن را وارد کنید"
                )
              }
            />

            <TextField
              required
              fullWidth
              select
              variant="outlined"
              id="department"
              name="department"
              label="اداره"
              margin="normal"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                "& fieldset": {
                  transition: " border 1s",
                  borderColor:
                    formik.touched.department && formik.errors.department
                      ? "#E63946 !important"
                      : "",
                },
                "& .MuiFormLabel-root": {
                  color:
                    formik.touched.department && formik.errors.department
                      ? "#E63946 !important"
                      : "",
                },
              }}
              helperText={
                formik.touched.department && formik.errors.department ? (
                  <Box sx={{ color: "error.main" }}>
                    {formik.errors.department}
                  </Box>
                ) : (
                  "اداره را انتخاب کنید"
                )
              }
            >
              {data.departments.results.map((option) => (
                <MenuItem value={option.name} key={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              fullWidth
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
                "& .MuiFormLabel-root": {
                  color:
                    formik.touched.email && formik.errors.email
                      ? "#E63946 !important"
                      : "",
                },
              }}
              helperText={
                formik.touched.email && formik.errors.email ? (
                  <Box sx={{ color: "error.main" }}>{formik.errors.email}</Box>
                ) : (
                  "ایمیل را وارد کنید"
                )
              }
            />

            <FormControl
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
              required
              variant="outlined"
            >
              <InputLabel
                sx={{
                  color:
                    formik.touched.password && formik.errors.password
                      ? "#E63946 !important"
                      : "",
                }}
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
                          formik.touched.password && formik.errors.password
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
          </DialogContent>
          <DialogActions>
            <Button onSubmit={handleCloseCancel} type="submit" color="error">
              لغو
            </Button>
            <Button
              onSubmit={handleCloseAdd}
              disabled={
                !formik.values.firstName ||
                !formik.values.lastName ||
                !formik.values.phone ||
                !formik.values.department ||
                !formik.values.email ||
                !formik.values.password ||
                formik.errors.firstName ||
                formik.errors.lastName ||
                formik.errors.phone ||
                formik.errors.department ||
                formik.errors.email ||
                formik.errors.password
              }
              type="submit"
            >
              اضافه کردن
            </Button>
          </DialogActions>
        </form>
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
            اضافه کردن کاربر با مشکل مواجه شد!
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
            کاربر با موفقیت اضافه شد.
          </MuiAlert>
        </Snackbar>
      </Dialog>
    </>
  );
};
