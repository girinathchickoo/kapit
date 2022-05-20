import React from "react";
import * as Mui from "@mui/material";

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-bold",
});

const StyledTypographyMedium = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-medium",
});

export const RalewayTypographyBold = (props: any) => {
  return <StyledTypography {...props}>{props.text}</StyledTypography>;
};

export const RalewayTypographyMedium = (props: any) => {
  return (
    <StyledTypographyMedium {...props}>{props.text}</StyledTypographyMedium>
  );
};
