/* global describe */
/* global it */
/* global expect */
// /* global xdescribe */
/* global xit */

'use strict'

var runApidocs = require('./support/run-apidocs.js')

describe('multilang-apidocs:', function () {
  it('should provide a comment from a handlebars-partial', function () {
    var result = runApidocs('handlebars-partial.hbs')
    console.log(result);
    expect(result.length).toBe(1)
    expect(result[0]).toMatch(/handlebarsPartial/)
  })
  // Not working yet. Try to resolve issue with doctrine
  xit('should provide the correct @name, even if it contains slashes', function () {
    var result = runApidocs('handlebars-partial-with-slashed-name.hbs')
    console.log(result);
    expect(result.length).toBe(1)
    expect(result[0]).toMatch(/path\/handlebarsPartial/)
  })


})
