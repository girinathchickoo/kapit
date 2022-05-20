import React from "react";
import Head from "next/head";
import * as App from "app";

function Buyanihan() {
    return (
        <div>
            <Head>
                <title>Buyanihan</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <App.Buyanihan.Main />
        </div>
    );
}

export default Buyanihan;
