import * as Mui from "@mui/material";
import * as Views from "../bazaarcity/views";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Layouts from "layouts";
import * as React from "react";

export const Main = ({ filters }: any) => {

  const [pageNumber, setPageNumber] = React.useState(1)
  const [typesOfIndustry, setTypesOfIndustry] = React.useState<string[]>([])
  const [locations, setLocations] = React.useState<string[]>([])
  const [jobType, setJobType] = React.useState<string[]>([])

  console.log("typesOfIndustry", typesOfIndustry)
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);

  const { isLoading, data, refetch } = ReactQuery.useQuery(
    ["Get", value, typesOfIndustry],
    () => {
      return Api.Server.Client().post(
        Api.Server.ApiRoutes.bazaarCity.GetBazaarCityList,
        {
          pageNumber: 1,
          search: value,
          categories: typesOfIndustry,
        }
      );
    }
  );

  console.log("data1", data?.data?.data);
  const productList = data?.data?.data;
  console.log("productList", productList);

  console.log("search", value);
  return (
    <Mui.Box>
      <Mui.Stack spacing={2}>
        <Views.PostProduct refetch={refetch} />
        <Views.JoinLive />
        <Views.ProductListing productList={productList} typesOfIndustry={typesOfIndustry} setTypesOfIndustry={setTypesOfIndustry} locations={locations} setLocations={setLocations} jobType={jobType} setJobType={setJobType} refetch={refetch} />
        <Views.LiveSessions />
      </Mui.Stack>
    </Mui.Box>
  );
};

