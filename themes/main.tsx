import * as Mui from "@mui/material";
import React from "react";
import * as Themes from "themes";

export const Main = ({ children }: Main.Props) => {
  let theme = Mui.createTheme({
    ...Themes.Global.Shared(),
  });

  theme = Mui.createTheme(theme, {
    shadows: [...theme.shadows, "0px 12px 45px #00000026"],
  });

  return (
    <Mui.ThemeProvider theme={theme}>
      {children || null}
    </Mui.ThemeProvider>
  );
};

export declare namespace Main {
  export interface Props {
    children?: React.ReactNode;
  }
}
