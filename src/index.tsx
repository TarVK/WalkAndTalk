import {ThemeProvider} from "@mui/material";
import {render} from "react-dom";
import {HashRouter} from "react-router-dom";
import {textColor, theme} from "./theme";
import {App} from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Box} from "@mui/material";

render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <style>{`body { color: ${textColor} ; }`}</style>
            <HashRouter>
                <App></App>
            </HashRouter>
        </ThemeProvider>
    </LocalizationProvider>,
    document.getElementById("root")
);
