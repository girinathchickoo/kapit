import * as Mui from "@mui/material";
import { ThirdTemplate } from "app/pinoypreneurs/templates";
import * as Components from "components";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as NextRouter from "next/router";
import * as Views from "app/foodtrip/views";

const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  borderRadius: "10px",
  border: `2px solid ${theme.palette.primary.main}`,
}));

const Name = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "CallunaSans-Regular",
  fontWeight: 600,
  fontSize: "0.85rem",
}));

const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "CallunaSans-Regular",
  fontSize: "0.9rem",
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
          // cursor: 'pointer',
          // objectPosition: "center",
        }}
      // onClick={() => router.push(`/foodtrip/${id}`)}
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

const DavisFontText = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Bold",
  fontSize: "1rem",
  fontWeight: 500,
  color: "#333333",
});

export const RecepeSharing = ({ data }: any) => {
  const [openModel, setOpenModel] = React.useState(false);
  const [modelData, setModelData] = React.useState<any>("");
  const router = NextRouter.useRouter();

  const handleModel = (item: any) => {
    setModelData(item);
    setOpenModel(!openModel);
  };
  return (
    <Mui.Box sx={{ mt: 3 }}>
      <Components.CardWithTitle
        title={"Recipee of the Week"}
        actions={null}
        extraText={null}
      >
        {data?.slice(0, 2)?.map((item: any, index: any) => (
          <Mui.Box key={index} sx={{ mb: 2 }}>
            <Mui.Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Mui.Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/user/${item?.uid}`)}
              >
                <Avatar src={item?.profile_photo} />
                <Name>{item?.full_name}</Name>
              </Mui.Stack>
            </Mui.Stack>
            <Mui.Box sx={{ mt: 1 }}>
              <StyledTypography sx={{ fontSize: "0.75rem" }} color={"#707070"}>
                {item?.post_description}
                {/* Duis pretium gravida enim, vel maximus ligula fermentum a. Sed */}
                {/* rhoncus eget ex id egestas. Nam nec nisl placerat, tempus erat
                  a, condimentum metus. Curabitur nulla nisi, lacinia at
                  lobortis at, suscipit at nibh. Proin quis lectus finibus,
                  mollis purus vitae, rutrum neque. Pellentesque habitant morbi
                  tristique senectus et netus et malesuada fames ac turpis
                  egestas. Etiam sed cursus metus, vel viverra mi. Mauris
                  aliquet egestas eros ac placerat. Proin condimentum ligula at
                  diam euismod fringilla et quis lacus. Duis pretium gravida
                  enim, vel maximus ligula fermentum a. Sed rhoncus eget ex id
                  egestas. Nam nec nisl placerat, tempus erat a, condimentum
                  metus. Curabitur nulla nisi, lacinia at lobortis at, suscipit
                  at nibh. Proin quis lectus finibus, mollis purus vitae, rutrum
                  neque. Pellentesque habitant morbi tristique senectus et netus
                  et malesuada fames ac turpis egestas. */}
              </StyledTypography>
            </Mui.Box>
            <ImgComponent images={item?.post_images} id={item.id} />

            {/* <Mui.Stack onClick={() => handleModel(item)} alignItems="center">
                <Mui.Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "40rem",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#33333387",
                    overflow: "hidden",
                    borderRadius: "15px",
                  }}
                >
                  <Mui.CardMedia
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    component="video"
                    image={item?.video_url}
                  />
                  <Mui.IconButton
                    sx={{
                      color: "white",
                      border: "2px solid white",
                      position: "absolute",
                    }}
                  >
                    <MuiIcons.PlayArrow fontSize="small" />
                  </Mui.IconButton>
                </Mui.Box>
                <Mui.Box sx={{ width: "100%" }}>
                  <DavisFontText>
                    {item?.title}
                  </DavisFontText>
                </Mui.Box>
              </Mui.Stack>
              <Views.ViewVideos
          item={modelData}
          open={openModel}
          onclose={() => setOpenModel(!openModel)}
        /> */}
            {/* <ImageContainer>
                <Mui.Box
                  sx={{ borderRadius: "15px" }}
                  width={"100%"}
                  height={"auto"}
                  component="img"
                  src=""
                />
              </ImageContainer> */}
            {data?.length - 1 !== index && <Mui.Divider />}
          </Mui.Box>
        ))}
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
