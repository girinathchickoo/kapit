import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import { uploadNewImage } from "utils/cloudinary"; 
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TextField = Mui.styled(Mui.TextField)({
  width: "80%",
  // height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  padding : '0 !important',
  backgroundColor: "#FAF7FF",
  overflow:'hidden', 
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    padding : '0 !important',
    border: "none", 
  },
  "&.MuiTextField-root": {
    backgroundColor : 'transparent !important'
  },
  "&.MuiInput-input": {
    paddingTop:'9px !important',
    paddingBottom:'9px !important'
  },
}
);
 

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

const ageGroup = ["18-29", "30-39", "40-49", "50-59", "60+"];

const HomecitiesList = [
  "None",
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

export const EditDetails = (props: any) => {

    
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

const TextField = Mui.styled(Mui.TextField)({
  width: matches ? '100%':"80%",
  // height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  padding : '0 !important',
  backgroundColor: "#FAF7FF",
  overflow:'hidden', 
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    padding : '0 !important',
    border: "none", 
  },
  "&.MuiTextField-root": {
    backgroundColor : 'transparent !important'
  },
  "&.MuiInput-input": {
    paddingTop:'9px !important',
    paddingBottom:'9px !important'
  },
}
);
 

const Select = Mui.styled(Mui.Select)({
  width: matches ? '100%':"80%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
});


  const { values, errors, touched, handleChange, handleBlur, submitForm } =
    props;
  const [default1, setDefault1] = React.useState(values.gender);

  return (
    <Mui.Box>
      <Mui.Stack spacing={3}>
        <Mui.Stack spacing={1}>
          <Typography>User Name</Typography>
          <TextField
            name="full_name"
            value={values?.full_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.full_name && errors?.full_name)}
            helperText={touched?.full_name && errors?.full_name}
          />
          {console.log("error msg", touched?.full_name && errors?.full_name)}
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>E-mail ID</Typography>
          <TextField
            name="eMail_id"
            value={values?.eMail_id}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.email && errors?.email)}
            helperText={touched?.email && errors?.email}
          />
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>Gender</Typography>
          <Mui.FormControl>
            <Select
              error={Boolean(touched?.gender && errors?.gender)}
              onBlur={handleBlur}
              name="gender"
              defaultValue={values?.gender}
              // value={values?.gender}

              onChange={handleChange}
            >
              <Mui.MenuItem value="male">Male</Mui.MenuItem>
              <Mui.MenuItem value="female">Female</Mui.MenuItem>
              <Mui.MenuItem value="others">Others</Mui.MenuItem>
            </Select>
            <Mui.FormHelperText error>
              {touched?.gender && errors?.gender}
            </Mui.FormHelperText>
          </Mui.FormControl>
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>City</Typography>
          <TextField
            name="city"
            value={values?.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.city && errors?.city)}
            helperText={touched?.city && errors?.city}
          />
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>If not in Canada, state your City and Country</Typography>
          <TextField
            name="current_city"
            value={values?.current_city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.current_city && errors?.current_city)}
            helperText={touched?.current_city && errors?.current_city}
          />
        </Mui.Stack>
        
        <Mui.Stack spacing={1}>
          <Typography>Hobbies & Interests</Typography>
          <TextField
            name="hobbies"
            value={values?.hobbies}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.hobbies && errors?.Hobbies)}
            helperText={touched?.hobbies && errors?.hobbies}
          />
        </Mui.Stack>
      </Mui.Stack>
    </Mui.Box>
  );
};

export const Column2 = (props: any) => {
const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.down('sm'));

const TextField = Mui.styled(Mui.TextField)({
  width: matches ? '100%':"80%",
  // height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  padding : '0 !important',
  backgroundColor: "#FAF7FF",
  overflow:'hidden', 
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    padding : '0 !important',
    border: "none", 
  },
  "&.MuiTextField-root": {
    backgroundColor : 'transparent !important'
  },
  "&.MuiInput-input": {
    paddingTop:'9px !important',
    paddingBottom:'9px !important'
  },
}
);
 

