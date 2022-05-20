import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as MuiLabs from "@mui/lab";
import * as Hooks from "hooks";
import * as React from "react";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import CloseIcon from "assets/Icon ionic-ios-close-circle@2x.png";
import * as Api from "api";
import { uploadNewImage } from "utils/cloudinary";

const Button = Mui.styled(Mui.Button)(({ theme }) => ({
  width: "20%",
  padding: "0.45rem",
}));

const Description = Mui.styled("textarea")(({ theme }) => ({
  backgroundColor: "#FAF7FF",
  borderRadius: "20px",
  width: "100%",
  padding: "1rem",
  outline: "none",
  border: "none",
  fontSize: "0.8rem",
  fontFamily: "CallunaSans-Regular",
  lineHeight: 1.4,
}));

const TextField = Mui.styled("input")(({ theme }) => ({
  backgroundColor: "#FAF7FF",
  borderRadius: "10px",
  width: "50%",
  padding: "1rem",
  outline: "none",
  border: "none",
  fontSize: "0.8rem",
  fontFamily: "CallunaSans-Regular",
  lineHeight: 1.4,
}));

const UploadContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "85%",
  height: "8rem",
  padding: "10px",
  border: "1px dashed #9B7DD4",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "10px",
}));

const DeleteImage = Mui.styled(Mui.Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: -30,
  zIndex: 1100,
  color: "red",
  cursor: "pointer",
}));

