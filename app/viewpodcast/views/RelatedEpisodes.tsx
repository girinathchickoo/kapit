import * as Mui from "@mui/material";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Nextrouter from "next/router";

const ViewMoreButton = Mui.styled(Mui.Button)(({ theme }) => ({
  color: "#707070",
  fontSize: "12px",
}));

const ImageContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "100%",
  height: "200px",
  cursor: "pointer",
  marginBottom: "40px",
  position: "relative",
}));

const DavisFontText = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.8rem",
  color: "#333333",
});

export const RelatedEpisodes = () => {
  const routes = Nextrouter.useRouter();
  const getQuery = routes.query;
  const { isLoading, data } = ReactQuery.useQuery(
    ["relatedArticle", getQuery],
    () => {
      return Api.Server.Client().post(
        Api.Server.ApiRoutes.whatsUpCanada.relatedPodcast,
        {
          podcast_id: getQuery?.podcastid,
        }
      );
    }
  );
  const getData = data?.data?.data;

  return (
    <Mui.Box>
      <Components.CardWithTitle
        title={"Related Podcasts"}
        actions={null}
        extraText={null}
      >
        <Mui.Stack
          spacing={2}
          direction={"row"}
          sx={{
            overflowX: "auto",
            width: "150vw",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {getData?.map((item: any, index: number) => (
            <Mui.Stack
              sx={{ minWidth: "10rem" }}
              onClick={() =>
                routes.push(`/whats-up-canada/podcast/${item._id}`)
              }
            >
              <Mui.Stack spacing={1} sx={{ width: "10rem" }}>
                <Mui.Box
                  sx={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    overflow: "hidden",
                    width: "100%",
                    height: "9rem",
                  }}
                >
                  <Mui.CardMedia
                    component="img"
                    src={item?.author_imageUrl}
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Mui.Box>
                <Mui.Box>
                  <DavisFontText>{item?.title}</DavisFontText>
                  <DavisFontText sx={{ fontSize: "0.7rem" }} color={"#707070"}>
                    {item?.description}
                  </DavisFontText>
                </Mui.Box>
              </Mui.Stack>
            </Mui.Stack>
          ))}
        </Mui.Stack>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
