/* eslint-disable react/jsx-key */
import React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import NotificationImage from "assets/notification@2x.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import JobImage from "assets/job.png";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import * as Query from "react-query";
import * as Server from "api";
import TimeAgo from "react-timeago";

const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  borderRadius: "10px",
  backgroundColor: "white",
  border: `1px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
  marginLeft: "10px",
}));


const StyledTypography = Mui.styled(Mui.Typography)(({ theme }) => ({
  fontFamily: "CallunaSans-Regular",
  fontSize: "0.9rem",
}));

export const Notifications = () => {
  const [open, setOpen] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState();
  const theme = Mui.useTheme();
  const isMobile = Mui.useMediaQuery(theme.breakpoints.down("sm"));

  const HoverPopUp = Mui.styled(Mui.Dialog)(({ theme }) => ({
    position: "absolute",
    left: isMobile? "0.5rem":"30rem",
    width: "100%",
    // top: "-6rem",
    borderRadius: 10,
  }));
  const { data: NotificationCount,refetch } = Query.useQuery(
    ["getAllUnreadNotificationCount"],
    async () => {
      const datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.notification.getAllUnreadNotificationCount,
        {}
      );

      return datas.data;
    },
    {
      onSuccess: (datas) => {
        console.log(datas?.data, "notif");
        setNotificationCount(datas?.data);
      },
      onError: (err) => {
        console.log(err, "error");
      },
    }
  );

  const { isLoading, data } = Query.useQuery(
    ["getAllNotificationList"],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.notification.getAllNotificationList,
        { pageNumber:2 }
      );
      return data.data;
    },
    {
      onSuccess: (data) => {
        console.log(data, "notify");
      },
      onError: (err) => {
        console.log(err, "error");
      },
    }
  );

  // const notificationCount=datas?.data;
  // console.log("notificationCount",notificationCount)

  const handleClose = () => {
    setOpen(false);
    refetch();

  };
const handleOpen=()=>{
  setOpen(true);


}
  return (
    <>
      <Mui.Stack direction={"row"} spacing={0.5}>
        <Mui.Box
          sx={{ cursor: "pointer" }}
          width={"40%"}
          component="img"
          src={NotificationImage.src}
          onClick={handleOpen}
        ></Mui.Box>
        <Mui.Box>
          <Badge
            badgeContent={notificationCount}
            color="primary"
            sx={{ mb: 1 }}
          ></Badge>
        </Mui.Box>
      </Mui.Stack>

      <HoverPopUp
      fullScreen={isMobile?true: false}
        open={open}
        sx={{ "& .MuiDialog-paper": { width: "100%", p: 1 } }}
        maxWidth="sm"
        onClose={handleClose}
      >
        <Mui.DialogTitle>
          <Mui.Toolbar
            sx={{
              borderBottom: "2px solid #EAEAEA",
              minHeight: "40px !important",
            }}
          >
            <Mui.Stack
              sx={{ width: "100%" }}
              direction={"row"}
              justifyContent={"space-between"}
              justifyItems={"center"}
            >
              <Mui.Typography
                sx={{ fontSize: "1rem", mt: 1, fontWeight: 600 }}
                color={"#9B7DD4"}
              >
                Notifications
              </Mui.Typography>
              <Mui.IconButton onClick={handleClose}>
                <MuiIcons.Close />
              </Mui.IconButton>
            </Mui.Stack>
          </Mui.Toolbar>
        </Mui.DialogTitle>
        <Mui.DialogContent>
          <Mui.Box sx={{ p: 1, height: 600, overflow: "auto" }}>
            {data?.data?.map((item: any, index: any) => (
              // eslint-disable-next-line react/jsx-key
              <Grid container spacing={2} >
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{ paddingTop: "2px", paddingLeft: "3px" }}
                >
                  <List>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end">
                          <StyledTypography color={"#BEBEBE"}>
                            <TimeAgo date={item?.createdAt as string} />
                          </StyledTypography>
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <img
                            src={item?.user_profile}
                            width={"55rem"}
                            height={"100%"}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        // primary={item?.user_name}
                        primary={
                          <span
                            style={{
                              fontSize: "20px",
                              fontWeight: "300",
                              fontFamily: "callunaSans- Black",
                            }}
                          >
                            {item?.user_name}
                            <span
                              style={{
                                fontSize: "15px",
                                padding: "10px",
                                fontFamily: "CallunaSans-Regular",
                              }}
                            >
                              {item?.notification_message}
                            </span>
                          </span>
                        }
                        // secondary={secondary ? 'Secondary text' : null}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            ))}
          </Mui.Box>
        </Mui.DialogContent>
      </HoverPopUp>
    </>
  );
};
