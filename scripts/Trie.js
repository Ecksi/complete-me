const Node = require('../scripts/Node');

class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
  }

  insert(word) {
    const sanitizeWord = word.toLowerCase();

    this.count++;
    return this.splitWord(sanitizeWord)
  }

  splitWord(word, currentNode = this.root, index = 0) {
    const letter = word[index];

    if (word.length === index) {
      currentNode.end = true;
      return word;
    }

    if (!currentNode.children[letter]) {
      currentNode.children[letter] = new Node(letter);
    }
    return this.splitWord(word, currentNode.children[letter], ++index);
  }
}

module.exports = Trie;