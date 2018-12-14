'use strict';

class _Node {
  constructor(data, next) {
    this.next = next;
    this.data = data;
  }
}

class Node {
  constructor(value) {
    (this.value = value), (this.next = null), (this.prev = null);
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data) {
    const node = new Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }

    this.last = node;
  }

  peek() {
    return this.first.value;
  }

  dequeue() {
    if (this.first === null) {
      return;
    }

    const node = this.first;
    this.first = node.prev;

    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }
}

function displayQ(q) {
  let currentNode = q.first;
  while (currentNode !== null) {
    console.log(currentNode.value);
    currentNode = currentNode.prev;
  }
}

function ophidian(q){

  while(q.first) {
    let currentCustomer = q.first.value;
    if(currentCustomer) {
      console.log('We served a prepared customer');
      q.dequeue();
    } else {
      console.log('You were not prepared. Back to the line!');
      currentCustomer = true;
      q.enqueue(currentCustomer);
      q.dequeue();
    }
  }
}

function squareDance(q) {
  let spares = new Queue();
  let spareCount = 0;
  while (q.first) {
    if (!spares.first) {
      spares.enqueue(q.dequeue());
      spareCount++;
    }
    if (q.first.value.gender !== spares.first.value.gender) {
      console.log(
        `${q.first.value.gender} dancer is : ${q.first.value.name} and the ${
        spares.first.value.gender
        } dancer is: ${spares.first.value.name}`
      );
      q.dequeue();
      spares.dequeue();
      spareCount--;
    } else if (q.first.value.gender === spares.first.value.gender) {
      spares.enqueue(q.dequeue());
      spareCount++;
    }
  }
  console.log(
    'There are ' +
      spareCount +
      ' ' +
      spares.first.value.gender +
      ' dancers waiting to dance.'
  );
}

function stacksToQ(stackOne, stackTwo) {
  //input: 1,2,3,4
  while (stackOne.top) {
    stackTwo.push(stackOne.pop());
  }
  while (stackTwo.top) {
    console.log(stackTwo.pop());
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
  if (indexStack.top) {
    return (
      'No closing character for ' +
      charStack.top.data +
      ' at index ' +
      indexStack.top.data +
      '.'
    );
  }
  return 'All looks good';
}

function leftToRight(leftStack, rightStack) {
  if (rightStack.top === null) {
    rightStack.push(leftStack.pop());
  }
  let count = 1;
  while (leftStack.top) {
    let temp = leftStack.pop();
    while (rightStack.top && rightStack.top.data < temp) {
      leftStack.push(rightStack.pop());
    }
    rightStack.push(temp);
  }
  return rightStack;
}

function main() {
  let starTrekQ = new Queue();
  starTrekQ.enqueue('Kirk');
  starTrekQ.enqueue('Spock');
  starTrekQ.enqueue('Uhura');
  starTrekQ.enqueue('Sulu');
  starTrekQ.enqueue('Checkov');
  console.log(starTrekQ.peek());
  displayQ(starTrekQ);
  let stackOne = new Stack();
  let stackTwo = new Stack();
  stackOne.push(1);
  stackOne.push(2);
  stackOne.push(3);
  stackOne.push(4);
  display(stackOne);
  console.log('Below is exiting');
  stacksToQ(stackOne, stackTwo);
  let dancers = new Queue();
  dancers.enqueue({ gender: 'F', name: 'Jane' });
  dancers.enqueue({ gender: 'M', name: 'frank' });
  dancers.enqueue({ gender: 'M', name: 'John' });
  dancers.enqueue({ gender: 'M', name: 'joe' });
  dancers.enqueue({ gender: 'F', name: 'Madonna' });
  dancers.enqueue({ gender: 'M', name: 'dave' });
  dancers.enqueue({ gender: 'M', name: 'Chris' });
  dancers.enqueue({ gender: 'F', name: 'Beyonce' });
  squareDance(dancers);
  let random;
  let bankQ = new Queue();
  let customers = 10;
  while(customers > 0) {
    random = Math.random() >= 0.25;
    bankQ.enqueue(random);
    customers--;
  }
  ophidian(bankQ);
}

function mainStack() {
  let starTrek = new Stack();
  let leftStack = new Stack();
  let rightStack = new Stack();
  leftStack.push(2);
  leftStack.push(100);
  leftStack.push(3);
  leftStack.push(1);
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
  console.log(' ');
  leftToRight(leftStack, rightStack);
  console.log('POST SORTED STACK ==> ');
  display(leftStack);
  display(rightStack);
}

main();
