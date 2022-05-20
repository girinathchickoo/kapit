import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import UploadIcon from "assets/Icon feather-upload@2x.png";
import PlusImage from "assets/Icon ionic-ios-add_@2x.png";
import * as React from "react";
import * as Views from "app/pinoypreneurs/views";
import { PhoneField } from "components";
import { FormikProps, FieldArray, useFormikContext } from "formik";

const TextField = Mui.styled(Mui.TextField)(({ theme }) => ({
  // backgroundColor: "#FAF7FF",
  borderRadius: "10px",
  width: "100%",
  fontSize: "0.8rem",
  fontFamily: "Haborosans-normal",
  lineHeight: 1.4,
  // height: "2.6rem",
}));

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
  marginBottom: "0.3rem",
});

const ImageContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "60%",
  height: "7rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #9B7DD4",
  borderRadius: "10px",
  backgroundColor: "#FAF7FF",
  cursor: "pointer",
  overflow: "hidden",
}));

const Button = Mui.styled(Mui.Button)(({ theme }) => ({
  width: "50%",
  height: "2.5rem",
}));

const AddmoreButton = Mui.styled(Mui.Button)(({ theme }) => ({
  width: "100%",
  height: "2.5rem",
  color: "#208BA5",
  border: "1.5px dashed #208BA5",
}));

const DeleteButton = Mui.styled(Mui.Button)(({ theme }) => ({
  width: "100%",
  height: "2.5rem",
  color: "#f8194b",
  border: "1.5px dashed #f8194b",
}));

