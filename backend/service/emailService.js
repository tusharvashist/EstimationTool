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
      // if (templateData.mailType.toLowerCase() == constant.emailType.ESTIMATION.toLowerCase()) {
    var html = `<!DOCTYPE html>
            <html>
            <body>
            <p>Hi ${templateData.clientName},</h4>
            <p><u>Description:</u> ${templateData.ownerName} has shared the following estimation with you.</p>
            <table>
			    <tr>
                    <td><b>Client Name:</b> ${templateData.clientName}</td>
                </tr>
				<tr>
                    <td><b>Project Name:</b> ${templateData.projectName}</td>
                </tr>
				<tr>
                    <td><b>Estimation Name:</b> ${templateData.estimationName}</td>
                </tr>
				<tr>
				   <td><b>Assigned Role:</b> ${templateData.assignedRole}</td>
				</tr>
            </table>
            <p style="float:left">
            <a style="background-color: #04AA6D!important;border-radius: 5px;font-size: 17px;font-family: 'Source Sans Pro', sans-serif;padding: 6px 18px;color: #FFFFFF;" href="${templateData.estimationLink}" target="_blank">Get Estimation »</a>
            </p>
            <a>
              <img src="https://pyramidcore.pyramidci.com/Security/images/login-header.jpg"  style="width:600px;height:200px;border:0">
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