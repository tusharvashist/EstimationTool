import React from "react";
import "./RoleCount.css";

const RoleCount = (props) => {
  console.log("roleCount props", props);
  // data:
  // calcattributeName: []
  // estHeaderId: "619e3ddb8c705cf78e273c02"
  // resourceCount: 3.19
  // "rolecount": [
  // {
  //   "roleId": "61ae02114fdff5af9831741e",
  //   "role": "Sr Lead",
  //   "count": 1
  //   },
  //   {
  //   "roleId": "61b09ed1eeae6743b7c2a062",
  //   "role": "Lead",
  //   "count": 1
  //  }
  //   ]
  // _id: "61b1eca3908f9aec52593cf1"
  // [[Prototype]]: Object
  // masterData: Array(1)
  // 0:
  // cost: 20
  // count: 0
  // isDeleted: false
  // location: "india"
  // price: 30
  // resourceRole: "Sr Lead"
  // techSkill: "frontend"
  // _id: "61ae02114fdff5af9831741e"
  const countProvider = (id) => {};
  return (
    <React.Fragment>
      <div className="role">
        {props.masterData.map((el) => (
          <span key={el._id}>
            {props.data.rolecount.map((item) => {
              if (el._id === item.roleId) {
                console.log(el, item, "el2");
                return item.count;
              } else {
                return 0;
              }
            })}{" "}
            {el.resourceRole},
          </span>
        ))}
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
