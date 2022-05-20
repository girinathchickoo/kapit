import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as React from "react";

const CustomSelectField = Mui.styled(Mui.Select)({
    width: "100%",
    height: "2.6rem",
    borderRadius: "5px",
    outline: "none",
    border: "none",
    backgroundColor: "#FAF7FF",
    "& .MuiOutlinedInput-root": {
        fontSize: "12px",
        height: "2.6rem !important",
        outline: "none",
        border: "none",
    },
});


export const SelectField = ({
    type,
    label,
    ...props
}: Mui.SelectProps) => {

    const name = props.name as string
    const { values, errors, touched, handleChange, setFieldTouched } =
        Formik.useFormikContext<{ [key: string]: string }>();

    return (
        <Mui.Stack spacing={1}>
            {label && (
                <Mui.Typography
                    component={Mui.FormLabel}
                    color={
                        touched[name] &&
                            errors[name]
                            ? "error"
                            : undefined
                    }
                    sx={{ fontSize: "0.75rem" }}

                >
                    {label}
                </Mui.Typography>
            )}
            <CustomSelectField
                variant="outlined"
                fullWidth
                value={values[name] || ""}
                onChange={handleChange}
                error={Boolean(errors[name] && touched[name])}
                MenuProps={{ sx: { maxHeight: "200px" } }}
                {...props}
                size="small"
            />
        </Mui.Stack>
    )
};