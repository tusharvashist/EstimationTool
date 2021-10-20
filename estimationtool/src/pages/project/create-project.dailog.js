import React,{useEffect} from 'react';
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
export default function CreateProjectdailog(props) {

    const[formData, setFormData] = React.useState({
        projectName:"",
        projectDescription:"",
        businessDomain:"",
    });

    const[showError, setShowError] = React.useState(false);

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

    const handelBusinessDomain =(e)=>{
        let newObject = {...formData};
        newObject.businessDomain=e.target.value
        setFormData({...newObject})
    }
     
    const   onSubmitForm = (e) => {
        console.log("e", e)
        //e && e.preventDefault();
        if(formData.projectName  && formData.businessDomain) {
            setShowError(false);
            props.saveFun(formData)

        } else {
            setShowError(true);
        }
    }

    const {projectName, projectDescription, businessDomain} = formData
    
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
        <Grid container>
            <form  onSubmit={onSubmitForm}>
              <TextField required error={showError && !projectName} autoFocus id="standard-basic" label="Project Name" className="full-width" onChange={handelProjectName}/>
              <TextField  id="standard-basic" label="Project Description" className="full-width" onChange={handelProjectDescription}/>
              <TextField required error={showError && !businessDomain} id="standard-basic" label="Business Domain" className="full-width" onChange={handelBusinessDomain}/>

            </form>
        </Grid>
    </CustomizedDialogs>
    )
}