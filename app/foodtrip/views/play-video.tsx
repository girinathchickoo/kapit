import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Hooks from "hooks";
import ReactPlayer from "react-player";
import * as React from "react";

const Heading = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Regular",
  fontSize: "0.75rem",
  fontWeight: 600,
});

const Description = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Regular",
  fontSize: "1rem",
  color: "#707070",
});

const PlayerContainer = Mui.styled(Mui.Box)({
  marginTop: "3rem",
  position: "relative",
  "& .playandpause": {
    display: "none",
  },
  "&:hover": {
    "& .playandpause": {
      display: "flex",
    },
  },
  "& video": {
    objectFit: "cover !important",
  },
  borderRadius: 17,
  overflow: "hidden",
});

const PlayButton = Mui.styled(Mui.Box)({
  width: "100%",
  top: "40%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
});

export const ViewVideos = ({ open, onclose, item }: Props) => {
  const isMobile = Hooks.useMobileView();
  const [playVideo, setPlayVideo] = React.useState(false);

  const play = () => {
    setPlayVideo(!playVideo);
  };

  return (
    <Mui.Box>
      <Mui.Dialog
        sx={{ "& .MuiDialog-paper": { width: "100%", p: 2 } }}
        maxWidth="md"
        fullScreen={isMobile}
        open={open}
      >
        <Mui.DialogContent
          sx={{
            position: "relative",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Mui.IconButton
            onClick={onclose}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <MuiIcons.Close />
          </Mui.IconButton>
          <Mui.Stack spacing={2}>
            {/* <PlayerContainer>
              <ReactPlayer
                width={"100%"}
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                playing={playVideo}
                url="https://www.youtube.com/watch?v=gbssrIapnuQ"
                controls
              />
              <PlayButton className="playandpause">
                <Mui.IconButton
                  onClick={play}
                  sx={{ color: "white", border: "2px solid white" }}
                >
                  {!playVideo ? (
                    <MuiIcons.PlayArrow sx={{ fontSize: "2rem" }} />
                  ) : (
                    <MuiIcons.Pause sx={{ fontSize: "2rem" }} />
                  )}
                </Mui.IconButton>
              </PlayButton>
            </PlayerContainer> */}
            <Heading>{item?.title}</Heading>
            <Description>
              {item?.post_description}
            </Description>
          </Mui.Stack>
        </Mui.DialogContent>
      </Mui.Dialog>
    </Mui.Box>
  );
};

interface Props {
  open: boolean;
  onclose: () => void;
  item?: any;
}
