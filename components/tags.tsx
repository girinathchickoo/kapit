import React from "react";
import * as Mui from "@mui/material";

const StyledText = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
  fontFamily: "CallunaSans-Regular",
});

const Container = Mui.styled(Mui.Box)({
  padding: "0.3rem",
  borderRadius: "5px",
  width: "fit-content"
});

export const Tags = ({ tagname, color, textcolor }: Tags) => {
  return (
    <Container sx={{ bgcolor: `${color}` }}>
      <StyledText color={textcolor !== null ? textcolor : "black"} noWrap>
        {tagname}
      </StyledText>
    </Container>
  );
};

interface Tags {
  tagname: string | null;
  color: string | null;
  textcolor?: string | null;
}
