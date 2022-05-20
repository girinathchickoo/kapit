import * as Mui from "@mui/material";
import * as React from "react";
import * as Views from "../tambayan/views";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as Hooks from "hooks";
import FileImg from "assets/file.png";
import * as MuiIcons from "@mui/icons-material";

const communityGuidelines = [
  "We prohibit bullying/harassment of any kind.",
  "Hate speech or content that demeans, defames, or promotes discrimination is prohibited.",
  "We prohibit accounts that distribute pornographic content.",
  "We prohibit spreading false information that causes harm or is malicious.",
  "Manipulating content for false or misleading purposes is prohibited.",
  "Don’t use Mykapitbahay for any illegal activity.",
];

const Header = Mui.styled(Mui.Box)({
  fontSize: "1rem",
  color: "#333333",
  fontFamily: "Raleway-semibold",
});

const Subheader = Mui.styled(Mui.Box)({
  fontSize: "0.8rem",
  color: "#707070",
  fontFamily: "Raleway-semibold",
  marginTop: "5px",
});

export const Main = () => {
  const isMobile = Hooks.useMobileView();
  const [TotalPage, setToalPage] = React.useState(0);
  const [CurrentPage, setCurrentPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const HoverPopUp = Mui.styled(Mui.Card)(({ theme }) => ({
    position: "absolute",
    top: isMobile ? 60 : 40,
    right: isMobile ? -10 : 10,
    backgroundColor: theme.palette.common.white,
    width: isMobile ? 280 : 320,
    padding: 30,
    borderRadius: 10,
    textAlign: "left",
    zIndex: 200,
  }));

  const { isLoading, data, refetch } = ReactQuery.useQuery(
    ["TambayanList", CurrentPage],
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.tambayans.tambayanList,
        {
          pageNumber: CurrentPage,
        }
      );
      setToalPage(+datas?.data?.totalPages);
      return datas?.data?.data;
    }
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const togglePopover = () => {
    setOpen(!open);
  };

  return (
    <Mui.Box>
      <Mui.Paper sx={{ p: 2 }} elevation={0}>
        <Mui.Grid container>
          <Mui.Grid
            item
            xs={12}
            sx={{ borderBottom: "1px solid #0000000f", paddingBottom: "10px" }}
          >
            <Mui.Stack
              sx={{ width: "100%" }}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Mui.Box>
                <Header>Tambayan</Header>
                <Subheader>
                  {" "}
                  Where People can introduce themselves, ask for a advice, etc.,{" "}
                </Subheader>
              </Mui.Box>
              <Mui.Box>
                <Mui.ClickAwayListener onClickAway={() => setOpen(false)}>
                  <Mui.Button
                    sx={{
                      fontSize: "12px!important",
                      position: "relative",
                    }}
                    onClick={togglePopover}
                  >
                    <Mui.Box
                      component="img"
                      src={FileImg.src}
                      height="20px"
                      sx={{ pr: 1 }}
                    ></Mui.Box>
                    Community Guidelines
                    <HoverPopUp
                      elevation={1}
                      id="CommunityGuidelines"
                      sx={{ display: open ? "block" : "none" }}
                    >
                      <Mui.Stack spacing={1} sx={{ mb: 2 }}>
                        {communityGuidelines.map(
                          (text: string, index: number) => (
                            <Mui.Typography
                              variant="caption"
                              component={"li"}
                              key={index}
                            >
                              {text}
                            </Mui.Typography>
                          )
                        )}
                      </Mui.Stack>
                      <Mui.Typography variant="body2">
                        Please take these Guidelines seriously and honor them in
                        the spirit in which they are intended.
                      </Mui.Typography>
                    </HoverPopUp>
                  </Mui.Button>
                </Mui.ClickAwayListener>
              </Mui.Box>
            </Mui.Stack>
          </Mui.Grid>

          <Mui.Grid item xs={12} md={8} sx={{ pt: "20px" }}>
            <Mui.Stack spacing={2}>
              <Views.PostBox refetchData={refetch} />
              <Views.LikesandComments refetch={refetch} data={data} />
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={4}></Mui.Grid>
        </Mui.Grid>
        <Mui.Divider sx={{ mt: 2, mb: 2 }} />
        <Mui.Box
          sx={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Mui.Pagination count={TotalPage} onChange={handlePageChange} />
        </Mui.Box>
      </Mui.Paper>
    </Mui.Box>
  );
};
