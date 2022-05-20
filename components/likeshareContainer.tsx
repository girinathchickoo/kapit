import * as Mui from "@mui/material";
import * as Api from "api";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import * as React from "react";
import * as Component from "components";

const Heading = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  fontWeight: 600,
});

const Paragraph = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
  color: "#707070",
  lineHeight: 2,
  letterSpacing: "0.3px",
  fontFamily: "Haborosans-normal",
});

export const LikeCommentsShareContainer = ({
  details,
  postType,
  refetchPost,
}: Props) => {
  const [openShareModel, setOpenShareModel] = React.useState(false);

  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "foodTripPost",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    refetchPost();
  };

  return (
    <Mui.Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ width: "100%", margin: "auto" }}
    >
      <Mui.Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          if (details?.likedBy === 1 || details?.likedBy === "1") {
            LikePost("unlike", details?._id);
          } else {
            LikePost("like", details?._id);
          }
        }}
      >
        <Mui.IconButton sx={{ p: 0 }}>
          {details?.likedBy === "1" ? (
            <Mui.Box width={"35%"} component="img" src={LikedImage.src} />
          ) : (
            <Mui.Box width={"35%"} component="img" src={LikeImage.src} />
          )}
        </Mui.IconButton>
        <Heading>
          {details?.number_of_likes === 0 ? "" : details?.number_of_likes} Likes
        </Heading>
      </Mui.Stack>
      <Mui.Stack direction={"row"} alignItems={"center"}>
        <Mui.IconButton sx={{ p: 0 }}>
          <Mui.Box width={"35%"} component="img" src={CommentImage.src} />
        </Mui.IconButton>
        <Heading>
          {details?.number_of_comments === 0 ? "" : details?.number_of_comments}{" "}
          Comments
        </Heading>
      </Mui.Stack>
      <Mui.Stack
        onClick={() => setOpenShareModel(!openShareModel)}
        direction={"row"}
        alignItems={"center"}
      >
        <Mui.IconButton sx={{ p: 0 }}>
          <Mui.Box width={"35%"} component="img" src={ShareImage.src} />
        </Mui.IconButton>
        <Heading>Share</Heading>
      </Mui.Stack>
      <Component.Share
        onclose={() => setOpenShareModel(!openShareModel)}
        isopen={openShareModel}
      />
    </Mui.Stack>
  );
};

interface Props {
  details?: any;
  postType?: string;
  refetchPost: any;
}
