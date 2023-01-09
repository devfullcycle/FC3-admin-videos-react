import { AppBar, Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { SnackbarProvider } from "notistack";
import React, { useState } from "react";
import { useAppTheme } from "../hooks/useAppTheme";
import { Header } from "./Header";
import ResponsiveDrawer from "./ResponsiveDrawer";

const drawerWidth = 240;

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTheme, toggleCurrentTheme] = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Header
            handleDrawerToggle={handleDrawerToggle}
            toggle={toggleCurrentTheme}
            theme={currentTheme.palette.mode === "dark" ? "dark" : "light"}
          />
        </AppBar>

        <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle} />

        <SnackbarProvider
          autoHideDuration={2000}
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Container maxWidth="lg" sx={{ color: "white", my: 12 }}>
            {children}
          </Container>
        </SnackbarProvider>
      </Box>
    </ThemeProvider>
  );
}
