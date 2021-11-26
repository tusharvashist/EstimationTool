const requirementTagSer = require("../service/requirementTagService");
const constant = require("../constant");


module.exports.getAllRequirementTag = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRequirementTagSer = await requirementTagSer.getAllRequirementTag(req.query);
        responce.status = 200;
        responce.message = constant.requirementTagMessage.REQUIREMENTTAG_FETCH;
        responce.body = responceFromRequirementTagSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}



module.exports.getAllTagType = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRequirementTagSer = await requirementTagSer.getTagsType();
        responce.status = 200;
        responce.message = constant.requirementTagMessage.REQUIREMENTTAG_FETCH;
        responce.body = responceFromRequirementTagSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
