import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as Query from "react-query";
import * as Server from "api";
import * as kijiji from "kijiji-scraper";

import * as Formik from "formik";
import * as Yup from "yup";
import {
  CheckButton,
  FormikTextField,
  ImagePickerMul,
  SelectField,
} from "components";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
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

const ItemPostValidationSchema = Yup.object().shape({
  item_name: Yup.string().required("Item Name is Required"),
  category: Yup.string().required("Required"),
  purpose_to_add: Yup.string().required("Please Select For Sale or For Donation Required"),
  enter_your_price: Yup.string().required("Required"),
  is_this_price: Yup.string().required("Please Select Fixed Price or Negotiable Required"),
  post_images: Yup.array(Yup.string()).min(1,"Please Select image  Required").required("Please Select image  Required"),
});

export const AddItemDialog = ({ open, setOpen,refetch }: Props) => {
  const initialValue: form = {
    item_name: "",
    category: "",
    purpose_to_add: "",
    enter_your_price: "",
    is_this_price: "",
    post_images: [],
  };

  const handleClose = () => {
    setOpen(false);
  };

  const client = Query.useQueryClient();

  const { mutate: Add } = Query.useMutation(
    async (values: form) => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.buyanihan.postBuyanihan,
        values
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        refetch();
        client.invalidateQueries("listBuyanihan");
        handleClose();
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const onSubmit = (data: form) => {
    console.log(data);
    Add(data);
  };
  // const error = Boolean(errors[field.name] && touched[field.name])
  return (
    <Mui.Dialog open={open} maxWidth="md" fullWidth>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Mui.Typography
          sx={{ fontSize: "1rem", fontWeight: 600, mt: 1, ml: 1 }}
          color="primary"
        >
          Add an Item
        </Mui.Typography>
      </BootstrapDialogTitle>
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
              paddingRight: "10px",
            }}
          >
            <Mui.DialogContent sx={{ pb: 0 }}>
              <Mui.Box
                sx={{
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
                        {values.initialValues.purpose_to_add === ""
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
                        {values.initialValues.is_this_price === ""
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
                      // paddingLeft: "10px",
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
                    <Mui.Box sx={{display:"flex",mr:10}}>
                    {values.values.post_images.length === 0 ? (
                      <Mui.Typography variant="caption" align="center" color="error" sx={{mr:13}}>
                         {values.errors.post_images}
                      </Mui.Typography>
                    ) : (
                      ""
                    )}
                    </Mui.Box>
                  </Mui.Stack>
                </Mui.Grid>
              </Mui.Box>
            </Mui.DialogContent>
            <Mui.DialogActions>
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
                Done
              </Mui.Button>
            </Mui.DialogActions>
          </Formik.Form>
        )}
      </Formik.Formik>
    </Mui.Dialog>
  );
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch:any;
}

interface form {
  item_name: string;
  category: string;
  purpose_to_add: string;
  enter_your_price: string;
  is_this_price: string;
  post_images: string[];
  // post_image: string[];
}
