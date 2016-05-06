import template from "babel-template";

module.exports = function({ types: t }) {
  let SKIP = Symbol();

  function addHelperToFile(file) {
    var helperName = "__babelPluginTransformClassInheritedHook";
    if (file.scope.hasBinding(helperName)) return;

    var helper = template(`
      var helper = function(child, parent, childName) {
        if (childName) {
          Object.defineProperty(child, "name", { value: childName, configurable: true });
        }

        if ("onInherited" in parent) {
          if (typeof parent.onInherited == 'function') {
            var returnedNewChild = parent.onInherited(child);
            if (returnedNewChild !== void 0) {
              if (childName && typeof returnedNewChild == 'function' && returnedNewChild.name !== childName) {
                Object.defineProperty(returnedNewChild, "name", { value: childName, configurable: true });
              }
              child = returnedNewChild;
            }
          } else {
            throw new TypeError("Attempted to call onInherited, but it was not a function");
          }
        }

        return child;
      }
    `);

    file.scope.push({
      id: t.identifier(helperName),
      init: helper().declarations[0].init
    });
  }

  function getChildName(path) {
    if (t.isIdentifier(path.node.id)) {
      return path.node.id.name;
    } else if (path.node.id == null && t.isVariableDeclarator(path.parentPath.node)) {
      return path.parentPath.node.id.name;
    }
  }

  function transform(childClassName, path) {
    var CHILD = path.scope.generateUidIdentifier(childClassName);
    var PARENT = path.node.superClass;
    var CHILD_NAME = childClassName ? t.stringLiteral(childClassName) : t.identifier("undefined");
    var CLASS_EXPRESSION = t.classExpression(
      null,
      PARENT,
      path.node.body,
      []
    );
    // Don't transform *this* class expression, or we'll loop forever
    CLASS_EXPRESSION[SKIP] = true;

    return template(`
      (function(){
        var CHILD = CLASS_EXPRESSION;
        return __babelPluginTransformClassInheritedHook(CHILD, PARENT, CHILD_NAME);
      })();
    `)({
      CHILD,
      CLASS_EXPRESSION,
      PARENT,
      CHILD_NAME
    });
  }

  return {
    visitor: {
      "ClassDeclaration|ClassExpression"(path, state) {
        if (!path.node.superClass) return;
        if (path.node[SKIP]) return;

        addHelperToFile(state.file);
        var childClassName = getChildName(path);
        var expressionStatement = transform(childClassName, path);

        if (t.isClassDeclaration(path.node)) {
          path.replaceWith(t.variableDeclaration(
            "let",
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
