import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import UploadImg from "assets/Icon feather-upload.png";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import { uploadNewImage } from "utils/cloudinary";
import * as MuiLabs from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import * as Api from "api";
import * as Notistack from "notistack";
import * as kijiji from "kijiji-scraper";

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

const UploadContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "15rem",
  overflow: "hidden",
  border: "1px dashed #9B7DD4",
  marginTop: "20px",
  cursor: "pointer",
  borderRadius: "10px",
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const timeConvertor = (time: string) =>
  +time.split(":")[0] > 12
    ? `${((+time.split(":")[0] - 12) > 10 ? (+time.split(":")[0] - 12) : ('0' + (+time.split(":")[0] - 12))).toString() + ":" + time.split(":")[1]} PM`
    : `${time} AM`;

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <Mui.DialogTitle sx={{ m: 0, p: 2, pb: 1 }} {...other}>
      {children}
      {onClose ? (
        <Mui.IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MuiIcons.Close />
        </Mui.IconButton>
      ) : null}
    </Mui.DialogTitle>
  );
};

export const AddEventDialog = ({
  open,
  onClose,
  refetch,
}: main & { refetch: any }) => {
  const [startTime, setStartTime] = React.useState("");
  const imageRef = React.useRef<any>(null);
  const { enqueueSnackbar } = Notistack.useSnackbar();
  const [selectedValue, setSelectedValue] = React.useState("yes");
  const [buttonType, setButtonType] = React.useState("nonprofit");
  const [postImages, setPostImages] = React.useState<any>("");
  const [imageFile, setImageFile] = React.useState<any>("");
  const [value, setValue] = React.useState<Date | null>(null);
  const [endTime, setEndTime] = React.useState("");
  const [values, setValues] = React.useState({
    name_of_the_event: "",
    province_name: "",
    city: "",
    organization_type: buttonType,
    organization_name: "",
    authorized_by_organization: selectedValue === "yes" ? 1 : 0,
    state_of_organization: "",
  });
  const [loading, setLoading] = React.useState(false)

  const handleChange = (newValue: any) => {
    setValue(newValue.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const files: any = e.target.files;
    if (files && files.length !== 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        setPostImages(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeStartime = (event: any) => {
    console.log(event.target.value)
    setStartTime(event.target.value);
  };

  const handleChangeEndTime = (event: any) => {
    setEndTime(event.target.value);
  };

  const postEvents = async () => {
    try {
      setLoading(true)
      const imageURL = await uploadNewImage(imageFile);
      const postData = {
        poster_image: imageURL,
        ...values,
        date: value?.toString(),
        event_time: timeConvertor(startTime) + " - " + timeConvertor(endTime),
      };
      await Api.Server.Client().post(
        Api.Server.ApiRoutes.pnation.postEvent,
        postData
      );
      refetch();
      setStartTime("")
      setEndTime("");
      setValue(null);
      setPostImages("");
      setValues({
        name_of_the_event: "",
        province_name: "",
        city: "",
        organization_type: "",
        organization_name: "",
        authorized_by_organization: 0,
        state_of_organization: "",
      });
      onClose();
      setLoading(false)
    } catch (err) {
      console.log(err);
      setValues({
        name_of_the_event: "",
        province_name: "",
        city: "",
        organization_type: "",
        organization_name: "",
        authorized_by_organization: 0,
        state_of_organization: "",
      });
      onClose();
      enqueueSnackbar("something went wrong add events", {
        preventDuplicate: false,
        persist: false,
        variant: "error",
      });
    }
  };

  return (
    <Mui.Dialog
      open={open}
      onClose={() => {
        onClose();
        setPostImages("");
      }}
      maxWidth="md"
      fullWidth
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={() => {
          onClose();
          setPostImages("");
        }}
      >
        <Mui.Typography
          sx={{ fontSize: "1rem", fontWeight: 600, mt: 3, ml: 1 }}
          color="primary"
        >
          Add Event
        </Mui.Typography>
      </BootstrapDialogTitle>
      <Mui.DialogContent sx={{ pb: 0 }}>
        <Mui.Box
          sx={{
            overflow: "auto",
            borderTop: "1px solid #0000002e",
            borderBottom: "1px solid #0000002e",
          }}
        >
          <Mui.Grid container sx={{ mt: 2, mb: 2 }}>
            <Mui.Grid item md={6} xs={12} sx={{ paddingRight: "10px" }}>
              <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                Name of the Event
              </Mui.Typography>
              <TextField
                fullWidth
                sx={{ mt: 1 }}
                value={values.name_of_the_event}
                onChange={(e) =>
                  setValues((preData) => ({
                    ...preData,
                    name_of_the_event: e.target.value,
                  }))
                }
              ></TextField>
              <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px", mb: 1 }}>
                Event Date
              </Mui.Typography>
              <TextField type="date" value={value} onChange={handleChange} ></TextField>
              <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px", mb: 1 }}>
                Event Time
              </Mui.Typography>
              <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={6}>
                  <TextField type="time" value={startTime} onChange={handleChangeStartime}></TextField>
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <TextField type="time" value={endTime} onChange={handleChangeEndTime}></TextField>
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={6}>
                  <Mui.Typography
                    sx={{ fontSize: "0.75rem", marginTop: "20px" }}
                  >
                    City
                  </Mui.Typography>
                  <TextField
                    value={values.city}
                    onChange={(e) =>
                      setValues((preData) => ({
                        ...preData,
                        city: e.target.value,
                      }))
                    }
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                  ></TextField>
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Mui.Typography
                    sx={{ fontSize: "0.75rem", marginTop: "20px" }}
                  >
                    {" "}
                    Province
                  </Mui.Typography>
                  <Mui.Select
                    value={values.province_name}
                    onChange={(e) =>
                      setValues((preData) => ({
                        ...preData,
                        province_name: e.target.value,
                      }))
                    }
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                    MenuProps={{ sx: { maxHeight: "200px" } }}
                  >
                    {Object.keys(kijiji.locations).slice(1).map((item, i) => {
                      return <Mui.MenuItem value={item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase()} key={i}>
                        {item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase()}
                      </Mui.MenuItem>
                    })}
                  </Mui.Select>
                </Mui.Grid>
              </Mui.Grid>
              <UploadContainer onClick={() => imageRef.current.click()}>
                {postImages !== "" ? (
                  <Mui.CardMedia
                    component="img"
                    src={postImages}
                    sx={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <Mui.Stack spacing={2} alignItems={"center"}>
                    <Mui.Box
                      component="img"
                      width={"20%"}
                      src={ImageUploadImage.src}
                    />
                    <Mui.Stack direction={"row"} spacing={2}>
                      <Mui.CardMedia
                        component={"img"}
                        sx={{
                          width: "15px",
                          objectFit: "contain",
                        }}
                        src={UploadImg.src}
                      ></Mui.CardMedia>
                      <Mui.Typography
                        sx={{ fontSize: "0.8rem" }}
                        color="primary"
                      >
                        Upload Poster Image
                      </Mui.Typography>
                    </Mui.Stack>
                    <Mui.Typography
                      sx={{ fontSize: "0.75rem" }}
                      color="#9B7DD489"
                    >
                      Size upto 2 MB
                    </Mui.Typography>
                  </Mui.Stack>
                )}

                <input
                  name="image"
                  ref={imageRef}
                  type="file"
                  accept=".jpg,.png,jpeg"
                  onChange={onImageChange}
                  hidden
                />
              </UploadContainer>
            </Mui.Grid>

            <Mui.Grid item md={6} xs={12} sx={{ paddingLeft: "10px", mt: { md: 0, xs: 2 } }}>
              <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                Which kind of Organization are you ?
              </Mui.Typography>
              <Mui.Button
                variant={buttonType === "nonprofit" ? "contained" : "outlined"}
                sx={{ mt: 1, width: "48%", mr: "2%", height: "2.5rem" }}
                onClick={() => setButtonType("nonprofit")}
              >
                Non-Profit
              </Mui.Button>
              <Mui.Button
                variant={buttonType === "private" ? "contained" : "outlined"}
                sx={{ mt: 1, width: "48%", ml: "2%", height: "2.5rem" }}
                onClick={() => setButtonType("private")}
              >
                Private
              </Mui.Button>
              <Mui.Typography sx={{ fontSize: "0.75rem", mt: "20px" }}>
                Name of the Organization
              </Mui.Typography>
              <TextField
                value={values.organization_name}
                onChange={(e) =>
                  setValues((preData) => ({
                    ...preData,
                    organization_name: e.target.value,
                  }))
                }
                size="small"
                fullWidth
                sx={{ mt: 1 }}
              ></TextField>
              <Mui.Typography sx={{ fontSize: "0.75rem", mt: "28px" }}>
                Are you authorized by the organization to post this event?
              </Mui.Typography>
              <Mui.FormControl sx={{ mb: 2 }}>
                <Mui.RadioGroup
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <Mui.FormControlLabel
                    value="yes"
                    control={<Mui.Radio />}
                    label={
                      <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                        yes
                      </Mui.Typography>
                    }
                  />
                  <Mui.FormControlLabel
                    value="no"
                    control={<Mui.Radio />}
                    label={
                      <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                        No
                      </Mui.Typography>
                    }
                  />
                </Mui.RadioGroup>
              </Mui.FormControl>
              <Mui.Typography sx={{ fontSize: "0.75rem", mt: "5px" }}>
                State your Position in the Organization
              </Mui.Typography>
              <TextField
                value={values.state_of_organization}
                onChange={(e) =>
                  setValues((preData) => ({
                    ...preData,
                    state_of_organization: e.target.value,
                  }))
                }
                size="small"
                fullWidth
                sx={{ mt: 1 }}
              ></TextField>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Box>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button
          onClick={postEvents}
          variant="contained"
          sx={{ m: "10px", marginRight: "20px" }}
          disabled={loading}
        >
          Submit Details
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  );
};

interface main {
  open: boolean;
  onClose: () => void;
}
