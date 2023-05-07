import { useEffect } from "react";
import { RadialGauge } from "react-canvas-gauges";
import Chart from "react-apexcharts";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { CssBaseline, Grid } from "@mui/material";

import { Drawer } from "../components/Drawer";
import { gql, useQuery } from "@apollo/client";

const id = localStorage.getItem("id");

const GetUserInfo = gql`
  query getUser {
    user(id: ${id}) {
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

export const Dashboard = () => {
  const SetUserInfo = () => {
    const { data, loading, error, startPolling, stopPolling } =
      useQuery(GetUserInfo);

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

  const SetTempHistory = () => {
    const { data, loading, error, startPolling, stopPolling } =
      useQuery(GetUserInfo);

    useEffect(() => {
      startPolling(1000); // poll interval

      return () => {
        stopPolling();
      };
    }, []);

    if (loading) return "Loading...";

    if (error) return `Error!!${error.message}`;

    const categories = [];
    const tempData = [];
    data.user.department.devices.map((device) => {
      categories.push(device.id);
      tempData.push(device.temperature);
    });

    const Data = {
      options: {
        chart: { id: "basic-bar" },
        stroke: { curve: "smooth" },
        xaxis: {
          categories: categories,
        },
        dataLabels: { enabled: false },
        colors: ["#51C9FF", "#51C9FF", "#51C9FF"],
      },
      series: [
        {
          name: "series-1",
          data: tempData,
        },
      ],
    };

    return (
      <>
        <Card
          sx={{
            width: {
              xl: "60%",
              xs: "100%",
            },
            height: "100%",
            color: "white",
            display: "flex",
            flexDirection: "column",
            boxShadow: "-3px 3px 10px 0px #999",
            borderRadius: "8px",
            marginTop: {
              xl: "0px",
              xs: "50px",
            },
            marginBottom: {
              xl: "0px",
              xs: "150px",
            },
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
            دما دستگاه‌ها
          </Card>
          <Box
            sx={{
              width: "100%",
              margin: "auto",
              width: {
                md: "85%",
                xs: "90%",
                xs: "95%",
              },
              padding: {
                lg: "30px",
                bs: "20px",
                bxs: "15px",
                xs: "5px",
              },
            }}
          >
            <Chart options={Data.options} series={Data.series} type="area" />
          </Box>
        </Card>
      </>
    );
  };

  const SetRadialGauge = () => {
    const { data, loading, error, startPolling, stopPolling } =
      useQuery(GetUserInfo);

    useEffect(() => {
      startPolling(1000); // poll interval

      return () => {
        stopPolling();
      };
    }, []);

    if (loading) return "Loading...";

    if (error) return `Error!!${error.message}`;

    const tempData = [];
    data.user.department.devices.map((device) => {
      tempData.push(device.temperature);
    });

    const average = tempData.reduce((a, b) => a + b, 0) / tempData.length;

    return (
      <>
        <Box
          sx={{
            width: "200px",
            height: "200px",
            margin: "auto",
            marginTop: "30px",
          }}
        >
          <RadialGauge
            units={"°C"}
            title={"دما"}
            value={average}
            minValue={0}
            maxValue={50}
            width={200}
            height={200}
            majorTicks={[
              "۰",
              "۵",
              "۱۰",
              "۱۵",
              "۲۰",
              "۲۵",
              "۳۰",
              "۳۵",
              "۴۰",
              "۴۵",
              "۵۰",
            ]}
            minorTicks={5}
            highlights={[
              { from: 0, to: 25, color: "#51C9FF" },
              { from: 25, to: 50, color: "#E63946" },
            ]}
            colorMinorTicks={"#444"}
            colorMajorTicks={"#000"}
          ></RadialGauge>
        </Box>
      </>
    );
  };

  return (
    <Drawer>
      <Grid sx={{ width: "100%" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xl: "row",
              xs: "column",
            },
            justifyContent: {
              xl: "space-between",
              xs: "center",
            },
            alignItems: "center",
            flexWrap: "wrap",
            padding: {
              lg: "0px 100px",
              md: "0px 80px",
              bxs: "0px 60px",
              xs: "0px 50px",
            },
            paddingTop: {
              lg: "50px",
              md: "30px",
              bxs: "30px",
              xs: "20px",
            },
            fontSize: "1rem",
          }}
        >
          <Box
            sx={{
              width: {
                xl: "30%",
                xs: "100%",
              },
              display: "flex",
              flexDirection: {
                xl: "column",
                md: "row",
                xs: "column",
              },
              justifyContent: "space-between",
            }}
          >
            <SetUserInfo />
            <SetRadialGauge />
          </Box>
          <SetTempHistory />
        </Box>
      </Grid>
    </Drawer>
  );
};
