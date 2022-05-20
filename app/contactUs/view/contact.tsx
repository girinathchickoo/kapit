import * as Mui from "@mui/material";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";

export const ContactInfo = () => {
  return (
    <Mui.Stack
      sx={{
        p: 5,
        border: "1px solid #E3E3E3",
        borderRadius: "16px",
        ":hover": {
          border: "1px solid #9B7DD4",
        },
        maxWidth: { xs: "100%", md: "450px" },
      }}
      spacing={2}
    >
      <Mui.Box>
        <Mui.Stack direction="row" alignItems="center">
          <Mui.Box>
            <MuiIcons.LocationOn color="primary" fontSize="small" />
          </Mui.Box>
          <Mui.Typography
            color="primary"
            sx={{
              fontSize: "1.2rem",
              fontFamily: "CallunaTitle-Bold",
            }}
          >
            Address
          </Mui.Typography>
        </Mui.Stack>
        <Mui.Box>
          <Mui.Typography
            sx={{
              ml: 2,
              color: "#707070",
              fontFamily: "callunaSans- Semibold",
            }}
          >
            3726 George Street, Peterborough, Ontario, Zip code: K9H 2L1,
            Canada.
          </Mui.Typography>
        </Mui.Box>
      </Mui.Box>
      <Mui.Divider />
      <Mui.Box>
        <Mui.Stack direction="row" alignItems="center">
          <Mui.Box>
            <MuiIcons.Message color="primary" fontSize="small" />
          </Mui.Box>
          <Mui.Typography
            color="primary"
            sx={{
              fontSize: "1.2rem",
              fontFamily: "CallunaTitle-Bold",
            }}
          >
            Contact
          </Mui.Typography>
        </Mui.Stack>
        <Mui.Box>
          <Mui.Typography
            sx={{
              ml: 2,
              color: "#707070",
              fontFamily: "callunaSans- Semibold",
            }}
          >
            +1 705-312-7669
          </Mui.Typography>
          <Mui.Typography
            sx={{
              ml: 2,
              color: "#707070",
              fontFamily: "callunaSans- Semibold",
            }}
          >
            mykapitbahay@gmail.com
          </Mui.Typography>
        </Mui.Box>
      </Mui.Box>
    </Mui.Stack>
  );
};
