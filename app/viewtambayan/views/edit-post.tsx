import * as Api from "api";
import * as Hooks from "hooks";
import * as React from "react";
import * as MuiLabs from "@mui/lab";
import * as Mui from "@mui/material";
import * as NextRouter from "next/router";
import * as MuiIcons from "@mui/icons-material";

const TextField = Mui.styled(Mui.InputBase)(({ theme }) => ({
  backgroundColor: "#FAF7FF",
  borderRadius: "10px",
  width: "100%",
  padding: "1rem",
  outline: "none",
  border: "none",
  fontSize: "0.8rem",
  fontFamily: "CallunaSans-Regular",
  lineHeight: 1.4,
}));

export const EditPost = ({
  post,
  refetch,
}: {
  post: tambayanPost;
  refetch: () => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editDialog, setEditDialog] = React.useState(false);
  const router = NextRouter.useRouter();
  const open = Boolean(anchorEl);

  //   view specific
  const isMobile = Hooks.useMobileView();
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    subject: post?.subject,
    description: post?.description,
  });

  // dialog common
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    setEditDialog(!editDialog);
  };

  const handleDeletePost = async () => {
    await Api.Server.Client().post(
      Api.Server.ApiRoutes.tambayans.deleteTambayanPost,
      { post_id: post._id }
    );
    router.back();
  };

  //   view specific
  React.useEffect(() => {
    setValues({
      subject: post?.subject,
      description: post?.description,
    });
  }, [post]);

  const postData = async () => {
    setIsLoading(true);
    try {
      await Api.Server.Client().post(
        Api.Server.ApiRoutes.tambayans.editTambayanPost,
        { ...values, post_id: post._id }
      );
      setIsLoading(false);
      refetch();
      handleEditPost();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {post?.uid === localStorage.getItem("uid") ? (
        <Mui.IconButton
          id="more-button"
          aria-controls={open ? "more-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
        >
          <MuiIcons.MoreVert />
        </Mui.IconButton>
      ) : null}

      <Mui.Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "more-button",
        }}
      >
        <Mui.MenuItem onClick={handleEditPost}>Edit</Mui.MenuItem>
        <Mui.MenuItem onClick={handleDeletePost}>Delete</Mui.MenuItem>
      </Mui.Menu>
      <Mui.Dialog
        open={editDialog}
        onClose={handleEditPost}
        sx={{ "& .MuiDialog-paper": { width: "100%", p: 2 } }}
        maxWidth="md"
        fullScreen={isMobile}
      >
        <Mui.Toolbar
          sx={{
            borderBottom: "2px solid #EAEAEA",
            minHeight: "50px !important",
          }}
        >
          <Mui.Stack
            sx={{ width: "100%" }}
            direction={"row"}
            justifyContent={"space-between"}
            justifyItems={"center"}
          >
            <Mui.Typography
              sx={{ fontSize: "1rem", mt: 1, fontWeight: 600 }}
              color={"#9B7DD4"}
            >
              Edit Post
            </Mui.Typography>
            <Mui.IconButton onClick={handleEditPost}>
              <MuiIcons.Close />
            </Mui.IconButton>
          </Mui.Stack>
        </Mui.Toolbar>
        <Mui.Stack spacing={2}>
          <Mui.Box sx={{ mt: 2 }}>
            <Mui.Typography sx={{ fontSize: "0.75rem" }}>
              Your Subject
            </Mui.Typography>
            <TextField
              sx={{ mt: 1 }}
              value={values.subject}
              onChange={(e) =>
                setValues((prevValue) => ({
                  ...prevValue,
                  subject: e.target.value,
                }))
              }
            />
          </Mui.Box>
          <Mui.Box sx={{ mt: 2 }}>
            <Mui.Typography sx={{ fontSize: "0.75rem" }}>
              Description
            </Mui.Typography>
            <TextField
              sx={{ mt: 1 }}
              value={values.description}
              onChange={(e) =>
                setValues((prevValue) => ({
                  ...prevValue,
                  description: e.target.value,
                }))
              }
              multiline
              rows={5}
            />
          </Mui.Box>
        </Mui.Stack>
        <Mui.Divider sx={{ mt: 2, mb: 4 }} />
        <Mui.Stack direction={"row"} justifyContent={"end"}>
          <MuiLabs.LoadingButton
            sx={{ width: "10rem" }}
            onClick={postData}
            variant="contained"
            loading={isLoading}
          >
            Save Changes
          </MuiLabs.LoadingButton>
        </Mui.Stack>
      </Mui.Dialog>
    </>
  );
};

interface tambayanPost {
  _id: string;
  uid: string;
  subject: string;
  description: string;
  number_of_likes: number;
  number_of_comments: number;
  full_name: string;
  profile_photo: null;
  is_active: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likedBy: string;
}
