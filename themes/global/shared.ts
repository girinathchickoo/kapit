import * as Mui from "@mui/material";
import * as Themes from "themes";

export const Shared = (): Mui.ThemeOptions => {
  const components = Themes.Global.Components();
  const palette = Themes.Global.Palette();
  const typography = Themes.Global.Typography();

  return {
    ...components,
    ...typography,
    ...palette,
  };
};
