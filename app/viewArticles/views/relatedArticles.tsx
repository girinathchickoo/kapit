import * as Mui from "@mui/material";
import * as Api from "api";
import * as ReactQuery from "react-query";
import moment from "moment";
import * as Nextrouter from "next/router";

const Container = Mui.styled(Mui.Box)({
  width: "100%",
  borderRadius: "10px",
  backgroundColor: "#E6E6E6",
});

const Subheader = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  color: "#707070",
  fontFamily: "CallunaSans-Bold",
  opacity: 0.9,
  ">p": {
    marginTop: "0px",
    marginBottom: "2px",
  },
  ">h1,>h2,>h3,>h4,>h5,>h6": {
    margin: "0px",
  },
});

const Styledtypography = Mui.styled(Mui.Typography)({
  fontSize: "0.75rem",
});

const Heading = Mui.styled(Mui.Typography)({
  fontSize: "0.9rem",
  color: "#333333",
  fontFamily: "CallunaSans-Regular",
  fontWeight: 600,
  opacity: 0.9,
});

export const RelatedArticles = ({ data }: any) => {
  const routes = Nextrouter.useRouter();
  const getQuery = routes.query;
  const getKey = Object.keys(getQuery)[0];
  const dynamicKey = getKey === "pinoyid" ? "post_id" : "id";
  return (
    <Mui.Stack spacing={2}>
      {data?.slice(0, 1).map((item: any, index: any) => (
        <>
          <Mui.Box
            sx={{
              height: "250px",
              backgroundColor: "#E4E4E4",
              borderRadius: "10px",
            }}
          >
            <Mui.Typography sx={{ color: "black", fontSize: "10pt" }}>
              In-article Native ad
            </Mui.Typography>
          </Mui.Box>
          <Mui.Stack
            key={index}
            spacing={1}
            onClick={() =>
              routes.push(
                getKey === "pinoyid"
                  ? `/new-pinoys/${item._id}`
                  : `/whats-up-canada/${item._id}`
              )
            }
            sx={{ backgroundColor: "white", cursor: "pointer" }}
          >
            <Mui.CardMedia
              component={"img"}
              src={item?.thumbNail_url}
              sx={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "10px",
                maxHeight: "16rem",
              }}
            />
            <Mui.Typography
              sx={{ fontSize: "1rem", fontFamily: "CallunaSans-Regular" }}
            >
              {moment(item?.createdAt).format("MMM DD, YYYY")}
            </Mui.Typography>
            <Mui.Box>
              <Heading>{item.title}</Heading>
              {/* <Subheader dangerouslySetInnerHTML={{ __html: item.description }} /> */}
            </Mui.Box>
          </Mui.Stack>
        </>
      ))}
      <Mui.Box
        sx={{
          height: "250px",
          backgroundColor: "#E4E4E4",
          borderRadius: "10px",
        }}
      >
        <Mui.Typography sx={{ color: "black", fontSize: "10pt" }}>
          In-article Native ad
        </Mui.Typography>
      </Mui.Box>
    </Mui.Stack>
  );
};
