import React ,{ useEffect, useState }  from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles, createStyles } from "@mui/styles";
import assumptionService from "./assumpion.service";


const EstimationAssumptionsDialog = (props) => {
  
  
  const [assumptions, setAssumptions] = useState([]);

  const [selectedAssumptions, setSelectedAssumptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});


    useEffect(() => {
    importAllAssumptions();
    importAllAssumptionTags();
    }, []);
  
  
  const importAllAssumptionTags = async () => {
    let result = await assumptionService.importAllAssumptionTags();
    setCategories(result.data.body);
    setSelectedCategory(result.data.body[0].id);
  };


  const popSubmitHandler = () => { };

  // const handleCategoriesChange = (event) => {
  //   setCategories(event.target.value);
  // };

  const handleCategoriesChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const importAllAssumptions = async () => {
    let result = await assumptionService.getLinkAssumptionWithEstimation("6215b5646b458553c13a81e4");
     var index = 1;
        result.data.body.assumption.forEach(estimate => {
          estimate["id"] = index;
          index = index + 1;
        });
    console.log(result.data.body.assumption);


    setSelectedAssumptions(...result.data.body.assumption.filter((el) => el.selected === true))
    setAssumptions(result.data.body.assumption);
  };


  console.log("assumptions: ", assumptions);
  
 console.log("selectedAssumptions: ",selectedAssumptions);


  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns = [
    { field: "assumption", headerName: "Assumption", width: 350 },
    {
      field: "assumptionTag", headerName: "Tag", width: 150,
     renderCell: (rowData) => {
        return rowData.row.assumptionTag.name;
      }
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
              rows={assumptions}
              columns={columns}
              checkboxSelection={true}
              selectionModel={selectedAssumptions}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedAssumptions(newSelectionModel);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default EstimationAssumptionsDialog;
