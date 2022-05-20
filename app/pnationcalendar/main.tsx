import * as Mui from "@mui/material";
import { EventFeed, PostEvent } from "./views";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as React from "react";
import * as Hooks from "hooks";
import * as MuiIcons from "@mui/icons-material";
import * as Layouts from "layouts";
import * as kijiji from "kijiji-scraper";

const Typography = Mui.styled(Mui.Typography)({
  fontSize: "1rem",
  color: "#9B7DD4",
  fontWeight: 600,
});

const StyledTYpography = Mui.styled(Mui.Typography)({
  fontSize: "0.8rem",
  color: "#333333",
});

const TextField = Mui.styled(Mui.TextField)({
  width: "100%",
  height: "2.6rem",
  borderRadius: "5px",
  outline: "none",
  border: "none",
  backgroundColor: "#FAF7FF",
  "& .MuiOutlinedInput-root": {
    height: "2.6rem !important",
    outline: "none",
    border: "none",
  },
});

export const Main = () => {
  const [filterModel, setFilterModel] = React.useState(false);
  const [filterLocations, setFilterLocations] = React.useState([]);
  const [filterDate, setFilterDate] = React.useState([]);
  const value = React.useContext(Layouts.Mainlayouts.SearchContext);

  const { isLoading, data, refetch } = ReactQuery.useQuery(
    ["pnationNation", filterLocations, filterDate, value],
    async () => {
      let datas = await Server.Server.Client().post(
        Server.Server.ApiRoutes.pnation.listEvent,
        {
          search: value,
          pageNumber: 1,
          filterLocation: filterLocations,
          dateFilter: filterDate,
        }
      );
      return datas?.data?.data;
    }
  );

  console.log(filterDate);

  const handleModel = () => {
    setFilterModel(!filterModel);
  };

  return (
    <Mui.Box sx={{ height: "auto" }}>
      <Mui.Grid container>
        <Mui.Grid item xs={12}>
          <PostEvent isFetch={refetch} />
        </Mui.Grid>
        <Mui.Grid item md={8} xs={12} sx={{ marginTop: "20px" }}>
          <EventFeed openModel={handleModel} data={data} />
        </Mui.Grid>
        <Mui.Grid item md={4} xs={12}></Mui.Grid>
      </Mui.Grid>
      <FilterDialog
        filterProvince={(e: any) => setFilterDate(e)}
        filterLocation={(e: any) => setFilterLocations(e)}
        isOpen={filterModel}
        onclose={handleModel}
      />
    </Mui.Box>
  );
};

const FilterDialog = ({
  isOpen,
  onclose,
  filterLocation,
  filterProvince,
}: DialogProps) => {
  const isMobile = Hooks.useMobileView();
  const [filterLocations, setFilterLocations] = React.useState<string[]>([]);
  const [filterValues, setFilterValues] = React.useState(Object.keys(kijiji.locations).slice(1, 7).map((item, i) => {
    return {
      id: i,
      name: item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase(),
      checked: false
    }
  }));
  const [filter2values, setFilter2Values] = React.useState(Object.keys(kijiji.locations).slice(7).map((item, i) => {
    return {
      id: i,
      name: item[0].toUpperCase() + item.replaceAll("_", " ").slice(1).toLowerCase(),
      checked: false
    }
  }));
  const [startTime, setStartTime] = React.useState<any>();
  const [endTime, setEndTime] = React.useState<any>();

  const location1Value = (index: number, data: boolean) => {
    const value = filterValues[index]?.name || "";
    let locations = [...filterLocations];
    if (filterLocations.includes(value))
      locations.splice(locations.indexOf(value), 1);
    else locations.push(value);
    setFilterLocations(locations);
  };

  const location2Value = (index: number, data: boolean) => {
    const value = filter2values[index]?.name || "";
    let locations = [...filterLocations];
    if (filterLocations.includes(value))
      locations.splice(locations.indexOf(value), 1);
    else locations.push(value);
    setFilterLocations(locations);
  };

  const filerSearch = () => {
    let data: any;
    if (startTime !== "" && endTime !== "" && startTime && endTime) {
      data = [startTime, endTime];
    } else {
      data = [];
    }
    filterLocation(filterLocations);
    filterProvince(data);
    onclose() as any;
  };

  const resetFilter = () => {
    setStartTime("");
    setEndTime("");
    setFilterLocations([]);
  };

  return (
    <Mui.Box>
      <Mui.Dialog
        fullScreen={isMobile}
        onClose={onclose}
        open={isOpen}
        maxWidth="sm"
        sx={{ "& .MuiDialog-paper": { width: "100%", padding: "10px" } }}
      >
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
              <Typography>Filter By</Typography>
              <Mui.IconButton onClick={onclose}>
                <MuiIcons.Close />
              </Mui.IconButton>
            </Mui.Stack>
          </Mui.Toolbar>
        </Mui.DialogTitle>
        <Mui.DialogContent>
          <StyledTYpography>Date</StyledTYpography>
          <Mui.Divider sx={{ mt: 1, mb: 2 }} />
          <Mui.Grid container spacing={2}>
            <Mui.Grid item xs={5}>
              <TextField
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type={"date"}
              />
            </Mui.Grid>
            <Mui.Grid item xs={5}>
              <TextField
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                type={"date"}
              />
            </Mui.Grid>
            <Mui.Grid item xs={2}></Mui.Grid>
          </Mui.Grid>
          <Mui.Box sx={{ mt: "2rem" }}>
            <StyledTYpography>Location</StyledTYpography>
            <Mui.Divider sx={{ mt: 1, mb: 2 }} />
            <Mui.Grid container>
              <Mui.Grid item xs={5}>
                {filterValues.map((item: any, index: number) => (
                  <Mui.FormGroup key={index}>
                    <Mui.FormControlLabel
                      onChange={(event: any) => {
                        location1Value(index, item.checked);
                      }}
                      value={item.name}
                      control={
                        <Mui.Checkbox
                          checked={filterLocations.includes(item.name)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      }
                      label={<StyledTYpography>{item.name}</StyledTYpography>}
                    />
                  </Mui.FormGroup>
                ))}
              </Mui.Grid>
              <Mui.Grid item xs={5}>
                {filter2values.map((item: any, index: number) => (
                  <Mui.FormGroup key={index}>
                    <Mui.FormControlLabel
                      onChange={(event: any) => {
                        location2Value(index, item.checked);
                      }}
                      value={item.name}
                      control={
                        <Mui.Checkbox
                          checked={filterLocations.includes(item.name)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      }
                      label={<StyledTYpography>{item.name}</StyledTYpography>}
                    />
                  </Mui.FormGroup>
                ))}
              </Mui.Grid>
              <Mui.Grid item xs={2}></Mui.Grid>
            </Mui.Grid>
          </Mui.Box>
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Stack
            sx={{ width: "100%" }}
            direction={"row"}
            spacing={2}
            justifyContent={"end"}
          >
            <Mui.Button onClick={resetFilter} sx={{ width: "20%" }}>
              Clear Filters
            </Mui.Button>
            <Mui.Button
              onClick={filerSearch}
              variant="contained"
              sx={{ width: "20%" }}
            >
              Apply Filters
            </Mui.Button>
          </Mui.Stack>
        </Mui.DialogActions>
      </Mui.Dialog>
    </Mui.Box>
  );
};

interface DialogProps {
  isOpen: boolean;
  onclose: () => void;
  filterLocation?: any;
  filterProvince?: any;
}
