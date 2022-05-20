import * as Mui from "@mui/material"
import { JobFairs } from "../main"

export const JobFairPost = ({ data, key }: Props) => {

    return <Mui.Card sx={{ height: "23.5%", p: "2%", m: "3%" }} elevation={0}>
        <Mui.CardMedia
            component="img"
            height="60%"
            src={data?.thumbNail_url}
            sx={{ objectFit: "scale-down" }}
        />
        <Mui.CardContent sx={{ height: "40%", p: `0 !important` }}>
            <Mui.Stack sx={{ height: "100%" }}>
                <Mui.Typography sx={{ height: "25%", fontSize: "12px", color: "#707070" }} noWrap>
                    {new Date(data?.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </Mui.Typography>
                <Mui.Typography sx={{ maxHeight: "50%", fontSize: "12px", fontWeight: 600 }}>
                    {data?.title?.toLocaleString().slice(0, 50)}
                    {data?.title?.toLocaleString().length > 50 && "..."}
                </Mui.Typography>
                <Mui.Typography sx={{ MaxHeight: "25%", fontSize: "12px", color: "#707070", width: { xs: "200px", md: "100%" } }} noWrap>
                    {data?.description}
                </Mui.Typography>
            </Mui.Stack>
        </Mui.CardContent>
    </Mui.Card>
}

interface Props {
    data: JobFairs
    key: number
}