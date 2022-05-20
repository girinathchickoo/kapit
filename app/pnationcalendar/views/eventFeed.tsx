import * as Mui from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import * as MuiLab from "@mui/lab";
import FilterImg from "assets/filter@2x.png";
import * as React from "react";
import moment from "moment";
import * as Router from "next/router";

const Timings = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  color: "#DDA15E",
  fontFamily: "CallunaSans-Regular",
});

const EventName = Mui.styled(Mui.Typography)({
  fontSize: "1rem",
  color: "#333333",
  fontFamily: "CallunaTitle-Semibold",
  marginTop: "0.2rem",
});

export const EventFeed = ({ data, openModel }: any) => {
  const listPNation = data ? data : {};
  const router = Router.useRouter();
  const [list, setList] = React.useState<any>([]);
  const separateData = () => {
    const listData = [];
    const getKeys = Object.keys(listPNation);
    const getValues = Object.values(listPNation);
    for (let i = 0; i < getKeys.length; i++) {
      listData.push({
        date: getKeys[i],
        event: getValues[i],
      });
    }
    setList(listData);
  };

  React.useEffect(() => {
    separateData();
  }, [data]);

  return (
    <Mui.Box
      sx={{ backgroundColor: "white", borderRadius: "20px", padding: "25px" }}
    >
      <Mui.Grid container>
        <Mui.Grid item xs={6}>
          <Mui.Typography
            sx={{ fontSize: "1rem", fontFamily: "CallunaTitle-Bold" }}
          >
            Event
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Mui.IconButton onClick={openModel}>
            <Mui.CardMedia
              component="img"
              sx={{ height: "30px", width: "30px" }}
              src={FilterImg.src}
            ></Mui.CardMedia>
            <Mui.Typography
              sx={{ fontSize: "0.9rem", paddingLeft: "10px" }}
              color="primary"
            >
              filter
            </Mui.Typography>
          </Mui.IconButton>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={{ height: "auto" }}>
          <MuiLab.Timeline
            position="right"
            sx={{
              "&.MuiTimeline-root": {
                "& ::before": {
                  display: "none",
                },
              },
            }}
          >
            {list.map((item: any, index: any) => (
              <MuiLab.TimelineItem key={index}>
                <MuiLab.TimelineSeparator>
                  <MuiIcon.Adjust color="primary" />
                  <MuiLab.TimelineConnector
                    sx={{ backgroundColor: "#9B7DD44E" }}
                  />
                </MuiLab.TimelineSeparator>
                <MuiLab.TimelineContent
                  sx={{ paddingTop: "0px", paddingRight: "0px" }}
                >
                  <EventName sx={{ color: "#9B7DD4" }}>
                    {moment(new Date(item.date)).format("MMM Do")}
                  </EventName>
                  {item.event.map((event: any, index: any) => (
                    <Mui.Box key={index} sx={{ height: "auto" }}>
                      <Mui.Grid
                        onClick={() => router.push(`/p-nation/${event._id}`)}
                        container
                        sx={{
                          height: "auto",
                          paddingTop: "2%",
                          paddingBottom: "3%",
                        }}
                      >
                        <Mui.Grid item md={7} xs={11} sx={{ height: "100%" }}>
                          <Mui.Box
                            width={"100%"}
                            maxHeight="250px"
                            sx={{
                              borderRadius: "10px",
                              objectFit: "scale-down",
                            }}
                            component={"img"}
                            src={event?.poster_image}
                          />
                        </Mui.Grid>
                        <Mui.Grid
                          item
                          md={5}
                          xs={11}
                          sx={{
                            height: "100%",
                            padding: "15px",
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Mui.Stack
                            direction={"row"}
                            alignItems="center"
                            spacing={0.5}
                          >
                            <MuiIcon.AccessTime
                              sx={{ color: "#DDA15E", fontSize: "1.3rem" }}
                            />
                            <Timings>{event.event_time}</Timings>
                          </Mui.Stack>

                          <EventName> {event.name_of_the_event} </EventName>
                          <EventName
                            sx={{ fontSize: "0.8rem", color: "#707070" }}
                          >
                            {event.city} . {event.province_name}
                          </EventName>
                        </Mui.Grid>
                      </Mui.Grid>
                    </Mui.Box>
                  ))}
                </MuiLab.TimelineContent>
              </MuiLab.TimelineItem>
            ))}
          </MuiLab.Timeline>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
