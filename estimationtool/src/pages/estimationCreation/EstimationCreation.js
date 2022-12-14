import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Grid,
  ListItem,
  FormControl,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import estimationServices from "../allestimation/allestimation.service";
import "./EstimationCreation.css";
import Snackbar from "../../shared/layout/snackbar/Snackbar";
import { useHistory } from "react-router-dom";
import useLoader from "../../shared/layout/hooks/useLoader";
import { setEstimationHeaderId } from "../../Redux/basicDetailRedux";
import { setEstHeaderId } from "../../Redux/estimationHeaderId";

const steps = ["Basic Detail", "Effort Attributes", "Calculated Attributes"];

const EstimationCreation = (props) => {
  const basicDetailRedux = useSelector((state) => state.basicDetail);
  const reduxEstimationHeaderId = useSelector(
    (state) => state.estimationHeaderId
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const effortAttributeSave = useSelector((state) => state.effortAttribute);
  const calcAttributeSave = useSelector((state) => state.calcAttribute);

  const location1 = useLocation();
  const [location, setLocation] = React.useState(location1);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const clientInfo = { ...location1.state.clientInfo };
  const projecttInfo = { ...location1.state.projectInfo };

  let estionHeaderId;

  if (location1.state.estimationHeaderId) {
    estionHeaderId = location1.state.estimationHeaderId;
  } else {
    estionHeaderId = basicDetailRedux.estimationHeaderId;
  }

  const [estimationHeaderId, setNewEstimationHeaderId] =
    React.useState(estionHeaderId);
  const [estimationIdFinish, setEstimationIdFinish] = React.useState();
  const [isOpen, setOpen] = React.useState({});
  const [loaderComponent, setLoader] = useLoader();

  const getHeaderIdChild = (p) => {
    setEstimationIdFinish(p);
    setNewEstimationHeaderId(p);
  };

  const finishLocation = {
    pathname:
      "/All-Clients/" +
      clientInfo.clientName +
      "/" +
      projecttInfo.projectName +
      "/Estimation-Detail",
    state: {
      estId: estimationIdFinish,
    },
  };

  const handleClose = () => {
    setOpen({});
  };
  const childRef = useRef();

  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  useEffect(() => {
    setLocation(location);
    setNewEstimationHeaderId(estionHeaderId);

    if (location1.state.step !== undefined && location1.state.step === "2") {
      setActiveStep(2);
    } else if (
      location1.state.step !== undefined &&
      location1.state.step === "1"
    ) {
      setActiveStep(1);
    }
  }, location1.state.estimationHeaderId);

  // save Estimation Basic detail data to post request to generating estimation header APi
  const createEstimationBasicDetail = (reqData) => {
    setLoader(true);
    estimationServices
      .saveEstimationBasicDetail(reqData)
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;

        setNewEstimationHeaderId(dataResponce._id);
        dispatch(setEstimationHeaderId(dataResponce._id));
        dispatch(setEstHeaderId(dataResponce._id));
        localStorage.setItem("estimationHeaderId", dataResponce._id);
        // show response and move next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message || err.message,
        });
      });
  };

  // update estimation basic detals Api call
  const updateEstimationBasicDetail = (reqData) => {
    setLoader(true);

    estimationServices
      .updateEstimationBasicDetail(estimationHeaderId, reqData)
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;

        setNewEstimationHeaderId(dataResponce._id);
        dispatch(setEstimationHeaderId(dataResponce._id));
        localStorage.setItem("estimationHeaderId", dataResponce._id);

        // show response and move next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const handleSaveCalcAttribute = () => {
    if (calcAttributeSave.data.length !== 0) {
      createSaveCalctAttribute(getCalcAttributeRequestPayload());
    } else {
      setOpen({
        open: true,
        severity: "error",
        message: "Select Atleast One checkbox",
      });
    }
  };

  const handleSaveEffortAttribute = () => {
    if (effortAttributeSave.data.length !== 0) {
      createSaveEffortAttribute(getEffortAttributeRequestPayload());
    } else {
      setOpen({
        open: true,
        severity: "error",
        message: "Please select atleast one checkbox",
      });
    }
  };

  // Save calc attribute data

  const createSaveCalctAttribute = (reqData) => {
    setLoader(true);

    estimationServices
      .saveCalculativeAttribute(reqData)
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        history.push(finishLocation);
      })
      .catch((err) => {
        if (err.response.data.status == 400) {
          setOpen({
            open: true,
            severity: "error",
            message: err.response.data.message || err.message,
          });
        }
      });
  };
  // save effort Attribute data
  const createSaveEffortAttribute = (reqData) => {
    setLoader(true);

    estimationServices
      .saveEffortAttribute(reqData)
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        setNewEstimationHeaderId(dataResponce._id);
        // show response and move next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((err) => {});
  };

  const getEffortAttributeRequestPayload = () => {
    return {
      estattlist: effortAttributeSave.data,
    };
  };

  const getCalcAttributeRequestPayload = () => {
    console.log("calcAttributeSave", calcAttributeSave);
    let arr = calcAttributeSave.data.map((item) => {
      return {
        ...item,
        tag: item.tag._id,
        formulaTags: item.formulaTags
          ? item.formulaTags.map((x) => x._id).slice()
          : [],
      };
    });
    return {
      estattcalclist: arr,
    };
  };

  console.log("basicDetailRedux", basicDetailRedux);

  const handleBasicDetailSaveUpdate = () => {
    if (
      projecttInfo._id &&
      basicDetailRedux.estimationName &&
      basicDetailRedux.estimationTypeId &&
      basicDetailRedux.esttimationDesc &&
      basicDetailRedux.efforUnit &&
      basicDetailRedux.estimationLocations.length > 0 &&
      Number(basicDetailRedux.estimationTentativeTimeline) > 0 &&
      Number(basicDetailRedux.estimationContingency) > 0 &&
      Number(basicDetailRedux.estimationContingency) <= 100
    ) {
      estimationHeaderId
        ? updateEstimationBasicDetail(getRequestPayload())
        : createEstimationBasicDetail(getRequestPayload());
    } else {
      childRef.current.showError("Please fill all mandatory fields");
    }
  };
  
  const getRequestPayload = () => {
    return {
      estheaderParentid: "-1",
      estVersionno: "1",
      projectId: projecttInfo._id,
      estName: basicDetailRedux.estimationName,
      estTypeId: basicDetailRedux.estimationTypeId,
      estDescription: basicDetailRedux.esttimationDesc,
      effortUnit: basicDetailRedux.efforUnit,
      estTentativeTimeline: basicDetailRedux.estimationTentativeTimeline,
      locations: basicDetailRedux.estimationLocations.map((el) => el._id),
      manCount: 0,
      contingency: basicDetailRedux.estimationContingency,
      totalCost: 0,
      estCalcColumns: "NA",
      estColumns: "NA",
      isDeleted: false,
    };
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    // handle edit basic detail API & error
    if (activeStep == 0) {
      handleBasicDetailSaveUpdate();
    } else if (activeStep == 1) {
      handleSaveEffortAttribute();
    }
    return;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    handleSaveCalcAttribute();
  };

  console.log(estimationHeaderId, estimationIdFinish);
  const { message, severity, open } = isOpen || {};

  return (
    <BorderedContainer>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <BorderedContainer className="no-shadow">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <ListItem>Client Name: {clientInfo.clientName}</ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>
                Client Website:&nbsp;
                <a target="_blank" href={`//${clientInfo.website}`}>
                  {clientInfo.website}
                </a>
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>Project Name: {projecttInfo.projectName}</ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem>Business Domain: {projecttInfo.domain}</ListItem>
            </Grid>
          </Grid>
        </BorderedContainer>

        {activeStep != 0 && (
          <BorderedContainer className="no-shadow">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <div className="field-width">
                  <FormControl fullWidth>
                    <ListItem>
                      Estimation Name: {basicDetailRedux.estimationName}
                    </ListItem>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="field-width">
                  <FormControl fullWidth>
                    <ListItem>
                      Estimation Type: {basicDetailRedux.estimationType}
                    </ListItem>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={4}>
                <ListItem>Effort Unit: {basicDetailRedux.efforUnit}</ListItem>
              </Grid>
            </Grid>
          </BorderedContainer>
        )}

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <>
            <React.Fragment>
              {activeStep == 0 && (
                <FirstStep
                  clientName={clientInfo.clientName}
                  projectName={projecttInfo.projectName}
                  estimationHeaderId={estimationHeaderId}
                  ref={childRef}
                />
              )}
              {activeStep == 1 && (
                <SecondStep
                  estimatioHeaderId={basicDetailRedux.estimationHeaderId}
                  estimationTypeId={basicDetailRedux.estimationTypeId}
                  // ref={secondChildRef}
                />
              )}
              {activeStep == 2 && (
                <ThirdStep
                  getHeaderId={getHeaderIdChild}
                  estimatioHeaderId={basicDetailRedux.estimationHeaderId}
                  estimationTypeId={basicDetailRedux.estimationTypeId}
                />
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleFinish}> Finish</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </React.Fragment>
          </>
        )}
      </Box>
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      )}
    </BorderedContainer>
  );
};

export default EstimationCreation;
