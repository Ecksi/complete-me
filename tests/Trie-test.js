const { expect } = require('chai');
const Node = require('../scripts/Node');
const Trie = require('../scripts/Trie');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

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
    });

    it('should return undefined if the children node does not exist', () => {
      trie.insert('allakhazam');

      expect(trie.root.children.a.data).to.eq('a');
      expect(trie.root.children.a.children.z).to.eq(undefined);
    });

    it('should have end return true at the end of the word', () => {
      trie.insert('mew');

      expect(trie.root.children.m.end).to.eq(false);
      expect(trie.root.children.m.children.e.end).to.eq(false);
      expect(trie.root.children.m.children.e.children.w.end).to.eq(true);
    });

    it('should have multiple keys when the same children Node is used', () => {
      trie.insert('hitmonchan');
      trie.insert('hatmonlee');

      expect(Object.keys(trie.root.children.h.children).length).to.eq(2);
    });

    it('should be able to add four words to the trie', () => {
      trie.insert('weedle');
      trie.insert('pidgey');
      trie.insert('rattata');
      trie.insert('caterpie');

      expect(trie.count).to.eq(4);
      expect(trie.root.children.c.data).to.eq('c');
      expect(trie.root.children.c.children.a.data).to.eq('a');
    });

    it('should not count duplicate words', () => {
      trie.insert('machop');
      
      expect(trie.count).to.eq(1);
      trie.insert('machop');
      trie.insert('MaCHoP');
      trie.insert('maCHOp');

      expect(trie.count).to.eq(1);
    });
  });

  describe('SUGGEST', () => {
    it('should return undefined if the prefix doesn\'t exist', () => {
      expect(trie.findEndOfPrefix('ditto')).to.eq(undefined);
    });

    it('should return current Node when the end of prefix is reached', () => {
      trie.insert('charmander');

      const currentNode = trie.findEndOfPrefix('ch');

      expect(currentNode).to.eq(trie.root.children.c.children.h);
    });

    it('should find the end of a word', () => {
      trie.insert('oddish');

      const currentNode = trie.findEndOfPrefix('od');
      const result = ['oddish'];

      expect(trie.suggest('odd')).to.deep.eq(result);
    });

    it('should reset the suggestions array', () => {
      trie.suggestions = ['mew', 'mewtwo'];

      trie.suggest('Snorlax')

      expect(trie.suggestions).to.deep.eq([]);
    })

    it('should find multiple words', () => {
      trie.insert('nidoran');
      trie.insert('nidorano');
      trie.insert('nidoqueen');
      trie.insert('nidoking');

      const result = ['nidoran', 'nidorano', 'nidoqueen', 'nidoking']

      expect(trie.suggest('nido')).to.deep.eq(result);
    });
  })

  describe('SELECT', () => {
    it('should be to increment weight count', () => {
      trie.insert('dratini');
      trie.insert('dragonair');
      trie.insert('dragonite');
      trie.insert('dram')

      const initialWeight = trie.root.children.d.children.r.children.a.children.m.weight;

      expect(initialWeight).to.eq(0);

      trie.select('dram');

      const modifiedWeight = trie.root.children.d.children.r.children.a.children.m.weight;

      expect(modifiedWeight).to.eq(1);
    });

    it('should order suggestions by weight', () => {
      trie.insert('excellent');
      trie.insert('exeggutor');
      trie.insert('exeggcute');

      trie.select('excellent');
      trie.select('excellent');

      const result = ['excellent', 'exeggutor', 'exeggcute'];

      expect(trie.suggest('ex')).to.deep.eq(result);
    });
  });

  describe('DELETE', () => {
    it('should be able to remove an word from the trie', () => {
      trie.insert('sandshrew');
      trie.insert('sandslash');

      const result1 = ['sandshrew', 'sandslash'];
      const result2 = ['sandslash'];

      expect(trie.suggest('sand')).to.deep.eq(result1);

      trie.delete('sandshrew');

      expect(trie.suggest('sand')).to.deep.eq(result2)
    });

    it('should lower the count when a word is deleted', () => {
      trie.insert('Eevee');
      trie.insert('Vaporeon');
      trie.insert('Jolteon');
      trie.insert('Flareon');

      expect(trie.count).to.eq(4);

      trie.delete('Jolteon');
      trie.delete('flareon');

      expect(trie.count).to.eq(2);
    });
  });

  describe('POPULATE', () => {
    it('should populate an array of words', () => {
      trie.populate(dictionary);
      expect(trie.count).to.eq(234371);
    });
  });
})