import React from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles, createStyles } from "@mui/styles";

const EstimationAssumptionsDialog = (props) => {
  const popSubmitHandler = () => {};
  const [categories, setCategories] = React.useState(["a", "b", "c"]);

  const handleCategoriesChange = (event) => {
    setCategories(event.target.value);
  };

  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns = [
    { field: "col1", headerName: "Column 1", width: 350 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "rgb(229, 235, 247)",
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <CustomizedDialogs
      isOpen={props.isOpen}
      openFun={props.openFun}
      closeFun={props.closeFun}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={props.cancelTitle}
      saveFun={popSubmitHandler}
      width={"sm"}
      buttonType="submit"
    >
      <Grid container>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categories}
              label="Categories"
              onChange={handleCategoriesChange}
            >
              {categories.map((el) => (
                <MenuItem value={el}>{el}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} style={{ paddingTop: "10px" }}>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              className={classes.root}
              rows={rows}
              columns={columns}
              checkboxSelection={true}
            />
          </div>
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default EstimationAssumptionsDialog;
