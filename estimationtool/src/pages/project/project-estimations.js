import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ProjectSer from "./project.service";
import EstimationService from "../estimationCreation/estimation.service";
import { Box, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./project.css";
import DeleteProjectdailog from "./delete-project.dailog";

import { useHistory } from "react-router-dom";

function ProjectEstimations(props) {
  const [tableData, setTableData] = useState();
  const [clientDeatils, setClientDeatils] = useState({});
  const [projectDeatils, setProjectDeatils] = useState();
  
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [actionId, setActionId] = useState("");
  const [deleteRecordName, setDeleteRecordName] = useState("");
  const [deleteEstimationDailog, setDeleteEstimationDailog] = useState(false);
  
  
  useEffect(() => {
    setTableData([...props.tableData1]);
    setClientDeatils({...props.clientInfo});
    setProjectDeatils({...props.projectInfo})
  }, [props.tableData1]);

   const columns = [
    {
      title: "Estimation Name",
      field: "estName",
      render: (rowData) => {
        return (
          <Link href={"/createEstimate"} estId={rowData._id}>
            {" "}
            {rowData.estName}
          </Link>
        );
      },
      sorting: false,
    },
    { title: "Estimation Type", field: "esttypeId.estType" },
    { title: "Estimation Description", field: "estDescription" },
    { title: "Total Cost($)", field: "totalCost" },
    { title: "No of Persons", field: "manCount" },
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

  const openDeleteDailog = () => {
    openFun();
  };

  const confirmDeleteEstimationFun = () => {
    console.log("Action Id :", actionId);
    EstimationService.delete(actionId).then((res) => {
      props.refreshData();
        closeFun();

    }).catch((err) => {
      
    });
  };


  let history = useHistory();

  return (
    <div className="all-project-wrap">

      {deleteEstimationDailog === true && isOpenDailog === true ? (
        <DeleteProjectdailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          editRowObj={editRow}
          name={ deleteRecordName}
          title="Delete Project"
          message="Do you want to delete"
          category="Estimate"
          oktitle="Ok"
          saveFun={confirmDeleteEstimationFun}
          cancelTitle="Cancel"
        />
      ) : null}
      <MaterialTable
        columns={columns}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Estimation",
            onClick: (event, rowData) => {
              let url = "/createEstimate";
              history.push(url);
              setEditRow({ ...rowData });
              setActionId(rowData.id);
              openUpdateDailog();
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Estimation",
            onClick: (event, rowData) => {
              setEditRow({ ...rowData });
              setActionId(rowData._id);
              console.log("Row : ",rowData._id);
              setDeleteRecordName(rowData.estName)
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
          }
        }}
        data={tableData}
        title="Estimations:"
      />
    </div>
  );
}

export default ProjectEstimations;
