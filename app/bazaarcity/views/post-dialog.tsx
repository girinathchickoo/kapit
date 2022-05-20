import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as MuiLabs from "@mui/lab";
import * as Hooks from "hooks";
import * as React from "react";
import * as ReactQuery from "react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import UploadImg from "assets/Icon feather-upload.png";
import CloseIcon from "assets/Icon ionic-ios-close-circle@2x.png";
import * as Api from "api";
import { uploadNewImage } from "utils/cloudinary";
import * as kijiji from "kijiji-scraper";

const DeleteImage = Mui.styled(Mui.CardMedia)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "30%",
  // zIndex: 1100,
  color: "red",
  cursor: "pointer",
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
  width: "100%",
  height: "13rem",
  padding: "10px",
  border: "1px dashed #9B7DD4",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "10px",
  marginTop: "20px",
  // marginLeft: "50px",
}));
export const PostDialog = ({ open, onclose, refetchList }: any) => {
  const isMobile = Hooks.useMobileView();
  const imageRef = React.useRef<any>(null);
  const [postImages, setPostImages] = React.useState<any>([]);
  const [imageFile, setImageFile] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    item_name: "",
    category: "",
    price: "",
  });
  const [error, setError] = React.useState(false);

  const handleClose = () => {
    setValues({
      item_name: "",
      category: "",
      price: "",
    });
    setPostImages([]);
    setImageFile([]);
    setError(false);
    onclose();
  };

  const handleChange = (e: any) => {
    setValues((prevValue) => ({
      ...prevValue,
      category: e.target.value,
    }));
    if (
      e.target.value != "" &&
      values.item_name != "" &&
      values.price != "" &&
      imageFile.length > 1
    ) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const postData = async () => {
    if (
      !values.category ||
      !values.item_name ||
      !values.price ||
      imageFile.length < 1
    ) {
      setError(true);
    } else {
      setIsLoading(true);
      try {
        const getImageUrl = await Promise.all(
          imageFile.map((data: any) => {
            return uploadNewImage(data);
          })
        ).then((res) => res);
        await Api.Server.Client().post(
          Api.Server.ApiRoutes.bazaarCity.addBazaarCity,
          {
            ...values,
            item_images: getImageUrl,
          }
        );
        setIsLoading(false);
        // await refetchList();
        setValues({
          item_name: "",
          category: "",
          price: "",
        });
        setPostImages([]);
        setImageFile([]);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
      await refetchList();

      onclose();
    }
  };
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files || [];
    const file = [...imageFile];
    const getImageUrl = [...postImages];
    for (let i = 0; i < 4 && i < files.length; i++) {
      getImageUrl.length < 5
        ? (getImageUrl[getImageUrl.length + 1] = URL.createObjectURL(files[i]))
        : (getImageUrl[i] = URL.createObjectURL(files[i]));
      file.length < 5
        ? (file[file.length + 1] = files[i])
        : (file[i] = files[i]);
      // file[i] = files[i]
    }
    setPostImages(getImageUrl);
    setImageFile(file);
    if (
      values.category != "" &&
      values.item_name != "" &&
      values.price != "" &&
      imageFile.length > 1
    ) {
      setError(false);
    } else {
      setError(true);
    }
  };
  const deleteImage = (index: number) => {
    const getAlldata = [...postImages];
    getAlldata.splice(index, 1);
    setPostImages(getAlldata);
  };
  return (
    <Mui.Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", p: 2 } }}
      maxWidth="md"
      fullScreen={isMobile}
      open={open}
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
            Add an Item
          </Mui.Typography>
          <Mui.IconButton onClick={handleClose}>
            <MuiIcons.Close />
          </Mui.IconButton>
        </Mui.Stack>
      </Mui.Toolbar>
      <Mui.DialogContent sx={{ pb: 0 }}>
        <Mui.Grid container sx={{ mt: 2, mb: 2 }} spacing={2}>
          <Mui.Grid item xs={12} md={6} sx={{ paddingRight: "10px" }}>
            <Mui.Typography sx={{ fontSize: "0.75rem" }}>
              Item Name
            </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              value={values.item_name}
              onChange={(e) => {
                setValues((prevValue) => ({
                  ...prevValue,
                  item_name: e.target.value,
                }));
                if (
                  values.category != "" &&
                  e.target.value != "" &&
                  values.price != "" &&
                  imageFile.length > 1
                ) {
                  setError(false);
                } else {
                  setError(true);
                }
              }}
            ></TextField>
            <Mui.Stack spacing={1}>
              <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px" }}>
                Category
              </Mui.Typography>
              <Mui.FormControl>
                <Select
                  value={values?.category}
                  onChange={handleChange}
                  MenuProps={{ sx: { maxHeight: "200px" } }}
                >
                  {Object.keys(kijiji.categories.BUY_AND_SELL)
                    .slice(1)
                    .map((item, i) => {
                      return (
                        <Mui.MenuItem
                          value={
                            item[0].toUpperCase() +
                            item.replaceAll("_", " ").slice(1).toLowerCase()
                          }
                        >
                          {item[0].toUpperCase() +
                            item.replaceAll("_", " ").slice(1).toLowerCase()}
                        </Mui.MenuItem>
                      );
                    })}
                </Select>
              </Mui.FormControl>
            </Mui.Stack>
            <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px" }}>
              Enter your Price
            </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              value={values?.price}
              onChange={(e) => {
                setValues((prevValue) => ({
                  ...prevValue,
                  price: e.target.value,
                }));
                if (
                  values.category != "" &&
                  values.item_name != "" &&
                  e.target.value != "" &&
                  imageFile.length > 1
                ) {
                  setError(false);
                } else {
                  setError(true);
                }
              }}
            ></TextField>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={6}>
            <Mui.Stack alignItems={"center"} spacing={1}>
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
                <Mui.Box
                  // width={"20%"}
                  component="img"
                  src={ImageUploadImage.src}
                  sx={{ marginTop: "70px" }}
                  onClick={() => imageRef.current.click()}
                />
              </UploadContainer>
              <Mui.IconButton>
                <Mui.CardMedia
                  component={"img"}
                  sx={{ width: "1rem" }}
                  src={UploadImg.src}
                  onClick={() => imageRef.current.click()}
                ></Mui.CardMedia>
                <Mui.Typography
                  sx={{ fontSize: "0.8rem", mx: 1 }}
                  color="primary"
                  onClick={() => imageRef.current.click()}
                >
                  Upload Item Image
                </Mui.Typography>
              </Mui.IconButton>
              <Mui.Typography
                sx={{ fontSize: "0.75rem", ml: 13 }}
                color="#9B7DD489"
              >
                Size upto 1.5 MB, max 4 photos
              </Mui.Typography>
            </Mui.Stack>
          </Mui.Grid>
          {error && (
            <Mui.Typography variant="caption" color="error">
              *Please Fill Every field
            </Mui.Typography>
          )}
        </Mui.Grid>
        <Mui.Stack
          spacing={2}
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-evenly"
        >
          {postImages.map((item: any, index: number) => {
            return (
              item && (
                <Mui.Box sx={{ position: "relative" }}>
                  <Mui.CardMedia
                    component="img"
                    src={CloseIcon.src}
                    sx={{
                      width: "8%",
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                    onClick={() => deleteImage(index)}
                  />
                  <Mui.Box
                    sx={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      width: "100%",
                      objectFit: "cover",
                      maxWidth: 200,
                      m: 2,
                    }}
                  >
                    <Mui.CardMedia
                      component="img"
                      src={item}
                      sx={{ objectFit: "contain" }}
                    />
                  </Mui.Box>
                </Mui.Box>
              )
            );
          })}
        </Mui.Stack>
      </Mui.DialogContent>
      <Mui.DialogActions>
        {!isLoading ? (
          <Mui.Button
            variant="contained"
            sx={{ m: "10px", marginRight: "20px", width: "15%" }}
            onClick={postData}
          >
            Done{" "}
          </Mui.Button>
        ) : (
          <LoadingButton loading />
        )}
      </Mui.DialogActions>
    </Mui.Dialog>
  );
};
