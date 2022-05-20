import * as Mui from "@mui/material";
import BackgroundImage from "assets/featured_post_bg.png";
import FoodoftheDatImage from "assets/food_of_the_week@2x.png";
import PlaceoftheFood from "assets/place_of_the_week@2x.png";
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
  fontSize: "0.85rem",
}));

const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "CallunaSans-Regular",
  fontSize: "0.7rem",
}));

const ImageContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "90%",
  height: "auto",
  margin: "10px auto",
  position: "relative",
}));

const Container = Mui.styled(Mui.Paper)(({ theme }) => ({
  background: `url(${BackgroundImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
}));

export const FeaturePost = ({ place, food }: any) => {
  const router = NextRouter.useRouter();
  return (
    <Mui.Box sx={{ mt: 3 }}>
      <Container sx={{ p: 1 }} elevation={0}>
        <Mui.Toolbar sx={{ padding: "10px !important" }}>
          <Mui.Typography sx={{ fontSize: "1rem" }}>
            Featured Posts
          </Mui.Typography>
        </Mui.Toolbar>
        <Mui.Box sx={{ p: 1 }}>
          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(`/user/${food?.uid}`)}
          >
            <Avatar src={food?.profile_photo} />
            <Name>{food?.full_name}</Name>
          </Mui.Stack>
          <Mui.Stack
            sx={{ mt: 1 }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <Mui.Box
              sx={{ ml: 1 }}
              width={"1rem"}
              component="img"
              src={FoodoftheDatImage.src}
            />
            <StyledTypography color={"#9F3B70"}>
              Food of the week
            </StyledTypography>
          </Mui.Stack>
          <Mui.Box sx={{ mt: 1 }}>
            <StyledTypography sx={{ fontSize: "0.75rem" }} color={"#707070"}>
              {food?.post_description}
            </StyledTypography>
          </Mui.Box>
          <ImageContainer onClick={() => router.push(`/foodtrip/${food._id}`)}>
            <Mui.Box
              sx={{ borderRadius: "15px" }}
              width={"100%"}
              height={"auto"}
              component="img"
              src={food?.post_images?.[0]}
            />
            {/* <PlayOverLay>
                        <Mui.IconButton sx={{color: 'white', border:'2px solid white'}}>
                            <MuiIcons.PlayArrow sx={{fontSize:'2rem'}} />
                        </Mui.IconButton>
                    </PlayOverLay> */}
          </ImageContainer>
        </Mui.Box>
        <Mui.Box sx={{ p: 1, mt: 2 }}>
          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            onClick={() => router.push(`/user/${food?.uid}`)}
          >
            <Avatar src={place?.profile_photo} />
            <Name>{place?.full_name}</Name>
          </Mui.Stack>
          <Mui.Stack
            sx={{ mt: 1 }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <Mui.Box
              sx={{ ml: 1 }}
              width={"1rem"}
              component="img"
              src={PlaceoftheFood.src}
            />
            <StyledTypography color={"#9F3B70"}>
              Place of the week
            </StyledTypography>
          </Mui.Stack>
          <Mui.Box sx={{ mt: 1 }}>
            <StyledTypography sx={{ fontSize: "0.75rem" }} color={"#707070"}>
              {place?.post_description}
            </StyledTypography>
          </Mui.Box>
          <ImageContainer onClick={() => router.push(`/foodtrip/${place._id}`)}>
            <Mui.Box
              sx={{ borderRadius: "15px" }}
              width={"100%"}
              height={"auto"}
              component="img"
              src={place?.post_images[0]}
            />
            {/* <PlayOverLay>
                        <Mui.IconButton sx={{color: 'white', border:'2px solid white'}}>
                            <MuiIcons.PlayArrow sx={{fontSize:'2rem'}}/>
                        </Mui.IconButton>
                    </PlayOverLay> */}
          </ImageContainer>
        </Mui.Box>
      </Container>
    </Mui.Box>
  );
};
