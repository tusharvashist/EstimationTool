import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  ListItem,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";
import AddIcon from "@material-ui/icons/Add";
import AddAttributeDialog from "./AddAttributeDialog";

const SecondStep = () => {
  const [openAddAttributeBox, setOpenAddAttributeBox] = useState(false);

  const openAddAttribute = () => {
    openFun();
  };

  const openFun = () => {
    setOpenAddAttributeBox(true);
  };

  const closeFun = () => {
    setOpenAddAttributeBox(false);
  };

  const saveAddAttributeFun = () => {};

  return (
    <React.Fragment>
      {openAddAttributeBox ? (
        <AddAttributeDialog
          isOpen={openAddAttributeBox}
          openF={openFun}
          closeF={closeFun}
          title="Add Attribute"
          oktitle="Save"
          saveFun={saveAddAttributeFun}
          cancelTitle="Cancel"
        />
      ) : null}
      <BorderedContainer className="no-shadow">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <div className="field-width">
              <FormControl fullWidth>
                <ListItem>Estimation Name:</ListItem>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="field-width">
              <FormControl fullWidth>
                <ListItem>Estimation Type:</ListItem>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <ListItem>Effort Unit:</ListItem>
          </Grid>
        </Grid>
      </BorderedContainer>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justify={"flex-end"}
      >
        <Grid item>
          <div className="field-width add-attribute-btn">
            <Button variant="outlined" onClick={openAddAttribute}>
              {" "}
              <AddIcon /> Add Attribute
            </Button>
          </div>
        </Grid>
      </Grid>
      <BorderedContainer>
        <FormControl sx={{ m: 6 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Effort Attribute</FormLabel>
          <FormGroup className="label-to-row">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Label"
            />
            <FormControlLabel control={<Checkbox />} label="Label" />
            <FormControlLabel control={<Checkbox />} label="Label" />
            <FormControlLabel control={<Checkbox />} label="Label" />
            <FormControlLabel control={<Checkbox />} label="Label" />
            <FormControlLabel control={<Checkbox />} label="Label" />
            <FormControlLabel control={<Checkbox />} label="Label" />
            <FormControlLabel control={<Checkbox />} label="Label" />
          </FormGroup>
        </FormControl>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default SecondStep;
