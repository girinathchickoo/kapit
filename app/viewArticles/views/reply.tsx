import * as React from "react";
import * as Mui from "@mui/material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import * as Router from "next/router";
import * as Api from "api";
import * as Views from "app/viewArticles/views";

const Avatar = Mui.styled(Mui.Avatar)({
  borderRadius: "5px",
  border: "2px solid #9B7DD4",
});

const TextField = Mui.styled(Mui.TextField)({
  width: "80%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    border: "none",
    fontSize: "0.8rem",
  },
});

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
});

export const ReplyComments = ({
  list,
  LikePost,
  dislike,
  refetch,
  closeReplyBox,
}: any) => {
  const routers = Router.useRouter();
  const getQuery = routers.query;
  const [openReplyBox, setOpenReplyBox] = React.useState(false);
  const [isReply, setIsReply] = React.useState<boolean>(false);
  const [commentId, setCommentId] = React.useState<string>("");
  const [replyCommentss, setReplyComments] = React.useState<any>([]);
  const [replyValue, setReplyValue] = React.useState("");
  const getKey = Object.keys(getQuery)[0];

  const openReplyCommentsSection = async (getCommentId: string) => {
    setCommentId(getCommentId);
    setIsReply(true);
    const data = await Api.Server.Client().post(
      Api.Server.ApiRoutes.commentsList.listComments,
      {
        comment_ref_id: getCommentId,
      }
    );
    setReplyComments(data?.data?.data);
  };

  const LikeReplies = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "likeComments",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    refetch();
    commentId !== "" && openReplyCommentsSection(commentId);
  };

  const replyComments = async (getId: string) => {
    let commentPost = {
      type: "reply",
      post_type: "articles",
      comment_ref_id: getId,
      comment_description: replyValue,
      post_id: getKey !== "pinoyid" ? getQuery?.whatsupid : getQuery?.pinoyid,
    };
    await Api.Server.Client().post(
      Api.Server.ApiRoutes.commentsList.postComment,
      commentPost
    );
    setReplyValue("");
    commentId !== "" && openReplyCommentsSection(commentId);
    refetch();
  };

  console.log("reply", replyCommentss);

  return (
    <Mui.Stack>
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
            <Avatar variant="rounded" src={list?.profile_photo} />
            <StyledTypography>{list?.full_name}</StyledTypography>
          </Mui.Stack>
          <Mui.Stack direction={"row"} alignItems={"center"} spacing={1}>
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
                <Mui.Box width={"20%"} component="img" src={LikedImage.src} />
              ) : (
                <Mui.Box width={"20%"} component="img" src={LikeImage.src} />
              )}
              <Mui.Typography sx={{ fontSize: "0.8rem", mx: 1 }}>
                {list?.number_of_likes !== 0 ? list?.number_of_likes : ""} Likes
              </Mui.Typography>
            </Mui.IconButton>

            <Mui.IconButton
              onClick={() => {
                openReplyCommentsSection(list?._id);
                setIsReply(!isReply);
                closeReplyBox();
                setOpenReplyBox(true);
              }}
            >
              <Mui.Box width={"20%"} component="img" src={CommentImage.src} />
              <Mui.Typography sx={{ fontSize: "0.8rem", mx: 1 }}>
                {list?.number_of_replies !== 0 ? list?.number_of_replies : ""}{" "}
                Reply
              </Mui.Typography>
            </Mui.IconButton>
          </Mui.Stack>
        </Mui.Stack>
        <StyledTypography sx={{ fontSize: "0.75rem" }}>
          {list?.comment_description}
        </StyledTypography>
      </Mui.Stack>
      {isReply && commentId === list?._id && (
        <Mui.Box sx={{ ml: "2rem", mt: "1rem" }}>
          {replyCommentss?.map((item: any, index: any) => (
            <Mui.Box key={index} sx={{ mb: 2 }}>
              <Views.ReplyComments
                list={item}
                LikePost={() => LikeReplies("like", item?._id)}
                dislike={() => LikeReplies("unlike", item?._id)}
                refetch={() => openReplyCommentsSection(commentId)}
                closeReplyBox={() => setOpenReplyBox(false)}
              />
            </Mui.Box>
          ))}
          {openReplyBox ? (
            <Mui.Stack spacing={2} direction={"row"}>
              <TextField
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
              />
              <Mui.Button
                variant="contained"
                onClick={() => replyComments(list?._id)}
              >
                Post
              </Mui.Button>
            </Mui.Stack>
          ) : null}
        </Mui.Box>
      )}
    </Mui.Stack>
  );
};
