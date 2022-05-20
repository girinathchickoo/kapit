import * as Mui from "@mui/material";
import * as React from "react";
import * as Views from "../viewprofile/views";
import * as Routers from "next/router";
import * as ReactQuery from "react-query";
import * as Api from "api";
export const Main = () => {
  const routers = Routers.useRouter();

  const { data, isLoading } = ReactQuery.useQuery("getProfileDetails", () => {
    return Api.Server.Client().post(Api.Server.ApiRoutes.profile.oneUser, {
      user_id: localStorage.getItem("uid"),
    });
  });
  const profileDetails = data?.data?.data;

  return (
    <Mui.Box sx={{ marginTop: { xs: "180px", md: "300px" } }}>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12} md={8}>
          <Views.ProfileTabs />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={4}>
          <Views.ProfileCard profileDetails={profileDetails} />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
