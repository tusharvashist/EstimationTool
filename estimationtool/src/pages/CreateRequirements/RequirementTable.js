import React, { useState } from "react";
import { Button, Grid, ListItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import AddRequirements from "../estimationDetail/AddRequirements";
import { ClientProjectHeader } from "../estimationDetail/HeaderElement";
import useLoader from "../../shared/layout/hooks/useLoader";

export const RequirementTable = (props) => {
    const location = useLocation();
    const clientInfo = { ...location.state.clientInfo };
    const projecttInfo = { ...location.state.projectInfo };
    const [loaderComponent, setLoader] = useLoader(false);
    const [requirementHeader, setSummaryHeaderArray] = useState([
      { title: "Requirement", field: "Requirement", editable: false },
      { title: "Description", field: "Description", editable: false },
      { title: "Tag", field: "Tag", editable: false },
      { title: "Type", field: "Type", editable: false },
      { title: "Query", field: "Query", editable: false },
      { title: "Assumption", field: "Assumption", editable: false },
      { title: "Reply", field: "Reply", editable: false },      
    ]);
    const [requirementHeaderData, setRequirementHeaderData] = useState([]);
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
  };

  const openEditRequirement = (event, rowData) => {
 
  };
  return (
    <>
        {loaderComponent ? (
          loaderComponent
        ) : (
          <MaterialTable
            style={{ boxShadow: "none" }}
            title={`Requirements`}
            columns={requirementHeader}
            data={props.requirementHeaderData}
            onRowClick={(event, rowData, togglePanel) =>
              openEditRequirement(event, rowData)
            }
            editable={'never'}
            options={{
              search: false,
              headerStyle: {
                backgroundColor: "#e5ebf7",
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: "#113c91",
              },
            }}
          />
        )}
    </>
  );
};



export const RequirementTableWithFilter = () => {

  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const openAddRequirement = () => {
    openAddFun();
  };
    
     const openAddFun = () => {
    setOpenAddRequirementsBox(true);
  };

  return (
      <>
          <Grid container justifyContent="flex-end">
        <Grid item style={{ margin: "10px" }}>
          <Button onClick={openAddRequirement} variant="outlined">
            {" "}
            <AddIcon />
            Filter
          </Button>
        </Grid>
      </Grid>
        <RequirementTable />
    </>
  );
};
