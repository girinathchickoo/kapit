import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as Query from "react-query";
import * as Server from "api";
import * as Routers from "next/router";

import * as Formik from "formik";
import * as Yup from "yup";
import {
  CheckButton,
  FormikTextArea,
  FormikTextField,
  SelectField,
} from "components";
import { Url } from "url";
import * as kijiji from "kijiji-scraper";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <Mui.DialogTitle sx={{ m: 0, p: 2, pb: 1 }} {...other}>
      {children}
      {onClose ? (
        <Mui.IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MuiIcons.Close />
        </Mui.IconButton>
      ) : null}
    </Mui.DialogTitle>
  );
};

const JobPostValidationSchema = Yup.object().shape({
  company_name: Yup.string().required("Required"),
  contact_number: Yup.number().required("Required"),
  company_address: Yup.string().required("Required"),
  postal_code: Yup.string().required("Required"),
  industry: Yup.string().required("Required"),
  email_id: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  province_name: Yup.string().required("Required"),
  job_position: Yup.string().required("Required"),
  job_description: Yup.string().required("Required"),
  working_type: Yup.string().required("Required"),
  job_constraint: Yup.string().required("Required"),
  number_of_position_available: Yup.number().required("Required"),
  salary_hour_Rate: Yup.number().required("Required"),
  skills_required: Yup.string().required("Required"),
  No_of_hours_work_weekly: Yup.number().required("Required"),
  late_date_to_apply: Yup.string().required("Required"),
  how_to_apply: Yup.string().required("Required"),
  website: Yup.string()
});

