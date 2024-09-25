let fs = require("fs").promises;

// fspromise 
async function main() {
    try {
        let writeData = new Uint8Array(Buffer.from("Promise\n"));
        await fs.writeFile("new.txt", writeData);
        await fs.appendFile("new.txt",writeData);
        let readPromise = await fs.readFile("new.txt", { encoding: "utf8" });
        console.log(readPromise.toString());
    } catch (error) {
        console.log(error.message);
    }
}

main()