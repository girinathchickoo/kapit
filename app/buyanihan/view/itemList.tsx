import * as React from "react";
import * as Mui from "@mui/material";
import FilterImg from "assets/filter@2x.png";
import { PostList } from "../main";
import { Post } from "./post";
import { NativeAd } from "./nativeAd";
import { Filter } from "./filter";

const addInterval = [2, 3, 4];

export const ItemList = ({ postList, isTop, setOpen }: Props) => {
  return (
    <Mui.Box
      sx={{ backgroundColor: "white", borderRadius: "20px", padding: "25px" }}
    >
      <Mui.Grid container>
        {isTop ? (
          <>
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
                Item Listings
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
              <Mui.IconButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Mui.CardMedia
                  component="img"
                  sx={{ height: "30px", width: "30px" }}
                  src={FilterImg.src}
                ></Mui.CardMedia>
                <Mui.Typography sx={{ fontSize: "0.9rem", pl: 2 }} color="primary">
                  filter
                </Mui.Typography>
              </Mui.IconButton>

            </Mui.Grid>
          </>
        ) : (
          <></>
        )}
        {(postList?.length || 0) > 0 ? (
          <Mui.Grid
            item
            container
            xs={12}
            sx={{ marginTop: "10px", height: "auto", width: "100%", pb: 1 }}
            spacing={2}
          >
            {postList?.map((item, index) => {
              return addInterval.includes(index % 6) ? (
                <React.Fragment key={index}>
                  <NativeAd key={`ad${index}`} />
                  <Post item={item} key={index.toString()} />
                </React.Fragment>
              ) : (
                <Post item={item} key={index.toString()} />
              );
            })}
          </Mui.Grid>
        ) : (
          <Mui.Typography sx={{ mt: 3 }}>No Record Found</Mui.Typography>
        )}
      </Mui.Grid>
    </Mui.Box>
  );
};

interface Props {
  postList?: PostList[];
  isTop: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
