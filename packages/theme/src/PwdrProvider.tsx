import * as React from "react";
import {
  PwdrThemeContext,
  PwdrColorScheme,
  PwdrContrast,
  PwdrThemeKey,
} from "./PwdrThemeContext";

function deriveThemeKey(
  colorScheme: PwdrColorScheme,
  contrast: PwdrContrast
): PwdrThemeKey {
  if (contrast === "high") return "high-contrast";
  return colorScheme;
}

type PwdrProviderProps = {
  colorScheme?: PwdrColorScheme;
  contrast?: PwdrContrast;
  children: React.ReactNode;
};

export function PwdrProvider({
  colorScheme = "light",
  contrast = "normal",
  children,
}: PwdrProviderProps) {
  const themeKey = deriveThemeKey(colorScheme, contrast);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.pwdrColorScheme = colorScheme;
    root.dataset.pwdrContrast = contrast;
    root.dataset.pwdrTheme = themeKey;
  }, [colorScheme, contrast, themeKey]);

  return (
    <PwdrThemeContext.Provider
      value={{ colorScheme, contrast, themeKey }}
    >
      {children}
    </PwdrThemeContext.Provider>
  );
}
