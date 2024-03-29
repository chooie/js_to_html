# JS to HTML
[![npm](https://img.shields.io/npm/v/@chooie/js_to_html)](https://www.npmjs.com/package/@chooie/js_to_html)

Convert JS data structures to HTML text.

## Install
`npm install --save @chooie/js_to_html`

## Public API
```js
function convert(element: Element): String
```

An Element is:

`[elementName: String, ?&element: Element || ?&text: String]`

or

```
[
  elementName: String,
  htmlAttributes: { String: String },
  ?&element: Element || ?&text: String
]
```

## Example
```js
const jsToHtml = require("@chooie/js_to_html");
const structureToConvert = [
  "html",
  ["head"],
  [
    "body",
    [
      "div",
      ["h1", { class: "class1" }, ["span", "Hello, world!"]],
      ["p", { class: "class2" }, ["span", "Goodbye, world!"]],
      makeListOfNames(["Charlie", "Rachael", "Maddie", "Lilla", "Paul"])
    ]
  ]
];

console.log(jsToHtml.convert(structureToConvert));

function makeListOfNames(names) {
  return [
    "ul",
    { class: "names-list" },
    ...names.map(function(name) {
      return ["li", { class: "names-list__name" }, name];
    })
  ];
}
```

outputs

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div>
      <h1 class="class1">
        <span>
          Hello, world!
        </span>
      </h1>
      <p class="class2">
        <span>
          Goodbye, world!
        </span>
      </p>
      <ul class="names-list">
        <li class="names-list__name">
          Charlie
        </li>
        <li class="names-list__name">
          Rachael
        </li>
        <li class="names-list__name">
          Maddie
        </li>
        <li class="names-list__name">
          Lilla
        </li>
        <li class="names-list__name">
          Paul
        </li>
      </ul>
    </div>
  </body>
</html>
```

## Express Integration
### src/application/server/http_server.js

```js
const httpServer = express();

httpServer.set("views", "src/application/client/content/template_views/");
httpServer.engine("page.js", require("@chooie/js_to_html").__express);
httpServer.set("view engine", "page.js");

httpServer.get("/", function(req, res) {
  res.render("index", { colors: ["Red", "Blue", "Green"] });
});
```

### src/application/client/content/template_views/index.page.js
```js
const head = require("./partials/head.js");
const util = require("../../../shared/util.js");

exports.page = function page(options) {
  return [
    "html",
    [
      "head",
      "<!-- smoke test marker: App home page -->",
      ["title", "Home - Automatopia NodeJS"],
      ...head.make()
    ],
    [
      "body",
      ["h1", { id: "header-text" }, "Hello, world!"],
      makeList(options.colors),
      ["script", { src: "bundle.js" }],
      [
        "script",
        util.stripMargin`
          |const client = require("./main.js");
          |console.log(client.isTrue());
          |`
      ]
    ]
  ];
};

function makeList(items) {
  return [
    "ul",
    ...items.map(function(item) {
      return ["li", item];
    })
  ];
}
```

### src/application/client/content/template_views/partials/head.js

```js
exports.make = function make() {
  return [
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href: "styles/vendor/normalize-3.0.2.css"
      }
    ],
    ["link", { rel: "stylesheet", type: "text/css", href: "styles/main.css" }],
    [
      "link",
      { rel: "shortcut icon", type: "image/png", href: "nodejs-512.png" }
    ]
  ];
};
```

## Karma Integration
https://github.com/chooie/karma-js_to_html-preprocessor

## Why use this approach?
- It's just JavaScript data structures. No need to learn a new paradigm or
  special syntax.
- Because it's JavaScript, you can use all the powerful programming constructs
  that the language provides: looping, array concatenation, variables,
  functions, etc.

## Roadmap
- Caching?
- Support for self-closing elements? Possibly unnecessary?
- <<Your suggestion here!\>\>

## Development
View the available tasks to run

### Run on your local machine

``` bash
./tasks.sh
```

### Run within Docker

```bash
./docker-tasks.sh
```

### Quickstart

- Install docker (I'm running 18.03.0-ce-mac60)
- Start the Karma server

    ```bash
    ./docker-tasks.sh karma
    ```
- Capture the browsers you want to test by visiting http://localhost:9876
- Run all the checks

    ```bash
    ./docker-tasks.sh test:all
    ```
- Start the application

    ```bash
    ./docker-tasks.sh run
    ```

## Setup
### Frontend testing requirements
In order to perform cross-browser testing professionally, we must test our
application in real browsers. The testing infrastructure checks that the
expected browsers are tested. You will need to install the necessary browsers
and run the necessary emulators(or test loosely - see the error message).

I recommend that you test all browsers/platforms that you intend to serve
as part of the automated testing.

With this in place, make sure to start the karma server and capture each of
the browsers you would like to test by visiting http://localhost:9876 (may
differ if you are in an emulator - read the docs for that environment).

## Gotchas
When limiting the mocha tests that you want to run with `.skip()` or `.only()`,
make sure to use the `test:quick` task first to get a passing suite (WITH NO
LIMITS SPECIFIED YET). Then limit your tests and run `test:quick` again.

There is something weird going on with our jake test tasks, mocha, and/or karma
that is stopping this from working properly (like with `test:all`).

## Credits
  Much of the inspiration and implementation is borrowed from James Shore
  (https://github.com/jamesshore). I highly recommend his webseries Let's Code
  Test Driven Javascript (http://www.letscodejavascript.com/).
