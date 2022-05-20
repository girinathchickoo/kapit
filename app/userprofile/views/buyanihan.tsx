import * as Mui from "@mui/material";
import SampleImage from "assets/Rectangle 267@2x.png";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Routers from "next/router";
import React from "react";
import * as Server from "api"; 
import * as MuiIcons from "@mui/icons-material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png"; 
import * as Query from "react-query";
import * as Components from "components";

const StyledImgContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "10rem",
  cursor: "pointer",
  position: "relative",
});

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-semibold",
  fontSize: "0.75rem",
});

const TextOverLay = Mui.styled(Mui.Box)({
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
  backgroundColor: "#3e3d3dbf",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  transition: "opacity 0.25s",
  opacity: 0,
  "& > *": {
    transform: "translateY(20px)",
    transition: "transform 0.25s",
  },
  "&:hover": {
    opacity: 1,
  },
  "&:hover > * ": {
    transform: "translateY(0)",
  },
});

export const UsersBuyanihanPost = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [post, setpost] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [ImgCount, setImgCount] = React.useState(0);
  const [open1, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(!open1);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const routers = Routers.useRouter();

  const { data, isLoading, refetch } = ReactQuery.useQuery(
    "userBuyanihan",
    () => {
      return Api.Server.Client().post(
        Api.Server.ApiRoutes.profile.ListUserByeBuyItem,
        {
          user_id: routers?.query?.userId,
        }
      );
    }
  );

  const [openShareModel, setOpenShareModel] = React.useState(false);

  const client = Query.useQueryClient();

   

  const handleLike = async (getType: string, getId: number | string) => {
    let likeDetails = {
      type: getType,
      post_type: "donasayon",
      post_id: getId,
    };
    console.log("like id", likeDetails)
    await Api.Server.Client().post(Api.Server.ApiRoutes.postLike, likeDetails);
    await refetch();
  };

  const handleNext = () => {
    // setImgCount(ImgCount - 1 <= item?.post_images.length ? ImgCount + 1 : 0);
    console.log(ImgCount);
  };

  const handlePrevious = () => {
    // setImgCount(ImgCount + 1 >= 0 ? ImgCount - 1 : item?.post_images.length);
    console.log(ImgCount);
  };

  const handleView = (id: any) => {
    // console.log("idid", id)
    routers.push(`/buyanihan/${id}`);
  };

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
      {data?.data?.data.map((item: any, index: any) =>
       item?.post_images.length > 0 && 
      (
        
        // <Mui.Grid item md={6} xs={12} lg={4}>
        <Mui.Grid key={index} item xs={12} md={6}>
          {console.log("likeg img", item.likedBy, item.item_name)}
    <Mui.Card
      // key={key}
      sx={{
        width: "100%",
        border: "1px solid #E6E6E6",
        mb: "1%",
        borderRadius: "5px !important",
      }}
      elevation={0}
    >
      <Mui.CardContent sx={{ p: 2, pb: `16px !important` }}>
        <Mui.Grid container>
          <Mui.Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => routers.push(`/alpha/user/${item?.uid}`)}
          >
            {/* <Mui.Stack
              direction="row"
              justifyContent="space-between"
              spacing={1}
              alignItems="center"
            >
              <Mui.Avatar
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "10px",
                  border: "2px solid #9B7DD4",
                }}
                src={item?.profile_photo}
              />
              <Mui.Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {item?.full_name}
              </Mui.Typography>
              <Mui.Typography sx={{ fontSize: "12px", color: "#707070" }}>
                {item.location}
              </Mui.Typography>
            </Mui.Stack> */}
          </Mui.Stack>
          <Mui.Grid item xs={12} sx={{position: "relative" }}>
            <Mui.Card
              component={"img"}
              src={item?.post_images[ImgCount]}
              sx={{ height: "200px", width: "100%", objectFit:'cover' }}
              elevation={0}
              onClick={()=>handleView(item?._id)}
            ></Mui.Card>
            {ImgCount > 0 ? (
              <ArrowButton type="left" handleClick={handlePrevious} />
            ) : (
              <></>
            )}
            {ImgCount < item?.post_images?.length - 1 ? (
              <ArrowButton type="right" handleClick={handleNext} />
            ) : (
              <></>
            )}
          </Mui.Grid>
          <Mui.Grid
            item
            container
            xs={12}
            component={Mui.ButtonBase}
            onClick={()=>handleView(item?._id)}
          >
            <Mui.Grid item xs={7} sx={{ textAlign: "left" }}>
              <Mui.Stack>
                <Mui.Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {item?.item_name}
                </Mui.Typography>
                <Mui.Typography sx={{ fontSize: "12px", color: "#707070" }}>
                  {item?.is_this_price} ${item?.enter_your_price}
                </Mui.Typography>
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid
              item
              xs={5}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {item?.purpose_to_add === "For Donation" && (
                <Mui.Button
                  variant="contained"
                  disableElevation
                  sx={{
                    backgroundColor: "#08A88A",
                    height: "30px",
                    cursor: "none",
                    "&:hover": {
                      backgroundColor: "#08A88A",
                    },
                  }}
                >
                  <Mui.Typography sx={{ fontSize: "10px" }}>
                    For Donation
                  </Mui.Typography>
                </Mui.Button>
              )}
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Stack
            spacing={1}
            direction={"row"}
            sx={{ width: "100%", justifyContent: "space-between", mt: 2 }}
          >
            <ButtonSelection
              name={`${
                item?.number_of_likes !== 0 ? item?.number_of_likes : ""
              } Likes`}
              icon={item?.likedBy === 1 || item?.likedBy === "1" ? LikedImage : LikeImage}
              handleClick={() => {
                if (item?.likedBy === 1 || item?.likedBy === "1") {
                  handleLike("unlike", item?._id);
                } else {
                  handleLike("like", item?._id);
                }
              }}
              // handleClick={()=>handleLike(item?._id, item?.likedBy === "1" || item?.likedBy === 1 ? 'liked' : 'like')}
            />
            <ButtonSelection
              name={`${
                item?.number_of_comments !== 0 ? item?.number_of_comments : ""
              } Comments`}
              icon={CommentImage}
              handleClick={()=>handleView(item?._id)}
            />
            <ButtonSelection
              name={" Share"}
              icon={ShareImage}
              handleClick={() => {
                setOpenShareModel(true);
              }}
            />
          </Mui.Stack>
        </Mui.Grid>
        <Components.Share
          onclose={() => setOpenShareModel(!openShareModel)}
          isopen={openShareModel}
        />
      </Mui.CardContent>
    </Mui.Card>
    </Mui.Grid>
      ))} 
      </Mui.Grid>
    </Mui.Box>

    // <Mui.Box>
    //   <Mui.Grid container spacing={2}>
    //     {data?.data?.data.map((item: any, index: any) => (
    //       <Mui.Grid key={index} item xs={12} md={6}>
    //         <Mui.Box>
    //           <Container elevation={0} onClick={() => editpost(item)}>
    //             <Mui.Stack spacing={2} sx={{ height: "100%" }}>
    //               <Mui.Stack paddingLeft={32}>
    //                 <Mui.IconButton onClick={handleClick}>
    //                   <Mui.Box
    //                     width={"30%"}
    //                     component="img"
    //                     src={EditIcon.src}
    //                   />
    //                 </Mui.IconButton>
    //               </Mui.Stack>
    //               <ImageContainer>
    //                 <Mui.Box
    //                   sx={{ borderRadius: "15px" }}
    //                   width={"100%"}
    //                   height={"100%"}
    //                   component="img"
    //                   src={item.post_images}
    //                 />
    //               </ImageContainer>
    //               <Mui.Grid item xs={7} sx={{ textAlign: "left" }}>
    //                 <Mui.Stack>
    //                   <Mui.Typography
    //                     sx={{ fontSize: "14px", fontWeight: 600 }}
    //                   >
    //                     {item?.item_name}
    //                   </Mui.Typography>
    //                   <Mui.Typography
    //                     sx={{ fontSize: "12px", color: "#707070" }}
    //                   >
    //                     {item?.is_this_price} ${item?.enter_your_price}
    //                   </Mui.Typography>

    //                 </Mui.Stack>

    //               </Mui.Grid>
    //             </Mui.Stack>

    //           </Container>
    //           <Mui.Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
    //             <Mui.MenuItem onClick={edit}>Edit Post</Mui.MenuItem>
    //             <Mui.MenuItem onClick={handleClose}>Delete Post</Mui.MenuItem>
    //           </Mui.Menu>
    //         </Mui.Box>
    //       </Mui.Grid>
    //     ))}
    //   </Mui.Grid>
    // </Mui.Box>
  );
}
return (
  <Mui.Grid item xs={12} md={6} lg={4}>
    <Mui.Typography>No Data Found!</Mui.Typography>
  </Mui.Grid>
);
};


