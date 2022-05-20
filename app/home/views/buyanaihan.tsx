import React from "react";
import * as Mui from "@mui/material";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as NextRouters from "next/router";
import moment from "moment";
import * as Layouts from "layouts";
import * as MuiIcons from "@mui/icons-material";

const NavButton = Mui.styled(Mui.IconButton)({
  position: "absolute",
  top: "50%",
  backgroundColor: "white !important",
  border: "2px solid #9B7DD4",
  width: "16px",
  height: "16px",
  "&:hover": { bgcolor: "white" },
});

const ArrowButton = ({ type, handleClick }: ArrowButtonProps) => {
  const Arrow = ({ sx }: Mui.TypographyProps) => {
    return type === "left" ? (
      <MuiIcons.KeyboardArrowLeft sx={sx} />
    ) : (
      <MuiIcons.KeyboardArrowRight sx={sx} />
    );
  };

  return (
    <NavButton
      onClick={handleClick}
      sx={{
        ...(type === "left" ? { left: "1rem" } : { right: "1rem" }),
      }}
    >
      <Arrow sx={{ fontSize: "12px" }} />
    </NavButton>
  );
};

export const Buyanaihan = () => {
  const routers = NextRouters.useRouter();
  const [ImgCount, setImgCount] = React.useState(0);

  const { data } = ReactQuery.useQuery<PostList[]>(
    ["HomeBuyanihan"],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.buyanihan.listBuyanihan,
        {
          search: "",
          pageNumber: 1,
          filterCategory: [],
        }
      );
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <Mui.Box sx={{ height: "100%" }}>
      <Components.CardWithTitle
        title="Buyanaihan"
        actions={null}
        extraText={null}
      >
        <Mui.Grid container>
          {data?.slice(0, 4).map((item, index) => (
            <Mui.Grid
              xs={12}
              sm={6}
              sx={{ p: 2 }}
              onClick={() => routers.push(`buyanihan/${item._id}`)}
            >
              <Mui.Stack spacing={1}>
                <Mui.Box
                  sx={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <Mui.CardMedia
                    component={"img"}
                    src={item?.post_images[0]}
                    sx={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </Mui.Box>
                <Mui.Box>
                  <Mui.Typography sx={{ fontFamily: "callunaSans- Semibold" }}>
                    {item.item_name}
                  </Mui.Typography>
                  <Mui.Typography
                    sx={{
                      fontFamily: "callunaSans- Semibold",
                      color: "#707070",
                    }}
                  >
                    {item.is_this_price} {item.enter_your_price}
                  </Mui.Typography>
                </Mui.Box>
              </Mui.Stack>
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};

export interface PostList {
  _id: string;
  uid?: string;
  item_name: string;
  purpose_to_add: string;
  enter_your_price: string;
  is_this_price: string;
  post_images: string[];
  category: string;
  full_name: string;
  profile_photo: string;
  likedBy: string;
  location: string;
  number_of_likes?: number;
  number_of_comments?: number;
}

interface ArrowButtonProps {
  type: string;
  handleClick: () => void;
}
