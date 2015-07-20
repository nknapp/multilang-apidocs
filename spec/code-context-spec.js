/*!
 * multilang-apidocs <https://github.com/nknapp/multilang-apidocs>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
/* global expect */
// /* global xdescribe */
// /* global xit */

'use strict'

var runApidocs = require('./support/run-apidocs.js')

describe('multilang-apidocs:', function () {
  it('should have output for all possible context-types', function () {
    var result = runApidocs('code-context.js')
    expect(result[0].markdown).toMatch(/aFunction/)
    expect(result[1].markdown).toMatch(/aPropertyFunction/)
  })
})
