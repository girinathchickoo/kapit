import * as Mui from "@mui/material";
import RightImage from "assets/live_illustration.png";
import * as React from "react";
import backgroundImage from "assets/card_bg_.png";
import * as Views from "../views";

const ScheduleLiveButton = Mui.styled(Mui.Button)({
  backgroundColor: "white",
  color: "#9F3B70",
  fontFamily: "Helvetica",
  margin: "auto",
  "&:hover": {
    backgroundColor: "white",
  },
});

export const JoinLive = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  return (
    <Mui.Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={2}
      justifyContent="center"
    >
      <Mui.Paper
        sx={{
          borerRadius: "10px",
          p: 2,
          width: { xs: "100%", lg: "50%" },
          maxWidth: "lg",
          background: `url(${backgroundImage.src})`,
        }}
      >
        <Mui.Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <Mui.Avatar
            sx={{
              maxWidth: "80%",
              height: "50%",
              borderRadius: "10px",
              mt: 3,
              width: "5rem",
            }}
          />
          <Mui.Stack justifyContent="center" sx={{ padding: 2 }}>
            <Mui.Typography
              align="center"
              sx={{ fontSize: "1rem" }}
              color={"#9F3B70"}
            >
              LIVE Sale - Business Name{" "}
            </Mui.Typography>
            <Mui.Typography
              align="center"
              sx={{ fontSize: "0.8rem" }}
              color={"#9F3B70"}
            >
              Dscription content in here. Lorem ipsum dolor{" "}
            </Mui.Typography>
            <Mui.Stack component={Mui.CardActions}>
              <Mui.Button variant="contained" sx={{ bgcolor: "#9F3B70" }}>
                Join Live
              </Mui.Button>
            </Mui.Stack>
          </Mui.Stack>
        </Mui.Stack>
      </Mui.Paper>

      <Mui.Paper
        sx={{
          borerRadius: "10px",
          p: 2,
          width: { xs: "100%", lg: "50%" },
          maxWidth: "lg",
          bgcolor: "#9F3B70",
        }}
      >
        <Mui.Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <Mui.Box sx={{ maxHeight: "10rem", overflow: "hidden" }}>
            <Mui.CardMedia component={"img"} src={RightImage.src} />
          </Mui.Box>
          <Mui.Stack justifyContent="center" sx={{ padding: 2 }}>
            <Mui.Typography
              align="center"
              sx={{ fontSize: "1rem" }}
              color={"#FFFFFF"}
            >
              Do you want your sale to{" "}
            </Mui.Typography>
            <Mui.Typography
              align="center"
              sx={{ fontSize: "1rem" }}
              color={"#FFFFFF"}
            >
              be on LIVE?{" "}
            </Mui.Typography>
            <Mui.Stack component={Mui.CardActions}>
              <ScheduleLiveButton
                onClick={() => {
                  onOpen();
                }}
              >
                Scheduled Live
              </ScheduleLiveButton>
            </Mui.Stack>
            <Views.LiveSlots open={open} onclose={onClose} />
          </Mui.Stack>
        </Mui.Stack>
      </Mui.Paper>
    </Mui.Stack>
  );
};
