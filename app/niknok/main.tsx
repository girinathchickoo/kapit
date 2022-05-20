import * as Mui from "@mui/material";
import * as React from "react";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Views from "app/niknok/views";

const ImageContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "100%",
  position: "relative",
});

const TextOverLay = Mui.styled(Mui.Box)({
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
  backgroundColor: "#3e3d3dbf",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  transition: "opacity 0.25s",
  opacity: 0,
  "& > *": {
    transform: "translateY(20px)",
    transition: "transform 0.25s",
  },
  "&:hover": {
    opacity: 1,
  },
  "&:hover > * ": {
    transform: "translateY(0)",
  },
  cursor: "pointer",
});

export const Main = () => {
  const [openModel, setOpenModel] = React.useState<boolean>(false);
  const [getComicId, setComicId] = React.useState<string>("");
  const { isLoading, data } = ReactQuery.useQuery("niknoklist", () => {
    return Api.Server.Client().post(Api.Server.ApiRoutes.niknok.list, {});
  });
  const nikNokList = data?.data?.data;

  const handleModel = (getId: string) => {
    setComicId(getId);
    setOpenModel(!openModel);
  };

  return (
    <Mui.Box>
      {nikNokList?.map((data: any, index: number) => (
        <Mui.Box key={index} sx={{ mb: 3 }}>
          <Components.CardWithTitle
            title={data?.comics_title}
            actions={null}
            extraText={null}
          >
            <Mui.Grid container spacing={2}>
              {data?.comic_images?.map((item: any, i: number) => (
                <Mui.Grid
                  sx={{ mb: 1 }}
                  key={i}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  xl={1}
                >
                  <ImageContainer>
                    <Mui.Box
                      width={"100%"}
                      height={"100%"}
                      sx={{ objectFit: "cover", borderRadius: "20px" }}
                      component="img"
                      src={item}
                    />
                    <TextOverLay onClick={() => handleModel(data?._id)}>
                      <Mui.Typography>View</Mui.Typography>
                    </TextOverLay>
                  </ImageContainer>
                </Mui.Grid>
              ))}
            </Mui.Grid>
          </Components.CardWithTitle>
        </Mui.Box>
      ))}
      <Views.ViewNikNok
        id={getComicId}
        open={openModel}
        onclose={() => setOpenModel(!openModel)}
      />
    </Mui.Box>
  );
};
