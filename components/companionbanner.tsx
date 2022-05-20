import * as Mui from "@mui/material";

const Container = Mui.styled(Mui.Paper)({
  width: "70%",
  height: "180px",
  margin: "10px auto",
  padding: 20,
});

export const CompanionBanner = () => {
  return (
    <Mui.Box>
      <Container>
        <Mui.Typography>Campanion Banner</Mui.Typography>
      </Container>
    </Mui.Box>
  );
};
