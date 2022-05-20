import * as Mui from "@mui/material";
import * as Views from "app/home/views";
import * as Components from "components";
import * as MuiIcons from "@mui/icons-material";

export const Main = () => {
  return (
    <Mui.Box sx={{ height: "auto" }}>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12} md={12} lg={7}>
          <Views.Whatsupcanada />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={12} lg={5}>
          <Views.NewPinoyOntheBlock />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Box sx={{ mt: 2 }}>
        <Components.SectionSeparator />
      </Mui.Box>
      <Mui.Grid sx={{ mt: 1 }} container spacing={2}>
        <Mui.Grid item xs={12} md={12} lg={7}>
          <Views.PinoyPrenerues />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={12} lg={5}>
          <Mui.Stack spacing={2}>
            <Views.HomePNationCalendar />
            <Views.GoodVibes />
          </Mui.Stack>
        </Mui.Grid>
      </Mui.Grid>
      {/* <Mui.Grid sx={{ mt: 1 }} container spacing={2}>
        <Mui.Grid item xs={12} md={12} lg={12}>
          <Views.NikNok />
        </Mui.Grid>
      </Mui.Grid> */}
      <Mui.Grid sx={{ mt: 1 }} container spacing={2}>
        <Mui.Grid item xs={12} md={12} lg={6}>
          <Views.BazaarCity />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={12} lg={6}>
          <Views.ShoutOuts />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid sx={{ mt: 1 }} container spacing={2}>
        <Mui.Grid item xs={12} md={12} lg={7}>
          <Mui.Box
            sx={{
              position: "relative",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Mui.CardMedia
              sx={{
                borderRadius: "15px",
                objectFit: "cover",
              }}
              component="img"
              src="https://images.unsplash.com/photo-1589779255235-85dc2a054145?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29ycG9yYXRlJTIwYnVpbGRpbmdzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
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
        </Mui.Grid>
        <Mui.Grid item xs={12} md={12} lg={5}>
          <Views.SurveyForm />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid sx={{ mt: 1 }} container spacing={2}>
        <Mui.Grid item xs={12} md={12} lg={6}>
          <Views.JobCenter />
        </Mui.Grid>
        <Mui.Grid item xs={12} md={12} lg={6}>
          <Views.Buyanaihan />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
