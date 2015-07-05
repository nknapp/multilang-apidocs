/*!
 * multilang-apidocs <https://github.com/nknapp/multilang-apidocs>
 *
 * Copyright (c) 2015 Nils Knappmeier.
 * Released under the MIT license.
 */

/**
 * This is a function with a doc comment
 *
 * @param {number} number a number
 * @param {{a: string}} string a string
 * @api public
 */
function aFunction (number, string) {}

var x = {
  /**
   * This is a function in a property (with a doc comment)
   *
   *
   * @param {string} abc  asdasdasd
   * @param {number} cdef
   * @return {{abc: string, def: number}} what it returns
   * @api public
   */
  aPropertyFunction: function (abc, cdef) {}
}
