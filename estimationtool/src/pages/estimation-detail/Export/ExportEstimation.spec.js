"use strict";
import React from "react";
import { findDOMNode } from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import ExportEstimation from "./ExportEstimation";

describe("ExportEstimation", () => {
  let result, exportEstimation;

  beforeEach(() => {
    result = ReactTestUtils.renderIntoDocument(
      <ExportEstimation.ExportEstimationPopup />
    );
    exportEstimation = findDOMNode(result);
  });

  it("Renders Export popup", () => {
    expect(exportEstimation).toBeDefined();
  });
});
