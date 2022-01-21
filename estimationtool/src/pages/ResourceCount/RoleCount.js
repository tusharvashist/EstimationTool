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
        console.log("rr", res.data);
        if (res.data.body.length == 0) {
          setRoleData([
            {
              count: "No technology Selected",
              _id: 0,
            },
          ]);
        } else {
          setRoleData(res.data.body);
        }
      })
      .catch((err) => {});
  };

  console.log("count", roleData);

  return (
    <React.Fragment>
      <div className="role">
        {roleData.map((el) => (
          <span key={el._id}>
            {typeof el.count === "string" ? (
              <i className="notech">{el.count}</i>
            ) : (
              `${el.count} ${el.resourceRole},`
            )}
          </span>
        ))}
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
