const excelUploadService = require("../service/excelUploadService");
const constant = require("../constant");
const express = require('express');
const fileUpload = require('express-fileupload');

module.exports.uploadExcel = async (req, res) => {
    let response = { ...constant.defaultResponse };
    try {
        if (req.files == undefined) {
            return res.status(400).send(constant.excelUploadMessage.REQUIREMENT_FILE_NOT_RECEIVED);
        } else {
            const uploadExcel = await excelUploadService.uploadExcel( req.params.id,req.files);
            response.status = 200;
            response.message = constant.excelUploadMessage.REQUIREMENT_RECEIVED;
            response.body = uploadExcel;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        response.status = 400;
        response.message = err.message;
        return res.status(response.status).send(response);
    }
    }
    
    module.exports.getTemplate = async (req, res) => {
        res.download("./excelTemplate/EstimationRequirementTemplate.xlsx", "EstimationRequirementTemplate.xlsx");
    };



module.exports.validateSave = async (req, res) => {
    let response = { ...constant.defaultResponse };
    try {
            const uploadExcel = await excelUploadService.validateSave( req.params.id,req.params.estHeaderId,req.body);
            response.status = 200;
            response.message = constant.excelUploadMessage.REQUIREMENT_RECEIVED;
            response.body = uploadExcel;
            return res.status(response.status).send(response);
     
    } catch (err) {
        response.status = 400;
        response.message = err.message;
        return res.status(response.status).send(response);
    }
}
    
module.exports.updateRecord = async (req, res) => {
    let response = { ...constant.defaultResponse };
    try {
            const uploadExcel = await excelUploadService.updateRecord( req.params.id,req.body);
            response.status = 200;
            response.message = constant.excelUploadMessage.REQUIREMENT_RECEIVED;
            response.body = uploadExcel;
            return res.status(response.status).send(response);
     
    } catch (err) {
        response.status = 400;
        response.message = err.message;
        return res.status(response.status).send(response);
    }
    }