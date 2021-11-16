import * as React from "react";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import "./breadcrum.css";
import { withRouter } from "react-router";


function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const BasicBreadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div role="presentation" onClick={handleClick} className="breadcrumb-wrp">
      <Breadcrumbs aria-label="breadcrumb">
        <Link onClick={() => history.push("/Recent-Estimations")}>
          Dashboard
        </Link>
        {pathnames.map((name, index) => {
          //console.log(name);
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          //console.log(routeTo, isLast);
          return isLast ? (
            <Typography style={{ color: "black" }}>{name}</Typography>
          ) : (
            <Link onClick={() => history.push(routeTo)}>{name}</Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default withRouter(BasicBreadcrumbs);

/**---------End of new code-----------**/
/*********Old code below is to make breadcrumbs hardcoded non linkable */

// import React, { useState, useEffect } from "react";
// import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Link from "@material-ui/core/Link";
// import HomeIcon from "@material-ui/icons/Home";
// import Grid from "@material-ui/core/Grid";
// import { useLocation } from "react-router-dom";
// import "./breadcrum.css";

// export default function Breadcrum() {
//   const location = useLocation();
//   const [breadcrumbs, setBreadcrumbs] = useState({
//     path: "",
//     title: "",
//   });
//   const routeList = [
//     { path: "estimation", title: "Dashboard" },
//     { path: "allclient", title: "All Client" },
//     { path: "project", title: "Project" },
//     { path: "clientdetails", title: "Client Detail" },
//     { path: "projectdetails", title: "Project Detail" },
//     { path: "create-estimation", title: "Create Estimation" },
//   ];

//   useEffect(() => {
//     let currentPath = location.pathname.split("/")[1];
//     getBreadcrumbsTitle(currentPath);
//   }, [location]);

//   let getBreadcrumbsTitle = (currentPath) => {
//     let getbreadcrumb = routeList.find((itm, idx, arr) => {
//       return itm.path === currentPath;
//     });
//     setBreadcrumbs({ ...getbreadcrumb });

//     console.log("currentPath>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", breadcrumbs);
//   };

//   return (
//     <Grid container alignItems="center" className="breadcrumb-wrp">
//       <Breadcrumbs
//         aria-label="breadcrumb"
//         className="breadcrumb-item"
//         separator="/"
//       >
//         <p> {breadcrumbs.title} </p>
//       </Breadcrumbs>
//     </Grid>
//   );
// }
