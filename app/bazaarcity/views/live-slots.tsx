import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as MuiLab from "@mui/lab";
import * as Hooks from "hooks";
import * as React from "react";
import * as ReactQuery from "react-query";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import UploadImg from "assets/Icon feather-upload.png";
import CloseIcon from "assets/Icon ionic-ios-close-circle@2x.png";
import Checkbox from "assets/checkbox.png";
import * as Api from "api";
import { uploadNewImage } from "utils/cloudinary";
import * as Views from "../views";

const Description = Mui.styled("textarea")(({ theme }) => ({
  backgroundColor: "#FAF7FF",
  borderRadius: "20px",
  width: "100%",
  padding: "1rem",
  outline: "none",
  border: "none",
  fontSize: "0.8rem",
  fontFamily: "Haborosans-normal",
  lineHeight: 1,
  marginTop: 1,
}));

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

const Select = Mui.styled(Mui.Select)({
  width: "100%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
});
const UploadContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "80%",
  height: "13rem",
  padding: "10px",
  border: "1px dashed #9B7DD4",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "10px",
  marginTop: "20px",
  marginLeft: "50px",
}));

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-semibold",
  fontSize: "0.75rem",
});
export const LiveSlots = ({ open, onclose, refetchList }: any) => {
  const isMobile = Hooks.useMobileView();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    onclose();
  };

  return (
    <Mui.Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", p: 2 } }}
      maxWidth="md"
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
    >
      <Mui.Stack
        sx={{ width: "100%" }}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Mui.Typography
          sx={{
            fontSize: "1rem",
            mt: 1,
            fontWeight: 600,
            marginLeft: "40px",
            paddingTop: "10px",
          }}
          color={"#9B7DD4"}
        >
          Schedule LIVE
        </Mui.Typography>
        <Mui.IconButton onClick={handleClose}>
          <MuiIcons.Close />
        </Mui.IconButton>
      </Mui.Stack>
      <Mui.Stack sx={{ paddingTop: "-10px" }}>
        {" "}
        <Views.ProfileTabs />
      </Mui.Stack>

      {/* <Mui.Toolbar
        sx={{ borderBottom: "2px solid #EAEAEA", minHeight: "5px !important" }}
      >
      </Mui.Toolbar> */}

      {/* <Mui.DialogContent sx={{ pb: 0 }}>
      <Mui.Typography sx={{ fontSize: "0.75rem", color: "#707070" }}>
LIVE details           </Mui.Typography>
        <Mui.Grid container>
            
          <Mui.Grid item xs={6} sx={{ paddingRight: "10px" }}>
  
            <Mui.Typography sx={{ fontSize: "0.75rem" }}>
Enter title            </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              placeholder="Lorem ipsum"
            ></TextField>
          
          <Mui.Box sx={{ mt: 3 }}>
          <Mui.Typography sx={{ fontSize: "0.75rem" }}>
Short Description           </Mui.Typography>
        <Description
        
          rows={6}
          placeholder="Describe the purpose of Live"
        />
      </Mui.Box>
            
          </Mui.Grid>
          <Mui.Grid item xs={6} sx={{ paddingLeft: "10px" }}>
          <Mui.Typography sx={{ fontSize: "0.75rem" }}>
Select the Date          </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
             type="date"
            ></TextField>
                      <Mui.Stack spacing={1} sx={{paddingTop: "20px" }}>

           <Mui.Typography sx={{ fontSize: "0.75rem" }}>
Selected Time Slot          </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
             placeholder="05:00 - 06:00 pm"
            ></TextField>
           </Mui.Stack>
          
          </Mui.Grid>
        </Mui.Grid>
       
      </Mui.DialogContent> */}
      {/* <Mui.Toolbar
        sx={{ borderBottom: "2px solid #EAEAEA", minHeight: "3px !important" }}
      ></Mui.Toolbar>
      <Mui.DialogActions>
        <Mui.Button
          variant="contained"
          sx={{ m: "10px", marginRight: "20px", width: "15%" }}
        >
          Submit Details{" "}
        </Mui.Button>
      </Mui.DialogActions> */}
    </Mui.Dialog>
  );
};

