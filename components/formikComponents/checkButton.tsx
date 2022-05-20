import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as React from "react"

export const CheckButton = ({ name, value1, value2, lable }: Props) => {

    React.useEffect(()=>{
        handleChange(current);
    },[]);
    
    const { errors, values, touched, setFieldValue, setFieldTouched } =
        Formik.useFormikContext<{ [key: string]: string }>();
    // console.log(values, name)
    const [current, setCurrent] = React.useState(values[name] || value1)

    console.log("current", current);
    const handleChange = (value: string) => {
        setFieldValue(name, value)
        setCurrent(value)
    }

    return (<Mui.Stack spacing={1}>
        <Mui.Typography component={Mui.FormLabel} sx={{ fontSize: "0.75rem" }}>
            {lable}
        </Mui.Typography>
        <Mui.Grid container sx={{ height: "2.6rem", width: "100%" }}>
            <Mui.Grid item xs={6} sx={{ pr: 1 }}>
                <Mui.Button
                    onClick={() => handleChange(value1)}
                     variant={current == value1 ? "contained" : "outlined"}
                    sx={{ mr: "2%", height: "2.2rem", width: "96%" }}
                >
                    {value1}
                </Mui.Button>
            </Mui.Grid>
            <Mui.Grid item xs={6} sx={{ pl: 1 }}>
                <Mui.Button
                    onClick={() => handleChange(value2)}
                    variant={current == value2 ? "contained" : "outlined"}
                    sx={{ ml: "2%", height: "2.2rem", width: "96%" }}
                >
                    {value2}
                </Mui.Button>
            </Mui.Grid>
        </Mui.Grid>
    </Mui.Stack>
    );
};

interface Props {
    name: string
    lable: string
    value1: string
    value2: string
}