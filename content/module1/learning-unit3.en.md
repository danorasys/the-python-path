---
title: Comments and Basic Code Style
summary: Using `#` to document code and keep it readable.
---

## What is a Comment in Python?

A comment is a part of the code that is not executed. It is used to explain what a block of instructions does, clarify the logic behind a calculation, or leave reminders.

In Python, comments are written using the symbol `#`:

```python
# this is how you write a comment
```

Everything that comes after `#` on that line will be ignored by Python.

:::note[Note:]
Comments are for humans, not for the interpreter. They give clarity to the code and help you remember what you were trying to do when you read it again later.
:::

## Single-line Comments

This is the most common type. They are placed above a line of code or to its right.

Example:

```python run
# This program shows a greeting
print("Hello")  # Displays text on screen
```

```output
Hello
```

:::tip[Tip:]
Avoid writing obvious comments like:\
`x = x + 1 # Add 1 to x`
:::

Good comments explain the why, not the what.

## Multiline Comments (Explanatory Text)

Python does not have a special symbol for multiline comments like other languages, but you can use triple quotes `""" """` to write long text that won't be executed if it is not assigned to a variable.

It is commonly used at the beginning of a file or at the start of functions.

Example:

```python
"""
This program calculates the area of a circle.
The user enters the radius and the result is shown.
"""
```

:::note[Note:]
Technically, this is an unused string literal, but Python ignores it, so it works as a comment.
:::

## What Are Comments Really For?

Comments are not decoration. They are useful when:

- They explain the intention behind a solution.
- They clarify complicated parts of the code.
- They document important decisions.
- They help whoever reads the code (including you).

:::tip[Note:]
If you have to explain too much, maybe the code is too complex. Sometimes the best option is to simplify the code, not write more comments.
:::

## Basic Code Style: Writing Clean Code

Python is famous for promoting a clear and readable style. Here are some essential rules:

### 1\. Use Descriptive Variable Names

:cross Bad:

```python
x = 10
y = 20
```

:check Good:

```python
age = 10
years_experience = 20
```

:::note[Note:]
A good name prevents the need for unnecessary comments.
:::

### 2\. Spaces Around Operators

This greatly improves readability.

:cross Without spaces:

```python
sum=10+5
```

:check With spaces:

```python
sum = 10 + 5
```

### 3\. One Idea Per Line

:cross Hard to read:

```python
a = 10; b = 20; print(a+b)
```

:check Clear and simple:

```python run
a = 10
b = 20
print(a + b)
```

```output
30
```

### 4\. Keep Lines Short

The general recommendation is not to exceed 79 characters per line (PEP 8).

:::tip[Tip:]
If you need to write something long, split it into several parts using `\` or concatenation.
:::

## Comments In Real Code

Let's look at a more realistic example of how to use comments to clarify an idea:

```python run
# Calculate the final price with discount
price = 100
discount = 0.15

# Apply discount
final_price = price - (price * discount)

print("Final price:", final_price)
```

```output
Final price: 85.0
```

Here the comments explain the purpose, not the mathematical operation.

## When Should You NOT Comment?

:::tip[Tip:]
Use this golden rule:\
**"Comment when the reader might get confused; don't comment on obvious things"**.
:::

:cross Unnecessary comment:

```python
print("Hello")  # prints Hello
```

:cross Comments that duplicate code:

```python
x = 5   # x is now 5
```

## Guided Exercise

Add useful comments to this code snippet:

```python run="Practice >>"
name = "Juan"
age = 22
current_year = 2025

print("Your name is:", name)
print("Your age in 5 years will be:", age + 5)
```

:::details[See possible solution]
```python
# User data
name = "Juan"
age = 22
current_year = 2025

# Show information
print("Your name is:", name)

# Calculate future age (current age + 5)
print("Your age in 5 years will be:", age + 5)
```
:::

## Unit Conclusions

In this topic you learned:

- How to write comments with `#`.
- How to create explanatory comments with triple quotes.
- Good practices for style and readability.
- What makes a comment useful.
- How to write clearer and more structured code.

Comments will be your allies as you move on to more complex programs.
