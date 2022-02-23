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
  MenuItem} from "@material-ui/core";
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

function DeleteButton(props) {
  if (props.params.row.isDeleted){
    return (
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => { props.openDeleteDailog(props.params) }}
        disabled
      />

    );
  }else {
    return (
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => { props.openDeleteDailog(props.params) }}
      />
    );
}
}

function EditButton(props) {
  if (props.params.row.isDeleted){
    return (
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Delete"
        disabled
      />
    );
  }else {
    return (
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Delete"
      />
    );
  }
}

function ProjectEstimations(props) {
  const classes = useTableStyle();
  const roleState = useSelector((state) => state.role);
  const [tableData, setTableData] = useState();
  const [selectedEstimation, setSelectedEstimation] = useState();
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
      renderCell: (rowData) => {
        return estimationView && !rowData.row.isDeleted
          ? checkStep(rowData.row)
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
    { headerName: "Estimation Type", field: "estType" , width: 100},
    { headerName: "Estimation Description", field: "estDescription" ,width: 200},
    { headerName: "Total Cost($)", field: "totalCost" },
    { headerName: "No of Persons", field: "manCount" },
    {
      headerName: "Last Modified By",
      field: "lastmodify",
      width: 150,
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
            firstName=""
            lastName=""
            updatedAt={dataRow.row.createdAt}
          />
        ),
    }, {
            field: "action",
            type: "actions",
            headerName: "Actions",
            minWidth: 80,
            getActions: (params) => [
              <>
                
                 <Box sx={{ width: "5px" }} className="estimation-detail-box" />
                 {/* <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Delete"
                /> */}
                 <EditButton params={params} openDeleteDailog={ openDeleteDailog}/>
                
                <Box sx={{ width: "5px" }} className="estimation-detail-box" />
                
                <DeleteButton params={params} openDeleteDailog={ openDeleteDailog}/>
               {/* <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => { openDeleteDailog(params) }}
                  
                /> */}
                 <Box sx={{ width: "5px" }} className="estimation-detail-box" />
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
        selectedEstimation={ selectedEstimation}
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
          <Box >
            <Button
                        style={{ marginRight: "15px" }}
              variant="outlined"
               onClick={() => { openShareFun() }}
                      >
                        {" "}
                        <BiShare style={{ fontSize: "20px" }} />
                        &nbsp; Share
            </Button>
            </Box>
      
        </Grid>
         <Box sx={{ width: "5px", height:"20px" }} className="estimation-detail-box" />
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
            onSelectionModelChange={(rows) => {
              console.log("onSelectionModelChange: ", rows);
              setSelectedEstimation(rows);
            }}
          />
        ) : (
          ""
        )
        }
     </div>
      </BorderedContainer>
    </div>
  );
}

export default ProjectEstimations;