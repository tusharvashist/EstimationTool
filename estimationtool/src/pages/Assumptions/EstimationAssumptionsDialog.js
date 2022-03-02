import React, { useEffect, useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles, createStyles } from "@mui/styles";
import assumptionService from "./assumpion.service";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const EstimationAssumptionsDialog = (props) => {

  const [assumptions, setAssumptions] = useState([]);
  const [assumptionsFilter, setAssumptionsFilter] = useState([]);
  const [selectedAssumptions, setSelectedAssumptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [isOpen, setOpen] = React.useState({});
  const { message, severity, open } = isOpen || {};

  useEffect(() => {
    importAllAssumptions();
    importAllAssumptionTags();
  }, []);
  
  const importAllAssumptionTags = async () => {
    let result = await assumptionService.importAllAssumptionTags();
    var tags = result.data.body;

    tags.splice(0, 0, {
      "id": "0",
      "name": "All",
      "createdAt": "2022-02-24T11:57:48.069Z",
      "updatedAt": "2022-02-24T11:57:48.069Z",
      "__v": 0
    });
    setCategories(tags);
    setSelectedCategory(tags[0].id);
  };

  const handleClose = () => { 
    setOpen(false);
  }

  const popSubmitHandler = async() => {
    var selectedItem = [];
    selectedAssumptions.forEach((item) => {
      var assumptiontemp = assumptions.filter((el) => el.id === item)
      if (assumptiontemp.length !== 0) {
        selectedItem.push({ "id": assumptiontemp[0]._id });
      }
    });
       var request = { "assumptionsList": selectedItem };
      let result = await assumptionService.mapWithEstimation(props.estimationId, request);
    console.log("assumptions: ", result);
    if (result.data.status === 200) {
      setOpen({
        open: true,
        severity: "success",
        message: result.data.message,
      });
    } else {
      setOpen({
        open: true,
        severity: "error",
        message: result.data.message,
      });
    }
      importAllAssumptions();
  };
  
  const popCancelHandler = () => {
    setSavedSelectedAssumption(assumptions);
    props.closeFun();
  };

  const handleCategoriesChange = (event) => {
    setSelectedCategory(event.target.value);

    if (event.target.value === "0") {
       setAssumptionsFilter(assumptions);
    } else {
       setAssumptionsFilter(assumptions.filter((el) =>  el.assumptionTag._id === event.target.value));
    }

    setSavedSelectedAssumption(assumptions);
  
  };

  console.log("AssumptionsFilter: ", assumptionsFilter);
  
  const importAllAssumptions = async () => {
    let result = await assumptionService.getLinkAssumptionWithEstimation(props.estimationId);
     var index = 1;
        result.data.body.assumption.forEach(estimate => {
          estimate["id"] = index;
          index = index + 1;
        });
    setAssumptions(result.data.body.assumption);
    if (selectedCategory === "0") {
       setAssumptionsFilter(result.data.body.assumption);
    } else {
       setAssumptionsFilter(...result.data.body.assumption.filter((el) =>  el.assumptionTag._id === selectedCategory));
    }
     setSavedSelectedAssumption(result.data.body.assumption);

  };

  const setSavedSelectedAssumption = (assumption)=> {
    var selectedItem = [];
    selectedItem.push( ...assumption.filter((el) =>  el.selected === true));
    var selectedItemId = [];
    selectedItem.forEach((item) => {selectedItemId.push(item.id);});
    setSelectedAssumptions(selectedItemId);
 }
  console.log("assumptions: ", assumptions);
  console.log("selectedAssumptions: ", selectedAssumptions);
  
  const columns = [
    { field: "assumption", headerName: "Assumption", width: 350 },
    {
      field: "assumptionTag",
      headerName: "Tag",
      width: 150,
      renderCell: (rowData) => {
        return rowData.row.assumptionTag.name;
      },
    },
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
      closeFun={popCancelHandler}
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
              value={selectedCategory}
              label="Categories"
              onChange={handleCategoriesChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} style={{ paddingTop: "10px" }}>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              className={classes.root}
              rows={assumptionsFilter}
              columns={columns}
              checkboxSelection={true}
                selectionModel={selectedAssumptions}
              onSelectionModelChange={(rows) => {
                setSelectedAssumptions(rows);
              }}
            />
          </div>
        </Grid>
      </Grid>
      {open && (
          <Snackbar
            isOpen={open}
            severity={severity}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
          />
        )}
    </CustomizedDialogs>
  );
};

export default EstimationAssumptionsDialog;