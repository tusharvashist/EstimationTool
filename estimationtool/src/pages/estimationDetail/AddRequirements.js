import React, { useState,useEffect,useRef ,useImperativeHandle} from "react";
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
  const [showError] = useState(false);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [selectedRequirementTag, setSelectedRequirementTag] = useState({});
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [selectedRequirementType, setSelectedRequirementType] = useState({});
  const [isRequirementTag, setIsRequirementTag] = useState(false);
  const [requirementTitle, setrequirementTitle] = useState('');
  const [requirementDescription, setrequirementDescription] = useState('');
  const [editData, setEditData] = useState([]);
  const [id, setId] = useState("");
  const [formData, setFormData] = React.useState({
        title:"",
        description: "",
        tag:"",
        type : "",
        mitigation: "",
        project: "",
        estHeader:"",
        isDeleted: false 
    });
  
  const [isOpen, setOpen] = React.useState({});
  const onSubmitForm = (e) => {
    if (props.editData) {
      EstimationService.updateRequirement(id,formData).then((res) => {
        props.saveFun();
        // setOpen({ open: true, severity: "success", message: res.data.message });

      })
     .catch((err) => {
       console.log("get updateRequirement by id error", err);
        setOpen({ open: true, severity: "error", message: err.response.data.message  });
     });
    } else {
      EstimationService.createRequirement(formData).then((res) => {
        props.saveFun();
        // setOpen({ open: true, severity: "success", message: res.data.message });
      })
     .catch((err) => {
       console.log("get createRequirement by id error", err);
        setOpen({ open: true, severity: "error", message: err.response.data.message });
     });
    }
  };


  const setFormdata  = () => {
    setFormData({
        title: requirementTitle,
        description: requirementDescription,
        tag: selectedRequirementTag._id,
        type: selectedRequirementType._id,
        mitigation: "mitigation",
        project: props.project,
        estHeader:props.estHeader,
        isDeleted: false 
    });
}
  const handelRequirement = (event) => {
    setrequirementTitle(event.target.value);
    setFormdata();
  };

  const handelDescription = (event) => {
    setrequirementDescription(event.target.value);
    setFormdata();
  };
   const handleRequirementTagChange = (event) => {
  
     setSelectedRequirementTag(event.target.value);
     setFormdata();
  };
  const handleRequirementTypeChange = (event) => {
    setSelectedRequirementType(event.target.value);
    setFormdata();
  };

  
  const newLocal = [props.requirementTagArray, props.requirementTypeArray];
   useEffect(() => {
    setRequirementTagArray([...props.requirementTagArray]);
     setRequirementTypeArray([...props.requirementTypeArray]);
     console.log("props.editData0",props.editData);
     if (props.editData) {
       setEditData(props.editData);
       setrequirementTitle(props.editData[0].Requirement);
       setrequirementDescription(props.editData[0].Description);
       setSelectedRequirementTag({ _id: props.editData[0].Tagid, name: props.editData[0].Tag });
       setSelectedRequirementType(props.editData[0].Type);
       setId(props.editData[0].requirementId);
       setFormdata();
      }
  }, [props.requirementTagArray, props.requirementTypeArray, props.editData, editData]);
  
  console.log("Edit data ----- :", editData,
    "selectedRequirementTag: ", selectedRequirementTag.name,
   "selectedRequirementType : ", selectedRequirementType.name);

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
              value={selectedRequirementTag.name}
              defaultValue={selectedRequirementTag.name}
              onChange={(e) => { handleRequirementTagChange(e) }}
              error={isRequirementTag}
            >
               {requirementTagArray.map((item) => (
                 <MenuItem name={item._id}  value={item}  >
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
              defaultValue={selectedRequirementType.name}
              value={ selectedRequirementType.name}
              onChange={(e) => { handleRequirementTypeChange(e) }}
            >
              {requirementTypeArray.map((item) => (
                       <MenuItem key={item._id}  value={item}>
                        {item.name} 
                     </MenuItem>  
                  ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            
            id="standard-basic"
            label="Requirement"
            className="full-width"
            value={requirementTitle}
            onChange={(e) => { handelRequirement(e) }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
           
            id="standard-basic"
            label="Description"
            className="full-width"
            value={requirementDescription}
            onChange={(e) => { handelDescription(e) }}
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
