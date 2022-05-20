import * as Mui from "@mui/material";

export const Palette = (): Pick<Mui.ThemeOptions, "palette"> => {
  return {
    palette: {
      primary: { main: "#9B7DD4" },
    },
  };
};
