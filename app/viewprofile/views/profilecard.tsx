import * as Mui from "@mui/material";
import { app } from "firebase-config";
import * as FirebaseAuth from "firebase/auth";
import EditIcon from "assets/Icon feather-edit@2x.png";
import DeactivateImage from "assets/deactivate@2x.png";
import LogoutIcon from "assets/logout@2x.png";
import * as Router from "next/router";
import * as NextRouters from "next/router";

import * as Query from "react-query";
import * as Server from "api";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as Avatars from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import CloseIcon from "@mui/icons-material/Close";
import ConnectedIcon from "../../../assets/connected.png";
import ConnectIcon from "../../../assets/connect.png";

const Avatar = Mui.styled(Mui.Avatar)({
  width: "7rem",
  height: "7rem",
  borderRadius: "10px",
  border: "2px solid #9B7DD4",
});

const DialogAvatar = Mui.styled(Mui.Avatar)({
  width: "1.7rem",
  height: "1.7rem",
  borderRadius: "5px",
  // border: "2px solid #9B7DD4"
});

const ListAvatar = Mui.styled(Mui.Avatar)({
  minWidth: "15%",
  flexShrink: 0,
  backgroundColor: "white !important",
});

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
});

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-semibold",
});

const Buttons = Mui.styled(Mui.Button)({
  backgroundColor: "white",
  width: "100%",
  height: "2.2rem",
  "&.MuiButtonBase-root:hover": {
    backgroundColor: "none !important",
  },
});

const DialogTypography = Mui.styled(Mui.Typography)({
  backgroundColor: "white",
  color: "#9B7DD4",
  fontWeight: "600",
  fontsize: "0.7rem !important",
});

const ConnectButton = Mui.styled(Mui.Button)({
  backgroundColor: "#9B7DD4",
  color: "white",
  alignItems: "center",
  width: "100%",
  height: "3.2rem",
  borderRadius: "22px",
});

const DialogConnectButton = Mui.styled(Mui.Button)({
  backgroundColor: "white",
  width: "100%",
  "&.MuiButtonBase-root:hover": {
    backgroundColor: "white !important",
  },
  height: "1rem",
});

interface IMyObject {
  ConnectionUser_uid: string;
  ConnectionUser_full_name: string;
  ConnectionUser_profile_photo: string;
}
export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  array: IMyObject[];
  open: boolean;
  onClose: (value?: string) => void;
}

