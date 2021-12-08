const resourceMixService = require("../service/resourceMixService");
const constant = require("../constant");

//----------------- Get resource mix detail
module.exports.getResourceMix = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceResourceMix = await resourceMixService.getResourceMixPlanning(req.params);
        responce.status = 200;
        responce.message = constant.resourceMixMessage.RESOURMIX_FETCH;
        responce.body = responceResourceMix;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}