import * as React from "react";
import * as Mui from "@mui/material";
import LoginBackground from "assets/homepage/login_bg@2x.png";
import * as Routers from "next/router";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Context from "context";
import Logo from "assets/Stacked - Colored.png";
import * as Hooks from "hooks";

const Container = Mui.styled(Mui.Box)({
  background: `url(${LoginBackground.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  position: "relative",
});

const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  borderRadius: "10px",
  backgroundColor: "white",
  border: `1px solid ${theme.palette.primary.main}`,
  position: "absolute",
  bottom: "-10px",
  cursor: "pointer",
}));

const StyledText = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  fontFamily: "CallunaTitle-Bold",
});

export const Sidebar = () => {
  const router = Routers.useRouter();
  const { count } = React.useContext(Context.UserProfile.UserProfileContext);
  const userId = Hooks.useUserId();
  const { data } = ReactQuery.useQuery(
    ["getOneUserDetail1", count, userId],
    async () => {
      console.log("UserProfile Count", count);
      return await Api.Server.Client().post(
        Api.Server.ApiRoutes.profile.oneUser,
        {
          user_id: localStorage.getItem("uid"),
        }
      );
    }
  );

  return (
    <Mui.Box sx={{ height: "5.5rem", backgroundColor: "#9B7DD4" }}>
      <Container>
        <Mui.Stack alignItems={"center"} sx={{ p: 2 }}>
          <StyledText color={"white"}>
            {data?.data?.data && data?.data?.data?.full_name
              ? data?.data?.data?.full_name
              : "Login to get Started"}
          </StyledText>
          <Avatar
            onClick={() =>
              data?.data?.data == null
                ? router.push("/accounts/login")
                : router.push("/my-profile")
            }
            variant="rounded"
          >
            {data?.data?.data?.profile_photo ? (
              <img
                src={data?.data?.data?.profile_photo}
                width={"55rem"}
                height={"100%"}
              />
            ) : (
              <img src={Logo.src} width={"55rem"} height={"100%"} />
            )}
          </Avatar>
        </Mui.Stack>
      </Container>
    </Mui.Box>
  );
};
