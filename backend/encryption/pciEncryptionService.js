"use strict";
module.exports.decrypt = (t) => {
    if (!t || 0 === t.length) throw new Error("Missing input data to decrypt");
    let n = "";
    try {
        for (let r = 0; r < t.length; r += 3) {
            var e = t.substring(r, r + 3),
                o = parseInt(e, 10),
                i = (o -= 500, String.fromCharCode(o));
            n += i
        }
    } catch (r) {
        throw new Error("Error decrypting input data" + r)
    }
    return n
};
module.exports.encrypt = (e) => {
    if (!e || 0 === e.length) throw new Error("Missing input data to encrypt");
    let o = "";
    try {
        for (let n = 0; n < e.length; n += 1) {
            console.log(e[n]);
            let r = e[n],
                t = r.charCodeAt(0);
            t += 500, o += t.toString()
        }
    } catch (r) {
        throw new Error("Error encrypting input data" + r)
    }
    return o
};

