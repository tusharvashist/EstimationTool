import React,{useEffect} from 'react';
import CustomizedDialogsBlank from "../../shared/ui-view/dailog/dailog-blank";
import { Grid } from "@material-ui/core";

export default function DeleteProjectdailog(props) {
    return (
        <CustomizedDialogsBlank 
            isOpen={props.isOpen} 
            openFun={props.openF} 
            closeFun={props.closeF} 
            title={props.title} 
            oktitle={props.oktitle} 
            cancelTitle={props.cancelTitle}
            saveFun={()=>{props.saveFun()}}
            >
        <Grid container>
            <form  noValidate>
             {props.message} <b>{props.name}</b>  {props.category} ?
            </form>
        </Grid>
    </CustomizedDialogsBlank>
    )
}