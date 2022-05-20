import * as Mui from "@mui/material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import moment from "moment";
import * as NextRouter from "next/router";
import * as Api from "api";

const Avatar = Mui.styled(Mui.Avatar)({
  borderRadius: "5px",
  border: "2px solid #9B7DD4",
  width: "2rem",
  height: "2rem",
});

const Subject = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  fontFamily: "CallunaTitle-Bold",
  fontWeight: 500,
});
const Discription = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
  fontFamily: "CallunaSans-Regular",
  color: "#707070",
});
const DateandTime = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  color: "#707070",
});

export const LikesandComments = ({ data, refetch }: any) => {
  const isLiked = false;
  const routers = NextRouter.useRouter();

  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "tambayan",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    refetch();
  };

  return (
    <Mui.Box sx={{ p: 1 }}>
      {data?.map((item: any, index: number) => (
        <Mui.Box key={index} sx={{ mb: 5, cursor: "pointer" }}>
          {console.log("data123", data)}
          <Mui.Box
            sx={{ borderBottom: "1px solid #0000000f", paddingBottom: "5px" }}
          >
            <Mui.Stack
              sx={{ width: "100%", mb: 1 }}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Mui.Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                sx={{ cursor: "pointer" }}
                onClick={() => routers.push(`/user/${item?.uid}`)}
              >
                <Avatar src={item?.profile_photo} />
                <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                  {item?.full_name}
                </Mui.Typography>
              </Mui.Stack>
              <DateandTime>
                {moment(item?.createdAt).format("MMM DD, YYYY")}
              </DateandTime>
            </Mui.Stack>
            <Mui.Stack
              spacing={0.5}
              onClick={() => routers.push(`/tambayan/${item._id}`)}
            >
              <Subject>{item?.subject}</Subject>
              <Discription>
                {item?.description?.slice(0, 100)}
                {item?.description?.slice().length > 100 && <>... <span style={{ color: "#9B7DD4" }}>{" View More"} </span></>}
              </Discription>
            </Mui.Stack>
          </Mui.Box>
          {/* <Mui.Divider sx={{ mt: 2, mb: 2 }} /> */}
          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{ paddingTop: "10px" }}
          >
            <Mui.Stack direction={"row"} alignItems={"center"}>
              <Mui.IconButton
                sx={{ p: 0 }}
                onClick={() => {
                  if (+item?.likedBy === 1) {
                    LikePost("unlike", item?._id);
                  } else {
                    LikePost("like", item?._id);
                  }
                }}
              >
                {+item?.likedBy === 1 ? (
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
                  {item?.number_of_likes !== 0 ? item?.number_of_likes : ""}{" "}
                  Likes
                </Mui.Typography>
              </Mui.IconButton>
            </Mui.Stack>
            <Mui.Stack
              onClick={() => routers.push(`/tambayan/${item._id}`)}
              direction={"row"}
              alignItems={"center"}
            >
              <Mui.IconButton sx={{ p: 0 }}>
                <Mui.Box
                  width={20}
                  sx={{ mr: 1 }}
                  component="img"
                  src={CommentImage.src}
                />
              </Mui.IconButton>
              <Mui.Typography sx={{ fontSize: "0.8rem", color: "#707070" }}>
                {item?.number_of_comments !== 0 ? item?.number_of_comments : ""}{" "}
                Comments
              </Mui.Typography>
            </Mui.Stack>
          </Mui.Stack>
        </Mui.Box>
      ))}
    </Mui.Box>
  );
};
