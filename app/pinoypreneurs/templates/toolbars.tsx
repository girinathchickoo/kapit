import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import Router, * as Nextrouter from "next/router";
import * as React from 'react'
import { DialogLayout, DialogProps } from "./dialogLayout";
import { ChangeTemp } from "./changeTemp";
import { EditDetails } from "./editDetails";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as Routers from "next/router";

const WhiteButton = Mui.styled(Mui.Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "#707070",
  border: '1px solid #BEBEBE',
  "&:hover": {
    backgroundColor: "white",
  },
}));

export const TemplateToolBar = ({ refetch }: { refetch?: any }) => {

  const [open, setOpen] = React.useState(false)
  const [temp, setTemp] = React.useState(0)

  const childProp = [{
    title: "Change Template",
    children: <ChangeTemp />
  }, {
    title: "Edit Template Details",
    children: <EditDetails open={open} setOpen={setOpen} refetch={refetch} />
  }]

  const dialogProps = (temp: number): DialogProps => {
    return {
      open,
      setOpen,
      title: childProp[temp].title,
      children: childProp[temp].children
    }
  }

  const handleOpen = (temp: number) => {
    setOpen(true)
    setTemp(temp)
  }

  const routers = Routers.useRouter();
  const getQuery = routers?.query;
  const pinoyPreneurs = routers?.query?.pinoypreneursid;

  const { data, isLoading } = ReactQuery.useQuery(["pinoyPreneursView", getQuery], async () => {
    const datas = await Server.Server.Client().post(Server.Server.ApiRoutes.pinoyPreneurs.viewProduct, {
      PinoyPreneur_id: pinoyPreneurs,
    });
    return datas?.data?.data;
  });

  return (
    <Mui.Box>
      <Mui.Toolbar sx={{ minHeight: "50px !important", width: "100%" }}>
        <Mui.Stack
          sx={{ width: "100%" }}
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Mui.Box>
            <Mui.IconButton
              sx={{
                backgroundColor: "white !important",
                borderRadius: "10px",
                padding: "5px",
              }}
              onClick={() => { Router.push("../") }}
            >
              <MuiIcons.KeyboardArrowLeft />
            </Mui.IconButton>
          </Mui.Box>
          {isLoading ? <></> : data?.uid === localStorage.getItem("uid") &&
            <Mui.Stack direction={"row"} spacing={2}>
              <WhiteButton sx={{ width: "10rem" }} onClick={() => { handleOpen(0) }}>Change Template</WhiteButton>
              <WhiteButton sx={{ width: "8rem" }} onClick={() => { handleOpen(1) }}>Edit Details</WhiteButton>
            </Mui.Stack>}
        </Mui.Stack>
      </Mui.Toolbar>
      <DialogLayout {...dialogProps(temp)} />
    </Mui.Box>
  );
};
