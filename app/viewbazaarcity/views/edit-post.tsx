import * as Api from "api";
import * as Hooks from "hooks";
import * as React from "react";
import * as MuiLabs from "@mui/lab";
import * as Mui from "@mui/material";
import * as NextRouter from "next/router";
import * as MuiIcons from "@mui/icons-material";
import { uploadNewImage } from "utils/cloudinary";
import UploadImg from "assets/Icon feather-upload.png";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import CloseIcon from "assets/Icon ionic-ios-close-circle@2x.png";
import * as kijiji from "kijiji-scraper";

const Select = Mui.styled(Mui.Select)({
  width: "100%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
});

const TextField = Mui.styled("input")(({ theme }) => ({
  backgroundColor: "#FAF7FF",
  borderRadius: "10px",
  width: "100%",
  padding: "1rem",
  outline: "none",
  border: "none",
  fontSize: "0.8rem",
  fontFamily: "CallunaSans-Regular",
  lineHeight: 1.4,
}));

const UploadContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "100%",
  height: "10rem",
  padding: "10px",
  border: "1px dashed #9B7DD4",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const DeleteImage = Mui.styled(Mui.Box)(({ theme }) => ({
  position: "absolute",
  top: -5,
  right: -10,
  zIndex: 1100,
  color: "red",
  width: "30px",
  cursor: "pointer",
}));

export const EditPost = ({
  post,
  refetch,
}: {
  post: bazaarCityPost;
  refetch: () => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editDialog, setEditDialog] = React.useState(false);
  const router = NextRouter.useRouter();
  const open = Boolean(anchorEl);

  //   view specific
  const isMobile = Hooks.useMobileView();
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    item_name: post?.item_name,
    category: post?.category,
    price: post?.price,
  });

  const imageRef = React.useRef<any>(null);
  const [postImages, setPostImages] = React.useState<any>(post?.item_images?.filter((element: string) => element !== null));
  const [imageFile, setImageFile] = React.useState<any>([]);

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
      Api.Server.ApiRoutes.bazaarCity.deleteOneBazaarCityPost,
      { post_id: post._id }
    );
    router.back();
  };

  //   view specific
  React.useEffect(() => {
    setValues({
      item_name: post?.item_name,
      category: post?.category,
      price: post?.price,
    });
    setPostImages(post?.item_images);
  }, [post]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files || [];
    const file = [...imageFile];
    const getImageUrl = [...postImages];
    for (let i = 0; i < 4 && i < files.length; i++) {
      getImageUrl.length < 5 ? (getImageUrl[getImageUrl.length + 1] = URL.createObjectURL(files[i])) : (getImageUrl[i] = URL.createObjectURL(files[i]))
      file.length < 5 ? (file[file.length + 1] = files[i]) : (file[i] = files[i])
      // getImageUrl[i] = URL.createObjectURL(files[i])
      // file[i] = files[i]
    }
    setPostImages(getImageUrl);
    setImageFile(file);
  };

  const deleteImage = (index: number) => {
    const getAlldata = [...postImages];
    getAlldata.splice(index, 1);
    setPostImages(getAlldata);
  };

  const handleCategChange = (e: any) => {
    setValues((prevValue) => ({
      ...prevValue,
      category: e.target.value,
    }));
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      const getImageUrl = await Promise.all(
        imageFile.map((data: any) => {
          return uploadNewImage(data);
        })
      ).then((res) => res);
      const postData = {
        ...values,
        item_images: getImageUrl.length > 0 ? getImageUrl : post?.item_images,
        post_id: post._id,
      };
      await Api.Server.Client().post(
        Api.Server.ApiRoutes.bazaarCity.editOneBazaarCityPost,
        postData
      );
      setIsLoading(false);
      refetch();
      handleEditPost();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Mui.IconButton
        id="more-button"
        aria-controls={open ? "more-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuClick}
      >
        <MuiIcons.MoreVert />
      </Mui.IconButton>

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

        <Mui.Grid container spacing={2} sx={{ p: 2 }}>
          <Mui.Grid item xs={12} md={6}>
            <Mui.Stack spacing={2}>
              <Mui.Box sx={{ mt: 2 }}>
                <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                  Item Name
                </Mui.Typography>
                <TextField
                  sx={{ mt: 1 }}
                  value={values.item_name}
                  onChange={(e) =>
                    setValues((prevValue) => ({
                      ...prevValue,
                      item_name: e.target.value,
                    }))
                  }
                />
              </Mui.Box>
              <Mui.Box sx={{ mt: 2 }}>
                <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px" }}>
                  Category
                </Mui.Typography>
                <Select value={values?.category} onChange={handleCategChange} MenuProps={{ sx: { maxHeight: "200px" } }}>
                  {Object.keys(kijiji.categories.BUY_AND_SELL).slice(1).map((item, i) => {
                    return <Mui.MenuItem value={item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase()}>{item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase()}</Mui.MenuItem>
                  })}
                </Select>
              </Mui.Box>
              <Mui.Box sx={{ mt: 2 }}>
                <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px" }}>
                  Enter your Price
                </Mui.Typography>
                <TextField
                  sx={{ mt: 1 }}
                  value={values.price}
                  onChange={(e) =>
                    setValues((prevValue) => ({
                      ...prevValue,
                      price: Number(e.target.value),
                    }))
                  }
                />
              </Mui.Box>
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={6}>
            <Mui.Stack
              onClick={() => imageRef.current.click()}
              alignItems="center"
              spacing={1}
            >
              <UploadContainer>
                <input
                  name="image"
                  ref={imageRef}
                  type="file"
                  accept=".jpg,.png,jpeg"
                  onChange={onImageChange}
                  hidden
                  multiple
                />
                <Mui.Box sx={{ width: "4rem" }}>
                  <Mui.CardMedia component="img" src={ImageUploadImage.src} />
                </Mui.Box>
              </UploadContainer>
              <Mui.Box>
                <Mui.IconButton>
                  <Mui.Box sx={{ width: "16px" }}>
                    <Mui.CardMedia
                      component={"img"}
                      sx={{ objectFit: "contain" }}
                      src={UploadImg.src}
                    />
                  </Mui.Box>
                  <Mui.Typography
                    sx={{ fontSize: "0.8rem", mx: 1 }}
                    color="primary"
                  >
                    Upload Item Image
                  </Mui.Typography>
                </Mui.IconButton>
                <Mui.Typography sx={{ fontSize: "0.75rem" }} color="#9B7DD489">
                  Size upto 1.5 MB, max 4 photos
                </Mui.Typography>
              </Mui.Box>
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            {postImages?.map((item: any, index: number) => {
              return item && <Mui.Grid key={index} sx={{ position: "relative" }} item xs={6}>
                <UploadContainer
                  sx={{ m: 1, border: "none", padding: "0px" }}
                  onClick={() => imageRef.current.click()}
                >
                  <Mui.Box
                    width={"100%"}
                    height={"100%"}
                    component="img"
                    sx={{ borderRadius: "10px", objectFit: "contain" }}
                    src={item}
                  />
                </UploadContainer>
                <DeleteImage onClick={() => deleteImage(index)}>
                  <Mui.CardMedia component="img" src={CloseIcon.src} />
                </DeleteImage>
              </Mui.Grid>
            })}
          </Mui.Grid>
        </Mui.Grid>

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

interface bazaarCityPost {
  _id: string;
  uid: string;
  item_name: string;
  item_images: string[];
  category: string;
  price: number;
  province_name: string | null;
  profile_photo: string;
  full_name: string;
  number_of_likes: number;
  number_of_comments: number;
  is_active: number;
  createdAt: string;
  likedBy: number;
}
