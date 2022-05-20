import * as Mui from "@mui/material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import LocationPin from "assets/location@2x.png";
import moment from "moment";
import * as Api from "api";
import * as Components from "components";
import { FacebookShareCount } from "react-share";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as NextRouter from "next/router";

const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  borderRadius: "10px",
  border: `2px solid ${theme.palette.primary.main}`,
  width: "2rem",
  height: "2rem",
}));

const Name = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "CallunaSans-Regular",
  fontWeight: 600,
  fontSize: "0.8rem",
}));

const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "CallunaSans-Regular",
  fontSize: "0.7rem",
}));

const ImageContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "80%",
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
  bottom: "50%",
  "&:hover": { bgcolor: "white" },
  bgcolor: "white",
  p: 1,
});
interface ArrowButtonProps {
  type: string;
  handleClick: () => void;
}

const ImgComponent = ({ images, id }: { images: string[]; id: string }) => {
  const [index, setIndex] = React.useState(0);
  console.log(images, "images");
  const router = NextRouter.useRouter();
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
        justifyContent: "center",
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
          maxWidth: 500,
          maxHeight: 400,
          objectFit: "contain",
          borderRadius: 2,
          cursor: "pointer",
          // objectPosition: "center",
        }}
        onClick={() => router.push(`/foodtrip/${id}`)}
      />
      {index !== 0 && (
        <NavButton onClick={previousImage} sx={{ left: "4.2rem" }}>
          <MuiIcons.KeyboardArrowLeft fontSize="small" />
        </NavButton>
      )}
      {images?.length - 1 > index && (
        <NavButton onClick={nextImage} sx={{ right: "4.3rem" }}>
          <MuiIcons.KeyboardArrowRight fontSize="small" sx={{}} />
        </NavButton>
      )}
    </Mui.Box>
  );
};

export const GeneralPost = ({ data, refetchData }: any) => {
  const router = NextRouter.useRouter();
  const [ImgCount, setImgCount] = React.useState(0);

  return (
    <Mui.Box sx={{ mt: 3 }}>
      <Mui.Paper sx={{ p: 2 }} elevation={0}>
        {data?.map((item: any, index: any) => (
          <>
            <Mui.CardContent sx={{ p: 2, pb: `16px !important` }}>
              <Mui.Grid>
                <Mui.Box key={index} sx={{ mb: 2, cursor: "pointer" }}>
                  <Mui.Box onClick={() => router.push(`/user/${item?.uid}`)}>
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
                        <Avatar src={item.profile_photo} />
                        <Name>{item?.full_name}</Name>
                        {/* <Mui.Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                    >
                      <Mui.Box
                        width={"0.65rem"}
                        component="img"
                        src={LocationPin.src}
                      />
                      <StyledTypography>{item?.location}</StyledTypography>
                    </Mui.Stack> */}
                      </Mui.Stack>
                      <StyledTypography color={"#BEBEBE"}>
                        {moment(item?.createdAt).format("MMM DD, YYYY")}
                      </StyledTypography>
                    </Mui.Stack>
                  </Mui.Box>
                </Mui.Box>
                <Mui.Box onClick={() => router.push(`/foodtrip/${item._id}`)}>
                  <Mui.Box sx={{ mt: 2 }}>
                    {/* {(item?.post_description as string)?.slice("\n")} */}
                    {item.post_description.split("\n").map((line: string, i: number) => {
                      return <StyledTypography
                        sx={{ fontSize: "0.8rem" }}
                        color={"#707070"}
                        key={i}
                      >
                        {line}
                      </StyledTypography>
                    })}
                  </Mui.Box>
                  <Mui.Stack sx={{ mt: 1 }} spacing={1}>
                    {item.youtube_link && (
                      <Mui.Link
                        href={item.youtube_link}
                        color="#D08430"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        {item.youtube_link}
                        <br></br>
                      </Mui.Link>
                    )}
                    <StyledTypography
                      sx={{ fontSize: "0.7rem", fontWeight: 600 }}
                      color={"#9B7DD4"}
                    >
                      {item.hashtags
                        .split(", ")
                        .map((tag: string, _i: number) => tag[0] === "#" ? " " + tag : " #" + tag)}
                    </StyledTypography>
                  </Mui.Stack>
                </Mui.Box>
                <Mui.Grid item xs={12} sx={{}}>
                  <ImgComponent images={item?.post_images} id={item?._id} />
                </Mui.Grid>
              </Mui.Grid>
            </Mui.CardContent>
            <Mui.Box key={index} sx={{ mb: 2, cursor: "pointer" }}>
              <Mui.Box></Mui.Box>
              <Mui.Box sx={{ width: "80%", margin: "20px auto" }}>
                <LikesandComments refetch={refetchData} items={item} />
              </Mui.Box>
              {data?.length - 1 !== index && <Mui.Divider />}
            </Mui.Box>
          </>
        ))}
      </Mui.Paper>
    </Mui.Box>
  );
};

const LikesandComments = ({ items, refetch }: any) => {
  const router = NextRouter.useRouter();
  const [openShareModel, setOpenShareModel] = React.useState(false);
  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "foodTripPost",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    await refetch();
  };

  return (
    <Mui.Stack
      sx={{ width: "100%" }}
      direction={"row"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      spacing={1}
    >
      <Mui.Stack
        direction={"row"}
        alignItems={"center"}
        onClick={() => {
          if (items?.likedBy === 1 || items?.likedBy === "1") {
            LikePost("unlike", items?._id);
          } else {
            LikePost("like", items?._id);
          }
        }}
      >
        <Mui.IconButton sx={{ p: 0 }}>
          {items?.likedBy === "1" ? (
            <Mui.Box width={20} component="img" src={LikedImage.src} />
          ) : (
            <Mui.Box width={20} component="img" src={LikeImage.src} />
          )}
          <Mui.Typography sx={{ fontSize: "12px", cursor: "pointer", mx: 1 }}>
            {items?.number_of_likes === 0 ? "" : items?.number_of_likes} Likes
          </Mui.Typography>
        </Mui.IconButton>
      </Mui.Stack>
      <Mui.Stack
        direction={"row"}
        alignItems={"center"}
        onClick={() => router.push(`/foodtrip/${items._id}`)}
      >
        <Mui.IconButton sx={{ p: 0 }}>
          <Mui.Box width={20} component="img" src={CommentImage.src} />
          <Mui.Typography sx={{ fontSize: "12px", cursor: "pointer", mx: 1 }}>
            {items?.number_of_comments === 0 ? "" : items?.number_of_comments}{" "}
            Comments
          </Mui.Typography>
        </Mui.IconButton>
      </Mui.Stack>
      <Mui.Stack
        onClick={() => setOpenShareModel(!openShareModel)}
        direction={"row"}
        alignItems={"center"}
      >
        <Mui.IconButton sx={{ p: 0 }}>
          <Mui.Box width={20} component="img" src={ShareImage.src} />
          <FacebookShareCount url={document.location.href} />
          <Mui.Typography sx={{ fontSize: "12px", cursor: "pointer", mx: 1 }}>
            Share
          </Mui.Typography>
        </Mui.IconButton>
      </Mui.Stack>
      <Components.Share
        onclose={() => setOpenShareModel(!openShareModel)}
        isopen={openShareModel}
      />
    </Mui.Stack>
  );
};
