import React, { useState ,useEffect} from "react";
import { Button, Grid, ListItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import AddRequirements from "../estimationDetail/AddRequirements";
import { ClientProjectHeader } from "../estimationDetail/HeaderElement";
import { RequirementTable, RequirementTableWithFilter} from "./RequirementTable"
import  RequirementService from "./requirement.service"

const CreateRequirements = () => {
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projectsInfo = { ...location.state.projectInfo };
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);

  const [openEditConfigurationBox, setOpenEditConfigurationBox] = useState(false);
  const [editData, setEditData] = useState([]);
    const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  useEffect(() => {
    getRequirementWithQuery(() => {getBasicDetailById() });
  },[]);


   const getRequirementWithQuery = (callBack) => {
    RequirementService.getRequirementWithQuery(projectsInfo._id)
      .then((res) => {
        setRequirementHeaderData([ ...res.data.body.featureList ]);
        
        callBack();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
        callBack();
      });
  };
  console.log("requirementHeaderData: ", requirementHeaderData);
  

 const openEditRequirement = (event, rowData) => {
    console.log(rowData);
    const updatedRows = [requirementHeaderData[rowData.tableData.id]];
    setEditData(updatedRows);
    console.log(updatedRows + ">>>>>>>>>>>>>>>>>>");
    openFun();
  };


  const openFun = () => {
    setOpenEditConfigurationBox(true);
  };

  const closeFun = () => {
    setOpenEditConfigurationBox(false);

  };


  const getBasicDetailById = () => {
    RequirementService.getTagsType()
      .then((res) => {
        setRequirementTagArray([...res.data.body.requirementTag]);
        setRequirementTypeArray([...res.data.body.requirementType]);

      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };



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
     getRequirementWithQuery(() => { });
  };

    const updateAddRequirementsFun = () => {
    closeFun();
     getRequirementWithQuery(() => { });
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
          requirementTagArray={requirementTagArray}
          requirementTypeArray={requirementTypeArray}
          project={projectsInfo._id}
          estHeader={""}
          cancelTitle="Cancel"
        />
      ) : null}
{openEditConfigurationBox ? (
        <AddRequirements
          isOpen={openEditConfigurationBox}
          openF={openAddFun}
          closeF={closeFun}
          title="Edit Requirement"
          oktitle="Update"
          saveFun={updateAddRequirementsFun}
          requirementTagArray={requirementTagArray}
          requirementTypeArray={requirementTypeArray}
          project={projectsInfo._id}
          estHeader={""}
          editData={editData}
          cancelTitle="Cancel"
        />
      ) : null}
       <ClientProjectHeader client={clientInfo} project={ projectsInfo} />
    
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
        <RequirementTable
          requirementHeaderData={requirementHeaderData}
          selection={false}
          requirementTypeArray={requirementTypeArray}
          openEditRequirement={(event, rowData, togglePanel) =>
              openEditRequirement(event, rowData)
            }
          isEditable={true}
          />
      </BorderedContainer>
    </>
  );
};

export default CreateRequirements;
