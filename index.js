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

    // use router
    app.use(Router);

    // listen on port
    app.listen(5000, () =>
      console.log("Server running at http://localhost:5000")
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
