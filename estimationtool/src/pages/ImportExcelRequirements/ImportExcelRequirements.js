import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Grid,
  Container,
  Link,
  TextField,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddRequirements from "./add-requirements-popup";
import {ClientProjectHeader,EstimationHeader} from "../estimation-detail/header-element";
import { RequirementTable} from "./RequirementTable";
import RequirementService from "./requirement.service";
import Deletedailog from "./delete-dailog";
import { MdOpenInBrowser, MdDone } from "react-icons/md";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const ImportExcelRequirements = () => {
  const history = useHistory();
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projectsInfo = { ...location.state.projectInfo };
  const headerData = { ...location.state.estimationHeaderId };
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [openEditConfigurationBox, setOpenEditConfigurationBox] =
    useState(false);
  const [editData, setEditData] = useState([]);
  const [isOpen, setOpen] = React.useState({});
  const [originalData, setOriginalData] = useState([]);

  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [isDeleteDailog, setDeleteDailog] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState();
  const browseFileLabelText = "No File Selected...";
  const [browseFileLbl, setBrowseFileLbl] = useState(browseFileLabelText);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isRecordSubmitted, setIsRecordSubmitted] = useState(false);
  const [requirementSummary, setRequirementSummary] = useState({});
   const [isDataAvailable, setIsDataAvailable] = useState(false);

  const inputFile = useRef(null);
  useEffect(() => {
    getTagsType();
  }, []);

  const openEditRequirement = (event, rowData) => {
    console.log(rowData);
    setEditData([rowData]);
    openFun();
  };

  const openFun = () => {
    setOpenEditConfigurationBox(true);
  };

  const closeFun = () => {
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

  const getTemplate = () => {
    setDeleteDailog(false);
    RequirementService.getTemplate(projectsInfo._id)
      .then((res) => {
        console.log("get EstimationService by id error");
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
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
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

  const updateAddRequirementsFun = (index, editedData) => {
    var updatedRequirementData = requirementHeaderData;
    var oldRecord = requirementHeaderData[index - 1];
    var tag = "";
    var type = "";
    if (editedData.tag !== 0 && editedData.tag !== undefined) {
      tag = editedData.tag;
    }

    if (editedData.type !== 0 && editedData.type !== undefined) {
      type = editedData.type;
    }

    var updatedRecord = {
      Requirement: editedData.Requirement,
      Assumption: editedData.assumption,
      Description: editedData.description,
      Error: oldRecord.Error,
      Query: editedData.query,
      Reply: editedData.reply,
      Type: type,
      Tag: tag,
      id: oldRecord.id,
    };

    updatedRequirementData[index - 1] = updatedRecord;
    setOpenEditConfigurationBox(false);
    updateData(updatedRequirementData);
  };

  const showVerifySaveButton = (list) => {
      if (list.length !== 0) {
          setIsDataAvailable(true);
        } else {
           setIsDataAvailable(false);
        }
        
  }

  const updateData = (updatedRequirementData) => {
    var payload = {
      original: originalData,
      updated: updatedRequirementData,
    };
    RequirementService.updateData(payload, projectsInfo._id)
      .then((res) => {
        setRequirementHeaderData([...res.data.body.featureList]);

        setRequirementSummary({ ...res.data.body.requirementSummary });
        showVerifySaveButton([...res.data.body.featureList]);
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };
  
  const deleteSelected = (requirementHeaderDataFilter) => {
    var requirementList = requirementHeaderData;
    requirementHeaderDataFilter.forEach((filerRequirement) => {
      requirementList.forEach((requirement) => {
        if (requirement.id === filerRequirement) {
          requirement.isDeleted = true;
        }
      });
    })
    
    updateData(requirementList);
  }
  
  const browseFile = () => {
    inputFile.current.click();
  };

  const handleSubmission = () => {
    setRequirementHeaderData([]);
          setOriginalData([]);
    setRequirementSummary({ });
    
    if (isFilePicked) {
      RequirementService.uploadExcel(selectedFile, projectsInfo._id)
        .then((res) => {
          setRequirementHeaderData([...res.data.body.featureList]);
          setOriginalData([...res.data.body.featureList]);
          setRequirementSummary({ ...res.data.body.requirementSummary });
          setIsRecordSubmitted(false);
          showVerifySaveButton([...res.data.body.featureList]);
        })
        .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
          console.log("get EstimationService by id error", err);
        });
    }
  };
  const { message, severity, open } = isOpen || {};

  const handleClose = () => { 
    setOpen(false);
  }


  const validateSave = () => {
    var headerDataId = 0;

    if (headerData.estName !== undefined) {
      headerDataId = headerData._id;
    }
    if (requirementHeaderData.length !== 0) {
      RequirementService.validateSave(
        requirementHeaderData,
        projectsInfo._id,
        headerDataId
      )
        .then((res) => {
          setRequirementHeaderData([...res.data.body.featureList]);

          setRequirementSummary({ ...res.data.body.requirementSummary });
          if (res.data.body.requirementSummary.noOfError === 0) {
            setIsRecordSubmitted(true);
          } else {
            setIsRecordSubmitted(false);
          }
          
        })
        .catch((err) => {
          console.log("get EstimationService by id error", err);
        });
    }
  };

  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;
      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
      setSelectedFile(files[0]);
      setIsFilePicked(true);
      setBrowseFileLbl("");
      setSelectedFileName(filename);
    }
  };

  console.log("RequirementSummary ====", requirementSummary);

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
      <ClientProjectHeader client={clientInfo} project={projectsInfo} />
      {headerData.estName ? <EstimationHeader data={headerData} /> : null}
      <BorderedContainer>
        <Container>
          <Grid>
            <p>
              <Button
                onClick={getTemplate}
                style={{ padding: "0", textTransform: "none" }}
                component={Link}
                to="/about"
                variant="d"
                color="primary"
              >
                Download
              </Button>{" "}
              a template file containing the default column names that will be
              mapped in requirements.
            </p>
          </Grid>
        </Container>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container className="importFormRowContainer">
          <Grid item xs={8} className="importFormRow">
            <span>Import Requirements: </span>
            <input
              style={{ display: "none" }}
              ref={inputFile}
              onChange={handleFileUpload}
              type="file"
            />
            <TextField
              className="importFormRow_input"
              label={browseFileLbl}
              variant="standard"
              value={selectedFileName}
            />
          </Grid>
          <Grid item xs={4} className="importFormRow_Button">
            <Button onClick={browseFile} variant="outlined">
              <MdOpenInBrowser style={{ fontSize: "20px" }} />
              &nbsp; Browse
            </Button>
            <Button
              disabled={selectedFileName ? false : true}
              onClick={handleSubmission}
              variant="outlined"
            >
              <MdDone style={{ fontSize: "20px" }} />
              &nbsp; Submit
            </Button>
          </Grid>
        </Grid>
      </BorderedContainer>

      <BorderedContainer>
        <RequirementTable
          requirementHeaderData={requirementHeaderData}
          requirementSummary={requirementSummary}
          deleteSelected={ deleteSelected}
          selection={true}
          requirementTypeArray={requirementTypeArray}
          openEditRequirement={(event, rowData, togglePanel) =>
            openEditRequirement(event, rowData)
          }
          isEditable={true}
        />
      </BorderedContainer>
      <Grid container justifyContent="flex-end">
        {isRecordSubmitted === false ? (
          <Grid item style={{ margin: "10px" }}>
            <Button  disabled={isDataAvailable ? false : true} onClick={validateSave} variant="outlined">
              {" "}
              Verify and save
            </Button>
          </Grid>
        ) : (
          <Grid item style={{ margin: "10px" }}>
            <Button
              onClick={() => {
                history.goBack();
              }}
              variant="outlined"
            >
              {" "}
              Done
            </Button>
          </Grid>
        )}

        {open && (
          <Snackbar
            isOpen={open}
            severity={severity}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
          />
        )}
      </Grid>
    </>
  );
};

export default ImportExcelRequirements;
