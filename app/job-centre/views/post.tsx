import * as Mui from "@mui/material";
import * as React from "react";
import { PostList } from "../main";
import * as NextRouter from "next/router";
import * as Notistack from "notistack";

export const Content = ({ lable, content }: ContentProps) => {
  return (
    <>
      <Mui.Grid item xs={6}>
        <Mui.Typography
          sx={{
            fontSize: "12px",
            color: "#9D9D9D",
            fontFamily: "CallunaSans-Regular",
          }}
        >
          {" "}
          {lable}
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={6}>
        <Mui.Typography
          sx={{ fontSize: "12px", fontFamily: "CallunaSans-Regular" }}
        >
          {content}
        </Mui.Typography>
      </Mui.Grid>
    </>
  );
};

export const Post = ({ item, key }: Props) => {
  const { enqueueSnackbar } = Notistack.useSnackbar();

  const router = NextRouter.useRouter();

  const handleOpen = () => {
    router.push(`/job-centre/${item._id}`);
  };

  const handleApply = () => {
    if (
      item?.how_to_apply?.match(
        /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*))/g
      )?.[0] as string
    ) {
      router.push(
        item?.how_to_apply?.match(
          /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*))/g
        )?.[0] as string
      );
    } else if (
      item?.how_to_apply?.match(
        /(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/g
      )?.[0] as string
    ) {
      router.push(
        "mailto:" + (item?.how_to_apply?.match(
          /(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/g
        )?.[0] as string)
      )
    } else {
      enqueueSnackbar("No URL or Email found", {
        preventDuplicate: false,
        persist: false,
        variant: "error",
      });
    }
  };

  return (
    <Mui.Card
      key={key}
      sx={{
        width: "96%",
        border: "1px solid #E6E6E6",
        m: "2%",
        borderRadius: "10px !important",
      }}
      elevation={0}
    >
      <Mui.CardContent sx={{ p: 2, pb: `16px !important` }}>
        <Mui.Grid container>
          <Mui.Grid item container xs={12}>
            <Mui.Grid item xs={10}>
              <Mui.Typography
                sx={{
                  font: "normal normal medium 16px/19px CallunaSans-Regular",
                  backgroundColor: "#FFF6EB",
                  fontSize: "12px",
                  borderRadius: "10px",
                  p: "4px 13px",
                  display: "flex",
                  justifyContent: "center",
                  width: 'auto !important',
                  float: 'left'
                }}
              >
                {item.industry[0].toUpperCase() +
                  item.industry.replaceAll("_", " ").slice(1).toLowerCase()}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Mui.Typography
                sx={{
                  fontFamily: "CallunaSans-Regular",
                  color: "#9D9D9D",
                  fontSize: "12px",
                }}
              >
                #{item.job_id}
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Typography
              sx={{
                fontFamily: "CallunaSans-Regular",
                fontSize: "14px",
                borderRadius: "10px",
                fontWeight: 600,
                mt: 1,
              }}
            >
              {item.job_position}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Typography
              sx={{
                fontFamily: "CallunaSans-Regular",
                fontSize: "12px",
                borderRadius: "10px",
                color: "#707070",
              }}
            >
              {item.job_description}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            component={Mui.Stack}
            item
            container
            xs={12}
            sx={{ mt: 1 }}
            spacing={1}
          >
            <Content lable={"Company Name"} content={item.company_name} />
            <Content
              lable={"Type of Placement"}
              content={item.job_constraint}
            />
            <Content
              lable={"No.of Positions"}
              content={item.number_of_position_available as unknown as string}
            />
            <Content
              lable={"Last Date to Apply"}
              content={new Date(
                item.late_date_to_apply as string
              ).toLocaleDateString()}
            />
            <Content
              lable={"Location"}
              content={
                item.province_name[0].toUpperCase() +
                item.province_name.replaceAll("_", " ").slice(1).toLowerCase()
              }
            />
            <Content
              lable={"Job Posted by"}
              content={item.posted_by as string}
            />
          </Mui.Grid>
          <Mui.Stack
            component={Mui.Grid}
            item
            xs={12}
            spacing={1}
            sx={{ mt: 2 }}
          >
            <Mui.Button
              color="primary"
              variant="outlined"
              sx={{
                width: "100%",
                font: "normal normal medium 16px/19px CallunaSans-Regular",
              }}
              onClick={handleOpen}
            >
              View Requirements
            </Mui.Button>
            <Mui.Button
              color="primary"
              variant="contained"
              sx={{
                width: "100%",
                font: "normal normal medium 16px/19px CallunaSans-Regular",
                fontWeight: 550,
              }}
              onClick={handleApply}
            >
              Apply Now
            </Mui.Button>
          </Mui.Stack>
        </Mui.Grid>
      </Mui.CardContent>
    </Mui.Card>
  );
};

interface Props {
  item: PostList;
  key: string;
}

interface ContentProps {
  lable: string;
  content: string;
}
