import { useEffect } from "react";
import { RadialGauge } from "react-canvas-gauges";

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

export const SetRadialGauge = () => {
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
