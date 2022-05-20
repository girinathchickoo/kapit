import * as Mui from "@mui/material";
import * as Hooks from "hooks";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import * as ReactQuery from "react-query";
import * as Api from "api";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import LocationPin from "assets/location@2x.png";
import * as NextRouter from "next/router";
import * as Components from "components";
import * as React from "react";
import * as ViewFoodTrip from "app/viewfoodtrip";
import * as Views from "./views";
import TimeAgo from "react-timeago";
import * as MuiIcons from "@mui/icons-material";

const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  borderRadius: "10px",
  border: `2px solid ${theme.palette.primary.main}`,
  width: "2rem",
  height: "2rem",
}));

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

const Name = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "Haborosans-normal",
  fontWeight: 600,
  fontSize: "0.85rem",
}));

const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "Haborosans-normal",
  fontSize: "0.7rem",
}));

const ImageContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "95%",
  height: "auto",
  margin: "10px auto",
}));

const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  top: "50%",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  width: "16px",
  height: "16px",
  "&:hover": { bgcolor: "white" },
});

const ImgComponent = ({ images }: { images: string[] }) => {
  const [index, setIndex] = React.useState(0);
  // console.log(index)
  // const router = NextRouter.useRouter();
  const nextImage = () => {
    if (images?.length > index + 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  const previousImage = () => {
    if (images?.length < index - 1) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  };

  return (
    <Mui.Box
      sx={{
        // borderRadius: "20px",
        width: "100%",
        height: "auto",
        margin: "10px auto",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Mui.CardMedia
        component={"img"}
        src={images?.[index]}
        sx={{
          maxWidth: 600,
          height: 450,
          objectFit: "contain",
          borderRadius: 2,
          // objectPosition: "center",
        }}
        // onClick={() => router.push(`/foodtrip/${id}`)}
      />
      {index !== 0 && (
        <NavButton onClick={previousImage}>
          <MuiIcons.KeyboardArrowLeft fontSize="small" />
        </NavButton>
      )}
      {images?.length - 1 > index && (
        <NavButton onClick={nextImage} sx={{ right: 0 }}>
          <MuiIcons.KeyboardArrowRight fontSize="small" />
        </NavButton>
      )}
    </Mui.Box>
  );
};

export const FoodTripView = () => {
  const isMobile = Hooks.useMobileView();
  const router = NextRouter.useRouter();
  const getQuery = router.query;

  const { isLoading, data, refetch } = ReactQuery.useQuery(
    ["viewfootTrip", getQuery],
    () => {
      return Api.Server.Client().post(
        Api.Server.ApiRoutes.foodTrip.viewFoodTip,
        {
          post_id: getQuery?.foodtripid,
        }
      );
    }
  );
  const viewList = data?.data?.data;

  return (
    <Mui.Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", p: 3 } }}
      maxWidth="md"
      fullScreen={isMobile}
      open={true}
      onClose={() => router.back()}
    >
      <Mui.DialogContent
        sx={{
          height: "550px",
          p: 0,
          "&::-webkit-scrollbar": { width: "0px" },
        }}
      >
        <Mui.Grid container sx={{ height: "100%" }} spacing={2}>
          <Mui.Grid item xs={12} md={7} sx={{ height: "100%" }}>
            <Mui.Stack>
              <Mui.Box sx={{ mb: 2 }}>
                <Mui.Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Mui.Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={2}
                  >
                    <Avatar src={viewList?.profile_photo} />
                    <Name>{viewList?.full_name}</Name>
                    {/* <Mui.Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <Mui.Box
                      width={"0.5rem"}
                      component="img"
                      src={LocationPin.src}
                    />
                    <StyledTypography>{viewList?.location}</StyledTypography>
                  </Mui.Stack> */}
                  </Mui.Stack>
                  <Mui.Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <StyledTypography color={"#BEBEBE"}>
                      <TimeAgo date={viewList?.createdAt as string} />
                    </StyledTypography>
                    <Views.EditPost post={viewList} refetch={refetch} />
                  </Mui.Stack>
                </Mui.Stack>
                <Mui.Box sx={{ mt: 1 }}>
                  <StyledTypography
                    sx={{ fontSize: "0.85rem" }}
                    color={"#707070"}
                    // noWrap
                  >
                    {viewList?.post_description}
                  </StyledTypography>
                </Mui.Box>
                <Mui.Box sx={{ mt: 1 }}>
                  <StyledTypography
                    sx={{ fontSize: "0.7rem", fontWeight: 600 }}
                    color={"#9B7DD4"}
                  >
                    {viewList?.hashtags
                      .split(", ")
                      .map((tag: string, _i: number) => " #" + tag)}
                    {/* // {viewList?.hashtags !== null ? ` #${viewList?.hashtags}` : ""} */}
                  </StyledTypography>
                </Mui.Box>
                <ImgComponent images={viewList?.post_images} />
                {/* {viewList?.post_images.length !== 0 && (
                <ImageContainer>
                  <Mui.Box
                    sx={{ borderRadius: "15px" }}
                    width={"100%"}
                    height={"auto"}
                    component="img"
                    src={viewList?.post_images[0]}
                  />
                </ImageContainer>
              )} */}
              </Mui.Box>
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={5} sx={{ height: "100%" }}>
            <Mui.Box>
              <Mui.Typography>Comments</Mui.Typography>
              <Mui.Divider sx={{ mt: 2, mb: 2 }} />
            </Mui.Box>
            <Mui.Box>
              <LikesAndComments refetchData={refetch} list={viewList} />
            </Mui.Box>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Grid></Mui.Grid>
      </Mui.DialogActions>
    </Mui.Dialog>
  );
};

const LikesAndComments = ({ list, refetchData }: any) => {
  const routers = NextRouter.useRouter();
  const [isReply, setIsReply] = React.useState(false);
  const [commentId, setCommentId] = React.useState("");
  const [replyCommentss, setReplyComments] = React.useState<any>([]);
  const getQuery = routers.query;
  const [replyValue, setReplyValue] = React.useState("");
  const { isLoading, data, refetch } = ReactQuery.useQuery(
    ["footTripCommentList", getQuery],
    () => {
      return Api.Server.Client().post(
        Api.Server.ApiRoutes.commentsList.listComments,
        {
          comment_ref_id: getQuery?.foodtripid,
        }
      );
    }
  );
  const listComment = data?.data?.data;

  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "likeComments",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    refetch();
    getComments(commentId);
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
      post_type: "foodTripPost",
      comment_ref_id: getId,
      comment_description: replyValue,
      post_id: getQuery?.foodtripid,
    };
    await Api.Server.Client().post(
      Api.Server.ApiRoutes.commentsList.postComment,
      commentPost
    );
    getComments(commentId);
    setReplyValue("");
  };

  console.log(listComment);

  return (
    <Mui.Box>
      <Mui.Box
        sx={{
          height: "40vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none !important",
          },
        }}
      >
        {listComment?.map((likes: any, index: number) => (
          <Mui.Box key={index} sx={{ mb: 1 }}>
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
                onClick={() => routers.push(`/user/${likes?.uid}`)}
              >
                <Avatar src={likes?.profile_photo} />
                <Name>{likes?.full_name}</Name>
              </Mui.Stack>
              <Mui.Stack
                direction={"row"}
                justifyContent={"end"}
                alignItems={"center"}
                spacing={1}
              >
                <Mui.IconButton
                  sx={{ p: 0 }}
                  onClick={() => {
                    if (likes?.likedby === 1 || likes?.likedby === "1") {
                      LikePost("unlike", likes?._id);
                    } else {
                      LikePost("like", likes?._id);
                    }
                  }}
                >
                  {likes?.likedby === "1" || likes?.likedby === 1 ? (
                    <Mui.Box
                      width={"16%"}
                      component="img"
                      src={LikedImage.src}
                    />
                  ) : (
                    <Mui.Box
                      width={"16%"}
                      component="img"
                      src={LikeImage.src}
                    />
                  )}
                  <Mui.Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#707070",
                      marginLeft: "1rem",
                    }}
                  >
                    {likes?.number_of_likes !== 0 ? likes?.number_of_likes : ""}{" "}
                    Likes
                  </Mui.Typography>
                </Mui.IconButton>
                <Mui.IconButton
                  onClick={() => {
                    if (!commentId) getComments(likes?._id);
                    else setCommentId("");
                  }}
                >
                  <Mui.Box width={20} component="img" src={CommentImage.src} />{" "}
                  <Mui.Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#707070",
                      marginLeft: "1rem",
                    }}
                  >
                    {likes?.number_of_replies !== 0
                      ? likes?.number_of_replies
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
                onClick={() => getComments(likes?._id)}
              >
                {likes?.comment_description}
              </StyledTypography>
            </Mui.Box>
            {commentId === likes._id && isReply ? (
              <Mui.Box sx={{ width: "80%", margin: "auto" }}>
                {replyCommentss?.map((list: any, index: any) => (
                  <Mui.Box key={index} sx={{ mb: 2 }}>
                    <ViewFoodTrip.ReplyComments
                      list={list}
                      LikePost={() => LikePost("like", list?._id)}
                      dislike={() => LikePost("unlike", list?._id)}
                      replyComments={() => getComments(list?._id)}
                    />
                  </Mui.Box>
                ))}
                <Mui.Stack spacing={2} direction={"row"}>
                  <TextField
                    value={replyValue}
                    onChange={(e) => setReplyValue(e.target.value)}
                  />
                  <Mui.Button
                    variant="contained"
                    onClick={() => replyComments(likes?._id)}
                  >
                    Post
                  </Mui.Button>
                </Mui.Stack>
              </Mui.Box>
            ) : (
              ""
            )}
          </Mui.Box>
        ))}
      </Mui.Box>
      <Mui.Box sx={{ mt: 2 }}>
        <Components.LikeCommentsShareContainer
          refetchPost={refetchData}
          details={list}
        />
      </Mui.Box>
      <Mui.Divider sx={{ my: 2 }} />
      <Mui.Box sx={{ mt: 1 }}>
        <Components.CommentField
          refetchPost1={refetchData}
          refetchPost2={refetch}
          type="foodTripPost"
        />
      </Mui.Box>
    </Mui.Box>
  );
};
