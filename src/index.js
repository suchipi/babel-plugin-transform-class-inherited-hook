import template from "babel-template";

module.exports = function({ types: t }) {
  var tmpl = template(`
    (function(SUPER_INSIDE){
      var CHILD_INSIDE_1 = CLASS_EXPRESSION
      if (typeof CHILD_INSIDE_1 == 'function') {
        Object.defineProperty(CHILD_INSIDE_1, "name", { value: CHILD_NAME, configurable: true });
      }

      var CHILD_INSIDE_2 = CHILD_INSIDE_1
      if ("onInherited" in SUPER_INSIDE) {
        if (typeof SUPER_INSIDE.onInherited == 'function') {
          CHILD_INSIDE_2 = SUPER_INSIDE.onInherited(CHILD_INSIDE_1) || CHILD_INSIDE_1;
        } else {
          throw new TypeError("Attempted to call onInherited, but it was not a function");
        }
      }
      if (typeof CHILD_INSIDE_2 == 'function') {
        Object.defineProperty(CHILD_INSIDE_2, "name", { value: CHILD_NAME, configurable: true });
      }
      return CHILD_INSIDE_2;
    })(SUPER_OUTSIDE)
  `);

  function transform(childClassName, path) {
      var superClassName = path.node.superClass.name;

      var SUPER_INSIDE = path.scope.generateUidIdentifier(superClassName);
      var CHILD_INSIDE_1 = path.scope.generateUidIdentifier(childClassName);
      var CLASS_EXPRESSION = t.classExpression(
        null,
        SUPER_INSIDE,
        path.node.body,
        []
      );
      // Don't transform *this* class expression, or we'll loop forever
      CLASS_EXPRESSION.__babelPluginTransformClassInheritedHook_skip = true;
      var CHILD_INSIDE_2 = path.scope.generateUidIdentifier(childClassName);
      var CHILD_NAME = t.stringLiteral(childClassName);
      var SUPER_OUTSIDE = t.identifier(superClassName);

      return tmpl({
        CHILD_NAME,
        SUPER_INSIDE,
        CHILD_INSIDE_1,
        CLASS_EXPRESSION,
        CHILD_INSIDE_2,
        SUPER_OUTSIDE
      });
    }

    return {
      visitor: {
        "ClassDeclaration|ClassExpression"(path) {
          if (!path.node.superClass) return;
          if (path.node.__babelPluginTransformClassInheritedHook_skip) return;

          var childClassName;

          if (t.isIdentifier(path.node.id)) {
            childClassName = path.node.id.name;
          } else if (path.node.id == null && t.isVariableDeclarator(path.parentPath.node)) {
            childClassName = path.parentPath.node.id.name;
          }

          var expressionStatement = transform(childClassName, path);

          if (t.isClassDeclaration(path.node)) {
            path.replaceWith(t.variableDeclaration(
              "var",
              [
                t.variableDeclarator(
                  t.identifier(childClassName),
                  expressionStatement.expression
                )
              ]
            ));
          } else if (t.isClassExpression(path.node)) {
            path.replaceWith(expressionStatement.expression);
          }
      }
    }
  }
}
