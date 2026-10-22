---
title: "`while` and `for` Loops"
summary: In this unit, you will learn how to repeat instructions using `while` and `for`, which allows you to perform tasks repeatedly without writing the same code many times. You will also learn how to iterate over a sequence of characters (`str`).
source: 9ef6b06fcfa0
---

In programming, many tasks require repeating actions: displaying messages multiple times, counting numbers, or processing text character by character. Loops allow you to execute the same block of code multiple times without having to write it repeatedly. In Python, the two main loops are `while` and `for`.

## What Is a Loop?

A loop is a control structure that repeats a set of instructions while a condition is met or while there are elements to iterate over.

:::note
Without loops, programs would be long, repetitive, and difficult to maintain.
:::

## `while` Loop

### How Does It Work?

The `while` loop repeats a block of code as long as a condition is true. Before each iteration, Python evaluates the condition.

```python run
counter = 1
while counter <= 5:
    print(counter)
    counter = counter + 1
```

```output
1
2
3
4
5
```

:::tip
The `while` loop is ideal when you don’t know how many times the loop will repeat, but you do know when it should stop.
:::

:::note
If the condition never becomes false, the program will enter an infinite loop.
:::

### Controlling the `while` Loop

A control variable is usually used, which changes with each iteration.

```python run
x = 0
while x < 3:
    print("Hello")
    x += 1
```

```output
Hello
Hello
Hello
```

## `for` Loop

### How Does It Work?

The `for` loop is used to iterate over a sequence. In this unit, the main sequence will be a string (`str`), since a string is a collection of ordered characters.

```python run
for letter in "Python":
    print(letter)
```

```output
P
y
t
h
o
n
```

This means that the loop takes one character at a time and assigns it to the variable `letter`.

:::note
Even though lists haven’t been covered yet, strings already allow you to understand the concept of "iterating over a sequence".
:::

### What Does "Iterating Over a Sequence" Mean?

Iterating over a sequence means accessing each element one by one, in order. In the case of strings:

- Each character is an element.
- They are iterated from left to right.

:::tip
The `for` loop is ideal when you already know what you are going to iterate over, such as a text or a range of numbers.
:::

### Using `range()` with `for`

The `range()` function allows you to generate a sequence of numbers.

```python run
for i in range(5):
    print(i)
```

```output
0
1
2
3
4
```

:::note
`range(5)` generates the numbers from `0` to `4`.
:::

## Practical Examples

### Example 1: Counting from 1 to 5 with `while`

```python run
n = 1
while n <= 5:
    print(n)
    n += 1
```

```output
1
2
3
4
5
```

### Example 2: Displaying Each Letter of a Word

```python run
for c in "Hello":
    print(c)
```

```output
H
e
l
l
o
```

### Example 3: Repeating a Message Multiple Times

```python run
for i in range(3):
    print("Learning Python")
```

```output
Learning Python
Learning Python
Learning Python
```

## Practice Exercises

### Exercise 1: Counter with `while`

Create a variable called `counter` that starts at 1.\
Use a `while` loop to display the numbers from 1 to 10, one by one.

```python practice
# Create a variable called counter that starts at 1.
# Use a while loop to display the numbers from 1 to 10,
# one by one
```

:::details
```python run
counter = 1
while counter <= 10:
    print(counter)
    counter += 1
```
:::

### Exercise 2: Countdown

Create a variable called `n` with the value 5.\
Use a `while` loop to display a countdown until it reaches 1.

```python practice
# Create a variable called n with the value 5.
# Use a while loop to display a countdown until it
# reaches 1
```

:::details
```python run
n = 5
while n >= 1:
    print(n)
    n -= 1
```
:::

### Exercise 3: Iterating Over a Text

Create a variable called `word` with any text.\
Use a `for` loop to display each character of the word on a separate line.

```python practice
# Create a variable called word with any text.
# Use a for loop to display each character of the word
# on a separate line
```

:::details
```python run
word = "Python"
for letter in word:
    print(letter)
```
:::

### Exercise 4: Counting Letters

Use a for loop to count how many letters the word `"programming"` has.\
Use a counter variable.

```python practice
# Use a for loop to count how many letters the word
# "programming" has.
# Use a counter variable
```

:::details
```python run
counter = 0
for letter in "programming":
    counter += 1

print(counter)
```
:::

### Exercise 5: Even Numbers

Use a `for` loop and `range()` to display the even numbers from 0 to 10.

```python practice
# Use a for loop and range() to display the even
# numbers from 0 to 10
```

:::details
```python run
for i in range(0, 11, 2):
    print(i)
```
:::

## Unit Conclusions

In this unit, you learned that:

- Loops allow you to repeat instructions without duplicating code.
- The `while` loop repeats actions while a condition is true.
- The `for` loop is used to iterate over sequences, such as text strings.
- A string is a sequence of characters that can be iterated one by one.
- `range()` makes controlled repetition with numbers easier.
- Choosing the right loop makes your code clearer and more efficient.
