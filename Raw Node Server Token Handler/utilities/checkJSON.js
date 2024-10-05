// requested data checking of object format
const checkJSON = (stringBufferData) => {
    let object;
    try {
        object = JSON.parse(stringBufferData);
    } catch {
        object = {};
    }

    return object;
}

module.exports = checkJSON;