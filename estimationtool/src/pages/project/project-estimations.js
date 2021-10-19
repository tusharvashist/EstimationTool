import MaterialTable from "material-table";
import React, { useState, useEffect  } from "react";
import ProjectSer from "./project.service";
import {Box, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { useParams } from 'react-router-dom';
import "./project.css";



function ProjectEstimations() {
  const [tableData,setTableData] = useState([]);
  const [clientDeatils,setClientDeatils] = useState({});
  const [isOpenDailog,setIsOpenDailog] = useState(false);
  const [editRow,setEditRow] = useState({});
  const [actionId,setActionId] = useState("");

    useEffect(() => {
      setTableData(projectEstimationData)
      getClientById();
    },[]);
    
    const projectDetailsUrl = "/projectdetails/"+"614f3c6790a42ca5a74bebf6"+"/"+"614fefd74d9da71851f36df4";
    const columns = [
      { title: "Estimation Name", field: "estimationName", render:(rowData)=>{ return (<Link > {rowData.estimationName}</Link>)} },
      { title: "Estimation Type", field: "estimationType" },
      { title: "Estimation Description", field: "estimationDesc" },
      { title: "Total Cost($)", field: "cost" },
      { title: "No of Persons", field: "noOfPerson" },
    ];

    const projectEstimationData = [
      { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "lorem ipsom..description", estimationType: 'ROM', cost: '10000', noOfPerson: '5'},
      { estimation_id: '2', estimationName: 'Phase2', estimationDesc: "dummy..description", estimationType: 'SWAG', cost: '100000' , noOfPerson: '8' },
      { estimation_id: '3', estimationName: 'Phase3', estimationDesc: "sample..description", estimationType: 'FIX', cost: '50000' , noOfPerson: '6'},
      { estimation_id: '4', estimationName: 'Phase4', estimationDesc: "description", estimationType: 'ROM', cost: '80000' , noOfPerson: '7'},
    
  ]

    const openFun = ()=>{
      setIsOpenDailog(true)
    }
   
    const closeFun = ()=>{
      setIsOpenDailog(false)
    }

    
    const openCreateDailog = ()=>{

    }
  
    const openUpdateDailog = ()=>{
  
    }
  
    const openDeleteDailog = ()=>{
    
    }


    
    const getClientById = ()=>{
      ProjectSer.getClientById().then((res)=>{
        let dataResponce = res.data.body;
        setClientDeatils([...dataResponce])
        
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", clientDeatils)
      }).catch((err)=>{
        console.log("Project error",err)
      })
    }


    const confirmDeleteEstimationFun = ()=>{
    }

    

  return (
    <div className="all-project-wrap">
          <Box mb={3}>
              <Grid container justify="flex-end" >
                <Button variant="outlined" onClick={openCreateDailog}> <AddIcon/>Create Estimation</Button>
              </Grid>
              <Grid container justify="flex-start">
                    <p><span className="title-stl"> Estimations : </span></p>
              </Grid>
              
          </Box>
       <MaterialTable
            columns={columns}
            actions={[
                {
                icon: 'edit',
                tooltip: 'Edit Estimation',
                onClick: (event, rowData) => {
                    setEditRow({...rowData}); 
                    setActionId(rowData.id); 
                    openUpdateDailog();}
                }, 
                {
                icon: 'delete',
                tooltip: 'Delete Estimation',
                onClick: (event, rowData) => {
                    setEditRow({...rowData}); 
                    setActionId(rowData.id); 
                    openDeleteDailog();}
                }
              
            ]}
            options={{
                actionsColumnIndex:-1,
                sorting: true,
                search: false,
                filtering: false,
                pageSize:5,
                paging: false,
            }}
            data={tableData}
            title="Estimations:"
          />
    </div>
  );
}
export default ProjectEstimations;
