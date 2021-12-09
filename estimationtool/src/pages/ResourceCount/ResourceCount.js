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
  const [technologySkills, setTechnolnogySkills] = useState();
  const [openEditCount, setOpenEditCount] = useState(false);
  const [resouceCountData, setResouceCountData] = useState([]);
  const [estimationHeaderId, setestimationHeaderId] = useState(props.data);
  const [rowEditData, setRowEditData] = useState([]);
  const [roleData, setRoleData] = useState();
  const [count, setCount] = useState({});

  useEffect(() => {
    // getTechnologySkill();
    // getResourceCountData(estimationHeaderId);
  }, []);

  // Get All Technology Skills

  const getTechnologySkill = () => {
    ReourceCountService.getAllTechnologies()
      .then((res) => {
        setTechnolnogySkills(res.data.body);
      })
      .catch((err) => {});
  };

  // Get Resource Count

  const getResourceCountData = (estimationHeaderId) => {
    ReourceCountService.getResourceCount(estimationHeaderId)
      .then((res) => {
        getResourceMasterRoleData();
        getResourceCountAllData(estimationHeaderId);
      })
      .catch((err) => {});
  };

  // Get Resource Master Role Data

  const getResourceMasterRoleData = () => {
    ReourceCountService.getResourceMasterRole()
      .then((res) => {
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
        let objArr = res.data.body.map((el) => {
          return {
            count: el.count,
            resourceRole: el.resourceRole,
            _id: el._id,
          };
        });
        setCount(objArr);
      })
      .catch((err) => {});
  };

  // Get All Resource Count Data

  const getResourceCountAllData = (estimationHeaderId) => {
    ReourceCountService.getResourceCountAll(estimationHeaderId)
      .then((res) => {
        console.log("all Data getResourceCountAllData", res.data.body);
        setResouceCountData(
          res.data.body.map(({ rolecount, _id }) => {
            return { ..._id, rolecount: [...rolecount] };
          })
        );
        res.data.body.map((el) => {
          if (el.rolecount) {
            //to be added after we get id from api
          }
        });
        // setRoleData(res.data.body)
        // setTechnolnogySkills(res.data.body);
      })
      .catch((err) => {});
  };

  console.log("resouceCountData", resouceCountData);
  const getColumns = ({ onChangeSelect, technologySkills }) => [
    {
      headerName: "Resource Count",
      field: "resourceCount",
      width: 180,
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
      renderCell: (rowdata) => {
        console.log("rowdata technology", rowdata);
        return (
          <Select
            style={{ width: "100%" }}
            onChange={(e) => onChangeSelect(e, rowdata)}
            value={rowdata.row.skillsId}
            //   label={technologySkills.skill
          >
            {technologySkills.map((item) => (
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
      width: 300,
      renderCell: renderRole,
    },
  ];

  function renderRole(params) {
    console.log("renmderROle", params);
    return <RoleCount data={params.row} masterData={roleData} />;
  }

  function handleCellClick(param) {
    console.log("param", param);
    if (param.field === "role" && !openEditCount) {
      console.log("roweditdata", param.value);

      setRowEditData(param.row);
      setOpenEditCount(true);
    } else if (param.field === "role" && openEditCount) {
      setOpenEditCount(false);
    }
  }

  //Mock data resource count
  const rowData = [
    {
      id: 1,
      resourceCount: 2,
      skill: "Frontend",
      techskill: "React/Angular",
      role: [1, 0, 0],
    },
    {
      id: 2,
      resourceCount: 2,
      skill: "Frontend",
      techskill: "React/Angular",
      role: [2, 0, 0],
    },
    {
      id: 3,
      resourceCount: 2,
      skill: "Frontend",
      techskill: "React/Angular",
      role: [3, 0, 0],
    },
  ];

  const handleCountTable = () => {
    if (estimationHeaderId) {
      getTechnologySkill();
      getResourceCountData(estimationHeaderId);
    }
    if (!tableOpen) setTableOpen(true);
    if (tableOpen) setTableOpen(false);
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
      estHeaderId: rowData.estHeaderId,
    };

    ReourceCountService.updateTechnology(req)
      .then((res) => {
        console.log("update technology", res.data.body);
        getResourceCountData(estimationHeaderId);
      })
      .catch((err) => {});
  };

  console.log("resouceCountData", resouceCountData);
  return (
    <div className="estimation-detail-cover">
      {tableOpen && (
        <div className="estimation-detail-count-table">
          <BorderedContainer className="count-box-shadow roleCountInputParent">
            {openEditCount && (
              <RoleEditCount rowEditData={rowEditData} masterData={roleData} />
            )}
            <div style={{ height: 300, width: "100%" }}>
              {resouceCountData.length && (
                <DataGrid
                  rows={resouceCountData}
                  // rows={[]}
                  columns={getColumns({ onChangeSelect, technologySkills })}
                  pageSize={5}
                  onCellClick={handleCellClick}
                  getRowId={({ _id }) => _id}
                  key="_id"
                  components={{
                    NoRowsOverlay: NoRowOverlay,
                  }}
                />
              )}
            </div>

            <div className="resource-cont-costing">
              <h4 className="inline-cost">Costing: $1000</h4>
              <h4 className="inline-cost">Expected Timeline: $1000</h4>
              <h4 className="inline-cost">Actual Timeline: $1000</h4>
            </div>
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
