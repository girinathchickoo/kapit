import React from "react";
import Head from "next/head";
import * as App from "app";

function index() {
  return (
    <div>
      <Head>
        <title>View P-Nation calendar</title>
        <meta name="View P-Nation calendar" content="View P-Nation calendar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App.ViewPnation.Main />
    </div>
  );
}

export default index;
