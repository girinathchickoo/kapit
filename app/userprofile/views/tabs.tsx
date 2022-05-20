import React from "react";
import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import SampleImage from "assets/Rectangle 267@2x.png";
import * as Views from 'app/userprofile/views'
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Routers from "next/router";

const StyledImgContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "8rem",
  cursor: "pointer",
  position: "relative",
});

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-semibold",
  fontSize: '0.75rem'
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
  const routers = Routers.useRouter();

  const [value, setValue] = React.useState("1");
  const [isOwner, setIsowner] = React.useState(true);
  // const { data, isLoading } = ReactQuery.useQuery("userBazaar", () => {
  //   return Api.Server.Client().post(
  //     Api.Server.ApiRoutes.profile.userBazaarCityList,
  //     {
  //       user_id: routers.query.uid,

  //     }
  //   );
  // });
  // const userDetails = data?.data?.data;
  // console.log("userDetails1", userDetails)

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
            >
              <Mui.Tab
                label={
                  <StyledTypography
                    color={"#9B7DD4"}
                    sx={{ fontSize: value === "1" ? "1rem" : "0.75rem", textTransform: 'capitalize' }}
                  >
                    Food Trip
                  </StyledTypography>
                }
                value="1"
              />

              <Mui.Tab
                label={
                  <StyledTypography
                    color={"#9B7DD4"}
                    sx={{ fontSize: value === "2" ? "1rem" : "0.75rem", textTransform: 'capitalize' }}
                  >
                    Bazaar City
                  </StyledTypography>
                }
                value="2"
              />

              <Mui.Tab
                label={
                  <StyledTypography
                    color={"#9B7DD4"}
                    sx={{ fontSize: value === "3" ? "1rem" : "0.75rem", textTransform: 'capitalize' }}
                  >
                    Buyanihan
                  </StyledTypography>
                }
                value="3"
              />
            </MuiLab.TabList>
          </Mui.Box>
          <MuiLab.TabPanel value="1"><Views.UsersFoodTripPost /></MuiLab.TabPanel>
          <MuiLab.TabPanel value="2"><Views.UsersBazaarCityPost /></MuiLab.TabPanel>
          <MuiLab.TabPanel value="3"><Views.UsersBuyanihanPost/></MuiLab.TabPanel>
        </MuiLab.TabContext>
      </Mui.Box>
    </Mui.Paper>
  );
};