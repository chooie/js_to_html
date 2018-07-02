const express = require("express");
const util = require("util");
const main = require("../shared/main.js");

function makeTitle(title) {
  return ["title", title];
}

exports.make = function make(portNumber, contentDir, notFoundPageToServe) {
  const httpServer = express();

  httpServer.set("views", "src/application/client/content/template_views");
  httpServer.set("view engine", "pug");

  httpServer.get("/", function(req, res) {
    res.set("Content-Type", "text/html");
    const contentHtml = main.toHtml([
      "html",
      [
        "head",
        "<!-- App home page -->",
        makeTitle("Home - Automatopia NodeJS")
      ],
      ["body", ["h1", { id: "header-text" }, "Hello, world!"]]
    ]);
    res.status(400).send(contentHtml);
  });

  httpServer.use(express.static(contentDir));
  httpServer.use(function(req, res, next) {
    res
      .status(404)
      .render("404", { title: "Page Not Found - Automatopia NodeJS" });
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
