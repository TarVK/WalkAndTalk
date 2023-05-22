import {createTheme} from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const primaryDark = "#00cf11";
const secondaryDark = "#ce8236";
export const darkText = "rgb(10, 61, 0)";
export const theme = createTheme({
    palette: {
        primary: {
            dark: primaryDark,
            main: "#b5ffbb",
            light: "#f0ffe8",
        },
        secondary: {
            light: "#fff4e9",
            main: "#e5cbb1",
            dark: "#c5a688",
        },
    },
    typography: {
        subtitle2: {
            color: "#999999",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                textPrimary: {
                    color: primaryDark,
                },
                textSecondary: {
                    color: secondaryDark,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .Mui-focused fieldset": {
                        color: `${primaryDark} !important`,
                        borderColor: `${primaryDark} !important`,
                    },
                    "& label.Mui-focused": {
                        color: `${primaryDark} !important`,
                    },
                },
            },
        },
    },
});
export const textColor = "rgba(61, 54, 0, 0.8)";
