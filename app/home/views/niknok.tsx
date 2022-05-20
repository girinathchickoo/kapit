/* eslint-disable react/jsx-key */
import * as Mui from "@mui/material";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Components from "components";
import * as NextRouters from "next/router";
import moment from "moment";
import * as React from "react";
import * as Views from "app/niknok/views";

const ImageContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "14rem",
  cursor: "pointer",
  position: "relative",
});

const Styledtypography = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
});

export const NikNok = () => {
  const routers = NextRouters.useRouter();
  const [openModel, setOpenModel] = React.useState<boolean>(false);
  const [getComicId, setComicId] = React.useState<string>("");
  const { isLoading, data } = ReactQuery.useQuery("niknoklist", () => {
    return Api.Server.Client().post(Api.Server.ApiRoutes.niknok.list, {});
  });
  const nikNokList = data?.data?.data[0];

  const handleModel = (getId: string) => {
    setComicId(getId);
    setOpenModel(!openModel);
  };

  return (
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        title={"Niknok"}
        actions={null}
        extraText={
          <Mui.Typography
            sx={{
              fontSize: "0.9rem",
              paddingLeft: "0.5rem",
              fontFamily: "CallunaSans-Regular",
            }}
            color="default"
          >
            Updated on {moment(nikNokList?.updatedAt).format("MMM DD, YYYY")}
          </Mui.Typography>
        }
      >
        <Mui.Box sx={{ mt: 2 }}>
          <Mui.Grid container spacing={2} alignItems="center">
            {nikNokList?.comic_images
              ?.slice(0, 3)
              .map((item: any, index: any) => (
                <Mui.Grid item xs={12} sm={3} key={index}>
                  <Mui.Box
                    sx={{
                      borderRadius: "15px",
                      overflow: "hidden",
                      width: "100%",
                      height: "14rem",
                    }}
                    onClick={() => handleModel(nikNokList?._id)}
                  >
                    <Mui.CardMedia
                      component="img"
                      src={item}
                      width={"100%"}
                      height={"100%"}
                    />
                  </Mui.Box>
                </Mui.Grid>
              ))}
            <Mui.Grid item xs={12} sm={3}>
              <Mui.Button
                variant="contained"
                fullWidth
                sx={{ m: "10px", position: "center", width: "100%" }}
                onClick={() => routers.push(`/niknok`)}
              >
                Read more
              </Mui.Button>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Box>
      </Components.CardWithTitle>
      <Views.ViewNikNok
        id={getComicId}
        open={openModel}
        onclose={() => setOpenModel(!openModel)}
      />
    </Mui.Box>
  );
};
