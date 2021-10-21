import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import "./allestimation.css";
import AllestimationSer from "./allestimation.service";
import Link from "@material-ui/core/Link";
import { fontSize, style } from "@material-ui/system";
import { createMuiTheme, Paper } from "@material-ui/core";
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
      setTableData([...tableData, ...dataResponce]);
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
        return <Link> {rowData.estName}</Link>;
      },
    },
    {
      title: "Estimation Description",
      field: "estDescription",
      render: (rowData) => {
        return <Link> {rowData.estDescription}</Link>;
      },
      width: "15%",
    },
    { title: "Estimation Type", field: "esttypeId" },
    {
      title: "Client Name",
      field: "projectId.client.clientName",
      render: (rowData) => {
        return (
          <Link href={"/clientdetails" + "/" + rowData.id}>
            {" "}
            {rowData.projectId.client.clientName}
          </Link>
        );
      },
    },
    { title: "Project Name", field: "projectId.projectName" },
    { title: "Last update", field: "updatedAt", type: "date" },
  ];
  const openfn = () => {
    setIsOpenDailog(true);
  };

  const closefn = () => {
    setIsOpenDailog(false);
  };

  return (
    <div className="wrap">
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={2} />,
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
          },
        }}
        data={tableData}
        title="Recent Estimation"
        style={{ fontSize: "0.9rem" }}
      />
    </div>
  );
}
export default Home;
