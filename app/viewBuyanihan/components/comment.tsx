import * as Mui from "@mui/material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import * as ReactQuery from "react-query";
import * as NextRouter from "next/router";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
import * as Server from "api";
import * as Components from "components";
import {
  PostDetails,
  Comment,
  Avatar,
  Name,
  StyledTypography,
  ButtonSelection,
} from "../main";

const TextField = Mui.styled("textarea")(({ theme }) => ({
  width: "80%",
  height: "auto",
  padding: "1rem",
  border: "none",
  outline: "none",
  fontFamily: "Haborosans-normal",
  "&::-webkit-scrollbar": { display: "none" },
}));

const Button = Mui.styled(Mui.Button)(({ theme }) => ({
  width: "20%",
  minWidth: "40px",
}));

export const CommentSection = () => {
  const [Like, setLike] = React.useState(false);
  const [comments, setComments] = React.useState<Comment[]>();
  const [comment, setComment] = React.useState("");
  const [Post, setPost] = React.useState<PostDetails>();
  const [isComment, setIsComment] = React.useState(true);
  const forReplay = React.useRef<Comment | undefined>(undefined);
  const [replayId, setReplayId] = React.useState("");
  const [replays, setReplays] = React.useState<Comment[]>();
  const [openShareModel, setOpenShareModel] = React.useState(false);
  const [replyValue, setReplyValue] = React.useState("");

  const handleLike = () => {
    // console.log(Like)
    setLike(!Like);
  };

  const setForReplay = (item: Comment | undefined) => {
    forReplay.current = item;
  };

  const router = NextRouter.useRouter();
  const getQuery = router.query;

  const { isLoading } = ReactQuery.useQuery<Comment[]>(
    ["getCommentsList", getQuery?.buyanihanid],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.commentsList.listComments,
        {
          comment_ref_id: getQuery?.buyanihanid,
        }
      );
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        setComments(data);
        console.log(data);
      },
    }
  );

  const { isLoading: loadReplay } = ReactQuery.useQuery<Comment[]>(
    ["getReplayList", replayId],
    async () => {
      if (replayId) {
        console.log(replayId);
        const data = await Server.Server.Client().post(
          Server.Server.ApiRoutes.commentsList.listComments,
          {
            comment_ref_id: replayId,
          }
        );
        return data.data.data;
      }
    },
    {
      onSuccess: (data) => {
        setReplays(data);
        console.log(data);
      },
    }
  );

  const client = ReactQuery.useQueryClient();

  const { mutate: LikeUnlike } = ReactQuery.useMutation(
    async (item: Comment) => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.postLike,
        {
          type: item.likedby === 0 ? "like" : "unlike",
          post_type: "likeComments",
          post_id: item._id,
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        client.invalidateQueries("getCommentsList");
        client.invalidateQueries("getReplayList");
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const { mutate: sendComment } = ReactQuery.useMutation(
    async ({ comment, id }: { comment: string; id: string }) => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.commentsList.postComment,
        {
          post_type: "donasayon",
          type: isComment ? "comment" : "reply",
          comment_ref_id: id,
          comment_description: comment,
          post_id: getQuery?.buyanihanid,
          // "type": (item.likedBy === "0" ? "like" : "unlike"),
          // "post_type": "donasayon",
          // "post_id": item._id
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        if (replayId) {
          setReplyValue("");
          // setReplayId("");
          client.invalidateQueries("getCommentsList");
          client.invalidateQueries("getReplayList");
        } else {
          client.invalidateQueries("getCommentsList");
          client.invalidateQueries("getOneBuyanihanPost");
          client.invalidateQueries("getOneBuyanihanPost_comment");
          setComment("");
        }
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const { isLoading: load, refetch: refetchPost } =
    ReactQuery.useQuery<PostDetails>(
      ["getOneBuyanihanPost_comment", getQuery?.buyanihanid],
      async () => {
        const data = await Server.Server.Client().post(
          Server.Server.ApiRoutes.buyanihan.getOneBuyanihan,
          {
            post_id: getQuery?.buyanihanid,
          }
        );
        return data.data.data;
      },
      {
        onSuccess: (data) => {
          setPost(data);
          console.log(data);
        },
      }
    );

  const handleLikeUnlike = (value: Comment) => {
    LikeUnlike(value);
  };

  const handleSendComment = (type: string) => {
    console.log(replayId);
    console.log(getQuery?.buyanihanid);
    if (type === "replay") {
      sendComment({
        comment: replyValue,
        id: replayId,
      });
    } else {
      sendComment({
        comment: comment,
        id: getQuery?.buyanihanid as string,
      });
    }
  };

  const handleChange = (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(value.target.value);
  };

  const LikePost = async (getType: string, getId: string) => {
    let likeDetails = {
      type: getType,
      post_type: "donasayon",
      post_id: getId,
    };
    await Server.Server.Client().post(
      Server.Server.ApiRoutes.postLike,
      likeDetails
    );
    refetchPost();
  };

  return (
    <Mui.Box
      sx={{
        height: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none !important",
        },
        p: 1,
      }}
    >
      <Mui.Box sx={{ height: "8%" }}>
        <Mui.Typography sx={{ fontSize: "15px",}}>
          Comments
        </Mui.Typography>
      <Mui.Divider sx={{my:2}} />
      </Mui.Box>
      <Mui.Box sx={{ height: "90%" }}>
        <Mui.Box sx={{ height: "75%", overflow: "auto", p: 1 }}>
          {comments?.map((item, index) => (
            <Mui.Box key={index} sx={{ mb: 1, p: 1 }}>
              <Mui.Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Mui.Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push(`/user/${item?.uid}`)}
                >
                  <Avatar src={item.profile_photo} />
                  <Name>{item.full_name}</Name>
                </Mui.Stack>
                <Mui.Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Mui.IconButton
                    sx={{ p: 0, paddingRight: "15px" }}
                    onClick={() => {
                      if (item?.likedby === 1) {
                        handleLikeUnlike(item);
                      } else {
                        handleLikeUnlike(item);
                      }
                    }}
                  >
                    {item?.likedby === 1 ? (
                      <Mui.Box
                        width={20}
                        component="img"
                        src={LikedImage.src}
                      />
                    ) : (
                      <Mui.Box width={20} component="img" src={LikeImage.src} />
                    )}
                    <Mui.Typography
                      sx={{ marginLeft: "4px", fontSize: "0.8rem" }}
                    >
                      {item?.number_of_likes !== 0 ? item?.number_of_likes : ""}{" "}
                      Likes
                    </Mui.Typography>
                  </Mui.IconButton>
                  <Mui.IconButton
                    sx={{ p: 0, paddingRight: "15px" }}
                    onClick={() => {
                      setForReplay(forReplay.current ? undefined : item);
                      setIsComment(!isComment);
                      setReplayId(item._id);
                    }}
                  >
                    <Mui.Box
                      width={20}
                      component="img"
                      src={CommentImage.src}
                    />
                    <Mui.Typography sx={{ fontSize: "0.8rem", mx: 1 }}>
                      {item?.number_of_replies !== 0
                        ? item?.number_of_replies
                        : ""}{" "}
                      Reply
                    </Mui.Typography>
                  </Mui.IconButton>
                </Mui.Stack>
              </Mui.Stack>
              <Mui.Box sx={{ mt: 1 }}>
                <StyledTypography
                  sx={{ fontSize: "0.75rem" }}
                  color={"#707070"}
                >
                  {item.comment_description}
                </StyledTypography>
              </Mui.Box>
              {forReplay.current?._id === item._id &&
                replays?.map((replay, _j) => {
                  return (
                    <Mui.Box sx={{ ml: 3, mt: 1 }} key={_j}>
                      <Mui.Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Mui.Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          sx={{ cursor: "pointer" }}
                          onClick={() => router.push(`/user/${replay?.uid}`)}
                        >
                          <Avatar src={replay.profile_photo} />
                          <Name>{replay.full_name}</Name>
                        </Mui.Stack>
                        <Mui.Stack
                          direction={"row"}
                          justifyContent={"end"}
                          alignItems={"center"}
                          spacing={1}
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleLikeUnlike(replay)}
                        >
                          {replay?.likedby === 1 ? (
                            <Mui.Box
                              width={20}
                              component="img"
                              src={LikedImage.src}
                            />
                          ) : (
                            <Mui.Box
                              width={20}
                              component="img"
                              src={LikeImage.src}
                            />
                          )}{" "}
                          <StyledTypography>
                            {+replay.number_of_likes !== 0
                              ? +replay.number_of_likes
                              : ""}{" "}
                            Likes
                          </StyledTypography>
                        </Mui.Stack>
                      </Mui.Stack>
                      <Mui.Box sx={{ mt: 1 }}>
                        <StyledTypography
                          sx={{ fontSize: "0.75rem" }}
                          color={"#707070"}
                        >
                          {replay.comment_description}
                        </StyledTypography>
                      </Mui.Box>
                    </Mui.Box>
                  );
                })}

              {forReplay.current?._id === item._id && (
                <Mui.Stack
                  spacing={2}
                  direction={"row"}
                  sx={{
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Mui.TextField
                    sx={{
                      p: 1,
                      height: "100%",
                      width: "60%",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                        fontSize: "12px",
                      },
                      "& .MuiInputBase-input": {
                        backgroundColor: "transparent !important",
                      },
                    }}
                    value={replyValue}
                    onChange={(e) => setReplyValue(e.target.value)}
                  />
                  <Mui.Button
                    variant="contained"
                    onClick={() => {
                      handleSendComment("replay");
                    }}
                    sx={{ height: "30px" }}
                  >
                    Post
                  </Mui.Button>
                </Mui.Stack>
              )}
            </Mui.Box>
          ))}
        </Mui.Box>
        <Mui.Box sx={{ height: "25%" }}>
          <Mui.Stack
            spacing={1}
            direction={"row"}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              mt: 2,
              height: "40%",
            }}
          >
            <Mui.IconButton
              sx={{ p: 0, paddingRight: "15px" }}
              onClick={() => {
                if (Post?.LikedBy === 1) {
                  LikePost("unlike", Post?._id || "");
                } else {
                  LikePost("like", Post?._id || "");
                }
              }}
            >
              {Post?.LikedBy === 1 ? (
                <Mui.Box width={20} component="img" src={LikedImage.src} />
              ) : (
                <Mui.Box width={20} component="img" src={LikeImage.src} />
              )}
              <Mui.Typography sx={{ marginLeft: "4px", fontSize: "0.8rem" }}>
                {Post?.number_of_likes !== 0 ? Post?.number_of_likes : ""} Likes
              </Mui.Typography>
            </Mui.IconButton>
            <ButtonSelection
              count={Post?.number_of_comments as number}
              name="Comment"
              icon={CommentImage}
              handleClick={() => {}}
            />
            <ButtonSelection
              name="Share"
              icon={ShareImage}
              handleClick={() => {
                setOpenShareModel(true);
              }}
            />
          </Mui.Stack>
          <Mui.Divider />
            <Mui.Stack
              sx={{ position: "relative" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <TextField
                rows={2}
                value={comment}
                onChange={handleChange}
                placeholder="Write your comment…"
              />
              <Button
                onClick={() => {
                  handleSendComment("comment");
                }}
                variant="contained"
              >
                <MuiIcons.Send sx={{ fontSize: "1.2rem" }} />
              </Button>
            </Mui.Stack>
        </Mui.Box>
      </Mui.Box>
      <Components.Share
        onclose={() => setOpenShareModel(!openShareModel)}
        isopen={openShareModel}
      />
    </Mui.Box>
  );
};
