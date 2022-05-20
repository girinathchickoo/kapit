import * as Mui from "@mui/material";
import * as React from "react";
import * as Components from "components";
import * as NextRouters from "next/router";

const ImageContainer = Mui.styled(Mui.Box)({
  width: "100%",
  height: "9rem",
});

const DavisFontText = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaSans-Regular",
  fontSize: "0.75rem",
  fontWeight: 600,
});

export const Podcast = ({ data }: any) => {
  const routers = NextRouters.useRouter();

  return (
    <Mui.Box>
      <Components.CardWithTitle
        title={"Podcast"}
        actions={null}
        extraText={null}
      >
        <Mui.Grid container spacing={3}>
          {data?.map((item: any, index: any) => (
            <Mui.Grid
              item
              key={index}
              xs={12}
              sm={6}
              lg={3}
              onClick={() =>
                routers.push(`/whats-up-canada/podcast/${item._id}`)
              }
            >
              <Mui.Stack spacing={1}>
                <Mui.Box
                  sx={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    overflow: "hidden",
                    width: "100%",
                    height: "13rem",
                  }}
                >
                  <Mui.CardMedia
                    component="img"
                    src={item?.author_imageUrl}
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Mui.Box>
                <Mui.Box>
                  <DavisFontText>{item?.title}</DavisFontText>
                  <DavisFontText sx={{ fontSize: "0.7rem" }} color={"#707070"}>
                    {item?.description.slice(0, 150)}
                  </DavisFontText>
                </Mui.Box>
              </Mui.Stack>
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
