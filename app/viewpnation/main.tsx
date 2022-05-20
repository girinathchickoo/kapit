import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as NextRouter from "next/router";
import * as Notistack from "notistack";
import { EditPost } from "./editPost";

const Timings = Mui.styled(Mui.Typography)({
  fontSize: "0.7rem",
  color: "#DDA15E",
  fontFamily: "Haborosans-normal",
});

const EventName = Mui.styled(Mui.Typography)({
  fontSize: "0.9rem",
  color: "#333333",
  fontFamily: "Haborosans-normal",
  marginTop: "0.2rem",
});

export const Main = () => {
  const router = NextRouter.useRouter();
  const getQuery = router.query?.pnationid;
  const { enqueueSnackbar } = Notistack.useSnackbar();

  const client = ReactQuery.useQueryClient()

  const { isLoading, data, refetch } = ReactQuery.useQuery(
    "viewPnation",
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.pnation.viewEvent,
        {
          post_id: getQuery,
        }
      );
      return datas.data.data;
    }
  );

  const { mutate: FeaturePost } = ReactQuery.useMutation(async () => {
    const data = await Server.Server.Client().post(Server.Server.ApiRoutes.pnation.addFeaturePost, { post_id: getQuery, post_type: "PnationCalendar", })
    return data.data.data
  },
    {
      onSuccess: (data) => {
        client.invalidateQueries("viewPnation")
        enqueueSnackbar("Request Sent", {
          preventDuplicate: false,
          persist: false,
          variant: "success",
        });
      },
      onError: (err) => {
        console.log(err)
      },
    }
  );

  const handleFeaturePost = () => {
    FeaturePost()
  }

  return (
    <Mui.Box>
      <Mui.Dialog
        maxWidth="md"
        open={true}
        sx={{ "& .MuiDialog-paper": { width: "100%", padding: "10px" } }}
        onClose={() => router.back()}
      >
        <Mui.DialogTitle>
          <Mui.IconButton onClick={() => router.back()} sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}>
            <MuiIcons.Close />
          </Mui.IconButton>
          <Mui.Toolbar sx={{ minWidth: "50px !important" }}>
            <Mui.Stack
              alignItems={"center"}
              justifyContent="space-between"
              sx={{ width: "100%", flexDirection: { md: "row", xs: "column" } }}
            >
              <Mui.Typography>Event on {new Date(data?.event_date as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Mui.Typography>
              {isLoading ? <></> : (data?.FeaturePost ?
                <Mui.Box sx={{ mt: { xs: 2, md: 0 } }}>
                  <Mui.Button variant="contained" disabled={data?.userFeaturePosted ? true : false} onClick={handleFeaturePost}>Feature Post</Mui.Button>
                  <EditPost post={data} />
                </Mui.Box>
                : <></>)
              }
            </Mui.Stack>
          </Mui.Toolbar>
        </Mui.DialogTitle>
        <Mui.DialogContent>
          <Mui.Grid container spacing={2} sx={{ height: "auto" }}>
            <Mui.Grid item xs={12} md={7}>
              <Mui.Box
                sx={{ borderRadius: "10px", objectFit: "scale-down" }}
                src={data?.poster_image}
                component={"img"}
                width="100%"
                maxHeight={"350px"}
              />
            </Mui.Grid>
            <Mui.Grid item xs={12} md={5}>
              <Mui.Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", flexDirection: "column", height: "100%" }}>
                <Mui.Stack direction={"row"} alignItems="center" spacing={0.5}>
                  <MuiIcons.AccessTime sx={{ color: "#DDA15E", fontSize: "1.3rem" }} />
                  <Timings>{data?.event_time}</Timings>
                </Mui.Stack>
                <EventName> {data?.name_of_the_event} </EventName>
                <EventName sx={{ fontSize: "0.7rem", color: '#707070' }}>{data?.city} . {data?.province_name}</EventName>
              </Mui.Box>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.DialogContent>
      </Mui.Dialog>
    </Mui.Box>
  );
};
