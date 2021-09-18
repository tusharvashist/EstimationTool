import MaterialTable from "material-table";
import React, { useState, useEffect  } from "react";
import AllestimationSer from "./allestimation.service";
import "./allestimation.css";

function Home() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    AllestimationSer.getAllEstimation().then((res)=>{
      let dataResponce = res.data.body;
      setTableData([...tableData,...dataResponce])
      
    }).catch((err)=>{
      console.log("estimation error",err)
    })
  },[]);

  const columns = [
    { title: "Estimation Name", field: "estimationName", sorting: false },
    { title: "Estimation Description", field: "estimationDescription" },
    { title: "Estimation Type", field: "estimationType" },
    { title: "Client Name", field: "clientName" },
    { title: "Project Name", field: "projectName" },
    // { title: "Last update", field: "lastupdate", type:Date},
  ];

  return (
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> <MaterialTable
      columns={columns}
      editable={{
        onRowAdd:(newRow)=> new Promise((resolve,reject)=>{
          setTableData([...tableData,newRow])
          console.log(newRow);
          //----------------- create opration #C
          setTimeout(()=> resolve(),500)
        }),
        onRowUpdate:(newRow,oldData)=> new Promise((resolve,reject)=>{
          let updatedData = [...tableData];
          updatedData[oldData.tableData.id] = newRow;
          setTableData(updatedData)
          console.log(newRow,oldData);
          //----------------- Edit/Update opration #U
          setTimeout(()=> resolve(),500)
        }),
        onRowDelete:(selectRow)=> new Promise((resolve,reject)=>{
          let updatedData = [...tableData];
          updatedData.splice(selectRow.tableData.id,1)
          console.log(updatedData);
           //----------------- Delete opration #U
          setTableData(updatedData)
          setTimeout(()=> resolve(),1000)
        })
      }}
      options={{
        addRowPosition:"first",
        actionsColumnIndex:-1,
        sorting: true,
        search: true,
        filtering: false,
        exportButton: true,
        exportAllData: true,
        exportFileName: "tabledata",
      }}
      data={tableData}
      title=""
    />
    
    
    
       </div>
  );
}
export default Home;
