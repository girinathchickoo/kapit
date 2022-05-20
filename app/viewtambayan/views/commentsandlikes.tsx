import * as Mui from "@mui/material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import * as Api from "api";
import * as React from "react";
import * as NextRouter from "next/router";
import * as Views from "app/viewtambayan/views";
import * as ReactQuery from "react-query";

const Avatar = Mui.styled(Mui.Avatar)({
  borderRadius: "5px",
  border: "2px solid #9B7DD4",
  width: "2rem",
  height: "2rem",
});

const Subject = Mui.styled(Mui.Typography)({
  marginTop: "10px",
  fontSize: "1rem",
  fontFamily: "Haborosans-normal",
  fontWeight: 500,
});
const Discription = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  fontFamily: "Haborosans-normal",
  color: "#707070",
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

export const LikesandComments = ({ data, refetch }: any) => {
  const router = NextRouter.useRouter();
  console.log("datadata", data);
  const getQuery = router.query?.tambayanid;
  const [isReply, setIsReply] = React.useState(false);
  const [commentId, setCommentId] = React.useState("");
  const [replyCommentss, setReplyComments] = React.useState<any>([]);
  const [replyValue, setReplyValue] = React.useState("");

  const client = ReactQuery.useQueryClient();

  const LikePost = async (getType: string, getId: number | string) => {
    console.log("wwwww", getType);
    let likeDetails = {
      type: getType,
      post_type: "likeComments",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    refetch();
    if (commentId !== "") {
      getComments(commentId);
    }
  };

  const getComments = async (id: string) => {
    setIsReply(true);
    setCommentId(id);
    const data = await Api.Server.Client().post(
      Api.Server.ApiRoutes.commentsList.listComments,
      { comment_ref_id: id }
    );
    setReplyComments(data?.data?.data);
    refetch();
  };

  const replyComments = async (getId: string) => {
    let commentPost = {
      type: "reply",
      post_type: "tambayan",
      comment_ref_id: getId,
      comment_description: replyValue,
      post_id: getQuery,
    };
    await Api.Server.Client().post(
      Api.Server.ApiRoutes.commentsList.postComment,
      commentPost
    );
    getComments(commentId);
    setReplyValue("");
  };

  console.log(replyCommentss);

  return (
    <Mui.Box sx={{ p: 1 }}>
      {data?.map((item: any, index: number) => (
        <Mui.Box key={index}>
          <Mui.Grid container key={index} sx={{ mb: 3 }}>
            <Mui.Grid item container xs={6}>
              <Mui.Grid
                item
                xs={3}
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/user/${item?.uid}`)}
              >
                <Avatar src={item?.profile_photo} />
              </Mui.Grid>
              <Mui.Grid
                item
                xs={9}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/user/${item?.uid}`)}
              >
                <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                  {item?.full_name}
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Mui.IconButton
                sx={{ p: 0, paddingRight: "15px" }}
                onClick={() => {
                  if (item?.likedby === 1 ) {

                    LikePost("unlike", item?._id);
                  } else {
                    LikePost("like", item?._id);
                  }
                }}
              >
                {item?.likedby === 1 ? (
                  <Mui.Box width={20} component="img" src={LikedImage.src} />
                ) : (
                  <Mui.Box width={20} component="img" src={LikeImage.src} />
                )}
                <Mui.Typography sx={{ marginLeft: "4px", fontSize: "0.7rem" }}>
                  {item?.number_of_likes !== 0 ? item?.number_of_likes : ""}{" "}
                  Likes
                </Mui.Typography>
              </Mui.IconButton>
              <Mui.IconButton
                onClick={() => {
                  if (!commentId) getComments(item?._id);
                  else setCommentId("");
                }}
                sx={{ p: 0 }}
              >
                <Mui.Box width={20} component="img" src={CommentImage.src} />
                <Mui.Typography sx={{ marginLeft: "4px", fontSize: "0.7rem" }}>
                  {item?.number_of_replies !== 0 ? item?.number_of_replies : ""}{" "}
                  Reply
                </Mui.Typography>
              </Mui.IconButton>
            </Mui.Grid>
            <Mui.Stack spacing={0.5} sx={{ paddingTop: "10px" }}>
              <Discription>{item?.comment_description}</Discription>
            </Mui.Stack>
          </Mui.Grid>
          {commentId === item._id && isReply ? (
            <Mui.Box sx={{ width: "80%", margin: "auto" }}>
              {replyCommentss?.map((list: any, index: any) => (
                <Mui.Box key={index} sx={{ mb: 2 }}>
                  <Views.ReplyComments
                    list={list}
                    LikePost={() => LikePost("like", list?._id)}
                    dislike={() => LikePost("unlike", list?._id)}
                    replyComments={() => getComments(list?._id)}
                  />
                </Mui.Box>
              ))}
              <Mui.Stack spacing={2} direction={"row"} mb={2}>
                <TextField
                  value={replyValue}
                  onChange={(e) => setReplyValue(e.target.value)}
                />
                <Mui.Button
                  variant="contained"
                  onClick={() => replyComments(item?._id)}
                >
                  Send
                </Mui.Button>
              </Mui.Stack>
            </Mui.Box>
          ) : (
            ""
          )}
        </Mui.Box>
      ))}
    </Mui.Box>
  );
};