export const ProfileCard = ({ profileDetails }: any) => {
  const { isLoading, data } = Query.useQuery(
    ["getUserConnectionList"],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.connections.getUserConnectionList,
        { pageNumber: 1 }
      );
      return data.data;
    },
    {
      onSuccess: (data) => {
        console.log(data, "hellofime");
      },
      onError: (err) => {
        console.log(err, "error");
      },
    }
  );

  // console.log("data usercards", data.data)

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    // if (newValue) {
    //   setValue(newValue);
    // }
  };
  const routers = Router.useRouter();

  const signOutUser = async () => {
    try {
      const auth = FirebaseAuth.getAuth(app);
      await FirebaseAuth.signOut(auth);
      localStorage.removeItem("Mktoken");
      localStorage.removeItem("uid");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Mui.Box>
        <Mui.Paper sx={{ p: 2 }} elevation={0}>
          <Mui.Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Avatar src={profileDetails?.profile_photo} variant="rounded" />
            <Mui.Box>
              <Typography>{profileDetails?.full_name}</Typography>
              <StyledTypography>
                {profileDetails?.province ? profileDetails?.province : ""}
                {profileDetails?.province ? "," : ""}
                {profileDetails?.home_country}
              </StyledTypography>
            </Mui.Box>
          </Mui.Stack>
          <Mui.Divider sx={{ mt: 2, mb: 2 }} />
          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
          >
            <Mui.Stack direction={"row"} alignItems={"center"} spacing={3}>
              <StyledTypography>{profileDetails?.total_posts}</StyledTypography>
              <StyledTypography>Posts</StyledTypography>
            </Mui.Stack>
            <Mui.Stack direction={"row"} alignItems={"center"} spacing={3}>
              <StyledTypography
                style={{ cursor: "pointer" }}
                onClick={handleClickListItem}
              >
                {data?.data?.length}
              </StyledTypography>
              <StyledTypography
                style={{ cursor: "pointer" }}
                onClick={handleClickListItem}
              >
                Connections
              </StyledTypography>
            </Mui.Stack>
          </Mui.Stack>
          <Mui.Divider sx={{ mt: 2, mb: 2 }} />
          <StyledTypography sx={{ fontSize: "0.8rem" }} align="center">
            {profileDetails?.favorite_quote}
          </StyledTypography>
        </Mui.Paper>

        <Mui.Box sx={{ mt: 2 }}>
          <Button
            onClick={() => routers.push("/my-profile/edit-profile")}
            fullWidth
            startIcon={
              <Mui.Box width={"45%"} component="img" src={EditIcon.src} />
            }
          >
            Edit Profile
          </Button>
        </Mui.Box>
        <Mui.Box sx={{ mt: 2 }}>
          <Button
            onClick={signOutUser}
            fullWidth
            startIcon={
              <Mui.Box width={"45%"} component="img" src={LogoutIcon.src} />
            }
          >
            Sign Out
          </Button>
        </Mui.Box>
        <Mui.Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            startIcon={
              <Mui.Box
                width={"45%"}
                component="img"
                src={DeactivateImage.src}
              />
            }
          >
            Deactivate Account
          </Button>
        </Mui.Box>
      </Mui.Box>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        array={data?.data}
        value={"diao"}
      />
    </>
  );
};

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, array, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [Disconnected, setDisconnected] = React.useState(false);
  const [newData, setNewData] = React.useState();
  const [connecteds, setConnecteds] = React.useState(array);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  console.log(array, "rfhbwdbjhw er");

  const client = Query.useQueryClient();

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const { mutate: PostDisconnect } = Query.useMutation(
    async (values) => {
      console.log(values, "values");
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.connections.userDisconnectRequest,
        { ConnectionUser_uid: values }
      );
      return data as any;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        client.invalidateQueries("getUserConnectionList");
        // setDisconnected(false)
        // setOldConnect(true)
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err, "error");
      },
    }
  );

  const handleDisConnection = (data: any, index: any) => {
    console.log(data, "data", index);
    // setNewData(index)
    // if(newConnect){
    var datafinal = array?.filter(function (item) {
      console.log(item, "item");
      return item.ConnectionUser_uid !== data;
    });
    console.log(datafinal, "shsdhwbqjhw");
    setConnecteds(datafinal);
    console.log(setConnecteds, "connecteds");
    PostDisconnect(data);

    // }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>
        <DialogTypography> Collections ({array?.length})</DialogTypography>
        {open ? (
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <CloseIcon style={{ width: "22px", height: "22px" }} />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          // style={{marginLeft:'0px !important'}}
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {array?.map((option: any, index) => (
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                style={{ paddingTop: "2px", paddingLeft: "15px" }}
              >
                <List>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "white !important",
                          },
                        }}
                      >
                        <DialogConnectButton
                          sx={{
                            "&.MuiButtonBase-root:hover": {
                              bgcolor: "none !important",
                            },
                          }}
                        >
                          {/* {Disconnected == false ? <> */}
                          {/* <div> */}
                          <Buttons
                            onClick={() => {
                              setDisconnected(true),
                                handleDisConnection(
                                  option.ConnectionUser_uid,
                                  index
                                );
                            }}
                            startIcon={
                              <Mui.Box
                                width={"55%"}
                                component="img"
                                src={ConnectedIcon.src}
                              />
                            }
                          >
                            {console.log(connecteds, "ehfhwvefhfw ")}
                            {connecteds?.includes(option) ? (
                              <span>Connect</span>
                            ) : (
                              <span>Connected</span>
                            )}
                          </Buttons>
                          {/* </div> */}
                        </DialogConnectButton>
                      </IconButton>
                    }
                  >
                    <ListAvatar>
                      <DialogAvatar>
                        <img
                          style={{ width: "100%" }}
                          src={option?.ConnectionUser_profile_photo}
                        ></img>
                      </DialogAvatar>
                    </ListAvatar>
                    <ListItemText
                      primary={
                        <span style={{ fontSize: "12px", fontWeight: "300" }}>
                          {option?.ConnectionUser_full_name}
                        </span>
                      }
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            // <div>
            //   {option?.ConnectionUser_full_name}
            // </div>
            // <FormControlLabel
            //   value={option?.ConnectionUser_full_name}
            //   key={option}
            //   control={<Radio />}
            //   label={option?.ConnectionUser_full_name}
            // />
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="div" role="group">
        <ListItem button divider disabled>
          <ListItemText primary="Interruptions" />
        </ListItem>
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Phone ringtone" secondary={value} />
        </ListItem>
        <ListItem button divider disabled>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          array={[]}
          value={value}
        />
      </List>
    </Box>
  );
}
