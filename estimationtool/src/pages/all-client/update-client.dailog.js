import React,{useEffect} from 'react';
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
export default function UpdateClientdailog(props) {

    const[formData, setFormData] = React.useState({
        clientName:props.editRowObj.clientName,
        description:props.editRowObj.description,
        website:props.editRowObj.website,
    });

    const handelClientName=(e)=>{
            let newObject = {...formData};
            newObject.clientName= e.target.value
            setFormData({...newObject})
    }

    const handelDescription=(e)=>{
        let newObject = {...formData};
        newObject.description=e.target.value
        setFormData({...newObject})
    }

    const handelWebsite=(e)=>{
            let newObject = {...formData};
            newObject.website=e.target.value
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
              <TextField autoFocus id="standard-basic" label="Client Name" className="full-width" value={formData.clientName} onChange={handelClientName}/>
              <TextField id="standard-basic" label="Description" className="full-width" value={formData.description} onChange={handelDescription}/>
              <TextField id="standard-basic" label="Website" className="full-width" value={formData.website} onChange={handelWebsite}/>
            </form>
        </Grid>
    </CustomizedDialogs>
    )
}