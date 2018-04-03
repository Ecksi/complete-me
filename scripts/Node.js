class Node {
  constructor(data = null) {
    this.data = data;
    // would this be an array or hash dictionary
    this.next = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', null];
  }
}

module.exports = Node;