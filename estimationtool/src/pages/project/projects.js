import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ProjectSer from "./project.service";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CreateProjectDailog from "./create-project.dailog";
import UpdateProjectDailog from "./update-project.dailog";
import DeleteProjectDailog from "./delete-project.dailog";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
// import Link from "@material-ui/core/Link";
import { useParams, Link } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./project.css";
import Snackbar from "../../shared/layout/snackbar/Snackbar";
import { useSelector } from "react-redux";
import useLoader from "../../shared/layout/hooks/useLoader";
import topNav from "../../shared/layout/topnav/topnav"

function Projects(props) {
  const roleState = useSelector((state) => state.role);
  let history = useHistory();

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
    { title: "All", value: "All" },
    { title: "Active", value: false },
    { title: "In-Active", value: true },
  ]);
  const [isOpen, setOpen] = React.useState({});

  const [projectByClient, setProjectByClient] = useState();
  const [secondProjectByClient, setSecondProjectByClient] = useState();
  const [allProjectByClient, setAllProjectByClient] = useState();
  const [loaderComponent, setLoader] = useLoader();

  const [reload, setReload] = useState("");

  useEffect(() => {
    // getClientById();
    getAllProjects(clientid);
  }, [clientid, reload]);

  const columns = [
    {
      title: "Project Name",
      field: "projectName",
      render: (rowData) => {
        return rowData.isDeleted ? (
          <>{rowData.projectName} </>
        ) : (
          <Link
            to={{
              pathname:
                "/All-Clients/" + props.clientName + "/" + rowData.projectName,
              state: { projectId: rowData.id },
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

  const getDropDownvalue = (event) => {
    console.log("this is an download vlaue", event.target.value);
    if (event.target.value == "All") {
      setProjectByClient(allProjectByClient);
    } else {
      const dropdownEl = secondProjectByClient.filter(
        (el) => el.isDeleted == event.target.value
      );
      setProjectByClient(dropdownEl);
    }
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

  const handleClose = () => {
    setOpen({});
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

  //For Rowdata background color according to active state
  const rowBackgroundColor = {
    true: "#eef5e9",
    false: "#fff",
  };

  // const getClientById = () => {
  //   setLoader(true);
  //   ProjectSer.getClientById(clientid)
  //     .then((res) => {
  //       setLoader(false);
  //       let dataResponce = res.data.body.projects;
  //       setTableData([...dataResponce]);
  //       getAllProjects(clientid);
  //     })
  //     .catch((err) => {
  //       console.log("Project error", err);
  //     });
  // };

  const getAllProjects = (clientid) => {
    setLoader(true);
    ProjectSer.getAllProject().then((res) => {
      let dataResponce = res.data.body;
      setLoader(false);
      const filteredData = dataResponce.filter((el) => el.client == clientid);
      const activeEl = filteredData.filter((el) => el.isDeleted == false);
      setProjectByClient(activeEl);
      setSecondProjectByClient([...filteredData]);
      setAllProjectByClient([...filteredData]);
    }).catch((err) => {
      if ((err.response.data = 401) || (err.response.data = 404)) {
        let url = "/login";
        history.push(url);
      }
      setOpen({
        open: true,
        severity: "error",
        message: err.response.data.message,
      });
    });;
  };

  const createProject = (projectData) => {
    setLoader(true);

    ProjectSer.createProject(projectData)
      .then((res) => {
        setLoader(false);

        // getClientById();
        setReload(!reload);
        setOpen({ open: true, severity: "success", message: res.data.message });
        closeFun();
      })
      .catch((err) => {
        if ((err.response.data = 401) || (err.response.data = 404)) {
          let url = "/login";
          history.push(url);
        }
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const updateProject = (projectData) => {
    setLoader(true);

    ProjectSer.updateProject(actionId, projectData)
      .then((res) => {
        setLoader(false);

        // getClientById();
        setReload(!reload);
        setOpen({ open: true, severity: "success", message: res.data.message });

        closeFun();
      })
      .catch((err) => {
        if ((err.response.data = 401) || (err.response.data = 404)) {
          let url = "/login";
          history.push(url);
        }
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const deleteProject = () => {
    setLoader(true);

    ProjectSer.deleteProject(actionId)
      .then((res) => {
        setLoader(false);

        // getClientById();
        setReload(!reload);
        setOpen({ open: true, severity: "success", message: res.data.message });

        closeFun();
      })
      .catch((err) => {
        if ((err.response.data = 401) || (err.response.data = 404)) {
          let url = "/login";
          history.push(url);
        }
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
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

  //console.log(projectByClient);

  const { message, severity, open } = isOpen || {};

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
        <Grid container justify="space-between">
          <Grid item>
            <FormControl>
              <InputLabel
                id="client-simple-select"
                className="select-label-width"
              >
                Project Status{" "}
              </InputLabel>

              <Select
                labelId="client-simple-select"
                className="select-label-width"
                id="client-simple-select"
                value={projectStatus.title}
                label={projectStatus.title}
                defaultValue={false}
                onChange={getDropDownvalue}
              >
                {projectStatus.map((item) => (
                  <MenuItem key={item.title} value={item.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            {!roleState.isContributor && (
              <Button variant="outlined" onClick={openCreateDailog}>
                {" "}
                <AddIcon />
                Create Project
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <BorderedContainer className="full-width no-rl-margin">
        {loaderComponent ? (
          loaderComponent
        ) : (
          <MaterialTable
            columns={columns}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            actions={
              !roleState.isContributor
                ? [
                  (rowData) => ({
                    icon: "edit",
                    tooltip: "Edit project",
                    onClick: (event, rowData) => {
                      setEditRow({ ...rowData });
                      setActionId(rowData.id);
                      openUpdateDailog();
                    },
                    disabled: rowData.isDeleted,
                  }),
                  (rowData) => ({
                    icon: "delete",
                    tooltip: "Delete project",
                    onClick: (event, rowData) => {
                      setEditRow({ ...rowData });
                      setActionId(rowData.id);
                      setDeleteRecordName(rowData.projectName);
                      openDeleteDailog();
                    },
                    disabled: rowData.isDeleted,
                  }),
                ]
                : false
            }
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
              rowStyle: (rowData) => {
                return {
                  backgroundColor:
                    rowBackgroundColor[rowData.isDeleted] ?? "#eee",
                };
              },
            }}
            data={projectByClient}
            title={`Project${props.clients.length > 1 ? "s" : ""}`}
          />
        )}
      </BorderedContainer>
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      )}
    </div>
  );
}
export default Projects;
