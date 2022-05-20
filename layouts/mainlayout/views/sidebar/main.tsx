import * as Views from "layouts/mainlayout/views";
import * as Mui from "@mui/material";
import AppbarLogo from "assets/Landscape.png";
import React from "react";




export const Main = ({ ...props }: Props) => {

  return (

    <Mui.Box sx={{ height: '100%' }}>
      <Mui.Toolbar sx={{ minHeight: '50px !important' }}><Mui.Box component='img' src={AppbarLogo.src} width={'100%'} height={'100%'} /></Mui.Toolbar>
      <Views.Sidebar.Sidebar />
      <Views.Sidebar.SidebarList {...props} />
    </Mui.Box>


  );
};

interface Props {
  handleClose?: () => void
}