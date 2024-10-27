// not for type module 
console.log("File Path :", __filename);
console.log("Directory Path :", __dirname);

// for type module
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
