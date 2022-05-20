import * as React from "react";
import { app } from "firebase-config";
import * as FirebaseAuth from "firebase/auth";
import * as Mui from "@mui/material";
import * as Layouts from "layouts";
import Link from "next/link";
import * as Routers from "next/router";
import Head from "next/head";
import { Formik } from "formik";
import * as MuiLabs from "@mui/lab";
import * as Yup from "yup";
import * as Notistack from "notistack";
import * as MuiIcons from "@mui/icons-material";
import GoogleLogo from "assets/google_logo.png";
import * as Query from "react-query";
import * as Context from "context";
import * as Api from "api";
import EyeOpen from "assets/onboarding/visibility_on@2x.png";
import EyeClose from "assets/onboarding/visibility_off@2x.png";

const initialFormValues: initialFormValues = {
  email: "",
  password: "",
};

const validationSchemas = Yup.object().shape({
  email: Yup.string().trim().required("Enter your Email-Id").email(),
  password: Yup.string().trim().required("Enter your Password"),
});

function Login() {
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const { enqueueSnackbar } = Notistack.useSnackbar();
  const client = Query.useQueryClient();
  const { update } = React.useContext(Context.UserProfile.UserProfileContext);

  const router = Routers.useRouter();
  const login = async ({ email, password }: initialFormValues) => {
    setLoading(true);
    try {
      const auth = FirebaseAuth.getAuth(app);
      const { user } = await FirebaseAuth.signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      localStorage.setItem("uid", user?.uid);
      update();
      router.push("/");
      // setTimeout(() => {
      //   router.reload();
      // }, 1000);
      // router.push("/");
      // update();
    } catch (err: any) {
      setLoading(false);
      if (err.code === "auth/user-not-found") {
        enqueueSnackbar("Email id does not exist", {
          preventDuplicate: false,
          persist: false,
          variant: "error",
        });
      } else if (err.code === "auth/wrong-password") {
        enqueueSnackbar("Please check your password", {
          preventDuplicate: false,
          persist: false,
          variant: "error",
        });
      } else {
        enqueueSnackbar("something went wrong", {
          preventDuplicate: false,
          persist: false,
          variant: "error",
        });
      }
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new FirebaseAuth.GoogleAuthProvider();
    const auth = FirebaseAuth.getAuth();

    provider.addScope("profile");
    provider.setCustomParameters({
      display: "popup",
      prompt: "select_account",
    });

    FirebaseAuth.signInWithPopup(auth, provider)
      .then((res) => {
        FirebaseAuth.onAuthStateChanged(auth, async (user) => {
          if (user) {
            window.localStorage.setItem("uid", user.uid);
            user.getIdToken().then((token) => {
              window.localStorage.setItem("Mktoken", token);
            });
            await Api.Server.Client().post(Api.Server.ApiRoutes.createUser, {
              uid: user.uid,
              full_name: user.displayName,
              eMail_id: user.email,
            });
            update();
            router.push("/");
            // setTimeout(() => {
            //   router.reload();
            // }, 1000);
          }
        });
      })
      .catch((err) => {
        console.log(err.message || "GoogleSignIn: Something went wrong");
      });
  };

  return (
    <Mui.Stack spacing={3}>
      <Head>
        <title>Login</title>
        <meta content="Home Page" key="title" />
      </Head>
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={login}
        validationSchema={validationSchemas}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitForm,
        }) => (
          <Mui.Box>
            <Mui.Stack spacing={2} sx={{ marginTop: "20px" }}>
              <Mui.Typography
                sx={{ fontSize: "0.75rem", fontFamily: "CallunaSans-Regular" }}
              >
                Enter your E-mail ID
              </Mui.Typography>
              <Mui.TextField
                size="small"
                type={"email"}
                value={values.email}
                name="email"
                variant="outlined"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{ sx: { fontFamily: "CallunaSans-Regular" } }}
              />
              <Mui.Typography
                sx={{ fontSize: "0.75rem", fontFamily: "CallunaSans-Regular" }}
              >
                Password
              </Mui.Typography>
              <Mui.TextField
                size="small"
                value={values.password}
                name="password"
                variant="outlined"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    submitForm()
                  }
                }}
                type={visible ? "text" : "password"}
                InputProps={{
                  sx: { fontFamily: "CallunaSans-Regular" },
                  endAdornment: (
                    <Mui.IconButton onClick={() => setVisible(!visible)}>
                      {visible ? (
                        <Mui.Box
                          component="img"
                          src={EyeOpen.src}
                          sx={{ width: "20px" }}
                        />
                      ) : (
                        <Mui.Box
                          component="img"
                          src={EyeClose.src}
                          sx={{ width: "20px" }}
                        />
                      )}
                    </Mui.IconButton>
                  ),
                }}
                sx={{
                  "& input::-ms-reveal, & input::-ms-clear": {
                    display: "none",
                  },
                  "& .MuiOutlinedInput-root": {
                    padding: "0px",
                  },
                }}
              />
            </Mui.Stack>{" "}
            <Link href={"/accounts/forgot-password"}>
              <Mui.Typography
                color={"primary.main"}
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  mt: 2,
                  fontSize: "0.75rem",
                  fontFamily: "CallunaTitle-Semibold",
                }}
              >
                Forgot Password ?
              </Mui.Typography>
            </Link>
            <Mui.Stack spacing={2} sx={{ marginTop: "20px" }}>
              <MuiLabs.LoadingButton
                onClick={() => submitForm()}
                sx={{
                  boxShadow: "0px 20px 40px #0000001F",
                  fontSize: "12px!important",
                  height: "40px",
                  fontFamily: "CallunaTitle-Semibold",
                }}
                type="submit"
                variant="contained"
                loading={loading}
              >
                Sign In
              </MuiLabs.LoadingButton>
              <Mui.Typography align="center">or</Mui.Typography>
              <Mui.Button
                sx={{
                  boxShadow: "0px 20px 40px #0000001F",
                  color: "black",
                  bgcolor: "white",
                  fontSize: "12px!important",
                }}
                onClick={handleGoogleSignIn}
              >
                <Mui.Box
                  component="img"
                  src={GoogleLogo.src}
                  sx={{ height: "30px" }}
                ></Mui.Box>
                Google
              </Mui.Button>
            </Mui.Stack>
          </Mui.Box>
        )}
      </Formik>
    </Mui.Stack>
  );
}

Login.Layout = Layouts.AuthLayouts.Authlayout;

interface initialFormValues {
  email: string;
  password: string;
}

export default Login;
