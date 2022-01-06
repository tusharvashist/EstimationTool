import React from "react";
import { findDOMNode } from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { ExportEstimationPopup } from "./ExportEstimation";

describe("ExportEstimation", () => {
  let result, chart;

  beforeEach(() => {
    result = ReactTestUtils.renderIntoDocument(<ExportEstimationPopup />);
    cart = findDOMNode(result);
  });

  it("Renders Export popup", () => {
    expect(chart).toBeDefined();
  });
});
