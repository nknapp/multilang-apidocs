# multilang-apidocs

> api-doc generator for multiple languages


# Installation

```
npm install multilang-apidocs
```

 
## Usage

The following example demonstrates how to use this module:

```js
var multilangApiDocs = require('multilang-apidocs')
var fs = require('fs')

var apidocs = multilangApiDocs(fs.readFileSync('fixture.js', 'utf8'), {
  filename: 'fixture.js'
}).join('\n')

console.log(apidocs)
```

This will generate the following output

```
[object Object]
[object Object]
```

##  API-reference

## [multilangApidocs](https://github.com/nknapp/multilang-apidocs/blob/master/index.js#L44)

The function extracts apidoc comments from a string and returns
a list with one markdown-string per comment.

* Parameters:
  * string: **string** - contents of the source-code file.    
  * options: **object=** - options    
  * options.filename: **string=** - the name of the source-code file (Used to apply
   language-specific comment patterns and code-context detection.    
  * options.defaults: **object=** - specify default values for values
   of the code-context and the parsed comment    
  * options.filter: **(FilterDefinition | function(object):boolean)=** - filter the displayed comments
   This parameter can either be a function or a plain object.
   See ['filter definitions'](#filterDefinitions) for details    

* Returns:
  * **Array<{marddown: string, parsed: ApiDefinition}>** - a list of strings containing the apidoc in markdown format.



## License

`multilang-apidocs` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Contributing Guidelines

<!-- Taken from @tunnckoCore: https://github.com/tunnckoCore/coreflow-templates/blob/master/template/CONTRIBUTING.md -->

Contributions are always welcome!

**Before spending lots of time on something, ask for feedback on your idea first!**

Please search issues and pull requests before adding something new to avoid duplicating
efforts and conversations.


### Installing

Fork and clone the repo, then `npm install` to install all dependencies and `npm test` to
ensure all is okay before you start anything.


### Testing

Tests are run with `npm test`. Please ensure all tests are passing before submitting
a pull request (unless you're creating a failing test to increase test coverage or show a problem).

### Code Style

[![standard][standard-image]][standard-url]

This repository uses [`standard`][standard-url] to maintain code style and consistency,
and to avoid style arguments.
```
npm i standard -g
```

It is intentional to don't have `standard`, `istanbul` and `coveralls` in the devDependencies. Travis will handle all that stuffs. That approach will save bandwidth also installing and development time.

[standard-image]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[standard-url]: https://github.com/feross/standard
