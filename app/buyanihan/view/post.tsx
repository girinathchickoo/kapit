import * as Mui from "@mui/material";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import { PostList } from "../main";
import * as NextRouter from "next/router";
import * as Query from "react-query";
import * as Server from "api";
import * as Components from "components";
import * as Hooks from "hooks";

const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  top: "50%",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  width: "16px",
  height: "16px",
  "&:hover": { bgcolor: "white" },
});

const ArrowButton = ({ type, handleClick }: ArrowButtonProps) => {
  const Arrow = ({ sx }: Mui.TypographyProps) => {
    return type === "left" ? (
      <MuiIcons.KeyboardArrowLeft sx={sx} />
    ) : (
      <MuiIcons.KeyboardArrowRight sx={sx} />
    );
  };

  return (
    <NavButton
      onClick={handleClick}
      sx={{
        ...(type === "left" ? { left: "1rem" } : { right: "1rem" }),
      }}
    >
      <Arrow sx={{ fontSize: "12px" }} />
    </NavButton>
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

export const Post = ({ item, key }: Props) => {
  console.log("item", item);
  const router = NextRouter.useRouter();

  const [ImgCount, setImgCount] = React.useState(0);
  const [openShareModel, setOpenShareModel] = React.useState(false);

  const client = Query.useQueryClient();

  const { mutate: LikeUnlike } = Query.useMutation(
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.postLike,
        {
          type: item.likedBy === "0" ? "like" : "unlike",
          post_type: "donasayon",
          post_id: item._id,
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        client.invalidateQueries("listBuyanihan");
        client.invalidateQueries("getOneBuyanihanPost");
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const handleLike = () => {
    // console.log(Like)
    LikeUnlike();
  };

  const handleNext = () => {
    setImgCount(ImgCount - 1 <= item?.post_images.length ? ImgCount + 1 : 0);
    console.log(ImgCount);
  };

  const handlePrevious = () => {
    setImgCount(ImgCount + 1 >= 0 ? ImgCount - 1 : item?.post_images.length);
    console.log(ImgCount);
  };

  const handleView = () => {
    router.push(`/buyanihan/${item._id}`);
  };

  const isMobile = Hooks.useMobileView();

  return (
    <Mui.Grid item md={6} xs={12} lg={4}>
      <Mui.Card
        key={key}
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
              onClick={() => router.push(`/user/${item?.uid}`)}
            >
              <Mui.Stack
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
                  {item?.location}
                </Mui.Typography>
              </Mui.Stack>
            </Mui.Stack>
            <Mui.Grid item xs={12} sx={{ mt: "20px", position: "relative", display: "flex", justifyContent: "center" }}>
              <Mui.Card
                component={"img"}
                src={item?.post_images[ImgCount]}
                sx={{
                  width: 300,
                 height: 300,
                  maxHeight: "auto",
                  float: "left",
                  margin: "3px",
                  padding: "3px",
                }}
                elevation={0}
                onClick={handleView}
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
              onClick={handleView}
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
                name={`${item?.number_of_likes !== 0 ? item?.number_of_likes : ""
                  } Likes`}
                icon={item.likedBy === "1" ? LikedImage : LikeImage}
                handleClick={handleLike}
              />
              <ButtonSelection
                name={`${item?.number_of_comments !== 0 ? item?.number_of_comments : ""
                  } Comments`}
                icon={CommentImage}
                handleClick={handleView}
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
  );
};

interface Props {
  item: PostList;
  key: string;
}

interface SelectionProps {
  count?: number;
  icon: StaticImageData;
  name: string;
  handleClick: () => void;
}

interface ArrowButtonProps {
  type: string;
  handleClick: () => void;
}
