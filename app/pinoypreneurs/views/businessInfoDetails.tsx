import * as Mui from "@mui/material";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import UploadIcon from "assets/Icon feather-upload@2x.png";
import * as Views from "app/pinoypreneurs/views";
import { FormikProps, useFormikContext } from "formik";
import * as React from "react";
import * as kijiji from "kijiji-scraper";

const TextField = Mui.styled(Mui.TextField)(({ theme }) => ({
  // backgroundColor: "#FAF7FF",
  borderRadius: "10px",
  width: "100%",
  "& .MuiOutlinedInput-input": {
    fontSize: "0.75rem",
    fontFamily: "Haborosans-normal",
    lineHeight: 1.4,
  },
  // height: "2.6rem",
}));

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
  marginBottom: "0.3rem",
});

const SelectField = Mui.styled(Mui.Select)({
  width: "100%",
  backgroundColor: "#FAF7FF",
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
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

export const BusinessInfoDetails = (
  props: Views.PostModel.OtherProps & FormikProps<Views.PostModel.FormData>
) => {
  const { values, touched, errors, handleChange, handleBlur } = props;
  console.log(values);
  return (
    <Mui.Box>
      <Mui.Typography sx={{ fontSize: "0.75rem" }}>
        Please fill your business/company details
      </Mui.Typography>
      <Mui.Grid sx={{ mt: "1rem" }} container spacing={2}>
        <Mui.Grid item xs={12} md={6}>
          <Mui.Stack spacing={2}>
            <ImageUpload />
            <Mui.Box>
              <Typography>Business/Company Name</Typography>
              <TextField
                size="small"
                helperText={touched.business_name && errors.business_name}
                error={Boolean(touched.business_name && errors.business_name)}
                name="business_name"
                value={values.business_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
            <Mui.Box>
              <Typography>About your Company/Business</Typography>
              <TextField
                multiline
                minRows={4}
                helperText={
                  touched.business_description && errors.business_description
                }
                error={Boolean(
                  touched.business_description && errors.business_description
                )}
                name="business_description"
                value={values.business_description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
            <Mui.Box>
              <Typography>Your title</Typography>
              <TextField
                size="small"
                helperText={touched.position && errors.position}
                error={Boolean(touched.position && errors.position)}
                name="position"
                value={values.position}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={6}>
          <Mui.Stack spacing={2}>
            <Mui.Box>
              <Typography>Nature of Business</Typography>
              <TextField
                size="small"
                helperText={
                  touched.nature_of_business && errors.nature_of_business
                }
                error={Boolean(
                  touched.nature_of_business && errors.nature_of_business
                )}
                name="nature_of_business"
                value={values.nature_of_business}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
            <Mui.Box>
              <Typography>Category</Typography>
              <SelectField
                size="small"
                error={Boolean(touched.category && errors.category)}
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                MenuProps={{ sx: { maxHeight: "200px" } }}
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
            </Mui.Box>
            <Mui.Box>
              <Typography>
                Professional License Number (if applicable)
              </Typography>
              <TextField
                size="small"
                helperText={
                  touched.professional_license_number &&
                  errors.professional_license_number
                }
                error={Boolean(
                  touched.professional_license_number &&
                  errors.professional_license_number
                )}
                name="professional_license_number"
                value={values.professional_license_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
            <Mui.Box>
              <Typography>Brokerage License Number (if applicable)</Typography>
              <TextField
                size="small"
                helperText={
                  touched.brokerage_license_number &&
                  errors.brokerage_license_number
                }
                error={Boolean(
                  touched.brokerage_license_number &&
                  errors.brokerage_license_number
                )}
                name="brokerage_license_number"
                value={values.brokerage_license_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
            <Mui.Box>
              <Typography>Company Website Link (if any)</Typography>
              <TextField
                size="small"
                helperText={
                  touched.company_website_link && errors.company_website_link
                }
                error={Boolean(
                  touched.company_website_link && errors.company_website_link
                )}
                name="company_website_link"
                value={values.company_website_link}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Mui.Box>
          </Mui.Stack>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Divider sx={{ mt: "2rem", mb: "2rem" }} />
      <Views.ProductAndService {...props} />
    </Mui.Box>
  );
};

const ImageUpload = () => {
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
        formikContext.setFieldValue("business_logo", file);
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
              width: postImages !== "" ? "100%" : "25%",
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
                sx={{ width: "30%", objectFit: "contain" }}
                component={"img"}
                src={UploadIcon.src}
              />
            </Mui.ListItemIcon>
            <Mui.ListItemText
              sx={{ ml: "-2rem" }}
              primary={
                <Mui.Typography color={"primary"} sx={{ fontSize: "0.8rem" }}>
                  Upload
                </Mui.Typography>
              }
            />
          </Mui.ListItem>
          <Mui.Typography
            color={"primary"}
            sx={{ fontSize: "0.6rem", mt: "0.2rem" }}
          >
            Size upto 1.5 MB
          </Mui.Typography>
        </Mui.Box>
      </Mui.Stack>
    </Mui.Box>
  );
};
