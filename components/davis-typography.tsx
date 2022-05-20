import React from "react";
import * as Mui from "@mui/material";

const HaborosansRegular = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-regular",
});

const HaborosansNormal = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
});

export const DavisTypography = (props: any) => {
  return <HaborosansRegular {...props}>{props.text}</HaborosansRegular>;
};

export const DavisTypographyNormal = (props: any) => {
  return <HaborosansNormal {...props}>{props.text}</HaborosansNormal>;
};
