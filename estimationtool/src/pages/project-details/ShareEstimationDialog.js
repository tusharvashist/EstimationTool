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




const ShareEstimationDialog = (props) => {

  const [selectedEstimation, setSelectedEstimation] = useState([]);
  
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
  setSelectedEstimation({ ...props.selectedEstimation });
}, [props.selectedEstimation ]);
  
  
  
  console.log("selectedEstimation : ", selectedEstimation);


  const handleChipClick = () => { };
  const handleChipDelete = () => {};
  const [roles, setRoles] = React.useState([]);
  const handleRoleChange = (event) => { setRoles(event.target.value); };

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
          <Grid item>
      <Chip
                label="Clickable Deletable"
                variant="outlined"
                onClick={handleChipClick}
                onDelete={handleChipDelete}
              />
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
                onChange={handleRoleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
