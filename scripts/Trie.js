const Node = require('../scripts/Node');

class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
    this.suggestions = [];
    this.sortedSuggestions = [];
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
    this.resetSuggestions();
    const sanitizePrefix = prefix.toLowerCase();
    const currentNode = this.findEndOfPrefix(sanitizePrefix);
    
    if (!currentNode) { 
      return null 
    };

    this.findWordSuggestions(currentNode, sanitizePrefix);
    this.sortSuggestions();

    return this.sortedSuggestions;
  }

  findEndOfPrefix(prefix) {
    const prefixArray = Array.from(prefix);
    let currentNode = this.root;

    while (prefixArray.length) {
      let letter = prefixArray.shift();
      let child = currentNode.children[letter];
      if (!child) {
        return undefined;
      }
      currentNode = child;
    }

    return currentNode
  }

  findWordSuggestions(startNode, prefix) {
    if (startNode.end) {
      this.formatSuggestion(startNode, prefix)
    }

    Object.keys(startNode.children).forEach(childLetter => {
      const currentNode = startNode.children[childLetter];

      return this.findWordSuggestions(currentNode, prefix + childLetter);
    })
  }

  sortSuggestions() {
    this.suggestions.forEach(suggestion => {
      this.sortedSuggestions.push(suggestion.word);
    })

    this.suggestions.sort((a, b) => {
      return b.weight - a.weight;
    })
  }

  resetSuggestions() {
    this.suggestions = [];
    this.sortedSuggestions = [];
  }

  formatSuggestion(node, word) {
    this.suggestions.push({
      word: word,
      weight: node.weight
    });
  }

  select(word) {
    const currentNode = this.findEndOfPrefix(word);

    currentNode.weight++;
  }

  delete(word) {
    const sanitizeWord = word.toLowerCase();
    const currentNode = this.findEndOfPrefix(sanitizeWord);

    if (currentNode.end) {
      currentNode.end = false;
      this.count--;
    }
  }

  populate(array) {
    array.forEach(element => this.insert(element));
  }
}

module.exports = Trie;