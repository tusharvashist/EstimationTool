import React, { useState, useEffect } from "react";
import ProjectSer from "./project-details.service";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import ProjectEstimationsGridView from "../project/project-estimations";
import "./project-details.css";
import { useParams, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dropdown from "../../shared/ui-view/dropdown/dropdown";

import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const pastProjectId = [];

export default function ClientDetails(props) {
  const location = useLocation();

  let projectIdForFun;

  const checkUrl = () => {
    if (location.state == undefined) {
      console.log("comeback");
      // console.log(location);
      projectIdForFun = pastProjectId[0];
      // console.log(projectIdForFun);
      console.log("pastProjectId----", pastProjectId[0]);
    } else {
      projectIdForFun = location.state.projectId;
    }
  };

  const [clientDetails, setClientDetails] = useState({
    clientName: "",
    description: "",
    website: "",
  });
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectDescription: "",
    businessDomain: "",
  });
  const [headerData, setHeaderData] = useState({
    clientName: "",
    projectName: "",
    website: "",
    domain: "",
  });
  const [tableDataWithoutFilter, setTableDataWithoutFilter] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    checkUrl();
    getProjectById();

    return function cleanup() {
      console.log("cleanup");
      pastProjectId.pop();
      pastProjectId.push(projectIdForFun);
      console.log(pastProjectId);
    };
  }, [projectIdForFun]);

  const getProjectById = () => {
    ProjectSer.getProjectById(projectIdForFun)
      .then((res) => {
        let dataResponse = res.data.body;
        setProjectDetails({ ...dataResponse });
        setClientDetails({ ...dataResponse.client });
        setTableDataWithoutFilter([...dataResponse.estimates]);
        setTableData([...dataResponse.estimates]);
      })
      .catch((err) => {
        console.log("get Client by id error", err);
      });
  };

  const updateHeaderData = (clientName, projectName, website, domain) => {
    setHeaderData({
      clientName: clientName,
      projectName: projectName,
      website: website,
      domain: domain,
    });
  };

  const [clientStatus, setClientStatus] = useState([
    { title: "All" },
    { title: "Active" },
    { title: "In-Active" },
  ]);

  const filterEstimation = (value) => {
    console.log("estimationSelectedState :", value);
    switch (value) {
      case "Active":
        // console.log("set Active data ");
        return tableDataWithoutFilter.filter((op) => op.isDeleted === false);
      case "In-Active":
        // console.log("set In- Active data ");
        return tableDataWithoutFilter.filter((op) => op.isDeleted === true);
      default:
        // console.log("set default data ");
        return tableDataWithoutFilter;
    }
  };

  const getDropDownvalue = (event) => {
    console.log("this is an download vlaue", event.target.value);

    setTableData(filterEstimation(event.target.value));
  };

  return (
    <div className="project-deatils-wrp">
      <Box>
        <Grid container alignItems="center">
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={10} sm={4}>
              <p>
                {" "}
                <span className="title-stl"> Project Name :</span>{" "}
                {projectDetails.projectName}
              </p>
            </Grid>
            <Grid item xs={10} sm={6}>
              <p>
                {" "}
                <span className="title-stl"> Business Domain :</span>{" "}
                {projectDetails.domain}
              </p>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className="block-section"
          >
            <p>
              <span className="section-title"></span>
            </p>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={10} sm={4}>
              <p>
                <span className="title-stl"> Client Name : </span>
                {clientDetails.clientName}
              </p>
            </Grid>
            <Grid item xs={10} sm={6}>
              <p>
                <span className="title-stl"> Client Website :</span>{" "}
                <a target="_blank" href={clientDetails.website}>
                  {clientDetails.website}
                </a>{" "}
              </p>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className="block-section"
          >
            <p>
              <span className="section-title"></span>
            </p>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={5} sm={5}>
              <Box sx={{ maxWidth: 200 }}>
                <FormControl width="300px">
                  <InputLabel id="client-simple-select">
                    Client Status{" "}
                  </InputLabel>

                  <Select
                    labelId="client-simple-select"
                    id="client-simple-select"
                    value={clientStatus.title}
                    label={clientStatus.title}
                    defaultValue={"All"}
                    onChange={getDropDownvalue}
                  >
                    {clientStatus.map((item) => (
                      <MenuItem key={item.title} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {/* <Dropdown
              defaultValue={{ title: "All", value: "All" }}
              title="Estimation status"
              list={clientStatus}
              getVal={getDropDownvalue}
            /> */}
            <Link
              to={{
                pathname:
                  "/All-Clients/" +
                  clientDetails.clientName +
                  "/" +
                  projectDetails.projectName +
                  "/createEstimate",
                state: {
                  clientInfo: clientDetails,
                  projectInfo: projectDetails,
                },
              }}
            >
              <Button variant="outlined">
                {" "}
                <AddIcon />
                Create Estimation
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box p={0} pt={0}>
        <ProjectEstimationsGridView
          tableData1={tableData}
          clientInfo={clientDetails}
          projectInfo={projectDetails}
          refreshData={getProjectById}
        />
      </Box>
    </div>
  );
}
