import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url);
import express from "express";
import bodyParser from "body-parser";
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { donutsRouter } from "./routes/donuts.js"
import  swaggerUi  from "swagger-ui-express";

const swaggerDocument = require('./swagger.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

const port = 4000; 

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Store db in express app
app.db = db;

// Read data from JSON file, this will set db.data content
await db.read();

// If file.json doesn't exist, db.data will be null
// Set default data
db.data = db.data; 

// Finally write db.data content to file
await db.write()

// Swagger doc route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Donuts route 
app.use("/donuts", donutsRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});