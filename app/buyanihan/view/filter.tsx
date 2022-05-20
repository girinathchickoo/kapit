import * as Mui from "@mui/material";
import * as React from "react";
import * as kijiji from "kijiji-scraper";

import { BootstrapDialogTitle } from "./dialogLayout";

const CheckBoxGroup = ({ list, selected, setSelected }: CalgaryTypeProps) => {
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

export const Filter = ({ open, setOpen, ...props }: Props) => {
  const { selected, setSelected } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setSelected([]);
  };

  return (
    <Mui.Dialog maxWidth="sm" open={open} fullWidth>
      <BootstrapDialogTitle id="customized-dialog" onClose={handleClose}>
        <Mui.Typography
          sx={{ fontSize: "1rem", fontWeight: 600, mt: 3, ml: 1 }}
          color="primary"
        >
          Filters
        </Mui.Typography>
      </BootstrapDialogTitle>
      <Mui.DialogContent>
        <Mui.Box sx={{ width: "100%" }}>
          <Mui.Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
            Categories
          </Mui.Typography>
          <CheckBoxGroup
            selected={selected}
            setSelected={setSelected}
            list={Object.keys(kijiji.categories.JOBS).slice(1)}
          />
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
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
}

interface CalgaryTypeProps {
  list: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
