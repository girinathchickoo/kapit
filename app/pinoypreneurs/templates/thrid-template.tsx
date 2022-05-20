import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Templates from "app/pinoypreneurs/templates";
import ScrollImage from "assets/pinoypreneurs/pexels-pixabay-53176@2x.png";
import TagsImage from "assets/Tag@2x.png";
import Router from "next/router";
import * as Notistack from "notistack";
import copy from "copy-to-clipboard";

const Container = Mui.styled(Mui.Box)(() => ({
  width: "100%",
  height: "35rem",
}));

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.8rem",
});

const ImageListContent = Mui.styled(Mui.Box)({
  height: "5rem",
  width: "99.5%",
  color: "white",
  backgroundColor: "#00000085",
  position: "absolute",
  bottom: "0px",
  padding: "0.5rem",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none !important",
  },
  "&:hover": {
    height: "inherit",
  },
});

const Avatar = Mui.styled(Mui.Avatar)({
  width: "3rem",
  height: "3rem",
  borderRadius: "10px",
  border: "1px solid #9B7DD4",
});

const OwnerTags = Mui.styled(Mui.Box)({
  background: `url(${TagsImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  padding: "2px 10px 2px 10px",
  marginTop: "5px",
});

const OurProjects = ({ data }: Props) => {
  return (
    <Mui.Box sx={{ mt: "3rem" }}>
      <Mui.Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 800 }}>
          Our {data?.company}
        </Typography>
      </Mui.Stack>
      <Container sx={{ height: "35rem", mt: "1rem" }}>
        <Mui.Stack
          direction="row"
          sx={{
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {(data?.products as unknown as any[])?.map((item, index) => (
            <Mui.Box key={index} sx={{ position: "relative" }}>
              <Mui.ImageListItem
                sx={{ height: "100% !important", width: "500px" }}
              >
                <Mui.Box
                  component={"img"}
                  width="100%"
                  height="100%"
                  sx={{ objectFit: "cover" }}
                  src={item?.product_image}
                />
              </Mui.ImageListItem>
              <ImageListContent>
                <Typography sx={{ fontSize: "1rem", fontWeight: 800 }}>
                  {item?.product_title}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem" }} color="#ffffffc7">
                  {item?.product_description}
                </Typography>
              </ImageListContent>
            </Mui.Box>
          ))}
        </Mui.Stack>
      </Container>
    </Mui.Box>
  );
};

export const ContactUs = ({ data }: Props) => {
  const { enqueueSnackbar } = Notistack.useSnackbar();
  return (
    <Container sx={{ height: "30rem", marginTop: "3rem" }}>
      <Mui.Grid sx={{ height: "100%" }} container spacing={2}>
        <Mui.Grid sx={{ height: "100%" }} item xs={4}>
          <Mui.Box
            sx={{ backgroundColor: "black", width: "100%", height: "100%" }}
          >
            <Mui.Box
              width={"100%"}
              height="100%"
              component={"img"}
              src={data?.business_logo as string}
            />
          </Mui.Box>
        </Mui.Grid>
        <Mui.Grid sx={{ height: "100%" }} item xs={8}>
          <Mui.Box
            sx={{ width: "90%", marginTop: "4rem !important", margin: "auto" }}
          >
            <Mui.Typography
              sx={{ fontSize: "1.3rem", fontWeight: 900, mb: "3rem" }}
            >
              Contact Info
            </Mui.Typography>
            <Mui.Grid container>
              <Mui.Grid item xs={12}>
                <Mui.Stack spacing={1}>
                  <Mui.Stack
                    justifyContent="space-between"
                    direction={"row"}
                    alignItems="center"
                  >
                    <Mui.Stack
                      direction={"row"}
                      alignItems="center"
                      sx={{ height: "100%" }}
                      spacing={1}
                    >
                      <Avatar src={data?.profile_photo as string} />
                      <Mui.Box>
                        <Mui.Typography
                          sx={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          {data?.full_name}
                        </Mui.Typography>
                        <OwnerTags>
                          <Mui.Typography sx={{ fontSize: "0.65rem" }}>
                            {data?.position}
                          </Mui.Typography>
                        </OwnerTags>
                      </Mui.Box>
                    </Mui.Stack>
                    <Mui.Box>
                      <Mui.Typography
                        sx={{
                          fontSize: "0.75rem",
                          textDecoration: "underline",
                        }}
                        component={Mui.Link}
                        onClick={() => {
                          Router.push(`/user/${data?.uid}`);
                        }}
                      >
                        View Profile
                      </Mui.Typography>
                    </Mui.Box>
                  </Mui.Stack>
                  <Mui.Stack
                    justifyContent="space-between"
                    direction={"row"}
                    alignItems="center"
                  >
                    <Mui.Box>
                      <Mui.ListItem>
                        <Mui.ListItemIcon>
                          <MuiIcons.PhoneAndroidOutlined
                            sx={{ color: "#BEBEBE" }}
                          />
                        </Mui.ListItemIcon>
                        <Mui.ListItemText
                          sx={{ ml: "-1.5rem" }}
                          primary={<Typography>Phone No. &nbsp;</Typography>}
                        />
                        <Typography>{data?.phone_number}</Typography>
                      </Mui.ListItem>
                    </Mui.Box>
                    <Mui.Box>
                      <Mui.Typography
                        sx={{
                          fontSize: "0.75rem",
                          textDecoration: "underline",
                        }}
                        component={Mui.Button}
                        onClick={() => {
                          copy(data?.phone_number as string);
                          enqueueSnackbar("Link Copied", {
                            preventDuplicate: false,
                            persist: false,
                            variant: "success",
                          });
                        }}
                      >
                        Copy
                      </Mui.Typography>
                    </Mui.Box>
                  </Mui.Stack>
                  <Mui.Stack
                    justifyContent="space-between"
                    direction={"row"}
                    alignItems="center"
                  >
                    <Mui.Box>
                      <Mui.ListItem>
                        <Mui.ListItemIcon>
                          <MuiIcons.MailOutlineOutlined
                            sx={{ color: "#BEBEBE" }}
                          />
                        </Mui.ListItemIcon>
                        <Mui.ListItemText
                          sx={{ ml: "-1.5rem" }}
                          primary={<Typography>Mail ID &emsp;</Typography>}
                        />
                        <Typography>{data?.email_id}</Typography>
                      </Mui.ListItem>
                    </Mui.Box>
                    <Mui.Box>
                      <Mui.Typography
                        sx={{
                          fontSize: "0.75rem",
                          textDecoration: "underline",
                        }}
                        component={Mui.Button}
                        onClick={() => {
                          copy(data?.email_id as string);
                          enqueueSnackbar("Link Copied", {
                            preventDuplicate: false,
                            persist: false,
                            variant: "success",
                          });
                        }}
                      >
                        Copy
                      </Mui.Typography>
                    </Mui.Box>
                  </Mui.Stack>
                  <Mui.Stack
                    justifyContent="space-between"
                    direction={"row"}
                    alignItems="center"
                  >
                    <Mui.Box>
                      <Mui.ListItem>
                        <Mui.ListItemIcon>
                          <MuiIcons.HomeOutlined sx={{ color: "#BEBEBE" }} />
                        </Mui.ListItemIcon>
                        <Mui.ListItemText
                          sx={{ ml: "-1.5rem" }}
                          primary={<Typography>Address &emsp;</Typography>}
                        />
                        <Typography>
                          {data?.address},{data?.city},{data?.province_name}
                        </Typography>
                      </Mui.ListItem>
                    </Mui.Box>
                    <Mui.Box>
                      <Mui.Typography
                        sx={{
                          fontSize: "0.75rem",
                          textDecoration: "underline",
                        }}
                        component={Mui.Button}
                        onClick={() => {
                          copy(
                            (data?.address +
                              "," +
                              data?.city +
                              "," +
                              data?.province_name) as string
                          );
                          enqueueSnackbar("Link Copied", {
                            preventDuplicate: false,
                            persist: false,
                            variant: "success",
                          });
                        }}
                      >
                        Copy
                      </Mui.Typography>
                    </Mui.Box>
                  </Mui.Stack>
                </Mui.Stack>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Box>
        </Mui.Grid>
      </Mui.Grid>
    </Container>
  );
};

export const ThirdTemplate = ({ refetch, data }: Props) => {
  return (
    <Mui.Box sx={{ marginLeft: "4rem" }}>
      <Templates.TemplateToolBar refetch={refetch} />
      <Mui.Divider />
      <Container>
        <Mui.Grid sx={{ height: "100%" }} container spacing={2}>
          <Mui.Grid sx={{ height: "100%" }} item xs={7}>
            <Mui.Stack
              sx={{ height: "100%", marginRight: "auto", width: "70%" }}
              justifyContent={"center"}
              spacing={0.5}
            >
              <Typography color={"#333333"} sx={{ letterSpacing: "1px" }}>
                {(data?.catrgory as string)?.toLocaleUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: "1.6rem", fontWeight: 800 }}>
                {data?.business_name}
              </Typography>
              <Typography color={"#333333"}>
                {data?.business_description}
              </Typography>
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid sx={{ height: "100%" }} item xs={5}>
            <Mui.Box
              sx={{ backgroundColor: "black", width: "100%", height: "100%" }}
            >
              <Mui.Box
                width={"100%"}
                height="100%"
                component={"img"}
                src={data?.business_logo as string}
              />
            </Mui.Box>
          </Mui.Grid>
        </Mui.Grid>
      </Container>
      <OurProjects data={data} />
      <ContactUs data={data} />
    </Mui.Box>
  );
};

interface Props {
  data: Data;
  refetch?: any;
}

interface Data {
  [key: string]: string | number;
}
