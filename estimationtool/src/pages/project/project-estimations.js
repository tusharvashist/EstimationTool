import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ProjectSer from "./project.service";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EstimationService from "../estimationCreation/estimation.service";
import {
  Box,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./project.css";
import DeleteProjectdailog from "./delete-project.dailog";
import { useHistory } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { useSelector, useDispatch } from "react-redux";
import UpdatedBy from "../../shared/ui-view/table/UpdatedBy";
import usePermission from "../../shared/layout/hooks/usePermissions";
import useEstPermission from "../../shared/layout/hooks/useEstPermission";
import { IoFastFood } from "react-icons/io5";
import { DataGrid, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import { BiShare } from "react-icons/bi";
import EditIcon from "@mui/icons-material/Edit";
import ShareEstimationDialog from "../project-details/ShareEstimationDialog";
import { setEstHeaderId } from "../../Redux/estimationHeaderId";

import Snackbar from "../../shared/layout/snackbar/Snackbar";

function DeleteButton(props) {
  if (props.params.row.isDeleted) {
    return (
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => {
          props.openDeleteDailog(props.params);
        }}
        disabled
      />
    );
  } else {
    return (
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => {
          props.openDeleteDailog(props.params);
        }}
      />
    );
  }
}

function EditButton(props) {
    const dispatch = useDispatch();
  if (props.params.row.isDeleted) {
   return  <GridActionsCellItem icon={<EditIcon />} label="Delete" disabled />
  } else {

      return  <Link
              to={{
                pathname:
                  "/All-Clients/" +
                  props.clientDetails.clientName +
                  "/" +
                  props.projectDetails.projectName +
                  "/createEstimate",
                state: {
                  clientInfo: props.clientDetails,
                  projectInfo: props.projectDetails,
                  estimationHeaderId: props.params.row._id,
                   step: props.params.row.estStep,
                },
        }}
        
            onClick={(e) => dispatch(setEstHeaderId(props.params.row._id))}
      >
        <IconButton aria-label="edit" >
    
                  <EditIcon style={{ fontSize: "18px" }} />
          
          </IconButton>
      </Link>
  
  }
}

