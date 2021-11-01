import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ClientSer from "./client.service";
import { Box, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dropdown from "../../shared/ui-view/dropdown/dropdown";
import CreateClientDailog from "./create-client.dailog";
import UpdateClientdailog from "./update-client.dailog";
import DeleteClientdailog from "./delete-client.dailog";
import AddIcon from "@material-ui/icons/Add";
import "./all-client.css";

import Link from "@material-ui/core/Link";
import { withRouter } from "react-router";

function AllClient(props) {
  const { history } = props;
  console.log(props);

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [createClinetDailog, setCreateClinetDailog] = useState(false);
  const [editClinetDailog, setEditClinetDailog] = useState(false);
  const [deleteClinetDailog, setDeleteClinetDailog] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [actionId, setActionId] = useState("");
  const [clientStatus, setClientStatus] = useState([
    { title: "Active", value: false },
    { title: "In-Active", value: true },
  ]);

  useEffect(() => {
    getAllClient();
  }, []);

  const getAllClient = () => {
    ClientSer.getAllClient()
      .then((res) => {
        let dataResponce = res.data.body;
        console.log(dataResponce);
        setTableData([...dataResponce]);
        setFilteredData(dataResponce.filter((op) => op.isDeleted === false));
      })
      .catch((err) => {
        console.log("estimation error", err);
      });
  };
  const columns = [
    {
      title: "Client Name",
      field: "clientName",
      render: (rowData) => {
        return (
          <Link
            onClick={() => history.push(`/All-Clients/${rowData.clientName}`)}
          >
            {rowData.clientName}
          </Link>
        );
      },
      sorting: false,
    },
    { title: "Client Description", field: "description" },
    {
      title: "Client Website",
      field: "website",
      render: (dataRow) => {
        return (
          <a target="blank" href={dataRow.website}>
            {dataRow.website}
          </a>
        );
      },
    },
  ];

  const openFun = () => {
    setIsOpenDailog(true);
  };

  const closeFun = () => {
    setIsOpenDailog(false);
  };
  const getDropDownvalue = ({ value } = {}) => {
    let dataResponce = tableData.filter((op) => op.isDeleted === value);
    setFilteredData([...dataResponce]);
  };

  const openCreateDailog = () => {
    openFun();
    setEditClinetDailog(false);
    setDeleteClinetDailog(false);
    setCreateClinetDailog(true);
    console.log("createClinetDailog", createClinetDailog);
  };

  const openUpdateDailog = () => {
    openFun();
    setCreateClinetDailog(false);
    setDeleteClinetDailog(false);
    setEditClinetDailog(true);
  };

  const openDeleteDailog = () => {
    openFun();
    setCreateClinetDailog(false);
    setEditClinetDailog(false);
    setDeleteClinetDailog(true);
  };

  const createClient = (clientData) => {
    ClientSer.createClient(clientData)
      .then((res) => {
        getAllClient();
        closeFun();
      })
      .catch((err) => {});
  };

  const updateClient = (clientData) => {
    ClientSer.updateClient(actionId, clientData)
      .then((res) => {
        getAllClient();
        closeFun();
      })
      .catch((err) => {});
  };

  const deleteClient = () => {
    ClientSer.deleteClient(actionId)
      .then((res) => {
        getAllClient();
        closeFun();
      })
      .catch((err) => {});
  };

  const saveCreateClientFun = (data) => {
    createClient(data);
  };

  const saveUpdateClientFun = (data) => {
    updateClient(data);
  };
  const confirmDeleteClientFun = () => {
    deleteClient();
  };

  return (
    <div className="all-client-wrap">
      {createClinetDailog === true && isOpenDailog === true ? (
        <CreateClientDailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          title="Create client"
          oktitle="Save"
          saveFun={saveCreateClientFun}
          cancelTitle="Cancel"
        />
      ) : null}

      {editClinetDailog === true && isOpenDailog === true ? (
        <UpdateClientdailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          editRowObj={editRow}
          title="Edit Estimation"
          oktitle="Save"
          saveFun={saveUpdateClientFun}
          cancelTitle="Cancel"
        />
      ) : null}

      {deleteClinetDailog === true && isOpenDailog === true ? (
        <DeleteClientdailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeFun}
          editRowObj={editRow}
          title="Delete Client"
          oktitle="Ok"
          saveFun={confirmDeleteClientFun}
          cancelTitle="Cancel"
        />
      ) : null}
      <Box mb={3}>
        <Grid container justify="space-between" alignItems="center">
          <Dropdown
            defaultValue={{ title: "Active", value: "active" }}
            title="client status"
            list={clientStatus}
            getVal={getDropDownvalue}
          />
          <Button variant="outlined" onClick={openCreateDailog}>
            {" "}
            <AddIcon />
            create client
          </Button>
        </Grid>
      </Box>
      <MaterialTable
        columns={columns}
        actions={[
          {
            icon: "edit",
            tooltip: "edit client",
            onClick: (event, rowData) => {
              setEditRow({ ...rowData });
              setActionId(rowData.id);
              openUpdateDailog();
            },
          },
          {
            icon: "delete",
            tooltip: "delete client",
            onClick: (event, rowData) => {
              setEditRow({ ...rowData });
              setActionId(rowData.id);
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
            color: "#113c91",
          },
        }}
        data={filteredData}
        title={`Client${tableData.length > 1 ? "s" : ""}`}
      />
    </div>
  );
}
export default withRouter(AllClient);
