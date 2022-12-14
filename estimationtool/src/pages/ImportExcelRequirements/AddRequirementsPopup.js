import React, { useState, useEffect } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import Snackbar from "../../shared/layout/snackbar/Snackbar";

const AddRequirementsPopup = (props) => {
  const [showError, setShowError] = React.useState(false);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [selectedRequirementTag, setSelectedRequirementTag] = useState({});
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [selectedRequirementType, setSelectedRequirementType] = useState({});
  const [requirementTitle, setrequirementTitle] = useState("");
  const [requirementDescription, setrequirementDescription] = useState("");
  const [query, setQuery] = useState("");
  const [assumption, setAssumption] = useState("");
  const [reply, setReply] = useState("");
  const [editData, setEditData] = useState([]);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    tag: "",
    type: "",
    mitigation: "",
    project: "",
    estHeader: "",
    isDeleted: false,
  });

  const [isOpen, setOpen] = React.useState({});

  useEffect(() => {
    setFormatData();
  }, [
    requirementTitle,
    requirementDescription,
    selectedRequirementTag,
    selectedRequirementType,
    reply,
    query,
    assumption
  ]);

  const onSubmitForm = (e) => {
    if (
      requirementTitle &&
      requirementDescription
    ) {
      setShowError(false);
      callAPI();
    } else {
      setShowError(true);
    }
  };

  const callAPI = () => {
    setFormatData();
    props.saveFun(editData[0].id , formData);
  };

  const setFormatData = () => {
      setFormData({
        Requirement: requirementTitle,
        description: requirementDescription,
        tag: selectedRequirementTag.name,
        type: selectedRequirementType.name,
        mitigation: "mitigation",
        project: props.project,
        estHeader: props.estHeader,
        isDeleted: false,
        query: query,
        assumption: assumption,
        reply: reply,
      });
  };

  const handelRequirement = (event) => {
    setrequirementTitle(event.target.value);
  };

  const handelDescription = (event) => {
    setrequirementDescription(event.target.value);
  };
  const handelAssumption= (event) => {
    setAssumption(event.target.value);
  };
    const handelReply= (event) => {
    setReply(event.target.value);
  };
    const handelQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleRequirementTagChange = (event) => {
    const selectedValueObj = requirementTagArray.find(
      (el) => el._id === event.target.value
    );
    setSelectedRequirementTag(selectedValueObj);
  };

  const handleRequirementTypeChange = (event) => {
    const selectedValueObj = requirementTypeArray.find(
      (el) => el._id === event.target.value
    );
    setSelectedRequirementType(selectedValueObj);
  };


  useEffect(() => {
    setRequirementTagArray([...props.requirementTagArray]);
    setRequirementTypeArray([...props.requirementTypeArray]);

    if (props.editData) {
      setEditData(props.editData);
      setrequirementTitle(props.editData[0].Requirement);
      setrequirementDescription(props.editData[0].Description);
      setQuery(props.editData[0].Query);
      setAssumption(props.editData[0].Assumption);
      setReply(props.editData[0].Reply);
      if (props.editData[0].TagId !== undefined) {
          setSelectedRequirementTag({
        _id: props.editData[0].TagId,
        name: props.editData[0].Tag,
      });
      } else {
          setSelectedRequirementTag({
        _id: 0,
        name: "",
      });
      }
      if (props.editData[0].Type !== undefined) {
      
           setSelectedRequirementType({
        _id: props.editData[0].TypeId,
        name: props.editData[0].Type,
      });
      } else {
        
        setSelectedRequirementType({
        _id: 0,
        name: "",
      });
      }
      setFormatData();
    }
  }, [
    props.requirementTagArray,
    props.requirementTypeArray,
    props.editData,
    editData,
  ]);

  const { message, severity, open } = isOpen || {};
  const handleClose = () => {
    setOpen({});
  };

  return (
    <CustomizedDialogs
      isOpen={props.isOpen}
      openFun={props.openF}
      closeFun={props.closeF}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={props.cancelTitle}
      saveFun={onSubmitForm}
    >
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="requirement-group">Tag</InputLabel>
            <Select
              labelId="requirement-tag"
              id="requirement-tag"
              value={selectedRequirementTag._id}
              onChange={(e) => {
                handleRequirementTagChange(e);
              }}
            >
              {requirementTagArray.map((item) => (
                <MenuItem name={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="requirement-type">Type</InputLabel>
            <Select
              labelId="requirement-type"
              id="requirement-type"
              value={selectedRequirementType._id}
              onChange={(e) => {
                handleRequirementTypeChange(e);
              }}
            >
              {requirementTypeArray.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            error={showError && !requirementTitle}
            id="standard-basic"
            label="Requirement"
            className="full-width"
            value={requirementTitle}
            onChange={(e) => {
              handelRequirement(e);
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={showError && !requirementDescription}
            id="standard-basic"
            label="Description"
            className="full-width"
            value={requirementDescription}
            onChange={(e) => {
              handelDescription(e);
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={showError && !query} 
            id="standard-basic"
            label="Query"
            className="full-width"
            value={query} 
            onChange={(e) => {
              handelQuery(e); 
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={showError && !assumption} 
            id="standard-basic"
            label="Assumption"
            className="full-width"
            value={assumption} 
            onChange={(e) => {
              handelAssumption(e); 
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={showError && !reply} 
            id="standard-basic"
            label="Reply"
            className="full-width"
            value={reply} 
            onChange={(e) => {
              handelReply(e); 
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      )}
    </CustomizedDialogs>
  );
};

export default AddRequirementsPopup;