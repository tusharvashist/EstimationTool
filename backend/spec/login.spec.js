
var Request = require("request");
var constant = require("../constant/index");
var baseUrl = "http://localhost:5252/api/v1"

describe("Server", () => {
    // var server; 
    // beforeAll(() => {
    //     server = require("../server");
    //     //server = require("../app");
    // });

    // afterAll(() => {
    //    // server.close();
    // });

    describe("Login positive /", () => {
        var data = {};
        beforeAll((done) => {
             var user = "admin@pyramidconsultinginc.com";
             var password = "";
            const token = Buffer.from(`${user}:${password}`, 'utf8').toString('base64')
            var url = baseUrl + "/user/login";
             var options = {
                 url: url,
                 headers: {
                         'Authorization': `Basic ${token}` 
                         }
                    };

            Request.post(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
                 });
        });

        it("Status 200", () => {
            expect(data.status).toBe(200); 
        });

        it("Body", () => {
            var body = JSON.parse(data.body);
            expect(body.message).toBe(constant.userMessage.LOGIN_SUCCESS); 
        });

    });



    describe("Login negative /", () => {
        var data = {};
        beforeAll((done) => {
             var user = "admin@pyramidconsultinginc.com";
             var password = "";
            const token = Buffer.from(`${user}:${password}`, 'utf8').toString('base64')
              var url = baseUrl + "/user/login";
             var options = {
                 url: url,
                 headers: {
                         'Authorization': `Basic ${token}` 
                         }
                    };

            Request.post(options, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
                 });
        });

        it("Status 200", () => {
            expect(data.status).not.toBe(200); 
        });

        it("Body", () => {
            var body = JSON.parse(data.body);
            expect(body.message).not.toBe(constant.userMessage.LOGIN_SUCCESS); 
        });

    });

});





