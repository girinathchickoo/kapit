import * as Mui from "@mui/material";
import * as Appbar from "../appbar";

export const Main = ({ openSidebar }: any) => {
  return (
    <Mui.Box>
      <Appbar.Toolbars openSidebar={openSidebar} />
      <Appbar.Poster />
    </Mui.Box>
  );
};
