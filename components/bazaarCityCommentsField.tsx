import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Api from "api";
import * as Router from "next/router";
import * as React from "react";

const TextField = Mui.styled("textarea")(({ theme }) => ({
  width: "80%",
  height: "auto",
  padding: "1rem",
  border: "none",
  outline: "none",
  fontFamily: "Haborosans-normal",
  "&::-webkit-scrollbar": { display: "none" },
}));

const Button = Mui.styled(Mui.Button)(({ theme }) => ({
  width: "20%",
  minWidth: "40px",
}));

export const BazaarCityCommentField = ({
  type,
  refetchPost,
  refetchComments,
}: Props) => {
  const [textValue, setTextValue] = React.useState("");
  const routers = Router.useRouter();
  const getQuery = routers.query;

  const LikePost = async () => {
    let commentPost = {
      type: "comment",
      post_type: type,
      uid: "4c19d0cd-aa55-4751-a43a-efc9ef6e63c8",
      comment_ref_id: getQuery?.bazaarcityid,
      comment_description: textValue,
      post_id: getQuery?.bazaarcityid,
    };
    await Api.Server.Client().post(
      Api.Server.ApiRoutes.commentsList.postComment,
      commentPost
    );
    refetchPost();
    refetchComments();
    setTextValue("");
  };

  return (
    <Mui.Stack
      sx={{ position: "relative" }}
      direction="row"
      spacing={1}
      alignItems="flex-end"
    >
      <TextField
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        rows={5}
        placeholder="Write  comment"
      />
      <Button onClick={LikePost} variant="contained">
        <MuiIcons.Send sx={{ fontSize: "1.2rem" }} />
      </Button>
    </Mui.Stack>
  );
};

interface Props {
  type?: string;
  refetchPost?: any;
  refetchComments?: any;
}
