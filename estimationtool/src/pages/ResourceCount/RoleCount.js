import React, { useEffect, useState } from "react";
import "./RoleCount.css";
import ResourceCountService from "./resourcecount.service";

const RoleCount = (props) => {
  console.log("roleCount props", props);
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    getResourceMasterRoleData(props.row._id);
  }, [props.row._id]);

  const getResourceMasterRoleData = (resourceCountId) => {
    ResourceCountService.getResourceMasterRole(resourceCountId)
      .then((res) => {
        setRoleData(res.data.body);
      })
      .catch((err) => {});
  };

  // getResourceMasterRoleData(props.row._id);

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
