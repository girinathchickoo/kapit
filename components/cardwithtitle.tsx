import * as React from "react";
import * as Mui from "@mui/material";

const Heading = Mui.styled(Mui.Typography)({
  fontFamily: "CallunaTitle-Bold",
  fontSize: "1rem",
  color: "#333333"
});

export const CardWithTitle = ({
  children,
  title,
  actions,
  extraText,
  subtitle,
}: CardWithTitle) => {
  return (
    <Mui.Card sx={{ boxShadow: "none", position: "relative" }}>
      <Mui.CardContent sx={{ padding: "0.5rem" }}>
        <Mui.Toolbar
          sx={{ padding: "0px 10px !important", minHeight: "45px !important" }}
        >
          <Mui.Stack sx={{ width: "100%" }}>
            <Mui.Stack
              sx={{ width: "100%" }}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Heading variant="h6">{title}</Heading>
              <Mui.Typography
                sx={{ color: "#707070", fontSize: "0.75rem", fontFamily: "CallunaSans-Regular" }}
                variant="subtitle1"
              >
                {extraText}
              </Mui.Typography>
            </Mui.Stack>
            {subtitle ? (
              <Mui.Box sx={{ width: { xs: "60%", md: "100%" } }}>
                <Mui.Typography
                  fontSize="0.8rem"
                  fontFamily="CallunaSans-Regular"
                  color="#707070"
                >
                  {subtitle}
                </Mui.Typography>
              </Mui.Box>
            ) : null}
          </Mui.Stack>
        </Mui.Toolbar>

        <Mui.Stack />
        {/* width: 100rem;
    margin-left: -1rem;
    height: 2px;
    background-color: red;
    position: absolute; */}
        <Mui.Divider
          sx={{
            mb: 1,
            position: "relative",
            marginLeft: "-1rem",
            width: "100%",
          }}
        />
        <Mui.Box sx={{ p: 1 }}>{children}</Mui.Box>
      </Mui.CardContent>

      {actions !== null && (
        <Mui.Box sx={{ mt: "4rem" }}>
          <Mui.Box sx={{ position: "absolute", width: "100%", bottom: "1rem" }}>
            <Mui.Divider />
            <Mui.CardActions>
              <Mui.Stack
                sx={{ width: "100%", fontFamily: "CallunaSans-Regular" }}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {actions}
              </Mui.Stack>
            </Mui.CardActions>
          </Mui.Box>
        </Mui.Box>
      )}
    </Mui.Card>
  );
};

interface CardWithTitle {
  children: React.ReactNode;
  title: string | null;
  subtitle?: string | null;
  actions?: React.ReactNode | null;
  extraText?: string | React.ReactNode;
}
