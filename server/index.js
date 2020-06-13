/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
const http = require("http");
const express = require("express");
const path = require("path");
const config = require("../config");
const socket = require("./lib/socket");

const app = express();
const server = http.createServer(app);

app.use("/", express.static(`${__dirname}/../client`));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/html/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(config.PORT, () => {
  socket(server);
  console.log("Server is listening at :", config.PORT);
});
