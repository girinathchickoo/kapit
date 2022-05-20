import * as Mui from "@mui/material";
import * as React from "react";
import * as Api from "api";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import * as Router from "next/router";
import * as ReactQuery from "react-query";
import * as Hooks from "hooks";
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

const PostContainer = Mui.styled("textarea")({
  width: "100%",
  minHeight: "6rem",
  fontFamily: "Haborosans-normal",
  padding: "1rem",
  border: "none",
  outline: "none",
  fontSize: "0.8rem",
  "&::-webkit-scrollbar": { display: "none" },
});

const PostButton = Mui.styled(Mui.Button)({
  bottom: 0,
  right: 0,
  width: "10%",
});

export const Comments = () => {
  const routers = Router.useRouter();
  const getQuery = routers.query;
  const getuid = Hooks.useUserId();
  const [openReplyBox, setOpenReplyBox] = React.useState(false);
  const [isReply, setIsReply] = React.useState<boolean>(false);
  const [commentId, setCommentId] = React.useState<string>("");
  const [replyValue, setReplyValue] = React.useState("");
  const [replyCommentss, setReplyComments] = React.useState<any>([]);
  const getKey = Object.keys(getQuery)[0];

  const { isLoading, data, refetch } = ReactQuery.useQuery(
    ["commentslist", getQuery],
    () => {
      return Api.Server.Client().post(
        Api.Server.ApiRoutes.commentsList.listComments,
        {
          comment_ref_id:
            getKey !== "pinoyid" ? getQuery?.whatsupid : getQuery?.pinoyid,
        }
      );
    }
  );

  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "likeComments",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    refetch();
    commentId !== "" && handleReplyComments(commentId);
  };

  const handleReplyComments = async (getCommentId: string) => {
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
    refetch();
    setReplyValue("");
    commentId !== "" && handleReplyComments(commentId);
  };

  const listComment = data?.data?.data;
  return (
    <Mui.Box>
      <PostComments refetchPost={refetch} />
      <Mui.Stack sx={{ p: 2, width: "100%", overflow: "auto" }} spacing={3}>
        {listComment?.map((list: any, index: any) => (
          <Mui.Stack spacing={2} key={index}>
            <Mui.Stack key={index} spacing={2}>
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
                        LikePost("unlike", list?._id);
                      } else {
                        LikePost("like", list?._id);
                      }
                    }}
                  >
                    {list?.likedby === 1 || list?.likedby === "1" ? (
                      <Mui.Box
                        width={"20%"}
                        component="img"
                        src={LikedImage.src}
                      />
                    ) : (
                      <Mui.Box
                        width={"20%"}
                        component="img"
                        src={LikeImage.src}
                      />
                    )}
                    <Mui.Typography sx={{ fontSize: "0.8rem", mx: 1 }}>
                      {list?.number_of_likes !== 0 ? list?.number_of_likes : ""}{" "}
                      Likes
                    </Mui.Typography>
                  </Mui.IconButton>

                  <Mui.IconButton
                    onClick={() => {
                      handleReplyComments(list?._id);
                      setIsReply(!isReply);
                      setOpenReplyBox(true);
                    }}
                  >
                    <Mui.Box
                      width={"20%"}
                      component="img"
                      src={CommentImage.src}
                    />
                    <Mui.Typography sx={{ fontSize: "0.8rem", mx: 1 }}>
                      {list?.number_of_replies !== 0
                        ? list?.number_of_replies
                        : ""}{" "}
                      Reply
                    </Mui.Typography>
                  </Mui.IconButton>
                </Mui.Stack>
              </Mui.Stack>
              <StyledTypography sx={{ fontSize: "0.75rem" }}>
                {list?.comment_description}
              </StyledTypography>
            </Mui.Stack>
            {isReply && commentId === list?._id ? (
              <Mui.Box sx={{ ml: "3rem !important", pl: 1 }}>
                {replyCommentss?.map((item: any, index: any) => (
                  <Mui.Box key={index} sx={{ mb: 2 }}>
                    <Views.ReplyComments
                      list={item}
                      LikePost={() => LikePost("like", item?._id)}
                      dislike={() => LikePost("unlike", item?._id)}
                      refetch={() => handleReplyComments(commentId)}
                      closeReplyBox={() => setOpenReplyBox(false)}
                    />
                  </Mui.Box>
                ))}
                {openReplyBox ? (
                  <Mui.Stack spacing={2} direction={"row"}>
                    <Mui.Grid container>
                      <Mui.Grid item xs={8}>
                        <TextField
                          value={replyValue}
                          onChange={(e) => setReplyValue(e.target.value)}
                        />
                      </Mui.Grid>
                      <Mui.Grid item xs={4}>
                        <Mui.Button
                          variant="contained"
                          onClick={() => replyComments(list?._id)}
                        >
                          Post
                        </Mui.Button>
                      </Mui.Grid>
                    </Mui.Grid>
                  </Mui.Stack>
                ) : (
                  ""
                )}
              </Mui.Box>
            ) : (
              ""
            )}
          </Mui.Stack>
        ))}
      </Mui.Stack>
    </Mui.Box>
  );
};

const PostComments = ({ refetchPost }: any) => {
  const [textValue, setTextValue] = React.useState("");
  const routers = Router.useRouter();
  const getQuery = routers.query;
  const getKey = Object.keys(getQuery)[0];
  const client = ReactQuery.useQueryClient();

  const PostComment = async () => {
    let commentPost = {
      type: "comment",
      post_type: "articles",
      comment_ref_id:
        getKey !== "pinoyid" ? getQuery?.whatsupid : getQuery?.pinoyid,
      comment_description: textValue,
      post_id: getKey !== "pinoyid" ? getQuery?.whatsupid : getQuery?.pinoyid,
    };
    await Api.Server.Client()
      .post(Api.Server.ApiRoutes.commentsList.postComment, commentPost)
      .catch((err) => {
        !localStorage.getItem("Mktoken") && routers.push(`/accounts/login`);
      });
    refetchPost();
    setTextValue("");
  };

  return (
    <Mui.Stack
      direction="row"
      alignItems="flex-end"
      spacing={1}
      sx={{
        px: 2,
        py: 1,
        border: "1px solid #EDEDED",
        borderRadius: "20px",
        mb: 2,
      }}
    >
      <PostContainer
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        rows={7}
        placeholder="Write your comments"
      />
      <PostButton onClick={PostComment} variant="contained">
        Post
      </PostButton>
    </Mui.Stack>
  );
};
