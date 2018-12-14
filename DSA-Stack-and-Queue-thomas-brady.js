'use strict';

class _Node {
  constructor(data, next) {
    this.next = next;
    this.data = data;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }

    const node = new _Node(data, this.top);
    this.top = node;
  }

  pop() {
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
}

function peek(stack) {
  console.log(stack.top.data);
}

function display(stack) {
  let currentNode = stack.top;
  while (currentNode !== null) {
    console.log(currentNode.data);
    currentNode = currentNode.next;
  }
}

// then remove the nodes from a stack to build a new string
// if string2 = input

function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  let sStack = new Stack();
  let str2 = '';
  for (let char of s) {
    sStack.push(char);
  }
  while (sStack.top) {
    str2 += sStack.top.data;
    sStack.pop();
  }
  if (str2 === s) {
    return true;
  } else {
    return false;
  }
}
//input = ([1-5)+(3-5))
//create variables = parentheses, stack,
// loop through the str looking at each character
// look for the index of the character in the string
// look %2 to determine if it's opened or closed
// check to see if it's closed -

//True
//False - missing

function balancedParentheses(str) {
  let charStack = new Stack();
  let indexStack = new Stack();

  let open = {
    '{': '}',
    '[': ']',
    '(': ')'
  };

  let close = {
    '}': true,
    ']': true,
    ')': true
  };
  let count = 0;
  for (let char of str) {
    if (open[char]) {
      charStack.push(char);
      indexStack.push(count);
    } else if (close[char]) {
        if (char !== open[charStack.top.data]) {
          return (
            char +
            ' at index ' +
            count +
            ' does not match ' +
            charStack.top.data +
            ' at index ' +
            indexStack.top.data +
            '.'
          );
        } else if (char === open[charStack.pop()]) {
        indexStack.pop();
      }
    }
  }
  if(indexStack.top) {
      return 'No closing character for ' +
      charStack.top.data +
      ' at index ' +
      indexStack.top.data +
      '.';
  }
  return 'All looks good';
}

function main() {
  let starTrek = new Stack();
  console.log('CREATE STACK CLASS ==> ');
  starTrek.push('Kirk');
  peek(starTrek);
  starTrek.push('Spock');
  peek(starTrek);
  starTrek.push('McCoy');
  peek(starTrek);
  starTrek.push('Scotty');
  peek(starTrek);
  display(starTrek);
  starTrek.pop();
  display(starTrek);
  console.log(' ');
  console.log('CHECK FOR PALINDROMES USING STACK ==> ');
  console.log(is_palindrome('dad'));
  console.log(is_palindrome('A man, a plan, a canal: Panama'));
  console.log(is_palindrome('1001'));
  console.log(is_palindrome('Tauhida'));
  console.log(balancedParentheses('(())')); //true
  console.log(balancedParentheses('(1(2)3)')); //true
  console.log(balancedParentheses('(1[2)3)')); // false
  console.log(balancedParentheses('(1(23)')); //false
  console.log(balancedParentheses('[(1{2}3)]'));
}

main();
