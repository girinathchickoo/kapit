import * as Api from "api";
import * as Hooks from "hooks";
import * as React from "react";
import * as MuiLabs from "@mui/lab";
import * as Query from "react-query";
import * as Mui from "@mui/material";
import * as NextRouter from "next/router";
import * as MuiIcons from "@mui/icons-material";
import { uploadNewImage } from "utils/cloudinary";
import * as kijiji from "kijiji-scraper";
import * as Formik from "formik";
import * as Yup from "yup";
import {
  CheckButton,
  FormikTextField,
  ImagePickerMul,
  SelectField,
} from "components";
import {
  PostDetails,
  PostData,
  Avatar,
  StyledTypography,
  Name,
  ArrowButton,
} from "../main";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import CloseIcon from "assets/Icon ionic-ios-close-circle@2x.png";

const ItemPostValidationSchema = Yup.object().shape({
  item_name: Yup.string().required("Item Name is Required"),
  category: Yup.string().required("Required"),
  purpose_to_add: Yup.string().required(
    "Please Select For Sale or For Donation Required"
  ),
  enter_your_price: Yup.string().required("Required"),
  is_this_price: Yup.string().required(
    "Please Select Fixed Price or Negotiable Required"
  ),
  post_images: Yup.array(Yup.string()).required(" Required"),
});

export const EditPost = ({ post }: { post: PostData }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editDialog, setEditDialog] = React.useState(false);
  const router = NextRouter.useRouter();
  const client = Query.useQueryClient();
  const open = Boolean(anchorEl);

  //   view specific
  const isMobile = Hooks.useMobileView();
  const [isLoading, setIsLoading] = React.useState(false);
  const [postImages, setPostImages] = React.useState<any>(post?.post_images);
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
      Api.Server.ApiRoutes.buyanihan.DeleteUserBuyBuy,
      { post_id: post?._id }
    );
    router.back();
  };

  const onSubmit = async (value: form) => {
    setIsLoading(true);
    try {
      const getImageUrl = await Promise.all(
        imageFile.map((data: any) => {
          return uploadNewImage(data);
        })
      ).then((res) => res);
      const postData = {
        ...value,
        // post_type: buttonType === 0 ? "general_post" : "food_recipe",
        post_images: getImageUrl.length > 0 ? getImageUrl : value?.post_images,
        post_id: post?._id,
      };

      await Api.Server.Client()
        .post(Api.Server.ApiRoutes.buyanihan.editOneByeBuy, postData)
        .then((res) => console.log("ressss", res));
      setIsLoading(false);
      client.invalidateQueries("getOneBuyanihanPost");
      handleEditPost();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const initialValue: form = {
    item_name: post?.item_name,
    category: post?.category,
    purpose_to_add: post?.purpose_to_add,
    enter_your_price: post?.enter_your_price,
    is_this_price: post?.is_this_price,
    post_images: post?.post_images,
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
        <Mui.DialogTitle sx={{ mb: -3 }}>
          <Mui.Stack direction="row" justifyContent="space-between">
            <Mui.Typography
              sx={{ fontSize: "1rem", fontWeight: 600, mt: 1, ml: 1 }}
              color="primary"
            >
              Edit an Item
            </Mui.Typography>
            <Mui.IconButton onClick={() => setEditDialog(!editDialog)}>
              <MuiIcons.CloseOutlined />
            </Mui.IconButton>
          </Mui.Stack>
        </Mui.DialogTitle>
        <Formik.Formik
          validationSchema={ItemPostValidationSchema}
          initialValues={initialValue}
          onSubmit={onSubmit}
        >
          {(values) => (
            <Formik.Form
              style={{
                maxHeight: "100%",
                overflow: "auto",
                // paddingRight: "10px",
              }}
            >
              <Mui.DialogContent sx={{}}>
                <Mui.Box
                  sx={{
                    p: 2,
                    overflow: "auto",
                    borderTop: "1px solid #0000002e",
                    borderBottom: "1px solid #0000002e",
                  }}
                >
                  <Mui.Grid container sx={{ mt: 1, mb: 1 }}>
                    <Mui.Stack
                      component={Mui.Grid}
                      item
                      xs={6}
                      sx={{ paddingRight: "10px" }}
                      spacing={1}
                    >
                      <FormikTextField
                        name="item_name"
                        label="Item Name"
                        placeholder="Lorem Ipsum"
                      />
                      <SelectField name="category" label="Category">
                        {Object.keys(kijiji.categories.JOBS)
                          .slice(1)
                          .map((item, i) => {
                            return (
                              <Mui.MenuItem value={item} key={i}>
                                {item[0].toUpperCase() +
                                  item
                                    .replaceAll("_", " ")
                                    .slice(1)
                                    .toLowerCase()}
                              </Mui.MenuItem>
                            );
                          })}
                      </SelectField>
                      <CheckButton
                        lable="Purpose to add this item"
                        name="purpose_to_add"
                        value1="For Sale"
                        value2="For Donation"
                      />
                      {values.values.purpose_to_add === "" ? (
                        <Mui.Typography variant="caption" color="error">
                          {values.initialValues.item_name === ""
                            ? values.errors.purpose_to_add
                            : ""}
                        </Mui.Typography>
                      ) : (
                        ""
                      )}
                      <FormikTextField
                        name="enter_your_price"
                        label="Enter your Price"
                        placeholder="In dollars"
                      />
                      <CheckButton
                        lable="Is this Price ?"
                        name="is_this_price"
                        value1="Fixed Price"
                        value2="Negotiable"
                      />
                      {values.values.is_this_price === "" ? (
                        <Mui.Typography variant="caption" color="error">
                          {values.initialValues.item_name === ""
                            ? values.errors.is_this_price
                            : ""}
                        </Mui.Typography>
                      ) : (
                        ""
                      )}
                    </Mui.Stack>
                    <Mui.Stack
                      component={Mui.Grid}
                      item
                      container
                      xs={6}
                      sx={{
                        paddingLeft: "10px",
                        mt: 1,
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                      spacing={1}
                    >
                      <Mui.Box sx={{ width: "70%", mr: "10%" }}>
                        <ImagePickerMul
                          name="post_images"
                          Height="200px"
                          fileType="image"
                        />
                      </Mui.Box>
                    </Mui.Stack>
                  </Mui.Grid>
                </Mui.Box>
              </Mui.DialogContent>
              <Mui.DialogActions>
                <MuiLabs.LoadingButton
                  sx={{ width: "10rem" }}
                  // onClick={postData}
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Save Changes
                </MuiLabs.LoadingButton>
              </Mui.DialogActions>
            </Formik.Form>
          )}
        </Formik.Formik>
        {/* <Mui.Divider sx={{ mt: 2, mb: 4 }} />
        <Mui.Stack direction={"row"} justifyContent={"end"}>
         <Mui.Button
                type="submit"
                variant="contained"
                sx={{
                  m: "10px",
                  marginRight: "20px",
                  boxShadow: "none",
                  width: "100px",
                }}
                size="small"
              >
               Save Changes Done
              </Mui.Button>
        </Mui.Stack> */}
      </Mui.Dialog>
    </>
  );
};

interface form {
  item_name: string;
  category: string;
  purpose_to_add: string;
  enter_your_price: string;
  is_this_price: string;
  post_images: string[];
}
