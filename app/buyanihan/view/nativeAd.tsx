import * as Mui from "@mui/material";
import * as React from "react"

export const NativeAd = ({ key }: Props) => {

    return <Mui.Grid item md={6} xs={12} lg={4}>
        <Mui.Box key={key} sx={{ width: "100%", height: "100%", border: "1px solid #E6E6E6", mb: "1%", borderRadius: "5px !important", backgroundColor: "#E6E6E6", display: "flex", alignItems: 'center', justifyContent: "center" }} >
            In-feed Native ad
        </Mui.Box >
    </Mui.Grid>
}

interface Props {
    key: string
}