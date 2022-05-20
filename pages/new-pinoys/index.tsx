import React from "react";
import Head from "next/head";
import * as App from "app";

function NewPinoyBlock() {

  return (
    <div>
      <Head>
        <title>New pinoy on the blocks</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App.NewpinoyontheBlocks.Main />
    </div>
  );
}

export default NewPinoyBlock;