import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";
import masterServices from "../masterservices/master.service";

import { useSelector, useDispatch } from "react-redux";
import {
  setEstimationName,
  setEstimationType,
  setEstimationTypeId,
  setEfforUnit,
  setEsttimationDesc,
  setEstimationHeaderId,
  setEstimationTentativeTimeline,
  setEstimationContingency,
} from "../../Redux/basicDetailRedux";
import estimationServices from "../allestimation/allestimation.service";
import useLoader from "../../shared/layout/hooks/useLoader";
import Snackbar from "../../shared/layout/snackbar/Snackbar";
import MultiLocationSelection from "./MultiLocationSelction";

const FirstStep = forwardRef((props, ref) => {
  const basicDetailRedux = useSelector((state) => state.basicDetail);
  const dispatch = useDispatch();
  const [characterCount, setCharacterCount] = useState(250);
  const [estTypes, setEstimationTypes] = useState([]);
  const [effortUnitTypes, setEffortUnitTypes] = useState([
    { key: 1, value: "Month" },
    { key: 2, value: "Day" },
    { key: 3, value: "Hour" },
  ]);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  const [clientName, setClientName] = useState();
  const [projectName, setProjectName] = useState();
  const [isEstimationTypeInvalid, setIsEstimationTypeInvalid] = useState(false);
  const [isEffortUnitInvalid, setIsEffortUnitInvalid] = useState(false);
  const [isEstimationNameInvalid, setEstimationNameInvalid] = useState(false);
  const [isDescriptionInvalid, setDescriptionInvalid] = useState(false);
  const [isTentativeTimelineInvalid, setTentativeTimelineInvalid] =
    useState(false);
  const [isContingencyInvalid, setContingencyInvalid] = useState(false);

  const [loaderComponent, setLoader] = useLoader();
  const [isOpen, setOpen] = React.useState({});
  const [isLocationInvalid, setLocationInvalid] = useState(false);

  // Destructing of snackbar
  const { message, severity, open } = isOpen || {};

  useEffect(() => {
    setClientName(props.clientName);
    setProjectName(props.projectName);
    getAllMasterEstimationTypes();
    getEstimationBasicInfo();
  }, []);

  useImperativeHandle(ref, () => ({
    showError(error) {
      handleFieldsError();
    },
  }));

  const handleFieldsError = () => {
    setIsEstimationTypeInvalid(basicDetailRedux.estimationTypeId === "");
    setIsEffortUnitInvalid(basicDetailRedux.efforUnit === "");
    setEstimationNameInvalid(basicDetailRedux.estimationName == "");
    setDescriptionInvalid(basicDetailRedux.esttimationDesc === "");
    setTentativeTimelineInvalid(
      validateTimeline(basicDetailRedux.estimationTentativeTimeline)
    );
    setContingencyInvalid(
      !validateContingency(basicDetailRedux.estimationContingency)
    );
    //handle location error
    handleLocationErrorOnChange();
  };

  const handleLocationErrorOnChange = () => {
    setLocationInvalid(basicDetailRedux.estimationLocations.length <= 0);
  }

  // get estimation basic info
  const getEstimationBasicInfo = () => {
    let estHeaderId = props.estimationHeaderId;
    if (estHeaderId) {
      localStorage.setItem("estimationHeaderId", estHeaderId);
      dispatch(setEstimationHeaderId(estHeaderId));
    }
    if (!estHeaderId) {
      return;
    }
    setLoader(true);

    estimationServices
      .getEstimationBasicDetail(estHeaderId)
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        dispatch(setEstimationTypeId(dataResponce.basicDetails.estTypeId._id));
        dispatch(setEsttimationDesc(dataResponce.basicDetails.estDescription));
        dispatch(
          setEstimationType(dataResponce.basicDetails.estTypeId.estType)
        );
        dispatch(setEstimationName(dataResponce.basicDetails.estName));
        dispatch(setEfforUnit(dataResponce.basicDetails.effortUnit));
        dispatch(setEstimationHeaderId(dataResponce.basicDetails._id));
        dispatch(
          setEstimationTentativeTimeline(
            dataResponce.basicDetails.estTentativeTimeline
          )
        );
        dispatch(
          setEstimationContingency(dataResponce.basicDetails.contingency)
        );
        //set remaining char count
        remainingCharCount(dataResponce.basicDetails.estDescription);
      })
      .catch((err) => {
        console.log("get estimation header detail error : ", err);
      });
  };

  // get all estimation types master list
  const getAllMasterEstimationTypes = () => {
    setLoader(true);
    masterServices
      .getAllEstimationTypes()
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        setEstimationTypes([...dataResponce]);
      })
      .catch((err) => {
        console.log("get master estimation types", err);
      });
  };

  // get the Estimation Type dropdown selected value
  const getEstimationDropDownValue = (event) => {
    let etId = event.target.value; //estimation type object
    dispatch(setEstimationTypeId(etId));
    setIsEstimationTypeInvalid(false);
    generateEstimationName(etId);
  };
  //update the remaining character count limit
  const remainingCharCount = (charString) => {
    var remainingCharLimit = 250 - charString.length;
    setCharacterCount(remainingCharLimit);
    dispatch(setEsttimationDesc(charString));
    setDescriptionInvalid(charString.length > 0 && remainingCharLimit == 250);
  };

  //tentative timeline value
  const tentaiveTimelineInputValue = (timelineInput) => {
    dispatch(setEstimationTentativeTimeline(timelineInput));
    setTentativeTimelineInvalid(validateTimeline(timelineInput));
  };

  //Estimation Name value
  const estimationNameInputValue = (estName) => {
    dispatch(setEstimationName(estName));
    setEstimationNameInvalid(estName == "");
  };

  //Contingency value input handling
  const handleContingencyInputValueChange = (contingencyVal) => {
    dispatch(setEstimationContingency(contingencyVal));
    setContingencyInvalid(!validateContingency(contingencyVal));
  };

  function validateTimeline(timelineValue) {
    return Number(timelineValue) <= 0;
  }

  function validateContingency(value) {
    return Number(value) > 0 && Number(value) <= 100;
  }

  //generate estimation Name
  const generateEstimationName = (etId) => {
    const selectedEstimationObj = estTypes.find((esType) => esType.id === etId);
    var estName =
      selectedEstimationObj.estType + "-" + clientName + "-" + projectName;
    dispatch(setEstimationType(selectedEstimationObj.estType));
    dispatch(setEstimationName(estName.replace(/ /g, "_")));
    dispatch(setEstimationContingency(selectedEstimationObj.contingency));
    setEstimationNameInvalid(estName == "");
    setContingencyInvalid(
      !validateContingency(selectedEstimationObj.contingency)
    );
    setOpen({
      open: true,
      severity: "success",
      message:
        "Default Contingency for Estimation Type : " +
        selectedEstimationObj.estType +
        " applied to " +
        selectedEstimationObj.contingency +
        " %",
    });
  };

  // get the Effort Unit value from selected dropdown
  const getEffortUnitDropDownValue = (event) => {
    let effortUnit = event.target.value; //effort unit type object
    dispatch(setEfforUnit(effortUnit));
    setIsEffortUnitInvalid(effortUnit === "");
  };

  const handleClose = () => {
    setOpen({});
  };

  return (
    <React.Fragment>
      {loaderComponent ? (
        loaderComponent
      ) : (
        <BorderedContainer className="no-shadow">
          <Grid
            container
            rowSpacing={7}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} style={{ margin: "8px 0px" }}>
              <div className="field-width">
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Estimation Type*
                  </InputLabel>

                  <Select
                    labelId="estimation-type-label"
                    id="estimation-type-select"
                    onChange={(e) => {
                      getEstimationDropDownValue(e);
                    }}
                    value={basicDetailRedux.estimationTypeId}
                    error={isEstimationTypeInvalid}
                  >
                    {estTypes.map((item) => (
                      <MenuItem key={item.estType} value={item.id}>
                        {item.estType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="field-width">
                <FormControl>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Effort Unit*
                  </InputLabel>

                  <Select
                    labelId="effort-unit-label"
                    id="effort-unit-select"
                    onChange={getEffortUnitDropDownValue}
                    value={basicDetailRedux.efforUnit}
                    error={isEffortUnitInvalid}
                  >
                    {effortUnitTypes.map((item) => (
                      <MenuItem value={item.value}>{item.value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Grid container style={{ gap: 200 }} className="gridgap">
            <Grid item xs={4} style={{ margin: "8px 0px" }}>
              <TextField
                autoComplete="off"
                id="standard-basic"
                label="Estimation Name*"
                variant="outlined"
                value={basicDetailRedux.estimationName}
                error={isEstimationNameInvalid}
                onChange={(e) => estimationNameInputValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} style={{ margin: "8px 0px" }}>
            <MultiLocationSelection estheaderid={props.estimationHeaderId} error={isLocationInvalid} errorHandler={handleLocationErrorOnChange}/>
            </Grid>
          </Grid>

          <Grid container style={{ gap: 200 }} className="gridgap">
            <Grid item xs={4} style={{ margin: "8px 0px" }}>
              <TextField
                autoComplete="off"
                id="standard-basic"
                label="Tentative Timeline (Weeks)*"
                variant="outlined"
                type={"number"}
                InputProps={{ inputProps: { min: 1, maxLength: 3 } }}
                error={isTentativeTimelineInvalid}
                helperText={
                  isTentativeTimelineInvalid
                    ? "Please Enter Tentative timeline value"
                    : ""
                }
                value={basicDetailRedux.estimationTentativeTimeline}
                onChange={(e) => tentaiveTimelineInputValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} style={{ margin: "8px 0px" }}>
              <TextField
                autoComplete="off"
                id="standard-basic"
                label="Contengency(%)*"
                variant="outlined"
                type="number"
                max={2}
                onKeyDown={(evt) =>
                  symbolsArr.includes(evt.key) && evt.preventDefault()
                }
                pattern="^[1-9][0-9]?$|^100$"
                error={isContingencyInvalid}
                helperText={
                  isContingencyInvalid
                    ? "Please Enter Contingency % between 1-100"
                    : ""
                }
                value={basicDetailRedux.estimationContingency}
                onChange={(e) =>
                  handleContingencyInputValueChange(e.target.value)
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={8} spacing={1} style={{ margin: "8px 0px" }}>
            <TextField
              autoComplete="off"
              id="standard-basic"
              label="Description*"
              variant="standard"
              multiline={true}
              rows={3}
              maxRows={3}
              value={basicDetailRedux.esttimationDesc}
              onChange={(e) => remainingCharCount(e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 250 }}
              error={isDescriptionInvalid}
            />
            <div>
              <p>Remaining character limit: {characterCount}</p>
            </div>
          </Grid>
        </BorderedContainer>
      )}
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      )}
    </React.Fragment>
  );
});

export default FirstStep;
