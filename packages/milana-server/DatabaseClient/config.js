const username = process.env.COSMOS_USER
const password = process.env.COSMOS_PASSWORD
const host = process.env.COSMOS_HOST
const port = process.env.PORT
const appName = process.env.COSMOS_APP_NAME

module.exports = {
    username, password, host, port, appName
}