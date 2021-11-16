import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import EstimationService from "./estimation.service";

import Snackbar from "../../shared/layout/snackbar/Snackbar";

const AddRequirements = (props) => {
  const [showError, setShowError] = React.useState(false);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [selectedRequirementTag, setSelectedRequirementTag] = useState({});
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [selectedRequirementType, setSelectedRequirementType] = useState({});
  const [isRequirementTag, setIsRequirementTag] = useState(false);
  const [requirementTitle, setrequirementTitle] = useState("");
  const [requirementDescription, setrequirementDescription] = useState("");
  const [editData, setEditData] = useState([]);
  const [id, setId] = useState("");
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
    setFormdata();
  }, [
    requirementTitle,
    requirementDescription,
    selectedRequirementTag,
    selectedRequirementType,
  ]);

  const onSubmitForm = (e) => {
    if (
      requirementTitle &&
      requirementDescription &&
      selectedRequirementType &&
      selectedRequirementTag
    ) {
      setShowError(false);
      callAPI();
    } else {
      setShowError(true);
    }
  };

  const callAPI = () => {
    setFormdata();
    if (props.editData) {
      EstimationService.updateRequirement(id, formData)
        .then((res) => {
          props.saveFun();
          // setOpen({ open: true, severity: "success", message: res.data.message });
        })
        .catch((err) => {
          console.log("get updateRequirement by id error", err);
          if ((err.response.data = 401) || (err.response.data = 404)) {
            let url = "/login";
            history.push(url);
          }
          setOpen({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        });
    } else {
      EstimationService.createRequirement(formData)
        .then((res) => {
          props.saveFun();
          // setOpen({ open: true, severity: "success", message: res.data.message });
        })
        .catch((err) => {
          console.log("get createRequirement by id error", err);
          if ((err.response.data = 401) || (err.response.data = 404)) {
            let url = "/login";
            history.push(url);
          }
          setOpen({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        });
    }
  };

  const setFormdata = () => {
    setFormData({
      title: requirementTitle,
      description: requirementDescription,
      tag: selectedRequirementTag._id,
      type: selectedRequirementType._id,
      mitigation: "mitigation",
      project: props.project,
      estHeader: props.estHeader,
      isDeleted: false,
    });
  };
  const handelRequirement = (event) => {
    setrequirementTitle(event.target.value);
  };

  const handelDescription = (event) => {
    setrequirementDescription(event.target.value);
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

  const newLocal = [props.requirementTagArray, props.requirementTypeArray];

  useEffect(() => {
    setRequirementTagArray([...props.requirementTagArray]);
    setRequirementTypeArray([...props.requirementTypeArray]);
    console.log("props.editData0", props.editData);
    if (props.editData) {
      setEditData(props.editData);
      setrequirementTitle(props.editData[0].Requirement);
      setrequirementDescription(props.editData[0].Description);
      setSelectedRequirementTag({
        _id: props.editData[0].Tagid,
        name: props.editData[0].Tag,
      });
      setSelectedRequirementType(props.editData[0].Type);
      setId(props.editData[0].requirementId);
      setFormdata();
    }
  }, [
    props.requirementTagArray,
    props.requirementTypeArray,
    props.editData,
    editData,
  ]);

  console.log(
    "Edit data ----- :",
    editData,
    "selectedRequirementTag: ",
    selectedRequirementTag,
    "selectedRequirementType : ",
    selectedRequirementType
  );

  const { message, severity, open } = isOpen || {};
  const handleClose = () => {
    setOpen({});
  };
  console.log(requirementTypeArray);
  console.log(requirementTagArray);
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
              required
              error={showError && !selectedRequirementTag.name}
              labelId="requirement-tag"
              id="requirement-tag"
              value={selectedRequirementTag._id}
              // defaultValue={props.editData[0].Tag}
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
              required
              error={showError && !selectedRequirementType.name}
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

export default AddRequirements;
