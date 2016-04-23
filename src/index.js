import template from "babel-template";

module.exports = function({ types: t }) {
  var tmpl = template(`
    (function(){
      var CHILD = CLASS_EXPRESSION
      Object.defineProperty(CHILD, "name", { value: CHILD_NAME, configurable: true });

      if ("onInherited" in PARENT) {
        if (typeof PARENT.onInherited == 'function') {
          var RETURNED_NEW_CHILD = PARENT.onInherited(CHILD);
          if (RETURNED_NEW_CHILD !== void 0) {
            if (typeof RETURNED_NEW_CHILD == 'function' && RETURNED_NEW_CHILD.name !== CHILD_NAME) {
              Object.defineProperty(RETURNED_NEW_CHILD, "name", { value: CHILD_NAME, configurable: true });
            }
            CHILD = RETURNED_NEW_CHILD;
          }
        } else {
          throw new TypeError("Attempted to call onInherited, but it was not a function");
        }
      }

      return CHILD;
    })();
  `);

  function transform(childClassName, path) {
      var superClassName = path.node.superClass.name;

      var PARENT = t.identifier(superClassName);
      var CHILD = path.scope.generateUidIdentifier(childClassName);
      var CLASS_EXPRESSION = t.classExpression(
        null,
        PARENT,
        path.node.body,
        []
      );
      // Don't transform *this* class expression, or we'll loop forever
      CLASS_EXPRESSION.__babelPluginTransformClassInheritedHook_skip = true;
      var RETURNED_NEW_CHILD = path.scope.generateUidIdentifier(childClassName);
      var CHILD_NAME = t.stringLiteral(childClassName || "class");


      return tmpl({
        CHILD_NAME,
        CHILD,
        CLASS_EXPRESSION,
        RETURNED_NEW_CHILD,
        PARENT
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
