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
  it('should have output for all possible datatypes', function () {
    var result = runApidocs('types.js', {
      filter: {
        // None of the comments in the file have an @api tag
        showWithoutApiTag: true
      }
    })
    expect(result.length).toBe(11)
    expect(result[0].markdown).toMatch(/\*\*Multilang\.ApiDoc\*\*/)
    expect(result[1].markdown).toMatch(/\*\*Multilang\.ApiDoc<string>\*\*/)
    expect(result[2].markdown).toMatch(/\*\*\(string \| number\)\*\*/)
    expect(result[3].markdown).toMatch(/\*\*\{key: string}\*\*/)
    expect(result[4].markdown).toMatch(/\?number/)
    expect(result[5].markdown).toMatch(/\?number/)
    expect(result[6].markdown).toMatch(/\!number/)
    expect(result[7].markdown).toMatch(/function\(this:Multilang\.ApiDoc, number\):number/)
    expect(result[8].markdown).toMatch(/\.\.\.string/)
    expect(result[9].markdown).toMatch(/number=/)
    expect(result[10].markdown).toMatch(/function\(\?string=, number=\):void/)

  })
})
