const axios = require("axios");
const pciEncryptionService = require("../encryption/pciEncryptionService");

module.exports.GetPcoreUser = async (uid) => {
  let userId = pciEncryptionService.decrypt(uid);
  let apiUrl =
    process.env.PCORE_API_URL + "api/OMS/GetPCUserDetails/Parm?Vari=" + userId;
  const secretKey = process.env.PCORE_API_SECRET_KEY;

  let response = await axios
    .get(apiUrl, { headers: { secret_key: secretKey } })
    .catch((e) => {
      throw e.response;
    });
  return response;
};
