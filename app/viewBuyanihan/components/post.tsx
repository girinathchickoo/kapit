import * as Mui from "@mui/material";
import * as ReactQuery from "react-query";
import * as NextRouter from "next/router";
import * as React from "react";
import * as Server from "api";
import {
  PostDetails,
  Avatar,
  StyledTypography,
  Name,
  ArrowButton,
  PostData,
} from "../main";
import TimeAgo from "react-timeago";
import { EditPost } from "./edit-post";

export const PostSection = () => {
  const [ImgCount, setImgCount] = React.useState(0);
  const [Post, setPost] = React.useState<PostData>();

  const router = NextRouter.useRouter();
  const getQuery = router.query;
  console.log(getQuery?.buyanihanid);

  const { isLoading } = ReactQuery.useQuery<PostData>(
    ["getOneBuyanihanPost", getQuery?.buyanihanid],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.buyanihan.getOneBuyanihan,
        {
          post_id: getQuery?.buyanihanid,
        }
      );
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        setPost(data);
        console.log("onSuccess", data);
      },
    }
  );

  const handleNext = () => {
    setImgCount(
      ImgCount - 1 <= (Post?.post_images?.length || 0) ? ImgCount + 1 : 0
    );
    console.log(ImgCount);
  };

  const handlePrevious = () => {
    setImgCount(
      ImgCount + 1 >= 0 ? ImgCount - 1 : (Post?.post_images?.length as number)
    );
    console.log(ImgCount);
  };

  return (
    <>
      <Mui.Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={
          {
            // height: "10%",
          }
        }
      >
        <Mui.Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(`/user/${Post?.uid}`)}
        >
          <Avatar src={Post?.profile_photo} />
          <Name>{Post?.full_name}</Name>
        </Mui.Stack>

        <StyledTypography sx={{ ml: 28 }} color={"#BEBEBE"}>
          <TimeAgo date={Post?.createdAt as string} />
        </StyledTypography>
        <EditPost post={Post as PostData} />
      </Mui.Stack>
      <Mui.Box sx={{ mt: "1%", height: "4%" }}>
        <StyledTypography sx={{ fontSize: "0.85rem" }}>
          {Post?.item_name}{" "}
          <span
            style={{ fontSize: "0.85rem", color: "#BEBEBE", marginLeft: 3 }}
          >
            {" "}
            - {Post?.enter_your_price} $
          </span>
        </StyledTypography>
      </Mui.Box>
      <Mui.Box
        sx={{
          height: "80%",
          position: "relative",
          width: "92%",
          p:1,
          // mt: "1%",
          // height: "100%",
          // position: "relative",
          // width: "100%",
        }}
      >
        <Mui.Card
          component={"img"}
          src={Post?.post_images[ImgCount]}
          sx={{ height: "100%", width: "100%",objectFit:"contain",borderRadius:2 }}
          elevation={0}
        ></Mui.Card>
        {ImgCount > 0 ? (
          <ArrowButton type="left" handleClick={handlePrevious} />
        ) : (
          <></>
        )}
        {ImgCount < ((Post?.post_images?.length as number) - 1 || 0) ? (
          <ArrowButton type="right" handleClick={handleNext} />
        ) : (
          <></>
        )}
      </Mui.Box>
    </>
  );
};
