import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe("Class.onInherited", function() {
  describe("is called when a class is inherited from", function() {
    it("using named class declarations", function() {
      let callback = sinon.spy();

      class Parent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      }

      class Child extends Parent {}

      expect(callback).to.have.been.calledWith(Child);
    });

    it("using anonymous class expressions with variable declaration", function() {
      let callback = sinon.spy();

      let Parent = class {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      };

      let Child = class extends Parent {};

      expect(callback).to.have.been.calledWith(Child);
    });

    it("using named class expressions saved as variables", function() {
      let callback = sinon.spy();

      let Parent = class NamedParent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      };

      let Child = class NamedChild extends Parent {};

      expect(callback).to.have.been.calledWith(Child);
    });

    it("using anonymous class expressions on object literal properties", function() {
      let callback = sinon.spy();

      let Parents = {
        Parent: class {
          static onInherited(inheritor) {
            callback(inheritor);
          }
        }
      };

      let Children = {
        Child: class extends Parents.Parent {}
      }

      expect(callback).to.have.been.calledWith(Children.Child);
    });

    it("using named class expressions on object literal properties", function() {
      let callback = sinon.spy();

      let Parents = {
        Parent: class NamedParent {
          static onInherited(inheritor) {
            callback(inheritor);
          }
        }
      };

      let Children = {
        Child: class NamedChild extends Parents.Parent {}
      }

      expect(callback).to.have.been.calledWith(Children.Child);
    });
  });
  describe("is called when a class is inherited from (down the chain)", function() {
    it("using named class declarations", function() {
      let callback = sinon.spy();

      class Grandparent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      }

      class Parent extends Grandparent {}

      class Child extends Parent {}

      expect(callback).to.have.been.calledWith(Child);
    });

    it("using anonymous class expressions with variable declaration", function() {
      let callback = sinon.spy();

      let Grandparent = class {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      };

      let Parent = class extends Grandparent {};

      let Child = class extends Parent {};

      expect(callback).to.have.been.calledWith(Child);
    });

    it("using named class expressions saved as variables", function() {
      let callback = sinon.spy();

      let Grandparent = class NamedGrandparent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      };

      let Parent = class NamedParent extends Grandparent {};

      let Child = class NamedChild extends Parent {};

      expect(callback).to.have.been.calledWith(Child);
    });

    it("using anonymous class expressions on object literal properties", function() {
      let callback = sinon.spy();

      let Grandparents = {
        Grandparent: class {
          static onInherited(inheritor) {
            callback(inheritor);
          }
        }
      };

      let Parents = {
        Parent: class extends Grandparents.Grandparent {}
      };

      let Children = {
        Child: class extends Parents.Parent {}
      };

      expect(callback).to.have.been.calledWith(Children.Child);
    });

    it("using named class expressions on object literal properties", function() {
      let callback = sinon.spy();

      let Grandparents = {
        Grandparent: class NamedGrandparent {
          static onInherited(inheritor) {
            callback(inheritor);
          }
        }
      };

      let Parents = {
        Parent: class NamedParent extends Grandparents.Grandparent {}
      };

      let Children = {
        Child: class NamedChild extends Parents.Parent {}
      };

      expect(callback).to.have.been.calledWith(Children.Child);
    });
  });
  describe("can be overriden by an intermediate class in the prototype chain", function() {
    it("using named class declarations", function() {
      let callback = sinon.spy();

      class Grandparent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      }

      class Parent extends Grandparent {
        static onInherited(inheritor) {}
      }

      class Child extends Parent {}

      expect(callback).to.have.been.calledWith(Parent);
      expect(callback).not.to.have.been.calledWith(Child);
    });

    it("using anonymous class expressions with variable declaration", function() {
      let callback = sinon.spy();

      let Grandparent = class {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      };

      let Parent = class extends Grandparent {
        static onInherited(inheritor) {}
      };

      let Child = class extends Parent {};

      expect(callback).to.have.been.calledWith(Parent);
      expect(callback).not.to.have.been.calledWith(Child);
    });

    it("using named class expressions saved as variables", function() {
      let callback = sinon.spy();

      let Grandparent = class NamedGrandparent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      };

      let Parent = class NamedParent extends Grandparent {
        static onInherited(inheritor) {}
      };

      let Child = class NamedChild extends Parent {};

      expect(callback).to.have.been.calledWith(Parent);
      expect(callback).not.to.have.been.calledWith(Child);
    });

    it("using anonymous class expressions on object literal properties", function() {
      let callback = sinon.spy();

      let Grandparents = {
        Grandparent: class {
          static onInherited(inheritor) {
            callback(inheritor);
          }
        }
      };

      let Parents = {
        Parent: class extends Grandparents.Grandparent {
          static onInherited(inheritor) {}
        }
      };

      let Children = {
        Child: class extends Parents.Parent {}
      }

      expect(callback).to.have.been.calledWith(Parents.Parent);
      expect(callback).not.to.have.been.calledWith(Children.Child);
    });

    it("using named class expressions on object literal properties", function() {
      let callback = sinon.spy();

      let Grandparents = {
        Grandparent: class NamedGrandparent {
          static onInherited(inheritor) {
            callback(inheritor);
          }
        }
      };

      let Parents = {
        Parent: class NamedParent extends Grandparents.Grandparent {
          static onInherited(inheritor) {}
        }
      };

      let Children = {
        Child: class NamedChild extends Parents.Parent {}
      }

      expect(callback).to.have.been.calledWith(Parents.Parent);
      expect(callback).not.to.have.been.calledWith(Children.Child);
    });
  });
  describe("can redefine the value of the declared class", function() {
    it("using named class declarations", function() {
      let replacement = sinon.spy();

      class Parent {
        static onInherited(inheritor) {
          return replacement;
        }
      }

      class Child extends Parent {}

      expect(Child).to.equal(replacement);
    });

    it("using anonymous class expressions with variable declaration", function() {
      let replacement = sinon.spy();

      let Parent = class {
        static onInherited(inheritor) {
          return replacement;
        }
      };

      let Child = class extends Parent {};

      expect(Child).to.equal(replacement);
    });

    it("using named class expressions saved as variables", function() {
      let replacement = sinon.spy();

      let Parent = class NamedParent {
        static onInherited(inheritor) {
          return replacement;
        }
      };

      let Child = class NamedChild extends Parent {};

      expect(Child).to.equal(replacement);
    });

    it("using anonymous class expressions on object literal properties", function() {
      let replacement = sinon.spy();

      let Parents = {
        Parent: class {
          static onInherited(inheritor) {
            return replacement;
          }
        }
      };

      let Children = {
        Child: class extends Parents.Parent {}
      }

      expect(Children.Child).to.equal(replacement);
    });

    it("using named class expressions on object literal properties", function() {
      let replacement = sinon.spy();

      let Parents = {
        Parent: class NamedParent {
          static onInherited(inheritor) {
            return replacement;
          }
        }
      };

      let Children = {
        Child: class NamedChild extends Parents.Parent {}
      }

      expect(Children.Child).to.equal(replacement);
    });
  });
  describe("can redefine the value of the declared class to a falsy value other than undefined", function() {
    describe("null", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {
            return null;
          }
        }

        class Child extends Parent {}

        expect(Child).to.equal(null);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {
            return null;
          }
        };

        let Child = class extends Parent {};

        expect(Child).to.equal(null);
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {
            return null;
          }
        };

        let Child = class NamedChild extends Parent {};

        expect(Child).to.equal(null);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {
              return null;
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        }

        expect(Children.Child).to.equal(null);
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {
              return null;
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        }

        expect(Children.Child).to.equal(null);
      });
    });
    describe("0", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {
            return 0;
          }
        }

        class Child extends Parent {}

        expect(Child).to.equal(0);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {
            return 0;
          }
        };

        let Child = class extends Parent {};

        expect(Child).to.equal(0);
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {
            return 0;
          }
        };

        let Child = class NamedChild extends Parent {};

        expect(Child).to.equal(0);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {
              return 0;
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        }

        expect(Children.Child).to.equal(0);
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {
              return 0;
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        }

        expect(Children.Child).to.equal(0);
      });
    });
    describe("\"\" (empty string)", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {
            return "";
          }
        }

        class Child extends Parent {}

        expect(Child).to.equal("");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {
            return "";
          }
        };

        let Child = class extends Parent {};

        expect(Child).to.equal("");
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {
            return "";
          }
        };

        let Child = class NamedChild extends Parent {};

        expect(Child).to.equal("");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {
              return "";
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        }

        expect(Children.Child).to.equal("");
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {
              return "";
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        }

        expect(Children.Child).to.equal("");
      });
    });
    describe("false", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {
            return false;
          }
        }

        class Child extends Parent {}

        expect(Child).to.equal(false);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {
            return false;
          }
        };

        let Child = class extends Parent {};

        expect(Child).to.equal(false);
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {
            return false;
          }
        };

        let Child = class NamedChild extends Parent {};

        expect(Child).to.equal(false);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {
              return false;
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        }

        expect(Children.Child).to.equal(false);
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {
              return false;
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        }

        expect(Children.Child).to.equal(false);
      });
    });
    describe("NaN", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {
            return NaN;
          }
        }

        class Child extends Parent {}

        expect(Child).to.be.NaN;
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {
            return NaN;
          }
        };

        let Child = class extends Parent {};

        expect(Child).to.be.NaN;
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {
            return NaN;
          }
        };

        let Child = class NamedChild extends Parent {};

        expect(Child).to.be.NaN;
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {
              return NaN;
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        }

        expect(Children.Child).to.be.NaN;
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {
              return NaN;
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        }

        expect(Children.Child).to.be.NaN;
      });
    });
  });
  describe("can not redefine the value of the declared class by returning undefined", function() {
    it("using named class declarations", function() {
      class Parent {
        static onInherited(inheritor) {
          return undefined;
        }
      }

      class Child extends Parent {}

      expect(Child).not.to.be.undefined;
    });

    it("using anonymous class expressions with variable declaration", function() {
      let Parent = class {
        static onInherited(inheritor) {
          return undefined;
        }
      };

      let Child = class extends Parent {};

      expect(Child).not.to.be.undefined;
    });

    it("using named class expressions saved as variables", function() {
      let Parent = class NamedParent {
        static onInherited(inheritor) {
          return undefined;
        }
      };

      let Child = class NamedChild extends Parent {};

      expect(Child).not.to.be.undefined;
    });

    it("using anonymous class expressions on object literal properties", function() {
      let Parents = {
        Parent: class {
          static onInherited(inheritor) {
            return undefined;
          }
        }
      };

      let Children = {
        Child: class extends Parents.Parent {}
      }

      expect(Children.Child).not.to.be.undefined;
    });

    it("using named class expressions on object literal properties", function() {
      let Parents = {
        Parent: class NamedParent {
          static onInherited(inheritor) {
            return undefined;
          }
        }
      };

      let Children = {
        Child: class NamedChild extends Parents.Parent {}
      }

      expect(Children.Child).not.to.be.undefined;
    });
  });
});

