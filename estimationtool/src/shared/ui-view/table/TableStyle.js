import { ImportantDevices } from "@material-ui/icons";
import { makeStyles, createStyles } from "@mui/styles";

export function useTableStyle() {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .css-1d97e6z-MuiDataGrid-root .MuiDataGrid-cell--textRight": {
          textAlign: "left",
        },
        "& .MuiDataGrid-columnHeaders.css-okt5j6-MuiDataGrid-columnHeaders": {
          backgroundColor: "rgb(229, 235, 247) !important",
          fontWeight: "500",
        },
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "rgb(229, 235, 247)",
          height: "60px !important",
        },
        "& .MuiDataGrid-cell--editable": {
          backgroundColor: "#fff",
        },
        "& .MuiDataGrid-cell--textRight": {
          textAlign: "left !important",
        },
      },
      dataGrid: {
        width: "100%",
      },
    })
  );

  const classes = useStyles();
  return classes;
}

export default useTableStyle;
