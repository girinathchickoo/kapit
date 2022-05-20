import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import TagsImage from "assets/Tag@2x.png";
import Image1 from "assets/template_illustration@2x.png";
import * as Templates from "app/pinoypreneurs/templates";
import Router from "next/router";
import * as Notistack from "notistack";
import copy from "copy-to-clipboard";

const HeaderStyle = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "100%",
  height: "20rem",
  backgroundColor: "#C1E9FC",
  borderRadius: "15px",
  //   background: `url(${LoginBackground.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  position: "relative",
}));

const SubHeaderStyle = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "75%",
  height: "20rem",
  backgroundColor: "#5286B2",
  borderRadius: "0px 35px 35px 0px",
  position: "absolute",
  top: "50%",
  padding: "1.5rem",
}));

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.8rem",
  color: "white",
});

const OwnerTags = Mui.styled(Mui.Box)({
  background: `url(${TagsImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  padding: "2px 10px 2px 10px",
  marginTop: "5px",
});

const BottomInfo = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "100 %",
  height: "21rem",
  marginTop: "2.1rem",
  zIndex: 1100,
}));

const Avatar = Mui.styled(Mui.Avatar)({
  width: "3rem",
  height: "3rem",
  borderRadius: "10px",
  border: "2px solid #9B7DD4",
});

const TemplateHeaderOne = ({ data, refetch }: Props) => {
  console.log(data);
  return (
    <Mui.Box>
      <HeaderStyle>
        <Templates.TemplateToolBar refetch={refetch} />
        <Mui.Typography
          sx={{ fontSize: "0.9rem" }}
          align="center"
          color={"#5286B2"}
        >
          {(data?.catrgory as string)?.toLocaleUpperCase()}
        </Mui.Typography>
        <Mui.Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 900,
            textTransform: "capitalize",
          }}
          align="center"
          color={"#487DAA"}
        >
          {data?.business_name}
        </Mui.Typography>
      </HeaderStyle>
    </Mui.Box>
  );
};

const SecondTemplate = ({ data }: Props) => {
  return (
    <Mui.Box>
      <SubHeaderStyle>
        <Mui.Stack
          sx={{ width: "100%", height: "100%" }}
          direction={"row"}
          alignItems="center"
          spacing={2}
        >
          <Mui.Box sx={{ width: "30%" }}></Mui.Box>
          <Mui.Box sx={{ width: "70%" }}>
            <Mui.Typography
              color={"white"}
              sx={{ fontSize: "1.3rem", fontWeight: 900 }}
            >
              About
            </Mui.Typography>
            <Mui.Divider color={"white"} sx={{ mt: "0.8rem", mb: "0.8rem" }} />
            <Mui.Typography color={"white"} sx={{ fontSize: "0.85rem" }}>
              {data?.business_description}
            </Mui.Typography>
          </Mui.Box>
        </Mui.Stack>
      </SubHeaderStyle>
    </Mui.Box>
  );
};

const ContactInfo = ({ data }: Props) => {
  const { enqueueSnackbar } = Notistack.useSnackbar();
  return (
    <Mui.Box sx={{ width: "80%" }}>
      <Mui.Typography
        color={"white"}
        sx={{ fontSize: "1.3rem", fontWeight: 900 }}
      >
        {" "}
        Contact Info{" "}
      </Mui.Typography>
      <Mui.Divider color={"white"} sx={{ mt: "0.5rem", mb: "1rem" }} />
      <Mui.Grid container>
        <Mui.Grid item xs={12}>
          <Mui.Stack spacing={0.2}>
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
                    color={"white"}
                    sx={{ fontSize: "0.8rem", fontWeight: 600 }}
                  >
                    {data?.full_name}
                  </Mui.Typography>
                  <OwnerTags>
                    <Mui.Typography
                      sx={{ fontSize: "0.65rem", color: "white" }}
                    >
                      {data?.position}
                    </Mui.Typography>
                  </OwnerTags>
                </Mui.Box>
              </Mui.Stack>
              <Mui.Box>
                <Mui.Typography
                  color={"#C1E9FC"}
                  sx={{ fontSize: "0.75rem", textDecoration: "underline" }}
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
                    <MuiIcons.PhoneAndroid sx={{ color: "#C1E9FC" }} />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText
                    sx={{ ml: "-1.5rem" }}
                    primary={<Typography>Phone No. &nbsp;</Typography>}
                  />
                  <Typography sx={{ maxWidth: { md: "300px", xs: "60px" } }}>
                    {data?.phone_number}
                  </Typography>
                </Mui.ListItem>
              </Mui.Box>
              <Mui.Box>
                <Mui.Typography
                  color={"#C1E9FC"}
                  sx={{ fontSize: "0.75rem", textDecoration: "underline" }}
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
                    <MuiIcons.MailOutlineOutlined sx={{ color: "#C1E9FC" }} />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText
                    sx={{ ml: "-1.5rem" }}
                    primary={<Typography>Mail ID &emsp;</Typography>}
                  />
                  <Typography
                    sx={{ maxWidth: { md: "300px", xs: "70px" } }}
                    noWrap
                  >
                    {data?.email_id}
                  </Typography>
                </Mui.ListItem>
              </Mui.Box>
              <Mui.Box>
                <Mui.Typography
                  color={"#C1E9FC"}
                  sx={{ fontSize: "0.75rem", textDecoration: "underline" }}
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
                    <MuiIcons.LanguageOutlined sx={{ color: "#C1E9FC" }} />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText
                    sx={{ ml: "-1.5rem" }}
                    primary={<Typography>Website &emsp;</Typography>}
                  />
                  <Mui.Link
                    href={data?.company_website_link as string}
                    sx={{
                      height: "10px",
                      maxWidth: { md: "250px", xs: "50px" },
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography noWrap>{data?.company_website_link}</Typography>
                  </Mui.Link>
                </Mui.ListItem>
              </Mui.Box>
              <Mui.Box>
                <Mui.Typography
                  color={"#C1E9FC"}
                  sx={{ fontSize: "0.75rem", textDecoration: "underline" }}
                  component={Mui.Button}
                  onClick={() => {
                    copy(data?.company_website_link as string);
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
                    <MuiIcons.HomeOutlined sx={{ color: "#C1E9FC" }} />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText
                    sx={{ ml: "-1.5rem" }}
                    primary={<Typography>Address &emsp;</Typography>}
                  />
                  <Typography
                    sx={{ maxWidth: { md: "300px", xs: "70px" } }}
                    noWrap
                  >
                    {data?.address},{data?.city},{data?.province_name}
                  </Typography>
                </Mui.ListItem>
              </Mui.Box>
              <Mui.Box>
                <Mui.Typography
                  color={"#C1E9FC"}
                  sx={{ fontSize: "0.75rem", textDecoration: "underline" }}
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
  );
};

export const FirstTemplate = ({ refetch, ...data }: Props) => {
  return (
    <Mui.Box>
      <Mui.Box>
        <Mui.Box sx={{ position: "relative" }}>
          <TemplateHeaderOne refetch={refetch} {...data} />
          <SecondTemplate {...data} />
        </Mui.Box>
        <Mui.Box sx={{ mt: "12rem" }}>
          <Mui.Container maxWidth="lg">
            <Mui.Box sx={{ width: "90%", margin: "auto" }}>
              <Mui.Typography
                color={"#2B87A7"}
                sx={{ fontSize: "1.3rem", fontWeight: 900 }}
              >
                Our {data?.data?.company}
              </Mui.Typography>
              <Mui.Divider sx={{ mt: "0.2rem", mb: "2rem" }} />
            </Mui.Box>
            <Mui.Grid
              sx={{ width: "90%", margin: "auto" }}
              container
              spacing={2}
            >
              {(data?.data?.products as unknown as any[])?.map((item, i) => {
                return (
                  <Mui.Grid item xs={4} key={i}>
                    <Mui.Paper
                      elevation={0}
                      sx={{
                        height: "22rem",
                        p: "0.8rem",
                        borderRadius: "5px !important",
                        border: "1px solid #E6E6E6",
                      }}
                    >
                      <Mui.Box sx={{ height: "60%" }}>
                        <Mui.Box
                          sx={{ borderRadius: "10px", objectFit: "cover" }}
                          src={item?.product_image}
                          component={"img"}
                          width="100%"
                          height={"100%"}
                        />
                      </Mui.Box>
                      <Mui.Box
                        sx={{
                          height: "40%",
                          py: 1,
                          overflow: "auto",
                          "&::-webkit-scrollbar": {
                            display: "none !important",
                          },
                        }}
                      >
                        <Mui.Typography
                          sx={{ fontSize: "1rem", fontWeight: 800 }}
                        >
                          {item?.product_title}
                        </Mui.Typography>
                        <Mui.Typography sx={{ fontSize: "0.8rem" }}>
                          {item?.product_description}
                        </Mui.Typography>
                      </Mui.Box>
                    </Mui.Paper>
                  </Mui.Grid>
                );
              })}
            </Mui.Grid>
          </Mui.Container>
        </Mui.Box>
        <Mui.Box sx={{ position: "relative" }}>
          <BottomInfo>
            <Mui.Grid sx={{ height: "100%" }} container spacing={2}>
              <Mui.Grid sx={{ height: "100%" }} item xs={4}>
                <Mui.Box sx={{ height: "100%" }}>
                  <Mui.Box
                    width={"100%"}
                    height="100%"
                    src={Image1.src}
                    component={"img"}
                  />
                </Mui.Box>
              </Mui.Grid>
              <Mui.Grid sx={{ height: "100%" }} item xs={8}>
                <Mui.Box
                  sx={{
                    backgroundColor: "#5286B2",
                    borderRadius: "35px 0px 0px 35px",
                    padding: "1.5rem",
                    height: "100%",
                  }}
                >
                  <ContactInfo {...data} />
                </Mui.Box>
              </Mui.Grid>
            </Mui.Grid>
          </BottomInfo>
        </Mui.Box>
      </Mui.Box>
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
