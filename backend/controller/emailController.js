const emailService = require('../service/emailService');
const constant = require("../constant");

module.exports.sendMail = async (req, res) => {
let response = { ...constant.defaultResponce };
req.body.html,req.body.isFileAttached
    try {
        const responseFromEmailService = await emailService.sendEmail(req.body);
        response.status = 200;
        response.message = constant.emailSettings.EMAIL_STATUS;
        response.body = responseFromEmailService;
    } catch (err) {
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}