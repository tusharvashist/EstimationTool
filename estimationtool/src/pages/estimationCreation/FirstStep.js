import {
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import React from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";

const FirstStep = () => {
  return (
    <React.Fragment>
      <BorderedContainer className="no-shadow">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ListItem>Client Name: </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Client Website:</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Project Name:</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Business Domain:</ListItem>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer className="no-shadow">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Age
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Age
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Grid>
        </Grid>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default FirstStep;
