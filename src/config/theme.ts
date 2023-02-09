import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    background: { default: "#222222" },
    mode: "dark",
    primary: { main: "#f5f5f1" },
    secondary: { main: "#E50914" },
    text: { primary: "#f5f5f1" },
  },
});

export const lightTheme = createTheme({
  palette: {
    background: {},
    mode: "light",
    primary: { main: "#E50914" },
    secondary: { main: "#222222" },
    text: { primary: "#222222" },
  },
});
