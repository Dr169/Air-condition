import { Box, CssBaseline, Grid } from "@mui/material";

import { HeaderFooter } from "../components/HeaderFooter";

export const Dashboard = () => {
  return (
    <HeaderFooter>
      <Grid
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
      </Grid>
    </HeaderFooter>
  );
};
