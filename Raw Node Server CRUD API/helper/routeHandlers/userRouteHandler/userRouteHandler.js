const passwordHash = require(`${__dirname}/../../../utilities/secureHash`);
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");


const userRouteHandler = (requestProperties, callback) => {
    const _user = {};

    // global variables
    let filePath = path.join(__dirname, "/../../../.data/user/file.json");
    let readFile;

    // global request properties
    let firstName = typeof requestProperties.body.firstName === "string" &&
        requestProperties.body.firstName.trim().length !== 0 ? requestProperties.body.firstName
        : false;
    let lastName = typeof requestProperties.body.lastName === "string" &&
        requestProperties.body.lastName.trim().length !== 0 ? requestProperties.body.lastName
        : false;
    let phone = typeof requestProperties.body.phone === "string" &&
        requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone
        : false;
    let password = typeof requestProperties.body.password === "string" &&
        requestProperties.body.password.trim().length !== 0 ? requestProperties.body.password
        : false;
    let tosAgreement = typeof requestProperties.body.tosAgreement === "boolean" &&
        requestProperties.body.tosAgreement ? requestProperties.body.tosAgreement
        : false;

    let queryPhone = typeof requestProperties.queryStringObject.phone === "string" &&
        requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone
        : "";

    const twoZeroZero = () => {
        callback(200, readFile);
    }

    const fourZeroZero = () => {
        callback(400, {
            "message": "bad request"
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

    const fiveZeroZero = () => {
        callback(500, {
            "error": "internal server error"
        });
    }

    const getQueryFunction = () => {
        for (let i = 0; i < readFile.data.length; ++i) {
            if (readFile.data[i].phone === queryPhone) {
                // callback(200, readFile.data[i]);
                return {
                    bool: true,
                    queryReadFile: readFile.data[i],
                    index: parseInt(i)
                };
            }
        }
        return {
            bool: false,
            queryReadFile: readFile,
            index: null
        };
    }

    const putQueryFunction = () => {
        for (let i = 0; i < readFile.data.length; ++i) {
            if (readFile.data[i].phone === queryPhone) {
                readFile.data[i].firstName = typeof requestProperties.body.firstName === "string" &&
                    requestProperties.body.firstName.trim().length !== 0 ? requestProperties.body.firstName
                    : false;
                readFile.data[i].lastName = typeof requestProperties.body.lastName === "string" &&
                    requestProperties.body.lastName.trim().length !== 0 ? requestProperties.body.lastName
                    : false;
                readFile.data[i].phone = typeof requestProperties.body.phone === "string" &&
                    requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone
                    : false;
                readFile.data[i].password = typeof requestProperties.body.password === "string" &&
                    requestProperties.body.password.trim().length !== 0 ? passwordHash(requestProperties.body.password)
                    : false;
                readFile.data[i].tosAgreement = typeof requestProperties.body.tosAgreement === "boolean" &&
                    requestProperties.body.tosAgreement ? requestProperties.body.tosAgreement
                    : false;

                return {
                    bool: true,
                    queryReadFile: readFile.data[i]
                };
            }
        }
        return {
            bool: false,
            queryReadFile: readFile
        };
    }

    const deleteQueryFunction = () => {
        const returnedQueryObject = getQueryFunction();
        if (returnedQueryObject.bool) {
            readFile.data.splice(returnedQueryObject.index, 1);
            return {
                bool: true,
                queryReadFile: readFile.data[returnedQueryObject.index],
            };
        }
        return {
            bool: false,
            queryReadFile: readFile,
        };
    }

    let objectKeys = Object.keys(requestProperties.queryStringObject);

    // need authentication for get
    _user.get = async function () {
        console.log("from get request");
        console.log("request Properties :", requestProperties);

        try {
            readFile = await fsp.readFile(filePath, "utf8");
            readFile = JSON.parse(readFile);

            if (objectKeys.length !== 0) {
                if (queryPhone !== "") {
                    const returnedQueryObject = getQueryFunction();
                    if (returnedQueryObject.bool) {
                        callback(200, returnedQueryObject.queryReadFile);
                    } else {
                        fourZeroFour();
                    }
                } else {
                    fourZeroFour();
                }
            } else {
                twoZeroZero();
            }
        } catch (error) {
            fiveZeroZero();
        }
    };

    _user.post = async function () {
        console.log("from post request");

        try {
            if (firstName && lastName && phone && password && tosAgreement) {
                let postObject = {
                    firstName,
                    lastName,
                    phone,
                    password: passwordHash(password), // hash this password for security, use hash by using crypto module
                    tosAgreement
                }

                if (fs.existsSync(filePath)) {
                    readFile = await fsp.readFile(filePath, "utf8");
                    readFile = JSON.parse(readFile); // making string to parse for JSON
                    readFile.data.push(postObject);

                    await fsp.writeFile(filePath, JSON.stringify(readFile));
                    twoZeroZero();
                } else {
                    throw "error";
                }
            } else {
                fourZeroZero();
            }
        } catch (error) {
            console.log(error);
            fiveZeroZero();
        }

    };

    // need authentication for put
    _user.put = async function () {
        console.log("from put request");
        try {
            readFile = await fsp.readFile(filePath, "utf8");
            readFile = JSON.parse(readFile);

            if (objectKeys.length !== 0) {

                if (queryPhone !== "") {
                    const returnedQueryObject = putQueryFunction();
                    if (returnedQueryObject.bool) {
                        await fsp.writeFile(filePath, JSON.stringify(readFile));
                        callback(200, returnedQueryObject.queryReadFile);
                    } else {
                        fourZeroFour();
                    }

                } else {
                    fourZeroFour();
                }
            } else {
                fourZeroFour();
            }
        } catch (error) {
            fiveZeroZero();
        }

    };

    // need authentication for delete
    _user.delete = async function () {
        console.log("from delete request");

        try {
            readFile = await fsp.readFile(filePath, "utf8");
            readFile = JSON.parse(readFile);

            if (objectKeys.length !== 0) {

                if (queryPhone !== "") {
                    const returnedQueryObject = deleteQueryFunction();
                    if (returnedQueryObject.bool) {
                        await fsp.writeFile(filePath, JSON.stringify(readFile));
                        twoZeroZero();
                    } else {
                        fourZeroFour()
                    }
                } else if (phone === "") {
                    fourZeroFour();
                }
            } else {
                fourZeroFour()
            }
        } catch (error) {
            console.log(error);
            fiveZeroZero();
        }

    };

    console.log("this is userRouteHandler.");
    const checkingMethods = ["get", "post", "put", "delete"];

    if (checkingMethods.includes(requestProperties.method)) {
        _user[requestProperties.method]();
    } else {
        console.log("method doesn't included yet");
        fourZeroFive();
    }

}

module.exports = userRouteHandler;