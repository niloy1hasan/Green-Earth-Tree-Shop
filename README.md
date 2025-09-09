#### 1) What is the difference between var, let, and const?
**Answer:**

var, let, and const are JavaScript variable declaration keywords. The differences between them:

**var:**

var is the way to declare variables before ES6.

It is a global variable, so it can be accessed anywhere.

Example:

var a = 5;

var a = 4;

**let:**

let is ES6’s updated variable declaration keyword.

It is not a global variable.
It cannot be redeclared once declared.

Example:

let a;
let b = 5;

**const:**

const is also an ES6 variable declaration keyword.

Its value cannot be updated; it is constant.
It must be assigned a value; it cannot be empty.

Example:

const arr = [];



#### 2) What is the difference between map(), forEach(), and filter()? 
**Answer:**


**map():**

map() returns a new array after applying a function to each element.

**forEach():**

Short form of a for loop. Visits all elements of an array or object.

**filter():**

filter() returns a new array with elements that pass the condition.

It can return multiple elements.


#### 3) What are arrow functions in ES6?
**Answer:**

Arrow functions are a short syntax for writing functions using =>.

**Example:**

**Normal function:**

function print() {
  console.log("Hello World");
}


**Arrow function:**

const print = () => console.log("Hello World");


#### 4) How does destructuring assignment work in ES6?

**Answer:**

Destructuring assignment allows assigning names to values from arrays or objects, making them easier to use multiple times.

**Example:**

const arr = [1, 2, 3];
const [a, b] = arr;


Here, can use a and b to get the first and second values from the array.

#### 5) Explain template literals in ES6. How are they different from string concatenation?

**Answer:**
Template literals are strings written with backticks `. They support variable calling inside strings and multi-line strings.

Difference:

 Template literals allow calling variables directly and support multi-line strings.

String concatenation requires using + to combine strings or when call a variable and does not support multi-line easily.
