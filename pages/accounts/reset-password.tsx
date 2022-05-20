import * as React from "react";
import * as Mui from "@mui/material";
import * as Components from "components";
import * as NextRouters from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import * as Notistack from "notistack";
import * as MuiLabs from '@mui/lab';

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

const initialFormValues = {
  password: "",
  confirmPassword: "",
};

const validationSchemas = Yup.object().shape({
  password: Yup.string().required("Password is required").min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must be same")
    .required("Confirm password is required"),
});

function Setpassword() {
  const routers = NextRouters.useRouter();
  const apiKey = routers.query?.apiKey;
  const oobMode = routers.query?.oobCode;
  const { enqueueSnackbar } = Notistack.useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);

  const updatePassword = async (values: any) => {
    setIsLoading(true)
    try {
      Axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
        {
          oobCode: oobMode,
          newPassword: values?.confirmPassword,
        }
      )
        .then(() => {
          enqueueSnackbar("Password Reset Successfull!", {
            preventDuplicate: false,
            persist: false,
            variant: "success",
          });
          // routers.push('/accounts/login');
          setIsLoading(false)
          setTimeout(() => {
            window.close()
          }, 2000)
        })
        .catch(() => {
          enqueueSnackbar("Invalid Reset Link", {
            preventDuplicate: false,
            persist: false,
            variant: "error",
          });
        });
    } catch (err) {
      setIsLoading(false)
      console.log(err);
    }
  };

  return (
    <Mui.Box>
      <Components.DialogwithHeader dialogWidth="xs" title={<DialogTitle />}>
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          onSubmit={updatePassword}
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
              <Mui.Stack spacing={3} sx={{ marginTop: "20px" }}>
                <Mui.Stack spacing={1}>
                  <Mui.Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Haborosans-normal" }}
                  >
                    New Password
                  </Mui.Typography>
                  <TextField
                    variant="outlined"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={"password"}
                  />
                </Mui.Stack>
                <Mui.Stack spacing={1}>
                  <Mui.Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Haborosans-normal" }}
                  >
                    Confirm Password
                  </Mui.Typography>
                  <TextField
                    variant="outlined"
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={"password"}
                  />
                </Mui.Stack>
              </Mui.Stack>
              <Mui.Box sx={{ marginTop: "20px", width: "100%" }}>
                <MuiLabs.LoadingButton
                  sx={{
                    boxShadow: "0px 20px 40px #0000001F",
                    width: "100%",
                    mt: 4,
                  }}
                  variant="contained"
                  onClick={() => submitForm()}
                  loading={isLoading}
                >
                  Submit
                </MuiLabs.LoadingButton>
              </Mui.Box>
            </Mui.Box>
          )}
        </Formik>
      </Components.DialogwithHeader>
    </Mui.Box>
  );
}

const DialogTitle = () => {
  return (
    <Mui.Typography
      sx={{ fontSize: "0.75rem" }}
      variant="h6"
      color={"primary.main"}
    >
      <strong>Reset Password</strong>
    </Mui.Typography>
  );
};

export default Setpassword;
