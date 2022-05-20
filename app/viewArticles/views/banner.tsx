import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Nextrouter from "next/router";

const BackIcon = Mui.styled(Mui.IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: "10px",
  margin: "1rem",
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
  },
}));

export const Banners = ({ image }: any) => {
  const routes = Nextrouter.useRouter();
  return (
    <Mui.Box sx={{ display: "flex", direction: "row" }}>
      <BackIcon onClick={() => routes.back()}>
        <MuiIcons.KeyboardArrowLeft />
      </BackIcon>
      <Mui.Box sx={{ height: "inherit", display: "flex", alignItems: "center", textAlign: "left" }}>
        <Mui.Typography sx={{ fontSize: '1rem', fontFamily: "CallunaSans-Bold", color: "#9B7DD4" }}>
          Article Detail
        </Mui.Typography>
      </Mui.Box>
    </Mui.Box>
  );
};
