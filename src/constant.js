module.exports = {
    jwt: {
        secret: Process.env.SECRET_KEY_TOKEN,
    },
    type_token: {
        access_token: "access",
        refresh_token: "refresh"
    }
}