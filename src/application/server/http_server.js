const express = require("express");
const util = require("util");

exports.make = function make(portNumber, contentDir, notFoundPageToServe) {
  const httpServer = express();

  httpServer.set("views", "src/application/server/views/");
  httpServer.engine(".js", require("@chooie/js_to_html").__express);
  httpServer.set("view engine", "js");

  httpServer.get("/", function(req, res) {
    res.set("Content-Type", "text/html");
    res.render("index");
  });

  httpServer.use(express.static(contentDir));
  httpServer.use(function(req, res, next) {
    res.status("404").render("404");
  });

  return {
    start() {
      const listenFn = httpServer.listen.bind(httpServer);
      const listenPromise = util.promisify(listenFn);
      return listenPromise(portNumber);
    },

    stop() {
      const closeFn = httpServer.close.bind(httpServer);
      const closePromise = util.promisify(closeFn);
      return closePromise();
    },

    getHttpServer() {
      return httpServer;
    }
  };
};
