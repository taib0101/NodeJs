const passwordHash = require(`${__dirname}/../../../utilities/secureHash`);
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");


const userRouteHandler = async (requestProperties, callback) => {
    const _user = {};

    const fiveZeroZero = () => {
        callback(500, {
            "error": "internal server error"
        });
    }

    try {
        // global variables
        const filePath = path.join(__dirname, "/../../../.data/user/file.json");
        const readFile = await fsp.readFile(filePath, "utf8");
        const parsedReadFile = JSON.parse(readFile);

        // global request properties
        const firstName = typeof requestProperties.body.firstName === "string" &&
            requestProperties.body.firstName.trim().length !== 0 ? requestProperties.body.firstName
            : false;
        const lastName = typeof requestProperties.body.lastName === "string" &&
            requestProperties.body.lastName.trim().length !== 0 ? requestProperties.body.lastName
            : false;
        const phone = typeof requestProperties.body.phone === "string" &&
            requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone
            : false;
        const password = typeof requestProperties.body.password === "string" &&
            requestProperties.body.password.trim().length !== 0 ? requestProperties.body.password
            : false;
        const tosAgreement = typeof requestProperties.body.tosAgreement === "boolean" &&
            requestProperties.body.tosAgreement ? requestProperties.body.tosAgreement
            : false;

        const token = "";

        const queryPhone = typeof requestProperties.queryStringObject.phone === "string" &&
            requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone
            : "";


        const twoZeroZero = () => {
            callback(200, parsedReadFile);
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

        if(queryPhone !== "phone") fourZeroZero();
        
        const getQueryFunction = () => {
            for (let i = 0; i < parsedReadFile.data.length; ++i) {
                if (parsedReadFile.data[i].phone === queryPhone) {
                    // callback(200, readFile.data[i]);
                    return {
                        bool: true,
                        queryReadFile: parsedReadFile.data[i],
                        index: parseInt(i)
                    };
                }
            }
            return {
                bool: false,
                queryReadFile: parsedReadFile,
                index: null
            };
        }

        const putQueryFunction = () => {
            for (let i = 0; i < parsedReadFile.data.length; ++i) {
                if (parsedReadFile.data[i].phone === queryPhone) {
                    parsedReadFile.data[i].firstName = typeof requestProperties.body.firstName === "string" &&
                        requestProperties.body.firstName.trim().length !== 0 ? requestProperties.body.firstName
                        : false;
                    parsedReadFile.data[i].lastName = typeof requestProperties.body.lastName === "string" &&
                        requestProperties.body.lastName.trim().length !== 0 ? requestProperties.body.lastName
                        : false;
                    parsedReadFile.data[i].phone = typeof requestProperties.body.phone === "string" &&
                        requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone
                        : false;
                    parsedReadFile.data[i].password = typeof requestProperties.body.password === "string" &&
                        requestProperties.body.password.trim().length !== 0 ? passwordHash(requestProperties.body.password)
                        : false;
                    parsedReadFile.data[i].tosAgreement = typeof requestProperties.body.tosAgreement === "boolean" &&
                        requestProperties.body.tosAgreement ? requestProperties.body.tosAgreement
                        : false;

                    return {
                        bool: true,
                        queryReadFile: parsedReadFile.data[i]
                    };
                }
            }
            return {
                bool: false,
                queryReadFile: parsedReadFile
            };
        }

        const deleteQueryFunction = () => {
            const returnedQueryObject = getQueryFunction();
            if (returnedQueryObject.bool) {
                parsedReadFile.data.splice(returnedQueryObject.index, 1);
                return {
                    bool: true,
                    queryReadFile: parsedReadFile.data[returnedQueryObject.index],
                };
            }
            return {
                bool: false,
                queryReadFile: parsedReadFile,
            };
        }

        let objectKeys = Object.keys(requestProperties.queryStringObject);

        // need authentication for get
        _user.get = async function () {
            console.log("from get request");
            console.log("request Properties :", requestProperties);

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
        }

        _user.post = async function () {
            console.log("from post request");

            if (firstName && lastName && phone && password && tosAgreement) {
                let postObject = {
                    firstName,
                    lastName,
                    phone,
                    password: passwordHash(password), // hash this password for security, use hash by using crypto module
                    token,
                    tosAgreement
                }

                parsedReadFile.data.push(postObject);
                await fsp.writeFile(filePath, JSON.stringify(parsedReadFile));
                twoZeroZero();
            } else {
                fourZeroZero();
            }

        };

        // need authentication for put
        _user.put = async function () {
            console.log("from put request");

            if (objectKeys.length !== 0) {

                if (queryPhone !== "") {
                    const returnedQueryObject = putQueryFunction();
                    if (returnedQueryObject.bool) {
                        await fsp.writeFile(filePath, JSON.stringify(parsedReadFile));
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
        };

        // need authentication for delete
        _user.delete = async function () {
            console.log("from delete request");

            if (objectKeys.length !== 0) {

                if (queryPhone !== "") {
                    const returnedQueryObject = deleteQueryFunction();
                    if (returnedQueryObject.bool) {
                        await fsp.writeFile(filePath, JSON.stringify(parsedReadFile));
                        twoZeroZero();
                    } else {
                        fourZeroFour()
                    }
                } else if (queryPhone === "") {
                    fourZeroFour();
                }
            } else {
                fourZeroFour()
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
    } catch (error) {
        console.log(error);
        fiveZeroZero();
    }

}

module.exports = userRouteHandler;
