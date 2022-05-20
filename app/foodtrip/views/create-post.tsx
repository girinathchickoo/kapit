import * as Mui from "@mui/material";
import FoodtripPostImage from 'assets/foodtrip_post@2x.png';
import BgImage from 'assets/foodtrip_createpost_bg.png';
import * as React from 'react';
import * as Views from "../views";
import * as MuiIcons from "@mui/icons-material";
import * as Hooks from "hooks"


const Container = Mui.styled(Mui.Paper)({
  width: "100%",
  height: "6rem",
  background: `url(${BgImage.src})`,
  backgroundRepeat: "no-repeat",
  boxShadow: "none",
  backgroundSize: "cover"
});

export const CreatePost = ({ refetchData }: any) => {

  const [openModel, setOpenModel] = React.useState(false);
  const ismobile = Hooks.useMobileView()

  const handleModel = () => {
    setOpenModel(!openModel);
  }

  const refetch = () => {
    refetchData()
  }

  return (
    <Mui.Box>
      <Container>
        <Mui.Grid container sx={{ height: "100%", display: "flex", alignContent: "center" }}>
          <Mui.Grid item md={2} xs={0}></Mui.Grid>
          <Mui.Grid item md={2} xs={3} sx={{ display: "flex", alignItems: "center" }}>
            <Mui.Box src={FoodtripPostImage.src} component='img' width={'80%'} height={'auto'} />
          </Mui.Grid>
          <Mui.Grid item md={3} xs={4}>
            <Mui.Typography sx={{ fontSize: '12px' }}>Share the new food you’ve tasted <br /> & the places you’ve been to !</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item md={3} xs={5} sx={{ pl: 2, display: "flex", alignItems: "center" }}>
            <Mui.Button onClick={handleModel} sx={{ width: "fit-content", fontSize: '25rem' }} variant='contained' > <MuiIcons.Add sx={{ marginRight: "0.3rem" }} />{ismobile ? "Post" : "Create Post"}</Mui.Button>
          </Mui.Grid>
          <Mui.Grid item md={2} xs={0}></Mui.Grid>
        </Mui.Grid>
      </Container>
      <Views.PostDialog refetchList={refetch} open={openModel} onclose={handleModel} />
    </Mui.Box>
  );
};
