import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as MuiLab from "@mui/lab";
import * as Hooks from "hooks";
import * as React from "react";
import * as ReactQuery from "react-query";
import Checkbox from "assets/Icon ionic-md-radio-button-off.png";
import Checkedbox from "assets/Icon ionic-md-radio-button-on.png";
import MoneyTransfer from "assets/e-mail_money_transfer@2x.png";
import ElavonImage from "assets/elavon@2x.png";

import * as Api from "api";
import { uploadNewImage } from "utils/cloudinary";
import * as Views from "../views";

const Description = Mui.styled("textarea")(({ theme }) => ({
  backgroundColor: "#FAF7FF",
  borderRadius: "20px",
  width: "100%",
  padding: "1rem",
  outline: "none",
  border: "none",
  fontSize: "0.8rem",
  fontFamily: "Haborosans-normal",
  lineHeight: 1,
}));

const TextField = Mui.styled(Mui.TextField)({
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    border: "none",
  },
});

const Select = Mui.styled(Mui.Select)({
  width: "100%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
});
const UploadContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  width: "80%",
  height: "13rem",
  padding: "10px",
  border: "1px dashed #9B7DD4",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "10px",
  marginTop: "20px",
  marginLeft: "50px",
}));

const StyledTypography = Mui.styled(Mui.Typography)({
  fontFamily: "Raleway-semibold",
  fontSize: "0.75rem",
});

export const Payments = ({ open, onclose, refetchList }: any) => {
  const isMobile = Hooks.useMobileView();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    onclose();
  };

  return (
    <Mui.Stack spacing={2}>
      <Mui.Stack direction="row" justifyContent="space-between">
        <Mui.Typography sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
          LIVE Session Cost
        </Mui.Typography>
        <Mui.Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          $50
        </Mui.Typography>
      </Mui.Stack>
      <Mui.Divider />
      <Mui.Box>
        <Mui.Typography sx={{ fontSize: "0.75rem", color: "#707070" }}>
          Pay Via
        </Mui.Typography>
        <Mui.Stack direction="row" alignItems="center">
          <Mui.Radio size="small" inputProps={{ name: "paymentType" }} />
          <Mui.Typography sx={{ fontSize: "12px", flexGrow: 1 }}>
            E-mail Money Transfer
          </Mui.Typography>
          <Mui.CardMedia
            component="img"
            src={MoneyTransfer.src}
            sx={{ width: "25px" }}
          />
        </Mui.Stack>
        <Mui.Stack direction="row" alignItems="center">
          <Mui.Radio size="small" inputProps={{ name: "paymentType" }} />
          <Mui.Typography sx={{ fontSize: "12px", flexGrow: 1 }}>
            Elavon
          </Mui.Typography>
          <Mui.CardMedia
            component="img"
            src={ElavonImage.src}
            sx={{ width: "25px" }}
          />
        </Mui.Stack>
      </Mui.Box>
      <Mui.Box sx={{ mt: 2, pb: 2 }}>
        <Mui.Typography sx={{ fontSize: "0.75rem", color: "#707070", mb: 1 }}>
          Add Card Details
        </Mui.Typography>
        <Mui.Stack spacing={2}>
          <Mui.Box>
            <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
              Card Number
            </Mui.Typography>
            <TextField fullWidth sx={{ mt: 1 }} />
          </Mui.Box>
          <Mui.Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Mui.Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                Valid Through
              </Mui.Typography>
              <TextField fullWidth sx={{ mt: 1 }} />
            </Mui.Box>
            <Mui.Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                CVV
              </Mui.Typography>
              <TextField fullWidth sx={{ mt: 1 }} />
            </Mui.Box>
          </Mui.Stack>
          <Mui.Box>
            <Mui.Typography sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>
              Name on the Card
            </Mui.Typography>
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              placeholder="Benjamin Franklin"
            />
          </Mui.Box>
        </Mui.Stack>
      </Mui.Box>
      <Mui.Divider />
      <Mui.DialogActions>
        <Mui.Button variant="contained" size="large">
          Make Payment
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Stack>
  );
};
