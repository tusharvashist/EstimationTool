import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "../estimation-detail/estimation-detail.css";
import React, { useState, useEffect } from "react";
import useLoader from "../../shared/layout/hooks/useLoader";
import counting from "../../assests/team.png";
import RoleCount from "../../shared/layout/PopTable/RoleCount";
import ResourceMixService from "../resourcemix/resourcecount.service";
import { DataGrid } from "@mui/x-data-grid";
import RoleEditCount from "./RoleEditCount";

const ResourceCountMatrix = (props) => {
  const estimationHeaderId = props.data;

  const popupCount = () => {};
  const [technologySkills, setTechnolnogySkills] = useState();
  const [selectedTechnology, setSelectedTechnology] = useState();
  const [openEditCount, setOpenEditCount] = useState(false);
  const [rowEditData, setRowEditData] = useState();

  // useEffect(() => {
  //   if (estimationHeaderId) {
  //     getTechnologySkill();
  //   }
  // }, []);

  // Get All Technology Skills

  // const getTechnologySkill = () => {
  //   ResourceMixService.getAllTechnologies()
  //     .then((res) => {
  //       console.log("technology skills ", res.data.body);
  //       setTechnolnogySkills(res.data.body);
  //     })
  //     .catch((err) => {});
  // };

  const columns = [
    { headerName: "Resource Count", field: "count", width: 180 },
    {
      headerName: "Skills(Effort & summary Attribute)",
      field: "skill",
      width: 200,
    },
    {
      headerName: "Technologies",
      field: "technology",
      width: 200,
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
      count: 2,
      skill: "Frontend",
      technology: "React/Angular",
      role: [1, 0, 0],
    },
    {
      id: 2,
      count: 2,
      skill: "Frontend",
      technology: "React/Angular",
      role: [2, 0, 0],
    },
    {
      id: 3,
      count: 2,
      skill: "Frontend",
      technology: "React/Angular",
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

  return (
    <div className="estimation-detail-cover">
      <div className="estimation-detail-count-table close-resourceCountTable">
        <BorderedContainer className="count-box-shadow roleCountInputParent">
          {openEditCount && (
            <RoleEditCount
              openEditCount={openEditCount}
              rowEditData={rowEditData}
            />
          )}
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={rowData}
              columns={columns}
              pageSize={5}
              onCellClick={handleCellClick}
            />
          </div>
          {/* <MaterialTable
            style={{ boxShadow: "none" }}
            title="Resource Count"
            columns={columns}
            options={{
              search: false,
              tableLayout: "auto",
              paging: false,
            }}
            data={technologySkills}
          /> */}
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
