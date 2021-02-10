const express = require("express");
const db = require("./config/database");
const Router = require("./routes/routes");

const app = express();
app.use(express.json());

// Testing database connection

async function main() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    // handle cors
    app.use('/', (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("token", "token");
      res.setHeader("Content-Type", "application/json");
  
      next();
    })

    // use router
    app.use(Router);

    // listen on port
    const PORT = 3000;
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();

