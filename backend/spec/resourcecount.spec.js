var Request = require("request");
var constant = require("../constant/index");
var resourceCountService = require("../service/estimationResourceCountService");
const EstResourcePlanning = require("../database/models/estResourcePlanning");
var baseUrl = "http://localhost:5252/api/v1";

describe("Server", () => {
//   var server;
//   beforeAll(() => {
//     server = require("../server");
//   });

//   afterAll(() => {
//     // server.close();
//   });

  describe("SetAllocationPercent", () => {
    it("Get Allocation Percent", () => {
      let estResourcePlanning = new EstResourcePlanning();
      resourceCountService.SetAllocationPercent(0.23, estResourcePlanning);
      expect(estResourcePlanning.allocationPercent).toBe(28);
    });
  });
});
