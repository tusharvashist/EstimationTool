import MaterialTable from "material-table";
import React, { useState, useEffect  } from "react";
import "./allestimation.css";
import Edit from '@material-ui/icons/Edit';
import AllestimationSer from "./allestimation.service";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import Link from '@material-ui/core/Link';
function Home() {
    const [tableData, setTableData] = useState([]);
    const [editRow, setEditRow] = useState({});
    useEffect(() => {
      AllestimationSer.getAllEstimation().then((res)=>{
        let dataResponce = res.data.body;
        setTableData([...tableData,...dataResponce])
      }).catch((err)=>{
        console.log("estimation error",err)
      })
    },[]);
    const [isOpenDailog, setIsOpenDailog] = useState(false);
    const columns = [
      { title: "Estimation Name", field: "estimationName", sorting: false },
      { title: "Estimation Description", field: "estimationDescription" },
      { title: "Estimation Type", field: "estimationType" },
      { title: "Client Name", field: "clientName", render:(rowData)=>{ return (<Link  href="/"> {rowData.clientName}</Link>)}},
      { title: "Project Name", field: "projectName", render:(rowData)=>{ return (<Link  href="/"> {rowData.clientName}</Link>)} },
      { title: "Last update", field: "lastupdate", type:'date'},
    ];
    const openfn = ()=>{
      setIsOpenDailog(true)
    }

    const closefn = ()=>{
      setIsOpenDailog(false)
    }

  return (
    <div className="wrap">
    {/* <CustomizedDialogs isOpen={isOpenDailog} openFun={openfn} closeFun={closefn} title="Edit Estimation" oktitle="Save" CancelTitle="Cancel">
      <Grid container>
          <form  noValidate>
            <TextField autoFocus id="standard-basic" label="Estimation Name" className="full-width" value={editRow.estimationName} />
            <TextField id="standard-basic" label="Estimation Description" className="full-width" value={editRow.estimationDescription} />
            <TextField id="standard-basic" label="Estimation Type" className="full-width" value={editRow.estimationType} />
            <TextField id="standard-basic" label="Client Name" className="full-width" value={editRow.clientName} />
            <TextField id="standard-basic" label="Project Name" className="full-width" value={editRow.projectName} />
            <TextField  id="date" label="Last update" type="date" className="full-width" InputLabelProps={{ shrink: true}}/>
          </form>
      </Grid>
    </CustomizedDialogs> */}
       <MaterialTable
      columns={columns}
      // actions={[
      //   {
      //     icon: 'save',
      //     tooltip: 'Save User',
      //     onClick: (event, rowData) => {openfn(); setEditRow({...editRow,...rowData}); console.log("****")}
      //   }
      // ]}
      // components={{
      //   Action: props => (
      //    <Edit  onClick={(event) => props.action.onClick(event, props.data)}/>
      //   ),
      // }}
      options={{
        actionsColumnIndex:-1,
        sorting: true,
        search: false,
        filtering: false,
        pageSize:5,
        paging: false,
      }}
      data={tableData}
      title="Recent Estimation"
    />
    </div>
  );
}
export default Home;
