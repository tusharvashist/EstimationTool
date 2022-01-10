import React, { useState ,useEffect,useRef} from "react";
import { Box,Button, Grid, ListItem ,Input,Container,Link,TextField} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever"
import MaterialTable from "material-table";
import AddRequirements from "./add-requirements-popup";
import { ClientProjectHeader ,EstimationHeader} from "../estimation-detail/header-element";
import { RequirementTable, RequirementTableWithFilter} from "./RequirementTable"
import  RequirementService from "./requirement.service"
import Deletedailog from "./delete-dailog"
import { MdOpenInBrowser ,MdDone} from "react-icons/md";

const ImportExcelRequirements = () => {
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projectsInfo = { ...location.state.projectInfo };
  const headerData = { ...location.state.estimationHeaderId };

  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [showDeleteAllRequirement, setShowDeleteAllRequirement] = useState(false);
  const [openEditConfigurationBox, setOpenEditConfigurationBox] = useState(false);
  const [editData, setEditData] = useState([]);
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [isDeleteDailog, setDeleteDailog] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState();
   const browseFilelabelText = "No File Selected...";
  const [browseFileLbl, setBrowseFileLbl] = useState(browseFilelabelText);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [requirementSummary, setRequirementSummary] = useState({});
 
  const inputFile = useRef(null);
  useEffect(() => {
    getTagsType();
  },[]);




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

    const updateAddRequirementsFun = () => {
    closeFun();
    
    };
  
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
  const browseFile = () => {
     setSelectedFile();
      setIsFilePicked(false);
    setSelectedFileName("");
    setBrowseFileLbl(browseFilelabelText);
    inputFile.current.click();
  };
  const handleSubmission = () => {
    if (isFilePicked) {
      RequirementService.uploadExcel(selectedFile,projectsInfo._id)
        .then((res) => {
          setRequirementHeaderData([...res.data.body.featureList]);
          //setShowDeleteAllRequirement(res.data.body.showDeleteAllRequirement);
          setRequirementSummary({ ...res.data.body.requirementSummary });
        })
        .catch((err) => {
          console.log("get EstimationService by id error", err);
       
        });
    }
  };
  
  const handleFileUpload = e => {
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
      //setImage(files[0]);
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
      {headerData.estName ? ( <EstimationHeader data={headerData} />) : null}
      <BorderedContainer>
          <Container>
          <Grid >
            <p>
              <Button onClick={getTemplate} style={{ padding: "0", "textTransform": "none" }} component={Link} to="/about" variant="d" color="primary">
                Download</Button> a template file containing the default column names that will be mapped in requirements.</p>
          </Grid>
        </Container>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container  >
          <Grid item xs={3} direction="row" justifyContent="flex-start" alignItems="center" >
            Import Requirements: 
                <input
                  style={{ display: "none" }}
                  ref={inputFile}
                  onChange={handleFileUpload}
                  type="file"
              />
            </Grid>
             <Grid item xs={6} direction="row" justifyContent="flex-start" alignItems="center" >
               <TextField
                style={{ padding: "0 10px" }}
                label={browseFileLbl}
                variant="standard"
                value={selectedFileName}
              />
              </Grid>
               <Grid item xs={3} direction="row" justifyContent="flex-start" alignItems="center" >
            <Button onClick={browseFile} variant="outlined">
              <MdOpenInBrowser style={{fontSize: "20px"}}/>
              &nbsp;
              Browse
              </Button>
              </Grid>
                <Grid item xs={12} style={{width: "100%"}}  direction="row" justifyContent="flex-end" alignItems="center" >
                 <Button onClick={handleSubmission} variant="outlined">
                    <MdDone style={{fontSize: "20px"}}/>
                     &nbsp;
                       Submit
                   </Button>
	              </Grid> 
               
        </Grid>
      </BorderedContainer>
     
      <BorderedContainer>
        <RequirementTable
          requirementHeaderData={requirementHeaderData}
          requirementSummary={requirementSummary}
          selection={false}
          requirementTypeArray={requirementTypeArray}
          openEditRequirement={(event, rowData, togglePanel) =>
              openEditRequirement(event, rowData)
            }
          isEditable={true}
          />
      </BorderedContainer>
      <Grid container justifyContent="flex-end">
        <Grid item style={{ margin: "10px" }}>
           
          <Button onClick={handleSubmission} variant="outlined">
            {" "}
            Verify and save
          </Button>
        </Grid>
	    </Grid>

    </>
  );
};

export default ImportExcelRequirements;
