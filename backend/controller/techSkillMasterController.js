const techSkillSer = require("../service/techSkillMasterService");
const constant = require("../constant");


module.exports.getAllTechSkillMaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const TechSkillSerResponse = await techSkillSer.getAllTechSkill(req.query);
        responce.status = 200;
        responce.message = constant.techSkillMasterMessage.TECHSKILL_FETCH;
        responce.body = TechSkillSerResponse;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
module.exports.createTechSkillMaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const TechSkillSerResponse = await techSkillSer.createTechSkill(req.body);
        responce.status = 200;
        responce.message = constant.techSkillMasterMessage.TECHSKILL_CREATED;
        responce.body = TechSkillSerResponse;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}