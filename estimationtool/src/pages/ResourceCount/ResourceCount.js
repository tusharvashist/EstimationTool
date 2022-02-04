import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "../estimation-detail/estimation-detail.css";
import React, { useState, useEffect } from "react";
import RoleCount from "./RoleCount";
import { DataGrid } from "@mui/x-data-grid";
import RoleEditCount from "./RoleEditCount";
import { Select, MenuItem } from "@material-ui/core";
import ReourceCountService from "./resourcecount.service";

import { MdOutlineManageAccounts } from "react-icons/md";
import NoRowOverlay from "../../shared/ui-view/NoRowOverlay/NoRowOverlay";
import usePermission from "../../shared/layout/hooks/usePermissions";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const ResourceCountMatrix = (props) => {
  const [tableOpen, setTableOpen] = useState(false);

  const [technologyList, setTechnolnogySkills] = useState();
  const [openEditCount, setOpenEditCount] = useState(false);
  const [resouceCountData, setResouceCountData] = useState([]);
  const [estimationHeaderId, setestimationHeaderId] = useState(props.data);
  const [rowEditData, setRowEditData] = useState([]);
  const [reload, setReload] = useState(false);
  const [techError, setTechError] = useState({});

  const [sortModel, setSortModel] = React.useState([
    {
      field: "resourceCount",
      sort: "asc",
    },
  ]);
  const { estimation_resourcecount_edit } = usePermission();
  useEffect(() => {
    getTechnologySkill();
    getResourceCountData();

    if (tableOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [tableOpen]);

  // Get All Technology Skills

  const getTechnologySkill = () => {
    ReourceCountService.getAllTechnologies()
      .then((res) => {
        setTechnolnogySkills(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get Resource Count

  const getResourceCountData = () => {
    ReourceCountService.getResourceCount(estimationHeaderId)
      .then((res) => {
        getResourceCountAllData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get Resource Master Role Data

  // Get All Resource Count Data

  const getResourceCountAllData = () => {
    ReourceCountService.getResourceCountAll(estimationHeaderId)
      .then((res) => {
        setResouceCountData(res.data.body);
        if(res.data.body.length > 0){
        props.errorFunction(
          res.data.body.some((el) => el.validationerror === true)
        );
        }else{
         props.errorFunction(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        console.log("Skills params", rowData);
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
      renderCell: (rowdata) => {
        console.log("rowdata technology", rowdata);
        return (
          <Select
            style={{ width: "100%" }}
            onChange={(e) => onChangeSelect(e, rowdata)}
            onMouseEnter={(e) =>
              rowdata.row.rolecount.length !== 0 &&
              setTechError({
                open: true,
                severity: "warning",
                message: `All resource count planning of ${rowdata.row.attributeName} with ${rowdata.row.skills} will be removed, if technology is changed`,
              })
            }
            value={rowdata.row.skillsId}
          >
            {technologyList &&
              technologyList.map((item) => (
                <MenuItem key={item.skill} value={item.id}>
                  {item.skill}
                </MenuItem>
              ))}
          </Select>
        );
      },
    },
    {
      headerName: "Role",
      field: "role",
      sorting: false,
      width: 300,
      renderCell: (params) => <RoleCount {...params} reload={reload} />,
    },
  ];

  function handleCellClick(param) {
    console.log("param", param);
    if (param.row.skills) {
      if (param.field === "role" && !openEditCount) {
        setRowEditData(param.row);
        setOpenEditCount(true);
        setTechError(false);
      } else if (param.field === "role" && openEditCount) {
        setOpenEditCount(false);
      }
    } else {
      setTechError({
        open: true,
        severity: "warning",
        message: "Please set technology before assigning roles",
      });
      setOpenEditCount(false);
    }
  }

  const closeEditHandler = () => {
    setOpenEditCount(false);
  };

  const handleEditChange = () => {
    getResourceCountData();
    setReload(!reload);
  };

  const handleCountTable = () => {
    if (estimationHeaderId) {
      getResourceCountData();
    }
    setTableOpen(!tableOpen);
    if (tableOpen) {
      setOpenEditCount(false);
    }
  };

  const onChangeSelect = (e, rowData) => {
    const techId = e.target.value;
    const { row } = rowData;
    let req = {
      _id: row._id,
      techSkill: techId,
      estAttributeId: row.estAttributeId || null,
      estCalcId: row.estCalcId || null,
      estHeaderId: estimationHeaderId,
    };

    ReourceCountService.updateTechnology(req)
      .then((res) => {
        setReload(!reload);
        getResourceCountData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("resouceCountData", resouceCountData);

  const handleClose = () => {
    setTechError({});
  };

  return (
    <div className="resource-count-cover">
      {tableOpen && (
        <>
          <div
            className="resource-pop-cover"
            onClick={() => handleCountTable()}
          ></div>
          <div className="estimation-detail-count-table">
            <BorderedContainer className="count-box-shadow roleCountInputParent">
              {openEditCount && (
                <>
                  <div
                    className="editrole_cover"
                    onClick={() => closeEditHandler()}
                  ></div>

                  {estimation_resourcecount_edit && (
                    <RoleEditCount
                      rowEditData={rowEditData}
                      handleEditChange={handleEditChange}
                    />
                  )}
                </>
              )}
              <div style={{ height: 300, width: "100%" }}>
              {estimation_resourcecount_edit && resouceCountData.length ? (
                  <DataGrid
                    sx={{
                      "& .MuiDataGrid-cell:hover": {
                        background: "none",
                      },
                      "& .error--true .MuiDataGrid-row:hover": {
                        background: "rgba(255, 0, 0, 0.2)",
                      },
                      "& .css-6aw94i-MuiDataGrid-root .MuiDataGrid-row.Mui-selected":
                        {
                          backgroundColor: "none",
                        },
                      "& .css-wivjjc-MuiDataGrid-root .MuiDataGrid-row:hover": {
                        backgroundColor: "none",
                      },
                    }}
                    rows={resouceCountData}
                    columns={getColumns()}
                    pageSize={5}
                    onCellClick={handleCellClick}
                    getRowId={({ _id }) => _id}
                    key="_id"
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                    components={{
                      NoRowsOverlay: NoRowOverlay,
                    }}
                    getRowClassName={(params) =>
                      `error--${params.row.validationerror}`
                    }
                  />
                  ) : 
                  <h5 className="no-recrd">No Records available</h5>
                  }
              </div>
            </BorderedContainer>
          </div>
        </>
      )}
      <div className="estimation-detail-button-container">
        <button
          onClick={() => handleCountTable()}
          className={`estimation-detail-count-button error-${props.countError}`}
        >
          <MdOutlineManageAccounts
            style={{ fontSize: "32px", color: "#1e7e1e" }}
          />
        </button>
      </div>
      {techError && (
        <Snackbar
          isOpen={techError.open}
          severity={techError.severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={techError.message}
        />
      )}
    </div>
  );
};

export default ResourceCountMatrix;
