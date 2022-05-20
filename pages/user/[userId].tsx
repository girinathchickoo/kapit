import React from "react";
import Head from "next/head";
import * as App from "app";

function UserDetails() {
  return (
    <div>
      <Head>
        <title>User Details</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App.UserProfile.Main />
    </div>
  );
}

export default UserDetails;
