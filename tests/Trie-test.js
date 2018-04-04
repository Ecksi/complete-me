const { expect } = require('chai');
const Node = require('../scripts/Node');
const Trie = require('../scripts/Trie');

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe('INSERT', () => {
    it('should add a word to the trie', () => {
      trie.insert('hitmonchan');

      expect(trie.count).to.equal(1);
      expect(trie.root.children.h.data).to.equal('h');
      expect(trie.root.children.h.children.i.data).to.equal('i');
    })

    it('should be able to add four words to the trie', () => {
      trie.insert('hitmonchan');
      trie.insert('hatmonlee');
      trie.insert('mew');
      trie.insert('bulbasaur');
      trie.insert('diglet');

      expect(trie.count).to.equal(5);
      expect(Object.keys(trie.root.children.h.children).length).to.equal(2);
      expect(trie.root.children.m.children.e.children.w.end).to.equal(true);
      expect(trie.root.children.b.data).to.equal('b');
      expect(trie.root.children.b.children.i).to.equal(undefined);
      expect(trie.root.children.d.data).to.equal('d');
      expect(trie.root.children.d.children.i.data).to.equal('i');
    })
  })
})