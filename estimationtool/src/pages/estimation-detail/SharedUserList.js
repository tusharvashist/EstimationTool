import React, { useEffect, useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles, createStyles } from "@mui/styles";
import estimationService from "./EstimationService";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";

const SharedUserList = (props) => {
  const [assumptions, setAssumptions] = useState([]);
  useEffect(() => {
    importAllAssumptions();
  }, []);

  const popCancelHandler = () => {
    props.closeFun();
  };

  const importAllAssumptions = async () => {
    let result = await estimationService.getShareEstimate(props.estimationId);
     var index = 1;
        result.data.body.forEach(item => {
          item["id"] = index;
          index = index + 1;
        });
    setAssumptions(result.data.body);
  };

  const columns = [
    {
      field: "firstName", headerName: "Name", width: 200,
      renderCell: (rowData) => {
        return rowData.row.shareuser.firstName + " " + rowData.row.shareuser.lastName;
      }
    },
     {
      field: "Role", headerName: "Role", width: 150,
      renderCell: (rowData) => {
        return rowData.row.sharingrole.roleName;
      }
    }, {
      field: "Email", headerName: "Email", width: 200,
      renderCell: (rowData) => {
        return rowData.row.shareuser.email;
      }
    },
  ];

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "rgb(229, 235, 247)",
        },
      },
    })
  );

  const classes = useTableStyle();

  return (
    <CustomizedDialogs
      isOpen={props.isOpen}
      openFun={props.openFun}
      closeFun={popCancelHandler}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={"Done"}
      width={"sm"}
      buttonType="submit"
      isHideOkButton={true}
    >
      <Grid container>
        <Grid item xs={12} style={{ paddingTop: "10px" }}>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              className={`${classes.root} ${classes.dataGrid}`}
              rows={assumptions}
              columns={columns}
            />
          </div>
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default SharedUserList;