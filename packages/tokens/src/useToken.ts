import { token } from "./utils/token";
import { usePwdrTheme } from "@pwdr/theme";

export function useToken(name: string) {
  const { themeKey } = usePwdrTheme();
  return token(name, { theme: themeKey });
}