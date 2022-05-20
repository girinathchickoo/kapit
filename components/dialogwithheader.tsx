import * as React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Hooks from "hooks";
import * as NextRouters from "next/router";

export const DialogwithHeader = ({ children, title, dialogWidth }: DialogMain) => {
  const isMobile = Hooks.useMobileView();
  const routers = NextRouters.useRouter();

  return (
    <Mui.Box>
      <Mui.Dialog
        fullScreen={isMobile}
        open={true}
        maxWidth={dialogWidth}
        sx={{ "& .MuiDialog-paper": { width: "100%" } }}
      >
        <Mui.DialogTitle>
          <Mui.Toolbar sx={{minHeight:'50px !important'}}>
            <Mui.Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ width: "100%"}}
            >
              <Mui.Typography sx={{fontSize:'0.8rem'}}>{title}</Mui.Typography>
              <Mui.IconButton onClick={()=>routers.push('..')} >
                <MuiIcons.Close />
              </Mui.IconButton>
            </Mui.Stack>
          </Mui.Toolbar>
          <Mui.Divider />
        </Mui.DialogTitle>
        <Mui.DialogContent>{children}</Mui.DialogContent>
      </Mui.Dialog>
    </Mui.Box>
  );
};

interface DialogMain {
  children: React.ReactNode;
  title: string | null | React.ReactNode;
  dialogWidth: "md" | "sm" | "lg" | "xl" | "xs";
}
