import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as React from "react";
import { uploadNewImage } from "utils/cloudinary";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import UploadImage from "assets/Icon feather-upload@2x.png"

// new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });

export const ImagePicker = ({
    name,
    sx,
    Height,
    fileType,
    setFileType,
    ...props
}: file.Props & Mui.CardMediaProps) => {
    const { setFieldValue, values, errors, touched, setFieldTouched, handleBlur } =
        Formik.useFormikContext<{ [key: string]: string }>();

    const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
        // const res = await toBase64((e.target as unknown as { files: File[] })?.files[0])
        // console.log(res)
        setFieldValue(
            name,
            await uploadNewImage((e.target as unknown as { files: File[] })?.files[0])
        );
        setFileType?.((e.target as unknown as { files: Blob[] })?.files[0].type.split("/")[0] as string)
        // console.log((e.target as unknown as { files: Blob[] })?.files[0].type.split("/")[0])

        // Promise.all([...(e.target as unknown as { files: Blob[] })?.files].map(async (item, index) => (
        //     await toBase64(item)
        // ))).then((val) => {
        //     setFieldValue(
        //         name,
        //         val
        //     );
        // })
    }

    const theme = Mui.useTheme()

    const typeSelector: { [key: string]: "img" | "video" | "audio" } = { image: "img", video: "video", audio: "audio" }

    return (
        <Mui.Stack spacing={1}>
            <Mui.Box sx={{
                width: "100%",
                height: Height || 200,
                backgroundColor: "#FAF7FF",
                borderRadius: "5px",
                border: errors[name] && touched[name]
                    ? `1px solid ${theme.palette.error.main}`
                    : `1px solid ${theme.palette.primary.main}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {
                    !values[name] ? (
                        <Mui.CardMedia
                            component="img"
                            key={0}
                            src={ImageUploadImage.src}
                            sx={{
                                p: 0,
                                objectFit: values[name] ? "cover" : "contain",
                                height: "20%",
                                width: "20%",
                                ...sx,
                            }}
                        />
                    ) : <Mui.CardMedia
                        component={fileType ? typeSelector[fileType as keyof typeof typeSelector] : "img"}
                        src={values[name]}
                        sx={{
                            p: 0,
                            objectFit: values[name] ? "cover" : "contain",
                            height: "100%",
                            width: "100%",
                            ...sx
                        }}
                    />
                }
            </Mui.Box>
            <input
                hidden
                accept={fileType ? `${fileType}/*` : "audio/*,video/*,image/*"}
                id={`browse${name}`}
                type="file"
                name={name}
                onChange={handleOnChange}
                onBlur={handleBlur}
            />
            <label
                htmlFor={`browse${name}`}
            >
                <Mui.Grid container sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <Mui.Grid item xs={1}>
                        <img src={UploadImage.src} style={{ height: "15px" }} />
                    </Mui.Grid>
                    <Mui.Grid item xs={5}>
                        <Mui.Typography color="primary" sx={{ fontSize: "12px" }}>
                            Upload Item Image
                        </Mui.Typography>
                    </Mui.Grid>
                    <Mui.Grid item xs={7} sx={{ textAlign: "center" }}>
                        <Mui.Typography sx={{ fontSize: "12px", color: "#9B7DD489" }}>
                            Size upto 1.5 MB
                        </Mui.Typography>
                    </Mui.Grid>
                </Mui.Grid>

            </label>
        </Mui.Stack>
    );
};

export declare namespace file {
    export interface Props {
        name: string;
        Height?: string;
        fileType?: string;
        setFileType?: React.Dispatch<React.SetStateAction<string>>;
        value?: string
    }
}