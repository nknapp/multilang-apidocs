/*!
 * multilang-apidocs <https://github.com/nknapp/multilang-apidocs>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var extract = require("multilang-extract-comments");
var patterns = require("comment-patterns");
var doctrine = require("doctrine");
var _ = require("lodash");
var compile = require("./lib/compile.js");

var templates = {
  "function statement": compile("function.md.hbs"),
  "function expression": compile("function.md.hbs")
}

/**
 *
 * @param {String} string contents of the source-code file.
 * @param {Object} options options
 * @param {String} options.filename the name of the source-code file.
 * @param {Object} options.defaults specify default values that are merged with the
 */
module.exports = function multilangApidocs(string, options) {
  var _options = options || {}
  var comments = extract(string, options);
  var result = [];
  for (var key in comments) {
    if (comments.hasOwnProperty(key)) {
      var comment = comments[key];
      var codeContext = patterns.codeContext(options.filename).detect(comment.code, comment.codeStart);
      var parsedComment = doctrine.parse(comment.content, {});
      // Run the parsed comment through a postprocessor to create
      // a format more suitable for templates
      var json = postProcess(parsedComment, codeContext, _options.defaults || {})
      // Find an appropriate template for the type of code-context
      if (json.api === 'public') {
        var template = templates[json.type];
        if (template) {
          result.push(template(json))
        } else {
          console.log("No template found for ", json);
          result.push(json);
        }
      }
    }
  }
  return result;
}

/**
 * Merge the extracted comment information (doctrine)
 * with the code-context information
 */
function postProcess(comment, context, defaults) {
  var tagsByTitle = {};
  if (comment.tags) {
    comment.tags.forEach(function (tag) {
      var result = tagsByTitle[tag.title] = tagsByTitle[tag.title] || [];
      result.push(tag);
    });
    //console.log("comment",comment);
    //console.log("tagsByTitle", tagsByTitle);
    //comment.params = context.params.map
  }

  return {
    name: ( tagsByTitle.name || {}).name || context.name || (defaults && defaults.name),
    description: comment.description,
    type: context.type,
    params: tagsByTitle.param,
    return: tagsByTitle.return && tagsByTitle.return[0],
    api: tagsByTitle.api && tagsByTitle.api[0].description
  }
}
