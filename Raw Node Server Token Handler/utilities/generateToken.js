const generateToken = (stringLength) => {
    const length = typeof stringLength === "number" &&
        stringLength > 0 ? stringLength : false;
    const possibleCharacter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let output = "";
    for(let i = 1; i <= stringLength; ++i)
        output += possibleCharacter.charAt(Math.random() * stringLength);
    return output;
    // checking it for future work
}

module.exports = generateToken;