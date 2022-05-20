import * as Mui from "@mui/material";
import * as Components from "components";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import * as ReactQuery from "react-query";
import * as Api from "api";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import * as ViewFoodTrip from "app/viewfoodtrip";
import ReactPlayer from "react-player";

const ImageContainer = Mui.styled(Mui.Box)({
  objectFit: "contain",
  overflow: "hidden",
  position: "relative",
});

const TextOverLay = Mui.styled(Mui.Box)({
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
  backgroundColor: "#33333387",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
});

export const LiveSessions = () => {
  const [openModel, setOpenModel] = React.useState(false);
  const [modelData, setModelData] = React.useState<any>("");

  const handleModel = (item: any) => {
    setModelData(item);
    setOpenModel(!openModel);
  };

  const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
    borderRadius: "10px",
    border: `2px solid ${theme.palette.primary.main}`,
  }));

  const Name = Mui.styled(Mui.Typography)(({ theme }) => ({
    fontFamily: "Haborosans-normal",
    fontWeight: 600,
    fontSize: "0.85rem",
  }));

  const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
    fontFamily: "Raleway-semibold",
    fontSize: "0.9rem",
  }));
  const data = 8;

  return (
    <Mui.Box>
      <Components.CardWithTitle
        title={"LIVE Sessions"}
        actions={null}
        extraText={null}
      >
        <Mui.Grid container spacing={2}>
          {Array(4).fill(
            <Mui.Grid item xs={12} lg={4} spacing={2}>
              <ImageContainer onClick={handleModel} sx={{ height: "10rem" }}>
                <ReactPlayer
                  width={"100%"}
                  config={{
                    file: { attributes: { controlsList: "nodownload" } },
                  }}
                  url="https://www.youtube.com/watch?v=YLslsZuEaNE"
                  controls
                />
                <TextOverLay sx={{ margin: "0px !important" }}>
                  <Mui.IconButton onClick={handleModel}> </Mui.IconButton>
                </TextOverLay>
              </ImageContainer>
              <Mui.Stack direction={"row"} justifyContent="space-between">
                <Mui.Stack
                  direction={"row"}
                  alignItems={"space-between"}
                  spacing={2}
                  sx={{ paddingTop: "3%" }}
                >
                  <Avatar />
                  <Name>Benj_04</Name>
                </Mui.Stack>
                <Mui.Stack sx={{ paddingTop: "3%" }}>
                  <Mui.Typography sx={{ fontSize: "0.9rem", color: "#707070" }}>
                    Dec 3
                  </Mui.Typography>
                </Mui.Stack>
              </Mui.Stack>
              <Mui.Box sx={{ mt: 1 }}>
                <StyledTypography sx={{ fontSize: "0.9rem" }} color={"black"}>
                  Loreum ipsum dolor sit amet, consectetur adipiscing elit{" "}
                </StyledTypography>
              </Mui.Box>
            </Mui.Grid>
          )}
        </Mui.Grid>
        <ViewVideos
          item={modelData}
          open={openModel}
          onclose={() => setOpenModel(!openModel)}
        />
      </Components.CardWithTitle>
    </Mui.Box>
  );
};

import * as Hooks from "hooks";

import * as NextRouter from "next/router";

const Heading = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
  fontWeight: 600,
});

const Description = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "1rem",
  color: "#707070",
});

const PlayerContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "23rem",
  marginTop: "2rem",
  position: "relative",
  "& .playandpause": {
    display: "none",
  },
  "&:hover": {
    "& .playandpause": {
      display: "flex",
    },
  },
});

const PlayButton = Mui.styled(Mui.Box)({
  width: "100%",
  top: "40%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
});

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
const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "Haborosans-normal",
  fontSize: "0.7rem",
}));
const Name = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "Haborosans-normal",
  fontWeight: 600,
  fontSize: "0.85rem",
}));

