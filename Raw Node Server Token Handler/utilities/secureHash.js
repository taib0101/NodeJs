const crypto = require("crypto");
const importedEnviroment = require(`${__dirname}/../helper/environment/environmentHandler`);

const currentEnvironment = importedEnviroment;

const passwordHash = (string) => {
    return crypto.createHmac("sha256", currentEnvironment.secretKey)
        .update(string)
        .digest("hex");
}
module.exports = passwordHash;