export const PostDialog = ({ open, onclose, refetchList }: any) => {
  const isMobile = Hooks.useMobileView();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonType, setButtonType] = React.useState(0);
  const imageRef = React.useRef<any>(null);
  const [postImages, setPostImages] = React.useState<any>([]);
  const [imageFile, setImageFile] = React.useState<any>([]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files || [];
    const file = [];
    const getImageUrl = [...postImages];
    for (let i = 0; i < files?.length; i++) {
      getImageUrl.push(URL.createObjectURL(files[i]));
      file.push(files[i]);
    }

    // for (let i = 0; i < 4 && i < files.length; i++) {
    //   getImageUrl.length < 5 ? (getImageUrl[getImageUrl.length + 1] = URL.createObjectURL(files[i])) : (getImageUrl[i] = URL.createObjectURL(files[i]))
    //   file.length < 5 ? (file[file.length + 1] = files[i]) : (file[i] = files[i])
    //   // file[i] = files[i]
    // }
    setPostImages(getImageUrl);
    setImageFile(file);
  };

  const changeButton = () => {
    setButtonType(buttonType === 0 ? 1 : 0);
    setValues({
      post_description: "",
      hashtags: "",
      location: "",
      youtube_link: "",
    });
  };

  const deleteImage = (index: number) => {
    const getAlldata = [...postImages];
    getAlldata.splice(index, 1);
    setPostImages(getAlldata);
  };
  const [values, setValues] = React.useState({
    post_description: "",
    hashtags: "",
    location: "",
    youtube_link: "",
  });
  const [errors, setError] = React.useState<any>();

  const validate = () => {
    let form = true;
    if (!values.post_description) {
      form = false;
      setError((pre:any)=>({ ...pre,post_description: "*Please enter your description" }));
    }
    else{
      setError((pre:any)=>({ ...pre,post_description:""}))
    }
    if (!values.hashtags) {
      form = false;
      setError((pre:any)=>({ ...pre,hashtags: "*Please enter your favourite food" }));
    }
    else{
      setError((pre:any)=>({ ...pre,hashtags:""}))
    }
   if (buttonType === 0) { 
    if (!values.location) {
      form = false;
      setError((pre:any)=>({...pre,location: "*Please enter your location" }));
    }
    else{
      setError((pre:any)=>({ ...pre,location:""}))
    }
  }
  else{
    if (!values.youtube_link) {
      form = false;
      setError((pre:any)=>({...pre,youtube_link: "*Please enter your link" }));
    }
    else{
      setError((pre:any)=>({ ...pre,youtube_link:""}))
    }
  }
  if (postImages?.length === 0) {
    form = false;
    setError((pre:any)=>({...pre,imageFile: "*Please select image" }));
  }
  else{
    setError((pre:any)=>({ ...pre,imageFile:[]}))
  }
    return form;
  };

  const postData = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        const getImageUrl = await Promise.all(
          imageFile.map((data: any) => {
            return uploadNewImage(data);
          })
        ).then((res) => res);
        const postData = {
          ...values,
          post_type: buttonType === 0 ? "general_post" : "food_recipe",
          post_images: getImageUrl,
        };
        await Api.Server.Client().post(
          Api.Server.ApiRoutes.foodTrip.postFoodTrip,
          postData
        );
        setIsLoading(false);
        await refetchList();
        setValues({
          post_description: "",
          hashtags: "",
          location: "",
          youtube_link: "",
        });
        setError("");
        setPostImages([]);
        onclose();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setValues({
      post_description: "",
      hashtags: "",
      location: "",
      youtube_link: "",
    });
    setError("");
    setPostImages([]);
    onclose();
  };

  return (
    <Mui.Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", p: 2 } }}
      maxWidth="sm"
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
    >
      <Mui.Toolbar
        sx={{ borderBottom: "2px solid #EAEAEA", minHeight: "50px !important" }}
      >
        <Mui.Stack
          sx={{ width: "100%" }}
          direction={"row"}
          justifyContent={"space-between"}
          justifyItems={"center"}
        >
          <Mui.Typography
            sx={{ fontSize: "1rem", mt: 1, fontWeight: 600 }}
            color={"#9B7DD4"}
          >
            Create Post
          </Mui.Typography>
          <Mui.IconButton onClick={handleClose}>
            <MuiIcons.Close />
          </Mui.IconButton>
        </Mui.Stack>
      </Mui.Toolbar>
      <Mui.Box sx={{ mt: 3 }}>
        <Mui.Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <Button
            onClick={changeButton}
            variant={buttonType === 0 ? "contained" : "outlined"}
            sx={{ width: "fit-content" }}
          >
            General Post
          </Button>
          <Button
            onClick={changeButton}
            variant={buttonType === 1 ? "contained" : "outlined"}
            sx={{ width: "fit-content" }}
          >
            Food Recipe
          </Button>
        </Mui.Stack>
      </Mui.Box>
      <Mui.Box sx={{ mt: 3 }}>
        <Description
          value={values.post_description}
          onChange={(e) =>
            setValues((prevValue) => ({
              ...prevValue,
              post_description: e.target.value,
            }))
          }
          rows={6}
          placeholder="Post your favourite food & places"
        />
      </Mui.Box>
      <Mui.Typography variant="caption" color="error">
        {errors?.post_description}
      </Mui.Typography>
      <Mui.Box sx={{ mt: 2 }}>
        <Mui.Typography sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
          Hashtags (separate in commas eg: Canada, Restaurant)
        </Mui.Typography>
        <TextField
          name="hashtags"
          value={values.hashtags}
          onChange={(e) =>
            setValues((prevValue) => ({
              ...prevValue,
              hashtags: e.target.value,
            }))
          }
        />
      </Mui.Box>
      <Mui.Typography variant="caption" color="error">
        {errors?.hashtags}
      </Mui.Typography>
      <Mui.Box sx={{ mt: 2 }}>
        {buttonType === 0 ? (
          <>
          <Mui.Box>
            <Mui.Typography sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
              {" "}
              Location{" "}
            </Mui.Typography>
            <TextField
              value={values.location}
              onChange={(e) =>
                setValues((prevValue) => ({
                  ...prevValue,
                  location: e.target.value,
                }))
              }
            />
          </Mui.Box>
           <Mui.Typography variant="caption" color="error">
              {errors?.location}
            </Mui.Typography>
          </>
        ) : (
          <>
          <Mui.Box>
            <Mui.Typography sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
              {" "}
              Youtube link (optional){" "}
            </Mui.Typography>
            <TextField
              value={values.youtube_link}
              onChange={(e) =>
                setValues((prevValue) => ({
                  ...prevValue,
                  youtube_link: e.target.value,
                }))
              }
            />
          </Mui.Box>
            <Mui.Typography variant="caption" color="error">
              {errors?.youtube_link}
            </Mui.Typography>
            </>
        )}
      
      </Mui.Box>
      <Mui.Box sx={{ mt: 2 }}>
        <input
          name="image"
          ref={imageRef}
          type="file"
          accept=".jpg,.png,jpeg"
          onChange={onImageChange}
          hidden
          multiple
        />
        <Mui.Grid container>
          {postImages.map((item: any, index: number) => (
            <Mui.Grid key={index} sx={{ position: "relative" }} item xs={6}>
              <UploadContainer
                sx={{ m: 1, border: "none", padding: "0px" }}
                onClick={() => imageRef.current.click()}
              >
                <Mui.Box
                  width={"100%"}
                  height={"100%"}
                  component="img"
                  sx={{ borderRadius: "10px" }}
                  src={item}
                />
              </UploadContainer>
              <DeleteImage onClick={() => deleteImage(index)}>
                <Mui.Box width={"30%"} component="img" src={CloseIcon.src} />
              </DeleteImage>
            </Mui.Grid>
          ))}
          {postImages.length < 1 ? (
            <Mui.Grid item xs={6}>
              <UploadContainer
                sx={{ m: 1 }}
                onClick={() => imageRef.current.click()}
              >
                <Mui.Box sx={{ width: "50%", margin: "15px auto" }}>
                  <Mui.Box
                    width={"40%"}
                    component="img"
                    src={ImageUploadImage.src}
                  />
                  <Mui.Stack>
                    <Mui.Typography
                      sx={{ fontSize: "0.6rem" }}
                      color={"primary"}
                    >
                      Add Image
                    </Mui.Typography>
                  </Mui.Stack>
                  <Mui.Typography sx={{ fontSize: "0.5rem" }} color={"primary"}>
                    Size upto 2 MB
                  </Mui.Typography>
                </Mui.Box>
              </UploadContainer>
            </Mui.Grid>
          ) : (
            <></>
          )}
        </Mui.Grid>
      </Mui.Box>
      <Mui.Typography variant="caption" color="error">{errors?.imageFile}</Mui.Typography>
      <Mui.Divider sx={{ mt: 2, mb: 4 }} />
      <Mui.Stack direction={"row"} justifyContent={"end"}>
        <MuiLabs.LoadingButton
          sx={{ width: "10rem" }}
          onClick={postData}
          variant="contained"
          loading={isLoading}
        >
          Save & post
        </MuiLabs.LoadingButton>
      </Mui.Stack>
    </Mui.Dialog>
  );
};
