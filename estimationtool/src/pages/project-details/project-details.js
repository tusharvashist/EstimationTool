import React,{useState, useEffect} from 'react';
import ProjectSer from "./project-details.service";
import {Box, Grid} from "@material-ui/core";
import ProjectEstimationsGridView from "../project/project-estimations"
import "./project-details.css";
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dropdown from "../../shared/ui-view/dropdown/dropdown";

import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

export default function ClientDetails() {
    const params = useParams();
    const projectId = params.projectid;
    const [clientDetails,setClientDetails] = useState({
        clientName:"",
        description:"",
        website:""
    });  
    const [projectDetails,setProjectDetails] = useState({
        projectName:"",
        projectDescription:"",
        businessDomain:""
    });
    const [headerData,setHeaderData] = useState({
        clientName:"",
        projectName:"",
        website:"",
        domain:""
    });  

    const [tableData, setTableData] = useState([]);
    
    useEffect(() => {
        getProjectById();
      },[]);

    const getProjectById = ()=>{
        ProjectSer.getProjectById(projectId).then((res)=>{
            let dataResponse = res.data.body;
            setProjectDetails({ ...dataResponse });
            setClientDetails({ ...dataResponse.client });
            setTableData([...dataResponse.estimates.filter(op => op.isDeleted === false)]);
        }).catch((err)=>{
          console.log("get Client by id error",err)
        })
      }

    const updateHeaderData = (clientName,projectName,website,domain) => {
        setHeaderData({
            clientName:clientName,
            projectName:projectName,
            website:website,
            domain:domain
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
            <Box  p={5}>
               <Grid container alignItems="center">
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item xs={10} sm={4}>
                                <p> <span className="title-stl"> Project Name :</span> {projectDetails.projectName}</p> 
                            </Grid>
                            <Grid item xs={10} sm={6}>
                             <p> <span className="title-stl"> Business Domain :</span> {projectDetails.domain}</p> 
                             </Grid>
                         </Grid>
                         <Grid container justify="space-between" alignItems="center"  className="block-section">
                             <p><span className="section-title"></span></p> 
                        </Grid>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item xs={10} sm={4}>
                                <p><span className="title-stl"> Client Name : </span>{clientDetails.clientName}</p>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <p><span className="title-stl"> Client Website :</span> <a target="_blank" href={clientDetails.website}>{clientDetails.website}</a> </p>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-between" alignItems="center"  className="block-section">
                             <p><span className="section-title"></span></p> 
                        </Grid>
                        <Grid container justify="space-between" alignItems="center">
                         <Dropdown defaultValue={{ title: 'Active', value: 'active' }} title="Estimation status" list={clientStatus} getVal={getDropDownvalue}/>     
                                <Link to={
                                  {
                                       pathname : "/create-estimation",
                                       clientInfo: {clientDetails},
                                       projectInfo: {projectDetails}
                                     }
                                }>
                                    <Button variant="outlined">
                                        {" "}
                                             <AddIcon />
                                             Create Estimation
                                     </Button>
                                </Link>
                        </Grid>
               </Grid>
            </Box>
            <Box p={0} pt={0}>
               <ProjectEstimationsGridView tableData1= {tableData} clientInfo= {clientDetails} projectInfo ={projectDetails}  refreshData = {getProjectById}/>
            </Box>
        </div>
    )
}
