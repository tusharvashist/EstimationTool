import React, { useState, useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";
import "./breadcrum.css";

export default function Breadcrum() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState({
    path: "",
    title: "",
  });
  const routeList = [
    { path: "estimation", title: "Estimation" },
    { path: "allclient", title: "All Client" },
    { path: "project", title: "Project" },
    { path: "clientdetails", title: "Client Detail" },
    { path: "projectdetails", title: "Project Detail" },
    { path: "create-estimation", title: "Create Estimation" },
  ];

  useEffect(() => {
    let currentPath = location.pathname.split("/")[1];
    getBreadcrumbsTitle(currentPath);
  }, [location]);

  let getBreadcrumbsTitle = (currentPath) => {
    let getbreadcrumb = routeList.find((itm, idx, arr) => {
      return itm.path === currentPath;
    });
    setBreadcrumbs({ ...getbreadcrumb });

    console.log("currentPath>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", breadcrumbs);
  };

  return (
    <Grid container alignItems="center" className="breadcrumb-wrp">
      <Breadcrumbs
        aria-label="breadcrumb"
        className="breadcrumb-item"
        separator="/"
      >
        <p> {breadcrumbs.title} </p>
      </Breadcrumbs>
    </Grid>
  );
}
