import * as Mui from "@mui/material";
import * as Components from "components";
import * as MuiLab from "@mui/lab";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as MuiIcon from "@mui/icons-material";
import moment from "moment";
import * as NextRouters from "next/router";
import * as Layouts from "layouts";
import * as React from "react";

const ImageContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "100%",
});

const Timings = Mui.styled(Mui.Typography)({
  fontSize: "0.7rem",
  color: "#DDA15E",
  fontFamily: "CallunaSans-Regular",
});

const EventName = Mui.styled(Mui.Typography)({
  fontSize: "0.9rem",
  color: "#333333",
  fontFamily: "CallunaTitle-Semibold",
  marginTop: "0.2rem",
});

export const HomePNationCalendar = () => {
  const [list, setList] = React.useState<any>([]);
  const routers = NextRouters.useRouter();
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);
  const { data } = ReactQuery.useQuery(
    ["HomepnationNation", value],
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.pnation.listEvent,
        {
          search: value,
          pageNumber: 1,
          filterLocation: [],
          dateFilter: [],
        }
      );
      return datas?.data?.data;
    }
  );

  const separateData = () => {
    const listPNation = data ? data : {};
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
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        actions={null}
        extraText={"Add Event"}
        title={"P Nation Calendar"}
      >
        <Mui.Grid container>
          <Mui.Grid item xs={12}>
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
                    <MuiLab.TimelineConnector />
                  </MuiLab.TimelineSeparator>
                  <MuiLab.TimelineContent sx={{ paddingTop: "0px" }}>
                    <EventName sx={{ color: "#9B7DD4" }}>
                      {" "}
                      {moment(new Date(item.date)).format("MMM Do")}
                    </EventName>
                    {item.event.map((event: any, index: any) => (
                      <Mui.Box
                        key={index}
                        sx={{ height: "auto", marginTop: "10px" }}
                      >
                        <Mui.Grid container spacing={2}>
                          <Mui.Grid item md={5} xs={12}>
                            <ImageContainer>
                              <Mui.Box
                                width={"100%"}
                                maxHeight={"200px"}
                                sx={{
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                }}
                                component={"img"}
                                src={event?.poster_image}
                                onClick={() =>
                                  localStorage.getItem("Mktoken")
                                    ? routers.push(`/p-nation/${event._id}`)
                                    : routers.push(`/accounts/login`)
                                }
                              />
                            </ImageContainer>
                          </Mui.Grid>
                          <Mui.Grid
                            item
                            md={7}
                            xs={12}
                            sx={{
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
                              sx={{ fontSize: "0.7rem", color: "#707070" }}
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
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
