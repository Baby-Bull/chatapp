const jwt = require("jsonwebtoken");
const { type_token } = require("../../constant");
const { jwt_constant } = require("../../constant");
/**
 * generate new token
 * @param {string} _option
 * @param {string} _user_id
 * @param {Date} _expires
 * @param {string} _type // access_token or refresh_token -- ACCESS / REFRESH
 * @param {string} _secret_key
 * @returns {Promise<string>}
 */
const _secret_key = jwt_constant.secret;
const generateToken = (_user, _expires, _type) => {
    const payload = {
        user: _user,
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
    const payload = jwt.verify(token, _secret_key);
    return payload;
}

/**
 * @param {Object} userPayload
 * @return {Promise<Object>}
 */
const generateAuthToken = (userPayload) => {
    const access_token_expires = 6000000;
    const access_token = generateToken(userPayload, access_token_expires, type_token.access_token);
    const refresh_token_expires = 6000000;
    const refresh_token = generateToken(userPayload, refresh_token_expires, type_token.refresh_token);
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