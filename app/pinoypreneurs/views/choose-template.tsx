import * as Mui from "@mui/material";
import FristTemplate from "assets/pinoypreneurs/Pinoypreneurs – Business Template – 1@2x.png";
import SecondTemplate from "assets/pinoypreneurs/Pinoypreneurs – Business Template – 2@2x.png";
import ThirdTemplate from "assets/pinoypreneurs/Pinoypreneurs – Business Template – 3@2x.png";
import * as React from "react";
import { useFormikContext } from "formik";

const ImageContainer = Mui.styled(Mui.Typography)({
  width: "100%",
  height: "13rem",
  cursor: "pointer",
});

export const ChooseTemplate = () => {
  const [template_id, setTemplateId] = React.useState(0);
  const [image1Ready, setImage1Ready] = React.useState(false);
  const [image2Ready, setImage2Ready] = React.useState(false);
  const [image3Ready, setImage3Ready] = React.useState(false);
  const formikContext = useFormikContext();

  React.useEffect(() => {
    formikContext.setFieldValue("template_id", template_id);
  }, [template_id]);

  return (
    <>
      <Mui.Stack
        alignItems="center"
        justifyContent="center"
        py={10}
        sx={{
          display: image1Ready && image2Ready && image3Ready ? "none" : "flex",
        }}
      >
        <Mui.CircularProgress color={"primary"} />
      </Mui.Stack>
      <Mui.Box
        sx={{
          display: image1Ready && image2Ready && image3Ready ? "block" : "none",
        }}
      >
        <Mui.Grid container spacing={2}>
          <Mui.Grid item md={3} xs={6}>
            <ImageContainer
              sx={{ border: template_id === 1 ? "1px solid #208BA5" : "none" }}
              onClick={() => setTemplateId(1)}
            >
              <Mui.Box
                component={"img"}
                width="100%"
                height={"100%"}
                src={FristTemplate.src}
                sx={{ p: 1 }}
                onLoad={() => setImage1Ready(true)}
              />
            </ImageContainer>
          </Mui.Grid>
          <Mui.Grid item md={3} xs={6}>
            <ImageContainer
              sx={{ border: template_id === 2 ? "1px solid #208BA5" : "none" }}
              onClick={() => setTemplateId(2)}
            >
              <Mui.Box
                component={"img"}
                width="100%"
                height={"100%"}
                src={SecondTemplate.src}
                sx={{ p: 1 }}
                onLoad={() => setImage2Ready(true)}
              />
            </ImageContainer>
          </Mui.Grid>
          <Mui.Grid item md={3} xs={6}>
            <ImageContainer
              sx={{ border: template_id === 3 ? "1px solid #208BA5" : "none" }}
              onClick={() => setTemplateId(3)}
            >
              <Mui.Box
                component={"img"}
                width="100%"
                height={"100%"}
                src={ThirdTemplate.src}
                sx={{ p: 1 }}
                onLoad={() => setImage3Ready(true)}
              />
            </ImageContainer>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Box>
    </>
  );
};
