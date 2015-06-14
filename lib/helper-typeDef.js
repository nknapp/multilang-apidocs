/**
 * Render a string for various type definitions (in params and such)
 * [as in the google-closure docs](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 * @param definition {object} the parsed type definition
 * @param definition.type {string} the type descriptor
 *
 * @returns {*}
 */
module.exports = function typeHelper(definition) {
  if (!definition) {
    return "";
  }
  switch (definition.type) {
    case "NameExpression":
      // TODO: Maybe we can do something fancy here...
      return definition.name;

    case "UnionType":
      return "(" + definition.elements.map(typeHelper).join(" | ") + ")";

    case "RecordType":
      return "{" + definition.fields.map(typeHelper).join(", ") + "}";

    case "FieldType":
      return definition.key + ": " + typeHelper(definition.value);

    case "NullableType":
      return "?" + typeHelper(definition.expression);

    case "TypeApplication":
      return typeHelper(definition.expression)
        + "<"
        + definition.applications.map(typeHelper).join(", ")
        + ">"

    case "NonNullableType":
      return "!" + typeHelper(definition.expression);

    case "FunctionType":
      return "function("
        + (definition.this ? "this:" + typeHelper(definition.this) : "")
        + (definition.params && definition.this ? ", ": "")
        + (definition.params.map(typeHelper).join(", "))
        + "):"
        + (typeHelper(definition.result) || "void");

    case "RestType":
      return "..."+typeHelper(definition.expression)

    case "OptionalType":
      return typeHelper(definition.expression)+"="

    default:
      console.log(definition);
      return "<<Unkown: " + definition.type + ">>";
  }
}

