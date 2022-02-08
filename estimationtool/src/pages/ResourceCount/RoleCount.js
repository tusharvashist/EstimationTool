import React, { useEffect, useState } from "react";
import "./RoleCount.css";
import ResourceCountService from "./resourcecount.service";

const RoleCount = (props) => {
  console.log("props rolecount", props);
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    //getResourceMasterRoleData(props.row._id);
    setRoleDataFn();
  }, [props.row._id, props]);

  const getResourceMasterRoleData = (resourceCountId) => {
    ResourceCountService.getResourceMasterRole(resourceCountId)
      .then((res) => {
        console.log("rr", res.data);
        if (res.data.body.length == 0) {
          if (!props.row.skills) {
            setRoleData([
              {
                count: "Please select technology",
                _id: 0,
              },
            ]);
          } else {
            setRoleData([
              {
                count: "No Resource available",
                _id: 0,
              },
            ]);
          }
        } else {
          setRoleData(res.data.body);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setRoleDataFn = () => {
    if (!props.row.skillsId) {
      setRoleData([
        {
          count: "Please select technology",
          _id: 0,
        },
      ]);
    } else {
      if (props.row.rolecount.length == 0) {
        setRoleData([
          {
            count: "No Resource available",
            _id: 0,
          },
        ]);
      } else {
        setRoleData(props.row.rolecount);
      }
    }
  };

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
