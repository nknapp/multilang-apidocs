# multilang-apidocs

>> api-doc generator for multiple languages


# Example

Consider the following file `fixture.js`

```js
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
function aFunction(number, string) {

}

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
  aPropertyFunction: function(abc,cdef) {

  }
}

```


The following code-snippet will output the
apidoc-comments:

```js
var multilangApiDocs = require('multilang-apidocs');
var fs = require("fs");

var apidocs = multilangApiDocs(fs.readFileSync("fixture.js","utf8"), {
  filename: "fixture.js"
}).join("\n")

console.log(apidocs);


```


Output:

```json
## aFunction

This is a function with a doc comment

### Parameters:

* number: **number** - a number    
* string: **{a: string}** - a string    



## aPropertyFunction

This is a function in a property (with a doc comment)

### Parameters:

* abc: **string** - asdasdasd    
* cdef: **number**     




```


# API

## multilangApidocs

The function extracts apidoc comments from a string and returns
a list with one markdown-string per comment.

### Parameters:

* string: **string** - contents of the source-code file.    
* options: **object=** - options    
* options.filename: **string=** - the name of the source-code file (Used to apply
   language-specific comment patterns and code-context detection.    
* options.defaults: **object=** - specify default values for values
   of the code-context and the parsed comment    
* options.filter: **(FilterDefinition | function(object):boolean)=** - filter the displayed comments
   This parameter can either be a function or a plain object.
   See [&#x27;filter definitions&#x27;](#filterDefinitions) for details    





# Author

Nils Knappmeier <br/>
npm@knappi.org <br/>
[https://github.com/nknapp](https://github.com/nknapp)
