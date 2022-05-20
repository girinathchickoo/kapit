import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Hooks from "hooks";
import * as React from "react";
import * as Query from "react-query";
import * as Server from "api";
import { PostList } from "app/job-centre";
import * as NextRouter from "next/router";
import * as Notistack from "notistack";
import copy from "copy-to-clipboard";
import EditIcons from "assets/EditIcon.png";
import * as Formik from "formik";
import * as Yup from "yup";
import {
  CheckButton,
  FormikTextArea,
  FormikTextField,
  SelectField,
} from "components";
import * as kijiji from "kijiji-scraper";
import * as NextRouters from "next/router";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  postData: React.ReactNode; 
  userId : React.ReactNode;
}

export interface ListProps {
  content: string;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  
  const TextField = Mui.styled("input")(({ theme }) => ({
    backgroundColor: "#FAF7FF",
    borderRadius: "10px",
    width: "50%",
    padding: "1rem",
    outline: "none",
    border: "none",
    fontSize: "0.8rem",
    fontFamily: "CallunaSans-Regular",
    lineHeight: 1.4,
  }));  
 
  const userId = localStorage.getItem('uid');

  const router = NextRouter.useRouter();
  const { children, onClose, postData, ...other } = props;
  const [editDialog, setEditDialog] = React.useState(false);
  const isMobile = Hooks.useMobileView();

  const routers = NextRouters.useRouter();

  console.log("postData check",  props?.userId +" , "+ userId);

  let data: any = postData;

  const JobPostValidationSchema = Yup.object().shape({
    id: Yup.string(),
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
    website: Yup.string(),
  });