export const LiveSlotDetails = ({ open, onclose, refetchList }: any) => {
  const [value, setValue] = React.useState("1");
  const theme = Mui.useTheme();
  const timeslot = Mui.useMediaQuery(theme.breakpoints.down(377));
  const reservedInfo = Mui.useMediaQuery(theme.breakpoints.down(400));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    onclose();
  };

  const timeSlots = [
    "09:00 - 10:00 am",
    "10:00 - 11:00 am",
    "11:00 - 12:00 am",
    "12:00 - 01:00 pm",
    "01:00 - 02:00 pm",
    "02:00 - 03:00 pm",
    "03:00 - 04:00 pm",
    "04:00 - 05:00 pm",
    "05:00 - 06:00 pm",
    "06:00 - 07:00 pm",
    "07:00 - 08:00 pm",
    "09:00 - 10:00 pm",
    "05:00 - 06:00 pm",
    "06:00 - 07:00 pm",
  ];

  return (
    <Mui.Stack spacing={2}>
      <Mui.Box>
        <Mui.Typography sx={{ fontSize: "0.75rem", color: "#707070", mb: 1 }}>
          Select your time slot
        </Mui.Typography>
        <Mui.Stack direction="row" flexWrap="wrap">
          {timeSlots.map((timeSlot: string, index: number) => (
            <Mui.Button
              fullWidth={timeslot}
              variant="outlined"
              key={index}
              sx={{ m: 1 }}
            >
              {timeSlot}
            </Mui.Button>
          ))}
        </Mui.Stack>
        <Mui.Stack
          direction={reservedInfo ? "column" : "row"}
          sx={{ mt: 2 }}
          spacing={1}
        >
          <Mui.Stack direction="row" alignItems="center">
            <Mui.Box
              sx={{
                backgroundColor: "#FAF7FF",
                width: "20px",
                height: "20px",
                borderRadius: 1,
                mx: 1,
              }}
            />
            <Mui.Typography sx={{ fontSize: "12px", whiteSpace: "nowrap" }}>
              Not Reserved
            </Mui.Typography>
          </Mui.Stack>
          <Mui.Stack direction="row" alignItems="center" sx={{ m: 1 }}>
            <Mui.Box
              sx={{
                border: "1px solid #9B7DD4",
                borderRadius: 1,
                width: "20px",
                height: "20px",
                mx: 1,
              }}
            />
            <Mui.Typography sx={{ fontSize: "12px", whiteSpace: "nowrap" }}>
              Reserved
            </Mui.Typography>
          </Mui.Stack>
          <Mui.Stack direction="row" alignItems="center" sx={{ m: 1 }}>
            <Mui.Box
              sx={{
                backgroundColor: "#CCBDE9",
                width: "20px",
                height: "20px",
                borderRadius: 1,
                mx: 1,
              }}
            />
            <Mui.Typography sx={{ fontSize: "12px", whiteSpace: "nowrap" }}>
              Selected
            </Mui.Typography>
          </Mui.Stack>
        </Mui.Stack>
      </Mui.Box>
      <Mui.Divider />
      <Mui.Typography sx={{ fontSize: "0.75rem", color: "#707070" }}>
        LIVE details
      </Mui.Typography>
      <Mui.Stack
        spacing={{ xs: 2, sm: 5 }}
        direction={{ xs: "column", sm: "row" }}
      >
        <Mui.Box width={{ xs: "100%", sm: "50%" }}>
          <Mui.Stack spacing={2}>
            <Mui.Box>
              <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                Enter title
              </Mui.Typography>
              <TextField sx={{ mt: 1 }} fullWidth placeholder="Lorem ipsum" />
            </Mui.Box>
            <Mui.Box>
              <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                Short Description
              </Mui.Typography>
              <Description
                rows={6}
                placeholder="Describe the purpose of Live"
              />
            </Mui.Box>
          </Mui.Stack>
        </Mui.Box>
        <Mui.Box width={{ xs: "100%", sm: "50%" }}>
          <Mui.Stack spacing={2}>
            <Mui.Box>
              <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                Select the Date
              </Mui.Typography>
              <TextField fullWidth sx={{ mt: 1 }} type="date"></TextField>
            </Mui.Box>
            <Mui.Box>
              <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                Selected Time Slot
              </Mui.Typography>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                placeholder="05:00 - 06:00 pm"
              />
            </Mui.Box>
          </Mui.Stack>
        </Mui.Box>
      </Mui.Stack>
      <Mui.Divider />
      <Mui.DialogActions>
        <Mui.Button variant="contained" size="large">
          Submit Details
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Stack>
  );
};
