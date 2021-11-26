import React, { useState } from "react";
import { Button, Grid, ListItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import AddRequirements from "../estimationDetail/AddRequirements";
import { ClientProjectHeader } from "../estimationDetail/HeaderElement";
import { RequirementTableWithFilter} from "./RequirementTable"
const CreateRequirements = () => {
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projecttInfo = { ...location.state.projectInfo };

  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);

  const openAddRequirement = () => {
    openAddFun();
  };

  const openAddFun = () => {
    setOpenAddRequirementsBox(true);
  };

  const closeAddFun = () => {
    setOpenAddRequirementsBox(false);
  };

  const saveAddRequirementsFun = () => {
    closeAddFun();
    //getById(); // copied from estimation detail page
  };

  return (
    <>
      {openAddRequirementsBox ? (
        <AddRequirements
          isOpen={openAddRequirementsBox}
          openF={openAddFun}
          closeF={closeAddFun}
          title="Add Requirement"
          oktitle="Save"
          saveFun={saveAddRequirementsFun}
          // requirementTagArray={requirementTagArray}
          // requirementTypeArray={requirementTypeArray}
          // project={projectDetails._id}
          // estHeader={headerData._id}
          cancelTitle="Cancel"
        />
      ) : null}

       <ClientProjectHeader client={clientInfo} project={ projecttInfo} />
    
      <Grid container justifyContent="flex-end">
        <Grid item style={{ margin: "10px" }}>
          <Button onClick={openAddRequirement} variant="outlined">
            {" "}
            <AddIcon />
            Add Requirements
          </Button>
        </Grid>
      </Grid>
      <BorderedContainer>
        <RequirementTableWithFilter />
      </BorderedContainer>
    </>
  );
};

export default CreateRequirements;
