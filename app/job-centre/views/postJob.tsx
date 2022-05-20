import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import PostImg from "assets/post_a_job@2x.png";
import { AddJobDialog } from "./addJob";

export const PostJob = () => {

    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    return <Mui.Box
        sx={{ height: "100px", backgroundColor: "white", borderRadius: "20px" }}
    >
        <Mui.Grid container sx={{ height: "100%" }}>
            <Mui.Grid
                item
                xs={3}
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Mui.CardMedia
                    component="img"
                    sx={{ height: "50%", width: "50%", objectFit: "contain" }}
                    src={PostImg.src}
                ></Mui.CardMedia>
            </Mui.Grid>
            <Mui.Grid item xs={4} sx={{ height: "100%", padding: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Mui.Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    Post a job
                </Mui.Typography>
                <Mui.Typography sx={{ fontSize: "0.8rem" }}>
                    Lorem ipsum dolor
                </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
                item
                xs={5}
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Mui.Button
                    variant="outlined"
                    onClick={() => {
                        handleOpen()
                    }}
                >
                    <MuiIcons.Add />
                    Add Job Details
                </Mui.Button>
            </Mui.Grid>
        </Mui.Grid>
        <AddJobDialog open={open} setOpen={setOpen} />
    </Mui.Box>
}