const ArrowButton = ({ type, handleClick }: ArrowButtonProps) => {
  const Arrow = ({ sx }: Mui.TypographyProps) => {
    return type === "left" ? (
      <MuiIcons.KeyboardArrowLeft sx={sx} />
    ) : (
      <MuiIcons.KeyboardArrowRight sx={sx} />
    );
  };

  return (
    <Mui.IconButton
      onClick={handleClick}
      sx={{
        position: "absolute",
        bgcolor: "white",
        p: 1,
        top: "40%",
        ...(type === "left" ? { left: "-1rem" } : { right: "-1rem" }),
        "&:hover": {
          bgcolor: "white",
        },
      }}
    >
      <Arrow sx={{ fontSize: "12px" }} />
    </Mui.IconButton>
  );
};

const ButtonSelection = ({
  icon,
  name,
  count,
  handleClick,
}: SelectionProps) => {
  return (
    <Mui.IconButton onClick={handleClick} sx={{ p: 0 }}>
      <Mui.Stack
        flexDirection={"row"}
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Mui.Box
          component={"img"}
          src={icon.src}
          sx={{ width: 20, height: 20 }}
        />
        <Mui.Typography
          sx={{
            pl: 1,
            fontSize: "12px",
            width: "fit-content",
            mt: "0px!important",
            fontFamily: "Haborosans-normal",
          }}
          whiteSpace="nowrap"
        >
          {name}
        </Mui.Typography>
      </Mui.Stack>
    </Mui.IconButton>
  );
};

interface ArrowButtonProps {
  type: string;
  handleClick: () => void;
}

interface SelectionProps {
  count?: number;
  icon: StaticImageData;
  name: string;
  handleClick: any;
  // () => void;
}

interface Buyanihan {
  createdAt: string;
  number_of_comments: number;
  number_of_likes: number;
  post_images: [string];

  _id: string;
}
