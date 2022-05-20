import * as Mui from "@mui/material";

export const ContinueButton = ({ nextStep }: any) => (
  <Mui.Button sx={{ width: "6rem" }} variant="contained" onClick={nextStep}>
    Continue
  </Mui.Button>
);
export const MakePayment = ({ nextStep }: any) => (
  <Mui.Button sx={{ width: "10rem" }} variant="contained" onClick={nextStep}>
    Free Trial
  </Mui.Button>
);
export const SubmitDetails = ({ nextStep }: any) => (
  <Mui.Button sx={{ width: "10rem" }} variant="contained" onClick={nextStep}>
    submit details
  </Mui.Button>
);
export const Finish = ({ nextStep }: any) => (
  <Mui.Button sx={{ width: "6rem" }} type="submit" variant="contained">
    Finish
  </Mui.Button>
);
