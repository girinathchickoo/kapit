import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Nextrouter from "next/router";
import * as React from "react";

const Heading = Mui.styled(Mui.Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1rem",
  fontFamily: "Raleway-semibold",
}));

const BackIcon = Mui.styled(Mui.IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.primary.main}`,
  padding: "3px",
}));

const ImageContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "100%",
  height: "13rem",
}));

const DavisFontText = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-regular",
  fontSize: "0.9rem",
});

export const AuthorCard = ({ details, playFirstEpisode, play }: any) => {
  const routes = Nextrouter.useRouter();

  const handleplay = () => {
    playFirstEpisode();
  };

  return (
    <Mui.Box>
      <Mui.Paper sx={{ p: 2, position: "relative" }}>
        <Mui.Toolbar sx={{ padding: "10px !important" }}>
          <Mui.Stack spacing={2} direction={"row"} alignItems={"center"}>
            <BackIcon onClick={() => routes.push("..")}>
              <MuiIcons.KeyboardArrowLeft />
            </BackIcon>
            <Heading>Podcast Details</Heading>
          </Mui.Stack>
        </Mui.Toolbar>
        <Mui.Divider />

        <Mui.Grid sx={{ mt: 0.5 }} container spacing={2}>
          <Mui.Grid item xs={12} md={3} xl={2}>
            <ImageContainer>
              <Mui.Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              >
                <Mui.CardMedia
                  component={"img"}
                  src={details?.author_imageUrl}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "center",
                    objectPosition: "center",
                  }}
                />
              </Mui.Box>
            </ImageContainer>
          </Mui.Grid>

          <Mui.Grid item xs={12} sm={6}>
            <Mui.Stack
              spacing={2}
              justifyContent="space-between"
              sx={{ height: "100%" }}
            >
              <Mui.Stack spacing={1}>
                <Mui.Box>
                  <DavisFontText>
                    <strong>{details?.title}</strong>
                  </DavisFontText>
                  <DavisFontText sx={{ fontSize: "0.8rem" }} color={"#707070"}>
                    Team {details?.team}
                  </DavisFontText>
                </Mui.Box>
                <DavisFontText sx={{ fontSize: "0.75rem" }} color={"#333333"}>
                  {details?.description}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit, nostrum perspiciatis mollitia praesentium
                  consequuntur aliquid vitae, enim vel deleniti, nisi asperiores
                  magnam sunt et architecto? Soluta excepturi magni eum
                  similique.
                </DavisFontText>
              </Mui.Stack>

              <Mui.Box>
                <Mui.Button
                  variant="contained"
                  startIcon={play ? <MuiIcons.Pause /> : <MuiIcons.PlayArrow />}
                  onClick={handleplay}
                >
                  {play ? "Pause" : "Play"}
                </Mui.Button>
              </Mui.Box>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Paper>
    </Mui.Box>
  );
};