function ProjectEstimations(props) {
  const dispatch = useDispatch();
  const classes = useTableStyle();
  const roleState = useSelector((state) => state.role);
  const [tableData, setTableData] = useState();
  const [selectedEstimation, setSelectedEstimation] = useState([]);
  const [clientDeatils, setClientDeatils] = useState({});
  const [projectDeatils, setProjectDeatils] = useState();
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [actionId, setActionId] = useState("");
  const [deleteRecordName, setDeleteRecordName] = useState("");
  const [deleteEstimationDailog, setDeleteEstimationDailog] = useState(false);

  const [isOpen, setOpen] = React.useState({});
  const { message, severity, open } = isOpen || {};
  const {
    estimationView,
    estimationCreate,
    estimationUpdate,
    estimationListing,
    estimationDelete,
    estimation_share,
  } = usePermission();

  const {
    this_estimation_view,
    this_estimation_list,
    this_estimation_delete,
    this_estimation_share,
  } = useEstPermission();

  const finalEstPermission = {
    checkestimationView: () => {
      return this_estimation_view == undefined
        ? estimationView
        : this_estimation_view;
    },
    checkEstimationDelete: () => {
      return this_estimation_delete == undefined
        ? estimationDelete
        : this_estimation_delete;
    },
    checkEstimationShare: () => {
      return this_estimation_share == undefined
        ? estimation_share
        : this_estimation_share;
    },
  };

  const [projectStatus] = useState([
    { title: "All" },
    { title: "Active" },
    { title: "In-Active" },
  ]);

  useEffect(() => {
    setTableData([...props.tableData1]);
    setClientDeatils({ ...props.clientInfo });
    setProjectDeatils({ ...props.projectInfo });
  }, [props.tableData1]);

  console.log("tableData :XxXX  ", tableData);

  const handleClose = () => {
    setOpen(false);
  };

  // const dispatchSetEstHeaderId = (id) =>{
  //   dispatch(setEstHeaderId(id));
  // };
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
          onClick={(e) => dispatch(setEstHeaderId(augData._id))}
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
            onClick={(e) => dispatch(setEstHeaderId(data._id))}
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
      width: 370,
      renderCell: (rowData) => {
        return finalEstPermission.checkestimationView() &&
          !rowData.row.isDeleted
          ? checkStep(rowData.row)
          : rowData.estName;
      },
    },
    { headerName: "Estimation Type", field: "estType", width: 140 },
    {
      headerName: "Estimation Description",
      field: "estDescription",
      width: 170,
    },
    // { headerName: "Total Cost($)", field: "totalCost", width: 80 },
    // { headerName: "No of Persons", field: "manCount", width: 80 },
    {
      headerName: "Last Modified By",
      field: "lastmodify",
      width: 190,
      type: "date",
      renderCell: (dataRow) =>
        dataRow.row.updatedBy ? (
          <UpdatedBy
            firstName={dataRow.row.updatedBy.firstName}
            lastName={dataRow.row.updatedBy.lastName}
            updatedAt={dataRow.row.updatedBy.updatedAt}
          />
        ) : (
          <UpdatedBy
            firstName={dataRow.row.createdBy.firstName}
            lastName={dataRow.row.createdBy.lastName}
            updatedAt={dataRow.row.createdBy.updatedAt}
          />
        ),
    },
    {
      field: "action",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <>
          <Box sx={{ width: "5px" }} className="estimation-detail-box" />
          <EditButton
            params={params}
            clientDetails={clientDeatils}
            projectDetails={projectDeatils}
            estimationId={params.row._id}
            openDeleteDailog={openDeleteDailog}
            />

          <DeleteButton
            params={params}
            openDeleteDailog={openDeleteDailog}
            disabled={finalEstPermission.checkEstimationDelete()}
          />
          <Box sx={{ width: "10px" }} className="estimation-detail-box" />
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


  const openDeleteDailog = (params) => {
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

  const shareEstimation = (res) => {
    setOpen({
      open: true,
      severity: "success",
      message: res.data.message,
    });
    setIsShareOpen(false);
  };



  return (
    <div className="all-project-wrap">
      {finalEstPermission.checkEstimationShare() && (
        <ShareEstimationDialog
          isOpen={isShareOpen}
          openF={openShareFun}
          closeF={closeShareFun}
          title="Share Estimations"
          oktitle="Share"
          saveFun={shareEstimation}
          cancelTitle="Cancel"
          selectedEstimation={selectedEstimation}
        />
      )}
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
        <Grid container justify="space-between" alignItems="right">
          <Box sx={{ width: 200 }}>
            <FormControl width="300px">
              <InputLabel id="client-simple-select">
                Estimation Status{" "}
              </InputLabel>

              <Select
                labelId="client-simple-select"
                id="client-simple-select"
                value={projectStatus.title}
                label={projectStatus.title}
                defaultValue={"Active"}
                onChange={props.getDropDownvalue}
              >
                {projectStatus.map((item) => (
                  <MenuItem key={item.title} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            {finalEstPermission.checkEstimationShare() && (
              <Button
                style={{ marginRight: "15px" }}
                variant="outlined"
                onClick={() => {
                  if (selectedEstimation.length !== 0) {
                    openShareFun();
                  } else {
                    setOpen({
                      open: true,
                      severity: "error",
                      message: "Select at least one estimation to share.",
                    });
                  }
                }}
              >
                {" "}
                <BiShare style={{ fontSize: "20px" }} />
                &nbsp; Share
              </Button>
            )}
          </Box>
        </Grid>
        <Box
          sx={{ width: "5px", height: "20px" }}
          className="estimation-detail-box"
        />
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
              isRowSelectable={(params) => params.row.isDeleted === false}
              disableSelectionOnClick
              onSelectionModelChange={(rows) => {
                var selectedItem = [];
                rows.forEach((item) => {
                  console.log("onSelectionModelChange: item", item);
                  selectedItem.push(
                    ...tableData.filter((el) => el.id === item)
                  );
                });
                setSelectedEstimation(selectedItem);
              }}
            />
          ) : (
            ""
          )}
        </div>
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

export default ProjectEstimations;
