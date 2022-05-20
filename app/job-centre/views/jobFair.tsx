import * as Mui from "@mui/material";
import React from "react";
import { JobFairs } from "../main";
import { JobFairPost } from "./jobFairPost";
import { NativeAd } from "./nativeAd";

export const JobFair = ({ data }: Props) => {
  return (
    <Mui.Box
      sx={{
        minHeight: "800px",
        height: "99%",
        width: "90%",
        m: "4%",
        p: "1%",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <Mui.Box sx={{ height: "5%", width: "100%", pt: "20px" }}>
        <Mui.Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
          Job Fair Announcements
        </Mui.Typography>
      </Mui.Box>
      <Mui.Box sx={{ height: "95%", p: "5px" }}>
        {data?.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <JobFairPost data={item} key={i} />
              <NativeAd key={`ad${i}`} />
            </React.Fragment>
          );
        })}
      </Mui.Box>
    </Mui.Box>
  );
};

interface Props {
  data: JobFairs[];
}
