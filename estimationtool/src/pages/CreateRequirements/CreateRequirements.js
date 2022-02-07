import React, { useState ,useEffect} from "react";
import { Button, Grid,Container } from "@material-ui/core";
import { useLocation ,Link } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import AddRequirements from "../estimation-detail/AddRequirementsPopup";
import { ClientProjectHeader } from "../estimation-detail/header-element";
import { RequirementTable} from "./RequirementTable"
import  RequirementService from "./RequirementService"
import Deletedailog from "./delete-dailog"
import { BiImport } from "react-icons/bi";

const CreateRequirements = () => {
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projectsInfo = { ...location.state.projectInfo };
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [showDeleteAllRequirement, setShowDeleteAllRequirement] = useState(false);
  const [openEditConfigurationBox, setOpenEditConfigurationBox] = useState(false);
  const [editData, setEditData] = useState([]);
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  
    const [isDeleteDailog, setDeleteDailog] = useState(false);
  useEffect(() => {
    console.log("Create  useEffect ");
    getRequirementWithQuery();
    getTagsType();
  },[]);


   function getRequirementWithQuery() {
    RequirementService.getRequirementWithQuery(projectsInfo._id)
      .then((res) => {
        setRequirementHeaderData([...res.data.body.featureList]);
        setShowDeleteAllRequirement(res.data.body.showDeleteAllRequirement);
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  }
  

  const openEditRequirement = (event, rowData) => {
    let row = Object.assign({},rowData) 
    if (row.Type !== null && row.Typeid !== null) {
      var Type = {
        _id: row.Typeid,
        name: row.Type,
      };
      row.Type = Type;

    }
    
    setEditData([row]);
    openFun();
  };

  const openFun = () => {
    setOpenEditConfigurationBox(true);
  };

  const closeFun = () => {
    console.log("requirementHeaderData : ",requirementHeaderData);
    setOpenEditConfigurationBox(false);

  };


  const openDeleteFun = () => {
    setDeleteDailog(true);
  };

  const closeDeleteFun = () => {
    setDeleteDailog(false);

  };


  const getTagsType = () => {
    RequirementService.getTagsType()
      .then((res) => {
        setRequirementTagArray([...res.data.body.requirementTag]);
        setRequirementTypeArray([...res.data.body.requirementType]);

      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };

  const allRequirementDelete = () => {
    setDeleteDailog(false);
    RequirementService.allRequirementDelete(projectsInfo._id)
      .then((res) => {
        console.log("get EstimationService by id error");
         getRequirementWithQuery();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };
  const deleteSelectedRecords = (selectedRecords) => {
   RequirementService.deleteSelectedRecords(projectsInfo._id,selectedRecords)
      .then((res) => {
        console.log("get EstimationService by id error");
         getRequirementWithQuery();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  }

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
     getRequirementWithQuery();
  };

  const updateAddRequirementsFun = () => {
    closeFun();
     getRequirementWithQuery();
  };
  
  const handleCheckBoxClicked = (rows) => {
    console.log("rows:-- ", rows);
  };

  return (
    <>
      {isDeleteDailog === true ? (
        <Deletedailog
          isOpen={true}
          openF={openDeleteFun}
          closeF={closeDeleteFun}
          title="Remove Requirement"
          message={"Do you want to delete all project requirements ?"}
          okAction={allRequirementDelete}
          oktitle="Ok"
          cancelTitle="Cancel"
        />
      ) : null}
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
    
          <Grid container alignItems="stretch">
            <Container>
              <Grid container>
                <Grid item className="multi-button-grid">
        <Link
              to={{
                pathname:
                  "/All-Clients/" +
                  clientInfo.clientName +
                  "/" +
                  projectsInfo.projectName +
                  "/ImportExcelRequirements",
                state: {
                  clientInfo: clientInfo,
                  projectInfo: projectsInfo,
                },
              }}
            >
              <Button style={{ marginRight: "15px" }} variant="outlined">
                <BiImport style={{ fontSize: "20px" }} />
                &nbsp; Import Requirements
              </Button>
          </Link>
        <Grid item style={{ margin: "10px" }}>
          <Button onClick={openAddRequirement} variant="outlined">
            {" "}
            <AddIcon />
            Add Requirements
          </Button>
        </Grid>

            </Grid>
          </Grid>
          </Container>
        </Grid>
      <BorderedContainer>
        <RequirementTable
          requirementHeaderData={requirementHeaderData}
          selection={showDeleteAllRequirement}
          isDeleteButton={true}
          deleteAction={ deleteSelectedRecords}
          requirementTypeArray={requirementTypeArray}
          openEditRequirement={(event, rowData, togglePanel) =>
              openEditRequirement(event, rowData)
            }
          isEditable={true}
          handleCheckBoxClicked={handleCheckBoxClicked}
          />
      </BorderedContainer>
    </>
  );
};

export default CreateRequirements;
