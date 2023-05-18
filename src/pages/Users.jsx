import Chart from "react-apexcharts";

import { Box, Card, Typography, CssBaseline, Grid } from "@mui/material";

import { BasicTabs } from "../components/Basictabs";
import { Drawer } from "../components/Drawer";
import { FormDialog } from "../components/FormDialog";

export const Users = () => {
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      colors: ["#057DCD"],
      xaxis: {
        categories: [
          "فروردین",
          "اردیبهشت",
          "خرداد",
          "تیر",
          "مرداد",
          "شهریور",
          "مهر",
          "آبان",
          "آذر",
          "دی",
          "بهمن",
          "اسفند",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 55, 62, 69, 70, 72],
      },
    ],
  };

  return (
    <Drawer>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: {
            lg: "50px 100px",
            md: "30px 80px",
            bxs: "30px 60px",
            xs: "20px 50px",
          },
          fontSize: "1rem",
        }}
      >
        <CssBaseline />
        <Card
          sx={{
            width: "30%",
            height: "500px",
            maxHeight: "500px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            boxShadow: "-3px 3px 10px 0px #999",
          }}
        >
          <Card
            sx={{
              backgroundColor: "primary.main",
              minHeight: "50px",
              maxHeight: "50px",
              width: "100%",
              padding: "13px",
              color: "#fff",
              borderRadius: "0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>کاربر‌ ها</Typography>
            <Typography
              sx={{
                fontSize: "1.5rem",
                color: "#fff ",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormDialog />
            </Typography>
          </Card>
          <BasicTabs />
        </Card>
        <Card
          sx={{
            width: "55%",
            color: "white",
            display: "flex",
            flexDirection: "column",
            boxShadow: "-3px 3px 10px 0px #999",
            borderRadius: "8px",
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
            نمودار تعداد کاربران
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
                lg: "30px 0px",
                bs: "20px 0px",
                bxs: "15px 0px",
                xs: "5px 0px",
              },
            }}
          >
            <Chart options={state.options} series={state.series} type="area" />
          </Box>
        </Card>
      </Grid>
    </Drawer>
  );
};
