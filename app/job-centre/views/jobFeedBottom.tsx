import * as Mui from "@mui/material";
import { PostList } from "../main";
import { Post } from "./post";

export const JobFeedBottom = ({ jobList }: Props) => {
  return jobList.length > 0 ? (
    <Mui.Box
      sx={{ backgroundColor: "white", borderRadius: "20px", padding: "25px" }}
    >
      <Mui.Grid container>
        <Mui.Grid
          item
          xs={12}
          container
          sx={{
            marginTop: "10px",
            height: "auto",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            pb: 1,
          }}
        >
          {jobList.map((item, index) => (
            <Mui.Grid item md={6} xs={12} key={index}>
              <Post item={item} key={index.toString()} />
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  ) : (
    <></>
  );
};

interface Props {
  jobList: PostList[];
}
