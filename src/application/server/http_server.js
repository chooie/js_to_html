const express = require("express");
const util = require("util");

const jsToHtml = require("../shared/main.js");
const myUtil = require("../shared/util.js");

const pages = require("./pages.js");

exports.make = function make(portNumber, contentDir, notFoundPageToServe) {
  const httpServer = express();

  httpServer.engine("js", function(filePath, options, callback) {
    const content = require(filePath).page(options);

    if (!Array.isArray(content)) {
      throw new Error(
        myUtil.stripMargin`
          |exports.page must be set to a function that returns an array that
          |conforms to the @chooie/js_to_html structure as documented at
          |'https://github.com/chooie/js_to_html'.
          |Got '${content}' of type ${typeof content}.
          |Issue found in file '${filePath}'.`
      );
    }

    const rendered = jsToHtml.convert(content);
    return callback(null, rendered);
  });

  httpServer.set("views", "src/application/server/views/");
  httpServer.set("view engine", "js");

  httpServer.get("/", function(req, res) {
    res.set("Content-Type", "text/html");
    const contentHtml = pages.makeIndexPage();
    res.status(200).send(contentHtml);
  });

  httpServer.get("/foo", function(req, res) {
    res.render("test.js");
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
