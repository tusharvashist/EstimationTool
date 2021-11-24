import React from "react";
import { Button, Grid, ListItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";

const CreateRequirements = () => {
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projecttInfo = { ...location.state.projectInfo };

  const addRequirementHandle = () => {};

  return (
    <>
      <BorderedContainer>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ListItem>Client Name: {clientInfo.clientName}</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>
              Client Website:&nbsp;
              <a target="_blank" href={`//${clientInfo.website}`}>
                {clientInfo.website}
              </a>
            </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Project Name: {projecttInfo.projectName}</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Business Domain: {projecttInfo.domain}</ListItem>
          </Grid>
        </Grid>
      </BorderedContainer>
      <Grid container justifyContent="flex-end">
        <Grid item style={{ margin: "10px" }}>
          <Button onClick={addRequirementHandle} variant="outlined">
            {" "}
            <AddIcon />
            Add Requirements
          </Button>
        </Grid>
      </Grid>
      <BorderedContainer>
        <MaterialTable />
      </BorderedContainer>
    </>
  );
};

export default CreateRequirements;
