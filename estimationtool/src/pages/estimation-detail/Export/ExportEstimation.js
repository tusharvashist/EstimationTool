import React from "react";
import CustomizedDialogs from "../../../shared/ui-view/dailog/dailog";

export const ExportEstimation = (props) => {
  return <div></div>;
};

export const ExportEstimationPopup = (props) => {
  return (
    <>
      <CustomizedDialogs
        isOpen={props.openExport}
        openFun={props.openExportEstimation}
        closeFun={props.closeExportEstimation}
        title={props.title}
        oktitle={props.oktitle}
        cancelTitle={props.cancelTitle}
        saveFun={props.exportFun}
        width={"sm"}
      >
        <ExportEstimation />
      </CustomizedDialogs>
    </>
  );
};
