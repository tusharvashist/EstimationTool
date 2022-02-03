import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ProjectSer from "./project.service";
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

function ProjectEstimations(props) {
  const roleState = useSelector((state) => state.role);
  const [tableData, setTableData] = useState();
  const [clientDeatils, setClientDeatils] = useState({});
  const [projectDeatils, setProjectDeatils] = useState();

  const [isOpenDailog, setIsOpenDailog] = useState(false);
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
  console.log(tableData);

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
      title: "Estimation Name",
      field: "estName",
      render: (rowData) => {
        return estimationView ? checkStep(rowData) : rowData.estName;
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
    { title: "Estimation Type", field: "estTypeId.estType" },
    { title: "Estimation Description", field: "estDescription" },
    { title: "Total Cost($)", field: "totalCost" },
    { title: "No of Persons", field: "manCount" },

    {
      title: "Last Modified By",
      field: "lastmodify",
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

  console.log(clientDeatils, projectDeatils, tableData);

  return (
    <div className="all-project-wrap">
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
        {estimationListing ? (
          <MaterialTable
            columns={columns}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            actions={[
              (rowData) => ({
                icon: "edit",
                tooltip: "Edit Estimation",
                onClick: (event, rowData) => {
                  console.log(event);
                  const el = event.nativeEvent.path[5].childNodes[0].firstChild;
                  el.click();
                  // let url = "/Estimation-Detail";
                  // history.push(url);
                  // setEditRow({ ...rowData });
                  // setActionId(rowData.id);
                  // openUpdateDailog();
                },
                disabled: rowData.isDeleted,
              }),
              (rowData) => ({
                icon: "delete",
                tooltip: "Delete Estimation",
                onClick: (event, rowData) => {
                  setEditRow({ ...rowData });
                  setActionId(rowData._id);
                  console.log("Row : ", rowData._id);
                  setDeleteRecordName(rowData.estName);
                  openDeleteDailog();
                },
                disabled: rowData.isDeleted,
                hidden: !estimationDelete,
              }),
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
              },
              rowStyle: (rowData) => {
                return {
                  backgroundColor:
                    rowBackgroundColor[rowData.isDeleted] ?? "#eee",
                };
              },
            }}
            data={tableData}
            title="Estimations:"
          />
        ) : (
          ""
        )}
      </BorderedContainer>
    </div>
  );
}

export default ProjectEstimations;
