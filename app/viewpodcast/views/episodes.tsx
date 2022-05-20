/* eslint-disable react/jsx-key */
import * as Mui from "@mui/material";
import * as Components from "components";
import moment from "moment";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";

const DavisFontText = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.8rem",
});

const EpisodeContainer = Mui.styled(Mui.Stack)({
  width: "90%",
});

export const Episodes = ({ episodes, play }: any) => {
  return (
    <Mui.Box sx={{ mt: 2 }}>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12} md={8}>
          <Mui.Box>
            <Components.CardWithTitle
              title={`Episodes (${episodes?.length})`}
              actions={null}
              extraText={null}
            >
              {episodes?.map((item: any, index: any) => (
                <Mui.Box key={index}>
                  <Mui.Stack
                    key={index}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <EpisodeContainer sx={{ mb: 3 }} spacing={1}>
                      <Mui.Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <DavisFontText
                          sx={{ letterSpacing: "0.5px" }}
                          color={"#9B7DD4"}
                        >
                          <strong> Episode 1 : {item?.title}</strong>
                        </DavisFontText>
                        <DavisFontText sx={{ fontSize: "0.7rem" }}>
                          {moment(item?.createdAt).format("MMM DD, YYYY")}{" "}
                          &nbsp; | &nbsp; {moment(item?.createdAt).fromNow()}
                        </DavisFontText>
                      </Mui.Stack>
                      <DavisFontText>{item?.description}</DavisFontText>
                      <Components.AudioPlayer
                        audioFile={item?.audio_url}
                        startingEpisode={index === 0}
                        player={play}
                      />
                    </EpisodeContainer>
                  </Mui.Stack>
                  {episodes.length == -1 && <Mui.Divider sx={{ mb: 2 }} />}
                </Mui.Box>
              ))}
            </Components.CardWithTitle>
          </Mui.Box>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={4}>
          <Mui.Box>
            <Components.CompanionBanner />
          </Mui.Box>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
