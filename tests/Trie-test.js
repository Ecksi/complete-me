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
      trie.insert('magikarp');

      expect(trie.count).to.equal(1);
      expect(trie.root.children.m.data).to.eq('m');
      expect(trie.root.children.m.children.a.data).to.eq('a');
    })

    it('should return undefined if the children node does not exist', () => {
      trie.insert('allakhazam');

      expect(trie.root.children.a.data).to.eq('a');
      expect(trie.root.children.a.children.z).to.eq(undefined);
    })

    it('should have end return true at the end of the word', () => {
      trie.insert('mew');

      expect(trie.root.children.m.end).to.eq(false);
      expect(trie.root.children.m.children.e.end).to.eq(false);
      expect(trie.root.children.m.children.e.children.w.end).to.eq(true);
    })

    it('should have multiple keys when the same children Node is used', () => {
      trie.insert('hitmonchan');
      trie.insert('hatmonlee');

      expect(Object.keys(trie.root.children.h.children).length).to.eq(2);
    })

    it('should be able to add four words to the trie', () => {
      trie.insert('weedle');
      trie.insert('pidgey');
      trie.insert('rattata');
      trie.insert('caterpie');

      expect(trie.count).to.eq(4);
      expect(trie.root.children.c.data).to.eq('c');
      expect(trie.root.children.c.children.a.data).to.eq('a');
    })

    it('should not count duplicate words', () => {
      trie.insert('machop');
      
      expect(trie.count).to.eq(1);
      trie.insert('machop');

      expect(trie.count).to.eq(1);
    })
  })
})