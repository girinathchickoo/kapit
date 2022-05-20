import * as Mui from "@mui/material";
import * as Components from "components";
import * as NextRouters from "next/router";
import moment from "moment";
import * as MuiIcons from "@mui/icons-material";

const ImageContainer = Mui.styled(Mui.Box)({
  width: "7.5rem",
  height: "7.5rem",
});

const Styledtypography = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
});

const Heading = Mui.styled(Mui.Typography)({
  fontSize: "1rem",
  color: "#333333",
  fontFamily: "CallunaTitle-Bold",
  fontWeight: 600,
  opacity: 0.9,
});

const Subheader = Mui.styled(Mui.Typography)({
  fontSize: "0.9rem",
  color: "#707070",
  fontFamily: "CallunaTitle-Semibold",
  opacity: 0.9,
  maxHeight: "75px",
  overflow: "hidden",
  ">p": {
    marginTop: "7px",
    marginBottom: "2px",
  },
});

export const Articles = ({ data }: any) => {
  const routers = NextRouters.useRouter();

  return (
    <Mui.Box>
      <Components.CardWithTitle
        title={"Articles"}
        actions={null}
        extraText={null}
      >
        <Mui.Stack spacing={2}>
          {data?.map((item: any, index: number) => (
            <Mui.Stack
              key={index}
              spacing={2}
              sx={{ cursor: "pointer", padding: "8px 14px" }}
              direction={{ xs: "column", sm: "row" }}
              onClick={() => routers.push(`/new-pinoys/${item._id}`)}
            >
              <Mui.Box
                sx={{
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "7rem" },
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Mui.Box
                  component="img"
                  src={item.thumbNail_url}
                  sx={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    borderRadius: "20px",
                    height: { xs: "10rem", sm: "7rem" },
                  }}
                />
              </Mui.Box>
              <Mui.Box sx={{ flexGrow: 1 }}>
                <Mui.Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Mui.Box>
                    <Components.Tags
                      tagname={item?.tag_name}
                      color={"#EDFFFB"}
                      textcolor={"#137966"}
                    />
                    <Mui.Typography
                      sx={{
                        fontSize: "0.8rem",
                        display: "flex",
                        direction: "row",
                        alignItems: "center",
                      }}
                      color={"#707070"}
                    >
                      {item.source}
                      {item.source && item.province_name && (
                        <Mui.Icon
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <MuiIcons.FiberManualRecord
                            sx={{ color: "#707070", fontSize: "8px" }}
                          />
                        </Mui.Icon>
                      )}
                      {item.province_name}
                    </Mui.Typography>
                  </Mui.Box>
                  {/* <Mui.Typography fontSize="0.75rem">
                    {moment(item?.createdAt).format("MMM DD, YYYY")}
                  </Mui.Typography> */}
                </Mui.Stack>
                <Mui.Box>
                  <Heading>{item.title}</Heading>
                  {/* <Subheader
                    dangerouslySetInnerHTML={{ __html: item.Post_description }}
                  /> */}
                </Mui.Box>
              </Mui.Box>
            </Mui.Stack>
          ))}
        </Mui.Stack>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};
