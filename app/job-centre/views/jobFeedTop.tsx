import * as Mui from "@mui/material";
import FilterImg from "assets/filter@2x.png";
import { PostList } from "..";
import { Post } from "./post";
import * as React from "react";
import { Filter } from "./filter";

export const JobFeedTop = ({ jobList, ...props }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Mui.Box
      sx={{ backgroundColor: "white", borderRadius: "20px", padding: "25px" }}
    >
      <Mui.Grid container>
        <Mui.Grid
          item
          xs={6}
          sx={{
            borderBottom: "1px solid #E6E6E6",
            height: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Mui.Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
            Job Listings
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottom: "1px solid #E6E6E6",
            height: "40px",
          }}
        >
          <Mui.IconButton onClick={handleOpen}>
            <Mui.CardMedia
              component="img"
              sx={{ height: "30px", width: "30px" }}
              src={FilterImg.src}
            ></Mui.CardMedia>
            <Mui.Typography sx={{ pl: 2, fontSize: "0.9rem" }} color="primary">
              filter
            </Mui.Typography>
          </Mui.IconButton>
        </Mui.Grid>
        {jobList.length > 0 ? (
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
        ) : (
          <Mui.Typography sx={{ mt: 3 }}>No Record Found</Mui.Typography>
        )}
      </Mui.Grid>
      <Filter open={open} setOpen={setOpen} {...props} />
    </Mui.Box>
  );
};

interface Props {
  jobList: PostList[];
  typesOfIndustry: string[];
  setTypesOfIndustry: React.Dispatch<React.SetStateAction<string[]>>;
  locations: string[];
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
  jobType: string[];
  setJobType: React.Dispatch<React.SetStateAction<string[]>>;
}
