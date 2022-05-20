import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import * as Views from "layouts/mainlayout/views";
import * as NextRouters from "next/router";
import * as Mui from "@mui/material";
import * as Components from "components";
import { set } from "date-fns";
const drawerWidth = 240;

export const SearchContext = React.createContext("");

export const Main = (props: any) => {
  const { window, children } = props;
  const { query, pathname } = NextRouters.useRouter();
  const getQuery = Object.keys(query);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<any>();
  const [visible, setVisible] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  React.useEffect(() => {
    setSearch("")
  }, [pathname]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!getQuery.includes("whatsupid") &&
      !getQuery.includes("podcastid") &&
      !getQuery.includes("pinoyid") &&
      !getQuery.includes("templates") ? (
        <Box
          sx={{
            bgcolor: "#F8F8F8",
            width: { xs: "0px", md: "auto" },
          }}
        >
          <AppBar
            position={"absolute"}
            sx={{
              width: { md: `calc(100% - 18rem)` },
              margin: { sm: "0px", md: "1rem" },
              backgroundColor: "white",
              boxShadow: "none",
              borderRadius: "20px",
              borderBottomLeftRadius: "70px !important",
              borderBottomRightRadius: "70px !important",
            }}
          >
            <Views.Appbar.Main openSidebar={handleDrawerToggle} />
          </AppBar>
          <Box
            component="nav"
            // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            sx={{
              width: { sm: "15rem" },
              flexShrink: { sm: 0 },
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              anchor="left"
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  borderRadius: "0px !important",
                  width: "15rem",
                  "&::-webkit-scrollbar": {
                    display: "none !important",
                  },
                },
                // "& .css-1ujuh16-MuiPaper-root-MuiDrawer-paper": {
                //   boxShadow: "none",
                // },
              }}
            >
              <Views.Sidebar.Main handleClose={handleDrawerToggle} />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  boxShadow: "0px 20px 55px #0000000F !important",
                  width: "15rem",
                  height: "95%",
                  marginLeft: "1rem",
                  marginTop: "1rem",
                  "&::-webkit-scrollbar": {
                    display: "none !important",
                  },
                },
              }}
              open
            >
              <Views.Sidebar.Main />
            </Drawer>
          </Box>
        </Box>
      ) : (
        ""
      )}
      <Box
        component="main"
        sx={{
          bgcolor: "#F8F8F8",
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${20}rem)` },
        }}
      >
        {!getQuery.includes("whatsupid") &&
        !getQuery.includes("podcastid") &&
        !getQuery.includes("pinoyid") &&
        !getQuery.includes("templates") &&
        !getQuery.includes("userId") &&
        // !getQuery.includes("/user/:userId") &&
        pathname !== "/my-profile" &&
        pathname !== "/my-profile/edit-profile" &&
        pathname !== "/user/userId" &&
        pathname !== "/contact-us" ? (
          <Box sx={{ marginTop: { xs: "110px", md: "200px" } }}>
            <Toolbar />
            <Components.GlobalSearch
              value={search}
              onChange={(e: any) => setSearch(e)}
            />
            <Mui.Box sx={{ mb: 2 }}>
              <Components.Atfbanner />
            </Mui.Box>
          </Box>
        ) : (
          ""
        )}
        <SearchContext.Provider value={search}>
          {children}
        </SearchContext.Provider>
        <Views.Footer.Main />
      </Box>
    </Box>
  );
};
