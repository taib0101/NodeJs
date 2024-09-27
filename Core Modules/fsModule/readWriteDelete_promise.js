let fs = require("fs").promises;

// fspromise 
async function main() {
    try {
        // if you want abort you can do it here
        // let controller = new AbortController().signal;
        // console.log(controller);

        // write
        let writeData = new Uint8Array(Buffer.from("Promise\n"));
        await fs.writeFile(`${__dirname}/new.txt`, "bro this is taib\n");
        await fs.appendFile(`${__dirname}/new.txt`,writeData);

        // read
        // let readPromise = await fs.readFile(`${__dirname}/new.txt`s);
        let readPromise = await fs.readFile(`${__dirname}/new.txt`, { encoding: "utf8" });
        console.log(readPromise.toString());

        // delete
        await fs.unlink(`${__dirname}/new.txt`);
    } catch (error) {
        console.log(error.message);
    }
}

main()