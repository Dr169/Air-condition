import Box from "@mui/material/Box";
import { CssBaseline, Grid } from "@mui/material";

import { Drawer } from "../components/Drawer";

export const Users = () => {
  return (
    <Drawer>
      <Grid sx={{ width: "100%" }}>
        <CssBaseline />
      </Grid>
    </Drawer>
  );
};
