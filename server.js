const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { getHome, listeningLog, ErrorHandling,postLinks} = require("./src/controller/callBack.js");
const port = process.env.PORT || 8080;

const homeRouter = express.Router();

const server = express();
server.use(express.json());
server.use(cors());
server.use(
              helmet({
                            contentSecurityPolicy: false
                })
);
server.use(morgan());
server.use(express.static("public"));
server.use("/",homeRouter)

homeRouter
.route("/")
.get(getHome)

homeRouter
.route("/scrap")
.post(postLinks)

server.listen(port, listeningLog)
server.use("*", ErrorHandling)