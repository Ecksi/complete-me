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
      if (currentNode.end) {
        this.count--;
      }
      currentNode.end = true;
      return word;
    }

    if (!currentNode.children[letter]) {
      currentNode.children[letter] = new Node(letter);
    }
    return this.splitWord(word, currentNode.children[letter], ++index);
  }

  suggest(prefix) {
    const suffixs = this.getSuggestionsFrom(this.findEndOfPrefix(prefix.toLowerCase()));
    return suffixs.map(suffix => prefix + suffix);
  }

  findEndOfPrefix(prefix, currentNode = this.root, index = 0) {
    const letter = prefix[index];

    if (prefix.length === index) {
      return currentNode;
    }

    if (!currentNode.children[letter]) {
      return undefined;
    }

    return this.findEndOfPrefix(prefix, currentNode.children[letter], ++index)
  }

  getSuggestionsFrom(currentNode, word = "", wordSuffixs = []) {
    const letters = Object.keys(currentNode.children);

    if(!currentNode.data) {
      return wordSuffixs;
    }

    letters.forEach(letter => {
      const letterKey = currentNode.children[letter];
      word = word + letterKey.data;

      if (letterKey.end) {
      wordSuffixs.push(word);
      if (!Object.keys(currentNode.children)) {
        word = "";
      }
    }

      if (currentNode.children[letterKey.data]) {
        currentNode = currentNode.children[letterKey.data];
        return this.getSuggestionsFrom(currentNode, word, wordSuffixs)
      }
    })
    return wordSuffixs;
  }

  populate(array) {
    array.forEach(word => this.insert(word));
  }
}

module.exports = Trie;
