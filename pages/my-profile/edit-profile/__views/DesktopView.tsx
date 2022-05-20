import React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Components from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import ProfileEmpty from "assets/homepage/user@2x.png";

const initialFormValues = {
  fullname: "",
  email: "",
  gender: "",
  homeTown: "",
  Hobbies: "",
  favoriteQuotes: "",
  userName: "",
  phonenumber: "",
  ageGroup: "",
  isCanada: "",
  working: "",
  profileImg: { file: null, perView: null },
  businessName: "",
  aboutCompany: "",
  business: "",
  licenceNumber: "",
  brokerageNumber: "",
};

const validationSchemas = Yup.object().shape({
  fullname: Yup.string().trim().required("Enter your Full name"),
  email: Yup.string().trim().required("Enter your Email-Id").email(),
  gender: Yup.string().trim().required("Enter your Gender"),
  homeTown: Yup.string()
    .trim()
    .required("Enter your Hometown/homecity in Canada"),
  Hobbies: Yup.string().trim().required("Enter your Hobbies & Interests"),
  favoriteQuotes: Yup.string().trim().required("Enter your My Favourite Quote"),
  working: Yup.string()
    .trim()
    .required("Enter your Industry you’re working in"),
  userName: Yup.string().trim().required("Enter your User Name"),
  phonenumber: Yup.string().trim().required("Enter your Phone Number"),
  ageGroup: Yup.string().trim().required("Enter your Age Group"),
  isCanada: Yup.string()
    .trim()
    .required("Enter yourIf not in Canada, state your City and Country"),
  profileImg: Yup.object({
    file: Yup.mixed().required("A file is required"),
  }),
  businessName: Yup.string()
    .trim()
    .required("Enter your Business/Company Name"),
  aboutCompany: Yup.string()
    .trim()
    .required("Enter About your Company/Business"),
  business: Yup.string().trim().required("Enter your Nature of Business"),
  licenceNumber: Yup.string()
    .trim()
    .required("Enter your Professional License Number"),
  brokerageNumber: Yup.string()
    .trim()
    .required("Enter your Brokerage License Number"),
});

