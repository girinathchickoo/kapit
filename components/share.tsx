import * as Mui from "@mui/material";
import * as Router from "next/router";
import * as SocialButtons from "react-share";
import * as SocialIcons from "react-share";
import * as React from "react";

const TextField = Mui.styled(Mui.TextField)({
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    border: "none",
    fontSize: "0.8rem",
  },
});

export const Share = ({ isopen, onclose }: Props) => {
  const routers = Router.useRouter();
  const [Url, setURl] = React.useState("");

  React.useLayoutEffect(() => {
    if (window !== undefined) {
      setURl(document.location.href);
    }
  }, []);

  const copyLink = () => {
    var text = document.getElementById("inputText") as any;
    text.select();
    document.execCommand("copy") as any;
  };

  return (
    <Mui.Dialog
      onClose={onclose}
      open={isopen}
      sx={{ "& .MuiDialog-paper": { width: "100%" } }}
      maxWidth="sm"
    >
      <Mui.DialogContent sx={{}}>
        <Mui.Grid container spacing={2} alignItems="center">
          <Mui.Grid item xs={12} sm={10}>
            <TextField id="inputText" value={Url} fullWidth />
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={2}>
            <Mui.Button
              onClick={copyLink}
              id="copyText"
              variant="contained"
              fullWidth
            >
              Copy
            </Mui.Button>
          </Mui.Grid>
          <Mui.Grid item xs={12} mt={1}>
            <Mui.Stack
              direction={"row"}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <SocialButtons.FacebookShareButton
                className="Demo__some-network__share-button"
                url={Url}
              >
                <SocialIcons.FacebookIcon size={50} round />
              </SocialButtons.FacebookShareButton>
              <SocialButtons.WhatsappShareButton
                className="Demo__some-network__share-button"
                url={Url}
              >
                <SocialIcons.WhatsappIcon size={50} round />
              </SocialButtons.WhatsappShareButton>
              <SocialButtons.LinkedinShareButton
                className="Demo__some-network__share-button"
                url={Url}
              >
                <SocialIcons.LinkedinIcon size={50} round />
              </SocialButtons.LinkedinShareButton>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.DialogContent>
    </Mui.Dialog>
  );
};

interface Props {
  isopen: boolean;
  onclose: () => void;
}
