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
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";
import {
  setEstimationName,
  setEstimationType,
  setEstimationTypeId,
  setEfforUnit,
  setEsttimationDesc,
  setEstimationHeaderId,
} from "../../Redux/basicDetailRedux";
import { setProjectId } from "../../Redux/projectRedux";
import AddRequirements from "../estimationDetail/AddRequirements";

export default function ClientDetails(props) {
  const history = useHistory();
  const roleState = useSelector((state) => state.role);
  const projectState = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const location = useLocation();

  let projectId;

  if (location.state !== undefined) {
    projectId = location.state.projectId;
    dispatch(setProjectId(location.state.projectId));
  } else {
    projectId = projectState.projectId;
  }

  // let projectIdForFun;

  // const checkUrl = () => {
  //   if (location.state == undefined) {
  //     console.log("comeback");
  //     // console.log(location);
  //     if (pastProjectId !== undefined) {
  //       projectIdForFun = pastProjectId[0];
  //     } else {
  //     }

  //     // console.log(projectIdForFun);
  //     console.log("pastProjectId----", pastProjectId[0]);
  //   } else {
  //     projectIdForFun = location.state.projectId;
  //   }
  // };

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
    getProjectById();
  }, []);

  const getProjectById = () => {
    ProjectSer.getProjectById(projectId)
      .then((res) => {
        let dataResponse = res.data.body;
        setProjectDetails({ ...dataResponse });
        setClientDetails({ ...dataResponse.client });
        setTableDataWithoutFilter([...dataResponse.estimates]);
        setTableData(
          dataResponse.estimates.filter((el) => el.isDeleted === false)
        );
      })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history.push(url);
        // }
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

  const [projectStatus, setProjectStatus] = useState([
    { title: "All" },
    { title: "Active" },
    { title: "In-Active" },
  ]);

  const filterEstimation = (value) => {
    switch (value) {
      case "Active":
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
    setTableData(filterEstimation(event.target.value));
  };

  const createEstimationHandle = () => {
    dispatch(setEstimationTypeId(""));
    dispatch(setEsttimationDesc(""));
    dispatch(setEstimationType(""));
    dispatch(setEstimationName(""));
    dispatch(setEfforUnit(""));
    dispatch(setEstimationHeaderId(""));
    localStorage.setItem("estimationHeaderId", "");
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
                <a target="_blank" href={`//${clientDetails.website}`}>
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
          <Grid container alignItems="center">
            <Grid item xs={7}>
              <Box sx={{ maxWidth: 200 }}>
                <FormControl width="300px">
                  <InputLabel id="client-simple-select">
                    Estimation Status{" "}
                  </InputLabel>

                  <Select
                    labelId="client-simple-select"
                    id="client-simple-select"
                    value={projectStatus.title}
                    label={projectStatus.title}
                    defaultValue={"Active"}
                    onChange={getDropDownvalue}
                  >
                    {projectStatus.map((item) => (
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
            <Grid
              item
              style={{ textAlign: "right", paddingRight: "10px" }}
              xs={3}
            >
              <Link
                to={{
                  pathname:
                    "/All-Clients/" +
                    clientDetails.clientName +
                    "/" +
                    projectDetails.projectName +
                    "/createRequirements",
                  state: {
                    clientInfo: clientDetails,
                    projectInfo: projectDetails,
                    estimationHeaderId: "",
                  },
                }}
              >
                <Button onClick={createEstimationHandle} variant="outlined">
                  {" "}
                  <AddIcon />
                  Create Requirements
                </Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
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
                    estimationHeaderId: "",
                  },
                }}
              >
                <Button onClick={createEstimationHandle} variant="outlined">
                  {" "}
                  <AddIcon />
                  Create Estimation
                </Button>
              </Link>
            </Grid>
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
