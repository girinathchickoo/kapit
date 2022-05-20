import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { JobFeedBottom, JobFeedTop, PostJob } from "./views";
import { Atfbanner } from "components";
import { ResumeMaker } from "./views/resumeMaker";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as React from "react";
import * as Layouts from "layouts";
import { JobFair } from "./views/jobFair";

export const Main = () => {
  const [postList, setPostList] = React.useState<PostList[]>([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [typesOfIndustry, setTypesOfIndustry] = React.useState<string[]>([]);
  const [locations, setLocations] = React.useState<string[]>([]);
  const [jobType, setJobType] = React.useState<string[]>([]);
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);

  const { isLoading } = ReactQuery.useQuery<PostList[]>(
    ["jobPostList", typesOfIndustry, locations, jobType, value],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.listJobPost,
        {
          search: value,
          pageNumber,
          typesOfIndustry,
          locations,
          jobType,
        }
      );
      setPageNumber(+data.data.totalPages || 1);
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        setPostList(data);
        // setPostList(data.reverse());
        console.log(data);
      },
    }
  );

  const { isLoading: loading, data } = ReactQuery.useQuery<JobFairs[]>(
    ["jobfairlist"],
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
    <Mui.Box sx={{ height: "auto" }}>
      <Mui.Grid container>
        <Mui.Grid item xs={12}>
          <PostJob />
        </Mui.Grid>
        <Mui.Grid item md={8} xs={12} sx={{ mt: 2 }}>
          <JobFeedTop
            jobList={postList.slice(0, 6)}
            typesOfIndustry={typesOfIndustry}
            setTypesOfIndustry={setTypesOfIndustry}
            locations={locations}
            setLocations={setLocations}
            jobType={jobType}
            setJobType={setJobType}
          />
        </Mui.Grid>
        <Mui.Grid item md={4} sx={{ mt: 2 }}>
          <JobFair data={data?.slice(0, 2) as JobFairs[]} />
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={{ mt: 2 }}>
          <Atfbanner />
        </Mui.Grid>
        <Mui.Grid item md={8} xs={12} sx={{ mt: 2 }}>
          <JobFeedBottom jobList={postList.slice(6)} />
        </Mui.Grid>
        <Mui.Grid item md={4} sx={{ mt: 2, overflow: "hidden" }}>
          <JobFair data={data?.slice(2, 4) as JobFairs[]} />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};

export interface PostList {
  _id: string;
  uid: string;
  company_name: string;
  late_date_to_apply: string;
  industry: string;
  job_constraint: string;
  job_description: string;
  job_position: string;
  number_of_position_available: number;
  province_name: string;
  working_type: string;
  how_to_apply: string;
  skills_required: string;
  job_id: string;
  posted_by: string;
  website: string;
  No_of_hours_work_weekly: string;
  salary_hour_Rate: string;
}

export interface JobFairs {
  createdAt: string;
  description: string;
  thumbNail_url: string;
  title: string;
}
