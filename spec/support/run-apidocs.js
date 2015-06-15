/*!
 * multilang-apidocs <https://github.com/nknapp/multilang-apidocs>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */

var multilangApidocs = require('../../')
var _ = require('lodash')
var path = require('path')
var fs = require('fs')

var outputDir = path.resolve(__dirname, '..', '..', 'test-output')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

/**
 *
 * @param fixture {string}
 * @param opts {object}
 * @returns {string[]}
 */
module.exports = function runApidocs (fixture, opts) {
  var contents = fs.readFileSync(path.resolve(__dirname, '..', 'fixtures', fixture), 'utf-8')
  var result = multilangApidocs(
    contents, _.merge({
      filename: fixture
    }, opts
    ))
  fs.writeFileSync(path.join(outputDir, fixture + '.md'), result.join('\n'))
  return result
}
