const StatusCodeToReasonPhrase = require('../utils/StatusCodeToReasonPhrase.js');

class PayloadModel {
    constructor(Status, data) {
        this.Status = Status;
        this.data = data;
    }
}

class Status {
    constructor(statusCode, messageDetail) {
        this.statusCode = statusCode;
        this.statusMessage = StatusCodeToReasonPhrase[statusCode.toString()];
        this.messageDetail = messageDetail;
    }
}

class Payload {
    responce(statusCode, messageDetail, data) {
        var status = new Status(statusCode, messageDetail);
        var payload = new PayloadModel(status, data);
        return payload
    }
}

module.exports = Payload;


