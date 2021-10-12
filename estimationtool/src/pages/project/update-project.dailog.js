import React from 'react';
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
export default function UpdateProjectDailog(props) {

    const[formData, setFormData] = React.useState({
        projectName:props.editRowObj.projectName,
        projectDescription:props.editRowObj.projectDescription
    });

    const handelProjectName=(e)=>{
            let newObject = {...formData};
            newObject.projectName= e.target.value
            setFormData({...newObject})
    }

    const handelProjectDescription=(e)=>{
        let newObject = {...formData};
        newObject.projectDescription=e.target.value
        setFormData({...newObject})
    }  
   
    return (
        <CustomizedDialogs 
            isOpen={props.isOpen} 
            openFun={props.openF} 
            closeFun={props.closeF} 
            title={props.title} 
            oktitle={props.oktitle} 
            cancelTitle={props.cancelTitle}
            saveFun={()=>{props.saveFun(formData)}}
            >
        <Grid container>
            <form  noValidate>
              <TextField autoFocus id="standard-basic" label="Project Name" className="full-width" value={formData.projectName} onChange={handelProjectName}/>
              <TextField id="standard-basic" label="Project Description" className="full-width" value={formData.projectDescription} onChange={handelProjectDescription}/>
            </form>
        </Grid>
    </CustomizedDialogs>
    )
}