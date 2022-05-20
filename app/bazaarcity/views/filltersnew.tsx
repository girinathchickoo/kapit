import * as Mui from "@mui/material";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
import * as kijiji from "kijiji-scraper";

const IndustryList: string[] = Object.keys(kijiji.categories.BUY_AND_SELL).slice(1)

const CheckBoxGroup = ({ list, selected, setSelected }: IndustryTypeProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && !selected.includes(event.target.name)) {
      setSelected([...selected, event.target.name]);
    } else {
      let values = [...selected];
      values.splice(values.indexOf(event.target.name), 1);
      setSelected(values);
    }
  };

  return (
    <Mui.FormControl
      color="primary"
      component="fieldset"
      variant="standard"
      fullWidth
    >
      <Mui.FormGroup>
        <Mui.Grid container sx={{ m: 1 }}>
          {list.map((item, index) => (
            <Mui.Grid item xs={6} key={index}>
              <Mui.FormControlLabel
                control={
                  <Mui.Checkbox
                    checked={selected.includes(item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase())}
                    onChange={handleChange}
                    name={item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase()}
                  />
                }
                label={item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase()}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "12px",
                    color: "#707070",
                  },
                }}
              />
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Mui.FormGroup>
    </Mui.FormControl>
  );
};

export const Filtersnew = ({ open, setOpen, ...props }: Props) => {
  const {
    setJobType,
    setTypesOfIndustry,
    setLocations,
    jobType,
    typesOfIndustry,
    locations,
  } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setTypesOfIndustry([]);
    setLocations([]);
    setJobType([]);
  };
  const Typography = Mui.styled(Mui.Typography)({
    fontSize: "1rem",
    color: "#9B7DD4",
    fontWeight: 600,
  });

  return (
    // <Mui.Box>
    //   <CheckBoxGroup
    //     selected={typesOfIndustry}
    //     setSelected={setTypesOfIndustry}
    //     list={IndustryList}
    //   />
    // </Mui.Box>

    <Mui.Dialog maxWidth="sm" open={open} fullWidth>
      {/* <BootstrapDialogTitle id="customized-dialog-title1" onClose={handleClose}> */}
      <Mui.DialogTitle>
        <Mui.Toolbar
          sx={{ minHeight: "50px !important", padding: "0px !important" }}
        >
          <Mui.Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Filters</Typography>
            <Mui.IconButton onClick={handleClose}>
              <MuiIcons.Close />
            </Mui.IconButton>
          </Mui.Stack>
        </Mui.Toolbar>
        <Mui.Box sx={{ width: "100%" }} >
          <Mui.Divider sx={{ width: "100%" }} />
        </Mui.Box>
      </Mui.DialogTitle>
      {/* </BootstrapDialogTitle> */}
      <Mui.DialogContent>
        <Mui.Box sx={{ width: "100%" }}>
          <CheckBoxGroup
            selected={typesOfIndustry}
            setSelected={setTypesOfIndustry}
            list={IndustryList}
          />
        </Mui.Box>
        <Mui.Box sx={{ width: "100%" }} >
          <Mui.Divider sx={{ width: "100%" }} />
        </Mui.Box>
      </Mui.DialogContent>
      <Mui.DialogActions sx={{ p: 3, pr: 4, pt: 1 }}>
        <Mui.Button variant="outlined" size="small" onClick={handleReset} sx={{
          border: "none",
          "&:hover": {
            border: "none"
          }
        }}>
          Reset Filter
        </Mui.Button>
        <Mui.Button variant="contained" size="small" onClick={handleClose}>
          Apply Filters
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  );
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  typesOfIndustry: string[];
  setTypesOfIndustry: React.Dispatch<React.SetStateAction<string[]>>;
  locations: string[];
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
  jobType: string[];
  setJobType: React.Dispatch<React.SetStateAction<string[]>>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IndustryTypeProps {
  list: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
