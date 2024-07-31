import app from "./app";

const port: string = app.get("port");
const apiURL: string = app.get("apiURL");

const init = () => {
  try {
    app.listen(port, () => {
      console.log(`✔️ Server is listening on: http://localhost:${apiURL}`);
    });
  } catch (error) {
    console.error(`❌ Server could not start. Error: ${error}`);
    process.exit(1);
  }
};

void init();
