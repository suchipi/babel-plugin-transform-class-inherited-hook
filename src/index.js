import template from "babel-template";

module.exports = function({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
        if (!(t.isIdentifier(path.node.id) && t.isIdentifier(path.node.superClass))) {
          return;
        }

        var superClassName = path.node.superClass.name;
        var childClassName = path.node.id.name;

        var tmpl = template(`
          (function(SUPER_INSIDE){
            var CHILD_INSIDE_1 = CLASS_EXPRESSION
            if (SUPER_INSIDE.hasOwnProperty("onInherited")) {
              if (typeof SUPER_INSIDE.onInherited == 'function') {
                var CHILD_INSIDE_2 = SUPER_INSIDE.onInherited(CHILD_INSIDE_1) || CHILD_INSIDE_1;
              } else {
                throw new TypeError("Attempted to call onInherited, but it was not a function");
              }
            }
            return CHILD_INSIDE_2;
          })(SUPER_OUTSIDE)
        `)

        var SUPER_INSIDE = path.scope.generateUidIdentifier(superClassName);
        var CHILD_INSIDE_1 = path.scope.generateUidIdentifier(childClassName);
        var CLASS_EXPRESSION = t.classExpression(
          null,
          SUPER_INSIDE,
          path.node.body,
          []
        );
        var CHILD_INSIDE_2 = path.scope.generateUidIdentifier(childClassName);
        var SUPER_OUTSIDE = t.identifier(superClassName);

        var expressionStatement = tmpl({
          SUPER_INSIDE,
          CHILD_INSIDE_1,
          CLASS_EXPRESSION,
          CHILD_INSIDE_2,
          SUPER_OUTSIDE
        });

        path.remove();
        path.scope.parent.push({ id: t.identifier(childClassName), init: expressionStatement.expression });
      }
    }
  }
}
