import * as Server from "api";
import * as Mui from "@mui/material";
import * as ReactQuery from "react-query";
import GoodVibesBg from "assets/good_vibes_bg@2x.png";

export const GoodVibes = () => {
  const { isLoading, data } = ReactQuery.useQuery("goodVibesList", () => {
    return Server.Server.Client().post(
      Server.Server.ApiRoutes.homePage.goodVibesList,
      {
        limit: 3,
      }
    );
  });
  const goodVibesList = data?.data?.data;

  return isLoading ? null : (
    <Mui.Card
      sx={{
        boxShadow: "none",
        height: "100%",
        backgroundImage: `url(${GoodVibesBg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Mui.CardContent sx={{ padding: "0.5rem" }}>
        <Mui.Stack
          direction="row"
          alignItems="center"
          sx={{
            padding: "0px 10px !important",
            minHeight: "45px !important",
          }}
        >
          <Mui.Typography
            variant="h6"
            fontFamily="CallunaTitle-Bold"
            fontSize="1rem"
            color="#333333"
          >
            Pangpa - Good Vibes
          </Mui.Typography>
        </Mui.Stack>
        <Mui.Divider sx={{ mb: 2 }} />
        <Mui.Container>
          <Mui.Stack spacing={4}>
            {goodVibesList?.map((goodVibe: goodVibes, index: number) => (
              <Mui.Stack direction="row" spacing={2} key={index}>
                <Mui.Typography
                  color="GrayText"
                  sx={{ opacity: 0.3 }}
                  fontSize="3rem"
                >
                  0{index + 1}
                </Mui.Typography>
                <Mui.Stack spacing={1}>
                  <Mui.Typography fontSize="1.5rem">
                    {goodVibe.question}
                  </Mui.Typography>
                  <Mui.Typography color="GrayText" variant="body1">
                    {goodVibe.thaughts}
                  </Mui.Typography>
                </Mui.Stack>
              </Mui.Stack>
            ))}
          </Mui.Stack>
        </Mui.Container>
      </Mui.CardContent>
    </Mui.Card>
  );
};

interface goodVibes {
  _id: string;
  uid: string;
  question: string;
  thaughts: string;
  is_active: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
