import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ProjectSer from "./project.service";
import { Box, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CreateProjectDailog from "./create-project.dailog";
import UpdateProjectDailog from "./update-project.dailog";
import DeleteProjectDailog from "./delete-project.dailog";
import AddIcon from "@material-ui/icons/Add";
// import Link from "@material-ui/core/Link";
import { useParams, Link } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./project.css";

function Projects(props) {
  // const { clientid } = useParams();
  const clientid = props.data;
  const [tableData, setTableData] = useState([]);
  const [clientDeatils, setClientDeatils] = useState({});
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [createProjectDailog, setCreateProjectDailog] = useState(false);
  const [editProjectDailog, setEditProjectDailog] = useState(false);
  const [deleteProjectDailog, setDeleteProjectDailog] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [actionId, setActionId] = useState("");

  const [deleteRecordName, setDeleteRecordName] = useState("");
  const [projectStatus, setProjectStatus] = useState([
    { title: "Active" },
    { title: "In-Active" },
  ]);

  useEffect(() => {
    getClientById();
  }, []);
  useEffect(() => {
    getClientById();
  }, [clientid]);
  const projectDetailsUrl =
    "/projectdetails/" + props.data + "/" + "614fefd74d9da71851f36df4";
  const columns = [
    {
      title: "Project Name",
      field: "projectName",
      render: (rowData) => {
        return (
          <Link
            to={{
              pathname:
                "/All-Clients/" + props.clientName + "/" + rowData.projectName,
              state: { projectId: rowData._id },
            }}
          >
            {" "}
            {rowData.projectName}
          </Link>
        );
      },
    },
    { title: "Project Description", field: "projectDescription" },
    { title: "Business Domain", field: "domain" },
  ];

  const openFun = () => {
    setIsOpenDailog(true);
  };

  const closeFun = () => {
    setIsOpenDailog(false);
  };
  const getDropDownvalue = (val) => {
    console.log("this is an download vlaue", val);
  };

  const openCreateDailog = () => {
    openFun();
    setEditProjectDailog(false);
    setDeleteProjectDailog(false);
    setCreateProjectDailog(true);
  };

  const openUpdateDailog = () => {
    openFun();
    setCreateProjectDailog(false);
    setDeleteProjectDailog(false);
    setEditProjectDailog(true);
  };

  const openDeleteDailog = () => {
    openFun();
    setCreateProjectDailog(false);
    setEditProjectDailog(false);
    setDeleteProjectDailog(true);
  };

  // const getAllProject = () => {
  //   ProjectSer.getAllProject()
  //     .then((res) => {
  //       let dataResponce = res.data.body;
  //     })
  //     .catch((err) => {
  //       console.log("Project error", err);
  //     });
  // };

  const getClientById = () => {
    ProjectSer.getClientById(clientid)
      .then((res) => {
        let dataResponce = res.data.body.projects;
        setTableData([...dataResponce.filter((op) => op.isDeleted === false)]);
      })
      .catch((err) => {
        console.log("Project error", err);
      });
  };

  const createProject = (projectData) => {
    ProjectSer.createProject(projectData)
      .then((res) => {
        getClientById();
        closeFun();
      })
      .catch((err) => {});
  };

  const updateProject = (projectData) => {
    ProjectSer.updateProject(actionId, projectData)
      .then((res) => {
        getClientById();
        closeFun();
      })
      .catch((err) => {});
  };

  const deleteProject = () => {
    ProjectSer.deleteProject(actionId)
      .then((res) => {
        getClientById();
        closeFun();
      })
      .catch((err) => {});
  };

  const saveCreateProjectFun = (data) => {
    let newObject = { ...data };
    newObject.client = clientid;
    createProject(newObject);
  };

  const saveUpdateProjectFun = (data) => {
    let newObject = { ...data };
    newObject.client = clientid;
    updateProject(newObject);
  };
  const confirmDeleteProjectFun = () => {
    deleteProject();
  };

  // console.log(props.clients);

  return (
    <div className="all-project-wrap">
      {createProjectDailog === true && isOpenDailog === true ? (
        <CreateProjectDailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          title="Create project"
          oktitle="Save"
          saveFun={saveCreateProjectFun}
          cancelTitle="Cancel"
        />
      ) : null}

      {editProjectDailog === true && isOpenDailog === true ? (
        <UpdateProjectDailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          editRowObj={editRow}
          title="Edit Project"
          oktitle="Save"
          saveFun={saveUpdateProjectFun}
          cancelTitle="Cancel"
        />
      ) : null}

      {deleteProjectDailog === true && isOpenDailog === true ? (
        <DeleteProjectDailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          editRowObj={editRow}
          title="Delete Project"
          name={deleteRecordName}
          message="Do you want to delete "
          category="Project"
          oktitle="Ok"
          saveFun={confirmDeleteProjectFun}
          cancelTitle="Cancel"
        />
      ) : null}
      <Box>
        <Grid container justify="flex-end">
          {/* <Dropdown title="Project name" list={projectStatus} getVal={getDropDownvalue}/> */}
          <Button variant="outlined" onClick={openCreateDailog}>
            {" "}
            <AddIcon />
            Create Project
          </Button>
        </Grid>
      </Box>
      <BorderedContainer className="full-width no-rl-margin">
        <MaterialTable
          columns={columns}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit project",
              onClick: (event, rowData) => {
                setEditRow({ ...rowData });
                setActionId(rowData._id);
                openUpdateDailog();
              },
            },
            {
              icon: "delete",
              tooltip: "Delete project",
              onClick: (event, rowData) => {
                setEditRow({ ...rowData });
                setActionId(rowData._id);
                setDeleteRecordName(rowData.projectName);
                openDeleteDailog();
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            sorting: true,
            search: false,
            filtering: false,
            pageSize: 5,
            paging: false,
            headerStyle: {
              backgroundColor: "#e5ebf7",
              fontWeight: "bold",
              fontSize: "0.9rem",
              color: "#113c91",
            },
          }}
          data={tableData}
          title={`Project${tableData.length > 1 ? "s" : ""}`}
        />
      </BorderedContainer>
    </div>
  );
}
export default Projects;
