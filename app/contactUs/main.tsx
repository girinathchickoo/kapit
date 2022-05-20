import * as Mui from "@mui/material";
import { QuerysForm } from "./view";
import { ContactInfo } from "./view/contact";

export const Main = () => {
  return (
    <Mui.Box sx={{ marginTop: { xs: "110px", md: "230px" } }}>
      <Mui.Toolbar />
      <Mui.Box sx={{ backgroundColor: "white", borderRadius: "20px", p: 2 }}>
        <Mui.Box sx={{ borderBottom: "1px solid #E3E3E3" }}>
          <Mui.Typography sx={{ fontSize: "14px", pb: 1, fontWeight: 600 }}>
            Get in Touch
          </Mui.Typography>
        </Mui.Box>
        <Mui.Grid container sx={{ marginTop: 2 }} spacing={2}>
          <Mui.Grid item md={6} xs={12}>
            <QuerysForm />
          </Mui.Grid>
          <Mui.Grid item md={6} xs={12} my={{ xs: 2, md: 0 }}>
            <Mui.Stack alignItems={{ xs: "", md: "center" }}>
              <ContactInfo />
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Box>
    </Mui.Box>
  );
};
