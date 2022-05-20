import * as React from "react";
import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import * as Hooks from "hooks";
import * as MuiIcons from "@mui/icons-material";
import SideLogoImage from "assets/Stacked - Colored.png";
import * as NextRouter from "next/router";
import LoginImage from "assets/onboarding/login_bg.png";

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaTitle-Semibold",
  textTransform: "capitalize",
  fontSize: "0.9rem",
});

export const Authlayout = ({ children }: Authlayout) => {
  const isMobile = Hooks.useMobileView();
  const [value, setValue] = React.useState("1");
  const routers = NextRouter.useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Mui.Box>
      <Mui.Dialog
        open={true}
        fullScreen={isMobile}
        sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: "530px" } }}
        maxWidth="md"
      >
        <Mui.DialogContent sx={{ position: "relative" }}>
          <Mui.Box sx={{ position: "absolute", right: 25, zIndex: 10 }}>
            <Mui.IconButton onClick={() => routers.back()}>
              <MuiIcons.Close />
            </Mui.IconButton>
          </Mui.Box>
          <Mui.Box sx={{ width: "100%" }}>
            <Mui.Grid container spacing={3}>
              <Mui.Grid item xs={12} md={6} sx={{ height: "500px" }}>
                <Mui.Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    bgcolor: "#EBE2FA",
                    borderRadius: 6,
                  }}
                >
                  <Mui.Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ height: "100%", width: "100%", position: "relative" }}
                    spacing={2}
                  >
                    <Mui.Typography
                      color="#9B7DD4"
                      sx={{ zIndex: 2, fontFamily: "CallunaTitle-Bold" }}
                    >
                      <strong>Welcome to</strong>
                    </Mui.Typography>
                    <img
                      style={{ marginBottom: "7rem", zIndex: 2 }}
                      src={SideLogoImage.src}
                      width={"30%"}
                    />
                    <Mui.Box
                      sx={{
                        width: "100%",
                        position: "absolute",
                        bottom: "-10px",
                        top: 0,
                        borderRadius: 6,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={LoginImage.src}
                        width={"100%"}
                        height={"100%"}
                      />
                    </Mui.Box>
                  </Mui.Stack>
                </Mui.Box>
              </Mui.Grid>
              <Mui.Grid item xs={12} md={6}>
                <Mui.Box sx={{ width: "100%", typography: "body1", mt: 5 }}>
                  <MuiLab.TabContext value={value}>
                    <Mui.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <MuiLab.TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Mui.Tab
                          onClick={() => routers.push("/accounts/login")}
                          label={
                            <StyledTypography
                              sx={{
                                fontFamily:
                                  value === "1"
                                    ? "CallunaTitle-Bold"
                                    : "CallunaTitle-Semibold",
                              }}
                            >
                              Login
                            </StyledTypography>
                          }
                          value="1"
                        />
                        <Mui.Tab
                          onClick={() => routers.push("/accounts/register")}
                          label={
                            <StyledTypography
                              sx={{
                                fontFamily:
                                  value === "2"
                                    ? "CallunaTitle-Bold"
                                    : "CallunaTitle-Semibold",
                              }}
                            >
                              Register
                            </StyledTypography>
                          }
                          value="2"
                        />
                      </MuiLab.TabList>
                    </Mui.Box>
                    <MuiLab.TabPanel
                      value={value}
                      style={{ height: "400px", overflowY: "scroll" }}
                    >
                      {children}
                    </MuiLab.TabPanel>
                  </MuiLab.TabContext>
                </Mui.Box>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Box>
        </Mui.DialogContent>
      </Mui.Dialog>
    </Mui.Box>
  );
};

interface Authlayout {
  children: React.ReactNode;
}
