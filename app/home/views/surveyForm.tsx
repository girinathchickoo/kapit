import * as Mui from "@mui/material";
import * as Components from "components";
import * as ReactQuery from "react-query";
import * as Api from "api";
import * as React from "react";

export const SurveyForm = () => {
  const [pollComplete, setPollComplete] = React.useState(false);
  const [pollResult, setPollResult] = React.useState([]);
  const [userSurveyList, setUserSurveyList] = React.useState<surveyForm>()

  const { isLoading, data } = ReactQuery.useQuery("userSurveyList", () => {
    return Api.Server.Client().post(
      Api.Server.ApiRoutes.homePage.userSurveyList,
      {
        limit: 1,
      }
    );
  }, {
    onSuccess: (data) => {
      // console.log(data.data.data[0]._id)
      getOneSurvey({ survey_id: data.data.data[0]._id })
    }
  });

  React.useMemo(() => setUserSurveyList(data?.data?.data
    ? data?.data?.data[0]
    : undefined
  ), [data?.data?.data])

  const { mutate: getOneSurvey } = ReactQuery.useMutation(
    async (details: { survey_id: string }) => {
      return await Api.Server.Client().post(
        Api.Server.ApiRoutes.homePage.getOneSurvey,
        details
      );
    },
    {
      onSuccess: (data) => {
        // console.log(data.data.data.options[0])
        if (data.data.data.options[0].vote_percentage !== "NaN%") {
          // console.log(data.data.options[0])
          setPollComplete(true)
        }
        setPollResult(data.data.data.options);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const { mutate: submitSurvey } = ReactQuery.useMutation(
    async (details: { survey_id: string; option: number }) => {
      return await Api.Server.Client().post(
        Api.Server.ApiRoutes.homePage.postVoteForSurvey,
        details
      );
    },
    {
      onSuccess: (val) => {
        console.log(data);
        // setPollComplete(true);
        getOneSurvey({ survey_id: data?.data?.data[0]?._id });
      },
      onError: (err, data) => {
        console.log(err);
        //FIXME: need to be removed after fixing userSurveyList API
        // 404 on already voted posts
        // setPollComplete(true);
      },
    }
  );

  return isLoading ? null : (
    <Mui.Box sx={{ height: "100%", position: "relative" }}>
      <Components.CardWithTitle
        actions={null}
        title="Survey Form"
        extraText={`${userSurveyList?.votes} Votes`}
      >
        <Mui.Stack spacing={3}>
          <Mui.Typography
            variant="h6"
            fontFamily="callunaSans- Semibold"
            color="#333333"
          >
            {userSurveyList?.question}
          </Mui.Typography>

          {pollComplete ? (
            <>
              {console.log("pollResult", pollResult)}
              {pollResult?.map((option: any, index: number) => (
                <Mui.Stack
                  sx={{ position: "relative" }}
                  justifyContent="center"
                >
                  <Mui.LinearProgress
                    variant="determinate"
                    value={option.vote_percentage.replace("%", "")}
                    sx={{ height: 30, borderRadius: 2, width: "100%" }}
                  />
                  <Mui.Typography sx={{ position: "absolute", left: "20px" }}>
                    {option[Object.keys(option)[0]]}
                    {/* {option[`${index + 1}`]} */}
                  </Mui.Typography>
                  <Mui.Typography sx={{ position: "absolute", right: "20px" }}>
                    {option.vote_percentage}
                  </Mui.Typography>
                </Mui.Stack>
              ))}
            </>
          ) : (
            <>
              {userSurveyList?.options?.map((option: any, index: number) => (
                <Mui.Button
                  variant="outlined"
                  key={index}
                  onClick={() => {
                    submitSurvey({
                      survey_id: userSurveyList?._id,
                      option: index + 1,
                    });
                  }}
                >
                  {option[`${index + 1}`]}
                </Mui.Button>
              ))}
            </>
          )}
        </Mui.Stack>
      </Components.CardWithTitle>
    </Mui.Box>
  );
};

interface surveyForm {
  _id: string;
  uid: string;
  question: string;
  options: [
    {
      "1": string;
    },
    {
      "2": string;
    },
    {
      "3": string;
    },
    {
      "4": string;
    }
  ];
  votes: number;
  is_active: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
