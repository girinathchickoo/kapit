import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Views from "app/pinoypreneurs/views";
import * as Hooks from "hooks";
import * as React from "react";
import { Formik, useFormikContext, FormikProps, Form } from "formik";
import * as Yup from "yup";
import * as Api from "api";
import { uploadNewImage } from "utils/cloudinary";
import * as Query from "react-query";

const initialFormValues = {
  business_logo: "",
  business_name: "",
  business_description: "",
  nature_of_business: "",
  category: "",
  professional_license_number: "",
  brokerage_license_number: "",
  company_website_link: "",
  company: "Products",
  email_id: "",
  phone_number: "",
  address: "",
  city: "",
  province_name: "",
  postal_code: "",
  position: "",
  template_id: 0,
  title: "",
  products: [
    {
      product_image: "",
      product_title: "",
      product_description: "",
    },
  ],
};

const validationSchemas = Yup.object().shape({
  business_logo: Yup.string().trim().notRequired(),
  business_name: Yup.string().trim().required("Enter Business Name"),
  business_description: Yup.string()
    .trim()
    .required("Enter Business Description"),
  nature_of_business: Yup.string()
    .trim()
    .required("Enter your Nature of Business"),
  category: Yup.string().trim().required("Enter your Category"),
  professional_license_number: Yup.string().trim().notRequired(),
  brokerage_license_number: Yup.string().trim().notRequired(),
  company_website_link: Yup.string().trim().notRequired(),
  // company: Yup.string().trim().required("Please select the company name"),
  email_id: Yup.string().trim().required("Enter your Email-id").email(),
  phone_number: Yup.string()
    .trim()
    .length(10)
    .required("Enter your Phone number"),
  address: Yup.string().trim().required("Enter your address"),
  city: Yup.string().trim().required("Enter your City"),
  province_name: Yup.string().trim().required("Enter your Province"),
  postal_code: Yup.string().trim().required("Enter Postal code"),
  position: Yup.string().trim().required("Enter your title"),
  template_id: Yup.string().trim().notRequired(),
  products: Yup.array().of(
    Yup.object().shape({
      product_image: Yup.string(),
      product_title: Yup.string(),
      product_description: Yup.string(),
    })
  ),
});

const stepperLabel = [
  "Subscription Info",
  "Payment",
  "Business Info",
  "Select a Template",
];

export const PostDialog = ({ open, onClose }: PostModel.PostDialog | any) => {
  const isMobile = Hooks.useMobileView();
  const formikRef = React.useRef<any>(null);
  const [activeStepper, setActiveStepper] = React.useState<number>(0);

  const handleNextStep = (index: number) => {
    setActiveStepper(index);
  };

  const stepperValue = (
    props: PostModel.OtherProps & FormikProps<PostModel.FormData>
  ) => {
    return {
      0: <Views.SubscriptionDetails />,
      1: <Views.PaymentDetails />,
      2: <Views.BusinessInfoDetails {...props} />,
      3: <Views.ChooseTemplate />,
    }[activeStepper];
  };

  const nextStep = () => {
    setActiveStepper(activeStepper + 1);
  };

  const client = Query.useQueryClient();

  const { mutate: Add } = Query.useMutation(
    async (values: any) => {
      console.log(values);
      const data = await Api.Server.Client().post(
        Api.Server.ApiRoutes.pinoyPreneurs.postProduct,
        values
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        client.invalidateQueries("checkUser");
        client.invalidateQueries("PnoyPreneursList");
        onClose();
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const finishPost = async (props: any) => {
    try {
      const { business_logo, products, ...rest } = props as PostModel.FormData;
      {
        console.log(props);
      }
      const productsImageUrl = await Promise.all(
        products.map(async (item, index) => {
          const imageUrl = await uploadNewImage(item.product_image);
          return {
            product_image: imageUrl,
            product_title: item.product_title,
            product_description: item.product_description,
          };
        })
      );
      const businessLogoImageUrl = await uploadNewImage(business_logo);
      console.log(productsImageUrl, businessLogoImageUrl);
      Add({
        ...rest,
        business_logo: businessLogoImageUrl,
        products: productsImageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const stepperButton = (props: any) => {
    return {
      0: <Views.ContinueButton nextStep={nextStep} />,
      1: <Views.MakePayment nextStep={nextStep} />,
      2: <Views.SubmitDetails nextStep={nextStep} />,
      3: <Views.Finish nextStep={finishPost} />,
    }[activeStepper];
  };

  const handleCloseModel = () => {
    setActiveStepper(0);
    onClose();
  };

  return (
    <Mui.Dialog
      sx={{ "& .MuiDialog-paper": { width: "70%", p: 3 } }}
      maxWidth="lg"
      fullScreen={isMobile}
      open={open}
      onClose={handleCloseModel}
    >
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={finishPost}
        validationSchema={validationSchemas}
      >
        {(props) => {
          return (
            <Form>
              <Mui.DialogTitle sx={{ p: 1 }}>
                <Mui.Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Mui.Typography color={"primary"} sx={{ fontWeight: 600 }}>
                    Business Directory - Subscription
                  </Mui.Typography>
                  <Mui.IconButton onClick={handleCloseModel}>
                    <MuiIcons.Close />
                  </Mui.IconButton>
                </Mui.Stack>
              </Mui.DialogTitle>
              <Mui.DialogContent sx={{ p: 1, mt: 1 }}>
                <Mui.Stepper
                  nonLinear
                  activeStep={activeStepper}
                  sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {stepperLabel.map((label, index) => (
                    <Mui.Step key={label}>
                      <Mui.StepButton
                        sx={{ fontFamily: "Haborosans-normal" }}
                        color="inherit"
                        onClick={() => handleNextStep(index)}
                      >
                        {label}
                      </Mui.StepButton>
                    </Mui.Step>
                  ))}
                </Mui.Stepper>
                <Mui.Box sx={{ mt: "1rem", p: 1 }}>
                  {" "}
                  {stepperValue(props as any)}
                </Mui.Box>
                <Mui.Typography fontSize="small" color="error">
                  {Object.values(props.errors).join(", ")}
                </Mui.Typography>
              </Mui.DialogContent>
              <Mui.DialogActions>
                <Mui.Stack
                  direction={"row"}
                  justifyContent="flex-end"
                  alignItems={"center"}
                >
                  {stepperButton(props.submitForm)}
                </Mui.Stack>
              </Mui.DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Mui.Dialog>
  );
};

export declare namespace PostModel {
  export interface PostDialog {
    open: boolean;
    onClose?: () => void;
  }

  export interface Products {
    product_image: string | any;
    product_title: string;
    product_description: string;
  }

  export interface FormData {
    business_logo: string | any;
    business_name: string;
    business_description: string;
    nature_of_business: string;
    category: string;
    professional_license_number: string;
    brokerage_license_number: string;
    company_website_link: string;
    company: string;
    city: string;
    email_id: string;
    phone_number: string;
    address: string;
    province_name: string;
    postal_code: string;
    position: string;
    template_id: number | string;
    title: string;
    products: [Products];
  }

  export interface OtherProps {
    message: string;
  }
}
