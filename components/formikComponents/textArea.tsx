import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as React from "react";
import { text } from ".";

const CustomTextField = Mui.styled(Mui.TextField)({
    height: "5.2rem",
    backgroundColor: "#FAF7FF",
    "& .MuiOutlinedInput-root": {
        fontSize: "12px",
        height: "5.2rem !important",
        outline: "none",
        border: "none",
    }
});

export const FormikTextArea = ({
    name,
    label,
    placeholder,
    ...props
}: text.Props & Mui.TextFieldProps) => {

    const { values, errors, touched, handleChange, handleBlur } =
        Formik.useFormikContext<{ [key: string]: any | string }>();

    return (
        <Mui.Stack spacing={1}>
            <Mui.Typography
                component={Mui.FormLabel}
                color={errors[name] && touched[name] ? "error" : undefined}
                sx={{ fontSize: "0.75rem" }}

            >
                {label}
            </Mui.Typography>
            <Mui.Box sx={{ width: "100%" }}>
                <CustomTextField
                    size="small"
                    placeholder={placeholder}
                    value={name.split(".").length === 1 ? values[name.split(".")[0]] : values[name.split(".")[0]]?.[+name.split(".")[1]]?.[name.split(".")[2]]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={name}
                    fullWidth
                    multiline
                    rows={4}
                    {...props} />
            </Mui.Box>
        </Mui.Stack>
    )
}