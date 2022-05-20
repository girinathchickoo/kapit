import * as Api from "api";
import * as Hooks from "hooks";
import * as React from "react";
import * as MuiLabs from "@mui/lab";
import * as Query from "react-query";
import * as Mui from "@mui/material";
import * as NextRouter from "next/router";
import * as MuiIcons from "@mui/icons-material";
import { uploadNewImage } from "utils/cloudinary";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import * as kijiji from "kijiji-scraper";
import UploadImg from "assets/Icon feather-upload.png";
import * as Notistack from "notistack";

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

const timeConvertor = (time: string) =>
  +time.split(":")[0] > 12
    ? `${(+time.split(":")[0] - 12 > 10
      ? +time.split(":")[0] - 12
      : "0" + (+time.split(":")[0] - 12)
    ).toString() +
    ":" +
    time.split(":")[1]
    } PM`
    : `${time} AM`;

const reverseTimeConvertor = (time: string) => {
  const [start, end] = time.split(" - ");
  const [startHour, startMin] = start.split(" ")[0].split(":");
  const [endHour, endMin] = end.split(" ")[0].split(":");

  const startTime =
    start.split(" ")[1] === "PM"
      ? `${(12 + Number(startHour)) < 10 ? "0" + (12 + Number(startHour)) : (12 + Number(startHour))}:${(Number(startMin)) < 10 ? "0" + Number(startMin) : Number(startMin)}`
      : `${Number(startHour) < 10 ? "0" + Number(startHour) : Number(startHour)}:${Number(startMin) < 10 ? "0" + Number(startMin) : Number(startMin)}`;

  const endTime =
    end.split(" ")[1] === "PM"
      ? `${(12 + Number(endHour)) < 10 ? "0" + (12 + Number(endHour)) : (12 + Number(endHour))}:${(Number(endMin)) < 10 ? "0" + Number(endMin) : Number(endMin)}`
      : `${Number(endHour) < 10 ? "0" + Number(endHour) : Number(endHour)}:${Number(endMin) < 10 ? "0" + Number(endMin) : Number(endMin)}`;

  return [startTime, endTime];
};

