import { useEffect } from "react";

import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ApartmentIcon from "@mui/icons-material/Apartment";

import { gql, useQuery } from "@apollo/client";

const GetUserInfo = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      lastLogin
      firstName
      lastName
      email
      phoneNumber
      admin
      department {
        name
        devices {
          id
          temperature
        }
      }
    }
  }
`;

export const SetUserInfo = () => {
  const id = localStorage.getItem("id");

  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GetUserInfo,
    {
      variables: {
        id: parseInt(id),
      },
    }
  );

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, []);

  if (loading) return "Loading...";

  if (error) return `Error!!${error.message}`;

  const lastLogin = new Date(data.user.lastLogin).toLocaleString();

  return (
    <>
      <Card
        sx={{
          width: {
            xl: "100%",
            md: "50%",
            xs: "100%",
          },
          height: "320px",
          backgroundColor: "#fff",
          color: "white",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          boxShadow: "-3px 3px 10px 0px #999",
        }}
      >
        <Card
          sx={{
            backgroundColor: "primary.main",
            height: "50px",
            width: "100%",
            padding: "13px",
            color: "#fff",
            borderRadius: "0px",
          }}
        >
          اطلاعات کاربری
        </Card>

        <Typography
          sx={{
            fontSize: {
              sm: "0.9rem",
              bxs: "0.7rem",
              xs: "0.6rem",
            },
            margin: "0px auto",
            color: "black",
            width: "90%",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #aaa",
          }}
        >
          <PersonIcon sx={{ margin: "10px 0px", marginRight: "10px" }} />
          نام کاربری : {data.user.firstName} {data.user.lastName}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              sm: "0.9rem",
              bxs: "0.7rem",
              xs: "0.6rem",
            },
            margin: "0px auto",
            color: "black",
            width: "90%",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #aaa",
          }}
        >
          <PhoneIcon sx={{ margin: "10px 0px", marginRight: "10px" }} />
          تلفن : {data.user.phoneNumber}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              sm: "0.9rem",
              bxs: "0.7rem",
              xs: "0.6rem",
            },
            margin: "0px auto",
            color: "black",
            width: "90%",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #aaa",
          }}
        >
          <AlternateEmailIcon
            sx={{ margin: "10px 0px", marginRight: "10px" }}
          />
          ایمیل : {data.user.email}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              sm: "0.9rem",
              bxs: "0.7rem",
              xs: "0.6rem",
            },
            margin: "0px auto",
            color: "black",
            width: "90%",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #aaa",
          }}
        >
          <AdminPanelSettingsIcon
            sx={{ margin: "10px 0px", marginRight: "10px" }}
          />
          سطح دسترسی : {data.user.admin ? "ادمین" : "کاربر"}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              sm: "0.9rem",
              bxs: "0.7rem",
              xs: "0.6rem",
            },
            margin: "0px auto",
            color: "black",
            width: "90%",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #aaa",
          }}
        >
          <ApartmentIcon sx={{ margin: "10px 0px", marginRight: "10px" }} />
          اداره : {data.user.department.name}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              sm: "0.9rem",
              bxs: "0.7rem",
              xs: "0.6rem",
            },
            margin: "0px auto",
            color: "black",
            width: "90%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccessTimeIcon sx={{ margin: "10px 0px", marginRight: "10px" }} />
          آخرین بازدید : {lastLogin}
        </Typography>
      </Card>
    </>
  );
};
