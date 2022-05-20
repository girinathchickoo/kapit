import React from "react";
import * as Mui from "@mui/material";
import * as Hooks from "hooks";
import * as NextRouter from "next/router";
import * as Views from "../viewtambayan/views";
import * as ReactQuery from "react-query";
import * as Server from "api";
import moment from "moment";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";

const Avatar = Mui.styled(Mui.Avatar)({
  borderRadius: "10px",
  border: "2px solid #9B7DD4",
});

const Discription = Mui.styled(Mui.Typography)({
  marginTop: "10px",
  color: "#707070",
  fontSize: "0.8rem",
  fontFamily: "Haborosans-normal",
});

const TextArea = Mui.styled("textarea")({
  marginTop: "1rem",
  outline: "none",
  width: "100%",
  border: "none",
  resize: "none",
  fontSize: "0.75rem",
  "::placeholder": {
    color: "#000000f",
  },
});

export const ViewTambayan = () => {
  const isMobile = Hooks.useMobileView();
  const router = NextRouter.useRouter();
  const getQuery = router.query?.tambayanid;
  const [post, setPost] = React.useState("");

  const {
    isLoading: loading,
    data: isData,
    refetch: isRefetch,
  } = ReactQuery.useQuery("viewTambayan", async () => {
    let datas = await Server.Server.Client().post(
      Server.Server.ApiRoutes.tambayans.viewTambayan,
      {
        post_id: getQuery,
      }
    );
    return datas?.data?.data;
  });
  const { data, refetch } = ReactQuery.useQuery(
    "tambayanComments",
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.commentsList.listComments,
        {
          comment_ref_id: getQuery,
        }
      );
      return datas?.data?.data;
    }
  );

  console.log("tambayanComments", data);
  const postComment = async () => {
    let commentPost = {
      type: "comment",
      post_type: "tambayan",
      comment_ref_id: getQuery,
      comment_description: post,
      post_id: getQuery,
    };
    await Server.Server.Client().post(
      Server.Server.ApiRoutes.commentsList.postComment,
      commentPost
    );
    isRefetch();
    setPost("");
    refetch();
  };

  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "tambayan",
      post_id: getId,
    };
    await Server.Server.Client().post(
      Server.Server.ApiRoutes.postLike,
      likeDetails
    );
    isRefetch();
    refetch();
  };

  return (
    <Mui.Box>
      <Mui.Dialog
        onClose={() => router.push(".")}
        sx={{ "& .MuiDialog-paper": { width: "100%", p: 1 } }}
        maxWidth="sm"
        fullScreen={isMobile}
        open={true}
      >
        <Mui.DialogTitle sx={{ px: 3 }}>
          <Mui.Stack
            sx={{ width: "100%", marginTop: "10px" }}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Mui.Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              sx={{ cursor: "pointer" }}
              onClick={() => router.push(`/user/${isData?.uid}`)}
            >
              <Avatar src={isData?.profile_photo} />
              <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                {isData?.full_name}
              </Mui.Typography>
            </Mui.Stack>
            <Mui.Stack direction="row" alignItems="center">
              <Mui.Typography sx={{ color: "#707070", fontSize: "0.7rem" }}>
                {moment(isData?.createdAt).format("MMM DD, YYYY")}
              </Mui.Typography>
              <Views.EditPost post={isData} refetch={isRefetch} />
            </Mui.Stack>
          </Mui.Stack>
          <Mui.Box>
            <Discription>{isData?.description}</Discription>
          </Mui.Box>
          <Mui.Typography sx={{ mt: 2, fontSize: "0.85rem" }}>
            Comments
          </Mui.Typography>
          <Mui.Divider sx={{ mt: 1, mb: 1 }} />
        </Mui.DialogTitle>
        <Mui.DialogContent>
          <Views.LikesandComments refetch={refetch} data={data} />
          {/* <Mui.Divider /> */}
        </Mui.DialogContent>
        <Mui.DialogActions sx={{ justifyContent: "flex-start", px: 3 }}>
          <Mui.Stack spacing={1} sx={{ width: "100%" }}>
            <Mui.Box>
              <Mui.IconButton
                sx={{ p: 0, paddingRight: "15px" }}
                onClick={() => {
                  if (isData?.likedBy === "1") {
                    LikePost("unlike", isData?._id);
                  } else {
                    LikePost("like", isData?._id);
                  }
                }}
              >
                {isData?.likedBy === "1" ? (
                  <Mui.Box width={20} component="img" src={LikedImage.src} />
                ) : (
                  <Mui.Box width={20} component="img" src={LikeImage.src} />
                )}
                <Mui.Typography sx={{ marginLeft: "4px", fontSize: "0.8rem" }}>
                  {isData?.number_of_likes !== 0 ? isData?.number_of_likes : ""}{" "}
                  Likes
                </Mui.Typography>
              </Mui.IconButton>
              <Mui.IconButton sx={{ p: 0 }}>
                <Mui.Box width={20} component="img" src={CommentImage.src} />
                <Mui.Typography sx={{ marginLeft: "4px", fontSize: "0.8rem" }}>
                  {isData?.number_of_comments !== 0
                    ? isData?.number_of_comments
                    : ""}{" "}
                  Comments
                </Mui.Typography>
              </Mui.IconButton>
            </Mui.Box>
            <Mui.Divider />
            <Mui.Grid container sx={{ width: "100%" }}>
              <Mui.Grid item xs={9}>
                <TextArea
                  placeholder="Share your thoughts..."
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  rows={3}
                />
              </Mui.Grid>
              <Mui.Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Mui.Button
                  onClick={postComment}
                  sx={{ width: "80%" }}
                  variant="contained"
                >
                  Post
                </Mui.Button>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Stack>
        </Mui.DialogActions>
      </Mui.Dialog>
    </Mui.Box>
  );
};
