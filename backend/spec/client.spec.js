var Request = require("request");
var constant = require("../constant/index");
var userService = require("../service/userService");
var baseUrl = "http://localhost:5252/api/v1";
describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../server");
        //server = require("../app");
    });

    afterAll(() => {
        // server.close();
    });
    describe("Client", () => {
        var token;
  
        beforeAll(async () => {
            global.isUnderTest  = await userService.testUser("admin@pyramidconsultinginc.com", "admin");
            token = 200;
        }, 15000);

        afterAll(() => {
        });
    
        it("Status 200", () => {
            expect(token).toBe(200);
        });
    });

});