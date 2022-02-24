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
            <p>Hi ${templateData.senderName},</h4>
            <p>${templateData.ownerName} has shared the following estimation with you. Please check with the below shared details and start contributing.</p>
            <table border="0" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Project Name</th>
                        <th>Estimation Name</th>
                        <th>Assigned Role</th>
                        <th>Estimation Link</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="text-align:center">
                        <td>${templateData.clientName}</td>
                        <td>${templateData.projectName}</td>
                        <td>${templateData.estimationName}</td>
                        <td>${templateData.assignedRole}</td>
                        <td><a style="background-color: #04AA6D!important;border-radius: 5px;font-size: 12px;font-family: 'Source Sans Pro', sans-serif;padding: 6px 18px;color: #FFFFFF;text-decoration: none;" href="${templateData.estimationLink}" target="_blank">Get Estimation</a></td>
                    </tr>
                </tbody>
            </table>
            <br/><br/><br/><br/>
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