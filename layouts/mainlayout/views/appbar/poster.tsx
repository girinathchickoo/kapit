import * as Mui from "@mui/material";
import * as NextRouter from "next/router";
import HomepagePoster from "assets/banners/Masthead.png";
import WhatsUpCanadaPoster from "assets/banners/Header - WhatsUpCanada.png";
import FoodTripPoster from "assets/banners/HeaderFoodTrip.png";
import NewPinoyPoster from "assets/banners/Header - New Pinoys on the Block.png";
import Niknokposter from "assets/banners/Header - niknok.png";
import TambayanPoster from "assets/banners/Header - Tambayan, Donasyon, atbp..png";
import PnationCalendarImage from "assets/banners/Header - P-Nation Calendar.png";
import JobCenterImage from "assets/banners/Header - Job Centre.png";
import PinoyPreners from "assets/banners/Header - PinoyPreneurs.png";
import BazaarCity from "assets/banners/Header - Bazaar City.png";
import Buyanihan from "assets/banners/Header - Donasyon atbp.png"

const Container = Mui.styled(Mui.Paper)(({ theme }) => ({
  borderRadius: "40px !important",
  width: "100%",
}));

export const Poster = () => {
  const routers = NextRouter.useRouter();
  const getRouteName = routers.pathname.split("/")[1];
  console.log(getRouteName)
  const posterImage = {
    "/": HomepagePoster.src,
    "whats-up-canada": WhatsUpCanadaPoster.src,
    foodtrip: FoodTripPoster.src,
    "new-pinoys": NewPinoyPoster.src,
    niknok: Niknokposter.src,
    tambayan: TambayanPoster.src,
    "p-nation": PnationCalendarImage.src,
    "bazaar-city": BazaarCity.src,
    "job-centre": JobCenterImage.src,
    pinoypreneurs: PinoyPreners.src,
    "contact-us": HomepagePoster.src,
    buyanihan: Buyanihan.src,
  }[
    getRouteName !== "" &&
      getRouteName !== "my-profile" &&
      getRouteName !== "user" && getRouteName
      ? getRouteName
      : "/"
  ];
  return (
    <Container
      elevation={0}
      sx={{
        height: { xs: "7rem", md: "13rem" },
      }}
    >
      <Mui.Box
        component="img"
        src={posterImage}
        width={"100%"}
        height={"100%"}
        sx={{
          borderBottomLeftRadius: { xs: "1rem", md: "3rem" },
          borderBottomRightRadius: { xs: "1rem", md: "3rem" },
          objectFit: "cover",
        }}
      />
    </Container>
  );
};
