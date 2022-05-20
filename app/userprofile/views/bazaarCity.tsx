import * as Mui from "@mui/material";
import SampleImage from "assets/Rectangle 267@2x.png";
import * as React from "react";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Routers from "next/router";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import LikeImage from "assets/like (1)@2x.png";
import * as Components from "components";
import * as MuiIcons from "@mui/icons-material";
const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
});

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-semibold",
});

const Button = Mui.styled(Mui.Button)({
  backgroundColor: "white",
  width: "100%",
  height: "3.2rem",
});

const ImageContainer = Mui.styled(Mui.Typography)({
  width: "100%",
  height: "60%",
  marginLeft: "5px !important",
});

const Container = Mui.styled(Mui.Paper)({
  width: "90%",
  height: "15rem",
  border: "1px solid #E6E6E6",
  padding: "1rem",
  position: "relative",
  margin: "auto",
});

const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  top: "50%",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  width: "16px",
  height: "16px",
  "&:hover": { bgcolor: "white" },
});

const ImgComponent = ({ images, id }: { images: string[]; id: string }) => {
  const [index, setIndex] = React.useState(0);
  // console.log(index)
  const router = Routers.useRouter();
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
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        // display: "flex",
        // alignItems: "center",
      }}
    >
     
      <Mui.CardMedia
        component={"img"}
        src={images?.[index]}
        sx={{
          width: "100%",
          height: "248px",
          objectFit: "cover",
          // objectPosition: "center",
        }}
        onClick={() => router.push(`/bazaar-city/${id}`)}
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

export const UsersBazaarCityPost = ({ getUserDetails, ...props }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [post, setpost] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open1, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(!open1);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const routers = Routers.useRouter();

  const { data, isLoading, refetch } = ReactQuery.useQuery("userBazaar", () => {
    return Api.Server.Client().post(
      Api.Server.ApiRoutes.profile.userBazaarCityList,
      {
        user_id: routers?.query?.userId,
      }
    );
  });
  // const userpost =data?.data;
  console.log("userDetails11", getUserDetails?.uid);
  console.log("userDetails12", data?.data?.data);

  const editpost = (props: any) => {
    setpost(props);
  };
  const edit = () => {
    setOpen(true);
  };
  if (data?.data?.data.length > 0) {
    return (
      <Mui.Box>
        <Mui.Grid container spacing={2}>
          {data?.data?.data.map(
            (item: any, index: any) =>
              item.item_images.length > 0 && 
              (
                <Mui.Grid key={index} item xs={12} md={6}>
                  <Mui.Box>
                    <Mui.Stack
                      spacing={2}
                      sx={{
                        border: "1px solid #E6E6E6",
                        p: 2,
                        borderRadius: 2,
                        height: "100%",
                      }}
                    >
                      <Mui.Stack direction="row" spacing={2}>
                        <Mui.Box flexGrow={1}>
                          <Mui.Typography
                            sx={{ fontSize: "0.7rem", color: "#707070" }}
                          >
                            {item?.province_name}
                          </Mui.Typography>
                        </Mui.Box>
                      </Mui.Stack>

                      <Mui.Box
                        onClick={() => routers.push(`/bazaar-city/${item._id}`)}
                        sx={{
                          borderRadius: "15px",
                          overflow: "hidden",
                          objectFit: "fill",
                          objectPosition: "center",
                          height: "100%",
                          maxHeight: 300,
                          marginTop: "0 !important",
                        }}
                      >
                        <ImgComponent
                          images={item?.item_images}
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
                     {console.log("item like", item)}
                      <LikesandComments refetch={refetch} items={item} />
                    </Mui.Stack>
                  </Mui.Box>
                </Mui.Grid>
              )
          )}
        </Mui.Grid>
      </Mui.Box>
    );
  }
  return (
    <Mui.Grid item xs={12} md={6} lg={4}>
      <Mui.Typography>No Data Found!</Mui.Typography>
    </Mui.Grid>
  );
};

const LikesandComments = ({ items, refetch }: any) => {
  const router = Routers.useRouter();
  const [openShareModel, setOpenShareModel] = React.useState(false);
  const client = ReactQuery.useQueryClient();

  const LikePost = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "bazaarCity",
      post_id: getId,
    };
    console.log("like id", likeDetails);
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
            <Mui.Box
              sx={{ width: "15px", height: "15px" }}
              component="img"
              src={LikedImage.src}
            />
          ) : (
            <Mui.Box
              sx={{ width: "15px", height: "15px" }}
              component="img"
              src={LikeImage.src}
            />
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
          <Mui.Box
            sx={{ width: "15px", height: "15px" }}
            component="img"
            src={CommentImage.src}
          />
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
          <Mui.Box
            sx={{ width: "15px", height: "15px" }}
            component="img"
            src={ShareImage.src}
          />
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
