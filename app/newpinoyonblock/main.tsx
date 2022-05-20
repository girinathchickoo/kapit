import React from "react";
import * as Mui from "@mui/material";
import * as Api from "api";
import * as ReactQuery from "react-query";
import * as Components from "components";
import * as Views from "app/newpinoyonblock/views";
import * as Layouts from "layouts";

export const Main = () => {
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);
  const { isLoading, data } = ReactQuery.useQuery(["newPinoyBlock", value], async () => {
    let datas = await Api.Server.Client().post(
      Api.Server.ApiRoutes.newPinoyOntheBlock.list,
      {
        search: value,
        pageNumber: 1,
      }
    );
    return datas?.data?.result;
  });

  return (
    <Mui.Box>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12} md={8}>
          <Views.Articles data={data} />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={4}>
          <Components.CardWithTitle
            title={"Latest Articles"}
            actions={null}
            extraText={null}
          >
            <Views.RelatedArticles />
          </Components.CardWithTitle>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
