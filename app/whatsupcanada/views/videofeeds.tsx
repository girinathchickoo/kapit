import * as Mui from "@mui/material";
import * as Components from "components";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as Views from "app/whatsupcanada/views";

const ImageContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "10rem",
  position: "relative",
});

const TextOverLay = Mui.styled(Mui.Box)({
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
  backgroundColor: "#33333387",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
});

const DavisFontText = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Bold",
  fontSize: "1rem",
  fontWeight: 500,
  color: "#333333",
});

export const VideoFeed = ({ data }: any) => {
  const [openModel, setOpenModel] = React.useState(false);
  const [modelData, setModelData] = React.useState<any>("");

  const handleModel = (item: any) => {
    setModelData(item);
    setOpenModel(!openModel);
  };

  return (
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        title={"Video Feeds"}
        actions={null}
        extraText={null}
      >
        <Mui.Stack spacing={2}>
          {data?.slice(0, 3).map((item: any, index: number) => (
            <Mui.Stack key={index} spacing={1}>
              <Components.CompanionBanner />
              <Mui.Stack onClick={() => handleModel(item)} alignItems="center">
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
            </Mui.Stack>
          ))}
        </Mui.Stack>
        <Views.ViewVideos
          item={modelData}
          open={openModel}
          onclose={() => setOpenModel(!openModel)}
        />
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
