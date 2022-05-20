import * as Mui from "@mui/material";
import * as Views from "app/viewArticles/views";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Nextrouter from "next/router";
import { Atfbanner } from "components";

export const Main = () => {
  const routes = Nextrouter.useRouter();
  const getQuery = routes.query;
  const getKey = Object.keys(getQuery)[0];
  const dynamicKey = getKey === "pinoyid" ? "post_id" : "id";
  const relatedApiKey = getKey === "pinoyid" ? "post_id" : "article_id";
  const { isLoading, data, refetch } = ReactQuery.useQuery(
    ["viewwhatsuparticle", getQuery],
    () => {
      return Api.Server.Client().post(
        getKey !== "pinoyid"
          ? Api.Server.ApiRoutes.whatsUpCanada.viewArticles
          : Api.Server.ApiRoutes.newPinoyOntheBlock.viewOne,
        {
          [dynamicKey]:
            getKey !== "pinoyid" ? getQuery?.whatsupid : getQuery?.pinoyid,
          uid: localStorage.getItem("uid")
        }
      );
    }
  );

  const { data: relatedData } = ReactQuery.useQuery(
    ["viewrelatedarticleilist", getQuery],
    () => {
      return Api.Server.Client().post(
        getKey !== "pinoyid"
          ? Api.Server.ApiRoutes.whatsUpCanada.relatedArticles
          : Api.Server.ApiRoutes.newPinoyOntheBlock.viewRelatedArticle,
        {
          [relatedApiKey]:
            getKey !== "pinoyid" ? getQuery?.whatsupid : getQuery?.pinoyid,
        }
      );
    }
  );

  const whatsupDetails: ApiData = data?.data?.data[0];

  return (
    <Mui.Paper>
      <Mui.Stack>
        <Views.Banners image={whatsupDetails?.thumbNail_url} />
        <Atfbanner />
        <Views.Details
          image={whatsupDetails?.backGround_imageUrl}
          relatedData={relatedData?.data?.data}
          refreshDetails={refetch}
          details={whatsupDetails}
        />
      </Mui.Stack>
    </Mui.Paper>
  );
};

export interface ApiData {
  backGround_imageUrl: string;
  createdAt: Date | string;
  description: string;
  mediaType: string;
  number_of_comments: number;
  number_of_likes: number;
  tag_id: string;
  tag_name: string;
  thumbNail_url: string;
  title: string;
  _id: string;
}
