import * as Mui from "@mui/material";
import * as React from "react";
import { SidebarIcons } from "./sidebarIcons";
import * as NextRouter from "next/router";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import * as Hooks from "hooks";

const StyledText = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaTitle-Semibold",
  fontSize: "14px",
  letterSpacing: "0.3px",
  color: "#333333",
});

const LightTooltip = Mui.styled(({ className, ...props }: TooltipProps) => (
  <Mui.Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  textAlign: "center",
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#707070",
    boxShadow: theme.shadows[1],
    fontSize: "0.8rem",
  },
}));

const StyledToolTipContent = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Regular",
  fontSize: "0.9rem",
  letterSpacing: "0.3px",
});

const sidebarArrayList: SidebarArrayList[] = [
  {
    id: 1,
    name: "Home",
    image: SidebarIcons.home.src,
    link: "/",
    colors: "#FAF7FF",
    tooltip: "",
  },
  {
    id: 2,
    name: "What’s up Canada?",
    image: SidebarIcons.canada.src,
    link: "/whats-up-canada",
    colors: "#E6FFFA",
    tooltip:
      "Get Update with the latest news in our community from different cities. Marites will sure update us daily",
  },
  {
    id: 3,
    name: "Food Trip",
    image: SidebarIcons.foodTrip.src,
    link: "/foodtrip",
    colors: "#FFFDF0",
    tooltip: "Share the new Foods you've tasted and the places you've been to!",
  },
  {
    id: 4,
    name: "PinoyPreneurs",
    image: SidebarIcons.pinoy.src,
    link: "/pinoypreneurs",
    colors: "#EBFBFF",
    tooltip:
      "Filipino-owned business listings in canada. Tangkilikin muna natin ang sariling atin",
  },
  {
    id: 5,
    name: "Bazaar City",
    image: SidebarIcons.bazzarCity.src,
    link: "/bazaar-city",
    colors: "#FFF0F8",
    tooltip:
      "Looking for something to buy or service you want to hire. May pa mine every Sabado!",
  },
  {
    id: 6,
    name: "New Pinoys on the Block",
    image: SidebarIcons.newPinoy.src,
    link: "/new-pinoys",
    colors: "#FBF2FF",
    tooltip:
      "Usefull information for newcomers(Immigrants, OFWs and students).",
  },
  {
    id: 7,
    name: "Job Centre",
    image: SidebarIcons.jobCenter.src,
    link: "/job-centre",
    colors: "#FFF5F5",
    tooltip:
      "Employers can post job openings and job-seekers can search and post their resume",
  },
  {
    id: 8,
    name: "Niknok",
    image: SidebarIcons.niknok.src,
    link: "/niknok",
    colors: "#FFF2E3",
    tooltip:
      "Featuring new updates twice a month, our Comic will keep you entertained!",
  },
  {
    id: 9,
    name: "P-Nation Calendar",
    image: SidebarIcons.nationCenter.src,
    link: "/p-nation",
    colors: "#EAFFF1",
    tooltip:
      "The Pinoy nation loves to fiesta Claim the data by posting your own event here. Les's get organized! ",
  },
  {
    id: 10,
    name: "Buyanihan",
    image: SidebarIcons.byebuyitem.src,
    link: "/buyanihan",
    colors: "#F2F4FF",
    tooltip: "You can donate, buy and sell items you don't need",
  },
  {
    id: 11,
    name: "Tambayan",
    image: SidebarIcons.tambayanMenu.src,
    link: "/tambayan",
    colors: "#EDFFFB",
    tooltip: "You can ask for advice, make new friends, etc...",
  },
  {
    id: 12,
    name: "My Profile",
    image: SidebarIcons.myProfile.src,
    link: "/my-profile",
    colors: "#F3FFE5",
    tooltip: "",
  },
];

export const SidebarList = ({ handleClose }: { handleClose?: () => void }) => {
  const routers = NextRouter.useRouter();
  const userId: any = Hooks.useUserId();

  return (
    <Mui.Stack
      sx={{ width: "100%", padding: "10px 10px 30px 10px", mt: 1 }}
      spacing={1}
    >
      {sidebarArrayList.map((item, index) => {
        return (
          (item.id !== 12 || userId) && (
            <LightTooltip
              key={index}
              title={
                item.tooltip !== "" ? (
                  <Mui.Box sx={{ p: 1.5 }}>
                    <StyledToolTipContent>{item.tooltip}</StyledToolTipContent>
                  </Mui.Box>
                ) : (
                  item.name
                )
              }
              placement="right"
              arrow
            >
              <Mui.List sx={{ p: 0 }} key={index}>
                <Mui.ListItemButton
                  sx={{
                    backgroundColor:
                      routers.pathname === item.link
                        ? `${item.colors}`
                        : "white",
                  }}
                  onClick={() => {
                    routers
                      .push(!userId ? "/accounts/login" : `${item.link}`)
                      .then(() => handleClose && handleClose());
                  }}
                >
                  <Mui.ListItemIcon>
                    {" "}
                    <img src={item.image} width={"50%"} />{" "}
                  </Mui.ListItemIcon>
                  <Mui.ListItemText
                    sx={{ ml: -2 }}
                    primary={
                      routers.pathname === item.link ? (
                        <StyledText>
                          <strong style={{ fontFamily: "CallunaTitle-Bold" }}>
                            {item.name}
                          </strong>
                        </StyledText>
                      ) : (
                        <StyledText>{item.name}</StyledText>
                      )
                    }
                  />
                </Mui.ListItemButton>
              </Mui.List>
            </LightTooltip>
          )
        );
      })}
    </Mui.Stack>
  );
};

interface SidebarArrayList {
  id: number;
  name: string;
  image: undefined | string;
  link: string;
  colors: string;
  tooltip: string;
}
