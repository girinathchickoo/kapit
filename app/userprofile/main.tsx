import * as Mui from "@mui/material";
import * as React from "react";
import * as Views from "app/userprofile/views";
import * as Routers from "next/router";
import * as ReactQuery from "react-query";
import * as Api from "api";

export const Main = () => {
  const routers = Routers.useRouter();

  const { data, isLoading } = ReactQuery.useQuery("getUsersDetails", () => {
    return Api.Server.Client().post(Api.Server.ApiRoutes.profile.oneUser, {
      user_id: routers?.query?.userId,
    });
  });

  const userDetails = data?.data?.data;

  return (
    <Mui.Box sx={{ marginTop: { xs: "180px", md: "300px" } }}>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12} md={7}>
          <Views.ProfileTabs />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={5}>
          <Views.ProfileCard userDetails={userDetails} />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
