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
  });
})
