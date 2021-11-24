import {
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";

import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
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
} from "../../Redux/basicDetailRedux";
import estimationServices from "../allestimation/allestimation.service";
import useLoader from "../../shared/layout/hooks/useLoader";
import { useHistory } from "react-router-dom";

const FirstStep = forwardRef((props, ref) => {
  const history = useHistory();
  const basicDetailRedux = useSelector((state) => state.basicDetail);
  const dispatch = useDispatch();
  const [characterCount, setCharacterCount] = useState(250);
  const [estTypes, setEstimationTypes] = useState([]);
  const [effortUnitTypes, setEffortUnitTypes] = useState([
    { key: 1, value: "Month" },
    { key: 2, value: "Day" },
    { key: 3, value: "Hour" },
  ]);
  //const [selectedEstType, setSelectedEstimationType] = useState();
  //const [selectedEffortUnit, setSelectedEffortUnit] = useState();
  //const [estimationNameAutoGen, setEstimationNameAutoGen] = useState();
  const [clientName, setClientName] = useState();
  const [projectName, setProjectName] = useState();
  //const estHeaderID = {...props.estimationHeaderId};

  //const [estimationHeaderId, setEstimationHeaderId] = useState({estHeaderID});
  //const [estimationDescription, setEstimationDescription] = useState();
  //const { forwardRef, useRef, useImperativeHandle } = React;
  const [isEstimationTypeInvalid, setIsEstimationTypeInvalid] = useState(false);
  const [isEffortUnitInvalid, setIsEffortUnitInvalid] = useState(false);
  const [isEstimationNameInvalid, setEstimationNameInvalid] = useState(false);
  const [isDescriptionInvalid, setDescriptionInvalid] = useState(false);
  const [loaderComponent, setLoader] = useLoader();

  useEffect(() => {
    setClientName(props.clientName);
    setProjectName(props.projectName);
    //setEstimationHeaderId(estHeaderId);
    getAllMasterEstimationTypes();
    getEstimationBasicInfo();
    //remainingCharCount(basicDetailRedux.esttimationDesc);
  }, []);

  useImperativeHandle(ref, () => ({
    showError(error) {
      handleFieldsError();
      //alert(error);
    },
  }));

  const handleFieldsError = () => {
    setIsEstimationTypeInvalid(basicDetailRedux.estimationTypeId === "");
    setIsEffortUnitInvalid(basicDetailRedux.efforUnit === "");
    setEstimationNameInvalid(basicDetailRedux.estimationName == "");
    setDescriptionInvalid(basicDetailRedux.esttimationDesc === "");
  };

  // get estimation basic info
  const getEstimationBasicInfo = () => {
    //let estHeaderId = '6189e7ca1bdec59514481b47'
    let estHeaderId = props.estimationHeaderId;
    // console.log("props Estimation Header Id: " + "::" + estHeaderId);
    if (estHeaderId) {
      localStorage.setItem("estimationHeaderId", estHeaderId);
      dispatch(setEstimationHeaderId(estHeaderId));
    }
    if (!estHeaderId) {
      // localStorage.setItem("estimationHeaderId", estHeaderId);
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
      })
      .catch((err) => {
        console.log("get estimation header detail error : ", err);
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history.push(url);
        // }
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
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history.push(url);
        // }
      });
  };

  // get the Estimation Type dropdown selected value
  const getEstimationDropDownValue = (event) => {
    //console.log("this is an selected value", event);
    let etId = event.target.value; //estimation type object
    //setSelectedEstimationType(etId);
    console.log("Selected ESTIMATION TYPE+" + etId);

    dispatch(setEstimationTypeId(etId));
    //handleFieldsError();
    setIsEstimationTypeInvalid(false);
    generateEstimationName(etId);
  };
  //update the remaining character count limit
  const remainingCharCount = (charString) => {
    var remainingCharLimit = 250 - charString.length;
    setCharacterCount(remainingCharLimit);
    dispatch(setEsttimationDesc(charString));
    //handleFieldsError();
    setDescriptionInvalid(charString.length > 0 && remainingCharLimit == 250);
  };

  //generate estimation Name
  const generateEstimationName = (etId) => {
    const selectedEstimationObj = estTypes.find((esType) => esType.id === etId);
    var estName =
      selectedEstimationObj.estType + "-" + clientName + "-" + projectName;
    //return estName.replace(/ /g,"_");
    //setEstimationNameAutoGen(estName.replace(/ /g,"_"));
    dispatch(setEstimationType(selectedEstimationObj.estType));
    dispatch(setEstimationName(estName.replace(/ /g, "_")));
    //handleFieldsError();
    setEstimationNameInvalid(estName == "");
  };

  // get the Effort Unit value from selected dropdown
  const getEffortUnitDropDownValue = (event) => {
    //console.log("this is an selected value", event);
    let effortUnit = event.target.value; //effort unit type object
    //setSelectedEffortUnit(effortUnit);
    console.log("Selected EffortUnit+" + effortUnit);
    dispatch(setEfforUnit(effortUnit));
    //handleFieldsError();
    setIsEffortUnitInvalid(effortUnit === "");
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
            <Grid item xs={6}>
              <div className="field-width">
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Estimation Type*
                  </InputLabel>

                  <Select
                    labelId="estimation-type-label"
                    id="estimation-type-select"
                    onChange={(e) => {
                      console.log(
                        e.target.value + "Instade est select onchange"
                      );
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
            <Grid item xs={5}>
              <TextField
                id="standard-basic"
                label=""
                variant="outlined"
                value={basicDetailRedux.estimationName}
                error={isEstimationNameInvalid}
              />
            </Grid>
          </Grid>
          <Grid item xs={8} spacing={1}>
            <TextField
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
    </React.Fragment>
  );
});

export default FirstStep;
