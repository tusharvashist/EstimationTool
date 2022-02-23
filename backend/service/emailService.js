const constant = require("../constant");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(constant.emailSettings.SENDGRID_API_KEY);
module.exports.sendEmail = async (serviceData) => {
    const message = {
        to: splitString(serviceData.to),
        from: constant.emailSettings.FROM_EMAIL,
        subject: serviceData.subject,
        html: getEmailTemplate(serviceData.bodyData),
    };
    try {
        await sgMail.send(message);
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    }
}
function splitString(string){
    return string.split(',');
}
function  getEmailTemplate(templateData) {
      // if (templateData.mialType.toLowerCase() == constant.emailType.ESTIMATION.toLowerCase()) {
    var html = `<!DOCTYPE html>
            <html>
            <body>
            <h1>Hi ${templateData.clientName},</h1>
            <p>Welcome to the ${templateData.projectName}</p>
            <table >
                <tr>
                    <td><b>Estimation Name:</b> ${templateData.estimationName}</td>
                    <td colspan="2"></td>
                    <td><b>Assigned Role:</b> ${templateData.assignedRole}</td>
                </tr>
            </table>
            <p style="float:right">
            <a style="background-color: #04AA6D!important;border-radius: 5px;font-size: 17px;font-family: 'Source Sans Pro', sans-serif;padding: 6px 18px;color: #FFFFFF;" href="${templateData.estimationLink}" target="_blank">Get Estimation »</a>
            </p>
            <a>
              <img src="https://pyramidcore.pyramidci.com/Security/images/login-header.jpg" alt="HTML tutorial" style="width:200px;height:200px;border:0">
            </a>
            <br/><br/><br/><br/><br/>
            <p>
                <b>
                    <i>
                         Thanks & Regards <br>
                         Team Pyramid <br>
                         web: <a href="http://pyramidcore.pyramidci.com">pyramidcore.pyramidci.com</a>
                    </i>
                </b>
            </body>
            </html>`

    return html
}