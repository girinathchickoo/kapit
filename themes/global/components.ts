import * as Mui from "@mui/material";

export const Components = (): Pick<Mui.ThemeOptions, "components"> => {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "@global": {
            "@font-face": [
              {
                fontFamily: "Raleway-medium",
                fontStyle: "sans-serif",
                fontDisplay: "swap",
                fontWeight: 400,
              },
            ],
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& input": {
              backgroundColor: "#FAF7FF !important",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            textTransform: "capitalize",
            fontSize: "0.7rem !important",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "1rem !important",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            boxShadow: "0px 20px 30px #00000036 !important",
          },
        },
      },
    },
  };
};
