import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import "./allestimation.css";
import AllestimationSer from "./allestimation.service";
import { Link } from "react-router-dom";
import { fontSize, style } from "@material-ui/system";
import { createMuiTheme, Paper } from "@material-ui/core";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import useLoader from "../../shared/layout/hooks/useLoader";
import { useHistory } from "react-router-dom";
import usePermission from "../../shared/layout/hooks/usePermissions";
function Home() {
  const [tableData, setTableData] = useState([]);
  const [editRow, setEditRow] = useState({});
  const [loaderComponent, setLoader] = useLoader();
  const {clientView, projectView, estimationView} = usePermission();
  let history = useHistory();

  useEffect(() => {
    setLoader(true);
    AllestimationSer.getAllEstimation().then((res) => {
      setLoader(false);
      let dataResponce = res.data.body;
      if (tableData.length !== 0) {
        if (tableData.id == dataResponce.id) {
          return;
        }
      }
      // console.log("dataResponce", res.data.body);
      setTableData([...dataResponce]);
    }

    ).catch((err) => {
      // if (err.response.data = 401) {

      //   let url = "/login";
      //   history.push(url);
      // }

    });
  }, []);

  console.log(tableData);

  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const clientDetailsUrl = "/clientdetails/" + "614f3c6790a42ca5a74bebf6";
  //const projectDetailsUrl = "/projectdetails/"+"614f3c6790a42ca5a74bebf6"+"/"+"614fefd74d9da71851f36df4";
  // render:(rowData)=>{ return (<Link  href={projectDetailsUrl}> { rowData.projectName}</Link>)}

  const checkStep = (data) => {
    if (data.estStep == "3") {
      return (
        <Link
          to={{
            pathname:
              "/All-Clients/" +
              data.projectId.client.clientName +
              "/" +
              data.projectId.projectName +
              "/Estimation-Detail",
            state: { estId: data.id },
          }}
        >
          {" "}
          {data.estName}
        </Link>
      );
    } else if (data.estStep == "2" || data.estStep == "1") {
      return (
        <Link
          to={{
            pathname:
              "/All-Clients/" +
              data.projectId.client.clientName +
              "/" +
              data.projectId.projectName +
              "/createEstimate",
            state: {
              estimationHeaderId: data.id,
              clientInfo: data.projectId.client,
              projectInfo: data.projectId,
              step: data.estStep,
            },
          }}
        >
          {" "}
          {data.estName}
        </Link>
      );
    } else if (data.estStep == undefined) {
      return (
        <Link
          to={{
            pathname:
              "/All-Clients/" +
              data.projectId.client.clientName +
              "/" +
              data.projectId.projectName +
              "/Estimation-Detail",
            state: {
              estId: data.id,
            },
          }}
        >
          {" "}
          {data.estName}
        </Link>
      );
    }
  };

  const checkStepDes = (data) => {
    if (data.estStep == "3") {
      return (
        <Link
          to={{
            pathname:
              "/All-Clients/" +
              data.projectId.client.clientName +
              "/" +
              data.projectId.projectName +
              "/Estimation-Detail",
            state: { estId: data.id },
          }}
        >
          {" "}
          {data.estDescription}
        </Link>
      );
    } else if (data.estStep == "2" || data.estStep == "1") {
      return (
        <Link
          to={{
            pathname:
              "/All-Clients/" +
              data.projectId.client.clientName +
              "/" +
              data.projectId.projectName +
              "/createEstimate",
            state: {
              estimationHeaderId: data.id,
              clientInfo: data.projectId.client,
              projectInfo: data.projectId,
              step: data.estStep,
            },
          }}
        >
          {" "}
          {data.estDescription}
        </Link>
      );
    } else if (data.estStep == undefined) {
      return (
        <Link
          to={{
            pathname:
              "/All-Clients/" +
              data.projectId.client.clientName +
              "/" +
              data.projectId.projectName +
              "/Estimation-Detail",
            state: {
              estId: data.id,
            },
          }}
        >
          {" "}
          {data.estDescription}
        </Link>
      );
    }
  };

  const columns = [
    {
      title: "Estimation Name",
      field: "estName",
      sorting: false,
      render: (rowData) => {
        // console.log(rowData);
        return (estimationView ? checkStep(rowData) : rowData.estName);
        
        // <Link
        //   to={{
        //     pathname:
        //       "/All-Clients/" +
        //       rowData.projectId.client.clientName +
        //       "/" +
        //       rowData.projectId.projectName +
        //       "/Estimation-Detail",
        //     state: { estId: rowData.id },
        //   }}
        // >
        //   {" "}
        //   {rowData.estName}
        // </Link>
      },
    },
    {
      title: "Estimation Description",
      field: "estDescription",
      render: (rowData) => {
        return (estimationView ? checkStepDes(rowData) : rowData.estDescription);
        // <Link
        //   to={{
        //     pathname:
        //       "/All-Clients/" +
        //       rowData.projectId.client.clientName +
        //       "/" +
        //       rowData.projectId.projectName +
        //       "/Estimation-Detail",
        //     state: { stIde: rowData.id },
        //   }}
        // >
        //   {" "}
        //   {rowData.estDescription}
        // </Link>
      },
      width: "15%",
    },
    { title: "Estimation Type", field: "estTypeId.estType" },
    {
      title: "Client Name",
      field: "projectId.client.clientName",
      render: (rowData) => {
        return (
        clientView ? ( <Link
            to={{
              pathname:
                "/All-Clients" + "/" + rowData.projectId.client.clientName,
            }}
          >
            {" "}
            {rowData.projectId.client.clientName}
          </Link> ) : rowData.projectId.client.clientName
        );
      },
    },
    {
      title: "Project Name",
      field: "projectId.projectName",
      render: (rowData) => {
        return (
         projectView ? (<Link
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
          </Link> ) : rowData.projectId.projectName
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
      {loaderComponent ? loaderComponent : <MaterialTable
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
      }
    </BorderedContainer>
  );
}
export default Home;
