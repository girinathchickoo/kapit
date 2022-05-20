import * as Mui from "@mui/material";
import * as Hooks from "hooks";
import LikeImage from "assets/like (1)@2x.png";
import LikedImage from "assets/heart@2x.png";
import CommentImage from "assets/Icon awesome-comment@2x 2.png";
import ShareImage from "assets/Icon awesome-share@2x.png";
import * as ReactQuery from "react-query";
import * as Api from "api";
import LocationPin from "assets/location@2x.png";
import * as NextRouter from "next/router";
import * as Components from "components";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
import * as Server from "api";
import { CommentSection, PostSection } from "./components";


const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  top: "50%",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  width: "16px",
  height: "16px",
  "&:hover": { bgcolor: "white" },
});

export const ArrowButton = ({ type, handleClick }: ArrowButtonProps) => {
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
        // position: "absolute",
        // bgcolor: "white",
        // p: 1,
        // top: "50%",
        ...(type === "left" ? { left: "0rem" } : { right: "0rem" }),
        // "&:hover": {
        //   bgcolor: "white",
        // },
      }}
    >
      <Arrow sx={{ fontSize: "12px" }} />
    </NavButton>
  );
};

export const ButtonSelection = ({
  icon,
  name,
  count,
  handleClick,
}: SelectionProps) => {
  return (
    <Mui.IconButton onClick={handleClick} sx={{ p: 0 }}>
      <Mui.Stack flexDirection={"row"} spacing={1} sx={{ alignItems: "center", justifyContent: "center" }}>
        <Mui.Box component={"img"} src={icon.src} sx={{ width: 20, height: 20 }} />
        <Mui.Typography sx={{ pl: 1, fontSize: "12px", width: "fit-content", mt: "0px!important" }} whiteSpace="nowrap">
          {(count as number) > 0 ? count : ""} {name}
        </Mui.Typography>
      </Mui.Stack>
    </Mui.IconButton>
  );
};

export const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  borderRadius: "10px",
  border: `2px solid ${theme.palette.primary.main}`,
  width: "2rem",
  height: "2rem",
}));

export const Name = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "Haborosans-normal",
  fontWeight: 600,
  fontSize: "0.85rem",
}));

export const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "Haborosans-normal",
  fontSize: "0.7rem",
}));

export const ViewBuyanihan = () => {
  const isMobile = Hooks.useMobileView();
  const router = NextRouter.useRouter();
  const getQuery = router.query;
  console.log(getQuery?.buyanihanid);

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
          <Mui.Grid item md={6} xs={12} sx={{ height: "100%" }}>
            <PostSection />
          </Mui.Grid>
          <Mui.Grid item md={6} xs={12} sx={{ height: "100%" }}>
            <CommentSection />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.DialogContent>
    </Mui.Dialog>
  );
};

export interface ArrowButtonProps {
  type: string;
  handleClick: () => void;
}

export interface SelectionProps {
  count?: number;
  icon: StaticImageData;
  name: string;
  handleClick: () => void;
}

export interface PostDetails {
  _id: string;
  uid?: string;
  enter_your_price: string;
  full_name: string;
  post_images: string[];
  profile_photo: string;
  item_name: string;
  number_of_likes: number;
  number_of_comments: number;
  LikedBy?: number;
  createdAt:string;
}

export interface Comment {
  profile_photo: string;
  comment_ref_id: string;
  _id: string;
  uid?: string;
  full_name: string;
  number_of_likes: number;
  number_of_replies: number;
  likedby: number;
  comment_description: string;
}

export interface PostData {
  LikedBy: number;
  category: string;
  createdAt: string;
  enter_your_price: string;
  full_name: string;
  is_active: number;
  is_this_price: string;
  item_name: string;
  location: null;
  number_of_comments: number;
  number_of_likes: number;
  post_images: string[];
  profile_photo: string;
  purpose_to_add: string;
  uid: string;
  updatedAt: string;
  __v: number;
  _id: string;
}