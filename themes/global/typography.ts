import type * as Mui from "@mui/material";

export const Typography = (): Pick<Mui.ThemeOptions, "typography"> => {
  return {
    typography: {
      fontFamily: ["Raleway-medium", "sans-serif"].join(", "),
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  };
};
