const jwt = require("jsonwebtoken");
const { type_token } = require("../../constant");
const constant = require("../../constant");
/**
 * generate new token
 * @param {string} _option
 * @param {string} _user_id
 * @param {Date} _expires
 * @param {string} _type // access_token or refresh_token -- ACCESS / REFRESH
 * @param {string} _secret_key
 * @returns {Promise<string>}
 */
const generateToken = (_user_id, _expires, _type, _secret_key = constant.jwt.secret) => {
    const payload = {
        userId: _user_id,
        expires: _expires,
        _type,
    }
    return jwt.sign(payload, _secret_key);
};

/** 
 * @param {string} token
 * @return {Promise<Object>}
*/
const verifyToken = async (token) => {
    const payload = jwt.verify(token, constant.jwt.secret);
    return payload;
}

/**
 * @param {string} user_id
 * @return {Promise<Object>}
 */
const generateAuthToken = (user_id) => {
    const access_token_expires = 6000000;
    const access_token = generateToken(user_id, access_token_expires, type_token.access_token);
    const refresh_token_expires = 6000000;
    const refresh_token = generateToken(user_id, refresh_token_expires, type_token.refresh_token);
    return {
        access: {
            token: access_token,
            expires: access_token_expires,
        },
        refresh: {
            token: refresh_token,
            expires: refresh_token_expires,
        },
    };
};


module.exports = {
    generateAuthToken,
    verifyToken,
    generateToken,
};