export const EditPost = ({ post }: { post: PnationPost }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editDialog, setEditDialog] = React.useState(false);
  const router = NextRouter.useRouter();
  const client = Query.useQueryClient();
  const open = Boolean(anchorEl);
  console.log(post);
  //   view specific
  const isMobile = Hooks.useMobileView();
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    name_of_the_event: post?.name_of_the_event,
    province_name: post?.province_name,
    city: post?.city,
    organization_type: post?.organization_type,
    organization_name: post?.organization_name,
    authorized_by_organization: post?.authorized_by_organization,
    state_of_organization: post?.state_of_organization,
  });
  const imageRef = React.useRef<any>(null);
  const [postImages, setPostImages] = React.useState<any>(post?.poster_image);
  const [buttonType, setButtonType] = React.useState(post?.organization_type);
  const [selectedValue, setSelectedValue] = React.useState(
    post?.authorized_by_organization === 1 ? "yes" : "no"
  );
  const [value, setValue] = React.useState<Date | null>(
    post?.event_date_in_local
  );

  const [startTime, setStartTime] = React.useState(reverseTimeConvertor(post?.event_time)[0]);
  const [endTime, setEndTime] = React.useState(reverseTimeConvertor(post?.event_time)[1]);
  const { enqueueSnackbar } = Notistack.useSnackbar();
  const [imageFile, setImageFile] = React.useState<any>("");

  // React.useEffect(() => {
  // const [st, et] = reverseTimeConvertor(post?.event_time);

  // console.log("skfj", st, et)
  //   setStartTime(st);
  //   setEndTime(et);
  // });

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    setEditDialog(!editDialog);
  };

  const handleDeletePost = async () => {
    await Api.Server.Client().post(Api.Server.ApiRoutes.pnation.deletePost, {
      post_id: post._id,
    });
    client.invalidateQueries("viewPnation");
    router.back();
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files || [];
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

  const postData = async () => {
    try {
      setIsLoading(true);
      const imageURL = await uploadNewImage(imageFile);
      const postData = {
        poster_image: imageURL,
        ...values,
        date: value?.toString(),
        event_time: timeConvertor(startTime) + " - " + timeConvertor(endTime),
        post_id: post?._id,
      };
      await Api.Server.Client().post(
        Api.Server.ApiRoutes.pnation.editPost,
        postData
      );
      client.invalidateQueries("viewPnation");
      handleEditPost();
      setIsLoading(false);
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
      handleEditPost();
      enqueueSnackbar("something went wrong", {
        preventDuplicate: false,
        persist: false,
        variant: "error",
      });
    }
  };

  const handleChange = (newValue: any) => {
    setValue(newValue.target.value);
  };

  const handleChangeStartime = (event: any) => {
    console.log("TIME", event.target.value, typeof event.target.value);

    setStartTime(event.target.value);
  };

  const handleChangeEndTime = (event: any) => {
    console.log("TIME", event.target.value, typeof event.target.value);

    setEndTime(event.target.value);
  };

  return (
    <>
      {post?.uid === localStorage.getItem("uid") ? (
        <Mui.IconButton
          id="more-button"
          aria-controls={open ? "more-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
        >
          <MuiIcons.MoreVert />
        </Mui.IconButton>
      ) : null}

      <Mui.Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "more-button",
        }}
      >
        <Mui.MenuItem onClick={handleEditPost}>Edit</Mui.MenuItem>
        <Mui.MenuItem onClick={handleDeletePost}>Delete</Mui.MenuItem>
      </Mui.Menu>

      <Mui.Dialog
        open={editDialog}
        onClose={handleEditPost}
        sx={{ "& .MuiDialog-paper": { width: "100%", p: 2 } }}
        maxWidth="md"
        fullScreen={isMobile}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleEditPost}
        >
          <Mui.Typography
            sx={{ fontSize: "1rem", fontWeight: 600, mt: 3, ml: 1 }}
            color="primary"
          >
            Edit Event
          </Mui.Typography>
        </BootstrapDialogTitle>
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
              <Mui.Typography
                sx={{ fontSize: "0.75rem", marginTop: "20px", mb: 1 }}
              >
                Event Date
              </Mui.Typography>
              <TextField
                type="date"
                value={value}
                onChange={handleChange}
              ></TextField>
              <Mui.Typography
                sx={{ fontSize: "0.75rem", marginTop: "20px", mb: 1 }}
              >
                Event Time
              </Mui.Typography>
              <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={6}>
                  <TextField
                    type="time"
                    value={startTime}
                    onChange={handleChangeStartime}
                  ></TextField>
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <TextField
                    type="time"
                    value={endTime}
                    onChange={handleChangeEndTime}
                  ></TextField>
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
                    {Object.keys(kijiji.locations)
                      .slice(1)
                      .map((item, i) => {
                        return (
                          <Mui.MenuItem
                            value={
                              item[0].toUpperCase() +
                              item.replaceAll("_", " ").slice(1).toLowerCase()
                            }
                            key={i}
                          >
                            {item[0].toUpperCase() +
                              item.replaceAll("_", " ").slice(1).toLowerCase()}
                          </Mui.MenuItem>
                        );
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

            <Mui.Grid
              item
              md={6}
              xs={12}
              sx={{ paddingLeft: "10px", mt: { md: 0, xs: 2 } }}
            >
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
        <Mui.Stack direction={"row"} justifyContent={"end"} sx={{ mt: 2 }}>
          <MuiLabs.LoadingButton
            sx={{ width: "10rem" }}
            onClick={postData}
            variant="contained"
            loading={isLoading}
          >
            Save Changes
          </MuiLabs.LoadingButton>
        </Mui.Stack>
      </Mui.Dialog>
    </>
  );
};

interface PnationPost {
  _id: string;
  uid: string;
  city: string;
  event_date_in_local: Date;
  event_time: string;
  name_of_the_event: string;
  organization_name: string;
  organization_type: string;
  poster_image: string;
  province_name: string;
  state_of_organization: string;
  authorized_by_organization: number;
}
