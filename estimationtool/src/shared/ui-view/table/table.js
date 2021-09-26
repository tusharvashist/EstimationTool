import React from 'react'
import { DataGrid } from '@material-ui/data-grid';


export default function Table(props) {
    const handleCellEditCommit =  function(obj){
        console.log("Edit row object", obj)
    }
   return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rowData}
        columns={props.columanData}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={handleCellEditCommit}
      />
    </div>
  );
}