const Select = Mui.styled(Mui.Select)({
  width: matches ? '100%':"80%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
});


  const { values, errors, touched, handleChange, handleBlur, submitForm } =
    props;
  return (
    <Mui.Box>
      <Mui.Stack spacing={3}>
        <Mui.Stack spacing={1}>
          <Typography>Full Name</Typography>
          <TextField
            name="username"
            value={values?.username}
            // value={values?.username !== '' || values?.username !== null ?  values?.username : values?.full_name }
            // value={values?.username === null || values?.username === '' ? values?.full_name : values?.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.username && errors?.username)}
            helperText={touched?.username && errors?.username}
          />
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>Phone Number</Typography>
          <TextField
            name="phone_number"
            value={values?.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.phone_number && errors?.phone_number)}
            helperText={touched?.phone_number && errors?.phone_number}
          />
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>Age Group</Typography>
          <Mui.FormControl>
            <Select
              error={Boolean(touched?.age_group && errors?.age_group)}
              onBlur={handleBlur}
              name="age_group"
              value={values?.age_group}
              onChange={handleChange}
            >
              {ageGroup.map((item, index) => (
                <Mui.MenuItem key={index} value={item}>
                  {item}
                </Mui.MenuItem>
              ))}
            </Select>
            <Mui.FormHelperText error>
              {touched?.age_group && errors?.age_group}
            </Mui.FormHelperText>
          </Mui.FormControl>
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>Province</Typography>
          <Mui.FormControl>
            <Select
              error={Boolean(touched?.home_country && errors?.home_country)}
              onBlur={handleBlur}
              name="home_country"
              value={values?.home_country}
              onChange={handleChange}
            >
              {HomecitiesList.map((item, index) => (
                <Mui.MenuItem key={index} value={item}>
                  {item}
                </Mui.MenuItem>
              ))}
            </Select>
            <Mui.FormHelperText error>
              {touched?.home_country && errors?.home_country}
            </Mui.FormHelperText>
          </Mui.FormControl>
        </Mui.Stack>
        <Mui.Stack spacing={1}>
          <Typography>Hometown or homecity in the Philippines</Typography>
          <TextField
            name="current_city"
            value={values?.current_city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.current_city && errors?.current_city)}
            helperText={touched?.current_city && errors?.current_city}
          />
        </Mui.Stack>
        {/* <Mui.Stack spacing={1}>
          <Typography>Hometown or homecity in the Philippines</Typography>
          <Mui.FormControl>
            <Select
              error={Boolean(touched?.home_country && errors?.home_country)}
              onBlur={handleBlur}
              name="home_country"
              value={values?.home_country}
              onChange={handleChange}
            >
              {HomecitiesList.map((item, index) => (
                <Mui.MenuItem key={index} value={item}>
                  {item}
                </Mui.MenuItem>
              ))}
            </Select>
            <Mui.FormHelperText error>
              {touched?.home_country && errors?.home_country}
            </Mui.FormHelperText>
          </Mui.FormControl>
        </Mui.Stack> */}
        
         <Mui.Stack spacing={1}>
          <Typography>Industry you’re working in</Typography>
          <TextField
            name="industry_working_in"
            value={values?.industry_working_in}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(
              touched?.industry_working_in && errors?.industry_working_in
            )}
            helperText={
              touched?.industry_working_in && errors?.industry_working_in
            }
          />
        </Mui.Stack>
      </Mui.Stack>
    </Mui.Box>
  );
};

export const Column3 = (props: any) => {

const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.down('sm'));

const TextField = Mui.styled(Mui.TextField)({
  width: matches ? '100%':"80%",
  // height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  padding : '0 !important',
  backgroundColor: "#FAF7FF",
  overflow:'hidden', 
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    padding : '0 !important',
    border: "none", 
  },
  "&.MuiTextField-root": {
    backgroundColor : 'transparent !important'
  },
  "&.MuiInput-input": {
    paddingTop:'9px !important',
    paddingBottom:'9px !important'
  },
}
);

  const { values, errors, touched, handleChange, handleBlur, submitForm } =
    props;
  return (
    <Mui.Box>
      <Mui.Stack spacing={3}>
        <Mui.Stack spacing={1}>
          <Typography>My Favourite Quote</Typography>
          <TextField
            name="favorite_quote"
            value={values?.favorite_quote}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched?.favorite_quote && errors?.favorite_quote)}
            helperText={touched?.favorite_quote && errors?.favorite_quote}
          />
        </Mui.Stack>
      </Mui.Stack>
    </Mui.Box>
  );
};

export const ProfileUpload = (props: any) => {
  
  const { values, getphoto } = props;

  console.log("values", values)
  const [profilePic, setProfilPic] = React.useState<any>(values?.profile_photo);
  const imageRef = React.useRef<any>(null);

  React.useEffect(() => {
    getphoto(values?.profile_photo);
    setProfilPic(values?.profile_photo);
    console.log("values?.profile_photo", values?.profile_photo);
  }, [values]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   
    event.persist();
    const files = event.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        setProfilPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
    photoUpload(event?.target?.files);
  };

  const photoUpload = async (props: any) => {
    const data = await uploadNewImage(props[0]);
    callbackimg(data);
  };

  const callbackimg = async (props: any) => {
    console.log("uploaded img path", props);
    await getphoto(props);
  };

  return (
    <Mui.Box>
      <Mui.Stack spacing={2}>
        <Mui.Box>
          <input
            name="profileImg"
            type="file"
            accept=".jpg,.png,jpeg"
            onChange={onImageChange}
            ref={imageRef}
            hidden
          />
          <Mui.Avatar
            src={profilePic}
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
              Upload Profile Picture
            </Mui.Typography>
          </Mui.Stack>
        </Mui.Box>
      </Mui.Stack>
    </Mui.Box>
  );
};
