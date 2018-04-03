class Node {
  constructor(data = null) {
    this.data = data;
    this.isWord = false;
    this.child = {};
  }
}

module.exports = Node;