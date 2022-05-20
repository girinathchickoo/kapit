import * as Mui from "@mui/material";
import * as React from "react";
import * as kijiji from "kijiji-scraper";

import { BootstrapDialogTitle } from "./addJob";

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Mui.Box sx={{ p: 1, height: "360px", overflow: "auto" }}>
          {children}
        </Mui.Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const CustomTab = Mui.styled(Mui.Tab)({
  padding: 1,
  fontSize: "12px",
  textTransform: "capitalize",
  minHeight: "30px",
});

const JobTypeList: string[] = ["Part-time", "Full-time"];

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
                    checked={selected.includes(item)}
                    onChange={handleChange}
                    name={item}
                  />
                }
                label={
                  item[0].toUpperCase() +
                  item.replaceAll("_", " ").slice(1).toLowerCase()
                }
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

export const Filter = ({ open, setOpen, ...props }: Props) => {
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

  return (
    <Mui.Dialog maxWidth="sm" open={open} fullWidth>
      <BootstrapDialogTitle id="customized-dialog-title1" onClose={handleClose}>
        <Mui.Typography
          sx={{ fontSize: "1rem", fontWeight: 600, mt: 3, ml: 1 }}
          color="primary"
        >
          Filters
        </Mui.Typography>
      </BootstrapDialogTitle>
      <Mui.DialogContent>
        <Mui.Box sx={{ width: "100%" }}>
          <Mui.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Mui.Tabs
              sx={{ minHeight: "35px" }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <CustomTab label="Type of Industry" {...a11yProps(0)} />
              <CustomTab label="Location" {...a11yProps(1)} />
              <CustomTab label="Job Type" {...a11yProps(2)} />
            </Mui.Tabs>
          </Mui.Box>
          <TabPanel value={value} index={0}>
            <CheckBoxGroup
              selected={typesOfIndustry}
              setSelected={setTypesOfIndustry}
              list={Object.keys(kijiji.categories.JOBS).slice(1)}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CheckBoxGroup
              selected={locations}
              setSelected={setLocations}
              list={Object.keys(kijiji.locations).slice(1)}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CheckBoxGroup
              selected={jobType}
              setSelected={setJobType}
              list={JobTypeList}
            />
          </TabPanel>
        </Mui.Box>
      </Mui.DialogContent>
      <Mui.DialogActions sx={{ p: 1, pr: 4 }}>
        <Mui.Button variant="outlined" size="small" onClick={handleReset}>
          Reset Filter
        </Mui.Button>
        <Mui.Button variant="contained" size="small" onClick={handleClose}>
          Ok
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
