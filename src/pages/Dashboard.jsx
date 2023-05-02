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
        <Box sx={{ width: "100px", height: "100px" }}>
          <h1>hiiiii</h1>
        </Box>
      </Grid>
    </HeaderFooter>
  );
};