export const ViewVideos = ({ open, onclose, item }: Props) => {
  const isMobile = Hooks.useMobileView();
  const [playVideo, setPlayVideo] = React.useState(false);
  const router = NextRouter.useRouter();

  const play = () => {
    setPlayVideo(!playVideo);
  };

  return (
    <Mui.Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", p: 3 } }}
      maxWidth="md"
      fullScreen={isMobile}
      open={open}
      onClick={onclose}
    // onClose={() => router.push(".")}
    >
      <Mui.DialogContent sx={{ position: "relative" }}>
        <Mui.IconButton
          onClick={onclose}
          sx={{ position: "absolute", right: "0", top: 0 }}
        >
          <MuiIcons.Close />
        </Mui.IconButton>
        <Mui.Grid container spacing={2}>
          <Mui.Grid item xs={12} md={7}>
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
                    <Avatar src="https://www.mensjournal.com/wp-content/uploads/mf/daniel-craig-james-bond-gallery-casino-royale-main.jpg?w=900&quality=86&strip=all" />
                    <Name>James</Name>
                  </Mui.Stack>
                </Mui.Stack>

                <Mui.Box sx={{ mt: 1 }}>
                  <StyledTypography
                    sx={{ fontSize: "0.85rem" }}
                    color={"#707070"}
                  >
                    Vancouver. B.C. Giant Killer By Charmaine Janis Rodriguez
                    After an outstanding performance in the US Open tennis final
                    last summer, Filipina-Canadian tennis sensation Leyl.
                  </StyledTypography>
                </Mui.Box>

                <PlayerContainer>
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    config={{
                      file: { attributes: { controlsList: "nodownload" } },
                    }}
                    playing={playVideo}
                    url="https://www.youtube.com/watch?v=YLslsZuEaNE"
                    // url={item?.video_url}
                    controls
                  />
                  {/* <PlayButton className="playandpause">
                <Mui.IconButton
                  onClick={play}
                  sx={{ color: "white", border: "2px solid white" }}
                >
                  {!playVideo ? (
                    <MuiIcons.PlayArrow sx={{ fontSize: "2rem" }} />
                  ) : (
                    <MuiIcons.Pause sx={{ fontSize: "2rem" }} />
                  )}
                </Mui.IconButton>
              </PlayButton> */}
                </PlayerContainer>
              </Mui.Box>
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={5}>
            <Mui.Box>
              <Mui.Typography>Comments</Mui.Typography>
              <Mui.Divider sx={{ mt: 2, mb: 2 }} />
            </Mui.Box>
            <Mui.Box>
              <LikesAndComments />
            </Mui.Box>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.DialogContent>
    </Mui.Dialog>
  );
};

interface Props {
  open: boolean;
  onclose: () => void;
  item?: any;
}

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
  const Button = Mui.styled(Mui.Button)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    right: "1rem",
    minWidth: "40px",
  }));
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
          height: "50vh",
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
              <Mui.Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Avatar src={likes?.profile_photo} />
                <Name>{likes?.full_name}</Name>
              </Mui.Stack>
              <Mui.Stack
                direction={"row"}
                justifyContent={"end"}
                alignItems={"center"}
                spacing={1}
              >
                {likes?.likedBy === "1" ? (
                  <Mui.Box
                    onClick={() => LikePost("unlike", likes?._id)}
                    width={"8%"}
                    component="img"
                    src={LikedImage.src}
                  />
                ) : (
                  <Mui.Box
                    onClick={() => LikePost("like", likes?._id)}
                    width={"8%"}
                    component="img"
                    src={LikeImage.src}
                  />
                )}{" "}
                <StyledTypography>
                  {likes?.number_of_likes !== 0 ? likes?.number_of_likes : ""}{" "}
                  Likes
                </StyledTypography>
                <Mui.Box
                  onClick={() => getComments(likes?._id)}
                  width={"8%"}
                  component="img"
                  src={CommentImage.src}
                />{" "}
                <StyledTypography>
                  {likes?.number_of_replies !== 0
                    ? likes?.number_of_replies
                    : ""}{" "}
                  Reply
                </StyledTypography>
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

      <Mui.Box sx={{ mt: 2 }}>
        <Mui.Divider />
      </Mui.Box>
      <Mui.Stack>
        <Mui.Typography>Comments are disabled</Mui.Typography>
        <Button variant="contained">
          <MuiIcons.Send sx={{ fontSize: "1.2rem" }} />
        </Button>
      </Mui.Stack>
    </Mui.Box>
  );
};
