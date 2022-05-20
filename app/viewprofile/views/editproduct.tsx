import * as MuiIcons from "@mui/icons-material";
import * as MuiLabs from "@mui/lab";
import * as Hooks from "hooks";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import UploadImg from "assets/Icon feather-upload.png";
import CloseIcon from "assets/Icon ionic-ios-close-circle@2x.png";
import * as Api from "api";
import { uploadNewImage } from "utils/cloudinary";
import * as Mui from "@mui/material";
import * as React from "react";
import { stableValueHash } from "react-query/types/core/utils";
import * as Query from "react-query";

const DeleteImage = Mui.styled(Mui.Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: -20,
  zIndex: 1100,
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
export const EditProduct = ({ open1, onclose, item }: any) => {
  const isMobile = Hooks.useMobileView();
  const imageRef = React.useRef<any>(null);
  const [postImages, setPostImages] = React.useState<any>([]);
  const [imageFile, setImageFile] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    item_name: item.item_name,
    category: item.category,
    price: item.price,
  });
  console.log("item22", item);
  const client = Query.useQueryClient();

  const editProduct = () => {
    Api.Server.Client()
      .post(Api.Server.ApiRoutes.profile.editOneBazaarCityPost, {
        post_id: item._id,
        item_images: [],
        item_name: values.item_name,
        category: values.category,
        price: values.price,
      })
      .then((res) => console.log("edits", res.data));
    client.invalidateQueries("userBazaar");
    onclose();
  };

  const categoryFilter = [
    {
      id: 1,
      name: "Electronics",
      checked: false,
    },
    {
      id: 2,
      name: "Books",
      checked: false,
    },
    {
      id: 3,
      name: "Men's Clothing",
      checked: false,
    },

    {
      id: 4,
      name: "Jewellery",
      checked: false,
    },
    {
      id: 5,
      name: "Sportswear",
      checked: false,
    },
    {
      id: 6,
      name: "Gaming",
      checked: false,
    },
    {
      id: 7,
      name: "Grocery & Gourment Foods",
      checked: false,
    },
    {
      id: 8,
      name: "Household supplies",
      checked: false,
    },
    {
      id: 9,
      name: "baby products",
      checked: false,
    },
    {
      id: 10,
      name: "Women's Clothing",
      checked: false,
    },

    {
      id: 11,
      name: "Bags",
      checked: false,
    },
    {
      id: 12,
      name: "Beauty & Grooming",
      checked: false,
    },
    {
      id: 13,
      name: "Shoes",
      checked: false,
    },
  ];

  const handleClose = () => {
    setValues({
      item_name: "",
      category: "",
      price: "",
    });
    setPostImages([]);
    onclose();
  };

  const handleChange = (e: any) => {
    setValues((prevValue) => ({
      ...prevValue,
      category: e.target.value,
    }));
  };

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
  return (
    <Mui.Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", p: 2 } }}
      maxWidth="md"
      fullScreen={isMobile}
      open={open1}
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
            Edit Item
          </Mui.Typography>
          <Mui.IconButton onClick={handleClose}>
            <MuiIcons.Close />
          </Mui.IconButton>
        </Mui.Stack>
      </Mui.Toolbar>
      <Mui.DialogContent sx={{ pb: 0 }}>
        <Mui.Grid container sx={{ mt: 2, mb: 2 }}>
          <Mui.Grid item xs={6} sx={{ paddingRight: "10px" }}>
            <Mui.Typography sx={{ fontSize: "0.75rem" }}>
              Item Name
            </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              value={values.item_name}
              onChange={(e) =>
                setValues((prevValue) => ({
                  ...prevValue,
                  item_name: e.target.value,
                }))
              }
            ></TextField>
            <Mui.Stack spacing={1}>
              <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px" }}>
                Category
              </Mui.Typography>
              <Mui.FormControl>
                <Select value={values.category} onChange={handleChange}>
                  {/* {categoryFilter.map((item: any, index: number)=>(
 <><Mui.MenuItem key={index} value={item.name}>{item.name}</Mui.MenuItem>
</>
))}     */}
                  <Mui.MenuItem value="Mobile">Mobile</Mui.MenuItem>
                  <Mui.MenuItem value="Electronics">Electronics</Mui.MenuItem>
                  <Mui.MenuItem value="Others">Others</Mui.MenuItem>
                </Select>
              </Mui.FormControl>
            </Mui.Stack>
            <Mui.Typography sx={{ fontSize: "0.75rem", marginTop: "20px" }}>
              Enter your Price
            </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              value={values.price}
              onChange={(e) =>
                setValues((prevValue) => ({
                  ...prevValue,
                  price: e.target.value,
                }))
              }
            ></TextField>
          </Mui.Grid>
          <Mui.Grid item xs={6} sx={{ paddingLeft: "10px" }}>
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
                width={"20%"}
                component="img"
                src={ImageUploadImage.src}
                sx={{ marginTop: "70px" }}
                onClick={() => imageRef.current.click()}
              />
            </UploadContainer>

            <Mui.IconButton>
              <Mui.CardMedia
                component={"img"}
                sx={{ height: "20px", width: "250px", objectFit: "contain" }}
                src={UploadImg.src}
                onClick={() => imageRef.current.click()}
              ></Mui.CardMedia>
              <Mui.Typography
                sx={{ fontSize: "0.8rem", ml: -13 }}
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
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container>
          {postImages.map((item: any, index: number) => (
            <Mui.Grid key={index} sx={{ position: "relative" }} item xs={3}>
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
        </Mui.Grid>
      </Mui.DialogContent>
      <Mui.Toolbar
        sx={{ borderBottom: "2px solid #EAEAEA", minHeight: "80px !important" }}
      ></Mui.Toolbar>
      <Mui.DialogActions>
        <Mui.Button
          variant="contained"
          sx={{ m: "10px", marginRight: "20px", width: "15%" }}
          onClick={editProduct}
        >
          Done{" "}
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  );
};
