import * as Mui from "@mui/material";
import * as Components from "components";
import FilterImg from "assets/filter@2x.png";
import TagsImage from "assets/Tag@2x.png";
import RatingsIcons from "assets/Icon awesome-star@2x.png";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "next/router";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as Layouts from "layouts";
import * as React from "react";
import { FilterDialog } from "./filter";

const ImageContainer = Mui.styled(Mui.Typography)({
  width: "95%",
  height: "17rem",
  marginLeft: "5px !important",
});

const Container = Mui.styled(Mui.Paper)({
  width: "95%",
  height: "auto",
  border: "1px solid #E6E6E6",
  padding: "1rem",
  position: "relative",
  margin: "auto",
});

const Avatar = Mui.styled(Mui.Avatar)({
  width: "5rem",
  height: "5rem",
  borderRadius: "10px",
});

const OwnerTags = Mui.styled(Mui.Box)({
  background: `url(${TagsImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "80% 100%",
  height: "100%",
  width: "7rem",
  padding: "2px 10px 2px 10px",
  marginTop: "5px",
});

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
  borderRadius: "15px",
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

const Filter = ({ open, setOpen, selected, setSelected }: FilterType) => {
  const FilterProps = {
    open,
    setOpen,
    selected: selected,
    setSelected: setSelected,
  };

  return (
    <>
      <Mui.IconButton onClick={() => setOpen(true)}>
        <Mui.CardMedia
          component="img"
          sx={{ height: "30px", width: "30px" }}
          src={FilterImg.src}
        ></Mui.CardMedia>
        <Mui.Typography
          sx={{ fontSize: "0.9rem", paddingLeft: "10px" }}
          color="primary"
        >
          filter
        </Mui.Typography>
      </Mui.IconButton>
      <FilterDialog {...FilterProps} />
    </>
  );
};

const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  top: "50%",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  width: "16px",
  height: "16px",

  right: "1rem",
  "&:hover": { bgcolor: "white" },
});

const ImgComponent = ({ images, id }: { images: string[]; id: string }) => {
  const [index, setIndex] = React.useState(0);
  const router = Router.useRouter();

  const nextImage = () => {
    if (images?.length > index + 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const previousImage = () => {
    if (images?.length < index - 1) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  };

  return (
    <Mui.Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Mui.Card
        elevation={0}
        component={"img"}
        src={images?.[index]}
        sx={{
          width: 300,
          height: 300,
          float: "left",
          margin: "3px",
          padding: "3px",
        }}
      />
      {index !== 0 && (
        <NavButton onClick={previousImage} sx={{ left: "1rem" }}>
          <MuiIcons.KeyboardArrowLeft fontSize="small" />
        </NavButton>
      )}
      {images?.length - 1 > index && (
        <NavButton onClick={nextImage} sx={{}}>
          <MuiIcons.KeyboardArrowRight fontSize="small" />
        </NavButton>
      )}
    </Mui.Box>
  );
};

export const BusinessListing = () => {
  const routers = Router.useRouter();
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);

  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState<string[]>([]);

  const { isLoading, data } = ReactQuery.useQuery(
    ["PnoyPreneursList", value, category],
    () => {
      return Api.Server.Client().post(Api.Server.ApiRoutes.pinoyPreneurs.list, {
        search: value,
        pageNumber: 1,
        types_of_industry: category,
        nature_of_business: [],
      });
    }
  );

  const FilterProps = {
    open,
    setOpen,
    selected: category,
    setSelected: setCategory,
  };

  const ListData: ListData[] = data?.data?.data;
  console.log(ListData);
  return (
    <Components.CardWithTitle
      title={"Business Listing"}
      actions={null}
      extraText={<Filter {...FilterProps} />}
    >
      <Mui.Grid container spacing={2}>
        {ListData?.map((item, index) => (
          <Mui.Grid key={index} item container xs={12} lg={4} md={6}>
            {index % 2 === 0 && index !== 0 ? (
              <Container
                sx={{ backgroundColor: "#E6E6E6", height: "100%" }}
                elevation={0}
              >
                <Mui.Typography>In Native ads</Mui.Typography>
              </Container>
            ) : (
              <Mui.Box sx={{ width: "100%" }}>
                <Container elevation={0}>
                  <Mui.Stack spacing={2} sx={{ height: "100%" }}>
                    <Mui.Stack
                      sx={{ height: "20%" }}
                      direction={"row"}
                      alignItems="center"
                      spacing={2}
                    >
                      <Avatar src={item.business_logo} />
                      <Mui.Stack spacing={0.5}>
                        <Components.Tags
                          tagname={item.catrgory}
                          color="#F0F0F0"
                        />
                        <Mui.Typography
                          sx={{ fontSize: "0.9rem", fontWeight: 600 }}
                        >
                          {item.business_name}
                        </Mui.Typography>
                        <Mui.Typography
                          sx={{ fontSize: "0.7rem", color: "#707070" }}
                        >
                          {item.province_name}
                        </Mui.Typography>
                      </Mui.Stack>
                    </Mui.Stack>
                    <Mui.Box
                      sx={{
                        borderRadius: "15px",
                        overflow: "hidden",
                        objectFit: "fill",
                        objectPosition: "center",
                        height: "100%",
                        maxHeight: 300,
                      }}
                    >
                      <ImgComponent
                        images={item?.pinoyPreneur_products.map(
                          (product) => product.product_image
                        )}
                        id={item?._id as string}
                      />
                    </Mui.Box>
                    <Mui.Stack
                      sx={{ height: "13%" }}
                      justifyContent="space-between"
                      direction={"row"}
                      alignItems="center"
                      spacing={2}
                    >
                      <Mui.Stack
                        direction={"row"}
                        alignItems="center"
                        sx={{ height: "100%", width: "100%" }}
                        spacing={1}
                      >
                        <Avatar
                          src={item.profile_photo}
                          sx={{ width: "25%", height: "40px" }}
                        />
                        <Mui.Box sx={{ height: "100%", width: "75%" }}>
                          <Mui.Typography
                            sx={{
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              fontFamily: "CallunaTitle-Bold",
                            }}
                          >
                            {item.full_name}
                          </Mui.Typography>
                          <OwnerTags>
                            <Mui.Typography
                              sx={{
                                fontSize: "0.65rem",
                                color: "white",
                                fontFamily: "CallunaTitle-Semibold",
                              }}
                            >
                              {item.position}
                            </Mui.Typography>
                          </OwnerTags>
                        </Mui.Box>
                      </Mui.Stack>
                      <Mui.Box>
                        <Mui.Button
                          sx={{
                            fontFamily: "Haborosans-normal",
                            width: "9%",
                            marginTop: "15px",
                          }}
                          startIcon={
                            <Mui.Box
                              width={"100%"}
                              component={"img"}
                              src={RatingsIcons.src}
                            />
                          }
                          variant="outlined"
                        >
                          {item.ratedBy}
                        </Mui.Button>
                      </Mui.Box>
                    </Mui.Stack>
                  </Mui.Stack>
                  <TextOverLay>
                    <Mui.Button
                      onClick={() =>
                        routers.push(
                          `/pinoypreneurs/${item.template_id}/${item._id}`
                        )
                      }
                      sx={{
                        width: "70%",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                        },
                      }}
                      variant="contained"
                    >
                      {" "}
                      View more Details
                    </Mui.Button>
                  </TextOverLay>
                </Container>
                {index % 9 === 0 && index !== 0 ? (
                  <Mui.Box sx={{ margin: "2% 0px" }}>
                    <Components.Atfbanner />
                  </Mui.Box>
                ) : (
                  ""
                )}
              </Mui.Box>
            )}
          </Mui.Grid>
        ))}
      </Mui.Grid>
    </Components.CardWithTitle>
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
interface ListData {
  business_description: null | string;
  business_logo: string | any;
  business_name: null | string;
  catrgory: null | string;
  createdAt: null | string;
  full_name: null | string;
  is_active: null | number;
  position: null | string;
  postal_code: null | string;
  profile_photo: any | string;
  province_name: null | string;
  ratedBy: null | string;
  template_id: null | number;
  uid: null | string;
  _id: null | string;
  pinoyPreneur_products: PinoyPreneurProducts[];
}

interface FilterType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
}
