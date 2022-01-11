const timelinePlanningService = require("../service/timelinePlanningService");
const constant = require("../constant");

//----------------- Get resource mix detail
module.exports.getTimeLinePlanning = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceTimelinePlanning = await timelinePlanningService.getTimelinePlanning(req.params);
        responce.status = 200;
        responce.message = constant.timelinePlanningMessage.TIMELINEPLANNING_FETCH;
        responce.body = responceTimelinePlanning;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}