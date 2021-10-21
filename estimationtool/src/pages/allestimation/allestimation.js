import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import "./allestimation.css";
import AllestimationSer from "./allestimation.service";
import Link from "@material-ui/core/Link";
import { fontSize, style } from "@material-ui/system";
import { createMuiTheme } from "@material-ui/core";
function Home() {
  const [tableData, setTableData] = useState([]);
  const [editRow, setEditRow] = useState({});
  useEffect(() => {
    AllestimationSer.getAllEstimation()
      .then((res) => {
        let dataResponce = res.data.body;
        setTableData([...tableData, ...dataResponce]);
      })
      .catch((err) => {
        console.log("estimation error", err);
      });
  }, []);
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const clientDetailsUrl = "/clientdetails/" + "614f3c6790a42ca5a74bebf6";
  //const projectDetailsUrl = "/projectdetails/"+"614f3c6790a42ca5a74bebf6"+"/"+"614fefd74d9da71851f36df4";
  // render:(rowData)=>{ return (<Link  href={projectDetailsUrl}> { rowData.projectName}</Link>)}
  const columns = [
    {
      title: "Estimation Name",
      field: "estimationName",
      sorting: false,
    },
    {
      title: "Estimation Description",
      field: "estimationDescription",
      width: "15%",
    },
    {
      title: "Estimation Type",
      field: "estimationType",
    },
    {
      title: "Client Name",
      field: "clientName",
      render: (rowData) => {
        return (
          <Link href={"/clientdetails" + "/" + rowData.id}>
            {" "}
            {rowData.clientName}
          </Link>
        );
      },
    },
    {
      title: "Project Name",
      field: "projectName",
    },
    {
      title: "Last update",
      field: "lastupdate",
      type: "date",
    },
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
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
          search: false,
          filtering: false,
          pageSize: 5,
          paging: false,
          headerStyle: {
            backgroundColor: "#1d1660",
            color: "#fff",
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
