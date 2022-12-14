import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import CustomizedDialogs from "../../../shared/ui-view/dailog/dailog";
import EstimationService from "../EstimationService";
import Snackbar from "../../../shared/layout/snackbar/Snackbar";
import { useSelector } from "react-redux";
import useLoader from "../../../shared/layout/hooks/useLoader";

export const ExportEstimationPopup = (props) => {
  const estimationHeaderId = useSelector((state) => state.estimationHeaderId);

  const [estimationDetail, setEstimationDetail] = useState(true);
  const [estimationSummary, setEstimationSummary] = useState(false);
  const [resourceCount, setResourceCount] = useState(false);
  const [resourcePlanning, setResourcePlanning] = useState(false);
  const [resourceTimeline, setResourceTimeline] = useState(false);
  const [loaderComponent, setLoader] = useLoader();

  const [isOpen, setOpen] = useState({});

  const popSubmitHandler = () => {
    callAPI();
  };

  const callAPI = () => {
    const payload = {
      estimationHeaderId: estimationHeaderId.estHeaderId,
      reports: [
        {
          key: "estimationDetail",
          value: estimationDetail,
        },
        {
          key: "estimationSummary",
          value: estimationSummary,
        },
        {
          key: "resourceCount",
          value: resourceCount,
        },
        {
          key: "resourcePlanning",
          value: resourcePlanning,
        },
        {
          key: "resourceTimeline",
          value: resourceTimeline,
        },
      ],
    };
    setLoader(true);
    EstimationService.getAllExportData(payload)
      .then((res) => {
    setLoader(false);

        props.closeExportEstimation();
        resetStatesForSelectedItem();
        if (res.status === 200) {
          EstimationService.getReport(payload.estimationHeaderId).catch(
            (err) => {
              setOpen({
                open: true,
                severity: "error",
                message: err.message,
              });
            }
          );
        }
        handleClose();
      })
      .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data || err.message,
        });
      });
  };

  const handleClose = () => {
    setOpen({});
  };

  const { message, severity, open } = isOpen || {};

  const resetStatesForSelectedItem = () => {
    setEstimationDetail(true);
    setEstimationSummary(false);
    setResourceCount(false);
    setResourcePlanning(false);
    setResourceTimeline(false);
  };

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
        {loaderComponent ? (
          loaderComponent
        ) : (
          <FormControl component="fieldset" className="form-export">
            <FormLabel component="legend">
              Please select from below options to export:
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox data-testid="export_checkbox" defaultChecked />
                }
                label="Estimation Details"
                onChange={(e) => setEstimationDetail(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox data-testid="export_checkbox" />}
                label="Estimation Summary"
                onChange={(e) => setEstimationSummary(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox data-testid="export_checkbox" />}
                label="Resource Count"
                onChange={(e) => setResourceCount(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox data-testid="export_checkbox" />}
                label="Resource Planning"
                onChange={(e) => setResourcePlanning(e.target.checked)}
              />
              <FormControlLabel
                control={<Checkbox data-testid="export_checkbox" />}
                label="Resource Timeline"
                onChange={(e) => setResourceTimeline(e.target.checked)}
              />
            </FormGroup>
          </FormControl>
        )
              }
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