describe("A class", function() {
  describe("with no parent", function() {
    describe("has a reliable name property", function() {
      it("using named class declarations", function() {
        class Thing {}
        expect(Thing.name).to.equal("Thing");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Thing = class {};
        expect(Thing.name).to.equal("Thing");
      });

      it("using named class expressions saved as variables", function() {
        let Thing = class NamedThing {};
        expect(Thing.name).to.equal("NamedThing");
      });

      it("using named class expressions on object literal properties", function() {
        let Things = {
          Thing: class NamedThing {}
        }
        expect(Things.Thing.name).to.equal("NamedThing");
      });
    });
    describe("can have static methods", function() {
      it("using named class declarations", function() {
        class Thing {
          static coolnessFactor() {
            return 5;
          }
        }
        expect(Thing.coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Thing = class {
          static coolnessFactor() {
            return 5;
          }
        };
        expect(Thing.coolnessFactor()).to.equal(5);
      });

      it("using named class expressions saved as variables", function() {
        let Thing = class NamedThing {
          static coolnessFactor() {
            return 5;
          }
        };
        expect(Thing.coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Things = {
          Thing: class {
            static coolnessFactor() {
              return 5;
            }
          }
        }
        expect(Things.Thing.coolnessFactor()).to.equal(5);
      });

      it("using named class expressions on object literal properties", function() {
        let Things = {
          Thing: class NamedThing {
            static coolnessFactor() {
              return 5;
            }
          }
        }
        expect(Things.Thing.coolnessFactor()).to.equal(5);
      });
    });
    describe("can have instance methods", function() {
      it("using named class declarations", function() {
        class Thing {
          coolnessFactor() {
            return 5;
          }
        }
        expect(new Thing().coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Thing = class {
          coolnessFactor() {
            return 5;
          }
        };
        expect(new Thing().coolnessFactor()).to.equal(5);
      });

      it("using named class expressions saved as variables", function() {
        let Thing = class NamedThing {
          coolnessFactor() {
            return 5;
          }
        };
        expect(new Thing().coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Things = {
          Thing: class {
            coolnessFactor() {
              return 5;
            }
          }
        }
        expect(new Things.Thing().coolnessFactor()).to.equal(5);
      });

      it("using named class expressions on object literal properties", function() {
        let Things = {
          Thing: class NamedThing {
            coolnessFactor() {
              return 5;
            }
          }
        }
        expect(new Things.Thing().coolnessFactor()).to.equal(5);
      });
    });
  });
  describe("with no parent that defines a static onInherited method", function() {
    describe("has a reliable name property", function() {
      it("using named class declarations", function() {
        class Thing {
          static onInherited(inheritor) {}
        }
        expect(Thing.name).to.equal("Thing");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Thing = class {
          static onInherited(inheritor) {}
        };
        expect(Thing.name).to.equal("Thing");
      });

      it("using named class expressions saved as variables", function() {
        let Thing = class NamedThing {
          static onInherited(inheritor) {}
        };
        expect(Thing.name).to.equal("NamedThing");
      });

      it("using named class expressions on object literal properties", function() {
        let Things = {
          Thing: class NamedThing {
            static onInherited(inheritor) {}
          }
        }
        expect(Things.Thing.name).to.equal("NamedThing");
      });
    });
    describe("can have static methods", function() {
      it("using named class declarations", function() {
        class Thing {
          static onInherited(inheritor) {}
          static coolnessFactor() {
            return 5;
          }
        }
        expect(Thing.coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Thing = class {
          static onInherited(inheritor) {}
          static coolnessFactor() {
            return 5;
          }
        };
        expect(Thing.coolnessFactor()).to.equal(5);
      });

      it("using named class expressions saved as variables", function() {
        let Thing = class NamedThing {
          static onInherited(inheritor) {}
          static coolnessFactor() {
            return 5;
          }
        };
        expect(Thing.coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Things = {
          Thing: class {
            static onInherited(inheritor) {}
            static coolnessFactor() {
              return 5;
            }
          }
        }
        expect(Things.Thing.coolnessFactor()).to.equal(5);
      });

      it("using named class expressions on object literal properties", function() {
        let Things = {
          Thing: class NamedThing {
            static onInherited(inheritor) {}
            static coolnessFactor() {
              return 5;
            }
          }
        }
        expect(Things.Thing.coolnessFactor()).to.equal(5);
      });
    });
    describe("can have instance methods", function() {
      it("using named class declarations", function() {
        class Thing {
          static onInherited(inheritor) {}
          coolnessFactor() {
            return 5;
          }
        }
        expect(new Thing().coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Thing = class {
          static onInherited(inheritor) {}
          coolnessFactor() {
            return 5;
          }
        };
        expect(new Thing().coolnessFactor()).to.equal(5);
      });

      it("using named class expressions saved as variables", function() {
        let Thing = class NamedThing {
          static onInherited(inheritor) {}
          coolnessFactor() {
            return 5;
          }
        };
        expect(new Thing().coolnessFactor()).to.equal(5);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Things = {
          Thing: class {
            static onInherited(inheritor) {}
            coolnessFactor() {
              return 5;
            }
          }
        }
        expect(new Things.Thing().coolnessFactor()).to.equal(5);
      });

      it("using named class expressions on object literal properties", function() {
        let Things = {
          Thing: class NamedThing {
            static onInherited(inheritor) {}
            coolnessFactor() {
              return 5;
            }
          }
        }
        expect(new Things.Thing().coolnessFactor()).to.equal(5);
      });
    });
  });
  describe("with a parent", function() {
    describe("has a reliable name property", function() {
      it("using named class declarations", function() {
        class Parent {}
        class Child extends Parent {}
        expect(Child.name).to.equal("Child");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {};
        let Child = class extends Parent {};
        expect(Child.name).to.equal("Child");
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {};
        let Child = class NamedChild extends Parent {};
        expect(Child.name).to.equal("NamedChild");
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(Children.Child.name).to.equal("NamedChild");
      });
    });
    describe("can have static methods", function() {
      it("using named class declarations", function() {
        class Parent {}
        class Child extends Parent {
          static childishness() {
            return 6;
          }
        }
        expect(Child.childishness()).to.equal(6);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {};
        let Child = class extends Parent {
          static childishness() {
            return 6;
          }
        };
        expect(Child.childishness()).to.equal(6);
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {};
        let Child = class NamedChild extends Parent {
          static childishness() {
            return 6;
          }
        };
        expect(Child.childishness()).to.equal(6);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {}
        };

        let Children = {
          Child: class extends Parents.Parent {
            static childishness() {
              return 6;
            }
          }
        };
        expect(Children.Child.childishness()).to.equal(6);
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {
            static childishness() {
              return 6;
            }
          }
        };
        expect(Children.Child.childishness()).to.equal(6);
      });
    });
    describe("can inherit static methods from its parent", function() {
      it("using named class declarations", function() {
        class Parent {
          static eyeColor() {
            return "brown";
          }
        }
        class Child extends Parent {}
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static eyeColor() {
            return "brown";
          }
        };
        let Child = class extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static eyeColor() {
            return "brown";
          }
        };
        let Child = class NamedChild extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });
    });
    describe("can have instance methods", function() {
      it("using named class declarations", function() {
        class Parent {}
        class Child extends Parent {
          childishness() {
            return 6;
          }
        }
        expect(new Child().childishness()).to.equal(6);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {};
        let Child = class extends Parent {
          childishness() {
            return 6;
          }
        };
        expect(new Child().childishness()).to.equal(6);
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {};
        let Child = class NamedChild extends Parent {
          childishness() {
            return 6;
          }
        };
        expect(new Child().childishness()).to.equal(6);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {}
        };

        let Children = {
          Child: class extends Parents.Parent {
            childishness() {
              return 6;
            }
          }
        };
        expect(new Children.Child().childishness()).to.equal(6);
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {
            childishness() {
              return 6;
            }
          }
        };
        expect(new Children.Child().childishness()).to.equal(6);
      });
    });
    describe("can inherit instance methods from its parent", function() {
      it("using named class declarations", function() {
        class Parent {
          eyeColor() {
            return "brown";
          }
        }
        class Child extends Parent {}
        expect(new Child().eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          eyeColor() {
            return "brown";
          }
        };
        let Child = class extends Parent {};
        expect(new Child().eyeColor()).to.equal("brown");
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          eyeColor() {
            return "brown";
          }
        };
        let Child = class NamedChild extends Parent {};
        expect(new Child().eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(new Children.Child().eyeColor()).to.equal("brown");
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(new Children.Child().eyeColor()).to.equal("brown");
      });
    });
  });
  describe("with a parent that declares a static onInherited method", function() {
    describe("has a reliable name property", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {}
        }
        class Child extends Parent {}
        expect(Child.name).to.equal("Child");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {}
        };
        let Child = class extends Parent {};
        expect(Child.name).to.equal("Child");
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {}
        };
        let Child = class NamedChild extends Parent {};
        expect(Child.name).to.equal("NamedChild");
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {}
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(Children.Child.name).to.equal("NamedChild");
      });
    });
    describe("can have static methods", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {}
        }
        class Child extends Parent {
          static childishness() {
            return 6;
          }
        }
        expect(Child.childishness()).to.equal(6);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {}
        };
        let Child = class extends Parent {
          static childishness() {
            return 6;
          }
        };
        expect(Child.childishness()).to.equal(6);
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {}
        };
        let Child = class NamedChild extends Parent {
          static childishness() {
            return 6;
          }
        };
        expect(Child.childishness()).to.equal(6);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {}
          }
        };

        let Children = {
          Child: class extends Parents.Parent {
            static childishness() {
              return 6;
            }
          }
        };
        expect(Children.Child.childishness()).to.equal(6);
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {}
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {
            static childishness() {
              return 6;
            }
          }
        };
        expect(Children.Child.childishness()).to.equal(6);
      });
    });
    describe("can inherit static methods from its parent", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {}
          static eyeColor() {
            return "brown";
          }
        }
        class Child extends Parent {}
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {}
          static eyeColor() {
            return "brown";
          }
        };
        let Child = class extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {}
          static eyeColor() {
            return "brown";
          }
        };
        let Child = class NamedChild extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {}
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {}
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });
    });
    describe("can have instance methods", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {}
        }
        class Child extends Parent {
          childishness() {
            return 6;
          }
        }
        expect(new Child().childishness()).to.equal(6);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {}
        };
        let Child = class extends Parent {
          childishness() {
            return 6;
          }
        };
        expect(new Child().childishness()).to.equal(6);
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {}
        };
        let Child = class NamedChild extends Parent {
          childishness() {
            return 6;
          }
        };
        expect(new Child().childishness()).to.equal(6);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {}
          }
        };

        let Children = {
          Child: class extends Parents.Parent {
            childishness() {
              return 6;
            }
          }
        };
        expect(new Children.Child().childishness()).to.equal(6);
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {}
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {
            childishness() {
              return 6;
            }
          }
        };
        expect(new Children.Child().childishness()).to.equal(6);
      });
    });
    describe("can inherit instance methods from its parent", function() {
      it("using named class declarations", function() {
        class Parent {
          static onInherited(inheritor) {}
          eyeColor() {
            return "brown";
          }
        }
        class Child extends Parent {}
        expect(new Child().eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Parent = class {
          static onInherited(inheritor) {}
          eyeColor() {
            return "brown";
          }
        };
        let Child = class extends Parent {};
        expect(new Child().eyeColor()).to.equal("brown");
      });

      it("using named class expressions saved as variables", function() {
        let Parent = class NamedParent {
          static onInherited(inheritor) {}
          eyeColor() {
            return "brown";
          }
        };
        let Child = class NamedChild extends Parent {};
        expect(new Child().eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Parents = {
          Parent: class {
            static onInherited(inheritor) {}
            eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(new Children.Child().eyeColor()).to.equal("brown");
      });

      it("using named class expressions on object literal properties", function() {
        let Parents = {
          Parent: class NamedParent {
            static onInherited(inheritor) {}
            eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(new Children.Child().eyeColor()).to.equal("brown");
      });
    });
  });
  describe("with a grandparent that declares a static onInherited method", function() {
    describe("has a reliable name property", function() {
      it("using named class declarations", function() {
        class Grandparent {
          static onInherited(inheritor) {}
        }
        class Parent extends Grandparent {}
        class Child extends Parent {}
        expect(Child.name).to.equal("Child");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Grandparent = class {
          static onInherited(inheritor) {}
        };
        let Parent = class extends Grandparent {};
        let Child = class extends Parent {};
        expect(Child.name).to.equal("Child");
      });

      it("using named class expressions saved as variables", function() {
        let Grandparent = class NamedGrandparent {
          static onInherited(inheritor) {}
        };
        let Parent = class NamedParent extends Grandparent {};
        let Child = class NamedChild extends Parent {};
        expect(Child.name).to.equal("NamedChild");
      });

      it("using named class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class NamedGrandparent {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class NamedParent extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(Children.Child.name).to.equal("NamedChild");
      });
    });
    describe("can have static methods", function() {
      it("using named class declarations", function() {
        class Grandparent {
          static onInherited(inheritor) {}
        }
        class Parent extends Grandparent{}
        class Child extends Parent {
          static childishness() {
            return 6;
          }
        }
        expect(Child.childishness()).to.equal(6);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Grandparent = class {
          static onInherited(inheritor) {}
        };
        let Parent = class extends Grandparent {};
        let Child = class extends Parent {
          static childishness() {
            return 6;
          }
        };
        expect(Child.childishness()).to.equal(6);
      });

      it("using named class expressions saved as variables", function() {
        let Grandparent = class NamedGrandparent {
          static onInherited(inheritor) {}
        };
        let Parent = class NamedParent extends Grandparent {};
        let Child = class NamedChild extends Parent {
          static childishness() {
            return 6;
          }
        };
        expect(Child.childishness()).to.equal(6);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class extends Parents.Parent {
            static childishness() {
              return 6;
            }
          }
        };
        expect(Children.Child.childishness()).to.equal(6);
      });

      it("using named class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class NamedGrandparent {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class NamedParent extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {
            static childishness() {
              return 6;
            }
          }
        };
        expect(Children.Child.childishness()).to.equal(6);
      });
    });
    describe("can inherit static methods from its parent", function() {
      it("using named class declarations", function() {
        class Grandparent {
          static onInherited(inheritor) {}
        }

        class Parent extends Grandparent {
          static eyeColor() {
            return "brown";
          }
        }
        class Child extends Parent {}
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Grandparent = class {
          static onInherited(inheritor) {}
        };

        let Parent = class extends Grandparent {
          static eyeColor() {
            return "brown";
          }
        };
        let Child = class extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions saved as variables", function() {
        let Grandparent = class NamedGrandparent {
          static onInherited(inheritor) {}
        };

        let Parent = class NamedParent extends Grandparent {
          static eyeColor() {
            return "brown";
          }
        };
        let Child = class NamedChild extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class extends Grandparents.Grandparent {
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class NamedGrandparent {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class NamedParent extends Grandparents.Grandparent {
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });
    });
    describe("can inherit static methods from its grandparent", function() {
      it("using named class declarations", function() {
        class Grandparent {
          static onInherited(inheritor) {}
          static eyeColor() {
            return "brown";
          }
        }

        class Parent extends Grandparent {}
        class Child extends Parent {}
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Grandparent = class {
          static onInherited(inheritor) {}
          static eyeColor() {
            return "brown";
          }
        };

        let Parent = class extends Grandparent {};
        let Child = class extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions saved as variables", function() {
        let Grandparent = class NamedGrandparent {
          static onInherited(inheritor) {}
          static eyeColor() {
            return "brown";
          }
        };

        let Parent = class NamedParent extends Grandparent {};
        let Child = class NamedChild extends Parent {};
        expect(Child.eyeColor()).to.equal("brown");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class {
            static onInherited(inheritor) {}
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Parents = {
          Parent: class extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });

      it("using named class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class NamedGrandparent {
            static onInherited(inheritor) {}
            static eyeColor() {
              return "brown";
            }
          }
        };

        let Parents = {
          Parent: class NamedParent extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(Children.Child.eyeColor()).to.equal("brown");
      });
    });
    describe("can have instance methods", function() {
      it("using named class declarations", function() {
        class Grandparent {
          static onInherited(inheritor) {}
        }

        class Parent extends Grandparent {}
        class Child extends Parent {
          childishness() {
            return 6;
          }
        }
        expect(new Child().childishness()).to.equal(6);
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Grandparent = class {
          static onInherited(inheritor) {}
        };

        let Parent = class extends Grandparent {};
        let Child = class extends Parent {
          childishness() {
            return 6;
          }
        }
        expect(new Child().childishness()).to.equal(6);
      });

      it("using named class expressions saved as variables", function() {
        let Grandparent = class NamedGrandparent {
          static onInherited(inheritor) {}
        };

        let Parent = class NamedParent extends Grandparent {};
        let Child = class NamedChild extends Parent {
          childishness() {
            return 6;
          }
        }
        expect(new Child().childishness()).to.equal(6);
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class extends Parents.Parent {
            childishness() {
              return 6;
            }
          }
        };
        expect(new Children.Child().childishness()).to.equal(6);
      });

      it("using named class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class NamedGrandparent {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class NamedParent extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {
            childishness() {
              return 6;
            }
          }
        };
        expect(new Children.Child().childishness()).to.equal(6);
      });
    });
    describe("can inherit instance methods from its parent", function() {
      it("using named class declarations", function() {
        class Grandparent {
          static onInherited(inheritor) {}
        }

        class Parent extends Grandparent {
          hairColor() {
            return "red";
          }
        }
        class Child extends Parent {}
        expect(new Child().hairColor()).to.equal("red");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Grandparent = class {
          static onInherited(inheritor) {}
        };

        let Parent = class extends Grandparent {
          hairColor() {
            return "red";
          }
        };
        let Child = class extends Parent {}
        expect(new Child().hairColor()).to.equal("red");
      });

      it("using named class expressions saved as variables", function() {
        let Grandparent = class NamedGrandparent {
          static onInherited(inheritor) {}
        };

        let Parent = class NamedParent extends Grandparent {
          hairColor() {
            return "red";
          }
        };
        let Child = class NamedChild extends Parent {}
        expect(new Child().hairColor()).to.equal("red");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class extends Grandparents.Grandparent {
            hairColor() {
              return "red";
            }
          }
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(new Children.Child().hairColor()).to.equal("red");
      });

      it("using named class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class NamedGrandparent {
            static onInherited(inheritor) {}
          }
        };

        let Parents = {
          Parent: class NamedParent extends Grandparents.Grandparent {
            hairColor() {
              return "red";
            }
          }
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(new Children.Child().hairColor()).to.equal("red");
      });
    });
    describe("can inherit instance methods from its grandparent", function() {
      it("using named class declarations", function() {
        class Grandparent {
          static onInherited(inheritor) {}
          hairColor() {
            return "red";
          }
        }

        class Parent extends Grandparent {}
        class Child extends Parent {}
        expect(new Child().hairColor()).to.equal("red");
      });

      it("using anonymous class expressions with variable declaration", function() {
        let Grandparent = class {
          static onInherited(inheritor) {}
          hairColor() {
            return "red";
          }
        };

        let Parent = class extends Grandparent {};
        let Child = class extends Parent {}
        expect(new Child().hairColor()).to.equal("red");
      });

      it("using named class expressions saved as variables", function() {
        let Grandparent = class NamedGrandparent {
          static onInherited(inheritor) {}
          hairColor() {
            return "red";
          }
        };

        let Parent = class NamedParent extends Grandparent {};
        let Child = class NamedChild extends Parent {}
        expect(new Child().hairColor()).to.equal("red");
      });

      it("using anonymous class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class {
            static onInherited(inheritor) {}
            hairColor() {
              return "red";
            }
          }
        };

        let Parents = {
          Parent: class extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class extends Parents.Parent {}
        };
        expect(new Children.Child().hairColor()).to.equal("red");
      });

      it("using named class expressions on object literal properties", function() {
        let Grandparents = {
          Grandparent: class NamedGrandparent {
            static onInherited(inheritor) {}
            hairColor() {
              return "red";
            }
          }
        };

        let Parents = {
          Parent: class NamedParent extends Grandparents.Grandparent {}
        };

        let Children = {
          Child: class NamedChild extends Parents.Parent {}
        };
        expect(new Children.Child().hairColor()).to.equal("red");
      });
    });
  });
});
