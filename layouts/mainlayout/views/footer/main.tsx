import * as Mui from "@mui/material";
import FooterLogo from "assets/Logo_Stacked - Colored.png";
import Copyright from "assets/copyright.png";
import { HyperLink } from "./hyperLink";

export const Main = () => {
  return (
    <Mui.Box sx={{ marginTop: 2 }}>
      <Mui.Card
        sx={{
          boxShadow: "none",
          height: "100%",
          position: "relative",
          pt: 2,
        }}
      >
        <Mui.CardContent>
          <Mui.Grid container spacing={2}>
            <Mui.Grid item xs={12} md={2}>
              <Mui.Stack alignItems="center">
                <Mui.Box
                  src={FooterLogo.src}
                  component="img"
                  width={{ xs: "100%", md: "60%" }}
                  mx="auto"
                  maxWidth={100}
                />
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12} md={3}>
              <Mui.Stack
                spacing={1}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <HyperLink href="/about" name="About" />
                <HyperLink href="/contact-us" name="Contact Us" />
                <HyperLink href="/partners" name="Our Partners" />
                <HyperLink
                  href="/payment-subscription"
                  name="Payment & Subscription"
                />
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12} md={2}>
              <Mui.Stack
                spacing={1}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <HyperLink href="/terms" name="Terms of Service" />
                <HyperLink href="/privacy-policy" name="Privacy Policy" />
                <HyperLink href="/cookie-policy" name="Cookie Policy" />
                <HyperLink href="/legal-notice" name="Legal Notice" />
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12} md={3}>
              <Mui.Stack
                spacing={1}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <HyperLink href="/advertising-terms" name="Advertising Terms" />
                <HyperLink href="/commercial-terms" name="Commercial Terms" />
                <HyperLink
                  href="/self-serve-advertising"
                  name="Self-serve Advertising Terms"
                />
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12} md={2}>
              <Mui.Stack
                spacing={1}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <HyperLink href="/music-terms" name="Music Terms" />
                <HyperLink
                  href="/community-standards"
                  name="Community Standards"
                />
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Divider />
              <Mui.Stack
                mt={2}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <Mui.Box src={Copyright.src} component="img" width={18} />
                <Mui.Typography
                  fontSize="0.80rem"
                  fontFamily="CallunaSans-Regular"
                >
                  Copyright 2022. All Rights Reserved
                </Mui.Typography>
              </Mui.Stack>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.CardContent>
      </Mui.Card>
    </Mui.Box>
  );
};
