import * as Server from "api";
import * as Mui from "@mui/material";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Router from "next/router";
import SampleImage from "assets/Rectangle 168@2x.png";
import CardBgImage from "assets/homepage/card_bg@2x.png";

const Avatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  width: "5.5rem",
  height: "5.5rem",
}));

const HeaderText = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Bold",
  fontSize: "1rem",
});

const Subheader = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaTitle-Semibold",
  fontSize: "0.7rem",
  color: "#707070",
});

const ImageContainer = Mui.styled(Mui.Box)({
  width: "50%",
  height: "14rem",
  cursor: "pointer",
  position: "relative",
});

const MobileImageContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "250px",
  cursor: "pointer",
});

const CardContainer = Mui.styled(Mui.Stack)({
  background: `url(${CardBgImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  padding: "15px",
  marginBottom: "20px",
});

const UserAvatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  width: "2.5rem",
  height: "2.5rem",
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
}));

const TextOverLay = Mui.styled(Mui.Box)({
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
  backgroundColor: "#3e3d3dbf",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  transition: "opacity 0.25s",
  opacity: 0,
  "& > *": {
    transform: "translateY(20px)",
    transition: "transform 0.25s",
  },
  "&:hover": {
    opacity: 1,
  },
  "&:hover > * ": {
    transform: "translateY(0)",
  },
});

export const PinoyPrenerues = () => {
  const routers = Router.useRouter();

  const { isLoading, data } = ReactQuery.useQuery(
    "HomePinoyPreneursList",
    () => {
      return Server.Server.Client().post(
        Server.Server.ApiRoutes.homePage.pinoyPreneursList,
        {
          limit: 3,
        }
      );
    }
  );
  const pinoyPreneursList = data?.data?.data;

  return (
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        title={"PinoyPreneurs"}
        actions={null}
        extraText={null}
      >
        <Mui.Stack>
          {pinoyPreneursList?.map(
            (pinoyPreneurs: pinoyPreneurs, index: number) => (
              <CardContainer
                key={index}
                spacing={2}
                onClick={() =>
                  routers.push(
                    `/pinoypreneurs/${pinoyPreneurs.template_id}/${pinoyPreneurs._id}`
                  )
                }
              >
                <Mui.Stack direction={"row"} spacing={2}>
                  <Mui.Box>
                    <Avatar
                      variant="square"
                      src={pinoyPreneurs.business_logo}
                    />
                  </Mui.Box>
                  <Mui.Stack spacing={1}>
                    <Mui.Box sx={{ mt: 1, width: "100%" }}>
                      <Components.Tags
                        textcolor={"#333333"}
                        color={"#F0F0F0"}
                        tagname={pinoyPreneurs.category[0].toUpperCase() +
                          pinoyPreneurs.category
                            .replaceAll("_", " ")
                            .slice(1)
                            .toLowerCase()}
                      />
                    </Mui.Box>
                    <HeaderText>{pinoyPreneurs.business_name}</HeaderText>
                    <Subheader>{pinoyPreneurs.business_description}</Subheader>
                  </Mui.Stack>
                </Mui.Stack>
                <Mui.Stack
                  sx={{ display: { xs: "none", md: "flex" } }}
                  direction={"row"}
                  spacing={2}
                >
                  {pinoyPreneurs.pinoyPreneur_products
                    .slice(0, 2)
                    .map((product, index) => (
                      <ImageContainer key={index}>
                        <Mui.Box
                          sx={{ borderRadius: "15px", objectFit: "cover" }}
                          width={"100%"}
                          height={"100%"}
                          component="img"
                          src={product.product_image}
                        />
                        {index === 1 && (
                          <TextOverLay>
                            <Mui.Typography>
                              {pinoyPreneurs.pinoyPreneur_products.length}{" "}
                              Images
                            </Mui.Typography>
                          </TextOverLay>
                        )}
                      </ImageContainer>
                    ))}
                </Mui.Stack>
                <Mui.Box sx={{ display: { xs: "block", md: "none" } }}>
                  <MobileImageContainer>
                    <Mui.Box
                      sx={{ borderRadius: "15px", objectFit: "cover" }}
                      width={"100%"}
                      height={"100%"}
                      component="img"
                      src={
                        pinoyPreneurs.pinoyPreneur_products.length > 0
                          ? pinoyPreneurs.pinoyPreneur_products[0].product_image
                          : ""
                      }
                    />
                  </MobileImageContainer>
                </Mui.Box>
                <Mui.Stack direction={"row"} spacing={2}>
                  <Mui.Box>
                    <UserAvatar src={pinoyPreneurs.profile_photo} />
                  </Mui.Box>
                  <Mui.Typography fontFamily="CallunaTitle-Semibold">
                    {pinoyPreneurs?.full_name}
                  </Mui.Typography>
                </Mui.Stack>
              </CardContainer>
            )
          )}
        </Mui.Stack>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};

interface PinoyPreneurProducts {
  _id: string;
  uid: string;
  PinoyPreneur_id: string;
  product_image: string;
  product_title: string;
  product_description: string;
  is_active: number;
  status: null;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
interface pinoyPreneurs {
  _id: string;
  uid: string;
  business_logo: string;
  business_name: string;
  business_description: string;
  category: string;
  province_name: string;
  postal_code: string;
  position: string;
  template_id: number;
  profile_photo: string;
  full_name: string;
  is_active: 1;
  createdAt: string;
  pinoyPreneur_products: PinoyPreneurProducts[];
}
