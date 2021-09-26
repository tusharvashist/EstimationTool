import MaterialTable from "material-table";
import React, { useState, useEffect  } from "react";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ClientSer from "./client.service";
import {Box, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dropdown from "../../shared/ui-view/dropdown/dropdown";
import { makeStyles } from '@material-ui/core/styles';
import CreateClientDailog from "./create-client.dailog";
import UpdateClientdailog from "./update-client.dailog";
import DeleteClientdailog from "./delete-client.dailog";
import AddIcon from '@material-ui/icons/Add';
import "./all-client.css";

  const useStyles = makeStyles({
      MTableToolbar: {
          root: {
          backgroundColor:"#000"
        }
      },
  });

function AllClient() {
    const [tableData,setTableData] = useState([]);
    const [isOpenDailog,setIsOpenDailog] = useState(false);
    const [createClinetDailog,setCreateClinetDailog] = useState(false);
    const [editClinetDailog,setEditClinetDailog] = useState(false);
    const [deleteClinetDailog,setDeleteClinetDailog] = useState(false);
    const [editRow,setEditRow] = useState({});
    const [actionId,setActionId] = useState("");
    const [clientStatus,setClientStatus] = useState([
        { title: 'All'},
        { title: 'Active'},
        { title: 'In-Active'},
    ]);

    useEffect(() => {
      getAllClient()
    },[]);
    
    const getAllClient = ()=>{
      ClientSer.getAllClient().then((res)=>{
        let dataResponce = res.data.body;
        setTableData([...dataResponce])
      }).catch((err)=>{
        console.log("estimation error",err)
      })
    }
    const columns = [
      { title: "Client Name", field: "clientName", sorting: false },
      { title: "Client Description", field: "description" },
      { title: "Client Website", field: "website", render:(dataRow)=>{return(<a target="blank" href={dataRow.website}>{dataRow.website}</a>)} }
    ];

    const openFun = ()=>{
      setIsOpenDailog(true)
    }
   
    const closeFun = ()=>{
      setIsOpenDailog(false)
    }
    const getDropDownvalue = (val)=>{
      console.log("this is an download vlaue", val)
    }
    
    const openCreateDailog = ()=>{
      openFun()
      setEditClinetDailog(false);
      setDeleteClinetDailog(false);
      setCreateClinetDailog(true)
      console.log("createClinetDailog", createClinetDailog)
    }
  
    const openUpdateDailog = ()=>{
      openFun()
      setCreateClinetDailog(false)
      setDeleteClinetDailog(false);
      setEditClinetDailog(true);
    }
  
    const openDeleteDailog = ()=>{
      openFun()
      setCreateClinetDailog(false)
      setEditClinetDailog(false);
      setDeleteClinetDailog(true);
    }

    const createClient = (clientData)=>{
      ClientSer.createClient(clientData).then((res)=>{
        getAllClient()
        closeFun()
      }).catch((err)=>{
      });
    } 

    const updateClient = (clientData)=>{
      ClientSer.updateClient(actionId,clientData).then((res)=>{
        getAllClient()
        closeFun()
      }).catch((err)=>{
      });
    } 

    const deleteClient = ()=>{
      ClientSer.deleteClient(actionId).then((res)=>{
        getAllClient()
        closeFun()
      }).catch((err)=>{
      });
    } 

    const saveCreateClientFun = (data)=>{
      createClient(data)
    }

    const saveUpdateClientFun = (data)=>{
      updateClient(data)
    }
    const confirmDeleteClientFun = ()=>{
      deleteClient()
    }

    

  return (
    <div className="all-client-wrap">
     { createClinetDailog === true && isOpenDailog === true ?
        (<CreateClientDailog 
          isOpen={isOpenDailog} 
          openF={openFun} 
          closeF={closeFun} 
          title="Create client" 
          oktitle="Save" 
          saveFun={saveCreateClientFun}
          cancelTitle="Cancel"
          />):null }

      { editClinetDailog === true && isOpenDailog === true  ?
       (<UpdateClientdailog 
        isOpen={isOpenDailog} 
          openF={openFun} 
          closeF={closeFun} 
          editRowObj={editRow} 
          title="Edit Estimation" 
          oktitle="Save"
          saveFun={saveUpdateClientFun} 
          cancelTitle="Cancel"/>) 
          :null}

          { deleteClinetDailog === true && isOpenDailog === true  ? 
          (<DeleteClientdailog 
            isOpen={isOpenDailog} 
              openF={openFun} 
              closeF={closeFun} 
              editRowObj={editRow} 
              title="Delete Client" 
              oktitle="Ok"
              saveFun={confirmDeleteClientFun} 
              cancelTitle="Cancel"/>) : null
          }
          <Box mb={3}>
              <Grid container justify="space-between" alignItems="center">
                <Dropdown title="client status" list={clientStatus} getVal={getDropDownvalue}/>
                <Button variant="outlined" onClick={openCreateDailog}> <AddIcon/>create client</Button>
              </Grid>
          </Box>
       <MaterialTable
            columns={columns}
            actions={[
                {
                icon: 'edit',
                tooltip: 'edit client',
                onClick: (event, rowData) => {
                    setEditRow({...rowData}); 
                    setActionId(rowData.id); 
                    openUpdateDailog();}
                }, 
                {
                icon: 'delete',
                tooltip: 'delete client',
                onClick: (event, rowData) => {
                    setEditRow({...rowData}); 
                    setActionId(rowData.id); 
                    openDeleteDailog();}
                }
              
            ]}
         
            options={{
                actionsColumnIndex:-1,
                sorting: true,
                search: false,
                filtering: false,
                pageSize:5,
                paging: false,
            }}
            data={tableData}
            title=""
          />
    </div>
  );
}
export default AllClient;
