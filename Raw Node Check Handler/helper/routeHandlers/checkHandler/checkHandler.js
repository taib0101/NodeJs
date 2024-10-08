const path = require("path");
const fsp = require("fs").promises;
const fs = require("fs");
const generateToken = require(`${__dirname}/../../../utilities/generateToken`);

const checkHandler = async (requestProperties, callback) => {

    const fiveZeroZero = () => {
        callback(500, {
            "error": "internal server error"
        });
    }

    try {
        const tokenFilePath = path.join(__dirname, "/../../../.data/token");
        const checkFilePath = path.join(__dirname, "/../../../.data/check");
        const filePath = path.join(__dirname, "/../../../.data/user/file.json");

        const readFile = await fsp.readFile(filePath, "utf8");
        const parsedReadFile = JSON.parse(readFile);
        // = await fsp.readFile(`${tokenFilePath}`)

        const protocol =
            typeof (requestProperties.body.protocol) === "string" &&
                ["http", "https"].includes(requestProperties.body.protocol) ? requestProperties.body.protocol : false;

        const url =
            typeof (requestProperties.body.url) === "string" &&
                requestProperties.body.url.length !== 0 ? requestProperties.body.url : false;

        const method = typeof (requestProperties.body.method) === "string" &&
            ["get", "post", "put", "delete"].includes(requestProperties.body.method) ? requestProperties.body.method : false;

        const statusCode =
            typeof (requestProperties.body.statusCode) === "object" &&
                requestProperties.body.statusCode instanceof Array ? requestProperties.body.statusCode : false;

        // const timeoutSeconds = typeof(requestProperties.body.timeoutSeconds) === "number" && requestProperties.body.timeoutSeconds % 1 === 0 && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : false;

        const timeoutSeconds =
            typeof (requestProperties.body.timeoutSeconds) === "number" &&
                requestProperties.body.timeoutSeconds >= 1 &&
                requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : false;

        // header
        const tokenHeader = typeof requestProperties.headerObject.token === "string" &&
            requestProperties.headerObject.token.length === 21 ?
            requestProperties.headerObject.token : false;

        // query parameters
        const queryPhone = typeof requestProperties.queryStringObject.phone === "string" &&
            requestProperties.queryStringObject.phone.trim().length === 11 ?
            requestProperties.queryStringObject.phone : false;

        // queryID as token
        const queryID = typeof requestProperties.queryStringObject.id === "string" &&
            requestProperties.queryStringObject.id.trim().length === 21 ?
            requestProperties.queryStringObject.id : false;

        const twoZeroZero = () => {
            callback(200, {
                "message": "success"
            });
        }

        const fourZeroZero = () => {
            callback(400, {
                "message": "bad request"
            });
        }

        const fourZeroThree = () => {
            callback(403, {
                "message": "Authentic error"
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

        const verifyToken = () => {
            if (fs.existsSync(`${tokenFilePath}/${tokenHeader}.json`))
                return true;
            return false;
        }

        const findQuery = () => {
            for (let i = 0; i < parsedReadFile.data.length; ++i) {
                if (parsedReadFile.data[i].phone === queryPhone) {
                    return {
                        bool: true,
                        index: parseInt(i)
                    };
                }
            }
            return {
                bool: false
            };
        }

        const _check = {};

        // http://127.0.0.1:3000/check?phone=01969330127
        _check.get = async () => {
            const returnedObject = findQuery();
            if (queryPhone && returnedObject.bool) {
                const readTokenFile = await fsp.readFile(`${tokenFilePath}/${parsedReadFile.data[returnedObject.index].token}.json`, "utf8");
                const parsedTokenReadFile = JSON.parse(readTokenFile);

                if (fs.existsSync(`${checkFilePath}/${parsedTokenReadFile.checkID}.json`)) {
                    const checkReadFile = await fsp.readFile(`${checkFilePath}/${parsedTokenReadFile.checkID}.json`, "utf8");
                    const parsedCheckFile = JSON.parse(checkReadFile);

                    callback(200, parsedCheckFile);
                } else {
                    fiveZeroZero();
                }
            } else {
                fourZeroZero();
            }
        }

        // http://127.0.0.1:3000/check and with request header
        _check.post = async () => {
            if (protocol && url && method && statusCode && timeoutSeconds) {
                const readTokenFile = await fsp.readFile(`${tokenFilePath}/${tokenHeader}.json`, "utf8");
                const parsedTokenFile = JSON.parse(readTokenFile);

                const generated = await generateToken(30);

                parsedTokenFile.checkID = generated;
                await fsp.writeFile(`${tokenFilePath}/${tokenHeader}.json`, JSON.stringify(parsedTokenFile));

                let objectCheck = {
                    checkID: generated,
                    phone: parsedTokenFile.phone,
                    protocol,
                    url,
                    method,
                    statusCode
                }

                await fsp.writeFile(`${checkFilePath}/${generated}.json`, JSON.stringify(objectCheck));
                callback(200, objectCheck);
            } else {
                fourZeroZero();
            }
        }

        _check.put = async () => {
            const returnedObject = findQuery();

            if (queryID) {
                if (protocol || url || method || statusCode || timeoutSeconds) {
                    let readTokenFile = await fsp.readFile(`${tokenFilePath}/${queryID}.json`, "utf8");
                    let parsedTokenFile = JSON.parse(readTokenFile);

                    const generated = await generateToken(30);

                    const checkReadFile = await fsp.readFile(`${checkFilePath}/${parsedTokenFile.checkID}.json`);
                    const parsedCheckFile = JSON.parse(checkReadFile);
                    console.log(parsedCheckFile);


                    parsedCheckFile.checkID = generated;
                    parsedCheckFile.phone = parsedTokenFile.phone;
                    parsedCheckFile.protocol = protocol;
                    parsedCheckFile.url = url;
                    parsedCheckFile.method = method;
                    parsedCheckFile.statusCode = statusCode;

                    await fsp.writeFile(`${checkFilePath}/${parsedTokenFile.checkID}.json`, JSON.stringify(parsedCheckFile));

                    const renamedCheckFile = await fsp.rename(`${checkFilePath}/${parsedTokenFile.checkID}.json`, `${checkFilePath}/${generated}.json`)

                    parsedTokenFile.checkID = generated;

                    await fsp.writeFile(`${tokenFilePath}/${queryID}.json`, JSON.stringify(parsedTokenFile));

                    readTokenFile = await fsp.readFile(`${tokenFilePath}/${queryID}.json`, "utf8");
                    parsedTokenFile = JSON.parse(readTokenFile);

                    callback(200, parsedTokenFile);
                    // callback(200,renamedCheckFile);
                } else {
                    fourZeroZero();
                }
            } else {
                fourZeroZero();
            }
        }

        _check.delete = async () => {
            let readTokenFile = await fsp.readFile(`${tokenFilePath}/${queryID}.json`, "utf8");
            let parsedTokenFile = JSON.parse(readTokenFile);

            console.log(parsedTokenFile);
            if (parsedTokenFile.checkID !== "") {
                if (queryID) {
                    // to delete the specific file

                    await fsp.unlink(`${checkFilePath}/${parsedTokenFile.checkID}.json`);
                    parsedTokenFile.checkID = "";

                    await fsp.writeFile(`${tokenFilePath}/${queryID}.json`, JSON.stringify(parsedTokenFile));
                    twoZeroZero();
                } else {
                    fourZeroZero();
                }
            } else {
                fiveZeroZero();
                // fourZeroZero(); 
            }
        }


        // console.log(requestProperties);
        // console.log(requestProperties.headerObject.token);

        const existsMethod = ["get", "post", "put", "delete"];
        if (existsMethod.includes(requestProperties.method)) {

            // verify it first
            if (verifyToken()) {
                _check[requestProperties.method]();
                // twoZeroZero();
            } else {
                fourZeroThree();
            }
        } else {
            fourZeroFive();
        }
    } catch (error) {
        fiveZeroZero();
    }


}

module.exports = checkHandler;