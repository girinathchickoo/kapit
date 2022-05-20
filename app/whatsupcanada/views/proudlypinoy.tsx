import * as Mui from "@mui/material";
import * as Components from "components";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as Views from "app/whatsupcanada/views";

const ViewMoreButton = Mui.styled(Mui.Button)(({ theme }) => ({
  color: "#707070",
  fontSize: "12px",
}));

const ImageContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "100%",
  cursor: "pointer",
  marginBottom: "40px",
  position: "relative",
}));

const DavisFontText = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Bold",
  fontSize: "1rem",
  fontWeight: 500,
  textAlign: "left",
  color: "#333333",
});

const TextOverLay = Mui.styled(Mui.Box)({
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
  backgroundColor: "#33333387",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
});

export const ProudlyPinoy = ({ data, viewMorePinoy }: any) => {
  const [openModel, setOpenModel] = React.useState(false);
  const [modelData, setModelData] = React.useState<any>("");

  const handleModel = (item: any) => {
    setModelData(item);
    setOpenModel(!openModel);
  };

  return (
    <Mui.Box sx={{ width: "100%" }}>
      {data?.length <= 5 ? (
        <Components.CardWithTitle
          title={"Proudly Filipino"}
          actions={null}
          extraText={
            data?.length === 5 ? (
              <ViewMoreButton onClick={viewMorePinoy}>View More</ViewMoreButton>
            ) : null
          }
        >
          <Mui.Stack
            spacing={2}
            direction={"row"}
            sx={{
              overflowX: "auto",
              width: `calc(100vw - 64px)`,
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {data?.map((item: any, index: number) => (
              <Mui.Stack
                sx={{ maxWidth: "15rem", minWidth: "15rem" }}
                onClick={() => handleModel(item)}
              >
                <Mui.Box
                  sx={{
                    position: "relative",
                    borderRadius: "15px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#33333387",
                  }}
                >
                  <Mui.CardMedia
                    sx={{
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                    component={"video"}
                    image={item?.video_url}
                  />
                  <Mui.IconButton
                    sx={{
                      color: "white",
                      border: "2px solid white",
                      position: "absolute",
                    }}
                  >
                    <MuiIcons.PlayArrow fontSize="small" />
                  </Mui.IconButton>
                </Mui.Box>
                <Mui.Box sx={{ width: "100%" }}>
                  <DavisFontText>{item?.title}</DavisFontText>
                </Mui.Box>
              </Mui.Stack>
            ))}
          </Mui.Stack>
        </Components.CardWithTitle>
      ) : (
        <ProudlyPinoyViewList viewMorePinoy={viewMorePinoy} data={data} />
      )}
      <Views.ViewVideos
        item={modelData}
        open={openModel}
        onclose={() => setOpenModel(!openModel)}
      />
    </Mui.Box>
  );
};

const ProudlyPinoyViewList = ({ data, viewMorePinoy }: any) => {
  return (
    <Mui.Box>
      <Components.CardWithTitle
        title={"Proudly Filipino"}
        actions={
          <ViewMoreButton onClick={viewMorePinoy}> View More </ViewMoreButton>
        }
        extraText={null}
      >
        <Mui.Grid container spacing={2}>
          {data?.map((item: any, index: any) => (
            <Mui.Grid key={index} item xs={6} md={4} lg={3}>
              <ImageContainer key={index}>
                <Mui.Box
                  sx={{ mb: 1, borderRadius: "20px" }}
                  width={"100%"}
                  height={"100%"}
                  component={"img"}
                  src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg"
                />
                <DavisFontText>{item?.title}</DavisFontText>
                <TextOverLay>
                  <Mui.IconButton
                    sx={{ color: "white", border: "2px solid white" }}
                  >
                    <MuiIcons.PlayArrow />{" "}
                  </Mui.IconButton>
                </TextOverLay>
              </ImageContainer>
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
