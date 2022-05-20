import * as Mui from "@mui/material";
import * as Views from "../editprofile/views";
import * as Components from "components";
import { Formik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import * as Routers from "next/router";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Context from "context";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const initialFormValues = {
  full_name: "",
  eMail_id: "",
  gender: "",
  homeTown: "",
  hobbies: "",
  favorite_quote: "",
  userName: "",
  phone_number: "",
  age_group: "",
  current_city: "",
  industry_working_in: "",
  profile_photo: { file: null, perView: null },
  business_details: {
    business_logo: "",
    business_name: "",
    business_description: "",
    nature_of_business: "",
    professional_license_number: "",
    brokerage_license_number: "",
  },
};

const validationSchemas = Yup.object().shape({
  full_name: Yup.string()
    .trim()
    .required("Enter your Full name")
    .min(6, "Enter Minimum of 6")
    .max(25, "Exceeding Maximum character")
    .nullable(),
  eMail_id: Yup.string()
    .trim()
    .required("Enter your Email-Id")
    .email()
    .nullable(),
  gender: Yup.string().trim().required("Enter your Gender").nullable(),
  home_country: Yup.string()
    .required("Enter your Hometown/homecity in Canada")
    .nullable(),
  hobbies: Yup.string().trim().nullable(),
  favorite_quote: Yup.string().trim().nullable(),
  phone_number: Yup.string()
    .trim()
    .required("Enter your Phone Number")
    .nullable(),
  age_group: Yup.string().trim().required("Enter your Age Group").nullable(),
  current_city: Yup.string()
    .trim()
    .required("Enter your City or Country")
    .nullable(),
  industry_working_in: Yup.string()
    .trim()
    .required("Enter your Industry you’re working in")
    .nullable(),
  profileImg: Yup.object({
    file: Yup.mixed().nullable(),
  }),
  // business_logo: Yup.object({
  //   file: Yup.mixed().nullable(),
  // }),
  business_name: Yup.string().trim().nullable(),
  nature_of_business: Yup.string().trim().nullable(),
  business_description: Yup.string().trim().nullable(),
  professional_license_number: Yup.string().trim().nullable(),
  brokerage_license_number: Yup.string().trim().nullable(),
});

export const Main = () => {
  const router = Routers.useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));


  const { update } = React.useContext(Context.UserProfile.UserProfileContext);

  const [state1, setState1] = React.useState<any>("");
  const [updates, setUpdate] = React.useState(false);

  const profileupload = (res: any) => {
    console.log("profile photo", res)
    setState1(res);
  };

  const [state2, setState2] = React.useState<any>("");

  const logoupload = (res: any) => {
    refetch();
    setState2(res);
  };

  const { data, isLoading, refetch } = ReactQuery.useQuery(
    ["getOneUserDetail", updates],
    async () => {
      return await Api.Server.Client().post(
        Api.Server.ApiRoutes.profile.oneUser,
        {
          user_id: localStorage.getItem("uid"),
        }
      );
    }
  );

  const userDetails = data?.data?.data;
  console.log("userDetails", userDetails);

  const submitForm = (values: any) => {
    Edit(values);
  };

  const { mutate: Edit, isLoading: loading } = ReactQuery.useMutation(
    async (values: any) => {
      const data = await Api.Server.Client().post(
        Api.Server.ApiRoutes.profile.editMyProfile,
        {
          full_name: values.full_name,
          username: values.username,
          eMail_id: values.eMail_id,
          phone_number: values.phone_number,
          gender: values.gender,
          age_group: values.age_group,
          home_country: values.home_country,
          current_city: values.current_city,
          city: values.city,
          hobbies: values.hobbies,
          industry_working_in: values.industry_working_in,
          favorite_quote: values.favorite_quote,
          profile_photo: state1,
          business_details: {
            business_logo: state2,
            business_name: values.business_name,
            nature_of_business: values.nature_of_business,
            business_description: values.business_description,
            professional_license_number: values.professional_license_number,
            brokerage_license_number: values.brokerage_license_number,
          },
        }
      );
      return data;

    },
    {
      onSuccess: (data) => {
        update();
        console.log(data);
        setUpdate(!updates);
        // refetch();
        router.push("/my-profile");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <Mui.Box sx={{ marginTop: { xs: "110px", md: "280px" } }}>
      <Components.CardWithTitle
        title={"Profile Details"}
        actions={null}
        extraText={null}
      >
        {isLoading || loading ? (
          <Mui.Stack alignItems="center" justifyContent="center">
            <Mui.CircularProgress />
          </Mui.Stack>
        ) : (
          <Formik
            enableReinitialize
            validationSchema={validationSchemas}
            initialValues={{
              full_name: userDetails?.full_name,
              username: userDetails?.username,
              eMail_id: userDetails?.eMail_id,
              phone_number: userDetails?.phone_number,
              gender: userDetails?.gender,
              age_group: userDetails?.age_group,
              home_country: userDetails?.home_country,
              current_city: userDetails?.current_city,
              city: userDetails?.city,
              hobbies: userDetails?.hobbies,
              industry_working_in: userDetails?.industry_working_in,
              favorite_quote: userDetails?.favorite_quote,
              profile_photo: userDetails?.profile_photo,
              business_logo: userDetails?.business_details?.business_logo,
              business_name: userDetails?.business_details?.business_name,
              nature_of_business:
                userDetails?.business_details?.nature_of_business,
              business_description:
                userDetails?.business_details?.business_description,
              professional_license_number:
                userDetails?.business_details?.professional_license_number,
              brokerage_license_number:
                userDetails?.business_details?.brokerage_license_number,
            }}
            onSubmit={submitForm}
          >
            {(props) => (
              <Mui.Box>
                <Mui.Stack>
                  <Mui.Grid container spacing={2}>
                    <Mui.Grid item sm={4} xs={12}>
                      <Views.EditDetails {...props} />
                    </Mui.Grid>
                    <Mui.Grid item sm={4} xs={12}>
                      <Views.Column2 {...props} />
                    </Mui.Grid>

                    <Mui.Grid item xs={12} sm={4}>
                      <Views.ProfileUpload
                        {...props}
                        getphoto={(item: any) => profileupload(item)}
                      />
                    </Mui.Grid>
                  </Mui.Grid>
                </Mui.Stack>
                <Mui.Stack paddingTop={2}>
                  <Mui.Grid item xs ={12} sm={9}>
                    <Views.Column3 {...props} />
                  </Mui.Grid>
                </Mui.Stack>

                {userDetails?.pinoy_preneur == 0 ?
                  ''
                  :
                  <>
                    <Mui.Divider sx={{ mt: 2, mb: 2 }} />
                    <Views.LogoUpload
                      {...props}
                      getlogo={(item: any) => logoupload(item)}
                    />
                    <Mui.Typography
                      sx={{
                        mb: 2,
                        fontFamily: "Haborosans-normal",
                        fontSize: "1rem",
                      }}
                      color={"#BEBEBE"}
                    >
                      Business/Company Details
                    </Mui.Typography>
                    <Views.BusinessDetails {...props} />
                  </>
                }

                <Mui.Stack
                  sx={{ mt: 3 }}
                  direction={"row"}
                  justifyContent={"end"}
                >
                  <Mui.Button
                    onClick={() => props.submitForm()}
                    sx={{ width: matches ? "50%":"25%", mr: "3rem" }}
                    variant="contained"
                  >
                    Save Details
                  </Mui.Button>
                </Mui.Stack>
              </Mui.Box>
            )}
          </Formik>
        )}
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
