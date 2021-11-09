import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import "./allestimation.css";
import AllestimationSer from "./allestimation.service";
import { Link } from "react-router-dom";
import { fontSize, style } from "@material-ui/system";
import { createMuiTheme, Paper } from "@material-ui/core";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";

function Home() {
  const [tableData, setTableData] = useState([]);
  const [editRow, setEditRow] = useState({});
  useEffect(() => {
    AllestimationSer.getAllEstimation().then((res) => {
      let dataResponce = res.data.body;
      if (tableData.length !== 0) {
        if (tableData.id == dataResponce.id) {
          return;
        }
      }
      // console.log("dataResponce", res.data.body);
      setTableData([...dataResponce]);
    });
  }, []);

  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const clientDetailsUrl = "/clientdetails/" + "614f3c6790a42ca5a74bebf6";
  //const projectDetailsUrl = "/projectdetails/"+"614f3c6790a42ca5a74bebf6"+"/"+"614fefd74d9da71851f36df4";
  // render:(rowData)=>{ return (<Link  href={projectDetailsUrl}> { rowData.projectName}</Link>)}

  const columns = [
    {
      title: "Estimation Name",
      field: "estName",
      sorting: false,
      render: (rowData) => {
        // console.log(rowData);
        return (
          <Link
            to={{
              pathname:
                "/All-Clients/" +
                rowData.projectId.client.clientName +
                "/" +
                rowData.projectId.projectName +
                "/Estimation-Detail",
              state: { estId: rowData.id },
            }}
          >
            {" "}
            {rowData.estName}
          </Link>
        );
      },
    },
    {
      title: "Estimation Description",
      field: "estDescription",
      render: (rowData) => {
        return (
          <Link
            to={{
              pathname:
                "/All-Clients/" +
                rowData.projectId.client.clientName +
                "/" +
                rowData.projectId.projectName +
                "/Estimation-Detail",
              state: { stIde: rowData.id },
            }}
          >
            {" "}
            {rowData.estDescription}
          </Link>
        );
      },
      width: "15%",
    },
    { title: "Estimation Type", field: "estTypeId.estType" },
    {
      title: "Client Name",
      field: "projectId.client.clientName",
      render: (rowData) => {
        //console.log(rowData);
        return (
          <Link
            to={{
              pathname:
                "/All-Clients" + "/" + rowData.projectId.client.clientName,
            }}
          >
            {" "}
            {rowData.projectId.client.clientName}
          </Link>
        );
      },
    },
    {
      title: "Project Name",
      field: "projectId.projectName",
      render: (rowData) => {
        console.log(rowData);
        return (
          <Link
            to={{
              pathname:
                "/All-Clients/" +
                rowData.projectId.client.clientName +
                "/" +
                rowData.projectId.projectName,
              state: { projectId: rowData.projectId.id },
            }}
          >
            {" "}
            {rowData.projectId.projectName}
          </Link>
        );
      },
    },
    { title: "Last update", field: "updatedAt", type: "date" },
  ]; //
  const openfn = () => {
    setIsOpenDailog(true);
  };

  const closefn = () => {
    setIsOpenDailog(false);
  };

  return (
    <BorderedContainer>
      <MaterialTable
        elevation={0}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        columns={columns}
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
        title={`Recent Estimation${tableData.length > 1 ? "s" : ""}`}
        style={{ fontSize: "0.9rem" }}
      />
    </BorderedContainer>
  );
}
export default Home;
