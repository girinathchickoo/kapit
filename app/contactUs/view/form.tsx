import * as Formik from "formik";
import * as Mui from "@mui/material";
import { FormikTextArea, FormikTextField } from "components";

export const QuerysForm = () => {
  return (
    <Formik.Formik initialValues={{}} onSubmit={console.log}>
      <Formik.Form
        style={{ maxHeight: "100%", overflow: "auto", paddingRight: "10px" }}
      >
        <Mui.Stack spacing={2}>
          <FormikTextField
            name="name"
            label="Full Name"
            placeholder="Benjamin Hudson"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { fontFamily: "CallunaSans-Regular" },
            }}
            sx={{ pt: 1, px: 1 }}
            labelSx={{ fontFamily: "CallunaSans-Regular" }}
          />
          <FormikTextField
            name="email"
            label="E-mail ID"
            placeholder="benjamin.hudson@mail.com"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { fontFamily: "CallunaSans-Regular" },
            }}
            sx={{ pt: 1, px: 1 }}
            labelSx={{ fontFamily: "CallunaSans-Regular" }}
          />
          <FormikTextArea
            name="query"
            label="Your Query"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{ pt: 1, px: 1 }}
            labelSx={{ fontFamily: "CallunaSans-Regular" }}
          />
          <Mui.Button
            variant="contained"
            fullWidth
            sx={{ maxWidth: 250, fontFamily: "callunaSans- Semibold" }}
          >
            Send Message
          </Mui.Button>
        </Mui.Stack>
      </Formik.Form>
    </Formik.Formik>
  );
};
