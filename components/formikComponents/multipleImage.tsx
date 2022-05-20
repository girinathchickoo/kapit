import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as React from "react";
import { uploadNewImage } from "utils/cloudinary";
import ImageUploadImage from "assets/Icon feather-image@2x.png";
import UploadImage from "assets/Icon feather-upload@2x.png"
import { file } from "./imagePicker";

// new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });

export const ImagePickerMul = ({
    name,
    sx,
    Height,
    fileType,
    setFileType,
    ...props
}: file.Props & Mui.CardMediaProps) => {
    const { setFieldValue, values, errors, touched, setFieldTouched, handleBlur } =
        Formik.useFormikContext<{ [key: string]: string[] }>();

    const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
        // const res = await toBase64((e.target as unknown as { files: File[] })?.files[0])
        // console.log(res)
        // setFieldValue(
        //     name,
        //     await uploadNewImage((e.target as unknown as { files: File[] })?.files[0])
        // );
        setFileType?.((e.target as unknown as { files: Blob[] })?.files[0].type.split("/")[0] as string)
        // console.log((e.target as unknown as { files: Blob[] })?.files[0].type.split("/")[0])

        Promise.all([...(e.target as unknown as { files: Blob[] })?.files].map(async (item, index) => (
            await uploadNewImage(item)
        ))).then((val) => {
            setFieldValue(
                name,
                val
            );
        })
    }

    const theme = Mui.useTheme()

    let widthAlign = { 1: 1, 2: 2, 3: 2, 4: 2 }?.[
        values[name]?.length > 4 ? 4 : values[name]?.length
    ];
    let heightAlign = { 1: 1, 2: 1, 3: 2, 4: 2 }?.[
        values[name]?.length > 4 ? 4 : values[name]?.length
    ];

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
                display: values[name].length ? "inline-block" : "flex",
                justifyContent: "center",
                alignItems: "center",
                
            }}>
                {
                    !values[name].length ? (
                        <Mui.CardMedia
                            component="img"
                            key={0}
                            src={ImageUploadImage.src}
                            sx={{
                                p: 0,
                                objectFit: "contain",
                                height: "20%",
                                width: "20%",
                                ...sx,
                            }}
                        />
                    ) : values[name]?.slice(0, 4).map((src, index) => (
                        <Mui.Box sx={{
                            position: "relative", float: "left", width: `calc(100%/${widthAlign as number || 1})`,
                            height: `calc(100%/${heightAlign as number || 1})`,
                        }} key={index}>
                            <Mui.Avatar
                                src={src}
                                sx={{
                                    textAlign: "center",
                                    borderRadius: 0,
                                    objectFit: "cover",
                                    boxShadow: values[name] && "0px 0px 10px #00000050",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                            {values[name].length > 4 && index === 3 && (
                                <Mui.Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        bgcolor: "#00000090",
                                        color: "#fff",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <Mui.Typography variant="body1">{`+${values[name].length - 4
                                        } more`}</Mui.Typography>
                                </Mui.Stack>
                            )}
                        </Mui.Box>
                    ))
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
                multiple
            />
            <label
                htmlFor={`browse${name}`}
            >
                <Mui.Grid container sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <Mui.Grid item xs={1}>
                        <img src={UploadImage.src} style={{ height: "15px" }} />
                    </Mui.Grid>
                    <Mui.Grid item xs={5}>
                        <Mui.Typography color="primary" sx={{ fontSize: "12px",cursor: 'pointer', }}>
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
