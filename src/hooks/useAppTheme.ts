import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../config/theme";
import { useLocalStorage } from "./useLocalStorage";

export function useAppTheme() {
  const [theme, setTheme] = useState(darkTheme);
  const [soredThemeMode, setStoredThemeMode] = useLocalStorage<
    "dark" | "light"
  >("themeMode", "dark");

  const toggleTheme = () => {
    const currentTheme = theme.palette.mode === "dark" ? lightTheme : darkTheme;
    setTheme(currentTheme);
    setStoredThemeMode(currentTheme.palette.mode);
  };

  useEffect(() => {
    const currentTheme = soredThemeMode === "dark" ? darkTheme : lightTheme;
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, [soredThemeMode]);

  return [theme, toggleTheme] as const;
}