export const AddJobDialog = ({ open, setOpen }: Props) => {
  const [draft, setDraft] = React.useState(false);
  const [loadingStripe, setloadingStripe] = React.useState(false);
  const routers = Routers.useRouter();

  const { isLoading, data } = Query.useQuery(
    ["getDraft", draft, open],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.getDraft,
        {}
      );
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        console.log(data, "hellofime");
      },
      onError: (err) => {
        console.log(err, "error");
      },
    }
  );

  const initialValue: form = React.useMemo(
    () => ({
      company_name: data?.company_name as string,
      contact_number: data?.contact_number as number,
      company_address: data?.company_address as string,
      postal_code: data?.postal_code as number,
      job_position: data?.job_position as string,
      job_description: data?.job_description as string,
      working_type: data?.working_type as string,
      job_constraint: data?.job_constraint as string,
      number_of_position_available:
        data?.number_of_position_available as number,
      salary_hour_Rate: data?.salary_hour_Rate as number,
      industry: data?.industry as string,
      city: data?.city as string,
      province_name: data?.province_name as string,
      skills_required: data?.skills_required as string,
      No_of_hours_work_weekly: data?.No_of_hours_work_weekly as number,
      late_date_to_apply: data?.late_date_to_apply as string,
      how_to_apply: data?.how_to_apply as string,
      email_id: data?.email_id as string,
      website: data?.website as string,
    }),
    [JSON.stringify(data)]
  );

  const handleClose = () => {
    setOpen(false);
  };

  const client = Query.useQueryClient();

  const { mutate: Add } = Query.useMutation(
    async (values: form) => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.addJobPost,
        values
      );
      return data.data.data as any;
    },
    {
      onSuccess: (data) => {
        Payment(data?._id);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const { mutate: Payment } = Query.useMutation(
    async (value: string) => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.jobPostPayment,
        { post_id: value }
      );
      return data.data.data as Url;
    },
    {
      onSuccess: (data) => {
        routers.push(data);
        setloadingStripe(false);
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const { mutate: save } = Query.useMutation(
    async (values: form) => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.saveDraft,
        values
      );
      return data;
    },
    {
      onSuccess: (data) => {
        client.invalidateQueries("getDraft");
        handleClose();
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const onSubmit = (data: form) => {
    console.log("draft", draft);
    if (draft) {
      save(data);
    } else {
      Add(data);
      setloadingStripe(true);
    }
    setDraft(false);
  };

  return (
    <Mui.Dialog open={open} maxWidth="md" fullWidth>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Mui.Typography
          sx={{ fontSize: "1rem", fontWeight: 600, mt: 3, ml: 1 }}
          color="primary"
        >
          Post a Job
        </Mui.Typography>
      </BootstrapDialogTitle>
      {isLoading ? (
        <></>
      ) : (
        <Formik.Formik
          validationSchema={JobPostValidationSchema}
          initialValues={initialValue}
          onSubmit={onSubmit}
        >
          <Formik.Form
            style={{
              maxHeight: "100%",
              overflow: "auto",
              paddingRight: "10px",
            }}
          >
            <Mui.DialogContent sx={{ pb: 0 }}>
              <Mui.Box
                sx={{
                  overflow: "auto",
                  borderTop: "1px solid #0000002e",
                  borderBottom: "1px solid #0000002e",
                }}
              >
                <Mui.Grid container sx={{ mt: 2, mb: 2 }}>
                  <Mui.Grid item xs={12}>
                    <Mui.Typography sx={{ fontSize: "12px", color: "#BEBEBE" }}>
                      Please fill your business/company details
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Stack
                    component={Mui.Grid}
                    item
                    md={6}
                    xs={12}
                    sx={{ paddingRight: "10px", mt: 1 }}
                    spacing={1}
                  >
                    <FormikTextField
                      name="company_name"
                      label="Business/Company Name"
                      placeholder="Lorem Ipsum"
                    />
                    <FormikTextField
                      name="contact_number"
                      label="Contact Number"
                    />
                    <FormikTextField
                      name="company_address"
                      label="Company/Business Address"
                    />
                    <FormikTextField name="postal_code" label="Postal Code" />
                  </Mui.Stack>
                  <Mui.Stack
                    component={Mui.Grid}
                    item
                    container
                    md={6}
                    xs={12}
                    sx={{ paddingLeft: { md: "10px", xs: "0px" }, mt: 1 }}
                    spacing={1}
                  >
                    <SelectField
                      name="industry"
                      label="Industry"
                      sx={{ fontSize: "12px" }}
                    >
                      {Object.keys(kijiji.categories.JOBS)
                        .slice(1)
                        .map((item, i) => {
                          return (
                            <Mui.MenuItem value={item} key={i}>
                              {item[0].toUpperCase() +
                                item
                                  .replaceAll("_", " ")
                                  .slice(1)
                                  .toLowerCase()}
                            </Mui.MenuItem>
                          );
                        })}
                    </SelectField>
                    <FormikTextField name="email_id" label="E-mail ID" />
                    <Mui.Grid
                      container
                      sx={{ height: "4.2rem", width: "100%" }}
                    >
                      <Mui.Grid item xs={6} sx={{ pr: 1 }}>
                        <FormikTextField
                          label="City"
                          placeholder="Peterborough"
                          name="city"
                        />
                      </Mui.Grid>
                      <Mui.Grid item xs={6} sx={{ pl: 1 }}>
                        <SelectField
                          name="province_name"
                          label="Province"
                          sx={{ fontSize: "12px" }}
                        >
                          {Object.keys(kijiji.locations)
                            .slice(1)
                            .map((item, i) => {
                              return (
                                <Mui.MenuItem value={item} key={i}>
                                  {item[0].toUpperCase() +
                                    item
                                      .replaceAll("_", " ")
                                      .slice(1)
                                      .toLowerCase()}
                                </Mui.MenuItem>
                              );
                            })}
                        </SelectField>
                      </Mui.Grid>
                    </Mui.Grid>
                    <FormikTextField
                      label="Website"
                      placeholder="www.site.com"
                      name="website"
                    />
                  </Mui.Stack>
                  <Mui.Grid item md={12} sx={{ mt: 2 }}>
                    <Mui.Typography sx={{ fontSize: "12px", color: "#BEBEBE" }}>
                      Job Requirement Details
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Stack
                    component={Mui.Grid}
                    item
                    container
                    md={6}
                    xs={12}
                    sx={{ paddingRight: { md: "10px", xs: "0px" }, mt: 1 }}
                    spacing={1}
                  >
                    <FormikTextField
                      label="Job Position"
                      placeholder="Lorem Ipsum"
                      name="job_position"
                    />
                    <FormikTextArea
                      label="Job Description"
                      placeholder="Short description"
                      name="job_description"
                    />
                    <CheckButton
                      lable="Working Type"
                      name="working_type"
                      value1="Full-time"
                      value2="Part-time"
                    />
                    <CheckButton
                      lable="Job Constraint"
                      name="job_constraint"
                      value1="Regular Employee"
                      value2="Temporary"
                    />
                    <Mui.Grid
                      container
                      sx={{ height: "4.2rem", width: "100%" }}
                    >
                      <Mui.Grid item xs={6} sx={{ pr: 1 }}>
                        <FormikTextField
                          label="No.of Positions Available"
                          name="number_of_position_available"
                        />
                      </Mui.Grid>
                      <Mui.Grid item xs={6} sx={{ pl: 1 }}>
                        <FormikTextField
                          label="Salary/Hourly Rate"
                          name="salary_hour_Rate"
                        />
                      </Mui.Grid>
                    </Mui.Grid>
                  </Mui.Stack>
                  <Mui.Stack
                    component={Mui.Grid}
                    item
                    container
                    md={6}
                    xs={12}
                    sx={{
                      paddingLeft: { md: "10px", xs: "0px" },
                      mt: { md: 1, xs: 3 },
                    }}
                    spacing={1}
                  >
                    <FormikTextArea
                      label="Skills Required"
                      name="skills_required"
                    />
                    <Mui.Grid
                      container
                      sx={{ height: "4.2rem", width: "100%" }}
                    >
                      <Mui.Grid
                        item
                        xs={6}
                        sx={{ pr: 1, display: "flex", alignItems: "flex-end" }}
                      >
                        <FormikTextField
                          label="No. Of hours work weekly"
                          placeholder="Peterborough"
                          name="No_of_hours_work_weekly"
                        />
                      </Mui.Grid>
                      <Mui.Grid
                        item
                        xs={6}
                        sx={{ pl: 1, display: "flex", alignItems: "flex-end" }}
                      >
                        <FormikTextField
                          label="Last date to apply"
                          name="late_date_to_apply"
                          type="date"
                        />
                      </Mui.Grid>
                    </Mui.Grid>
                    <Mui.Box sx={{ pt: { md: 0, xs: 2 } }}>
                      <FormikTextArea
                        label="How to apply"
                        name="how_to_apply"
                        placeholder="Email address, short description or paste any link"
                      />
                    </Mui.Box>
                  </Mui.Stack>
                </Mui.Grid>
              </Mui.Box>
            </Mui.DialogContent>
            <Mui.DialogActions>
              <Mui.Button
                variant="outlined"
                sx={{
                  m: "10px",
                  marginRight: "20px",
                  backgroundColor: "white",
                }}
                size="small"
                onClick={() => {
                  setDraft(true),
                    setTimeout(() => {
                      document.getElementById("action")?.click();
                    }, 100);
                }}
              >
                Save Draft
              </Mui.Button>
              <Mui.Button
                variant="contained"
                sx={{ m: "10px", marginRight: "20px", boxShadow: "none" }}
                size="small"
                onClick={() => {
                  document.getElementById("action")?.click();
                }}
                disabled={loadingStripe}
              >
                Submit Details
              </Mui.Button>
              <Mui.Button id="action" type="submit" sx={{ display: "none" }} />
            </Mui.DialogActions>
          </Formik.Form>
        </Formik.Formik>
      )}
    </Mui.Dialog>
  );
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface form {
  company_name: string;
  contact_number: number | undefined;
  company_address: string;
  postal_code: number | undefined;
  job_position: string;
  job_description: string;
  working_type: string;
  job_constraint: string;
  number_of_position_available: number | undefined;
  salary_hour_Rate: number | undefined;
  industry: string;
  city: string;
  province_name: string;
  skills_required: string;
  No_of_hours_work_weekly: number | undefined;
  late_date_to_apply: string;
  how_to_apply: string;
  email_id: string;
  website: string;
}
