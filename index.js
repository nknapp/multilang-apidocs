/*!
 * multilang-apidocs <https://github.com/nknapp/multilang-apidocs>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var extract = require('multilang-extract-comments')
var patterns = require('comment-patterns')
var doctrine = require('doctrine')
var _ = require('lodash')
var compile = require('./lib/compile.js')
// var debug = require('debug')('multilang-apidocs')

var functionTemplate = compile('function.md.hbs')

var templates = {
  'function statement': functionTemplate,
  'function expression': functionTemplate
}

/**
 * The function extracts apidoc comments from a string and returns
 * a list with one markdown-string per comment.
 *
 *
 * @param {string} string contents of the source-code file.
 * @param {object=} options options
 * @param {string=} options.filename the name of the source-code file (Used to apply
 *    language-specific comment patterns and code-context detection.
 * @param {object=} options.defaults specify default values for values
 *    of the code-context and the parsed comment
 * @param {(FilterDefinition|function(object):boolean)=} options.filter filter the displayed comments
 *    This parameter can either be a function or a plain object.
 *    See ['filter definitions'](#filterDefinitions) for details
 * @return {string[]} a list of strings containing the apidoc in markdown format.
 */
module.exports = function multilangApidocs (string, options) {
  options = _.merge({}, {
    filter: filterDefaults,
    defaults: {}
  }, options)

  var comments = extract(string, options)
  var result = []
  // For debugging purpose: List of comment rejected by the filter
  result.filteredComments = []
  // List of comments for which not template could be found
  result.noTemplateFoundFor = []
  for (var key in comments) {
    if (comments.hasOwnProperty(key)) {
      var comment = comments[key]
      var resultItem = parse(comment, options.filename, options.defaults)
      // Find an appropriate template for the type of code-context

      if (commentFilter(resultItem, options.filter)) {
        var template = templates[resultItem.type]
        if (template) {
          result.push(template(resultItem))
        } else {
          result.noTemplateFoundFor.push(resultItem)
        }
      } else {
        result.filteredComments.push(resultItem)
      }
    }
  }
  return result
}

/**
 * Merge the extracted comment information (doctrine)
 * with the code-context information
 */
function parse (comment, filename, defaults) {
  var context = patterns.codeContext(filename).detect(comment.code, comment.codeStart)
  var doctrineResult = doctrine.parse(comment.content, {})
  // Run the parsed comment through a postprocessor to create
  // a format more suitable for templates

  var tagsByTitle = {}
  if (doctrineResult.tags) {
    doctrineResult.tags.forEach(function (tag) {
      var result = tagsByTitle[tag.title] = tagsByTitle[tag.title] || []
      result.push(tag)
    })
  // console.log("comment",comment, doctrineResult)
  // console.log("tagsByTitle", tagsByTitle)
  // comment.params = context.params.map
  }

  /**
   * @id MultilangApidocs.ApiDefinition
   * @typedef {object} ApiDefinition
   * @property {string} name the name of the documented entity
   * @property {string} description the description of the
   * @property {string} type one of the following types: TODO
   * @property {object[]} param function parameter-type definitions
   * @property {object} return the function return-type definition
   * @property {string} api the api visibility (public,private)
   * @property {boolean} isApidocComment true, if the comment delimiter of the
   *   comment is commonly used for apidocs comment in the current programming language.
   *
   */
  return {
    name: (tagsByTitle.name || {}).name || context.name || (defaults && defaults.name),
    description: doctrineResult.description,
    type: context.type,
    params: tagsByTitle.param,
    returns: tagsByTitle['return'] && tagsByTitle['return'][0],
    api: tagsByTitle.api && tagsByTitle.api[0].description,
    isApidocComment: !!comment.info.apidoc,
    id: tagsByTitle.id && tagsByTitle.id[0].description
  }
}

/**
 * Filter definitions
 * @id multilangApidocs.filterDefinition
 * @typedef {object} FilterDefinition
 * @property {boolean=true} showPublic show public comments
 * @property {boolean=false} showPrivate show private comments
 * @property {boolean=false} showWithoutApiTag show comments that have no @api-tag attached
 * @property {boolean=true} onlyApidocComments show only comments that are normally used
 *    as apidoc tags for the current language.
 * @api public
 */
/**
 *
 * @type {FilterDefinition}
 */
var filterDefaults = {
  showPublic: true,
  showPrivate: false,
  showWithoutApiTag: false,
  onlyApidocComments: true
}

/**
 *
 * @param {ApiDefinition} postProcessedComment the comment object after post-processing.
 * @param {(FilterDefinition|function(ApiDefinition):boolean)} filter see the
 * [options.filter-parameter](#multilangApidocs) or the main function.
 *
 */
function commentFilter (postProcessedComment, filter) {
  if (_.isFunction(filter)) {
    return filter(postProcessedComment)
  }
  if (_.isPlainObject(filter)) {
    var basedOnApiTag =
    (filter.showPublic && postProcessedComment.api === 'public') ||
      (filter.showPrivate && postProcessedComment.api === 'private') ||
      (filter.showWithoutApiTag && !postProcessedComment.api)

    var basedOnCommentType =
    (!filter.onlyApidocComments || postProcessedComment.isApidocComment)
    // console.log({
    //  basedOnApiTag: basedOnApiTag,
    //  basedOnCommentType: basedOnCommentType,
    //  filter: filter,
    //  comment: postProcessedComment
    // })
    // console.log("\n")

    return basedOnApiTag && basedOnCommentType
  }
  throw new Error('filter-option must be either a function or a plain object, but is ' + filter, 'E_INVALID_FILTER')

}
