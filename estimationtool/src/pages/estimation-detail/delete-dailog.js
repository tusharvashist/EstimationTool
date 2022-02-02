import React from 'react';
import CustomizedDialogsBlank from "../../shared/ui-view/dailog/dailog-blank";
import { Grid } from "@material-ui/core";

export default function Deletedailog(props) {
    return (
        <CustomizedDialogsBlank 
            isOpen={props.isOpen} 
            openFun={props.openF} 
            closeFun={props.closeF} 
            title={props.title} 
            oktitle={props.oktitle} 
            cancelTitle={props.cancelTitle}
            saveFun={()=>{props.okAction(props.row)}}
            >
        <Grid container>
            <form  noValidate>
             {props.message} 
            </form>
        </Grid>
    </CustomizedDialogsBlank>
    )
}