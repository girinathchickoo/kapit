import * as Mui from "@mui/material";
import FristTemplate from "assets/pinoypreneurs/Pinoypreneurs – Business Template – 1@2x.png";
import SecondTemplate from "assets/pinoypreneurs/Pinoypreneurs – Business Template – 2@2x.png";
import ThirdTemplate from "assets/pinoypreneurs/Pinoypreneurs – Business Template – 3@2x.png";
import * as React from "react";
import * as NextRouter from "next/router";
import * as Server from "api";
import * as ReactQuery from "react-query";

const ImageContainer = Mui.styled(Mui.Typography)({
  width: "100%",
  height: "13rem",
  cursor: "pointer",
});

interface Props {
  template_id: number;
  setTemplateId: React.Dispatch<React.SetStateAction<number>>;
  imageSrc: string;
  currentId: number;
  title: string;
  onLoad: (e: any) => void;
}

const ImgCard = ({
  template_id,
  setTemplateId,
  imageSrc,
  currentId,
  title,
  onLoad,
}: Props) => {
  return (
    <ImageContainer
      sx={{
        boxShadow:
          +template_id === currentId ? "0px 20px 55px #0000001F" : "none",
        border: +template_id === currentId ? "1px solid #208BA5" : "none",
      }}
      onClick={() => setTemplateId(currentId)}
    >
      <Mui.Typography
        sx={{
          height: "15%",
          fontSize: "12px",
          width: "100%",
          textAlign: "center",
          p: "5%",
        }}
      >
        {title}
      </Mui.Typography>
      <Mui.Box
        component={"img"}
        width="100%"
        height={"85%"}
        src={imageSrc}
        sx={{ objectFit: "contain", pb: 1 }}
        onLoad={onLoad}
      />
    </ImageContainer>
  );
};

export const ChangeTemp = () => {
  const router = NextRouter.useRouter();
  const [image1Ready, setImage1Ready] = React.useState(false);
  const [image2Ready, setImage2Ready] = React.useState(false);
  const [image3Ready, setImage3Ready] = React.useState(false);
  const getQuery = router.query;

  const [template_id, setTemplateId] = React.useState(
    getQuery?.templates as unknown as number
  );

  const { data, isLoading } = ReactQuery.useQuery(
    ["pinoyPreneursViews1", getQuery],
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.pinoyPreneurs.viewProduct,
        {
          PinoyPreneur_id: getQuery?.pinoypreneursid,
        }
      );
      return datas?.data?.data;
    }
  );

  const { mutate: ChangeTemplate } = ReactQuery.useMutation(
    async () => {
      const res = await Server.Server.Client().post(
        Server.Server.ApiRoutes.pinoyPreneurs.editDetails,
        {
          ...data,
          PinoyPreneur_id: getQuery?.pinoypreneursid,
          template_id: template_id,
        }
      );
      return res;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        router.push(
          `/pinoypreneurs/${template_id}/${getQuery?.pinoypreneursid}`
        );
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleChangeTemplate = () => {
    ChangeTemplate();
  };

  return (
    <Mui.Box>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Mui.Stack
            alignItems="center"
            justifyContent="center"
            py={10}
            sx={{
              display:
                image1Ready && image2Ready && image3Ready ? "none" : "flex",
            }}
          >
            <Mui.CircularProgress color={"primary"} />
          </Mui.Stack>
          <Mui.Box
            sx={{
              display:
                image1Ready && image2Ready && image3Ready ? "block" : "none",
            }}
          >
            <Mui.Grid container spacing={2} sx={{ mt: 1 }}>
              <Mui.Grid item md={3} xs={6}>
                <ImgCard
                  template_id={template_id}
                  setTemplateId={setTemplateId}
                  imageSrc={FristTemplate.src}
                  currentId={1}
                  title={"Creative"}
                  onLoad={() => setImage1Ready(true)}
                />
              </Mui.Grid>
              <Mui.Grid item md={3} xs={6}>
                <ImgCard
                  template_id={template_id}
                  setTemplateId={setTemplateId}
                  imageSrc={SecondTemplate.src}
                  currentId={2}
                  title={"Neutral"}
                  onLoad={() => setImage2Ready(true)}
                />
              </Mui.Grid>
              <Mui.Grid item md={3} xs={6}>
                <ImgCard
                  template_id={template_id}
                  setTemplateId={setTemplateId}
                  imageSrc={ThirdTemplate.src}
                  currentId={3}
                  title={"Professional"}
                  onLoad={() => setImage3Ready(true)}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Box>

          <Mui.Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Mui.Button variant="contained" onClick={handleChangeTemplate}>
              Submit
            </Mui.Button>
          </Mui.Box>
        </>
      )}
    </Mui.Box>
  );
};
