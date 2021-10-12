import React,{useState, useEffect} from 'react';
import ProjectSer from "./project-details.service";
import {Box, Grid} from "@material-ui/core";
import ProjectView from "../project/projects"
import "./project-details.css";

export default function ClientDetails() {
    const [clientDetails,setclientDetails] = useState({
        clientName:"",
        description:"",
        website:""
    });  
    
    const [projectDetails,setProjectDetails] = useState({
        projectName:"",
        projectDescription:""
    });  
    useEffect(() => {
        getClientById()
        getProjectById();
      },[]);


   

    const getClientById = ()=>{
        ProjectSer.getClientById().then((res)=>{
            let dataResponce = res.data.body;
            setclientDetails({...dataResponce})
        }).catch((err)=>{
          console.log("get Client by id error",err)
        })
      }
    const getProjectById = ()=>{
        ProjectSer.getProjectById().then((res)=>{
            let dataResponce = res.data.body;
            setProjectDetails({...dataResponce})
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", projectDetails)
        }).catch((err)=>{
          console.log("get Client by id error",err)
        })
      }
 
    const [clientStatus,setClientStatus] = useState([
        { title: 'All'},
        { title: 'Active'},
        { title: 'In-Active'},
    ]);
    const getDropDownvalue = (val)=>{
        console.log("this is an download vlaue", val)
      }

    return (
        <div className="client-deatils-wrp">                 
            <Box  p={3}>
               <Grid container alignItems="center">
                        <Grid container justify="space-between" alignItems="center" className="block-section">
                            <p className="section-title"> <span className="title-stl">Client Deatils</span></p> 
                        </Grid>
                        <Grid container justify="space-between" alignItems="center">
                            <p><span className="title-stl"> Client Name : </span>{clientDetails.clientName}</p>
                            <p><span className="title-stl"> Website :</span> <a target="_blank" href={clientDetails.website}>{clientDetails.website}</a> </p>
                        </Grid>

                      
                        <Grid container justify="space-between" alignItems="center"  className="block-section">
                         <p><span className="section-title">Project Deatils</span></p> 
                        </Grid>
                    <Grid container justify="space-between" alignItems="center">
                        <p> <span className="title-stl">Description :</span> {projectDetails.projectName}</p> 
                        <p> <span className="title-stl">Description :</span> {projectDetails.projectDescription}</p> 
                    </Grid>
               </Grid>
            </Box>
            <Box p={3} pt={0}>
               <ProjectView/>
            </Box>
        </div>
    )
}
