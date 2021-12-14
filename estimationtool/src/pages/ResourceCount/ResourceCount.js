import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "../estimation-detail/estimation-detail.css";
import React, { useState, useEffect } from "react";
import useLoader from "../../shared/layout/hooks/useLoader";
import RoleCount from "./RoleCount";
import { DataGrid } from "@mui/x-data-grid";
import RoleEditCount from "./RoleEditCount";
import { Select, MenuItem } from "@material-ui/core";
import ReourceCountService from "./resourcecount.service";

import { MdOutlineManageAccounts } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { RiTimerLine, RiTimerFlashLine } from "react-icons/ri";
import NoRowOverlay from "../../shared/ui-view/NoRowOverlay/NoRowOverlay";

const ResourceCountMatrix = (props) => {
  const [tableOpen, setTableOpen] = useState(false);

  const popupCount = () => {};
  const [technologyList, setTechnolnogySkills] = useState();
  const [openEditCount, setOpenEditCount] = useState(false);
  const [resouceCountData, setResouceCountData] = useState([]);
  const [estimationHeaderId, setestimationHeaderId] = useState(props.data);
  const [rowEditData, setRowEditData] = useState([]);
  const [roleData, setRoleData] = useState();
  const [reload, setReload] = useState(false);
  const [loaderComponent, setLoader] = useLoader();

  const [sortModel, setSortModel] = React.useState([
    {
      field: "resourceCount",
      sort: "asc",
    },
  ]);

  useEffect(() => {
    // getTechnologySkill();
    getTechnologySkill();
    getResourceCountData(estimationHeaderId);
  }, [reload]);

  // Get All Technology Skills

  const getTechnologySkill = () => {
    setLoader(true);
    ReourceCountService.getAllTechnologies()
      .then((res) => {
        setLoader(false);
        console.log("tech", res);
        setTechnolnogySkills(res.data.body);
      })
      .catch((err) => {});
  };

  // Get Resource Count

  const getResourceCountData = (estimationHeaderId) => {
    ReourceCountService.getResourceCount(estimationHeaderId)
      .then((res) => {
        getResourceCountAllData(estimationHeaderId);
        getResourceMasterRoleData();
      })
      .catch((err) => {});
  };

  // Get Resource Master Role Data

  const getResourceMasterRoleData = () => {
    ReourceCountService.getResourceMasterRole()
      .then((res) => {
        console.log("2res", res);
        //Array:
        // cost: 20
        // count: 0
        // isDeleted: false
        // location: "india"
        // price: 30
        // resourceRole: "Sr Lead"
        // techSkill: "frontend"
        // _id: "61ae02114fdff5af9831741e
        setRoleData(res.data.body);
      })
      .catch((err) => {});
  };

  // Get All Resource Count Data

  const getResourceCountAllData = (estimationHeaderId) => {
    setLoader(true);
    ReourceCountService.getResourceCountAll(estimationHeaderId)
      .then((res) => {
        setLoader(false);
        console.log("all Data getResourceCountAllData", res.data.body);
        setResouceCountData(res.data.body);
        // setRoleData(res.data.body)
        // setTechnolnogySkills(res.data.body);
        props.errorFunction(
          res.data.body.some((el) => el.validationerror === true)
        );
      })
      .catch((err) => {});
  };

  console.log("resouceCountData", resouceCountData);

  const getColumns = ({ onChangeSelect }) => [
    {
      headerName: "Resource Count",
      field: "resourceCount",
      width: 180,
      sorting: false,
      valueFormatter: (params) => {
        // console.log("resource count params",params)
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
            value={rowdata.row.skillsId}
            //   label={technologySkills.skill
          >
            {technologyList.map((item) => (
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
      renderCell: renderRole,
    },
  ];

  function renderRole(params) {
    console.log("renmderROle", params);
    return (
      <RoleCount
        data={params.row}
        rowData={rowEditData}
        masterData={roleData}
      />
    );
  }

  function handleCellClick(param) {
    if (param.field === "role" && !openEditCount) {
      console.log("roweditdata", param.row);

      setRowEditData(param.row);
      setOpenEditCount(true);
    } else if (param.field === "role" && openEditCount) {
      setOpenEditCount(false);
    }
  }

  const closeEditHandler = () => {
    setOpenEditCount(false);
  };

  const handleEditChange = () => {
    setReload(!reload);
  };

  const handleCountTable = () => {
    if (estimationHeaderId) {
      getResourceCountData(estimationHeaderId);
    }
    if (!tableOpen) setTableOpen(true);
    if (tableOpen) {
      setTableOpen(false);
      setOpenEditCount(false);
    }
  };

  const onChangeSelect = (e, rowData) => {
    console.log("selected", e.target.value, rowData);
    const techId = e.target.value;
    const { row } = rowData;
    let req = {
      _id: row._id,
      techSkill: techId,
      estAttributeId: row.estAttributeId || null,
      estCalcId: row.estCalcId || null,
      estHeaderId: estimationHeaderId,
    };
    setLoader(true);

    ReourceCountService.updateTechnology(req)
      .then((res) => {
        console.log("update technology", res.data.body);
        setLoader(false);

        getResourceCountData(estimationHeaderId);
      })
      .catch((err) => {});
  };
  return (
    <div className="estimation-detail-cover">
      {tableOpen && (
        <div className="estimation-detail-count-table">
          <BorderedContainer className="count-box-shadow roleCountInputParent">
            {openEditCount && (
              <>
                <div
                  className="editrole_cover"
                  onClick={closeEditHandler}
                ></div>
                <RoleEditCount
                  rowEditData={rowEditData}
                  masterData={roleData}
                  handleEditChange={handleEditChange}
                />
              </>
            )}
            <div style={{ height: 300, width: "100%" }}>
           { resouceCountData.length && (
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
                        "& .css-wivjjc-MuiDataGrid-root .MuiDataGrid-row:hover":
                          {
                            backgroundColor: "none",
                          },
                      }}
                      rows={resouceCountData}
                      // rows={[]}
                      columns={getColumns({ onChangeSelect })}
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
                  )}
            </div>

            {/* <div className="resource-cont-costing">
              <h4 className="inline-cost">Costing: $1000</h4>
              <h4 className="inline-cost">Expected Timeline: $1000</h4>
              <h4 className="inline-cost">Actual Timeline: $1000</h4>
            </div> */}
          </BorderedContainer>
        </div>
      )}
      <div className="estimation-detail-button-container">
        <button
          onClick={handleCountTable}
          className="estimation-detail-count-button"
        >
          <MdOutlineManageAccounts
            style={{ fontSize: "32px", color: "#1e7e1e" }}
          />
        </button>
      </div>
    </div>
  );
};

export default ResourceCountMatrix;
