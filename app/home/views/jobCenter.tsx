import React from "react";
import * as Mui from "@mui/material";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as NextRouters from "next/router";
import moment from "moment";
import * as Layouts from "layouts";

const ViewMoreButton = Mui.styled(Mui.Button)({
  color: "#707070",
});

export const JobCenter = () => {
  const routers = NextRouters.useRouter();

  const { isLoading: loading, data } = ReactQuery.useQuery<JobFairs[]>(
    ["Homejobfairlist"],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.listJobfair,
        {}
      );
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        title="Job Centre"
        actions={
          <ViewMoreButton onClick={() => routers.push(`/`)}>
            View More
          </ViewMoreButton>
        }
        extraText={null}
      >
        <Mui.Stack spacing={2}>
          {data?.slice(0, 3).map((data, i) => (
            <Mui.Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              onClick={() => routers.push(`job-centre`)}
            >
              <Mui.Box
                sx={{
                  width: { xs: "100%", sm: "25%" },
                  height: "150px",
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <Mui.CardMedia
                  component="img"
                  src={data?.thumbNail_url}
                  sx={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Mui.Box>
              <Mui.Stack
                spacing={1}
                justifyContent="flex-end"
                sx={{ width: { xs: "100%", sm: "75%" }, py: 1 }}
              >
                <Mui.Typography sx={{ color: "#707070", fontSize: "0.8rem" }}>
                  {new Date(data?.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Mui.Typography>
                <Mui.Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    fontFamily: "CallunaTitle-Semibold",
                  }}
                >
                  {data?.title?.slice(0, 50)}
                  {data?.title?.length > 50 && "..."}
                </Mui.Typography>
                <Mui.Typography
                  variant="body1"
                  sx={{
                    fontFamily: "CallunaSans-Regular",
                  }}
                >
                  {data?.description?.slice(0, 150)}
                  {data?.description?.length > 150 && "..."}
                </Mui.Typography>
              </Mui.Stack>
            </Mui.Stack>
          ))}
        </Mui.Stack>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};

export interface JobFairs {
  createdAt: string;
  description: string;
  thumbNail_url: string;
  title: string;
}
