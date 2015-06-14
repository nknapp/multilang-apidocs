/*!
 * multilang-apidocs <https://github.com/nknapp/multilang-apidocs>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
// /* global it */
// /* global xdescribe */
// /* global xit */

'use strict'

var multilangApidocs = require('../')
var _ = require("lodash");
var loadFixture = require("./support/load-fixture.js");

describe('multilang-apidocs:', function () {
  it('should have output for all possible datatypes', function() {
    loadFixture("types.js");
  })
})


