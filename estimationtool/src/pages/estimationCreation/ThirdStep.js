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

const ThirdStep = () => {
  const [openAddCalAttributeBox, setOpenAddCalAttributeBox] = useState(false);

  const openAddCalAttribute = () => {
    openFun();
  };

  const openFun = () => {
    setOpenAddCalAttributeBox(true);
  };
  const closeFun = () => {
    setOpenAddCalAttributeBox(false);
  };
  const saveAddCalAttributeFun = () => {};

  return (
    <React.Fragment>
      {openAddCalAttributeBox ? (
        <AddAttributeDialog
          isOpen={openAddCalAttributeBox}
          openF={openFun}
          closeF={closeFun}
          title="Add Cal Attribute"
          oktitle="Save"
          saveFun={saveAddCalAttributeFun}
          cancelTitle="Cancel"
        />
      ) : null}
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
            <Button variant="outlined" onClick={openAddCalAttribute}>
              {" "}
              <AddIcon /> Add Cal Attribute
            </Button>
          </div>
        </Grid>
      </Grid>
      <BorderedContainer>
        <FormControl sx={{ m: 6 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Calculated Attributes </FormLabel>
          <FormGroup className="">
            <FormControlLabel
              control={
                <>
                  <Checkbox defaultChecked />{" "}
                  <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox /> <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox /> <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox /> <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox /> <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox /> <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox /> <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox /> <TextField className="text-box" label="%" />
                </>
              }
              label="Label"
            />
          </FormGroup>
        </FormControl>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default ThirdStep;