  const initialValue: form = React.useMemo(
    () => ({
      id: data?._id as number,
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

  const handleEditPost = () => {
    setEditDialog(!editDialog);
  };

  const { mutate: Edit } = Query.useMutation(
    async (values: any) => {
      console.log("values edit", values.id);
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.editJobPost,
        {
          company_name: values?.company_name,
          contact_number: values?.contact_number,
          company_address: values?.company_address,
          postal_code: values?.postal_code,
          job_position: values?.job_position,
          job_description: values?.job_description,
          working_type: values?.working_type,
          job_constraint: values?.job_constraint,
          number_of_position_available: values?.number_of_position_available,
          salary_hour_Rate: values?.salary_hour_Rate,
          industry: values?.industry,
          city: values?.city,
          province_name: values?.province_name,
          skills_required: values?.skills_required,
          No_of_hours_work_weekly: values?.No_of_hours_work_weekly,
          late_date_to_apply: values?.late_date_to_apply,
          how_to_apply: values?.how_to_apply,
          email_id: values?.email_id,
          website: values?.website,
          post_id: values?.id,
        }
      );
      return data.data.data as any;
    },
    {
      onSuccess: (data) => {
        console.log("edit job center", data?._id);
        routers.push(`/job-centre`);
      },
      onError: (err) => {
        // HandleErrorMessage()
        console.log(err);
      },
    }
  );

  const onSubmit = (data: form) => {
    Edit(data);
  };

  return (
    <>
      <Mui.DialogTitle sx={{ m: 0, p: 2, pb: 1 }} {...other}>
        {/* <MuiIcons.EarbudsSharp
                fontSize="medium"
                color="primary"
                sx={{ pr: 1, float:'right', marginRight:4 }}
              /> */}
         {props?.userId === userId &&
         (     
        <img
          src={EditIcons.src}
          alt="Edit"
          onClick={handleEditPost}
          width={18}
          style={{ float: "right", marginRight: 50 }}
        />
         )}
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

      <Mui.Dialog
        open={editDialog}
        onClose={handleEditPost}
        maxWidth="md"
        fullWidth
      >
        {/* <Mui.Dialog
        open={editDialog}
        onClose={handleEditPost}
        sx={{ "& .MuiDialog-paper": { width: "100%"} }}
        // maxWidth="sm"
        fullScreen={isMobile}
      > */}
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
                          disabled
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
                variant="contained"
                sx={{ m: "10px", marginRight: "20px", boxShadow: "none" }}
                size="small"
                onClick={() => {
                  document.getElementById("action")?.click();
                }}
              >
                Update Details
              </Mui.Button>
              <Mui.Button id="action" type="submit" sx={{ display: "none" }} />
            </Mui.DialogActions>
          </Formik.Form>
        </Formik.Formik>
      </Mui.Dialog>
    </>
  );
};

export const Content = ({ lable, content, withCopy }: ContentProps) => {
  const { enqueueSnackbar } = Notistack.useSnackbar();
  return (
    <>
      <Mui.Grid item xs={4}>
        <Mui.Typography sx={{ fontSize: "12px", color: "#9D9D9D" }}>
          {" "}
          {lable}
        </Mui.Typography>
      </Mui.Grid>
      {withCopy ? (
        <>
          <Mui.Grid item xs={6}>
            <Mui.Typography
              component={Mui.Link}
              onClick={() => {
                window.open("https:" + content);
              }}
              sx={{ fontSize: "12px" }}
            >
              {content}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <Mui.Typography
              component={Mui.Button}
              sx={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
                height: "20px",
                backgroundColor:'white !important'
              }}
              onClick={() => {
                copy(content);
                enqueueSnackbar("Link Copied", {
                  preventDuplicate: false,
                  persist: false,
                  variant: "success",
                });
              }}
            >
              <MuiIcons.ContentCopy
                fontSize="small"
                color="primary"
                sx={{ pr: 1 }}
              />{" "}
              copy
            </Mui.Typography>
          </Mui.Grid>
        </>
      ) : (
        <Mui.Grid item xs={8}>
          <Mui.Typography sx={{ fontSize: "12px" }}>{content}</Mui.Typography>
        </Mui.Grid>
      )}
    </>
  );
};

export const ListContent = ({ content }: ListProps) => {
  return (
    <>
      <Mui.Grid item xs={0.5}>
        <MuiIcons.CheckBoxOutlined fontSize="small" color="primary" />
      </Mui.Grid>
      <Mui.Grid item xs={11.5}>
        <Mui.Typography sx={{ fontSize: "12px", color: "#707070" }}>
          {content}
        </Mui.Typography>
      </Mui.Grid>
    </>
  );
};

export const ViewJob = () => {
  const router = NextRouter.useRouter();
  const getQuery = router.query;
  const { enqueueSnackbar } = Notistack.useSnackbar();
  console.log(getQuery?.jobid);

  const [post, setPost] = React.useState<PostList>();

  const { isLoading } = Query.useQuery<PostList>(
    "getOneJob",
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.jobCentre.viewPost,
        {
          job_Post_id: getQuery?.jobid,
        }
      );
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        setPost(data);
        console.log(data);
      },
      onError: () => {
        enqueueSnackbar("Error", {
          preventDuplicate: false,
          persist: false,
          variant: "error",
        });
      },
    }
  );

  const handleClose = () => {
    router.push(".");
  };

  return (
    <Mui.Dialog open={true} maxWidth="sm" fullWidth>
      <BootstrapDialogTitle
        id="customized-dialog-title"
        postData={post}
        userId={post?.uid}
        onClose={handleClose}
      >
        <Mui.Typography
          sx={{ fontSize: "1rem", fontWeight: 600, mt: 3, ml: 1 }}
          color="primary"
        >
          Job Detail
        </Mui.Typography>
      </BootstrapDialogTitle>
      <Mui.DialogContent sx={{ pb: 0 }}>
        <Mui.Box
          sx={{
            overflow: "auto",
            mt: 2,
          }}
        >
          <Mui.Grid container>
            <Mui.Grid item container xs={12}>
              <Mui.Grid item xs={10} sm={3}>
                <Mui.Typography
                  sx={{
                    backgroundColor: "#FFF6EB",
                    fontSize: "12px",
                    borderRadius: "10px",
                    flex: 1,
                    float: "left",
                    padding: 1,
                    width: "auto",
                    justifyContent: "center",
                  }}
                >
                  {post?.industry}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid
                item
                xs={2}
                sm={9}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Mui.Typography sx={{ color: "#9D9D9D", fontSize: "12px" }}>
                  #{post?.job_id}
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Typography
                sx={{
                  fontSize: "14px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                {post?.job_position}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Typography
                sx={{
                  fontSize: "12px",
                  borderRadius: "10px",
                  color: "#707070",
                }}
              >
                {post?.job_description}
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
              <Content
                lable={"Company Name"}
                content={post?.company_name as string}
              />
              <Content
                lable={"Type of Placement"}
                content={post?.working_type as string}
              />
              <Content
                lable={"No.of Positions"}
                content={
                  post?.number_of_position_available as unknown as string
                }
              />
              <Content
                lable={"Last Date to Apply"}
                content={new Date(
                  post?.late_date_to_apply as string
                ).toLocaleDateString()}
              />
              <Content
                lable={"Location"}
                content={post?.province_name as string}
              />
              <Content
                lable={"Working hours per week"}
                content={post?.No_of_hours_work_weekly as string}
              />
              <Content
                lable={"Salary per hour"}
                content={post?.salary_hour_Rate as string}
              />
              <Content
                lable={"Job Posted by"}
                content={post?.posted_by as string}
              />
              <Content
                lable={"Website"}
                content={post?.website as string}
                withCopy={true}
              />
              <Content
                lable={"How to apply"}
                content={post?.how_to_apply as string}
              />
            </Mui.Grid>
            <Mui.Stack
              component={Mui.Grid}
              item
              xs={12}
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Mui.Typography
                sx={{ fontSize: "1rem", fontWeight: 600, mt: 1, mb: 1 }}
                color="primary"
              >
                Skills Required
              </Mui.Typography>
              <Mui.Grid container>
                {post?.skills_required
                  ?.replace(/(\.\s!?)/g, "@#$")
                  .split("@#$")
                  .slice(0, -1)
                  ?.map((item, index) => (
                    <ListContent content={`${item}.`} key={index} />
                  ))}
              </Mui.Grid>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Box>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button
          variant="contained"
          sx={{
            m: "10px",
            marginRight: "20px",
            boxShadow: "none",
            pl: 4,
            pr: 4,
            mr: 4,
          }}
          size="small"
          onClick={() => {
            if (
              post?.how_to_apply?.match(
                /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*))/g
              )?.[0] as string
            ) {
              router.push(
                post?.how_to_apply?.match(
                  /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*))/g
                )?.[0] as string
              );
            } else if (
              post?.how_to_apply?.match(
                /(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/g
              )?.[0] as string
            ) {
              router.push(
                "mailto:" + (post?.how_to_apply?.match(
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
          }}
        >
          Apply for this Job
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  );
};

interface ContentProps {
  withCopy?: boolean;
  lable: string;
  content: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface form {
  id: number;
  company_name: string;
  contact_number: number | undefined | string;
  company_address: string;
  postal_code: number | undefined | string;
  job_position: string;
  job_description: string;
  working_type: string;
  job_constraint: string;
  number_of_position_available: number | undefined | string;
  salary_hour_Rate: number | undefined | string;
  industry: string;
  city: string;
  province_name: string;
  skills_required: string;
  No_of_hours_work_weekly: number | undefined | string;
  late_date_to_apply: string;
  how_to_apply: string;
  email_id: string;
  website: string;
}
