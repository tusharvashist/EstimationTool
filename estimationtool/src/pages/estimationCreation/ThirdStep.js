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
import AddCalAttributeDialog from "./AddCalAttributeDialog";

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
        <AddCalAttributeDialog
          isOpen={openAddCalAttributeBox}
          openF={openFun}
          closeF={closeFun}
          title="Add Cal Attribute"
          oktitle="Save"
          saveFun={saveAddCalAttributeFun}
          cancelTitle="Cancel"
        />
      ) : null}
      
      
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
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="QA"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox />{" "}
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="BA"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox />{" "}
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="PM"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox />{" "}
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="Unit Testing"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox />{" "}
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="Architect"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox />{" "}
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="UAT Testing"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox />{" "}
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="Prod Support"
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox />{" "}
                  <TextField
                    className="text-box"
                    label="%"
                    variant="outlined"
                  />
                  <TextField
                    className="comment-box"
                    label="Comment"
                    variant="outlined"
                  />
                </>
              }
              label="Buffer"
            />
          </FormGroup>
        </FormControl>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default ThirdStep;
