const { expect } = require('chai');
const Node = require('../scripts/Node');
const Trie = require('../scripts/Trie');

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with zero elements', () => {
    expect(trie.length).to.eq(0);
  });

  it('should set its default head to null', () => {
    expect(trie.head).to.eq(null);
  });

  describe('INSERT', () => {
    it('should add a word to the trie', () => {
      trie.insert('hitmonchan');
      expect(trie.length).to.equal(1)
      expect(trie.head.data).to.equal('hitmonchan')
    })
  })
})