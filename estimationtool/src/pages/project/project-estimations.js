import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ProjectSer from "./project.service";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EstimationService from "../estimationCreation/estimation.service";
import { Box, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./project.css";
import DeleteProjectdailog from "./delete-project.dailog";

import { useHistory } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { useSelector } from "react-redux";
import UpdatedBy from "../../shared/ui-view/table/UpdatedBy";
import usePermission from "../../shared/layout/hooks/usePermissions";
import { IoFastFood } from "react-icons/io5";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import { BiShare } from "react-icons/bi";
import EditIcon from "@mui/icons-material/Edit";
import ShareEstimationDialog from "../project-details/ShareEstimationDialog";

function ProjectEstimations(props) {
  const classes = useTableStyle();
  console.log("tableData1", props);
  const roleState = useSelector((state) => state.role);
  const [tableData, setTableData] = useState();
  const [clientDeatils, setClientDeatils] = useState({});
  const [projectDeatils, setProjectDeatils] = useState();

  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [actionId, setActionId] = useState("");
  const [deleteRecordName, setDeleteRecordName] = useState("");
  const [deleteEstimationDailog, setDeleteEstimationDailog] = useState(false);
  const {
    estimationView,
    estimationCreate,
    estimationUpdate,
    estimationListing,
    estimationDelete,
  } = usePermission();

  useEffect(() => {
    setTableData([...props.tableData1]);
    setClientDeatils({ ...props.clientInfo });
    setProjectDeatils({ ...props.projectInfo });
  }, [props.tableData1]);
  console.log("tableData :XxXX  ", tableData);

  const Estlink = (augData) => {
    console.log("sssss", augData);
    if (clientDeatils && projectDeatils) {
      return (
        <Link
          to={{
            pathname:
              "/All-Clients/" +
              clientDeatils.clientName +
              "/" +
              projectDeatils.projectName +
              "/Estimation-Detail",
            state: { estId: augData._id },
          }}
        >
          {" "}
          {augData.estName}
        </Link>
      );
    }
  };

  const checkStep = (data) => {
    if (data.estStep == "3") {
      return Estlink(data);
    } else if (data.estStep == "2" || data.estStep == "1") {
      return (
        clientDeatils &&
        projectDeatils && (
          <Link
            to={{
              pathname:
                "/All-Clients/" +
                clientDeatils.clientName +
                "/" +
                projectDeatils.projectName +
                "/createEstimate",
              state: {
                estimationHeaderId: data._id,
                clientInfo: clientDeatils,
                projectInfo: projectDeatils,
                step: data.estStep,
              },
            }}
          >
            {" "}
            {data.estName}
          </Link>
        )
      );
    } else if (data.estStep == undefined) {
      return Estlink(data);
    }
  };

  const columns = [
    {
      headerName: "Estimation Name",
      field: "estName",
      width: 300,
      render: (rowData) => {
        return estimationView && !rowData.isDeleted
          ? checkStep(rowData)
          : rowData.estName;
        // <Link
        //   to={{
        //     pathname:
        //       "/All-Clients/" +
        //       clientDeatils.clientName +
        //       "/" +
        //       projectDeatils.projectName +
        //       "/Estimation-Detail",
        //     state: { estId: rowData._id },
        //   }}
        // >
        //   {" "}
        //   {rowData.estName}
        // </Link>
      },
    },
    { headerName: "Estimation Type", field: "estTypeId.estType", width: 100 },
    {
      headerName: "Estimation Description",
      field: "estDescription",
      width: 200,
    },
    { headerName: "Total Cost($)", field: "totalCost" },
    { headerName: "No of Persons", field: "manCount" },
    {
      headerName: "Last Modified By",
      field: "lastmodify",
      width: 150,
      type: "date",
      render: (dataRow) =>
        dataRow.updatedBy ? (
          <UpdatedBy
            firstName={dataRow.updatedBy.firstName}
            lastName={dataRow.updatedBy.lastName}
            updatedAt={dataRow.updatedBy.updatedAt}
          />
        ) : (
          <UpdatedBy
            firstName="Daniel"
            lastName="Neblet"
            updatedAt={dataRow.createdAt}
          />
        ),
    },
    {
      field: "action",
      type: "actions",
      headerName: "Actions",
      minWidth: 80,
      getActions: (params) => [
        <>
          <GridActionsCellItem icon={<EditIcon />} label="Delete" />

          <Box sx={{ width: "20px" }} className="estimation-detail-box" />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              openDeleteDailog(params);
            }}
          />
        </>,
      ],
    },
  ];

  const openFun = (name) => {
    setIsOpenDailog(true);
    setDeleteEstimationDailog(true);
  };

  const closeFun = () => {
    setIsOpenDailog(false);
  };

  const openCreateDailog = () => {};

  const openUpdateDailog = () => {};

  const openDeleteDailog = (params) => {
    //openFun(params)
    setEditRow({ ...params.row });
    setActionId(params.row._id);
    console.log("Row : ", params.row._id);
    setDeleteRecordName(params.row.estName);
    openFun();
  };

  const confirmDeleteEstimationFun = () => {
    EstimationService.delete(actionId)
      .then((res) => {
        props.refreshData();
        closeFun();
      })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history.push(url);
        // }
      });
  };

  let history = useHistory();

  const actionArry = (rowData) => {};
  const rowBackgroundColor = {
    true: "#eef5e9",
    false: "#fff",
  };

  const openShareFun = () => {
    setIsShareOpen(true);
  };

  const closeShareFun = () => {
    setIsShareOpen(false);
  };

  const shareEstimation = () => {};

  const handleShareClick = () => {
    openShareFun();
  };

  console.log(clientDeatils, projectDeatils, tableData);

  return (
    <div className="all-project-wrap">
      <ShareEstimationDialog
        isOpen={isShareOpen}
        openF={openShareFun}
        closeF={closeShareFun}
        title="Share Estimations"
        oktitle="Share"
        saveFun={shareEstimation}
        cancelTitle="Cancel"
      />
      {deleteEstimationDailog === true && isOpenDailog === true ? (
        <DeleteProjectdailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          editRowObj={editRow}
          name={deleteRecordName}
          title="Delete Estimation"
          message="Do you want to delete"
          category="Estimate"
          oktitle="Ok"
          saveFun={confirmDeleteEstimationFun}
          cancelTitle="Cancel"
        />
      ) : null}

      <BorderedContainer className="no-rl-margin">
        <Grid container>
          <Grid item className="multi-button-grid">
            {/* <Link
                    to={{
                      pathname:
                        "/All-Clients/" +
                        clientDetails.clientName +
                        "/" +
                        projectDetails.projectName +
                        "/ImportExcelRequirements",
                      state: {
                        clientInfo: clientDetails,
                        projectInfo: projectDetails,
                        estimationHeaderId: "",
                      },
                    }}
                  > */}
            <Button
              style={{ marginRight: "15px" }}
              variant="outlined"
              onClick={handleShareClick}
            >
              {" "}
              <BiShare style={{ fontSize: "20px" }} />
              &nbsp; Share
            </Button>
            {/* </Link> */}
          </Grid>
        </Grid>
        <div style={{ height: 400, width: "100%" }}>
          {estimationListing ? (
            <DataGrid
              className={`${classes.root} ${classes.dataGrid}`}
              rows={tableData}
              columns={columns}
              hideFooterPagination={false}
              pageSize={5}
              rowsPerPageOptions={[10, 20, 50]}
              checkboxSelection
              disableSelectionOnClick
            />
          ) : (
            ""
          )}
        </div>
      </BorderedContainer>
    </div>
  );
}

export default ProjectEstimations;
