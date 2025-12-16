import * as React from "react";

export type PwdrColorScheme = "light" | "dark";
export type PwdrContrast = "normal" | "high";

export type PwdrThemeKey = "light" | "dark" | "high-contrast";

export type PwdrThemeState = {
  colorScheme: PwdrColorScheme;
  contrast: PwdrContrast;
  themeKey: PwdrThemeKey;
};

const PwdrThemeContext = React.createContext<PwdrThemeState>({
  colorScheme: "light",
  contrast: "normal",
  themeKey: "light",
});

export function usePwdrTheme() {
  return React.useContext(PwdrThemeContext);
}

export { PwdrThemeContext };
