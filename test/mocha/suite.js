import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('Class.onInherited', function() {
  describe("using class declarations", function(){
    it("is called when a class is inherited from", function() {
      var callback = sinon.spy();

      class Parent {
        static onInherited(child) {
          callback(child);
        }
      }

      class Child extends Parent {}

      expect(callback).to.have.been.calledWith(Child);
    });

    it("can redefine the value of the declared class", function() {
      var replacement = sinon.stub();

      class Parent {
        static onInherited(child) {
          return replacement;
        }
      }

      class Child extends Parent {}

      expect(Child).to.equal(replacement);
    });

    it("can redefine the value of the declared class to a falsy value other than undefined", function() {
      // Not sure why you'd want to do this, but...
      class Falserator {
        static onInherited(child) {
          return false;
        }
      }

      class FalseratedChild extends Falserator {}

      expect(FalseratedChild).to.equal(false);

      class Nullifier {
        static onInherited(child) {
          return null;
        }
      }

      class NullifiedChild extends Nullifier {}

      expect(NullifiedChild).to.equal(null);
    });

    it("has a reliable name property", function(){
      class Parent {
        static onInherited(child) {}
      }

      class Child extends Parent {}

      expect(Child.name).to.equal("Child");
    });
  });

  describe("using class expressions", function(){
    it("is called when a class is inherited from", function() {
      var callback = sinon.spy();

      var Parent = class {
        static onInherited(child) {
          callback(child);
        }
      }

      var Child = class extends Parent {}

      expect(callback).to.have.been.calledWith(Child);
    });

    it("can redefine the value of the declared class", function() {
      var replacement = sinon.stub();

      var Parent = class {
        static onInherited(child) {
          return replacement;
        }
      }

      var Child = class extends Parent {}

      expect(Child).to.equal(replacement);
    });

    it("can redefine the value of the declared class to a falsy value other than undefined", function() {
      // Not sure why you'd want to do this, but...
      var Falserator = class {
        static onInherited(child) {
          return false;
        }
      }

      var FalseratedChild = class extends Falserator {}

      expect(FalseratedChild).to.equal(false);

      var Nullifier = class {
        static onInherited(child) {
          return null;
        }
      }

      var NullifiedChild = class extends Nullifier {}

      expect(NullifiedChild).to.equal(null);
    });

    it("has a reliable name property", function(){
      var Parent = class {
        static onInherited(child) {}
      }

      var Child = class extends Parent {}

      expect(Child.name).to.equal("Child");
    });
  });

  describe("classes without an onInherited callback", function(){
    it("still function properly", function() {
      class Parent {
        static number() { return 7; }
      }

      class Child extends Parent {
        static letter() { return "A"; }
      }

      expect(Child.number()).to.equal(7);
      expect(Child.letter()).to.equal("A");
      expect(Child.name).to.equal("Child");
    });
  });

  describe("when onInherited is called", function(){
    it("child class has a valid name property", function(){
      class Parent {
        static onInherited(child) {
          expect(child.name).to.equal("Child");
        }
      }

      class Child extends Parent {}
    });
  });

  describe("When a grandchild inherits", function(){
    it("Grandparent.onInherited is still called", function(){
      var callback = sinon.spy();

      class Grandparent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      }

      class Parent extends Grandparent {}
      class Child extends Parent {}

      expect(callback).to.have.been.calledWith(Parent);
      expect(callback).to.have.been.calledWith(Child);
    });

    it("Grandparent.onInherited is not called if Parent redefined onInherited", function(){
      var callback = sinon.spy();

      class Grandparent {
        static onInherited(inheritor) {
          callback(inheritor);
        }
      }

      class Parent extends Grandparent {
        static onInherited() {
          // do nothing
        }
      }
      class Child extends Parent {}

      expect(callback).to.have.been.calledWith(Parent);
      expect(callback).not.to.have.been.calledWith(Child);
    });
  });
})
