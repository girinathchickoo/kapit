import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import AddImg from "assets/post_event@2x.png";
import * as Views from "../views";
import * as kijiji from "kijiji-scraper";

const Container = Mui.styled(Mui.Paper)({
  width: "100%",
  height: "8rem",
  boxShadow: "none"

});

export const PostProduct = ({ refetch }: any) => {
  // console.log("refetchData",refetch)
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  // console.log(Object.keys(kijiji.categories.BUY_AND_SELL).slice(1))
  return (
    <Mui.Box
      sx={{ height: "100px", backgroundColor: "white", borderRadius: "20px" }}
    >
      <Mui.Grid container sx={{ height: "100%" }} >
        <Mui.Grid
          item
          xs={3}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Mui.CardMedia
            component="img"
            sx={{ height: "50%", width: "50%", objectFit: "contain" }}
            src={AddImg.src}
          ></Mui.CardMedia>
        </Mui.Grid>
        <Mui.Grid item xs={4} sx={{ height: "100%", padding: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Mui.Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
            Post your Product
          </Mui.Typography>
          <Mui.Typography sx={{ fontSize: "0.8rem" }}>
            Loreum ipsum dolor
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={5}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",

          }}
        >
          <Mui.Button
            variant="contained"
            onClick={() => {
              onOpen();
            }}
          >
            <MuiIcons.Add />
            Item
          </Mui.Button>
          <Views.PostDialog open={open} onclose={onClose} refetchList={refetch} />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>

  );
};
