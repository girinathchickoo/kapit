import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Api from "api";
import * as Router from "next/router";
import * as React from 'react';

const TextField = Mui.styled("textarea")(({ theme }) => ({
  width: "100%",
  height: "auto",
  padding: "1rem",
  border: "none",
  outline: "none",
  fontFamily: "Haborosans-normal",
}));

const Button = Mui.styled(Mui.Button)(({ theme }) => ({
  minWidth: "20px",
  height: "25px"
}));

export const CommentField = ({ type, refetchPost1,refetchPost2 }: Props) => {
  const [textValue, setTextValue] = React.useState("");
  const routers = Router.useRouter();
  const getQuery = routers.query;

  const LikePost = async () => {
    let commentPost = {
      type: "comment",
      post_type: type,
      uid: "4c19d0cd-aa55-4751-a43a-efc9ef6e63c8",
      comment_ref_id: getQuery?.foodtripid,
      comment_description: textValue,
      post_id: getQuery?.foodtripid
    };
    await Api.Server.Client().post(Api.Server.ApiRoutes.commentsList.postComment, commentPost);
    refetchPost1();
    refetchPost2();
    setTextValue('')
  };

  return (
    <Mui.Grid container sx={{ position: "relative", width: "100%" }}>
      <Mui.Grid item xs={10}>
        <TextField value={textValue} onChange={(e) => setTextValue(e.target.value)} rows={5} placeholder="Write your comment" />
      </Mui.Grid>
      <Mui.Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Button onClick={LikePost} variant="contained">
          <MuiIcons.Send sx={{ fontSize: "1.2rem" }} />
        </Button>
      </Mui.Grid>
    </Mui.Grid>
  );
};

interface Props {
  type?: string;
  refetchPost2?: any;
  refetchPost1?:any;
}
