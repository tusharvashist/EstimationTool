import {
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";

const FirstStep = () => {
  const [characterCount, setCharacterCount] = useState(0);
  return (
    <React.Fragment>
      <BorderedContainer className="no-shadow">
        <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Estimation Type*
                </InputLabel>
                <Select
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <MenuItem value={10}>FIX-BID</MenuItem>
                  <MenuItem value={20}>ROM</MenuItem>
                  <MenuItem value={30}>SWAG</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Effort Unit*
                </InputLabel>
                <Select
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <MenuItem value={10}>Hour</MenuItem>
                  <MenuItem value={20}>Day</MenuItem>
                  <MenuItem value={30}>Month</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="standard-basic"
              label="Estimation Name*"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item xs={8} spacing={1}>
          <TextField
            id="standard-basic"
            label="Description*"
            variant="standard"
            multiline={true}
            multiline
            rows={3}
            rowsMax={3}
            onChange={(e) => setCharacterCount(e.target.value.length)}
            variant="outlined"
          />
        </Grid>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default FirstStep;
