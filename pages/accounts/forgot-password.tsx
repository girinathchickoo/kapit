import * as React from "react";
import * as Mui from "@mui/material";
import * as MuiLabs from "@mui/lab";
import * as Components from "components";
import * as NextRouters from "next/router";
import Head from "next/head";
import { app } from "firebase-config";
import * as FirebaseAuth from "firebase/auth";
import * as Notistack from "notistack";

const TextField = Mui.styled(Mui.TextField)({
  width: "100%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    border: "none",
  },
});

function Forgotpassword() {
  const routers = NextRouters.useRouter();
  const [email, setEmail] = React.useState("");
  const { enqueueSnackbar } = Notistack.useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);

  const sendLinkToEmail = async () => {
    setIsLoading(true);
    try {
      const auth = FirebaseAuth.getAuth(app);
      await FirebaseAuth.sendPasswordResetEmail(auth, email);
      enqueueSnackbar(
        "The Password Reset Verification link has been sent successfully",
        {
          preventDuplicate: false,
          persist: false,
          variant: "success",
        }
      );
      setIsLoading(false);
      routers.push("/accounts/login");
    } catch (err) {
      enqueueSnackbar("email does not exist", {
        preventDuplicate: false,
        persist: false,
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <Mui.Box>
      <Head>
        <title>Forgot password</title>
        <meta content="Forgot Password" key="title" />
      </Head>
      <Components.DialogwithHeader dialogWidth="xs" title={<DialogTitle />}>
        <Mui.Stack spacing={2} sx={{ p: 2 }}>
          {/* <Mui.Typography sx={{ fontFamily: "Haborosans-normal", fontSize:'0.8rem' }}>
            Please enter your E-mail address to receive OTP
          </Mui.Typography> */}
          <Mui.Typography
            sx={{ fontFamily: "CallunaSans-Regular", fontSize: "0.8rem" }}
          >
            Please enter your E-mail address to receive a forgot password link
          </Mui.Typography>
          <Mui.Typography
            sx={{ fontSize: "0.8rem", fontFamily: "CallunaSans-Regular" }}
          >
            E-mail ID
          </Mui.Typography>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{ sx: { fontFamily: "CallunaSans-Regular" } }}
          />
          <Mui.Box>
            <MuiLabs.LoadingButton
              variant="contained"
              onClick={sendLinkToEmail}
              loading={isLoading}
              sx={{
                mt: 10,
                width: "100%",
                fontSize: "12px!important",
                height: "40px",
                fontFamily: "CallunaTitle-Semibold",
              }}
            >
              Submit
            </MuiLabs.LoadingButton>
          </Mui.Box>
        </Mui.Stack>
      </Components.DialogwithHeader>
    </Mui.Box>
  );
}

const DialogTitle = () => {
  return (
    <Mui.Typography
      sx={{ fontSize: "0.75rem", fontFamily: "CallunaSans-Bold" }}
      color={"primary.main"}
    >
      <strong>Forgot Password</strong>
    </Mui.Typography>
  );
};

export default Forgotpassword;
