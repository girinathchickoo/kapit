/* eslint-disable react/jsx-key */
import * as Mui from "@mui/material";
import * as Components from "components";
import LikeImage from "assets/like (1)@2x.png";
import * as ReactQuery from "react-query";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as NextRouter from "next/router";
import * as Api from "api";
import FilterImg from "assets/filter@2x.png";
import TagsImage from "assets/Tag@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import MessageImage from "assets/message@2x.png";
import * as Layouts from "layouts";
import * as Query from "react-query";
import { Filtersnew } from "./filltersnew";

const Container = Mui.styled(Mui.Paper)({
  width: "100%",
  height: "100%",
  border: "1px solid #E6E6E6",
  padding: "1rem",
  position: "relative",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Avatar = Mui.styled(Mui.Avatar)({
  width: "4rem",
  height: "40px",
  borderRadius: "10px",
});

const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  top: "50%",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  width: "16px",
  height: "16px",
 
  right:"1rem",
  "&:hover": { bgcolor: "white" },
});

const ImgComponent = ({ images, id }: { images: string[]; id: string }) => {
  const [index, setIndex] = React.useState(0);
  // console.log(index)
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
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Mui.Card
      elevation={0}
        component={"img"}
        src={images?.[index]}
        sx={{
          width: 300,
         height: 300,
          float: "left",
          margin: "3px",
          padding: "3px",
          // objectFit:"contain"
        }}
        onClick={() => router.push(`/bazaar-city/${id}`)}
      />
      {index !== 0 && (
        <NavButton onClick={previousImage} sx={{ left:"1rem",}}>
          <MuiIcons.KeyboardArrowLeft fontSize="small" />
        </NavButton>
      )}
      {images?.length - 1 > index && (
        <NavButton onClick={nextImage} sx={{  }}>
          <MuiIcons.KeyboardArrowRight fontSize="small" />
        </NavButton>
      )}
    </Mui.Box>
  );
};

export const ProductListing = ({ ...props }: any) => {
  const router = NextRouter.useRouter();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Mui.Box>
      <Components.CardWithTitle
        title={"Product Listings"}
        actions={null}
        extraText={
          <Mui.IconButton onClick={handleOpen}>
            <Mui.CardMedia
              component="img"
              sx={{ height: "30px", width: "30px" }}
              src={FilterImg.src}
            ></Mui.CardMedia>
            <Mui.Typography
              sx={{ fontSize: "0.9rem", paddingLeft: "0.5rem" }}
              color="primary"
            >
              Filter
            </Mui.Typography>
          </Mui.IconButton>
        }
      >
        <Filtersnew open={open} setOpen={setOpen} {...props} />
        <Mui.Grid container spacing={3}>
          {props?.productList?.map((item: any, index: any) => (
            <Mui.Grid key={index} item xs={12} lg={4}>
              {index % 2 === 0 && index !== 0 ? (
                <Container sx={{ backgroundColor: "#E6E6E6" }} elevation={0}>
                  <Mui.Typography align="center">
                    In-article Native ad
                  </Mui.Typography>
                </Container>
              ) : (
                <Mui.Stack
                  spacing={2}
                  sx={{
                    border: "1px solid #E6E6E6",
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Mui.Stack
                    direction="row"
                    spacing={2}
                    sx={{ cursor: "pointer" }}
                    onClick={() => router.push(`/user/${item?.uid}`)}
                  >
                    <Avatar src={item?.profile_photo} />
                    <Mui.Box flexGrow={1}>
                      <Mui.Typography
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          fontFamily: "CallunaTitle-Semibold",
                        }}
                      >
                        {item?.full_name}
                      </Mui.Typography>
                      <Mui.Typography
                        sx={{ fontSize: "0.7rem", color: "#707070" }}
                      >
                        {item?.province_name}
                      </Mui.Typography>
                    </Mui.Box>
                    <Mui.Box maxWidth={"40px"} sx={{ maxHeight: "50px" }}>
                      <Mui.CardMedia component={"img"} src={MessageImage.src} />
                    </Mui.Box>
                  </Mui.Stack>

                  <Mui.Box
                    sx={{
                      borderRadius: "15px",
                      overflow: "hidden",
                      objectFit: "fill",
                      objectPosition: "center",
                      height: "100%",
                      maxHeight: 300,
                    }}
                  >
                    <ImgComponent
                      images={item?.item_images?.filter(
                        (element: string) => element !== null
                      )}
                      id={item?._id}
                    />
                  </Mui.Box>
                  <Mui.Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Mui.Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        fontFamily: "CallunaTitle-Semibold",
                      }}
                    >
                      {item?.item_name}
                    </Mui.Typography>
                    <Mui.Typography
                      sx={{ fontSize: "0.9rem", color: "#707070" }}
                    >
                      ${item?.price}
                    </Mui.Typography>
                  </Mui.Stack>

                  <LikesandComments refetch={props.refetch} items={item} />
                </Mui.Stack>
              )}
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};

const LikesandComments = ({ items, refetch }: any) => {
  const router = NextRouter.useRouter();
  const [openShareModel, setOpenShareModel] = React.useState(false);
  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "bazaarCity",
      post_id: getId,
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    await refetch();
  };

  return (
    <Mui.Stack
      sx={{ width: "100%" }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
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
          {items?.likedBy === 1 ? (
            <Mui.Box sx={{ width: 20 }} component="img" src={LikedImage.src} />
          ) : (
            <Mui.Box sx={{ width: 20 }} component="img" src={LikeImage.src} />
          )}
        </Mui.IconButton>
        <Mui.Typography
          sx={{
            fontSize: "12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            ml: 1,
          }}
        >
          {items?.number_of_likes === 0 ? "" : items?.number_of_likes} Likes
        </Mui.Typography>
      </Mui.Stack>

      <Mui.Stack
        direction={"row"}
        alignItems={"center"}
        onClick={() => router.push(`/bazaar-city/${items._id}`)}
      >
        <Mui.IconButton sx={{ p: 0 }}>
          <Mui.Box sx={{ width: 20 }} component="img" src={CommentImage.src} />
        </Mui.IconButton>
        <Mui.Typography
          sx={{
            fontSize: "12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            ml: 1,
          }}
        >
          {items?.number_of_comments === 0 ? "" : items?.number_of_comments}{" "}
          Comments
        </Mui.Typography>
      </Mui.Stack>

      <Mui.Stack
        onClick={() => setOpenShareModel(!openShareModel)}
        direction={"row"}
        alignItems={"center"}
      >
        <Mui.IconButton sx={{ p: 0 }}>
          <Mui.Box sx={{ width: 20 }} component="img" src={ShareImage.src} />
        </Mui.IconButton>
        <Mui.Typography
          sx={{
            fontSize: "12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            ml: 1,
          }}
        >
          Share
        </Mui.Typography>
      </Mui.Stack>
      <Components.Share
        onclose={() => setOpenShareModel(!openShareModel)}
        isopen={openShareModel}
      />
    </Mui.Stack>
  );
};
