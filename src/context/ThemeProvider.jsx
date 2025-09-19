import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("app-theme-mode");
      return saved === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("app-theme-mode", mode);
    } catch (e) {}
  }, [mode]);

  const toggleTheme = () => setMode(prev => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => {
    const isLight = mode === "light";
    return createTheme({
      palette: {
        mode,
        background: {
          default: isLight ? "#f5f5f5" : "#121212",
          paper: isLight ? "#fff" : "#1E1E1E",
        },
        text: {
          primary: isLight ? "#000" : "#fff",
          secondary: isLight ? "#333" : "#BDBDBD",
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundImage: isLight
                ? "linear-gradient(90deg, #0F2027, #203A43, #2C5364)"
                : "linear-gradient(90deg, #0b0b0b, #121212, #1b2b33)",
            },
          },
        },
        MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
        MuiTypography: {
          styleOverrides: { root: { color: isLight ? "#000" : "#fff" } },
        },
      },
      typography: { fontFamily: "Roboto, Arial, sans-serif" },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
