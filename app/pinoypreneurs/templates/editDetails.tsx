import * as React from "react";
import * as Query from "react-query";
import * as Server from "api";
import * as Mui from "@mui/material";
import * as Routers from "next/router";
import * as kijiji from "kijiji-scraper";

import * as Formik from "formik";
import * as Yup from "yup";
import {
  CheckButton,
  FormikTextArea,
  FormikTextField,
  ImagePickerV,
  SelectField,
} from "components";
import { Products, Product_Service } from "./product_service";

const EditPostValidationSchema = Yup.object().shape({
  business_logo: Yup.string().required("Required"),
  business_name: Yup.string().required("Required"),
  business_description: Yup.string().required("Required"),
  nature_of_business: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  professional_license_number: Yup.string().required("Required"),
  brokerage_license_number: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  email_id: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  province_name: Yup.string().required("Required"),
  postal_code: Yup.string().required("Required"),
  products: Yup.array().of(
    Yup.object().shape({
      product_image: Yup.string(),
      product_title: Yup.string(),
      product_description: Yup.string(),
    })
  ),
});

export const EditDetails = ({ setOpen, refetch, open }: Props) => {
  const routers = Routers.useRouter();
  const getQuery = routers?.query;
  const pinoyPreneurs = routers?.query?.pinoypreneursid;
  const client = Query.useQueryClient();

  const { isLoading, data } = Query.useQuery(
    ["pinoyPreneursDetails", open],
    async () => {
      const datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.pinoyPreneurs.viewProduct,
        {
          PinoyPreneur_id: pinoyPreneurs,
        }
      );
      return datas?.data?.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const initialValue: form = {
    PinoyPreneur_id: data?._id as string,
    business_logo: data?.business_logo as string,
    business_name: data?.business_name as string,
    business_description: data?.business_description as string,
    nature_of_business: data?.nature_of_business as string,
    category: data?.category as string,
    professional_license_number: data?.professional_license_number as string,
    brokerage_license_number: data?.brokerage_license_number as string,
    company: data?.company as string,
    email_id: data?.email_id as string,
    phone_number: data?.phone_number as string,
    address: data?.address as string,
    city: data?.city as string,
    province_name: data?.province_name as string,
    postal_code: data?.postal_code as string,
    products: data?.products?.map(
      (
        item: {
          _id: string;
          product_image: string;
          product_title: string;
          product_description: string;
        },
        index: number
      ) => {
        let product = {
          _id: item?._id,
          product_image: item?.product_image,
          product_title: item?.product_title,
          product_description: item?.product_description,
        };
        return product;
      }
    ),
  };

  const { mutate: ChangeDetails } = Query.useMutation(
    async (details: any) => {
      console.log(details);
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.pinoyPreneurs.editDetails,
        details
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        refetch();
        client.invalidateQueries("pinoyPreneursDetails");
        setOpen(false);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return isLoading ? (
    <Mui.Stack alignItems="center" justifyContent="center" py={10}>
      <Mui.CircularProgress color={"primary"} />
    </Mui.Stack>
  ) : (
    <Formik.Formik
      validationSchema={EditPostValidationSchema}
      initialValues={initialValue}
      onSubmit={ChangeDetails as any}
    >
      <Formik.Form
        style={{ height: "400px", overflow: "auto", paddingRight: "10px" }}
      >
        <Mui.Grid container spacing={2} sx={{ p: 2 }}>
          <Mui.Stack component={Mui.Grid} item md={6} xs={12} spacing={2}>
            <Mui.Grid container sx={{ height: "20px" }}>
              <Mui.Typography sx={{ fontSize: "12px", color: "#BEBEBE" }}>
                Business/company details
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Box>
              <ImagePickerV
                name="business_logo"
                Height="100px"
                fileType="image"
                value="Upload Logo"
              />
            </Mui.Box>
            <FormikTextField
              name="business_name"
              label="Business/Company Name"
              placeholder="Lorem Ipsum"
            />
            <FormikTextArea
              name="business_description"
              label="About your Company/Business"
              placeholder="Lorem Ipsum"
            />
          </Mui.Stack>
          <Mui.Stack component={Mui.Grid} item md={6} xs={12} spacing={2}>
            <Mui.Box sx={{ height: "10px" }}></Mui.Box>
            <FormikTextField
              name="nature_of_business"
              label="Nature of Business"
            />
            <SelectField
              name="category"
              label="Category"
              sx={{ fontSize: "12px" }}
            >
              {Object.keys(kijiji.categories.JOBS)
                .slice(1)
                .map((item, i) => {
                  return (
                    <Mui.MenuItem value={item} key={i}>
                      {item[0].toUpperCase() +
                        item.replaceAll("_", " ").slice(1).toLowerCase()}
                    </Mui.MenuItem>
                  );
                })}
            </SelectField>
            <FormikTextField
              name="professional_license_number"
              label="Professional License Number"
            />
            <FormikTextField
              name="brokerage_license_number"
              label="Brokerage License Number"
            />
          </Mui.Stack>
          <Mui.Stack
            component={Mui.Grid}
            item
            md={6}
            xs={12}
            sx={{ mt: 2 }}
            spacing={2}
          >
            <CheckButton
              lable="Product/Service Details"
              name="company"
              value1="Products"
              value2="Services"
            />
            <Product_Service />
          </Mui.Stack>
          <Mui.Stack
            component={Mui.Grid}
            item
            md={6}
            xs={12}
            sx={{ mt: 2 }}
            spacing={2}
          >
            <Mui.Grid container>
              <Mui.Typography sx={{ fontSize: "12px", color: "#BEBEBE" }}>
                Contact Details
              </Mui.Typography>
            </Mui.Grid>
            <FormikTextField
              name="email_id"
              label="E-mail ID"
              placeholder="benjamin.hudson@mail.com"
            />
            <FormikTextField
              name="phone_number"
              label="Phone Number"
              placeholder="+1 705-312-7669"
            />
            <FormikTextField
              name="address"
              label="Address"
              placeholder="3726 George Street, Peterborough,"
            />
            <Mui.Grid container>
              <Mui.Grid item xs={6} sx={{ pr: 1 }}>
                <FormikTextField
                  name="city"
                  label="City"
                  placeholder="Peterborough"
                />
              </Mui.Grid>
              <Mui.Grid item xs={6} sx={{ pl: 1 }}>
                <FormikTextField
                  name="province_name"
                  label="Province"
                  placeholder="Ontario"
                />
              </Mui.Grid>
            </Mui.Grid>
            <FormikTextField
              name="postal_code"
              label="Postal Code"
              placeholder="Peterborough"
            />
          </Mui.Stack>
          <Mui.Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Mui.Button variant="contained" type="submit">
              Submit
            </Mui.Button>
          </Mui.Box>
        </Mui.Grid>
      </Formik.Form>
    </Formik.Formik>
  );
};

interface form {
  PinoyPreneur_id: string;
  business_logo: string;
  business_name: string;
  business_description: string;
  nature_of_business: string;
  category: string;
  professional_license_number: string;
  brokerage_license_number: string;
  company: string;
  email_id: string;
  phone_number: string;
  address: string;
  city: string;
  province_name: string;
  postal_code: string;
  products: Products[];
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: any;
}
