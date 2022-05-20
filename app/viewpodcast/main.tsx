import * as Mui from "@mui/material";
import * as Views from "app/viewpodcast/views";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Nextrouter from "next/router";
import * as React from "react";

export const Main = () => {
  const [play, setPlay] = React.useState(false);
  const routes = Nextrouter.useRouter();
  const getQuery = routes.query;

  const { isLoading, data } = ReactQuery.useQuery(
    ["viewwhatsuparticle", getQuery],
    () => {
      return Api.Server.Client().post(
        Api.Server.ApiRoutes.whatsUpCanada.viewPodcast,
        {
          podcast_id: getQuery?.podcastid,
        }
      );
    }
  );

  const authorDetails = data?.data?.data;
  const episodeDetails = data?.data?.podcastEpisodesList;

  const playFirstEpisode = () => {
    setPlay(!play);
  };

  return (
    <Mui.Box>
      <Mui.Stack spacing={2}>
        <Views.AuthorCard
          details={authorDetails}
          play={play}
          playFirstEpisode={playFirstEpisode}
        />
        <Views.Episodes episodes={episodeDetails} play={play} />
        <Mui.Paper sx={{ height: "18rem" }}></Mui.Paper>
        <Views.RelatedEpisodes />
      </Mui.Stack>
    </Mui.Box>
  );
};
