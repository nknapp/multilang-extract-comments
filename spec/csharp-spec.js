"use strict";

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */

/* deps:mocha */
require("should");
var path = require("path");
var extract = require("..");
var fs = require("fs");

function read(fp) {
  return fs.readFileSync(
    path.join(__dirname, "/fixtures/samples/", fp),
    "utf8"
  );
}

describe("extract comments from C#", function () {
  var str = read("csharp.cs");
  var comments = extract(str, {
    filename: "csharp.cs",
  });

  it("should handle single line comments:", function () {
    expect(comments["1"]).toEqual({
      begin: 1,
      end: 1,
      codeStart: 2,
      content: "TODO: A single line comment\n",
      info: { type: "singleline" },
      code: "using System;",
    });
  });

  it("should handle multiline comments:", function () {
    expect(comments["10"]).toEqual({
      begin: 10,
      end: 12,
      codeStart: 13,
      content:
        "TODO: A multiline-comment\n           with multiple lines\n           ",
      info: { type: "multiline" },
      code: '            Console.WriteLine("Hello World!");',
    });
  });
});
