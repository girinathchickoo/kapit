import React from "react";
import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import SampleImage from "assets/Rectangle 267@2x.png";
import * as Views from "../views";

const StyledImgContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "8rem",
  cursor: "pointer",
  position: "relative",
});

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-semibold",
  fontSize: "0.75rem",
  whiteSpace: "nowrap",
});

const TextOverLay = Mui.styled(Mui.Box)({
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
  backgroundColor: "#3e3d3dbf",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  transition: "opacity 0.25s",
  opacity: 0,
  "& > *": {
    transform: "translateY(20px)",
    transition: "transform 0.25s",
  },
  "&:hover": {
    opacity: 1,
  },
  "&:hover > * ": {
    transform: "translateY(0)",
  },
});

export const ProfileTabs = () => {
  const [value, setValue] = React.useState("1");
  const [isOwner, setIsowner] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Mui.Paper sx={{ p: { xs: 1, md: 3 } }} elevation={0}>
      <Mui.Box sx={{ width: "100%", typography: "body1" }}>
        <MuiLab.TabContext value={value}>
          <Mui.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <MuiLab.TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ width: "100%" }}
              variant="fullWidth"
            >
              <Mui.Tab
                label={
                  <StyledTypography
                    color={"#333333"}
                    sx={{
                      fontSize: value === "1" ? "1rem" : "0.75rem",
                      textTransform: "capitalize",
                    }}
                  >
                    LIVE Slots
                  </StyledTypography>
                }
                value="1"
              />
              <Mui.Tab
                label={
                  <StyledTypography
                    color={"#333333"}
                    sx={{
                      fontSize: value === "2" ? "1rem" : "0.75rem",
                      textTransform: "capitalize",
                    }}
                  >
                    Payment
                  </StyledTypography>
                }
                value="2"
              />
              <Mui.Tab
                label={
                  <StyledTypography
                    color={"#333333"}
                    sx={{
                      fontSize: value === "3" ? "1rem" : "0.75rem",
                      textTransform: "capitalize",
                    }}
                  >
                    Summary
                  </StyledTypography>
                }
                value="3"
              />
            </MuiLab.TabList>
          </Mui.Box>
          <MuiLab.TabPanel value="1">
            <Views.LiveSlotDetails />
          </MuiLab.TabPanel>
          <MuiLab.TabPanel value="2">
            <Views.Payments />
          </MuiLab.TabPanel>
          <MuiLab.TabPanel value="3">Summary</MuiLab.TabPanel>
        </MuiLab.TabContext>
      </Mui.Box>
    </Mui.Paper>
  );
};

const FootTrip = () => {
  return (
    <Mui.Grid container spacing={2}>
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <Mui.Grid key={index} item xs={12} md={6} lg={4}>
            <StyledImgContainer>
              <Mui.Box
                component="img"
                src={SampleImage.src}
                width={"100%"}
                height={"100%"}
                sx={{ borderRadius: "20px" }}
              />
              <TextOverLay>
                <StyledTypography color={"#FFFFFF"}>22 Likes</StyledTypography>
                <StyledTypography color={"#FFFFFF"}>
                  22 comments
                </StyledTypography>
              </TextOverLay>
            </StyledImgContainer>
          </Mui.Grid>
        ))}
    </Mui.Grid>
  );
};
