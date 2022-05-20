import React from "react";
import * as Mui from "@mui/material";

const AtfContainer = Mui.styled(Mui.Paper)({
  width: "75%",
  height: "14.25rem",
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

export const Atfbanner = () => {
  return (
    <Mui.Box>
      <Mui.Box sx={{ display: { xs: "none", md: "block" } }}>
        <AtfContainer>
          <Mui.Typography>Atf Banner</Mui.Typography>
        </AtfContainer>
      </Mui.Box>

      <Mui.Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileAtfContainer>
          <Mui.Typography>Atf Banner</Mui.Typography>
        </MobileAtfContainer>
      </Mui.Box>
    </Mui.Box>
  );
};
