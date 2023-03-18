import express from "express";
import dotenv from "dotenv";
import server from "./server";

async function init() {
  const app = express();

  dotenv.config();

  await server(app)

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log("⚡ server listen on port: ", port);
  });
}

init().then();
