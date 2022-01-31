import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import { MenuItem, Select } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import masterServices from "../masterservices/master.service";
import { setEstimationLocation } from "../../Redux/basicDetailRedux";
import FormHelperText from "@material-ui/core/FormHelperText";

const MultiLocationSelection = (props) => {
  const basicDetailRedux = useSelector((state) => state.basicDetail);
  const dispatch = useDispatch();

  const [locations, setLocations] = useState([]);
  const [available, setAvailable] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  useEffect(() => {
    getAllLocation();
  }, []);

  //get all location
  const getAllLocation = async () => {
    let estHeaderId = props.estheaderid;

    if (!estHeaderId) {
      estHeaderId = basicDetailRedux.estimationHeaderId;
    }

    await masterServices
      .getAllEstimationLocations(estHeaderId)
      .then((res) => {
        let dataResponce = res.data.body;
        setLocations(dataResponce);

        let availableArr = [];
        dataResponce.forEach((element) => {
          if (element.selected) {
            availableArr.push(element);
          }
        });
        setAvailable(availableArr);
        dispatch(setEstimationLocation(availableArr));
      })
      .catch((err) => {
        console.log("get master estimation locations", err);
      });
  };

  const handleChange = (event) => {
    console.log("event", event);
    const {
      target: { value },
    } = event;
    setAvailable(value);
    dispatch(setEstimationLocation(value));
    //
    props.errorHandler();
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Locations</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={available}
          error={props.error }
          onChange={handleChange}
          input={<OutlinedInput label="Locations" />}
          renderValue={(selected) => selected.map((el) => el.name).join(", ")}
          MenuProps={MenuProps}
          style={{ width: "250px" }}
        >
          {locations.map((element) => (
            <MenuItem key={element._id} value={element}>
              <Checkbox checked={available.indexOf(element) > -1} />
              <ListItemText primary={element.name} />
            </MenuItem>
          ))}
        </Select>
        {props.error && <FormHelperText>Please select Location</FormHelperText>} 
      </FormControl>
    </>
  );
};

export default MultiLocationSelection;
