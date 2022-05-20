import * as React from "react";
import * as Mui from "@mui/material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import * as NextRouter from "next/router";

const Avatar = Mui.styled(Mui.Avatar)({
  borderRadius: "5px",
  border: "2px solid #9B7DD4",
});

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
});

export const ReplyComments = ({
  list,
  LikePost,
  replyComments,
  dislike,
}: any) => {
  const routers = NextRouter.useRouter();

  return (
    <Mui.Stack spacing={2}>
      <Mui.Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Mui.Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          sx={{ cursor: "pointer" }}
          onClick={() => routers.push(`/user/${list?.uid}`)}
        >
          <Avatar src={list?.profile_photo} />
          <StyledTypography>{list?.full_name}</StyledTypography>
        </Mui.Stack>
        <Mui.Stack direction={"row"} alignItems={"center"}>
          <Mui.Stack direction={"row"} alignItems={"center"}>
            <Mui.IconButton
              sx={{ p: 0 }}
              onClick={() => {
                if (list?.likedby === 1 || list?.likedby === "1") {
                  dislike();
                } else {
                  LikePost();
                }
              }}
            >
              {list?.likedby === "1" || list?.likedby === 1 ? (
                <Mui.Box width={20} component="img" src={LikedImage.src} />
              ) : (
                <Mui.Box width={20} component="img" src={LikeImage.src} />
              )}
              <Mui.Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#707070",
                  marginLeft: "1rem",
                }}
              >
                {list?.number_of_likes !== 0 ? list?.number_of_likes : ""} Likes
              </Mui.Typography>
            </Mui.IconButton>
          </Mui.Stack>
          {/* <Mui.Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Mui.IconButton>
              <Mui.Box width={"30%"} component="img" src={CommentImage.src} />
            </Mui.IconButton>
            <Mui.Typography sx={{ fontSize: "0.8rem", marginLeft: "-0.7rem" }}>
              {list?.number_of_replies !== 0 ? list?.number_of_replies : ""}{" "}
              Reply
            </Mui.Typography>
          </Mui.Stack> */}
        </Mui.Stack>
      </Mui.Stack>
      <StyledTypography sx={{ fontSize: "0.75rem" }}>
        {list?.comment_description}
      </StyledTypography>
    </Mui.Stack>
  );
};
