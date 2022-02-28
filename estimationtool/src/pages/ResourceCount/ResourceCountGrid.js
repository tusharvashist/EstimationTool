import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import NoRowOverlay from "../../shared/ui-view/NoRowOverlay/NoRowOverlay";
import RoleCount from "./RoleCount";
import { Select, MenuItem } from "@material-ui/core";

const ResourceCountGrid = (props) => {
  const getColumns = () => [
    {
      headerName: "Resource Count",
      field: "resourceCount",
      width: 180,
      sorting: false,
      valueFormatter: (params) => {
        const { id } = params,
          { resourceCount } = id || {};
        return resourceCount;
      },
    },
    {
      headerName: "Skills(Effort & summary Attribute)",
      field: "skill",
      width: 200,
      sorting: false,
      renderCell: (rowData) => {
        const { row } = rowData,
          { calcAttributeName = "" } = row || {},
          { attributeName = "" } = row || {};
        return attributeName || calcAttributeName;
      },
    },
    {
      headerName: "Technologies",
      field: "techskills",
      width: 200,
      sorting: false,
      renderCell: (rowdata) => (
        <Select
          style={{ width: "100%" }}
          onChange={(e) => props.onChangeSelect(e, rowdata)}
          onMouseEnter={(e) =>
            rowdata.row.rolecount.length !== 0 &&
            props.setTechError({
              open: true,
              severity: "warning",
              message: `All resource count planning of ${rowdata.row.attributeName} with ${rowdata.row.skills} will be removed, if technology is changed`,
            })
          }
          value={rowdata.row.skillsId}
        >
          {props.technologyList &&
            props.technologyList.map((item) => (
              <MenuItem key={item.skill} value={item.id}>
                {item.skill}
              </MenuItem>
            ))}
        </Select>
      ),
    },
    {
      headerName: "Role",
      field: "role",
      sorting: false,
      width: 300,
      renderCell: (params) => <RoleCount {...params} />,
    },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      {props.estimation_resourcecount_edit &&
      props.resouceCountData.length > 0 ? (
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell:hover": {
              background: "none",
            },
            "& .error--true .MuiDataGrid-row:hover": {
              background: "rgba(255, 0, 0, 0.2)",
            },
            "& .css-6aw94i-MuiDataGrid-root .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "none",
            },
            "& .css-wivjjc-MuiDataGrid-root .MuiDataGrid-row:hover": {
              backgroundColor: "none",
            },
          }}
          rows={props.resouceCountData}
          columns={getColumns()}
          pageSize={5}
          onCellClick={(param) => props.handleCellClick(param)}
          getRowId={({ _id }) => _id}
          key="_id"
          sortModel={props.sortModel}
          onSortModelChange={(model) => props.setSortModel(model)}
          components={{
            NoRowsOverlay: NoRowOverlay,
          }}
          getRowClassName={(params) => `error--${params.row.validationerror}`}
        />
      ) : (
        <h5 className="no-recrd">No Records available</h5>
      )}
    </div>
  );
};

export default ResourceCountGrid;
