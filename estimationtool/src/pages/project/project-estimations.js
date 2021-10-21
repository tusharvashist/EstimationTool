import MaterialTable from "material-table";
import React, { useState, useEffect  } from "react";
import ProjectSer from "./project.service";
import {Box, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { useParams } from 'react-router-dom';
import "./project.css";
import DeleteProjectdailog from "./delete-project.dailog";

import { useHistory } from "react-router-dom";

function ProjectEstimations(props) {
  const [tableData,setTableData] = useState();
  const [clientDeatils,setClientDeatils] = useState({});
  const [isOpenDailog,setIsOpenDailog] = useState(false);
  const [editRow,setEditRow] = useState({});
  const [actionId,setActionId] = useState("");

    const [deleteEstimationDailog,setDeleteEstimationDailog] = useState(false);
    useEffect(() => {
      setTableData([...props.tableData1]);
    },[props.tableData1]);
    
    //const projectDetailsUrl = "/projectdetails/"+"614f3c6790a42ca5a74bebf6"+"/"+"614fefd74d9da71851f36df4";
    const columns = [
      {
        title: "Estimation Name", field: "estName", render: (rowData) => {
          console.log("----Row id",rowData._id );
          return (<Link href={"/createEstimate"} estId={rowData._id} > {rowData.estName}</Link>)
        }, sorting: false
      },
      { title: "Estimation Type", field: "esttypeId.estType" },
      { title: "Estimation Description", field: "estDescription" },
      { title: "Total Cost($)", field: "totalCost" },
      { title: "No of Persons", field: "manCount" },
    ];



    const openFun = (name)=>{
      setIsOpenDailog(true)
      setEditRow(name)
      setDeleteEstimationDailog(true);
      //   setCreateClinetDailog(false)
      // setEditClinetDailog(false);
      // setDeleteClinetDailog(true);
    }
    const deleteProject = ()=>{
      // ClientSer.deleteClient(actionId).then((res)=>{
      //   getAllClient()
      //   closeFun()
      // }).catch((err)=>{
      // });
    } 
    const closeFun = ()=>{
      setIsOpenDailog(false)
    }

    
    const openCreateDailog = ()=>{

    }
  
    const openUpdateDailog = ()=>{
  
    }
  
    const openDeleteDailog = (name)=>{
      openFun(name);

    }

    const confirmDeleteEstimationFun = ()=>{
    }

    
  let history = useHistory();

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
      { deleteEstimationDailog === true && isOpenDailog === true  ? 
          (<DeleteProjectdailog 
            isOpen={isOpenDailog} 
              openF={openFun} 
              closeF={closeFun} 
              editRowObj={editRow} 
              title="Delete Project"
              message="Do you want to delete"
              category = "Estimate"
              oktitle="Ok"
              saveFun={confirmDeleteEstimationFun} 
              cancelTitle="Cancel"/>) : null
          }
       <MaterialTable
            columns={columns}
            actions={[
                {
                icon: 'edit',
                tooltip: 'Edit Estimation',
                onClick: (event, rowData) => {
                    let url = "/createEstimate";
                    history.push(url);
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
                    openDeleteDailog(rowData.estName);}
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
