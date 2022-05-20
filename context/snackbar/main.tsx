import * as MuiIcons from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Notistack from "notistack";
import React from "react";

export const Main = ({ children }: Main.Props) => {
  const notistackRef = React.createRef<Notistack.SnackbarProvider>();

  const onClickDismiss =
    ({ key }: { key: React.ReactText }) =>
    () => {
      notistackRef?.current?.closeSnackbar(key);
    };

  return (
    <Notistack.SnackbarProvider
      ref={notistackRef}
      action={(key) => (
        <Mui.IconButton color="inherit" onClick={onClickDismiss({ key })}>
          <MuiIcons.Close />
        </Mui.IconButton>
      )}
      maxSnack={4}
      preventDuplicate
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </Notistack.SnackbarProvider>
  );
};

export declare namespace Main {
  export interface Props {
    children?: React.ReactNode;
  }
}
