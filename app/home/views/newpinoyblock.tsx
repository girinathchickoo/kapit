import * as Mui from "@mui/material";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as NextRouters from "next/router";
import moment from "moment";
import * as Layouts from "layouts";
import * as React from "react";

const ImageContainer = Mui.styled(Mui.Box)({
  display: "flex",
  alignItems: "center",
  width: "7rem",
});

const Styledtypography = Mui.styled(Mui.Typography)({
  fontSize: "0.9rem",
  fontFamily: "CallunaSans-Regular",
});

const Heading = Mui.styled(Mui.Typography)({
  fontSize: "1rem",
  color: "#333333",
  fontFamily: "CallunaTitle-Semibold",
  fontWeight: 600,
  opacity: 0.9,
});

const Subheader = Mui.styled(Mui.Typography)({
  fontSize: "0.9rem",
  color: "#707070",
  fontFamily: "CallunaSans-Bold",
  opacity: 0.9,
  maxHeight: "75px",
  overflow: "hidden",
  ">p": {
    marginTop: "7px",
    marginBottom: "2px",
  },
});

const ViewMoreButton = Mui.styled(Mui.Button)({
  color: "#707070",
});

export const NewPinoyOntheBlock = () => {
  const routers = NextRouters.useRouter();
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);
  const { isLoading, data } = ReactQuery.useQuery(
    ["newPinoyBlock", value],
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.homePage.newPinoyBlock,
        {
          search: value,
          pageNumber: 1,
        }
      );
      return datas?.data?.data;
    }
  );

  return (
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        title={"New Pinoys on the Block"}
        actions={
          <ViewMoreButton onClick={() => routers.push(`/new-pinoys`)}>
            View More
          </ViewMoreButton>
        }
        extraText={null}
      >
        <Mui.Stack sx={{ display: { xs: "none", md: "block" } }} spacing={2}>
          {data?.slice(0, 5).map((item: any, index: number) => (
            <Mui.Stack
              sx={{ cursor: "pointer", padding: { xs: "8px 14px", md: "0px" } }}
              onClick={() => {
                routers.push(`/new-pinoys/${item._id}`);
              }}
              key={index}
              direction={"row"}
              spacing={2}
            >
              <ImageContainer>
                <Mui.Box
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", sm: "7rem" },
                    borderRadius: "20px",
                    height: { xs: "10rem", sm: "7rem" },
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  component="img"
                  src={item.thumbNail_url}
                />
              </ImageContainer>
              <Mui.Stack spacing={0.5} sx={{ width: `calc(100% - 10.5rem)` }}>
                <Mui.Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Components.Tags
                    tagname={item?.province_name}
                    color={"#EDFFFB"}
                    textcolor={"#137966"}
                  />
                  {/* <Styledtypography>{moment(item?.createdAt).format("MMM DD, YYYY")}</Styledtypography> */}
                </Mui.Stack>
                <Heading>{item.title}</Heading>
                {/* <Subheader
                  dangerouslySetInnerHTML={{ __html: item.description }}
                /> */}
              </Mui.Stack>
            </Mui.Stack>
          ))}
        </Mui.Stack>
        {/* <Mui.Stack sx={{ display: { xs: "block", md: "none" } }} spacing={2}>
          {data?.slice(0, 5).map((item: any, index: number) => (
            <Mui.Stack
              sx={{ cursor: "pointer" }}
              onClick={() => routers.push(`/whats-up-canada/${item._id}`)}
              key={index}
              spacing={2}
            >
              <ImageContainer sx={{ width: "100%", height: "13rem" }}>
                <Mui.Box
                  sx={{ borderRadius: "20px" }}
                  width={"100%"}
                  height={"100%"}
                  component="img"
                  src={item.thumbNail_url}
                />
              </ImageContainer>
              <Mui.Stack spacing={0.5} sx={{ width: "100%" }}>
                <Mui.Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Styledtypography
                    sx={{ fontSize: "0.7rem" }}
                    color={"#BEBEBE"}
                  >
                    {item.source} . {item.province_name}
                  </Styledtypography>
                  <Styledtypography sx={{ fontSize: '0.7rem' }}>{moment(item?.createdAt).format("MMM DD, YYYY")}</Styledtypography>
                </Mui.Stack>
                <Heading>{item.title}</Heading>
                <Subheader
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </Mui.Stack>
            </Mui.Stack>
          ))}
        </Mui.Stack> */}
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
