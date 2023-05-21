import { useEffect } from "react";
import Chart from "react-apexcharts";

import Card from "@mui/material/Card";
import { Box } from "@mui/material";

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

export const SetTempHistory = () => {
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
