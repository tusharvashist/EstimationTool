import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "../estimation-detail/estimation-detail.css";
import React, { useState, useEffect } from "react";

import RoleEditCount from "./RoleEditCount";

import ReourceCountService from "./resourcecount.service";

import { MdOutlineManageAccounts } from "react-icons/md";

import usePermission from "../../shared/layout/hooks/usePermissions";
import Snackbar from "../../shared/layout/snackbar/Snackbar";
import ResourceCountGrid from "./ResourceCountGrid";

const ResourceCountMatrix = (props) => {
  const [tableOpen, setTableOpen] = useState(false);

  const [technologyList, setTechnolnogySkills] = useState();
  const [openEditCount, setOpenEditCount] = useState(false);
  const [resouceCountData, setResouceCountData] = useState([]);
  const [estimationHeaderId, setestimationHeaderId] = useState(props.data);
  const [rowEditData, setRowEditData] = useState([]);

  const [techError, setTechError] = useState({});

  const [sortModel, setSortModel] = React.useState([
    {
      field: "resourceCount",
      sort: "asc",
    },
  ]);
  const { estimation_resourcecount_edit } = usePermission();

  let refresh = props.refresh;

  useEffect(() => {
    getTechnologySkill();
    getResourceCountData();

    if (tableOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [tableOpen, refresh]);

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
        if (res.data.body.length > 0) {
          props.errorFunction(
            res.data.body.some((el) => el.validationerror === true)
          );
        } else {
          props.errorFunction(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCellClick(param) {
    console.log("onchange resouceCountData param", param);
    if (param.row.skillsId) {
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

  const handleValidationOnUpdate = (update) => {
    let newResourceCountData = resouceCountData.map((el) => {
      if (el._id === update.data.body._id) {
        el.validationerror = update.data.body.validationerror;
      }
      return el;
    });
    props.errorFunction(update.data.body.validationerror);
    setResouceCountData(newResourceCountData);
  };

  const handleEditChange = (newRolecount, resourceId) => {
    let newResourceCountData = resouceCountData.map((stateRow) => {
      if (stateRow._id === resourceId) {
        stateRow.rolecount = newRolecount;
      }
      return stateRow;
    });
    setResouceCountData(newResourceCountData);
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
        let newResourceCountData = resouceCountData.map((stateRow) => {
          if (stateRow._id === row._id) {
            stateRow.rolecount = res.data.body;
            stateRow.skillsId = techId;
          }
          return stateRow;
        });
        setResouceCountData(newResourceCountData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("onchange resouceCountData", resouceCountData);

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

                  {estimation_resourcecount_edit &&
                    rowEditData.rolecount.length > 0 && (
                      <RoleEditCount
                        rowEditData={rowEditData}
                        handleEditChange={handleEditChange}
                        handleValidationOnUpdate={handleValidationOnUpdate}
                      />
                    )}
                </>
              )}
              <ResourceCountGrid
                estimation_resourcecount_edit={estimation_resourcecount_edit}
                resouceCountData={resouceCountData}
                handleCellClick={handleCellClick}
                sortModel={sortModel}
                setSortModel={setSortModel}
                onChangeSelect={onChangeSelect}
                setTechError={setTechError}
                technologyList={technologyList}
              />
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
