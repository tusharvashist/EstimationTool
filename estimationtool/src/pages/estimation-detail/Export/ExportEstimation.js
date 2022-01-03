import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import CustomizedDialogs from "../../../shared/ui-view/dailog/dailog";
import EstimationService from "../estimation.service";
import Snackbar from "../../../shared/layout/snackbar/Snackbar";
import { useSelector } from "react-redux";

export const ExportEstimationPopup = (props) => {
  const estimationHeaderId = useSelector((state) => state.estimationHeaderId);

  const [estimationDetail, setEstimationDetail] = useState(true);
  const [estimationSummary, setEstimationSummary] = useState(false);
  const [resourceMix, setResourceMix] = useState(false);
  const [resourcePlanning, setResourcePlanning] = useState(false);
  const [resourceTimeline, setResourceTimeline] = useState(false);

  const [isOpen, setOpen] = useState({});

  const popSubmitHandler = () => {
    callAPI();
  };

  const callAPI = () => {
    const payload = [
      {
        key: "estimationHeader",
        value: estimationHeaderId.estHeaderId,
      },
      {
        key: "estimationDetail",
        value: estimationDetail,
      },
      {
        key: "estimationSummary",
        value: estimationSummary,
      },
      {
        key: "resourceMix",
        value: resourceMix,
      },
      {
        key: "resourcePlanning",
        value: resourcePlanning,
      },
      {
        key: "resourceTimeline",
        value: resourceTimeline,
      },
    ];

    EstimationService.getAllExportData(payload)
      .then((res) => {
        props.closeExportEstimation();
      })
      .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const handleClose = () => {
    setOpen({});
  };

  const { message, severity, open } = isOpen || {};

  return (
    <>
      <CustomizedDialogs
        isOpen={props.openExport}
        openFun={props.openExportEstimation}
        closeFun={props.closeExportEstimation}
        title={props.title}
        oktitle={props.oktitle}
        cancelTitle={props.cancelTitle}
        saveFun={popSubmitHandler}
        width={"sm"}
        buttonType="submit"
      >
        <form>
          <FormControl component="fieldset" className="form-export">
            <FormLabel component="legend">
              Please select from below options to export:
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Estimation Details"
                onChange={(e) => setEstimationDetail(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Estimation Summary"
                onChange={(e) => setEstimationSummary(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Resource Mix"
                onChange={(e) => setResourceMix(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Resource Planning"
                onChange={(e) => setResourcePlanning(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Resource Timeline"
                onChange={(e) => setResourceTimeline(e.target.checked)}
              />
            </FormGroup>
          </FormControl>
        </form>
      </CustomizedDialogs>
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      )}
    </>
  );
};
