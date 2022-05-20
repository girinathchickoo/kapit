import * as Mui from "@mui/material";
import * as Views from "../foodtrip/views";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Layouts from 'layouts';
import * as React from 'react';
import * as Hooks from 'hooks';

export const Main = () => {
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);
  const { isLoading, data, refetch } = ReactQuery.useQuery(["foodtripList", value], () => {
    return Api.Server.Client().post(Api.Server.ApiRoutes.foodTrip.postList, {
      pageNumber: 1,
      search: value
    });
  });
  const foodTripList = data?.data?.data;

  // const { data: placeoftheWeek } = ReactQuery.useQuery("placeoftheweek", () => {
  //   return Api.Server.Client().post(Api.Server.ApiRoutes.foodTrip.featurepost, {
  //     type: 'place_of_the_week'
  //   });
  // });
  // const placeWeek = placeoftheWeek?.data?.data[0];

  // const { data: FoodoftheWeek } = ReactQuery.useQuery("foodoftheweek", () => {
  //   return Api.Server.Client().post(Api.Server.ApiRoutes.foodTrip.featurepost, {
  //     type: 'food_of_the_week'
  //   });
  // });
  // const FoodWeek = FoodoftheWeek?.data?.data[0];
  const { data:subdata } = ReactQuery.useQuery(
    ["getFeaturePost"],
    async () => {
      const data = await Api.Server.Client().post(
        Api.Server.ApiRoutes.foodTrip.getFeaturePost,
      );
      return data;
    },
  );
  const { data:Recipe } = ReactQuery.useQuery(
    ["recipeSharing"],
    async () => {
      const data = await Api.Server.Client().post(
        Api.Server.ApiRoutes.foodTrip.recipeSharing,
      );
      return data;
    },
  );
  const placeWeek = subdata?.data?.data?.place_of_the_week[0]
  const FoodWeek = subdata?.data?.data?.food_of_the_week[0]
  const RecipeSharingData = Recipe?.data?.data;
  console.log("data44",Recipe)

  return (
    <Mui.Box>
      <Mui.Box sx={{ pt: 2 }}>
        <Views.CreatePost refetchData={refetch} />
      </Mui.Box>
      <Mui.Box>
        <Mui.Grid container spacing={2}>
          <Mui.Grid item xs={12} md={7}>
            <Views.GeneralPost refetchData={refetch} data={foodTripList} />
          </Mui.Grid>
          <Mui.Grid item xs={12} md={5}>
            <Views.FeaturePost place={placeWeek} food={FoodWeek} />
            <Views.RecepeSharing data={RecipeSharingData} />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Box>
    </Mui.Box>
  );
};
