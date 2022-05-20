import * as Mui from "@mui/material"

export const ResumeMaker = () => {
    return <Mui.Box
        sx={{ height: "110px", backgroundColor: "white", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
        <Mui.Stack sx={{ display: "flex", textAlign: "center", m: 2, alignItems: "center" }}>
            <Mui.Typography sx={{ color: "#2B87A7", fontSize: "14px", fontWeight: 600 }}>Your online resume maker</Mui.Typography>
            <Mui.Typography sx={{ color: "#2B87A7", fontSize: "12px" }}>Right here ! Right now !</Mui.Typography>
            <Mui.Button sx={{ backgroundColor: "#2B87A7", color: "white", mt: 2, width: "100px" }} size={"small"}>Lets’s Start</Mui.Button>
        </Mui.Stack>
    </Mui.Box>
}