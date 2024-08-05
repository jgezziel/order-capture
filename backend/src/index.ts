import app from "./app";
import db from "./db";

const port: string = app.get("port");
const apiURL: string = app.get("apiURL");

const init = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log("✔️ Database connection established");
    app.listen(port, () => {
      console.log(`✔️ Server is listening on: http://localhost:${apiURL}`);
    });
  } catch (error) {
    console.error(`❌ Server could not start. Error: ${error}`);
    process.exit(1);
  }
};

void init();
