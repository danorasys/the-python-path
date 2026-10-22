---
title: "Conditionals: `if`, `elif`, `else`"
summary: In this unit, you will learn how to allow your program to make decisions using `if`, `elif`, and `else`, so that the code can execute different actions depending on which conditions are met. You will see how the flow behaves when a condition is true, what happens when none match, and how to chain multiple options together.
---

Conditionals are one of the most important tools in any programming language, as they allow a program to make decisions. Thanks to them, your code can execute one thing or another depending on the situation. In Python, the keywords `if`, `elif` and `else` are used to control this behavior.

## What is a Conditional?

A conditional evaluates an expression that can be either true or false. If it is true, a block of code is executed; if it is false, other options are evaluated or an alternative block is executed.

Python uses indentation (tabs or spaces) to define which statements are part of the conditional.

## Basic Structure

### 1\. `if`

It is executed only if the condition is true.

```python run
age = 18
if age >= 18:
    print("You are an adult")
```

```output
You are an adult
```

### 2\. `elif` (else if...)

It is used to evaluate additional conditions when the `if` condition is not met.

```python run
grade = 75
if grade >= 90:
    print("Excellent")
elif grade >= 70:
    print("Passed")
```

```output
Passed
```

### 3\. `else` (if nothing else happened...)

It is executed only if all the previous conditions were false.

```python run
temperature = 10
if temperature > 25:
    print("It's hot")
else:
    print("It's cold")
```

```output
It's cold
```

:::note
The `else` does not take a condition because it acts as the final option when none of the previous conditions apply.
:::

## Chaining Conditions

You can combine `if`, multiple `elif`, and an `else` to create multiple paths:

```python run
x = 0
if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("It is zero")
```

```output
It is zero
```

This type of structure helps model real-world processes: evaluating grades, classifying ages, selecting options, and more.

:::tip
When you have many conditions, order them from the most specific to the most general to prevent a broad condition from blocking more precise ones.
:::

## Most Useful Conditions

You can use comparison operators (we will go deeper into these in the next learning unit):

- `==` (equal to).
- `!=` (not equal to).
- `<` (less than), `>` (greater than), `<=` (less than or equal to), `>=` (greater than or equal to).

You can also use logical operators (we will go deeper into these in the next learning unit):

- `and`.
- `or`.
- `not`.

Example:

```python run
age = 20
has_id = True

if age >= 18 and has_id:
    print("You can enter")
```

```output
You can enter
```

:::note
Conditions can be as simple or as complex as you need. However, it is good practice to keep them clear and readable.
:::

## Practical Examples

### Example 1: Check If a Number is Even or Odd

```python run
number = 8

if number % 2 == 0:
    print("It is even")
else:
    print("It is odd")
```

```output
It is even
```

### Example 2: Classify an Age

```python run
age = 15

if age < 13:
    print("Child")
elif age < 18:
    print("Teenager")
else:
    print("Adult")
```

```output
Teenager
```

### Example 3: Check if a Password is Correct

```python run
password = "python123%"

if password == "python123%":
    print("Access granted")
else:
    print("Access denied")
```

```output
Access granted
```

## Exercises to Practice

### Exercise 1: Adult or Minor

Create a variable with an age (for example: `age = 17`).

If the age is 18 or older, display "Adult".

Otherwise, display "Minor".

```python practice
# Create a variable with an age
# (for example: age = 17).
# If the age is 18 or older, display "Adult ".
# Otherwise, display "Minor"
```

:::details
```python run
age = 17

if age >= 18:
    print("Adult")
else:
    print("Minor")
```
:::

### Exercise 2: Number Classifier

Create a variable called `n` and assign it a numeric value.

Display whether the number is positive, negative, or zero.

```python practice
# Create a variable called n and assign it
# a numeric value.
# Display whether the number is positive,
# negative, or zero
```

:::details
```python run
n = -5

if n > 0:
    print("Positive")
elif n < 0:
    print("Negative")
else:
    print("Zero")
```
:::

### Exercise 3: Check Access

Create two variables:

- `age`.
- `has_ticket` (`True` or `False`).

If the person has a ticket and is 16 or older, display "Welcome". Otherwise, display "You cannot enter".

```python practice
# Create two variables:
# age
# has_ticket (True o False)
# If the person has a ticket and is 16 or older,
# display "Welcome".
# Otherwise, display "You cannot enter"
```

:::details
```python run
age = 16
has_ticket = True

if age >= 16 and has_ticket:
    print("Welcome")
else:
    print("You cannot enter")
```
:::

## Unit Conclusions

In this unit, you learned that:

- Conditionals allow a program to make decisions.
- `if`, `elif` and `else` control different execution paths.
- Conditions work by evaluating expressions that can be true or false.
- You can use logical and comparison operators to create more complete conditions.
- It is possible to chain multiple cases to solve more realistic and varied problems.

When you master conditionals, your programs stop being linear and start reacting to different situations.
