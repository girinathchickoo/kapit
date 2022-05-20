import * as Mui from "@mui/material";
import * as Views from 'app/pinoypreneurs/views';
import * as Query from "react-query";
import * as Server from "api";

export const Main = () => {

  const { isLoading, data } = Query.useQuery(["checkUser"], async () => {
    const data = await Server.Server.Client().get(Server.Server.ApiRoutes.pinoyPreneurs.checkUser, {})
    console.log(data)
    return data.data
  });

  return (
    <Mui.Stack spacing={2}>
      {isLoading ? <>loading...</> : data?.data?.pinoy_preneur ? <></> : <Views.PostCard />}
      <Views.BusinessListing />
    </Mui.Stack>
  );
};
