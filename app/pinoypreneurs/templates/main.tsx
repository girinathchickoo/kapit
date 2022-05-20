import * as Mui from "@mui/material";
import * as Templates from "app/pinoypreneurs/templates";
import * as Routers from "next/router";
import * as ReactQuery from "react-query";
import * as Server from "api";

export const Main = () => {
  const routers = Routers.useRouter();
  const getQuery = routers?.query;
  const pinoyPreneurs = routers?.query?.pinoypreneursid;
  const { data, refetch } = ReactQuery.useQuery(["pinoyPreneursViews", getQuery], async () => {
    const datas = await Server.Server.Client().post(Server.Server.ApiRoutes.pinoyPreneurs.viewProduct, {
      PinoyPreneur_id: pinoyPreneurs,
    });
    return datas?.data?.data;
  });

  console.log(data)

  const selectTemplate = {
    1: <Templates.FirstTemplate refetch={refetch} data={data as Data} />,
    2: <Templates.SecondTemplate refetch={refetch} data={data as Data} />,
    3: <Templates.ThirdTemplate refetch={refetch} data={data as Data} />,
  }[parseInt(getQuery?.templates as any)];

  return <Mui.Box>{selectTemplate}</Mui.Box>;
};

interface Data {
  [key: string]: string | number
}