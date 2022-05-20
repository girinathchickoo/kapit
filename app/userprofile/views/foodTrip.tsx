import * as Mui from "@mui/material";
import SampleImage from "assets/Rectangle 267@2x.png";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Routers from "next/router";

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

export const UsersFoodTripPost = () => {
 const routers = Routers.useRouter();

  const { data, isLoading } = ReactQuery.useQuery("userFoodTrip", () => {
    return Api.Server.Client().post(
      Api.Server.ApiRoutes.userProfileDetails.userFoodTripList,
      {
        user_id: routers?.query?.userId,
      }
    );
  });

  if (data?.data?.data.length > 0) {
    return (
      <Mui.Grid container spacing={2}>
        {data?.data?.data.map(
          (item: any, index: any) =>
            item?.post_images?.length > 0 && (
              <Mui.Grid key={index} item xs={12} md={6} lg={4}>
                <StyledImgContainer
                  onClick={() => routers.push(`/foodtrip/${item._id}`)}
                >
                  {console.log("post imgs",item.post_images[0])}
                  <Mui.Box
                    component="img"
                    src={item.post_images[0]}
                    width={"100%"}
                    height={"100%"}
                    sx={{ borderRadius: "20px", objectFit: "cover" }}
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
            )
        )}
      </Mui.Grid>
    );
  }
  return (
    <Mui.Grid item xs={12} md={6} lg={4}>
      <Mui.Typography>No Data Found!</Mui.Typography>
    </Mui.Grid>
  );
};

interface FoodTrip {
  createdAt: string;
  number_of_comments: number;
  number_of_likes: number;
  post_images: [string];
  youtube_link: string;
  _id: string;
}
