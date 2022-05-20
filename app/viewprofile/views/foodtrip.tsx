/* eslint-disable react/jsx-key */
import * as Mui from "@mui/material";
import { app } from "firebase-config";
import * as FirebaseAuth from "firebase/auth";
import EditIcon from "assets/Icon feather-more-vertical_grey.png";
// import * as Router from 'next/router';
import * as React from "react";
import * as Routers from "next/router";
import * as ReactQuery from "react-query";
import { EditProduct } from "./editproduct";
import * as Api from "api";

const StyledImgContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "8rem",
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

export const UserFoodTrip = ({ getUserDetails1 }: any) => {
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

  const { data, isLoading } = ReactQuery.useQuery("userFoodTrip", () => {
    return Api.Server.Client().post(
      Api.Server.ApiRoutes.userProfileDetails.userFoodTripList,
      {
        user_id: getUserDetails1?.uid,
      }
    );
  });
  // const userpost =data?.data;
  console.log("userDetails11", getUserDetails1?.uid);
  console.log("userDetails12", data?.data?.data);

  const editpost = (props: any) => {
    setpost(props);
  };
  const edit = () => {
    setOpen(true);
  };
  return (
    <Mui.Grid container spacing={2}>
      {data?.data?.data.map((item: any, index: any) => (
        <Mui.Grid key={index} item xs={12} md={6} lg={4}>
          <StyledImgContainer>
            <Mui.Box
              component="img"
              src={item.post_images}
              width={"100%"}
              height={"100%"}
              sx={{ borderRadius: "20px" }}
            />
            <TextOverLay>
              <StyledTypography color={"#FFFFFF"}>
                {" "}
                {item.number_of_likes} Likes
              </StyledTypography>
              <StyledTypography color={"#FFFFFF"}>
                {item.number_of_comments} Comments{" "}
              </StyledTypography>
            </TextOverLay>
          </StyledImgContainer>
        </Mui.Grid>
      ))}
    </Mui.Grid>
  );
};
