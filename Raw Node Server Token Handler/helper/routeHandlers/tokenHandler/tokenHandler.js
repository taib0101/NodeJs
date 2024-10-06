const path = require("path");
const fs = require("fs");
const fsp = require("fs").promises;
const passwordHash = require(`${__dirname}/../../../utilities/secureHash`)
const generateToken = require(`${__dirname}/../../../utilities/generateToken`);

const tokenHandler = async (requestProperties, callback) => {

    console.log(requestProperties);

    const fiveZeroZero = () => {
        callback(500, {
            "error": "internal server error"
        });
    }

    try {
        const readFilePath = path.join(__dirname, "/../../../.data/user/file.json");
        const readFilePathToken = path.join(__dirname, "/../../../.data/token");
        const readFile = await fsp.readFile(readFilePath, "utf8");
        const parsedReadFile = JSON.parse(readFile);

        const firstName = typeof requestProperties.body.firstName === "string" &&
            requestProperties.body.firstName.trim().length !== 0 ? requestProperties.body.firstName
            : false;
        const password = typeof requestProperties.body.password === "string" &&
            requestProperties.body.password.trim().length !== 0 ? requestProperties.body.password
            : false;
        const phone = typeof requestProperties.body.phone === "string" &&
            requestProperties.body.phone.trim().length !== 0 ? requestProperties.body.phone
            : false;
        const token = "";

        // console.log(requestProperties);
        // queries
        let queryPhone = typeof requestProperties.queryStringObject.phone === "string"
            && requestProperties.queryStringObject.phone.trim().length === 11 ?
            requestProperties.queryStringObject.phone : false;
        const queryID = typeof requestProperties.queryStringObject.id === "string"
            && requestProperties.queryStringObject.id.trim().length !== 0 ?
            requestProperties.queryStringObject.id : false;


        const twoZeroZero = () => {
            callback(200, parsedReadFile);
        }

        const fourZeroZero = () => {
            callback(400, {
                "message": "bad request"
            });
        }

        const fourZeroThree = () => {
            callback(403, {
                "message": "Authentication Error"
            });
        }

        const fourZeroFour = () => {
            callback(404, {
                "message": "Not Found"
            });
        }

        const fourZeroFive = () => {
            callback(405, {
                "message": "method not valid"
            });
        }

        // give query phone and password
        const findQuery = () => {
            for (let i = 0; i < parsedReadFile.data.length; ++i) {
                if (parsedReadFile.data[i].phone === queryPhone
                    && passwordHash(password) === parsedReadFile.data[i].password
                    && password) // password:1234
                    return {
                        bool: true,
                        index: parseInt(i)
                    }

            }
            return {
                bool: false
            }
        }

        const objectKeys = Object.keys(requestProperties.queryStringObject);

        const _userToken = {};

        let returnedObject;
        if (queryPhone)
            returnedObject = findQuery();

        _userToken.get = () => {
            if (objectKeys.length !== 0) {
                if (queryPhone && returnedObject.bool) {
                    callback(200, parsedReadFile.data[returnedObject.index]);
                } else {
                    fourZeroZero();
                }

            } else {
                twoZeroZero();
            }

        }

        _userToken.post = async () => {
            if (queryPhone && objectKeys.length !== 0
                && returnedObject.bool) {
                const generatedToken = generateToken(21);
                const expires = Date.now() + 60 * 60 * 1000;
                const objectForTokenJSONFile = {
                    id: generatedToken,
                    phone: parsedReadFile.data[returnedObject.index].phone,
                    expires
                };
                await fsp.writeFile(`${readFilePathToken}/${generatedToken}.json`, JSON.stringify(objectForTokenJSONFile));


                parsedReadFile.data[returnedObject.index].token = generatedToken;
                await fsp.writeFile(readFilePath, JSON.stringify(parsedReadFile));
                callback(200, objectForTokenJSONFile);
            } else {
                console.log("bara");
                fourZeroFour();
            }
        }

        _userToken.put = async () => {
            // it must be get, when user is created first time
            if (queryID && objectKeys.length !== 0) {

                const readTokenJSONFile = await fsp.readFile(`${readFilePathToken}/${queryID}.json`, "utf8");
                const parsedTokenJSONFile = JSON.parse(readTokenJSONFile);

                queryPhone = parsedTokenJSONFile.phone;
                returnedObject = await findQuery();

                // if token expire, generate new token
                if (parsedTokenJSONFile.expires > Date.now() && returnedObject.bool) {
                    const updatedToken = generateToken(21);
                    parsedReadFile.data[returnedObject.index].token = updatedToken;
                    await fsp.writeFile(`${readFilePath}`, JSON.stringify(parsedReadFile));

                    const objectForTokenJSONFile = {
                        id: updatedToken,
                        phone: parsedReadFile.data[returnedObject.index].phone,
                        expires: Date.now() + 60 * 60 * 1000
                    };
                    console.log(updatedToken);
                    await fsp.writeFile(`${readFilePathToken}/${updatedToken}.json`, JSON.stringify(objectForTokenJSONFile));

                    callback(200, objectForTokenJSONFile);
                } else {
                    callback(200, parsedTokenJSONFile);
                }
            } else {
                fourZeroFour();
            }
        }

        _userToken.delete = async () => {
            if (queryPhone && objectKeys.length !== 0
                && returnedObject.bool) {
                parsedReadFile.data[returnedObject.index].token = "";
                await fsp.writeFile(readFilePath, JSON.stringify(parsedReadFile));
                callback(200, parsedReadFile.data[returnedObject.index]);
            } else {
                fourZeroFour;
            }
        }


        const verify = (id) => {
            if (fs.existsSync(`${readFilePathToken}/${id}.json`)) {
                console.log("This is Authenticate");
                return true;
            }
            return false;
        }

        const checkingMethods = ["get", "post", "put", "delete"];
        if (checkingMethods.includes(requestProperties.method)) {
            if (verify(requestProperties.headerObject.id)) {
                _userToken[requestProperties.method]();
            } else if (requestProperties.method === "post") {
                _userToken[requestProperties.method]();
            } else {
                fourZeroThree();
            }
        } else {
            fourZeroFive();
        }

    } catch (error) {
        console.log(error);
        // fiveZeroZero();
    }
    // console.log(requestProperties, "\n request properties received in tokenHandler");
}

module.exports = tokenHandler;
