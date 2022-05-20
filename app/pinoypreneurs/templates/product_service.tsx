import { FormikTextArea, FormikTextField, ImagePickerV } from "components";
import * as React from "react"
import * as Mui from "@mui/material"
import * as MuiIcons from "@mui/icons-material"
import { FieldArray, useFormikContext } from "formik";

const AddmoreButton = Mui.styled(Mui.Button)(({ theme }) => ({
    width: "100%",
    height: "2.5rem",
    color: "#208BA5",
    border: "1.5px dashed #208BA5",
}));

const DeleteButton = Mui.styled(Mui.Button)(({ theme }) => ({
    width: "100%",
    height: "2.5rem",
    color: "#f8194b",
    border: "1.5px dashed #f8194b",
}));

export const Product_Service = () => {

    const { values } =
        useFormikContext<{ [key: string]: Products[] }>();

    const addMoreProducts = (push: any) => {
        push({ product_image: "", product_title: "", product_description: "" });
    };

    return ""
    // <FieldArray name="products" validateOnChange>
    //     {({ push, remove }) => (
    //         <>
    //             {values.products?.map((item, index) => (
    //                 <Mui.Stack sx={{ height: "100%", width: "100%" }} spacing={2} key={index}>
    //                     <ImagePickerV
    //                         name={`products.${index}.product_image`}
    //                         Height="100px"
    //                         fileType="image"
    //                         value="Upload Product Image"
    //                     />
    //                     <FormikTextField
    //                         name={`products.${index}.product_title`}
    //                         label={`Product ${index + 1}: Title`}
    //                         placeholder="Lorem Ipsum"
    //                     />
    //                     <FormikTextArea
    //                         name={`products.${index}.product_description`}
    //                         label={`Product ${index + 1}: Description`}
    //                         placeholder="Short description"
    //                     />
    //                     <DeleteButton
    //                         startIcon={
    //                             <MuiIcons.Delete fontSize="small" color="error" />
    //                         }
    //                         onClick={() => { remove(index) }}
    //                     >
    //                         Delete Product
    //                     </DeleteButton>
    //                 </Mui.Stack>
    //             ))}
    //             <AddmoreButton onClick={() => addMoreProducts(push)}>
    //                 <MuiIcons.Add fontSize="small" sx={{ pr: .5 }} />
    //                 Add Product
    //             </AddmoreButton>
    //         </>
    //     )}
    // </FieldArray>
}

export interface Products {
    product_image: string | any;
    product_title: string;
    product_description: string;
}