module.exports = {
    jwt: {
        secret: process.env.SECRET_KEY_TOKEN,
    },
    type_token: {
        access_token: "access",
        refresh_token: "refresh"
    }
}