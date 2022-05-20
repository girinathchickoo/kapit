import * as React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { uploadNewImage } from "utils/cloudinary";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TextField = Mui.styled(Mui.TextField)({
  width: "80%",
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

const Select = Mui.styled(Mui.Select)({
  width: "80%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
});

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.75rem",
});

export const BusinessDetails = (props: any) => {
   
const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.down('sm'));

const TextField = Mui.styled(Mui.TextField)({
  width: matches ? '100%':"80%",
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

const Select = Mui.styled(Mui.Select)({
  width: matches ? '100%':"80%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
});
  const { values, errors, touched, handleChange, handleBlur } = props;
  const [state2, setState2] = React.useState<any>("");

  const logoupload = (res: any) => {
    setState2(res);
  };
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12} sm={4}>
        <Mui.Stack spacing={3}>
          <Mui.Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
          ></Mui.Stack>
          <Mui.Stack spacing={1}>
            <Typography>Business/Company Name</Typography>
            <TextField
              size="small"
              name="business_name"
              value={values?.business_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched?.business_name && errors?.business_name)}
              helperText={touched?.business_name && errors?.business_name}
            />
          </Mui.Stack>
          <Mui.Stack spacing={1}>
            <Typography>About your Company/Business</Typography>
            <TextField
              size="small"
              name="business_description"
              value={values?.business_description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(
                touched?.business_description && errors?.business_description
              )}
              helperText={
                touched?.business_description && errors?.business_description
              }
            />
          </Mui.Stack>
        </Mui.Stack>
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={4}>
        <Mui.Stack spacing={3}>
          <Mui.Stack spacing={1}>
            <Typography>Nature of Business</Typography>
            <TextField
              size="small"
              name="nature_of_business"
              value={values?.nature_of_business}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(
                touched?.nature_of_business && errors?.nature_of_business
              )}
              helperText={
                touched?.nature_of_business && errors?.nature_of_business
              }
            />
          </Mui.Stack>
          <Mui.Stack spacing={1}>
            <Typography>Professional License Number</Typography>
            <TextField
              size="small"
              name="professional_license_number"
              value={values?.professional_license_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(
                touched?.professional_license_number &&
                  errors?.professional_license_number
              )}
              helperText={
                touched?.professional_license_number &&
                errors?.professional_license_number
              }
            />
          </Mui.Stack>
          <Mui.Stack spacing={1}>
            <Typography>Brokerage License Number</Typography>
            <TextField
              size="small"
              name="brokerage_license_number"
              value={values?.brokerage_license_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(
                touched?.brokerage_license_number &&
                  errors?.brokerage_license_number
              )}
              helperText={
                touched?.brokerage_license_number &&
                errors?.brokerage_license_number
              }
            />
          </Mui.Stack>
        </Mui.Stack>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export const LogoUpload = (props: any) => {
  const { values, getlogo } = props;

  const [businessLogo, setBusinessLogo] = React.useState<any>(
    values?.business_logo
  );
  const imageRef = React.useRef<any>(null);

  React.useEffect(() => {
    getlogo(values?.business_logo);
  }, [values]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        setBusinessLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
    photoUpload(event?.target?.files);
  };

  const photoUpload = async (props: any) => {
    const data = await uploadNewImage(props[0]);
    callbackimg(data);
  };

  const callbackimg = (props: any) => {
    getlogo(props);
  };

  return (
    <Mui.Box>
      <Mui.Stack spacing={2}>
        <Mui.Box>
          <input
            name="business_logo"
            type="file"
            accept=".jpg,.png,jpeg"
            onChange={onImageChange}
            ref={imageRef}
            hidden
          />
          <Mui.Avatar
            src={businessLogo}
            sx={{
              width: "8rem",
              height: "8rem",
              backgroundColor: "#FAF7FF",
              color: "#9B7DD4",
              mt: 5,
              borderRadius: "20px",
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
              cursor: "pointer",
              color: "#9B7DD4",
            }}
            onClick={() => imageRef.current.click()}
          >
            <MuiIcons.FileUpload sx={{ fontSize: "0.85rem" }} />
            <Mui.Typography sx={{ fontSize: "0.75rem" }}>
              Upload Logo
            </Mui.Typography>
          </Mui.Stack>
        </Mui.Box>
      </Mui.Stack>
    </Mui.Box>
  );
};
