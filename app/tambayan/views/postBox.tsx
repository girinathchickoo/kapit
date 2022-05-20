import * as Mui from "@mui/material";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as React from "react";

const TextField = Mui.styled("input")({
  padding: "1rem",
  paddingBottom: "0.1rem",
  outline: "none",
  width: "100%",
  paddingLeft: "6rem",
  fontSize: "0.75rem",
  border: "none",
});

const TextArea = Mui.styled("textarea")({
  padding: "1rem",
  paddingTop: "0.1rem",
  marginTop: "1rem",
  outline: "none",
  width: "100%",
  paddingLeft: "6rem",
  fontFamily: "Haborosans-normal",
  border: "none",
  resize: "none",
  "&::-webkit-scrollbar": { display: "none" },
});

const StyledText = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
  color: "#B5B3B7",
  width: "6rem",
  height: "2rem",
  position: "absolute",
  // zIndex: 100,
  top: "1rem",
  left: "1rem",
});

const ButtonContainer = Mui.styled(Mui.Box)({
  position: "absolute",
  bottom: "1rem",
  right: "1rem",
});

export const PostBox = ({ refetchData }: any) => {
  const [subject, setSubject] = React.useState("");
  const [discription, setDescription] = React.useState("");

  const mutations = ReactQuery.useMutation(
    "TambayanPost",
    async (getdata: any) => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.tambayans.postTambayan,
        getdata
      );
      return datas?.data?.data;
    },
    {
      onSuccess: (data) => {
        refetchData();
        setSubject("");
        setDescription("");
      },
    }
  );

  const submitPost = async () => {
    mutations.mutate({ subject: subject, description: discription });
  };

  return (
    <Mui.Box>
      <Mui.Grid
        container
        sx={{
          p: 1,
          border: "1px solid #9B7DD4",
          borderRadius: "20px",
          position: "relative",
        }}
      >
        <Mui.Grid item xs={9}>
          <Mui.Box sx={{ position: "relative" }}>
            <TextField
              value={subject}
              onChange={(e) => {
                if (e.target.value.slice().length < 250) {
                  setSubject(e.target.value)
                }
              }}
            />
            <StyledText>Your Subject:</StyledText>
          </Mui.Box>
          <Mui.Box sx={{ position: "relative" }}>
            <TextArea
              value={discription}
              onChange={(e) => {
                if (e.target.value.slice().length < 250) {
                  setDescription(e.target.value)
                }
              }}
              rows={3}
            />
            <StyledText>Description:</StyledText>
          </Mui.Box>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={3}
          sx={{ display: "flex", alignItems: "flex-end", px: 1 }}
        >
          <Mui.Button
            onClick={submitPost}
            sx={{ width: "90%" }}
            variant="contained"
          >
            Post
          </Mui.Button>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
