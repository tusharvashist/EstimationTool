import MaterialTable from "material-table";
import React, { useState, useEffect  } from "react";
import ProjectSer from "./project.service";
import {Box, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CreateProjectDailog from "./create-project.dailog";
import UpdateProjectDailog from "./update-project.dailog";
import DeleteProjectDailog from "./delete-project.dailog";
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { useParams } from 'react-router-dom';
import "./project.css";



function Projects(props) {
  const { clientid } = useParams();
  const { projectid } = useParams();
  const [tableData,setTableData] = useState([]);
  const [clientDeatils,setClientDeatils] = useState({});
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
      getAllProject();
      getClientById();
    },[]);
    console.log("&&&&&&&&"+ props.data)
    const projectDetailsUrl = "/projectdetails/" + props.data + "/" + "614fefd74d9da71851f36df4";
    const columns = [
      { title: "Project Name", field: "projectName", render:(rowData)=>{ return (<Link  href={"/projectdetails/" + props.data + "/" + rowData.id}> {rowData.projectName}</Link>)} },
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
    
    const getClientById = ()=>{
      ProjectSer.getClientById(clientid).then((res)=>{
        let dataResponce = res.data.body;
        setClientDeatils([...dataResponce])
        
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", JSON.stringify(clientDeatils))
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
      let newObject = {...data};
      newObject.client = clientid;
      createProject(newObject)
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
              message="Do you want to delete "
              category = "Project"
              oktitle="Ok"
              saveFun={confirmDeleteProjectFun} 
              cancelTitle="Cancel"/>) : null
          }
          <Box mb={1}>
              <Grid container justify="flex-end" >
                {/* <Dropdown title="Project name" list={projectStatus} getVal={getDropDownvalue}/> */}
                <Button variant="outlined" onClick={openCreateDailog}> <AddIcon/>Create Project</Button>
              </Grid>
              <Grid container justify="flex-start">
                    <p><span className="title-stl"> Projects : </span></p>
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
