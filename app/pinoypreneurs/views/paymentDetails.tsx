import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import EmailTransferImage from "assets/e-mail_money_transfer@2x.png";
import ElavonTransferImage from "assets/elavon@2x.png";

const TextField = Mui.styled("input")(({ theme }) => ({
  backgroundColor: "#FAF7FF",
  borderRadius: "10px",
  width: "100%",
  padding: "1rem",
  outline: "none",
  border: "none",
  fontSize: "0.8rem",
  fontFamily: "Haborosans-normal",
  lineHeight: 1.4,
}));

export const PaymentDetails = () => {
  const [value, setValue] = React.useState("email");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Mui.Box>
      <Mui.Grid container>
        <Mui.Grid item xs={12} md={5}>
          <Mui.Stack spacing={2}>
            <Mui.Paper
              elevation={0}
              sx={{ p: "1rem", border: "1px solid black", width: "fit-content" }}
            >
              <Mui.Typography sx={{ fontSize: "0.85rem" }}>
                Monthly Subscription
              </Mui.Typography>
              <Mui.Typography sx={{ fontSize: "0.75rem" }}>$75</Mui.Typography>
            </Mui.Paper>
            <Mui.Box>
              <Mui.Typography color={"#BEBEBE"} sx={{ fontSize: "0.75rem" }}>
                Pay via
              </Mui.Typography>
              <Mui.FormControl>
                <Mui.RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <Mui.Stack
                    sx={{ width: "90%" }}
                    justifyContent="space-between"
                    alignItems={"center"}
                    direction={"row"}
                  >
                    <Mui.FormControlLabel
                      value="email"
                      control={<Mui.Radio />}
                      label={
                        <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                          E-mail Money Transfer
                        </Mui.Typography>
                      }
                    />
                    <Mui.Box
                      width={"10%"}
                      height="10%"
                      component={"img"}
                      src={EmailTransferImage.src}
                    />
                  </Mui.Stack>
                  <Mui.Stack
                    sx={{ width: "90%" }}
                    justifyContent="space-between"
                    alignItems={"center"}
                    direction={"row"}
                  >
                    <Mui.FormControlLabel
                      value="elavon"
                      control={<Mui.Radio />}
                      label={
                        <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                          Elavon
                        </Mui.Typography>
                      }
                    />
                    <Mui.Box
                      width={"10%"}
                      height="10%"
                      component={"img"}
                      src={ElavonTransferImage.src}
                    />
                  </Mui.Stack>
                </Mui.RadioGroup>
              </Mui.FormControl>
            </Mui.Box>
          </Mui.Stack>
        </Mui.Grid>
        <Mui.Grid item xs={12} md={5}>
          <Mui.Stack spacing={2}>
            <Mui.Stack>
              <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                {" "}
                Card Number{" "}
              </Mui.Typography>
              <TextField />
            </Mui.Stack>
            <Mui.Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Mui.Box sx={{ width: "49%" }} >
                <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                  Valid Through
                </Mui.Typography>
                <TextField />
              </Mui.Box>
              <Mui.Box sx={{ width: "49%" }} >
                <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                  CVV
                </Mui.Typography>
                <TextField />
              </Mui.Box>
            </Mui.Stack>
            <Mui.Stack>
              <Mui.Typography sx={{ fontSize: "0.75rem" }}>
                {" "}
                Name on Card
              </Mui.Typography>
              <TextField />
            </Mui.Stack>
          </Mui.Stack>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Box>
  );
};
