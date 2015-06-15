var gulp = require('gulp');

var handlebars = require('gulp-compile-handlebars');
var rename = require("gulp-rename")
var apidocs = require("./")
var fs = require("fs");
var path = require("path");
var cp = require("child_process");

var templateData = require("./package"),
  options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    noEscape: true,
    partials: {},
    //batch : ['./src/partials'],
    helpers: {
      publicApi: function (filename) {
        //console.log("filename", filename)
        var comments = apidocs(fs.readFileSync(filename, "utf-8"), {
          filename: filename
        });
        // console.log(comments.filteredComments);
        return comments.join("\n");
      },
      include: function (filename) {
        return new handlebars.Handlebars.SafeString("```" + path.extname(filename).substr(1) + "\n" +
          fs.readFileSync(filename, "utf-8") +
          "\n```\n")
      },
      /**
       * Includes an example file into the template, replacing
       * the `require('../')` by `require('module-name')` (only single-quotes are replaced)
       * @param filename
       */
      example: function (filename) {
        // Relative path to the current module (e.g. "../"). This path must be replaced
        // by the module name in the
        var modulePath = path.relative(path.dirname(filename), ".") + "/";

        return new handlebars.Handlebars.SafeString(
          "```" + path.extname(filename).substr(1) + "\n" +
          fs.readFileSync(filename, "utf-8")
            .replace("require('" + modulePath + "')", "require('" + templateData.name + "')") +
          "\n```\n"
        )
      },

      execFile: function(filename, language) {
        var start = "```"+language+"\n",
          end = "\n```\n"
        if (language==="raw") {
          start = end = "";
        }
        var output = cp.execFileSync(process.argv[0], [path.basename(filename)], {
          encoding: 'utf8',
          cwd: path.dirname(filename)
        });
        return new handlebars.Handlebars.SafeString(start+output+end);

      }
    }
  }

gulp.task('docs', function () {
  return gulp.src('docsrc/README.md.hbs')
    .pipe(handlebars(templateData, options))
    .pipe(rename(function (filePath) {
      console.log(filePath)
      filePath.extname = ""
      return filePath;
    }))
    .pipe(gulp.dest('.'));
});

gulp.task("default", ["docs"]);
