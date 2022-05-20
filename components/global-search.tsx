import * as Mui from "@mui/material";
import SearchIcon from "assets/search@2x.png";
// import TextField from '@mui/material/TextField';
import * as NextRouter from "next/router";
// import Autocomplete from '@mui/material/Autocomplete';
import * as Query from "react-query";
import Avatar from '@mui/material/Avatar';
import * as Server from "api";
import * as React from "react";
import * as NextRouters from "next/router";
import InputAdornment from '@mui/material/InputAdornment';

const TextFields = Mui.styled("input")({
  width: "100%",
  height: "3rem",
  padding: "0px 20px",
  border: "none",
  outline: "none",
  borderRadius: "15px",
  boxShadow: "0px 20px 30px #00000014",
  fontSize: "0.75rem",
  fontFamily: "Raleway-medium",
});

const TextField = Mui.styled(Mui.TextField)({
  width: "100%",
  height: "3rem",
  padding: "0px 0px",
  border: "none",
  outline: "none",
  borderRadius: "15px",
  boxShadow: "0px 20px 30px #00000014",
  fontSize: "0.75rem",
  fontFamily: "Raleway-medium",
});
const Autocomplete = Mui.styled(Mui.Autocomplete)({
  border: "none !important",
  outline: "none !important",
  borderRadius: "0px",
  fontSize: "0.75rem",
  fontFamily: "Raleway-medium",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0px !important",
    padding: '5px !important',
    fontSize: '0.75rem'
  },
});

const Button = Mui.styled(Mui.Button)({
  position: "absolute",
  right: 0,
  top: 0,
  width: "3rem",
  minWidth: "3rem !important",
  height: "100%",
  borderRadius: "0px",
  borderBottomRightRadius: "15px",
  borderTopRightRadius: "15px",
});

const ButtonNew = Mui.styled(Mui.Button)({
  position: "absolute",
  right: 0,
  top: 0,
  width: "3rem",
  float: 'right',
  minWidth: "3rem !important",
  height: "80%",
  borderRadius: "0px",
  padding: '23px 16px',
  borderBottomRightRadius: "15px",
  borderTopRightRadius: "15px",
});

export const GlobalSearch = ({ value, onChange }: any) => {
  // const Storage = localStorage?.getItem("Mktoken")
  const { asPath } = NextRouters.useRouter();
  // console.log(pathname,"sbahd d")
  const router = NextRouter.useRouter();
  const [searchs, setSearch] = React.useState("kar");
  const [newSearchs, setNewSearch] = React.useState([]);
  const [checkUser, setCheckUser] = React.useState(true)
  const { isLoading, data } = Query.useQuery(["userGlobalSearch", searchs], async () => {
    const data = await Server.Server.Client().post(Server.Server.ApiRoutes.globalSearch.userGlobalSearch, {
      pageNumber: 1,
      search: searchs
    })
    // console.log(data, "fw efw f")
    return data.data.data
  }, {
    onSuccess: (data) => {
      console.log(data, "hellofime")
      setNewSearch(data)
    },
    onError: (err) => {
      console.log(err, "error")
      setCheckUser(false)
    }
  });
  // console.log("hello",localStorage.getItem("Mktoken"))
  return (asPath == '/' || asPath == '/tambayan/') && checkUser ?
    <>
      <Mui.Box
        sx={{ my: 2, position: "relative", width: { xs: "100%", md: "35%" } }}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={newSearchs}
          getOptionLabel={(option: any) => option?.full_name}
          renderOption={(props, option: any) => (
            <li {...props}>
              <span onClick={() => router.push(`/user/${option?.uid}`)} style={{ display: 'flex', textAlign: 'center', fontFamily: "Raleway-medium", fontSize: "0.85rem" }}>
                <Avatar sx={{ width: 26, height: 26, borderRadius: '5px', marginRight: '6px', marginTop: '4px' }} alt={option?.full_name} src={option?.profile_photo} />
                <span style={{ textAlign: 'left' }}>
                  {option?.full_name}
                  {option?.home_country &&
                    <div style={{ fontFamily: "Raleway-medium", fontSize: "0.65rem", textAlign: 'left' }}>{option?.current_city},{option?.home_country}</div>
                  }
                </span>
              </span>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { fontSize: '0.75rem' },
                type: 'text',
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      {/* <IconButton
                            aria-label="toggle password visibility"
                          >
                            <CancelIcon />
                          </IconButton> */}
                      <ButtonNew onClick={() => {
                        setNewSearch([]),
                          console.log(newSearchs, "wjdnahb")
                      }} variant="contained">
                        <Mui.Box width={25} component="img" src={SearchIcon.src} />
                      </ButtonNew>
                    </InputAdornment>
                  </>
                )
              }}
              placeholder='Search...'
              onChange={(e: any) => (
                console.log(e.target.value),
                setSearch(e.target.value))}
            />
          )}
        />
      </Mui.Box></> :
    <>
      <Mui.Box
        sx={{ my: 2, position: "relative", width: { xs: "100%", md: "35%" } }}
      >
        <TextFields
          placeholder="Search…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Mui.Box>
          <Button onClick={() => console.log(value)} variant="contained">
            <Mui.Box width={25} component="img" src={SearchIcon.src} />
          </Button>
        </Mui.Box>
      </Mui.Box>
    </>
};

