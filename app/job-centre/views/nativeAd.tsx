import * as Mui from "@mui/material";
import * as React from "react"

export const NativeAd = ({ key }: Props) => {

    return <Mui.Box key={key} sx={{ height: "23.5%", p: "2%", m: "3%", width: "94%", border: "1px solid #E6E6E6", borderRadius: "5px !important", backgroundColor: "#E6E6E6", display: "flex", alignItems: 'center', justifyContent: "center" }} >
        In-feed Native ad
    </Mui.Box >
}

interface Props {
    key: string
}