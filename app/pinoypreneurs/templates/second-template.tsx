import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import TopImage from "assets/pinoypreneurs/template_2_bg@2x.png";
import * as Templates from "app/pinoypreneurs/templates";
import Image2 from "assets/pinoypreneurs/image_2.png";
import Footer from "assets/pinoypreneurs/template_2_footer_bg@2x.png";
import TagsImage from "assets/Tag@2x.png";
import Router from "next/router";
import * as Notistack from "notistack";
import copy from "copy-to-clipboard";

const TopBarStyle = Mui.styled(Mui.Box)({
  background: `url(${TopImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "110% 100%",
  height: "20rem",
  width: "100%",
  position: "relative",
});

const BottomImage = Mui.styled(Mui.Box)({
  background: `url(${Footer.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "110% 100%",
  height: "20rem",
  width: "100%",
  padding: "4rem",
});

const Avatar = Mui.styled(Mui.Avatar)({
  width: "3rem",
  height: "3rem",
  borderRadius: "10px",
  border: "2px solid #9B7DD4",
});

const Typography = Mui.styled(Mui.Typography)({
  fontFamily: "Haborosans-normal",
  fontSize: "0.8rem",
});

const OwnerTags = Mui.styled(Mui.Box)({
  background: `url(${TagsImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  padding: "2px 10px 2px 10px",
  marginTop: "5px",
});

const ImageContainer = Mui.styled(Mui.Box)({
  width: "70%",
  height: "500px",
  border: "5px solid #F5E9DC",
});

const OurProjects = ({ data }: Props) => {
  return (
    <Mui.Box sx={{ mt: "2rem", mb: "2rem", p: "2rem" }}>
      <Mui.Typography
        color={"#707070"}
        align="center"
        sx={{ fontSize: "1.3rem", fontWeight: 700 }}
      >
        Our {data?.company}
      </Mui.Typography>
      <Mui.Stack>
        {(data?.products as unknown as any[])?.map((item, index) => (
          <Mui.Box
            sx={{
              width: "75%",
              margin: index % 2 !== 0 ? "2rem auto" : "2rem 0px",
            }}
            key={index}
          >
            <ImageContainer>
              <Mui.Box
                width={"100%"}
                height="100%"
                component={"img"}
                sx={{ objectFit: "cover" }}
                src={item?.product_image}
              />
            </ImageContainer>
            <Mui.Stack spacing={1} sx={{ mt: "1rem", width: "70%" }}>
              <Mui.Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  letterSpacing: "0.8px",
                }}
              >
                {item?.product_title}
              </Mui.Typography>
              <Mui.Typography sx={{ fontSize: "0.8rem" }}>
                {item?.product_description}
              </Mui.Typography>
            </Mui.Stack>
          </Mui.Box>
        ))}
      </Mui.Stack>
    </Mui.Box>
  );
};

const ContactInfo = ({ data }: Props) => {
  const { enqueueSnackbar } = Notistack.useSnackbar();
  return (
    <BottomImage>
      <Mui.Box sx={{ width: "80%" }}>
        <Mui.Typography
          sx={{ fontSize: "1.3rem", fontWeight: 900, mb: "1rem" }}
        >
          {" "}
          Contact Info{" "}
        </Mui.Typography>
        <Mui.Grid container>
          <Mui.Grid item xs={12}>
            <Mui.Stack spacing={0.5}>
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
                      <MuiIcons.MailOutlineOutlined sx={{ color: "#BEBEBE" }} />
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
                      <MuiIcons.LanguageOutlined sx={{ color: "#BEBEBE" }} />
                    </Mui.ListItemIcon>
                    <Mui.ListItemText
                      sx={{ ml: "-1.5rem" }}
                      primary={<Typography>Website &emsp;</Typography>}
                    />
                    <Mui.Link
                      href={data?.company_website_link as string}
                      sx={{
                        height: "10px",
                        maxWidth: "250px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography noWrap>
                        {data?.company_website_link}
                      </Typography>
                    </Mui.Link>
                  </Mui.ListItem>
                </Mui.Box>
                <Mui.Box>
                  <Mui.Typography
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
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Box>
    </BottomImage>
  );
};

export const SecondTemplate = ({ refetch, data }: Props) => {
  return (
    <Mui.Box>
      <TopBarStyle>
        <Templates.TemplateToolBar refetch={refetch} />
        <Mui.Stack
          sx={{ width: "50%", margin: "3rem auto" }}
          justifyContent={"center"}
          alignItems="center"
          spacing={1}
        >
          <Mui.Typography sx={{ fontSize: "0.75rem", letterSpacing: "1.5px" }}>
            {(data?.catrgory as string)?.toLocaleUpperCase()}
          </Mui.Typography>
          <Mui.Typography
            sx={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "0.8px" }}
          >
            {data?.business_name}
          </Mui.Typography>
          <Mui.Typography align="center" sx={{ fontSize: "0.87rem" }}>
            {data?.business_description}
          </Mui.Typography>
        </Mui.Stack>
      </TopBarStyle>
      <OurProjects data={data} />
      <ContactInfo data={data} />
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
