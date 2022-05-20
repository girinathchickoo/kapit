import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as React from "react";

const CustomTextField = Mui.styled(Mui.TextField)({
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

export const FormikTextField = ({
  name,
  label,
  placeholder,
  labelSx,
  ...props
}: text.Props & Mui.TextFieldProps) => {
  const { type } = props;

  const { values, errors, touched, handleChange, handleBlur } =
    Formik.useFormikContext<{ [key: string]: any | string }>();

  return (
    <Mui.Stack spacing={1} sx={{ width: "100%" }}>
      <Mui.Typography
        component={Mui.FormLabel}
        color={errors[name] && touched[name] ? "error" : undefined}
        sx={{ fontSize: "0.75rem", ...labelSx }}
      >
        {label}
      </Mui.Typography>
      <Mui.Box sx={{ width: "100%" }}>
        <CustomTextField
          size="small"
          placeholder={placeholder}
          value={
            type == "date"
              ? new Date(values[name]).getFullYear() +
                "-" +
                (new Date(values[name]).getMonth() < 10
                  ? "0" + new Date(values[name]).getMonth()
                  : new Date(values[name]).getMonth()) +
                "-" +
                (new Date(values[name]).getDate() < 10
                  ? "0" + new Date(values[name]).getDate()
                  : new Date(values[name]).getDate())
              : name.split(".").length === 1
              ? values[name.split(".")[0]]
              : values[name.split(".")[0]]?.[+name.split(".")[1]]?.[
                  name.split(".")[2]
                ]
          }
          onBlur={handleBlur}
          onChange={handleChange}
          name={name}
          fullWidth
          {...props}
        />
      </Mui.Box>
    </Mui.Stack>
  );
};

export declare namespace text {
  export interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    labelSx?: any;
  }
}
