import template from "babel-template";

module.exports = function({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
        if (!(t.isIdentifier(path.node.id) && t.isIdentifier(path.node.superClass))) {
          return;
        }

        var runOnInheritedHook = template(`
          if (SUPER.hasOwnProperty("onInherited")) {
            if (typeof SUPER.onInherited == 'function') {
              SUPER.onInherited(CHILD);
            } else {
              throw new TypeError("Attempted to call onInherited, but it was not a function");
            }
          }
        `);

        var ast = runOnInheritedHook({
          SUPER: t.identifier(path.node.superClass.name),
          CHILD: t.identifier(path.node.id.name)
        });

        path.insertAfter(ast);
      }
    }
  }
}
