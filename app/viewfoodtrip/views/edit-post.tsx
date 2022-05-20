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
import CloseIcon from "assets/Icon ionic-ios-close-circle@2x.png";

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

export const EditPost = ({ post ,refetch}: { post: foodTripPost ;refetch:any}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editDialog, setEditDialog] = React.useState(false);
  const router = NextRouter.useRouter();
  const client = Query.useQueryClient();
  const open = Boolean(anchorEl);

  //   view specific
  const isMobile = Hooks.useMobileView();
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    post_description: post?.post_description,
    hashtags: post?.hashtags,
    location: post?.location,
    youtube_link: post?.youtube_link,
  });
  const [buttonType, setButtonType] = React.useState(
    post?.post_type == "general_post" ? 0 : 1
  );
  const imageRef = React.useRef<any>(null);
  const [postImages, setPostImages] = React.useState<any>(post?.post_images);
  const [imageFile, setImageFile] = React.useState<any>([]);

  const [errors, setError] = React.useState<any>();

  const validate = () => {
    let form = true;
    if (!values.post_description) {
      form = false;
      setError((pre: any) => ({
        ...pre,
        post_description: "*Please enter your description",
      }));
    } else {
      setError((pre: any) => ({ ...pre, post_description: "" }));
    }
    if (!values.hashtags) {
      form = false;
      setError((pre: any) => ({
        ...pre,
        hashtags: "*Please enter your favourite food",
      }));
    } else {
      setError((pre: any) => ({ ...pre, hashtags: "" }));
    }
    if (buttonType === 0) {
    if (!values.location) {
      form = false;
      setError((pre: any) => ({
        ...pre,
        location: "*Please enter your location",
      }));
    } else {
      setError((pre: any) => ({ ...pre, location: "" }));
    }
  }
  else{
    if (!values.youtube_link) {
      form = false;
      setError((pre: any) => ({
        ...pre,
        youtube_link: "*Please enter your link",
      }));
    } else {
      setError((pre: any) => ({ ...pre, youtube_link: "" }));
    }
  }
    return form;
  };

  // dialog common
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
    await Api.Server.Client().post(
      Api.Server.ApiRoutes.foodTrip.deleteFoodTripPost,
      { post_id: post._id }
    );
    router.back();
  };

  //   view specific
  React.useEffect(() => {
    setValues({
      post_description: post?.post_description,
      hashtags: post?.hashtags,
      location: post?.location,
      youtube_link: post?.youtube_link,
    });
    setPostImages(post?.post_images);
    setButtonType(post?.post_type === "general_post" ? 0 : 1);
  }, [post]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files || [];
    const file = [];
    const getImageUrl = [...postImages];
    for (let i = 0; i < files?.length; i++) {
      getImageUrl.push(URL.createObjectURL(files[i]));
      file.push(files[i]);
    }
    setPostImages(getImageUrl);
    setImageFile(file);
  };

  const deleteImage = (index: number) => {
    const getAlldata = [...postImages];
    getAlldata.splice(index, 1);
    setPostImages(getAlldata);
  };

  const postData = async () => {
    if(validate()){
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
        post_images: getImageUrl.length > 0 ? getImageUrl : post?.post_images,
        post_id: post._id,
      };

      await Api.Server.Client().post(
        Api.Server.ApiRoutes.foodTrip.editFoodTripPost,
        postData
      );
      refetch();
      setIsLoading(false);
      client.invalidateQueries("viewfootTrip");
      handleEditPost();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
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
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <Mui.Toolbar
          sx={{
            borderBottom: "2px solid #EAEAEA",
            minHeight: "50px !important",
          }}
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
              Edit Post
            </Mui.Typography>
            <Mui.IconButton onClick={handleEditPost}>
              <MuiIcons.Close />
            </Mui.IconButton>
          </Mui.Stack>
        </Mui.Toolbar>
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
            {postImages?.map((item: any, index: number) => (
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
            {postImages?.length < 1 ? (
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
                    <Mui.Typography
                      sx={{ fontSize: "0.5rem" }}
                      color={"primary"}
                    >
                      Size upto 2 MB
                    </Mui.Typography>
                  </Mui.Box>
                </UploadContainer>
              </Mui.Grid>
            ) : null}
          </Mui.Grid>
        </Mui.Box>
        <Mui.Divider sx={{ mt: 2, mb: 4 }} />
        <Mui.Stack direction={"row"} justifyContent={"end"}>
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

interface foodTripPost {
  _id: string;
  uid: string;
  post_description: string;
  post_images: string[];
  post_type: string;
  hashtags: string;
  location: string;
  youtube_link: string;
  number_of_likes: number;
  number_of_comments: number;
  profile_photo: string;
  post_id: string | null;
  full_name: string;
  is_active: number;
  createdAt: string;
  updatedAt: string;
  likedBy: string;
}
