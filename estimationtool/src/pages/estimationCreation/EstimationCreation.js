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
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import estimationServices from "../allestimation/allestimation.service";

const steps = ["Basic Detail", "Effort Attributes", "Calculated Attributes"];

const EstimationCreation = (props) => {
  console.log(props);
  const basicDetailRedux = useSelector((state) => state.basicDetail);
  const dispatch = useDispatch();
  const effortAttributeSave = useSelector((state) => state.effortAttribute);
  const calcAttributeSave = useSelector((state) => state.calcAttribute);

  const location1 = useLocation();
  const [location, setLocation] = React.useState(location1);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const clientInfo = { ...location1.state.clientInfo };
  const projecttInfo = { ...location1.state.projectInfo };
  const [estimationHeaderId, setEstimationHeaderId] = React.useState();

  const childRef = useRef();

  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  useEffect(() => {
    setLocation(location);
  }, [clientInfo]);

  // save Estimation Basic detail data to post request to generating estimation header APi
  const createEstimationBasicDetail = (reqData) => {
    estimationServices
      .saveEstimationBasicDetail(reqData)
      .then((res) => {
        let dataResponce = res.data.body;
        console.log(
          "Save Basic Details APi response:" + JSON.stringify(dataResponce)
        );
        setEstimationHeaderId(dataResponce._id);
        // dispatch(setEstimationHeaderId(dataResponce._id))
        //TODO:// show response and move next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((err) => {
        console.log("save estimation header detail error : ", err);
        childRef.current.showError(err);
      });
  };

  // update estimation basic detals Api call
  const updateEstimationBasicDetail = (reqData) => {
    estimationServices
      .updateEstimationBasicDetail(estimationHeaderId, reqData)
      .then((res) => {
        let dataResponce = res.data.body;
        // dispatch(setEstimationHeaderId(dataResponce._id))
        console.log(
          "Update Basic Details APi response:" + JSON.stringify(dataResponce)
        );
        setEstimationHeaderId(dataResponce._id);
        //TODO:// show response and move next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((err) => {
        console.log("Update estimation header detail error : ", err);
        childRef.current.showError(err);
      });
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    //TODO: handle edit basic detail API & error
    if (activeStep == 0) {
      handleBasicDetailSaveUpdate();
    } else if (activeStep == 1) {
      handleSaveEffortAttribute();
     } else if (activeStep == 2) {
      handleSaveCalcAttribute();
     }
     else {
      //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

const handleSaveCalcAttribute = () => {
  if (calcAttributeSave.data) {
    createSaveCalctAttribute(getCalcAttributeRequestPayload()) 
   }
}

  const handleSaveEffortAttribute = () => {
    if (effortAttributeSave.data) {
     createSaveEffortAttribute(getEffortAttributeRequestPayload()) 
    }
  }


  // Save calc attribute data

  const createSaveCalctAttribute = (reqData) => {
  
    estimationServices.saveCalculativeAttribute(reqData)
      .then((res) => {
        let dataResponce = res.data.body;
       //TODO:// show response and move next step
      })
      .catch((err) => {
        // console.log("save estimation header detail error : ", err);
        // childRef.current.showError(err);
      });
    };
  // save effort Attribute data 
const createSaveEffortAttribute = (reqData) => {
  
  estimationServices.saveEffortAttribute(reqData)
    .then((res) => {
      let dataResponce = res.data.body;
      setEstimationHeaderId(dataResponce._id);
     //TODO:// show response and move next step
    })
    .catch((err) => {
      // console.log("save estimation header detail error : ", err);
      // childRef.current.showError(err);
    });
};


const getEffortAttributeRequestPayload = () =>{
  return {
    estattlist : effortAttributeSave.data
  }
}


const getCalcAttributeRequestPayload = () =>{
  return {
    estattcalclist : calcAttributeSave.data
  }
}


  const handleBasicDetailSaveUpdate = () => {
    if (
      projecttInfo._id &&
      basicDetailRedux.estimationName &&
      basicDetailRedux.estimationTypeId &&
      basicDetailRedux.esttimationDesc &&
      basicDetailRedux.efforUnit
    ) {
      estimationHeaderId
        ? updateEstimationBasicDetail(getRequestPayload())
        : createEstimationBasicDetail(getRequestPayload());
    } else {
      console.log("Please fill all mandatory fields");
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
      manCount: 0,
      contigency: "25",
      totalCost: 0,
      estCalcColumns: "NA",
      estColumns: "NA",
      isDeleted: false,
    };
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                <a target="_blank" href={clientInfo.website}>
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
                  ref={childRef}
                />
              )}
              {activeStep == 1 && (
                <SecondStep
                  estimatioHeaderId={estimationHeaderId}
                  estimationTypeId={basicDetailRedux.estimationTypeId}
                />
              )}
              {activeStep == 2 && (
                <ThirdStep
                  estimatioHeaderId={estimationHeaderId}
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

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          </>
        )}
      </Box>
    </BorderedContainer>
  );
};

export default EstimationCreation;
