import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Grid,
  ListItem

} from "@material-ui/core";
import React,  { useState, useEffect } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import estimationServices from "../allestimation/allestimation.service"

// import {
//   useForm,
//   Controller,
//   FormProvider,
//   useFormContext,
// } from "react-hook-form";

const steps = ["Basic Detail", "Effort Attributes", "Calculated Attributes"];

const EstimationCreation = (props) => {
  const basicDetailRedux = useSelector((state) => state.basicDetail);

  const location1 = useLocation();
  const [location, setLocation] = React.useState(location1);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const clientInfo = {...location1.clientInfo }
  //const [clientInfo, setClientInfo] = React.useState({...useLocation().clientInfo });
  const projecttInfo  = {...location1.projectInfo }
  //const [projecttInfo, setProjectInfo] = React.useState({...useLocation().projecttInfo });

  // const basicDetails = useForm({
  //   defaultValues: {
  //     estTypeId: '',
  //     estTypeName: '',
  //     effortUnit: '',
  //     estName: '',
  //     estDesc: ''
  //   },
  // });
  
  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  useEffect(() => {
    setLocation(location)
    //setClientInfo(location.clientInfo);
    //setProjectInfo(location.projectInfo);
  }, [clientInfo]);

// send Estimation Basic detail data to post request to generating estimation header APi
const postEstimationBasicDetail = (reqData) => {
  estimationServices.saveEstimationBasicDetail(reqData)
    .then((res) => {
      let dataResponce = res.data.body;
      console.log("Save Basic Details APi response:" +JSON.stringify(dataResponce));
     //TODO:// show response and move next step
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    })
    .catch((err) => {
      console.log("get master estimation types", err);
    });
};

  const handleNext = () => {
     console.log("data@@"+console.log("current step"+activeStep));
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if(activeStep == 0){
      console.log("current step"+activeStep+ 
      "Estimation Name: "+ basicDetailRedux.estimationName+ "estimationTypeId: "+ basicDetailRedux.estimationTypeId + "estimationName: "
      +basicDetailRedux.estimationType + "efforUnit: "+basicDetailRedux.efforUnit + "estimationDesc :" + basicDetailRedux.esttimationDesc+
      "projectId: "+  projecttInfo._id );

      if(projecttInfo._id && basicDetailRedux.estimationName && basicDetailRedux.estimationTypeId && basicDetailRedux.esttimationDesc
        && basicDetailRedux.efforUnit){ 
          postEstimationBasicDetail({
        "estheaderParentid": "-1",
        "estVersionno": "1",
        "projectId" : projecttInfo._id,
        "estName" : basicDetailRedux.estimationName,
        "estTypeId": basicDetailRedux.estimationTypeId,
        "estDescription": basicDetailRedux.esttimationDesc,
        "effortUnit": basicDetailRedux.efforUnit,
        "manCount": 0,
        "contigency": "25",
        "totalCost": 0,
        "estCalcColumns": "NA",
        "estColumns": "NA",
        "isDeleted": false
           });
      } else{
        
      }
    }

    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ListItem>Client Name: {clientInfo.clientName}</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Client Website: <a target="_blank" href={clientInfo.website} >{clientInfo.website} </a></ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Project Name:{projecttInfo.projectName}</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Business Domain: {projecttInfo.domain}</ListItem>
          </Grid>
        </Grid>
      </BorderedContainer>

      

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
          {/* <FormProvider {...basicDetails}>
            <form onSubmit={basicDetails.handleSubmit(handleNext)} > */}
            <React.Fragment>
            {activeStep == 0 && 
                <FirstStep 
                 clientName={clientInfo.clientName}
                 projectName={projecttInfo.projectName}
                // next={handleNext}

                 />}
                {activeStep == 1 && <SecondStep />}
                {activeStep == 2 && <ThirdStep />}

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

              <Button 
              onClick={handleNext} >
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
