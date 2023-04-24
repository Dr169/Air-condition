import { createTheme } from "@mui/material/styles";

import "./index.css";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#057DCD",
        },
        secondary: {
            main: "#43B0F1",
        },
        error: {
            main: "#E63946",
        },
        background: {
            main: "#E8EEF1",
        },
        success: {
            main: "#2FC948",
        },
        warning: {
            main: "#FFE056",
        },
    },
    typography: {
        fontFamily: "IranYekan",
    },
    direction: "rtl",
    breakpoints: {
        values: {
            xs: 0,
            bxs: 410,
            sm: 600,
            bs: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});
