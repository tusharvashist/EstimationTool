import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "../estimation-detail/estimation-detail.css";
import React, { useState, useEffect } from "react";
import useLoader from "../../shared/layout/hooks/useLoader";
import counting from "../../assests/team.png";
import RoleCount from "./RoleCount";
import ResourceMixService from "../resourcemix/resourcecount.service";
import { DataGrid } from "@mui/x-data-grid";
import RoleEditCount from "./RoleEditCount";
import { Select, MenuItem } from "@material-ui/core";
//import { getResourceCount } from "../../../../backend/service/estimationResourceCountService";
import ResourceMix from "../resourcemix/resourcecount.service";
const ResourceCountMatrix = (props) => {
  const popupCount = () => {};
  const [technologySkills, setTechnolnogySkills] = useState();
  const [selectedTechnology, setSelectedTechnology] = useState();
  const [openEditCount, setOpenEditCount] = useState(false);
  const [resouceCountData, setResouceCountData] = useState([]);
  const [estimationHeaderId, setestimationHeaderId] = useState(props.data);
  const [rowEditData, setRowEditData] = useState([]);

  useEffect(() => {
    getTechnologySkill();
    getResourceCountData(estimationHeaderId);
  }, []);

  // Get All Technology Skills

  const getTechnologySkill = () => {
    ResourceMixService.getAllTechnologies()
      .then((res) => {
        setTechnolnogySkills(res.data.body);
      })
      .catch((err) => {});
  };

  // Get Resource Count

  const getResourceCountData = (estimationHeaderId) => {
    ResourceMixService.getResourceCount(estimationHeaderId)
      .then((res) => {
        getResourceCountAllData(estimationHeaderId);
      })
      .catch((err) => {});
  };

  // Get All Resource Count Data

  const getResourceCountAllData = (estimationHeaderId) => {
    ResourceMixService.getResourceCountAll(estimationHeaderId)
      .then((res) => {
        console.log("all Data", res.data.body);
        setResouceCountData(res.data.body);
        // setTechnolnogySkills(res.data.body);
      })
      .catch((err) => {});
  };

  //console.log("technologySkills",technologySkills)
  const getColumns = ({ onChangeSelect, technologySkills }) => [
    { headerName: "Resource Count", field: "resourceCount", width: 180 },
    {
      headerName: "Skills(Effort & summary Attribute)",
      field: "skill",
      width: 200,
      valueFormatter: (params) => {
        const { row } = params,
          { estAttributeId, estCalcId } = row,
          { calcAttributeName = "" } = estCalcId || {},
          { attributeName = "" } = estAttributeId || {};
        return attributeName || calcAttributeName;
      },
    },
    {
      headerName: "Technologies",
      field: "techskill",
      width: 200,
      renderCell: (rowdata) => {
        console.log("technologySkills", technologySkills);
        return (
          <Select
            style={{ width: "100%" }}
            onChange={(e) => onChangeSelect(e, rowdata)}
            //  value={technologySkills.id}
            //   label={technologySkills.skill}

            required
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
    return <RoleCount data={params.value} />;
  }

  function handleCellClick(param) {
    if (param.field === "role" && !openEditCount) {
      console.log("this");
      setRowEditData(param.value);
      setOpenEditCount(true);
    } else if (param.field === "role" && openEditCount) {
      console.log("that");
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
    const tableDiv = document.querySelector(".estimation-detail-count-table");
    if (tableDiv.classList.contains("close-resourceCountTable")) {
      tableDiv.classList.remove("close-resourceCountTable");
      tableDiv.classList.add("open");
    } else {
      tableDiv.classList.add("close-resourceCountTable");
      tableDiv.classList.remove("open");
    }
  };

  const onChangeSelect = (e, rowData) => {
    console.log("selected", e.target.value, rowData);
    const techId = e.target.value;
    const { row } = rowData,
      { estAttributeId } = row,
      { _id } = estAttributeId || {};
    const req = {
      _id: row._id,
      estAttributeId: _id || null,
      estHeaderId: row.estHeaderId,
      resourceCount: row.resourceCount,
      techSkill: techId,
    };

    ResourceMixService.updateTechnology(req)
      .then((res) => {
        console.log("update technology", res.data.body);
      })
      .catch((err) => {});
  };

  return (
    <div className="estimation-detail-cover">
      <div className="estimation-detail-count-table close-resourceCountTable">
        <BorderedContainer className="count-box-shadow roleCountInputParent">
          {openEditCount && <RoleEditCount rowEditData={rowEditData} />}
          <div style={{ height: 300, width: "100%" }}>
            {resouceCountData.length && (
              <DataGrid
                rows={resouceCountData}
                columns={getColumns({ onChangeSelect, technologySkills })}
                pageSize={5}
                onCellClick={handleCellClick}
                getRowId={({ _id }) => _id}
                key="_id"
              />
            )}
          </div>

          <div className="resource-cont-costing">
            <h4>Costing: $1000</h4>
            <h4 className="inline-cost">Expected Timeline: $1000</h4>
            <h4 className="inline-cost">Actual Timeline: $1000</h4>
          </div>
        </BorderedContainer>
      </div>
      <div className="estimation-detail-button-container">
        <button
          onClick={handleCountTable}
          className="estimation-detail-count-button"
        >
          <img src={counting} />
        </button>
      </div>
    </div>
  );
};

export default ResourceCountMatrix;
