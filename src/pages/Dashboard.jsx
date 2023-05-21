import Box from "@mui/material/Box";
import { CssBaseline, Grid } from "@mui/material";

import { Drawer } from "../components/Drawer";
import { SetUserInfo } from "../components/SetUserInfo";
import { SetTempHistory } from "../components/SetTempHistory";
import { SetRadialGauge } from "../components/SetRadialGauge";

export const Dashboard = () => {
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
