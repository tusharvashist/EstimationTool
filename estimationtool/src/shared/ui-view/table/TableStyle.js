import { makeStyles, createStyles } from "@mui/styles";

export function useTableStyle() {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .MuiDataGrid-columnHeaders.css-okt5j6-MuiDataGrid-columnHeaders": {
          backgroundColor: "rgb(229, 235, 247) !important",
          fontWeight: "500",
        },
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "rgb(229, 235, 247)",
        },
        "& .MuiDataGrid-cell--editable": {
          backgroundColor: "#fff",
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
