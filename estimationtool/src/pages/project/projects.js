import MaterialTable from "material-table";
import React, { useState, useEffect  } from "react";
import ProjectSer from "./project.service";
import {Box, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dropdown from "../../shared/ui-view/dropdown/dropdown";
import { makeStyles } from '@material-ui/core/styles';
import CreateProjectDailog from "./create-project.dailog";
import UpdateProjectDailog from "./update-project.dailog";
import DeleteProjectDailog from "./delete-project.dailog";
import AddIcon from '@material-ui/icons/Add';
import "./project.css";

  const useStyles = makeStyles({
      MTableToolbar: {
          root: {
          backgroundColor:"#000"
        }
      },
  });

function Projects() {
    const [tableData,setTableData] = useState([]);
    const [isOpenDailog,setIsOpenDailog] = useState(false);
    const [createProjectDailog,setCreateProjectDailog] = useState(false);
    const [editProjectDailog,setEditProjectDailog] = useState(false);
    const [deleteProjectDailog,setDeleteProjectDailog] = useState(false);
    const [editRow,setEditRow] = useState({});
    const [actionId,setActionId] = useState("");
    const [projectStatus,setProjectStatus] = useState([
        { title: 'All'},
        { title: 'Active'},
        { title: 'In-Active'},
    ]);

    useEffect(() => {
      getAllProject()
    },[]);
    
 
    const columns = [
      { title: "Project Name", field: "projectName", sorting: false },
      { title: "Project Description", field: "projectDescription" }
    ];

    const openFun = ()=>{
      setIsOpenDailog(true)
    }
   
    const closeFun = ()=>{
      setIsOpenDailog(false)
    }
    const getDropDownvalue = (val)=>{
      console.log("this is an download vlaue", val)
    }
    
    const openCreateDailog = ()=>{
      openFun()
      setEditProjectDailog(false);
      setDeleteProjectDailog(false);
      setCreateProjectDailog(true)
    }
  
    const openUpdateDailog = ()=>{
      openFun()
      setCreateProjectDailog(false)
      setDeleteProjectDailog(false);
      setEditProjectDailog(true);
    }
  
    const openDeleteDailog = ()=>{
      openFun()
      setCreateProjectDailog(false)
      setEditProjectDailog(false);
      setDeleteProjectDailog(true);
    }

    const getAllProject = ()=>{
      ProjectSer.getAllProject().then((res)=>{
        let dataResponce = res.data.body;
        setTableData([...dataResponce])
      }).catch((err)=>{
        console.log("Project error",err)
      })
    }

    const createProject = (projectData)=>{
      ProjectSer.createProject(projectData).then((res)=>{
        getAllProject()
        closeFun()
      }).catch((err)=>{
      });
    } 

    const updateProject = (projectData)=>{
      ProjectSer.updateProject(actionId,projectData).then((res)=>{
        getAllProject()
        closeFun()
      }).catch((err)=>{
      });
    } 

    const deleteProject = ()=>{
      ProjectSer.deleteProject(actionId).then((res)=>{
        getAllProject()
        closeFun()
      }).catch((err)=>{
      });
    } 

    const saveCreateProjectFun = (data)=>{
      createProject(data)
    }

    const saveUpdateProjectFun = (data)=>{
      updateProject(data)
    }
    const confirmDeleteProjectFun = ()=>{
      deleteProject()
    }

    

  return (
    <div className="all-project-wrap">
     { createProjectDailog === true && isOpenDailog === true ?
        (<CreateProjectDailog 
          isOpen={isOpenDailog} 
          openF={openFun} 
          closeF={closeFun} 
          title="Create project" 
          oktitle="Save" 
          saveFun={saveCreateProjectFun}
          cancelTitle="Cancel"
          />):null }

      { editProjectDailog === true && isOpenDailog === true  ?
       (<UpdateProjectDailog 
        isOpen={isOpenDailog} 
          openF={openFun} 
          closeF={closeFun} 
          editRowObj={editRow} 
          title="Edit Project" 
          oktitle="Save"
          saveFun={saveUpdateProjectFun} 
          cancelTitle="Cancel"/>) 
          :null}

          { deleteProjectDailog === true && isOpenDailog === true  ? 
          (<DeleteProjectDailog 
            isOpen={isOpenDailog} 
              openF={openFun} 
              closeF={closeFun} 
              editRowObj={editRow} 
              title="Delete Project" 
              oktitle="Ok"
              saveFun={confirmDeleteProjectFun} 
              cancelTitle="Cancel"/>) : null
          }
          <Box mb={3}>
              <Grid container justify="space-between" alignItems="center">
                <Dropdown title="Project name" list={projectStatus} getVal={getDropDownvalue}/>
                <Button variant="outlined" onClick={openCreateDailog}> <AddIcon/>Create Project</Button>
              </Grid>
          </Box>
       <MaterialTable
            columns={columns}
            actions={[
                {
                icon: 'edit',
                tooltip: 'Edit project',
                onClick: (event, rowData) => {
                    setEditRow({...rowData}); 
                    setActionId(rowData.id); 
                    openUpdateDailog();}
                }, 
                {
                icon: 'delete',
                tooltip: 'Delete project',
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
            title=""
          />
    </div>
  );
}
export default Projects;
