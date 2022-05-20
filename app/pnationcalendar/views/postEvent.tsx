import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import AddImg from "assets/post_event@2x.png";
import { AddEventDialog } from "./addEvent";
import * as Hooks from "hooks";

export const PostEvent = ({ isFetch }: any) => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const isMobile = Hooks.useMobileView();

  return (
    <Mui.Grid
      item
      container
      xs={12}
      sx={{
        height: "fit-content",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <Mui.Grid
        item
        container
        sx={{ height: "100%", display: "flex" }}
        md={8}
        xs={12}
      >
        <Mui.Grid
          item
          md={3.5}
          xs={2}
          sx={{
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Mui.CardMedia
            component="img"
            sx={{
              height: { md: "50%", xs: "80%" },
              width: { md: "50%", xs: "80%" },
              objectFit: "contain",
            }}
            src={AddImg.src}
          ></Mui.CardMedia>
        </Mui.Grid>
        <Mui.Grid item md={5.5} xs={6} sx={{ height: "100%", padding: "15px" }}>
          <Mui.Typography
            sx={{
              fontFamily: "CallunaSans-Regular",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Post Event
          </Mui.Typography>
          <Mui.Typography
            sx={{ fontFamily: "CallunaSans-Regular", fontSize: "0.8rem" }}
          >
            Claim the date by posting your own event here. Let’s get organized!
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          md={3}
          xs={4}
          sx={{
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Mui.Button
            variant="contained"
            onClick={() => {
              onOpen();
            }}
            sx={{ fontSize: "14px", mr: 2 }}
          >
            <MuiIcons.Add />
            {isMobile ? "Add" : "Add Event"}
          </Mui.Button>
        </Mui.Grid>
      </Mui.Grid>
      <AddEventDialog refetch={isFetch} open={open} onClose={onClose} />
    </Mui.Grid>
  );
};
