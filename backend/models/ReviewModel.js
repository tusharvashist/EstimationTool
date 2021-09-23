const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        UserId: { type: String },
        FeedBack: { type: String },
        Status: { type: String },
        EstimationId: { type: String },
        Version: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);


const ReviewModel = mongoose.model('Review', schema);

module.exports = ReviewModel;