function DesktopView() {
  const imageRef = React.useRef<any>(null);
  const logoRef = React.useRef<any>(null);
  const formikRef = React.useRef<any>(null);
  const [profilePic, setProfilPic] = React.useState<any>(null);
  const [businessLogo, setBusinessLogo] = React.useState<any>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        setProfilPic(reader.result);
        formikRef.current.setFieldValue("profileImg", {
          file,
          prevImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onLogoImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        setBusinessLogo(reader.result);
        formikRef.current.setFieldValue("profileImg", {
          file,
          prevImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Mui.Box>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={() => console.log("login successfully")}
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
          <>
            {/*----------------------------------- User profile Edits-------------------------------------------- */}
            <Mui.Grid container spacing={4}>
              <Mui.Grid item xs={4}>
                <Mui.Stack sx={{ width: "90%" }} spacing={4}>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Full Name"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="fullname"
                      value={values.fullname}
                      error={Boolean(touched.fullname && errors.fullname)}
                      helperText={touched.fullname && errors.fullname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="E-mail ID"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="email"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Gender"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="gender"
                      value={values.gender}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Hometown/homecity in Canada"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="homeTown"
                      value={values.homeTown}
                      error={Boolean(touched.homeTown && errors.homeTown)}
                      helperText={touched.homeTown && errors.homeTown}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Hobbies & Interests"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="Hobbies"
                      value={values.Hobbies}
                      error={Boolean(touched.Hobbies && errors.Hobbies)}
                      helperText={touched.Hobbies && errors.Hobbies}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="My Favourite Quote"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="favoriteQuotes"
                      value={values.favoriteQuotes}
                      error={Boolean(
                        touched.favoriteQuotes && errors.favoriteQuotes
                      )}
                      helperText={
                        touched.favoriteQuotes && errors.favoriteQuotes
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                </Mui.Stack>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Stack sx={{ width: "90%" }} spacing={4}>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="User Name"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="userName"
                      value={values.userName}
                      error={Boolean(touched.userName && errors.userName)}
                      helperText={touched.userName && errors.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Phone Number"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="phonenumber"
                      value={values.phonenumber}
                      error={Boolean(touched.phonenumber && errors.phonenumber)}
                      helperText={touched.phonenumber && errors.phonenumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Age Group"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="ageGroup"
                      value={values.ageGroup}
                      error={Boolean(touched.ageGroup && errors.ageGroup)}
                      helperText={touched.ageGroup && errors.ageGroup}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="If not in Canada, state your City and Country"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="isCanada"
                      value={values.isCanada}
                      error={Boolean(touched.isCanada && errors.isCanada)}
                      helperText={touched.isCanada && errors.isCanada}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Industry you’re working in"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="working"
                      value={values.working}
                      error={Boolean(touched.working && errors.working)}
                      helperText={touched.working && errors.working}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                </Mui.Stack>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Stack spacing={2} alignItems={"center"}>
                  <Mui.Box>
                    <input
                      name="profileImg"
                      ref={imageRef}
                      type="file"
                      accept=".jpg,.png,jpeg"
                      onChange={onImageChange}
                      onBlur={handleBlur}
                      hidden
                    />
                    <Mui.Avatar
                      src={profilePic}
                      sx={{
                        width: (theme) => theme.spacing(20),
                        height: (theme) => theme.spacing(20),
                        backgroundColor: "#FAF7FF",
                        color: "#9B7DD4",
                        mt: 5,
                      }}
                      variant="rounded"
                    />
                    <Mui.Stack
                      direction={"row"}
                      justifyContent={"start"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        mt: 2,
                        ml: -3,
                        cursor: "pointer",
                        color: "#9B7DD4",
                      }}
                      onClick={() => imageRef.current.click()}
                    >
                      <MuiIcons.FileUpload />
                      <Mui.Typography>Upload Profile Picture</Mui.Typography>
                    </Mui.Stack>
                  </Mui.Box>
                </Mui.Stack>
              </Mui.Grid>
            </Mui.Grid>

            <Mui.Divider sx={{ mt: 5, mb: 2 }} />

            {/*--------------------------------- User Business Edits------------------------------------- */}

            <Mui.Grid container spacing={4}>
              <Mui.Grid item xs={4}>
                <Mui.Stack sx={{ width: "90%", mt:2 }} spacing={4}>
                  <Components.DavisTypography
                    color="#BEBEBE"
                    text="Business/Company details"
                  />
                  <Mui.Stack spacing={2} alignItems={"center"}>
                    <Mui.Box>
                      <input
                        name="profileImg"
                        ref={logoRef}
                        type="file"
                        accept=".jpg,.png,jpeg"
                        onChange={onLogoImageChange}
                        onBlur={handleBlur}
                        hidden
                      />
                      <Mui.Avatar
                        src={businessLogo}
                        sx={{
                          width: (theme) => theme.spacing(20),
                          height: (theme) => theme.spacing(20),
                          mt: 1,
                          backgroundColor: "#FAF7FF",
                          color: "#9B7DD4",
                        }}
                        variant="rounded"
                      />
                    </Mui.Box>
                    <Mui.Stack
                      sx={{
                        color: "#9B7DD4",
                      }}
                      onClick={() => logoRef.current.click()}
                    >
                      <Mui.Stack
                        direction={"row"}
                        justifyContent={"start"}
                        spacing={1}
                        alignItems={"center"}
                        sx={{
                          mt: 2,
                          ml: 2,
                          color: "#9B7DD4",
                        }}
                      >
                        <MuiIcons.FileUpload />
                        <Mui.Typography>Upload Logo</Mui.Typography>
                      </Mui.Stack>
                      <Mui.Box
                        sx={{
                          ml: 4,
                          mt: 1,
                          color: "#9B7DD4",
                        }}
                      >
                        <Components.DavisTypography
                          sx={{ fontSize: "14px" }}
                          text="Size upto 1.5 MB"
                        />
                      </Mui.Box>
                    </Mui.Stack>
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Business/Company Name"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="businessName"
                      value={values.businessName}
                      error={Boolean(
                        touched.businessName && errors.businessName
                      )}
                      helperText={touched.businessName && errors.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="About your Company/Business"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="aboutCompany"
                      value={values.aboutCompany}
                      error={Boolean(
                        touched.aboutCompany && errors.aboutCompany
                      )}
                      helperText={touched.aboutCompany && errors.aboutCompany}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      minRows={5}
                      multiline
                    />
                  </Mui.Stack>
                </Mui.Stack>
              </Mui.Grid>
              <Mui.Grid sx={{ width: "90%", mt:4 }} item xs={4}>
                <Mui.Stack spacing={4}>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Nature of Business"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="business"
                      value={values.business}
                      error={Boolean(touched.business && errors.business)}
                      helperText={touched.business && errors.business}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Professional License Number"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="licenceNumber"
                      value={values.licenceNumber}
                      error={Boolean(
                        touched.licenceNumber && errors.licenceNumber
                      )}
                      helperText={touched.licenceNumber && errors.licenceNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                  <Mui.Stack spacing={1}>
                    <Mui.FormLabel>
                      <Components.DavisTypography
                        sx={{ color: "#333333" }}
                        text="Brokerage License Number"
                      />
                    </Mui.FormLabel>
                    <Mui.TextField
                      variant="outlined"
                      name="brokerageNumber"
                      value={values.brokerageNumber}
                      error={Boolean(
                        touched.brokerageNumber && errors.brokerageNumber
                      )}
                      helperText={
                        touched.brokerageNumber && errors.brokerageNumber
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Mui.Stack>
                </Mui.Stack>
              </Mui.Grid>
              <Mui.Grid item xs={4}></Mui.Grid>
            </Mui.Grid>

            <Mui.Divider sx={{ mt: 5, mb: 2 }} />

            <Mui.Stack alignItems="end">
              <Mui.Button
                onClick={() => submitForm()}
                sx={{ width: "30%", fontSize: "18px" }}
                variant="contained"
              >
                Save Details
              </Mui.Button>
            </Mui.Stack>
          </>
        )}
      </Formik>
    </Mui.Box>
  );
}

export default DesktopView;
