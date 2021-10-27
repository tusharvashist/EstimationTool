import {
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  NativeSelect,
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
        <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 } }>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Estimation Type*
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}>FIX-BID</option>
                  <option value={20}>ROM</option>
                  <option value={30}>SWAG</option>
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Effort Unit*
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}>Hour</option>
                  <option value={20}>Day</option>
                  <option value={30}>Month</option>
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="standard-basic"
              label="Estimation Name*"
              variant="standard"
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
              rows={1}
              rowsMax={1}
              onChange={(e) => setCharacterCount(e.target.value.length)}
             
            />
          </Grid>
     
      </BorderedContainer>
    </React.Fragment>
  );
};

export default FirstStep;
