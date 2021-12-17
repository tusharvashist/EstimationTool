import React, { useEffect, useState } from "react";
import "./RoleCount.css";
import ResourceCountService from "./resourcecount.service";

const RoleCount = (props) => {
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    getResourceMasterRoleData(props.row._id);
  }, [props.row._id, props.reload]);

  const getResourceMasterRoleData = (resourceCountId) => {
    ResourceCountService.getResourceMasterRole(resourceCountId)
      .then((res) => {
        setRoleData(res.data.body);
      })
      .catch((err) => {});
  };

  return (
    <React.Fragment>
      <div className="role">
        {roleData.map((el) => (
          <span key={el._id}>
            {el.count} {el.resourceRole},
          </span>
        ))}
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
