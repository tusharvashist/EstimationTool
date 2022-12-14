module.exports.formatMongoData = (data) => {
  if (Array.isArray(data)) {
    let newDataList = [];
    for (let value of data) {
      newDataList.push(value.toObject());
    }
    return newDataList;
  }
  return data;
};