export const ProductAndService = (
  props: Views.PostModel.OtherProps & FormikProps<Views.PostModel.FormData>
) => {
  const { values, touched, errors, handleChange, handleBlur } = props;
  const formikContext = useFormikContext();
  const [companyState, setCompanyState] = React.useState("Products");

  const addMoreProducts = (push: any) => {
    push({ product_image: "", product_title: "", product_description: "" });
  };

  const handleChangeCompanyType = (type: string) => {
    formikContext.setFieldValue("company", type);
    setCompanyState(type);
  };

  const titleOnChange = (value: string, index: number) => {
    formikContext.setFieldValue(`products[${index}].product_title`, value);
  };

  const handleDiscriptionChange = (value: string, index: number) => {
    formikContext.setFieldValue(
      `products[${index}].product_description`,
      value
    );
  };

  console.log(touched);

  return (
    <Mui.Box>
      <Mui.Typography sx={{ fontSize: "0.75rem" }}>
        Product/Service Details
      </Mui.Typography>
      <Mui.Grid sx={{ mt: "1rem" }} container spacing={2}>
        <Mui.Grid item xs={12} md={6}>
          <Mui.Stack spacing={2}>
            <Mui.Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              sx={{ width: "100%" }}
              spacing={2}
            >
              <Button
                variant={companyState === "Products" ? "contained" : "outlined"}
                onClick={() => handleChangeCompanyType("Products")}
              >
                Products
              </Button>
              <Button
                variant={companyState !== "Products" ? "contained" : "outlined"}
                onClick={() => handleChangeCompanyType("Serivces")}
              >
                Serivces
              </Button>
            </Mui.Stack>
            {/* <FieldArray name="products" validateOnChange>
              {({ push, remove }) => (
                <>
                  {values.products?.map((item, index) => (
                    <React.Fragment key={index}>
                      <ImageUpload index={index} />
                      <Mui.Box>
                        <Typography>Product {index + 1}: Title</Typography>
                        <TextField
                          size="small"
                          helperText={
                            touched?.products &&
                            touched?.products[index]?.product_title &&
                            errors?.products &&
                            (
                              errors?.products[
                                index
                              ] as Views.PostModel.Products
                            )?.product_title
                          }
                          error={Boolean(
                            touched?.products &&
                              touched?.products[index]?.product_title &&
                              errors?.products &&
                              (
                                errors?.products[
                                  index
                                ] as Views.PostModel.Products
                              )?.product_title
                          )}
                          name="products"
                          value={item.product_title}
                          onChange={(e) => titleOnChange(e.target.value, index)}
                          onBlur={handleBlur}
                        />
                      </Mui.Box>
                      <Mui.Box>
                        <Typography>
                          Product {index + 1}: Description
                        </Typography>
                        <TextField
                          multiline
                          minRows={4}
                          helperText={
                            touched?.products &&
                            touched?.products[index]?.product_description &&
                            errors?.products &&
                            (
                              errors?.products[
                                index
                              ] as Views.PostModel.Products
                            )?.product_description
                          }
                          error={Boolean(
                            touched?.products &&
                              touched?.products[index]?.product_description &&
                              errors?.products &&
                              (
                                errors?.products[
                                  index
                                ] as Views.PostModel.Products
                              )?.product_description
                          )}
                          name="products"
                          value={item.product_description}
                          onChange={(e) =>
                            handleDiscriptionChange(e.target.value, index)
                          }
                          onBlur={handleBlur}
                        />
                      </Mui.Box>
                      <Mui.Box>
                        <DeleteButton
                          startIcon={
                            <MuiIcons.Delete fontSize="small" color="error" />
                          }
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          Delete Product
                        </DeleteButton>
                      </Mui.Box>
                    </React.Fragment>
                  ))}
                  <AddmoreButton
                    startIcon={
                      <Mui.Box
                        width={"45%"}
                        component={"img"}
                        src={PlusImage.src}
                      />
                    }
                    onClick={() => addMoreProducts(push)}
                  >
                    Add Product
                  </AddmoreButton>
                </>
              )}
            </FieldArray> */}
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={6}>
          <Mui.Stack spacing={2}>
            <Mui.Box>
              <Typography>E-mail ID</Typography>
              <TextField
                size="small"
                helperText={touched.email_id && errors.email_id}
                error={Boolean(touched.email_id && errors.email_id)}
                name="email_id"
                value={values.email_id}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
            <Mui.Box>
              <Typography>Phone Number</Typography>
              <TextField
                size="small"
                helperText={touched.phone_number && errors.phone_number}
                error={Boolean(touched.phone_number && errors.phone_number)}
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  inputComponent:
                    PhoneField as React.ElementType<Mui.InputBaseComponentProps>,
                }}
              />
            </Mui.Box>
            <Mui.Box>
              <Typography>Address</Typography>
              <TextField
                size="small"
                helperText={touched.address && errors.address}
                error={Boolean(touched.address && errors.address)}
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
            <Mui.Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Mui.Box sx={{ width: "50%%" }}>
                <Typography>City</Typography>
                <TextField
                  size="small"
                  helperText={touched.city && errors.city}
                  error={Boolean(touched.city && errors.city)}
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Mui.Box>
              <Mui.Box sx={{ width: "50%" }}>
                <Typography>Province</Typography>
                <TextField
                  size="small"
                  helperText={touched.province_name && errors.province_name}
                  error={Boolean(touched.province_name && errors.province_name)}
                  name="province_name"
                  value={values.province_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Mui.Box>
            </Mui.Stack>
            <Mui.Box>
              <Typography>Postal Code</Typography>
              <TextField
                size="small"
                helperText={touched.postal_code && errors.postal_code}
                error={Boolean(touched.postal_code && errors.postal_code)}
                name="postal_code"
                value={values.postal_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
          </Mui.Stack>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};

const ImageUpload = ({ index }: any) => {
  const formikContext = useFormikContext();
  const imageRef = React.useRef<any>(null);
  const [postImages, setPostImages] = React.useState<any>("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        setPostImages(reader.result);
        formikContext.setFieldValue(`products[${index}].product_image`, file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Mui.Box>
      <Mui.Stack direction={"row"} alignItems="center" spacing={2}>
        <input
          name="image"
          ref={imageRef}
          type="file"
          accept=".jpg,.png,jpeg"
          onChange={onImageChange}
          hidden
        />
        <ImageContainer onClick={() => imageRef?.current?.click()}>
          <Mui.Box
            sx={{
              width: postImages !== "" ? "100%" : "30%",
              height: "inherit",
              objectFit: postImages === "" ? "contain" : "cover",
              borderRadius: "10px",
            }}
            component={"img"}
            src={postImages !== "" ? postImages : ImageUploadImage.src}
          />
        </ImageContainer>
        <Mui.Box
          sx={{ width: "40%" }}
          onClick={() => imageRef?.current?.click()}
        >
          <Mui.ListItem sx={{ p: 0 }}>
            <Mui.ListItemIcon>
              <Mui.Box
                sx={{ width: "30%" }}
                component={"img"}
                src={UploadIcon.src}
              />
            </Mui.ListItemIcon>
            <Mui.ListItemText
              sx={{ ml: "-2rem" }}
              primary={
                <Mui.Typography color={"primary"} sx={{ fontSize: "0.8rem" }}>
                  Upload Product Image
                </Mui.Typography>
              }
            />
          </Mui.ListItem>
          <Mui.Typography
            color={"primary"}
            sx={{ fontSize: "0.6rem", mt: "0.2rem" }}
          >
            Size upto 70 KB
          </Mui.Typography>
        </Mui.Box>
      </Mui.Stack>
    </Mui.Box>
  );
};
