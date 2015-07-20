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
  it('should only provide public comments by default', function () {
    var result = runApidocs('filter.js')
    expect(result.length).toBe(1)
    expect(result[0].markdown).toMatch(/publicFunction/)
  })

  it('should provide @api public tags if filter.showPublic is true', function () {
    var result = runApidocs('filter.js', {
      filter: {
        showPublic: true
      }
    })
    expect(result.length).toBe(1)
    expect(result[0].markdown).toMatch(/publicFunction/)
  })

  it('should provide @api private comments if filter.showPrivate is true', function () {
    var result = runApidocs('filter.js', {
      filter: {
        showPrivate: true
      }
    })
    expect(result.length).toBe(2)
    expect(result[0].markdown).toMatch(/publicFunction/)
    expect(result[1].markdown).toMatch(/privateFunction/)
  })

  it('should not provide @api public comments if filter.showPublic is false', function () {
    var result = runApidocs('filter.js', {
      filter: {
        showPrivate: true,
        showPublic: false
      }
    })
    expect(result.length).toBe(1)
    expect(result[0].markdown).toMatch(/privateFunction/)
  })

  it('should provide comments without @api tag if filter.showWithoutApiTag is true', function () {
    var result = runApidocs('filter.js', {
      filter: {
        showWithoutApiTag: true
      }
    })
    expect(result.length).toBe(2)
    expect(result[0].markdown).toMatch(/publicFunction/)
    expect(result[1].markdown).toMatch(/functionWithoutApiTag/)
  })

  it('should provide non-apidoc comments if filter.onlyApidocComments is false', function () {
    var result = runApidocs('filter.js', {
      filter: {
        onlyApidocComments: false
      }
    })
    expect(result.length).toBe(2)
    expect(result[0].markdown).toMatch(/publicFunction/)
    expect(result[1].markdown).toMatch(/nonApidocComment/)
  })

  it('should also accept a function as filter', function () {
    var result = runApidocs('filter.js', {
      filter: function (docItem) {
        return docItem.name === 'privateFunction'
      }
    })
    expect(result.length).toBe(1)
    expect(result[0].markdown).toMatch(/privateFunction/)

  })

})
