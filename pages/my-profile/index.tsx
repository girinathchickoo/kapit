import React from "react";
import * as Mui from "@mui/material";
import Head from "next/head";
import * as App from "app";

function Index() {
  return (
    <Mui.Box>
      <Head>
        <title>My Profile</title>
        <meta content="mykapitbahay user profile page" key="profile page" />
      </Head>
      <App.ViewProfile.Main/>
    </Mui.Box>
  );
}

export default Index;
