import React , { useState, useEffect} from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ShareEstimateDialogService from "./ShareEstimateDialogService";

const ShareEstimationDialog = (props) => {

  const [selectedEstimation, setSelectedEstimation] = useState();
  
  const [roleMasterList, setRoleMasterList] = useState();
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];


useEffect(() => {
  setSelectedEstimation(props.selectedEstimation);
  getRole();
}, [props.selectedEstimation]);
  
  
  
  
  const getRole = () => {
    ShareEstimateDialogService.getRole()
      .then((res) => {
        let roleList = res.data.body;
        setRoleMasterList(roleList);
         console.log("get Client by id error", roleList);
      })
      .catch((err) => {
        console.log("get Client by id error", err);
      });
  };
  
  
  console.log("selectedEstimation : ", selectedEstimation);
  
  const handleChipClick = () => { };
  
  const handleChipDelete = (item) => {
    var temp = selectedEstimation;
    setSelectedEstimation(temp.filter((el) => el.id !== item.id))
    if (selectedEstimation.length === 1) {
      props.closeF();
    }
  };

  const [roles, setRoles] = React.useState([]);
  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  return (
    <CustomizedDialogs
      isOpen={props.isOpen}
      openFun={props.openF}
      closeFun={props.closeF}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={props.cancelTitle}
      saveFun={props.saveFun}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid item>Estimations</Grid>
          <Grid item>
            {selectedEstimation !== undefined ? selectedEstimation.map((item) => { 
            return (<Chip
              label={item.estName}
                variant="outlined"
                onClick={handleChipClick}
              onDelete={() => { handleChipDelete(item) }}
              />)
            }) : ""}
      
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>Estimation Role</Grid>
          <Box sx={{ maxWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roles}
                label="Roles"
                onChange={(e) => {
                handleRoleChange(e);
              }}
              >
                
                {roleMasterList !== undefined ? roleMasterList.map((item) => { 
                  return (<MenuItem value={item._id}>{item.roleName}</MenuItem>)
            }) : ""}
               
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid item>Share with</Grid>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="filterSelectedOptions"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default ShareEstimationDialog;
