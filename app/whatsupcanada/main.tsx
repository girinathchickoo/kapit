import * as Mui from "@mui/material";
import * as Views from "app/whatsupcanada/views";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as React from "react";
import * as Layouts from "layouts";

export const Main = () => {
  const [articlePage, setArticlePage] = React.useState<any>({
    articlePages: 1,
    proudlyPinoyPage: 1,
    podcastPage: 1,
  });
  const [pageCount, setPageCount] = React.useState<number>(0);
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);

  const { isLoading, data } = ReactQuery.useQuery(
    ["whatsupCanada", articlePage, value],
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.whatsUpCanada.overall,
        {
          search: value,
          articlePageNumber: articlePage.articlePages,
          proudlyPinoyPage: articlePage.proudlyPinoyPage,
          podcastPage: 1,
        }
      );
      setPageCount(datas?.data?.totalArticlePages);
      return datas?.data?.data;
    }
  );

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setArticlePage((preValue: any) => ({ ...preValue, articlePages: value }));
  };

  const viewMorePinoy = () => {
    setArticlePage((preValue: any) => ({
      ...preValue,
      proudlyPinoyPage: articlePage.proudlyPinoyPage + 1,
    }));
  };

  return (
    <Mui.Box sx={{ height: "auto" }}>
      {isLoading ? (
        <Components.Loader />
      ) : (
        <Mui.Box>
          <Mui.Grid container spacing={2}>
            <Mui.Grid item xs={12} md={12} lg={8}>
              <Views.Articles
                pageNation={onPageChange}
                pageCount={pageCount}
                pageNumber={articlePage.articlePages}
                data={data?.articlesList}
              />
            </Mui.Grid>
            <Mui.Grid item xs={12} md={12} lg={4}>
              <Views.VideoFeed data={data?.VideosFeedList} />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Box sx={{ mt: 2 }}>
            <Components.SectionSeparator />
          </Mui.Box>
          <Mui.Box sx={{ mt: 2 }}>
            <Views.ProudlyPinoy
              viewMorePinoy={viewMorePinoy}
              data={data?.proudlyPinoyList}
            />
          </Mui.Box>
          <Mui.Box sx={{ mt: 2 }}>
            <Views.Podcast data={data?.podcastListList} />
          </Mui.Box>
        </Mui.Box>
      )}
    </Mui.Box>
  );
};
