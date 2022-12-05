const jwt = require('jsonwebtoken');

/**
 * validate token received from header request - client,
 * @param {string} token 
 * @returns {Promise}
 */
const validateToken = (token) => {
    const publicKey = "secret_key";
    const verifyOptions = {
        algorithms: ['RS256'],
    };
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, function (error, decoded) {
            if (error)
                return reject(error);
            resolve(decoded);
        })
    })
}


/**
 * middleware to check whether user has access to a specific endpoint
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 * @return {Promise} decide endpoint for activities rest api
 */

// to-do edit this file to validate all the api from the server  
const authorize = (allowedAccessTypes) => async (req, res, next) => {
    try {
        let headerJwt = req.headers.authorization;

        if (!headerJwt) {
            return res.status(401).json({ message: 'Invalid token ' });
        }

        // remove Bearer if using Bearer Authorization mechanism
        if (headerJwt.toLowerCase().startsWith('bearer')) {
            headerJwt = headerJwt.slice('bearer'.length).trim();
        }

        // verify token hasn't expired yet
        const dataVerify = await validateToken(headerJwt);
        //const decodedToken = await validateToken(headerJwt);
        console.log(dataVerify);

        const hasAccessToEndpoint = allowedAccessTypes.some(
            (at) => decodedToken.accessTypes.some((uat) => uat === at)
        );
        if (!hasAccessToEndpoint) {
            return res.status(401).json({ message: 'No enough privileges to access endpoint' });
        }
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Expired token' });
            return;
        }

        res.status(500).json({ message: 'Failed to authenticate user' });
    }
};

module.exports = {
    authorize,
    validateToken
};