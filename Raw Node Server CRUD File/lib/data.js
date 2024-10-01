// dependencies
const path = require("path");
const fs = require("fs");
const fsp = require("fs").promises;

// object or scaffolding
const data = {};

// crud operation in .data for secure
data.baseDirectory = path.join(__dirname, "/../.data");

data.create = async function (directory, file, callback) {
    const directoryPath = this.baseDirectory + `/${directory}`;
    const filePath = directoryPath + `/${file}.txt`;
    const baseDirectory = path.basename(directoryPath);
    const baseFile = path.basename(filePath);

    const objectInformation = {};
    objectInformation.directory = `${baseDirectory} directory is exists`;
    objectInformation.file = `${baseFile} file is exists`;

    try {
        if (!fs.existsSync(directoryPath)) {
            await fsp.mkdir(directoryPath);
            objectInformation.directory = `${baseDirectory} directory created successfully`;
        }

        if (!fs.existsSync(filePath)) {
            const openFile = await fsp.open(filePath, "w");
            objectInformation.file = `${baseFile} file created successfully`;
            openFile.close();
        }

        callback(objectInformation);
    } catch (error) {
        console.log(error);
    }
}

data.read = async function (directory, file, callback) {
    const directoryPath = this.baseDirectory + `/${directory}`;
    const filePath = directoryPath + `/${file}.txt`;
    const baseDirectory = path.basename(directoryPath);
    const baseFile = path.basename(filePath);

    const objectInformation = {};
    objectInformation.directory = `${baseDirectory} directory is exists`;
    objectInformation.file = `${baseFile} file is exists`;

    try {
        if (!fs.existsSync(directoryPath))
            objectInformation.directory = `${baseDirectory} directory is not exists`;
        if (!fs.existsSync(filePath))
            objectInformation.file = `${baseFile} file is not exists`;
        if (!fs.existsSync(directoryPath) ||
            !fs.existsSync(filePath))
            callback(objectInformation, "directory or file doesn't exist, created yet", "error");

        const readFile = await fsp.readFile(filePath,"utf8");
        callback(objectInformation, "read successfully", readFile);
    } catch (error) {
        console.log(error);
    }
}

data.update = async function (directory, file, data, callback) {
    const directoryPath = this.baseDirectory + `/${directory}`;
    const filePath = directoryPath + `/${file}.txt`;
    const baseDirectory = path.basename(directoryPath);
    const baseFile = path.basename(filePath);

    const objectInformation = {};
    objectInformation.directory = `${baseDirectory} directory is exists`;
    objectInformation.file = `${baseFile} file is exists`;


    try {
        if (!fs.existsSync(directoryPath))
            objectInformation.directory = `${baseDirectory} directory is not exists`;
        if (!fs.existsSync(filePath))
            objectInformation.file = `${baseFile} file is not exists`;
        if (!fs.existsSync(directoryPath) ||
            !fs.existsSync(filePath))
            callback(objectInformation, "directory or file doesn't exist, created yet", "error");

        const updateFile = await fsp.appendFile(filePath, `${data}\n`);
        const readFile = await fsp.readFile(filePath,"utf8");
        callback(objectInformation, "updated successfully", readFile);
    } catch (error) {
        console.log(error);
    }
}

data.delete = async function (directory, file, callback) {
    const directoryPath = this.baseDirectory + `/${directory}`;
    const filePath = directoryPath + `/${file}.txt`;
    const baseDirectory = path.basename(directoryPath);
    const baseFile = path.basename(filePath);

    const objectInformation = {};
    objectInformation.directory = `${baseDirectory} directory is exists`;
    objectInformation.file = `${baseFile} file is exists`;

    try {
        if (!fs.existsSync(directoryPath))
            objectInformation.directory = `${baseDirectory} directory is not exists`;
        if (!fs.existsSync(filePath))
            objectInformation.file = `${baseFile} file is not exists`;
        if (!fs.existsSync(directoryPath) ||
            !fs.existsSync(filePath))
            callback(objectInformation, "directory or file doesn't exist");

        // if (directory !== "")
        //     await fsp.rmdir(directoryPath),
        //         objectInformation.directory = `${directoryPath} directory is deleted`;
        if (file !== "")
            await fsp.unlink(filePath),
                objectInformation.file = `${baseFile} file is deleted`;


        callback(objectInformation, "deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

console.log("This directory and file from ./helper/data .");
module.exports = data;