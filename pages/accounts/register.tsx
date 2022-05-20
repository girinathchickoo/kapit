import * as React from "react";
import { app } from "firebase-config";
import * as FirebaseAuth from "firebase/auth";
import * as Mui from "@mui/material";
import * as Layouts from "layouts";
import { Formik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import * as Notistack from "notistack";
import * as NextRouter from "next/router";
import * as Api from "api";
import * as MuiLabs from "@mui/lab";
import EyeOpen from "assets/onboarding/visibility_on@2x.png";
import EyeClose from "assets/onboarding/visibility_off@2x.png";
import * as MuiIcons from "@mui/icons-material";
import * as Context from "context";
import { PhoneField } from "components";

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

const initialFormValues: initialFormValues = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms_and_condition: false,
  phone_number: "",
};

const validationSchemas = Yup.object().shape({
  fullname: Yup.string()
    .trim()
    .required("Enter your Full name")
    .min(6, "Enter Minimum of 6")
    .max(16, "Exceeding Maximum character"),
  email: Yup.string().trim().required("Enter your Email-Id").email(),
  phone_number: Yup.string()
    .trim()
    .length(10)
    .required("Enter your Phone number"),
  password: Yup.string()
    .trim()
    .required("Enter your Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref("password"), null], "Password don't match")
    .required("Confirm password is required"),
  terms_and_condition: Yup.boolean().oneOf(
    [true],
    "You must accept the pricing policy terms and conditions"
  ),
});

function Register() {
  const formikRef = React.useRef<any>(null);
  const { enqueueSnackbar } = Notistack.useSnackbar();
  const routers = NextRouter.useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visibleConform, setVisibleConform] = React.useState(false);
  const { update } = React.useContext(Context.UserProfile.UserProfileContext);

  const registerValidation = async ({
    fullname,
    email,
    password,
    phone_number,
  }: initialFormValues) => {
    setIsLoading(true);
    try {
      const auth = FirebaseAuth.getAuth(app);
      const { user } = await FirebaseAuth.createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await FirebaseAuth.updateProfile(user, { displayName: fullname });
      await Api.Server.Client().post(Api.Server.ApiRoutes.createUser, {
        uid: user?.uid,
        full_name: user?.displayName,
        eMail_id: user?.email,
        phone_number: phone_number,
      });
      enqueueSnackbar("Register Successfull", {
        preventDuplicate: false,
        persist: false,
        variant: "success",
      });
      update();
      routers.push("/my-profile/edit-profile");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar("Email id Already Exist", {
        preventDuplicate: false,
        persist: false,
        variant: "error",
      });
    }
  };

  return (
    <Mui.Stack spacing={3}>
      <Head>
        <title>Register</title>
        <meta content="mykapitbahay user profile page" key="profile page" />
      </Head>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={registerValidation}
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
            <Mui.Stack spacing={5} sx={{ marginTop: "20px" }}>
              <Mui.Stack spacing={1}>
                <Mui.Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontFamily: "CallunaSans-Regular",
                  }}
                >
                  Enter your Full Name
                </Mui.Typography>
                <TextField 
                  type={"text"}
                  value={values.fullname}
                  name="fullname"
                  variant="outlined"
                  error={Boolean(touched.fullname && errors.fullname)}
                  helperText={touched.fullname && errors.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  InputProps={{ sx: { fontFamily: "CallunaSans-Regular" ,"& input":{height: "1.4375px"}} }}
                />
              </Mui.Stack>
              <Mui.Stack spacing={1}>
                <Mui.Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontFamily: "CallunaSans-Regular",
                  }}
                >
                  Enter your E-mail ID
                </Mui.Typography>
                <TextField
                  type={"email"}
                  value={values.email}
                  name="email"
                  variant="outlined"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{ sx: { fontFamily: "CallunaSans-Regular", "& input":{height: "1.4375px"}} }}
                />
              </Mui.Stack>
              <Mui.Stack spacing={1}>
                <Mui.Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontFamily: "CallunaSans-Regular",
                  }}
                >
                  Enter your Phone Number
                </Mui.Typography>
                <TextField
                  type="text"
                  value={values.phone_number}
                  name="phone_number"
                  variant="outlined"
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    sx: { fontFamily: "CallunaSans-Regular","& input":{height: "1.4375px"} },
                    inputComponent:
                      PhoneField as React.ElementType<Mui.InputBaseComponentProps>,
                  }}
                />
              </Mui.Stack>
              <Mui.Stack spacing={1}>
                <Mui.Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontFamily: "CallunaSans-Regular",
                  }}
                >
                  Password
                </Mui.Typography>
                <TextField
                  value={values.password}
                  name="password"
                  variant="outlined"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={visible ? "text" : "password"}
                  InputProps={{
                    sx: { fontFamily: "CallunaSans-Regular","& input":{height: "1.4375px"} },
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
                <Mui.Typography
                  sx={{
                    textAlign: "right",
                    fontFamily: "CallunaSans-Regular",
                    fontSize: "12px",
                    color:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
                        values.password
                      )
                        ? "Green"
                        : "red",
                  }}
                >
                  {/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
                    values.password
                  )
                    ? "Strong"
                    : "Weak"}
                </Mui.Typography>
              </Mui.Stack>
              <Mui.Stack spacing={1}>
                <Mui.Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontFamily: "CallunaSans-Regular",
                    "& input":{height: "1.4375px"}
                  }}
                >
                  Confirm Password
                </Mui.Typography>
                <TextField
                  name="confirmPassword"
                  value={values.confirmPassword}
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur}
                  type={visibleConform ? "text" : "password"}
                  InputProps={{
                    sx: { fontFamily: "CallunaSans-Regular","& input":{height: "1.4375px"} },
                    endAdornment: (
                      <Mui.IconButton
                        onClick={() => setVisibleConform(!visibleConform)}
                      >
                        {visibleConform ? (
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
              </Mui.Stack>
              <Mui.Stack spacing={1}>
                <Mui.FormControlLabel
                  name="terms_and_condition"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.terms_and_condition}
                  control={<Mui.Checkbox />}
                  label={
                    <Mui.Typography
                      sx={{
                        fontSize: "12px",
                        fontFamily: "CallunaTitle-Semibold",
                      }}
                    >
                      Agree to the{" "}
                      <Mui.Link
                        href="#"
                        sx={{
                          fontSize: "12px",
                          fontFamily: "CallunaTitle-Semibold",
                        }}
                      >
                        Terms of Use and Privacy policy
                      </Mui.Link>{" "}
                    </Mui.Typography>
                  }
                />
                {touched.terms_and_condition && errors.terms_and_condition && (
                  <Mui.Typography
                    color="error"
                    fontFamily={"CallunaSans-Regular"}
                    fontSize={"12px"}
                  >
                    {touched.terms_and_condition && errors.terms_and_condition}
                  </Mui.Typography>
                )}
              </Mui.Stack>
            </Mui.Stack>
            <Mui.Box sx={{ marginTop: "10px", width: "100%" }}>
              <MuiLabs.LoadingButton
                sx={{
                  boxShadow: "0px 20px 40px #0000001F",
                  width: "100%",
                  mt: 1,
                  fontSize: "12px!important",
                  height: "40px",
                  fontFamily: "CallunaTitle-Semibold",
                }}
                variant="contained"
                onClick={() => submitForm()}
                loading={isLoading}
                type="submit"
              >
                Create Account
              </MuiLabs.LoadingButton>
            </Mui.Box>
          </Mui.Box>
        )}
      </Formik>
    </Mui.Stack>
  );
}

Register.Layout = Layouts.AuthLayouts.Authlayout;

export default Register;
interface initialFormValues {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms_and_condition: boolean;
  phone_number: string;
}
