import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import { MenuItem, Select } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import masterServices from "../masterservices/master.service";

const MultiLocationSelection = (props) => {
  const basicDetailRedux = useSelector((state) => state.basicDetail);
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

    return () => {
      setAvailable([]); // This worked for me
    };
  }, []);

  //get all location
  const getAllLocation = () => {
    //setLoader(true);
    let estHeaderId = props.estheaderid;

    if (!estHeaderId) {
      estHeaderId = basicDetailRedux.estimationHeaderId;
    }

    masterServices
      .getAllEstimationLocations(estHeaderId)
      .then((res) => {
        console.log("1");
        let dataResponce = res.data.body;
        setLocations(dataResponce);
      })
      .catch((err) => {
        console.log("get master estimation locations", err);
      });

    setEditData();
  };

  const setEditData = () => {
    console.log("2");
    locations.forEach((element) => {
      if (element.selected) setAvailable(element.name);
    });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailable(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
    //filter(value);
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
          onChange={handleChange}
          input={<OutlinedInput label="Locations" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          style={{ width: "250px" }}
        >
          {locations.map((element) => (
            <MenuItem key={element._id} value={element.name}>
              <Checkbox checked={available.indexOf(element.name) > -1} />
              <ListItemText primary={element.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MultiLocationSelection;
