import * as Mui from "@mui/material"
import * as React from "react"
import * as MuiIcons from "@mui/icons-material"
import AddImg from "assets/post_event@2x.png";
import { AddItemDialog } from "./dialogLayout";

export const PostItem = ({refetch}:{refetch:any}) => {

    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    return (<Mui.Box
        sx={{ height: "100px", backgroundColor: "white", borderRadius: "20px" }}
    >
        <Mui.Grid container sx={{ height: "100%" }}>
            <Mui.Grid
                item
                md={3}
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
                    src={AddImg.src}
                ></Mui.CardMedia>
            </Mui.Grid>
            <Mui.Grid item md={4} xs={5} sx={{ height: "100%", padding: "15px", display: "flex", alignItems: "flex-start", justifyContent: "center", flexDirection: "column" }}>
                <Mui.Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    Add an item
                </Mui.Typography>
                <Mui.Typography sx={{ fontSize: "0.8rem" }}>
                    Can donate/sell your used things in here
                </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
                item
                md={5}
                xs={4}
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Mui.Button
                    variant="contained"
                    onClick={() => {
                        handleClick()
                    }}
                >
                    <MuiIcons.Add fontSize="small" />
                    Item
                </Mui.Button>
            </Mui.Grid>
        </Mui.Grid>
        <AddItemDialog open={open} setOpen={setOpen} refetch={refetch} />
    </Mui.Box>)
}