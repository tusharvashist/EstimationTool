import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import ClientSer from "./client.service";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dropdown from "../../shared/ui-view/dropdown/dropdown";
import CreateClientDailog from "./create-client.dailog";
import UpdateClientdailog from "./update-client.dailog";
import DeleteClientdailog from "./delete-client.dailog";
import AddIcon from "@material-ui/icons/Add";
import "./all-client.css";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

import Link from "@material-ui/core/Link";
import { withRouter } from "react-router";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
// import { rolePermission } from "../../shared/commonUtility/rolePermission";
import { useSelector } from "react-redux";
import useLoader from "../../shared/layout/hooks/useLoader";
//import { useHistory } from "react-router-dom";
import UpdatedBy from "../../shared/ui-view/table/UpdatedBy";

function AllClient(props) {
  const { history } = props;
  // console.log(props);
  const roleState = useSelector((state) => state.role);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [createClinetDailog, setCreateClinetDailog] = useState(false);
  const [editClinetDailog, setEditClinetDailog] = useState(false);
  const [deleteClinetDailog, setDeleteClinetDailog] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [actionId, setActionId] = useState("");
  const [clientStatus, setClientStatus] = useState([
    { title: "All", value: "All" },
    { title: "Active", value: false },
    { title: "In-Active", value: true },
  ]);
  const [isOpen, setOpen] = React.useState({});
  const [selectedOption, setSelectedOption] = useState({
    title: "Active",
    value: false,
  });
  const [loaderComponent, setLoader] = useLoader();

  useEffect(() => {
    getAllClient();
  }, []);
  // const history1 = useHistory();

  const getAllClient = () => {
    setLoader(true);
    ClientSer.getAllClient()
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        console.log(dataResponce + ">>>>>>>>>>>>>>.");
        setTableData([...dataResponce]);
        setFilteredData(dataResponce.filter((op) => op.isDeleted === false));
      })
      .catch((err) => {
        console.log("estimation error", err);
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        //  }
      });
  };
  const columns = [
    {
      title: "Client Name",
      field: "clientName",
      render: (rowData) => {
        return rowData.isDeleted ? (
          <>{rowData.clientName} </>
        ) : (
          <Link
            onClick={() => history.push(`/All-Clients/${rowData.clientName}`)}
          >
            {rowData.clientName}
          </Link>
        );
      },
      sorting: true,
    },
    { title: "Client Description", field: "description" },
    {
      title: "Client Website",
      field: "website",
      render: (dataRow) => {
        return (
          <a target="blank" href={`//${dataRow.website}`}>
            {/* <Link target="_blank" to={dataRow.website}>{dataRow.website}</Link> */}
            {dataRow.website}
          </a>
        );
      },
    },
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

      // {
      //   const {updatedBy : {updatedAt = '',firstName = '' ,lastName = ''} = {}} = dataRow;

      //   return (updatedAt && firstName && lastName) && (getMMDDYYYYFormat(updatedAt) +" | "+ firstName + ' '+ lastName) || getMMDDYYYYFormat(dataRow.updatedAt)
      // }
    },
  ];

  const openFun = () => {
    setIsOpenDailog(true);
  };

  const closeFun = () => {
    setIsOpenDailog(false);
  };
  const getDropDownvalue = (event) => {
    console.log("get dropdown value", event.target.value);
    if (event.target.value === "All") {
      setFilteredData([...tableData]);
    } else {
      let dataResponce = tableData.filter(
        (op) => op.isDeleted === event.target.value
      );
      setFilteredData([...dataResponce]);
    }
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

  const handleClose = () => {
    setOpen({});
  };

  const createClient = (clientData) => {
    setLoader(true);

    ClientSer.createClient(clientData)
      .then((res) => {
        setLoader(false);

        getAllClient();
        setOpen({ open: true, severity: "success", message: res.data.message });

        closeFun();
      })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        // }
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const updateClient = (clientData) => {
    setLoader(true);

    ClientSer.updateClient(actionId, clientData)
      .then((res) => {
        setLoader(false);

        getAllClient();
        setOpen({ open: true, severity: "success", message: res.data.message });

        closeFun();
      })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        // }
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const deleteClient = () => {
    setLoader(true);

    ClientSer.deleteClient(actionId)
      .then((res) => {
        setLoader(false);

        getAllClient();
        setOpen({ open: true, severity: "success", message: res.data.message });

        closeFun();
      })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        // }
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
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

  const actions = [
    (rowData) => ({
      icon: "edit",
      tooltip: "edit client",
      onClick: (event, rowData) => {
        setEditRow({ ...rowData });
        setActionId(rowData.id);
        openUpdateDailog();
      },
      disabled: rowData.isDeleted,
    }),
    (rowData) => ({
      icon: "delete",
      tooltip: "delete client",
      onClick: (event, rowData) => {
        setEditRow({ ...rowData });
        setActionId(rowData.id);
        openDeleteDailog();
      },
      disabled: rowData.isDeleted,
    }),
  ];
  // console.log("selectedOption.label", selectedOption.title)
  if (selectedOption.value === true) {
    actions.push();
  }

  const { message, severity, open } = isOpen || {};

  const rowBackgroundColor = {
    true: "#eef5e9",
    false: "#fff",
  };

  return (
    <>
      <div
        className="all-client-wrap"
        data-backdrop="static"
        data-keyboard="false"
      >
        {createClinetDailog === true && isOpenDailog === true ? (
          <CreateClientDailog
            data-backdrop="static"
            data-keyboard="false"
            isOpen={isOpenDailog}
            openF={openFun}
            closeF={closeFun}
            title="Create Client"
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
            title="Edit Client"
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
        <Box>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={5} sm={5}>
              <Box sx={{ maxWidth: 200 }}>
                <FormControl width="300px">
                  <InputLabel id="client-simple-select">
                    Client Status{" "}
                  </InputLabel>

                  <Select
                    labelId="client-simple-select"
                    id="client-simple-select"
                    value={clientStatus.title}
                    label={clientStatus.title}
                    defaultValue={false}
                    onChange={getDropDownvalue}
                  >
                    {clientStatus.map((item) => (
                      <MenuItem key={item.title} value={item.value}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {/* <Dropdown
              defaultValue={{ title: "Active", value: "active" }}
              title="client status"
              list={clientStatus}
              getVal={getDropDownvalue}
            /> */}
            {!roleState.isContributor && (
              <Button variant="outlined" onClick={openCreateDailog}>
                {" "}
                <AddIcon />
                create client
              </Button>
            )}
          </Grid>
        </Box>
      </div>
      <Grid container>
        <BorderedContainer className="full-width">
          {loaderComponent ? (
            loaderComponent
          ) : (
            <MaterialTable
              columns={columns}
              components={{
                Container: (props) => <Paper {...props} elevation={0} />,
              }}
              actions={!roleState.isContributor ? actions : false}
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
                rowStyle: (rowData) => {
                  return {
                    backgroundColor:
                      rowBackgroundColor[rowData.isDeleted] ?? "#eee",
                  };
                },
              }}
              data={filteredData}
              title={`Client${tableData.length > 1 ? "s" : ""}`}
            />
          )}
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
      </Grid>
    </>
  );
}
export default withRouter(AllClient);
