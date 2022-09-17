import express from "express";
import dotenv from "dotenv";
import router from "./server/routes";
async function init() {
  const app = express();
  dotenv.config();
  router(app);
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log("server listen on port: ", port);
  });
}

init().then();
