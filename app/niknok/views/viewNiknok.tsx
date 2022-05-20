import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Api from "api";
import * as Hooks from "hooks";
import * as React from "react";

const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  "&:hover": { bgcolor: "white" },
});

export const ViewNikNok = ({ open, onclose, id }: Props) => {
  const isMobile = Hooks.useMobileView();
  const [index, setIndex] = React.useState<number>(0);
  const [datas, setDatas] = React.useState<any>("");
  const viewData = async () => {
    const data = await Api.Server.Client().post(
      Api.Server.ApiRoutes.niknok.viewImages,
      {
        post_id: id,
      }
    );
    const getData = data?.data?.data?.[0];
    setDatas(getData);
  };
  const length = datas?.comic_images?.length;

  const nextImage = () => setIndex(index + 1);
  const previousImage = () => setIndex(index - 1);

  React.useEffect(() => {
    viewData();
  }, [id]);

  console.log(datas);

  return (
    <Mui.Box>
      <Mui.Dialog
        sx={{ "& .MuiDialog-paper": { width: "100%", p: 3 } }}
        maxWidth="md"
        fullScreen={isMobile}
        open={open}
        onClose={() => {
          onclose();
          setIndex(0);
        }}
      >
        <Mui.DialogTitle>
          <Mui.Stack
            sx={{ width: "100%" }}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Mui.Typography fontFamily="callunaSans- Semibold">
              {datas?.comics_title}
            </Mui.Typography>
            <Mui.IconButton
              onClick={() => {
                onclose();
                setIndex(0);
              }}
            >
              <MuiIcons.Close />
            </Mui.IconButton>
          </Mui.Stack>
        </Mui.DialogTitle>
        <Mui.DialogContent>
          <Mui.Box
            sx={{
              borderRadius: "20px",
              height: "25rem",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Mui.CardMedia
              component="img"
              src={datas?.comic_images?.[index]}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {index !== 0 && (
              <NavButton onClick={previousImage}>
                <MuiIcons.KeyboardArrowLeft />
              </NavButton>
            )}
            {length - 1 !== index && (
              <NavButton onClick={nextImage} sx={{ right: 0 }}>
                <MuiIcons.KeyboardArrowRight />
              </NavButton>
            )}
          </Mui.Box>
        </Mui.DialogContent>
      </Mui.Dialog>
    </Mui.Box>
  );
};

interface Props {
  open: boolean;
  onclose: () => void;
  id?: any;
}
