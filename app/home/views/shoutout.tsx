import * as Server from "api";
import * as Mui from "@mui/material";
import TagsImage from "assets/Tag@2x.png";
import * as NextRouter from "next/router";
import * as ReactQuery from "react-query";
import shoutOuts from "assets/shout_outs.png";

const UserAvatar = Mui.styled(Mui.Avatar)(({ theme }) => ({
  width: "2.5rem",
  height: "2.5rem",
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
}));

export const ShoutOuts = () => {
  const router = NextRouter.useRouter();

  const { isLoading, data } = ReactQuery.useQuery("shoutOutsList", () => {
    return Server.Server.Client().post(
      Server.Server.ApiRoutes.homePage.shoutOutsList,
      {
        limit: 5,
      }
    );
  });
  const shoutOutsList = data?.data?.data;

  return isLoading ? null : (
    <Mui.Card
      sx={{
        boxShadow: "none",
        height: "100%",
      }}
    >
      <Mui.CardContent sx={{ padding: "0.5rem" }}>
        <Mui.Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            padding: "0px 10px !important",
            minHeight: "45px !important",
          }}
        >
          <Mui.Box>
            <Mui.Typography
              variant="h6"
              fontFamily="CallunaTitle-Bold"
              fontSize="1rem"
              color="#333333"
            >
              ShoutOuts
            </Mui.Typography>
            <Mui.Typography fontSize="0.7rem">
              Wanna get featured in Shoutouts ? Click on{" "}
              <Mui.Typography
                color="primary"
                component="span"
                fontSize="0.7rem"
              >
                Feature Post
              </Mui.Typography>{" "}
              on top of your posts!
            </Mui.Typography>
          </Mui.Box>
          <Mui.Box sx={{ width: 80, height: 80, overflow: "hidden" }}>
            <Mui.CardMedia component="img" src={shoutOuts.src} />
          </Mui.Box>
        </Mui.Stack>
        <Mui.Divider />
        <Mui.Container>
          <Mui.Stack spacing={3} py={2}>
            {shoutOutsList?.map((shoutOut: shoutOut, index: number) => (
              <>
                <Mui.Stack key={index} spacing={1}>
                  {shoutOut.full_name ? (
                    <Mui.Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ cursor: "pointer" }}
                      onClick={() => router.push(`/user/${shoutOut?.uid}`)}
                    >
                      <UserAvatar src={shoutOut?.profile_photo || undefined} />
                      <Mui.Typography
                        fontFamily="CallunaSans-Bold"
                        fontSize="0.9rem"
                        color="#333333"
                      >
                        {shoutOut?.full_name}
                      </Mui.Typography>
                      {/* <Mui.Box
                      sx={{
                        backgroundImage: `url(${TagsImage.src})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        overflow: "hidden",
                        p: 1,
                      }}
                    >
                      <Mui.Typography
                        fontSize="0.8rem"
                        color="#333333"
                        fontFamily="Calluna Sans Semibold"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Business Owner
                      </Mui.Typography>
                    </Mui.Box> */}
                    </Mui.Stack>
                  ) : null}

                  <Mui.Typography
                    fontFamily="CallunaSans-Regular"
                    fontSize="0.9rem"
                    color="#333333"
                  >
                    {shoutOut?.post_description || shoutOut?.item_name}
                  </Mui.Typography>
                  <Mui.Stack alignItems="center">
                    <Mui.Box
                      sx={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        maxWidth: "500px",
                        position: "relative",
                      }}
                    >
                      <Mui.CardMedia
                        component="img"
                        src={
                          shoutOut.post_images.length > 0
                            ? shoutOut.post_images[0]
                            : undefined
                        }
                        sx={{
                          objectFit: "contain",
                          objectPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Mui.Box>
                  </Mui.Stack>
                </Mui.Stack>
                <Mui.Divider />
              </>
            ))}
          </Mui.Stack>
        </Mui.Container>
      </Mui.CardContent>
    </Mui.Card>
  );
};

interface shoutOut {
  _id: string;
  uid: string;
  post_id: string;
  post_type: string;
  post_description: string | null;
  item_name: string | null;
  post_images: string[];
  profile_photo: string;
  full_name: string;
  is_active: number;
  status: string;
  createdAt: string;
}
