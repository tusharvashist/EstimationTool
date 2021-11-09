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

const AddRequirements = (props) => {
  const [showError] = useState(false);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [selectedRequirementTag, setSelectedRequirementTag] = useState({});
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [selectedRequirementType, setSelectedRequirementType] = useState({});
  const [isRequirementTag, setIsRequirementTag] = useState(false);
  const [requirementTitle, setrequirementTitle] = useState();
  const [requirementDescription, setrequirementDescription] = useState();
  const [editData, setEditData] = useState({});
    const[formData, setFormData] = React.useState({
        title:"",
        description: "",
        tag:"",
        type : "",
        mitigation: "",
        project: "",
        estHeader:"",
        isDeleted: false 
    });
  
  const onSubmitForm = (e) => {


    EstimationService.createRequirement(formData).then((res) => {
      props.saveFun();
      })
     .catch((err) => {
        console.log("get Client by id error", err);
      });
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
     console.log("props.editData");
     if (props.editData) {
     

      }
  }, newLocal);
  
  useEffect(() => {
        console.log("props.editData3",editData);
    if (props.editData) {
      console.log("props.editData4");
        setEditData(...props.editData);
     
       return () => {
             console.log("props.editData2",editData.Requirement);
             setrequirementTitle(editData.Requirement);
            // setrequirementDescription(props.editData[1]);
           // setSelectedRequirementTag({_id:});
        };
    }
  }, props.editData);
  
   console.log("Edit data:", editData,requirementTitle);

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
              value= {selectedRequirementTag.name}
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
            error={showError && !requirementTitle}
            
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
            error={showError}
            id="standard-basic"
            label="Description"
            className="full-width"
            value={requirementDescription}
            onChange={(e) => { handelDescription(e) }}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddRequirements;
