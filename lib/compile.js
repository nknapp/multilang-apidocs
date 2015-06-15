var Handlebars = require('handlebars')
var fs = require('fs')
var path = require('path')

// Initialize handlebars
Handlebars = Handlebars.create()

Handlebars.registerHelper('typeDef', require('./helper-typeDef.js'))

/**
 * Compile a handlebars-template from the `templates` subdirectory
 * @param {string} templateName the filename
 * @returns {function} a compiled template
 */
module.exports = function (templateName) {
  var filePath = path.join(__dirname, '..', 'templates', templateName)
  var contents = fs.readFileSync(filePath, 'utf-8')
  return Handlebars.compile(contents, {
    noEscape: true
  })
}
