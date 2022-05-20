import * as Mui from "@mui/material";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
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
            <Mui.Grid item md={6} xs={12} key={index}>
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

export const FilterDialog = ({ open, setOpen, ...props }: Props) => {
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
        <Mui.Box sx={{ width: "100%", mt: 2 }} >
          <Mui.Divider sx={{ width: "100%" }} />
        </Mui.Box>
      </BootstrapDialogTitle>
      <Mui.DialogContent>
        <Mui.Box sx={{ width: "100%" }}>
          <Mui.Typography sx={{ fontSize: "12px", fontWeight: 600, mt: 2 }}>
            Type of Industry
          </Mui.Typography>
          <CheckBoxGroup
            selected={selected}
            setSelected={setSelected}
            list={Object.keys(kijiji.categories.JOBS).slice(1)}
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
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
}

interface CalgaryTypeProps {
  list: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
