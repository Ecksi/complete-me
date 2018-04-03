const Node = require('../scripts/Node');

class Trie {
  constructor() {
    this.root = new Node('')
    this.count = 0;
  }

  insert(word) {
    let sanitizeWord = word.toLowerCase();
    let currentNode = this.root;

    this.count++;

    if (!node.child.data) {
      currentNode.child = new Node(sanitizeWord[0]);
    }

    if (node.child.data === santizeWord[0]) {
      currentNode = currentNode.child
      insert(word[i + 1])
    }
  }
}

module.exports = Trie;