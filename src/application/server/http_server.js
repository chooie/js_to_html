const express = require("express");
const util = require("util");

const pages = require("./pages.js");

exports.make = function make(portNumber, contentDir, notFoundPageToServe) {
  const httpServer = express();

  httpServer.set("views", "src/application/server/views/");
  httpServer.set("view engine", "@chooie/js_to_html");

  httpServer.get("/", function(req, res) {
    res.set("Content-Type", "text/html");
    const contentHtml = pages.makeIndexPage();
    res.status(200).send(contentHtml);
  });

  httpServer.get("/foo", function(req, res) {
    res.render("test");
  });

  httpServer.use(express.static(contentDir));
  httpServer.use(function(req, res, next) {
    res.set("Content-Type", "text/html");
    const contentHtml = pages.make404Page();
    res.status(404).send(contentHtml);
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
