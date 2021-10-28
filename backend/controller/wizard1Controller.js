const wizard1Ser = require("../service/wizard1Service");
const constant = require("../constant");

module.exports.createWizard1 = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromWizard1Ser = await wizard1Ser.createWizard1(req.body);
        responce.status = 200;
        responce.message = constant.wizard1Message.WIZARD1_CREATED;
        responce.body = responceFromWizard1Ser;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- get estimation by ID
module.exports.getWizard1ById = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromWizard1Ser = await wizard1Ser.getWizard1ById(req.params);
        responce.status = 200;
        responce.message = constant.wizard1Message.WIZARD1_FETCH;
        responce.body = responceFromWizard1Ser;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
//----------------- get all wizard1
module.exports.getAllWizard1 = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromWizard1Ser = await wizard1Ser.getAllWizard1(req.query);
        responce.status = 200;
        responce.message = constant.wizard1Message.WIZARD1_FETCH;
        responce.body = responceFromWizard1Ser;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update
module.exports.wizard1Update = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromWizard1Ser = await wizard1Ser.wizard1Update({
            id: req.params.id,
            updateInfo: req.body,
        });
        responce.status = 200;
        responce.message = constant.wizard1Message.WIZARD1_UPDATE;
        responce.body = responceFromWizard1Ser;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete
module.exports.wizard1Delete = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromWizard1Ser = await wizard1Ser.wizard1Delete(req.params);
        responce.status = 200;
        responce.message = constant.wizard1Message.WIZARD1_DELETE;
        responce.body = responceFromWizard1Ser;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}


