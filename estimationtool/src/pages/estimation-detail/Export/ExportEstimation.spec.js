describe("ExportEstimation", () => {
  let exportEstimation;
  const estimationdetail = require("../estimation-detail");
  const findDOMNode = require("react-dom/findDOMNode");
  const ReactTestUtils = require("react-dom/test-utils");

  beforeEach(() => {
    let result = ReactTestUtils.renderIntoDocument(estimationdetail);
    exportEstimation = findDOMNode(result);
    console.log(result);
  });

  it("Renders Export popup", () => {
    expect(exportEstimation).toBeDefined();
  });
});
