import * as Mui from "@mui/material";
import * as Components from "components";
import * as Api from "api";
import * as Views from "app/viewArticles/views";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import moment from "moment";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
import * as Hooks from "hooks";
import * as NextRouter from "next/router";

import dynamic from "next/dynamic";

const Editor = dynamic<any>(() => import("react-quill"), { ssr: false });

const Sourceandpinoy = Mui.styled(Mui.Typography)({
  fontSize: "12pt",
  color: "#707070",
  fontFamily: "CallunaSans-Regular",
});

const Heading = Mui.styled(Mui.Typography)({
  fontSize: "20pt",
  fontWeight: 600,
  fontFamily: "CallunaTitle-Bold",
});

const SecoundaryText = Mui.styled(Mui.Typography)({
  fontSize: "12pt",
  fontWeight: 600,
  fontFamily: "CallunaTitle-Semibold",
});

const Paragraph = Mui.styled(Mui.Box)({
  fontSize: "12pt",
  color: "#333333",
  // lineHeight: 2,
  letterSpacing: "0.3px",
  fontFamily: "CallunaSans-Regular",
  ".ql-editor img": {
    width: "100% !important",
  },
});

export const Details = ({
  details,
  refreshDetails,
  relatedData,
  image,
}: any) => {
  console.log(details?.description);
  return (
    <Mui.Box sx={{ p: 2 }}>
      <Mui.Grid container>
        <Mui.Grid item xs={12} md={8} sx={{ height: "auto" }}>
          <Mui.Stack spacing={1} alignItems={"center"}>
            <Components.Tags
              tagname={
                details?.tag_name ? details?.tag_name : details?.province_name
              }
              color={"#EFF8FF"}
              textcolor={"#1E69A3"}
            />
            <Heading sx={{ textAlign: "center", maxWidth: "75%" }}>
              {details?.title}
            </Heading>
            <Mui.Stack direction="row">
              <Sourceandpinoy sx={{ fontSize: "10pt" }}>
                {details?.province_name}
              </Sourceandpinoy>
              <Mui.Icon
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MuiIcons.FiberManualRecord
                  sx={{ color: "#707070", fontSize: "12px" }}
                />
              </Mui.Icon>
              <Sourceandpinoy sx={{ fontSize: "10pt" }}>
                {moment(details?.createdAt).fromNow()}
              </Sourceandpinoy>
            </Mui.Stack>
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          md={8}
          sx={{ pl: { sx: 0, md: 10 }, pr: { sx: 0, md: 10 } }}
        >
          <Mui.Stack spacing={2}>
            <Mui.Box
              sx={{
                width: "100%",
                maxHeight: "400px",
                display: "flex",
                justifyContent: "center",
                pt: 2,
                pb: 2,
              }}
            >
              <Mui.Box
                component="img"
                src={image}
                sx={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Mui.Box>
            <Paragraph>
              {details?.description && (
                <Editor
                  defaultValue={details?.description as string}
                  modules={{ toolbar: false }}
                  theme=""
                />
              )}
            </Paragraph>
            <LikeCommentsShare refresh={refreshDetails} details={details} />
            <Mui.Divider />
            <Views.Comments />
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={4} sx={{ mt: { xs: "0px", md: "-24px" } }}>
          <Components.CardWithTitle
            title={"Latest Articles"}
            actions={null}
            extraText={null}
          >
            <Views.RelatedArticles data={relatedData} />
          </Components.CardWithTitle>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};

const LikeCommentsShare = ({ details, refresh }: any) => {
  const [openShareModel, setOpenShareModel] = React.useState(false);

  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "whatsUpCanada",
      post_id: getId,
    };
    await Api.Server.Client()
      .post(Api.Server.ApiRoutes.postLike, likeDetails)
      .catch((err) => {
        !localStorage.getItem("Mktoken") && routers.push(`/accounts/login`);
      });
    refresh();
  };

  const routers = NextRouter.useRouter();
  const userId: any = Hooks.useUserId();

  return (
    <Mui.Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Mui.Box
        sx={{
          p: 1,
          boxShadow: "0px 5px 9px 3px #00000012",
          borderRadius: "20px",
          maxWidth: "350px",
          minWidth: "300px",
        }}
      >
        <Mui.Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ width: "100%", margin: "auto", pl: 1, pr: 1 }}
        >
          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ width: "fit-content", justifyContent: "center" }}
          >
            <Mui.IconButton sx={{ p: 0 }}>
              {details?.likedBy === 1 || details?.likedBy === "1" ? (
                <Mui.Box
                  onClick={() => {
                    console.log(localStorage.getItem("Mktoken"));
                    localStorage.getItem("Mktoken")
                      ? LikePost("unlike", details?._id)
                      : routers.push(`/accounts/login`);
                  }}
                  width={"20px"}
                  component="img"
                  src={LikedImage.src}
                />
              ) : (
                <Mui.Box
                  onClick={() => {
                    console.log(localStorage.getItem("Mktoken"));

                    localStorage.getItem("Mktoken")
                      ? LikePost("like", details?._id)
                      : routers.push(`/accounts/login`);
                  }}
                  width={"20px"}
                  component="img"
                  src={LikeImage.src}
                />
              )}
            </Mui.IconButton>
            <SecoundaryText
              variant="button"
              sx={{ textTransform: "capitalize", cursor: "pointer", pl: 1 }}
              onClick={() => {
                if (details?.likedBy === 1 || details?.likedBy === "1") {
                  LikePost("unlike", details?._id);
                } else {
                  LikePost("like", details?._id);
                }
              }}
            >
              {details?.number_of_likes === 0 ? "" : details?.number_of_likes}{" "}
              Likes
            </SecoundaryText>
          </Mui.Stack>
          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{ width: "fit-content", justifyContent: "center" }}
          >
            <Mui.Box width={"20px"} component="img" src={CommentImage.src} />
            <SecoundaryText sx={{ pl: 1, ml: `0!important ` }}>
              {details?.number_of_comments === 0
                ? ""
                : details?.number_of_comments}{" "}
              Comments
            </SecoundaryText>
          </Mui.Stack>
          <Mui.Stack
            onClick={() => setOpenShareModel(!openShareModel)}
            direction={"row"}
            alignItems={"center"}
            sx={{ width: "fit-content", justifyContent: "center" }}
          >
            <Mui.IconButton sx={{ p: 0 }}>
              <Mui.Box width={"20px"} component="img" src={ShareImage.src} />
            </Mui.IconButton>
            <SecoundaryText sx={{ cursor: "pointer", pl: 1 }}>
              Share
            </SecoundaryText>
          </Mui.Stack>
          <Components.Share
            onclose={() => setOpenShareModel(!openShareModel)}
            isopen={openShareModel}
          />
        </Mui.Stack>
      </Mui.Box>
    </Mui.Box>
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
