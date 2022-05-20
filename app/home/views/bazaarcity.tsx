/* eslint-disable react/jsx-key */
import * as Mui from "@mui/material";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as NextRouters from "next/router";
import * as React from "react";
import * as Layouts from "layouts";

const ViewMoreButton = Mui.styled(Mui.Button)({
  color: "#707070",
});

export const BazaarCity = () => {
  const routers = NextRouters.useRouter();
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);
  const { isLoading, data } = ReactQuery.useQuery(["bazaar", value], () => {
    return Server.Server.Client().post(
      Server.Server.ApiRoutes.bazaarCity.GetBazaarCityList,
      {
        search: value,
        pageNumber: 1,
        categories: [],
      }
    );
  });
  const bazaar = data?.data?.data;
  console.log("bazaar", bazaar);
  return (
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        title={"Bazaar City"}
        actions={
          <ViewMoreButton onClick={() => routers.push(`/bazaar-city`)}>
            View More
          </ViewMoreButton>
        }
        extraText={null}
      >
        <Mui.Stack spacing={2}>
          <Mui.Grid container spacing={2}>
            {bazaar?.map((item: any, index: any) => (
              <Mui.Grid item xs={12} sm={6} key={index}>
                <Mui.Box
                  sx={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    width: "100%",
                    height: "12rem",
                  }}
                  onClick={() => {
                    localStorage.getItem("Mktoken")
                      ? routers.push(`/bazaar-city/${item._id}`)
                      : routers.push(`/accounts/login`);
                  }}
                >
                  <Mui.CardMedia
                    component="img"
                    src={item?.item_images[0]}
                    width={"100%"}
                    height={"100%"}
                  />
                </Mui.Box>
                <Mui.Grid sx={{ paddingTop: "1rem" }}>
                  <Mui.Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "CallunaTitle-Semibold",
                    }}
                    noWrap
                    align="center"
                  >
                    {item.item_name}
                    <Mui.Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#707070",
                        fontFamily: "CallunaSans-Regular",
                      }}
                      align="center"
                    >
                      ${item.price}
                    </Mui.Typography>
                  </Mui.Typography>
                </Mui.Grid>
              </Mui.Grid>
            ))}
          </Mui.Grid>
        </Mui.Stack>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
