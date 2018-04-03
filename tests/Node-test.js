const { expect } = require('chai');
const Node = require('../scripts/Node');

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should be a thing', () => {
    expect(node).to.exist;
  });

  it('should have data default to null', () => {
    expect(node.data).to.equal(null);
  });

  it('should have isWord start out false by default', () => {
    expect(node.isWord).to.equal(false);
  });

  it('should have child start as an empty object', () => {
    expect(node.child).to.deep.equal({});
  });
})
