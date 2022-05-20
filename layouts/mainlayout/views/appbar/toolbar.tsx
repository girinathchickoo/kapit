import React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as NextRouter from "next/router";
import MessageImage from "assets/message@2x.png";
import NotificationImage from "assets/notification@2x.png";
import * as Hooks from "hooks";
import { Notifications } from "./notification";

const Icon = Mui.styled(Mui.IconButton)(({ theme }) => ({
  borderRadius: "9px",
  border: `1px solid ${theme.palette.primary.main}`,
  color: `${theme.palette.primary.main}`,
  padding: "3px",
  height: "2rem",
  width: "2rem",
}));

const StyledText = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontFamily: "CallunaTitle-Semibold",
  color: `${theme.palette.primary.main}`,
  // fontWeight: 600,
  letterSpacing: "1px",
}));

export const Toolbars = ({ openSidebar }: any) => {
  const userId = Hooks.useUserId();


  const routers = NextRouter.useRouter();
  const getRouteName = routers.pathname.split("/")[1];
  const posterImage = {
    "/": "",
    "whats-up-canada": "What’s up Canada ?",
    foodtrip: "Food Trip",
    pinoypreneurs: "PinoyPreneurs",
    "bazaar-city": "Bazaar City",
    "new-pinoys": "New PInoys on the Block",
    "job-centre": "Job Centre",
    niknok: "Niknok",
    "p-nation": "P-Nation Calendar",
    buyanihan: "Buyanihan",
    tambayan: "Tambayan",
    "my-profile": "My Profile",
  }[getRouteName !== "" ? getRouteName : "/"];

  return (
    <Mui.Toolbar sx={{ minHeight: "50px !important" }}>
      <Mui.Stack
        sx={{ width: "100%" }}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={3}
      >
        <StyledText>{posterImage}</StyledText>
        <Mui.Stack
          direction={"row"}
          justifyContent="flex-end"
          alignItems={"center"}
          spacing={3}
        >
          {/* {userId !== null && (
            <Mui.Box
              sx={{ cursor: "pointer" }}
              width={"14%"}
              component="img"
              src={MessageImage.src}
            />
          )} */}
          {/* <Notifications /> */}



          {userId === null && (
            <Mui.Button
              onClick={() => routers.push("/accounts/login")}
              size="large"
              variant="outlined"
              sx={{ fontSize: "0.6rem", display: { xs: "none", md: "block" } }}
            >
              Login/Signup
            </Mui.Button>
          )}
          <Icon
            onClick={openSidebar}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MuiIcons.Menu sx={{ fontSize: "1.2rem" }} />
          </Icon>
        </Mui.Stack>
      </Mui.Stack>
    </Mui.Toolbar>
  );
};
