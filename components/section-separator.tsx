import React from "react";
import * as Mui from "@mui/material";

const AtfContainer = Mui.styled(Mui.Paper)({
  width: "80%",
  height: "250px",
  margin: "auto",
  padding: 20,
  boxShadow: "none",
});

const MobileAtfContainer = Mui.styled(Mui.Paper)({
  width: "250",
  height: "260px",
  margin: "10px auto",
  padding: 20,
  boxShadow: "none",
});

export const SectionSeparator = () => {
  return (
    <Mui.Box>
      <Mui.Box sx={{ display: { xs: "none", md: "none", lg:'block' } }}>
        <AtfContainer>
          <Mui.Typography>Section Separator</Mui.Typography>
        </AtfContainer>
      </Mui.Box>

      <Mui.Box sx={{ display: { xs: "block", md: "block", lg:'none' } }}>
        <MobileAtfContainer>
          <Mui.Typography>Section Separator</Mui.Typography>
        </MobileAtfContainer>
      </Mui.Box>
    </Mui.Box>
  );
};