import * as Mui from "@mui/material";
import * as Api from "api";
import * as ReactQuery from "react-query";
import moment from "moment";
import * as NextRouters from "next/router";

const Container = Mui.styled(Mui.Box)({
  width: "100%",
  height: "15rem",
  borderRadius: "10px",
  backgroundColor: "#E6E6E6",
});

const Subheader = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  color: "#707070",
  fontFamily: "CallunaTitle-Semibold",
  opacity: 0.9,
  maxHeight: "75px",
  overflow: "hidden",
  ">p": {
    marginTop: "7px",
    marginBottom: "2px",
  },
});

const Styledtypography = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
});

const Heading = Mui.styled(Mui.Typography)({
  fontSize: "0.9rem",
  color: "#333333",
  fontFamily: "CallunaTitle-Bold",
  fontWeight: 600,
  opacity: 0.9,
});

export const RelatedArticles = () => {
  const routers = NextRouters.useRouter();
  const { isLoading, data } = ReactQuery.useQuery(
    "newPinoyBlockrelatedArticles",
    async () => {
      let datas = await Api.Server.Client().post(
        Api.Server.ApiRoutes.newPinoyOntheBlock.relatedArticle,
        {}
      );
      return datas?.data?.data;
    }
  );

  console.log(data);

  return (
    <Mui.Stack spacing={2}>
      {data?.slice(0, 2).map((item: any, index: any) => (
        <Mui.Stack key={index} spacing={2}>
          <Container />
          <Mui.Stack
            spacing={1}
            onClick={() => routers.push(`/whats-up-canada/${item._id}`)}
            sx={{ backgroundColor: "white" }}
          >
            <Mui.Box
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "20rem",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <Mui.CardMedia
                component="img"
                src={item?.backGround_imageUrl}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Mui.Box>
            <Mui.Box>
              {/* <Styledtypography>
                {moment(item?.createdAt).format("MMM DD, YYYY")}
              </Styledtypography> */}
              <Heading>{item.title}</Heading>
            </Mui.Box>
            {/* <Subheader
              sx={{ overflow: "hidden" }}
              dangerouslySetInnerHTML={{
                __html:
                  item.description.length <= 100
                    ? item.description
                    : item.description.substring(0, 100),
              }}
            /> */}
          </Mui.Stack>
        </Mui.Stack>
      ))}
    </Mui.Stack>
  );
};
