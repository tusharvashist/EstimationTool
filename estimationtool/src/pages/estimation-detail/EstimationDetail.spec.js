describe("Estimation Detail", () => {
  let result;
  beforeEach(() => {
    const estimationDetail = require("./estimation-detail");
    const reactRender = require("react-test-renderer");
    const reactTestUtils = require("react-dom/test-utils");

    result = reactRender(estimationDetail);
  });
  it("Should render estimation detail page", () => {
    expect(result).toBeDefined;
  });
});
