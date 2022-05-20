import React from "react";
import Head from "next/head";
import * as Apps from "app";

function index() {
  return (
    <div>
      <Head>
        <title>Whats up canada</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Apps.WhatsCanadaPage.Main />
    </div>
  );
}

export default index;
