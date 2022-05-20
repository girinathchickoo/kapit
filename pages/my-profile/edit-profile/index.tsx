import React from "react";
import * as Mui from "@mui/material";
import * as App from "app";
import Head from "next/head";

function Index() {
  return (
    <Mui.Box>
      <Head>
        <title>Edit Profile</title>
        <meta content="Edit profile" key="edit-profile" />
      </Head>
      <App.EditProfile.Main/>
    </Mui.Box>
  );
}

export default Index;
