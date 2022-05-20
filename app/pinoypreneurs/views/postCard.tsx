import * as Mui from "@mui/material";
import LeftImage from "assets/pinoypreneurs_illustration@2x.png";
import RightImage from "assets/pinoy_illustration@2x.png";
import * as React from 'react';
import * as Views from 'app/pinoypreneurs/views';

const ImageContainer = Mui.styled(Mui.Box)({
  width: "35%",
  height: "100%",
  margin: 'auto',
  backgroundColor: '#EBFBFF',
  borderBottomLeftRadius: '15rem',
  borderBottomRightRadius: "15rem"
});

const JoinUsButton = Mui.styled(Mui.Button)({
  backgroundColor: '#208BA5',
  color: 'white',
  width: '50%',
  margin: 'auto',
  '&:hover': {
    backgroundColor: '#208BA5'
  }
});

export const PostCard = () => {
  const [openModel, setOpenModel] = React.useState(false)
  return (
    <Mui.Box>
      <Mui.Paper elevation={0} sx={{ height: '11rem', width: '100%' }}>
        <Mui.Stack sx={{ height: '100%' }} direction={"row"} justifyContent='space-between' alignItems={"center"}>
          <ImageContainer>
            <Mui.Box sx={{ margin: '10px 30%', objectFit: "contain" }} src={LeftImage.src} component={"img"} width="45%" height={"80%"} />
          </ImageContainer>
          <Mui.Box sx={{ height: '100%', width: '30%' }}>
            <Mui.Stack alignItems={'center'} justifyContent='center' spacing={1} sx={{ height: '100%' }}>
              <Mui.Typography sx={{ fontSize: '1rem' }} align="center" color={'#208BA5'}>Hey Filipino Business Owners,</Mui.Typography>
              <Mui.Typography sx={{ fontSize: '0.8rem' }} align="center" color={'#208BA5'}>We’d love to feature your business!</Mui.Typography>
              <JoinUsButton onClick={() => setOpenModel(!openModel)} >Join Us</JoinUsButton>
            </Mui.Stack>
          </Mui.Box>
          <ImageContainer sx={{ backgroundColor: '#208BA5', borderRadius: '15rem 15rem 0px 0px' }}>
            <Mui.Box sx={{ margin: '30px 29%', objectFit: "contain" }} src={RightImage.src} component={"img"} width="40%" height={"80%"} />
          </ImageContainer>
        </Mui.Stack>
        <Views.PostDialog open={openModel} onClose={() => setOpenModel(false)} />
      </Mui.Paper>
    </Mui.Box>
  );
};
