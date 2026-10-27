---
title: "Your First Program: `print()`"
summary: How to display text on the screen and understand the basic structure of a program.
source: 55773158d2fa
---

## What is a Program in Python?

A program in Python is simply a text file that contains instructions which the interpreter will execute line by line. The minimal structure of a program can be as simple as a single line that displays a message on the screen.

:::note
In Python, each line is executed in order, from top to bottom. You don’t need a mandatory main function like in other languages.
:::

## The `print()` Function: Your First Tool

The `print()` function is used to display information on the screen. It is the classic starting point in any programming language.

Basic example:

```python
print("Hello, World")
```

When you run this program, Python will display:

```python
Hello, World
```

```python run hidden
print("Hello, World")
```

:::tip
Everything you want to display must go inside the parentheses of `print()`. If it is text, it must be enclosed in quotation marks.
:::

## What Can I Display With `print()`?

### Text (Strings - `str`)

```python
print("Learning Python is fun")
```

### Numbers

```python
print(2025)
```

### Variables

```python
name = "Python"
print(name)
```

```python run="Try Them All >>" hidden
print("Learning Python is fun")

print(2025)

name = "Python"
print(name)
```

```output label="Expected output:"
Learning Python is fun
2025
Python
```

:::note
Unlike many languages, Python does not require you to declare the variable type; simply assigning it is enough.
:::

## Display Multiple Values At Once

Python allows you to print multiple elements separated by commas:

```python run
print("Your age is:", 22)
```

```output
Your age is: 22
```

:::note
When you use commas inside `print()`, Python automatically adds a space between each element.
:::

## How `print()` Works Internally

Although `print()` seems simple, it has several useful parameters:

```python
print(objects, sep=" ", end="\n")
```

- `sep` → Defines the separator between elements.
- `end` → Defines what is printed at the end of the line.

### Example Using `sep`:

```python run
print("Python", "JavaScript", "Go", sep=" | ")
```

```output
Python | JavaScript | Go
```

### Example Using `end`:

```python run
print("Hello", end="...")
print("World")
```

```output
Hello...World
```

:::note
By default, `end` uses `\n`, that is, a newline. That’s why each `print()` appears on a new line.
:::

## Spaces, Newlines, and Special Characters

You can control the text format using special sequences:

- `\n` → Newline.
- `\t` → Tab.
- `\"` → Quotes Within Quotes.
- `\\` → Literal Backslash.

Example:

```python run
print("Line 1\nLine 2\nLine 3")
```

```output
Line 1
Line 2
Line 3
```

:::note
Escape sequences allow you to control exactly how the text you print looks. They are very useful for displaying menus or formatted output.
:::

## A Very Common Mistake When Using `print()`

If you forget to close the quotation marks:

```python
print("Hello)
```

Python will show a syntax error.

```python run="Test Error >>" hidden error
print("Hello)
```

## Minimal Structure of a Python Program

```python
print("Hello from my first Python program")
```

This is already a complete, valid, and functional program.

```output
Hello from my first Python program
```

```python run hidden
print("Hello from my first Python program")
```

:::tip
Think of a program as a list of instructions. If you have two lines:
:::

```python
print("First line")
print("Second line")
```

Python will always execute them in that order.

```output
First line
Second line
```

```python run hidden
print("First line")
print("Second line")
```

## Guided Exercise: Your First Real Script

Let's display a more personalized message.

```python
name = "YOUR NAME"
print("Welcome,", name, "to the world of Python!")
```

```output
Welcome, YOUR NAME to the world of Python!
```

:::note
You can replace `"YOUR NAME"` with your own name.
:::

```python run hidden
name = "YOUR NAME"
print("Welcome,", name, "to the world of Python!")
```

## Unit Conclusions

In this topic you learned:

- What a program in Python is.
- How `print()` works.
- How to use `sep` and `end`.
- How to control newlines and tabs.
- How to write a minimal valid program.

`print()` is the tool you will constantly use to see results, debug ideas, and communicate with the user.
