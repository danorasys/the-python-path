---
title: What is Python and How Does It Work?
summary: Introduction to the language, its features, readable syntax, and its uses.
---

## What is Python?

Python is a high-level programming language, created by Guido van Rossum and released in 1991. Its main feature is its clear and readable syntax, which makes it easy to learn even if you have never programmed before.

It is a general-purpose language, which means it can be used in a wide variety of areas:

- Web development.
- Artificial Intelligence and Machine Learning.
- Data analysis.
- Task automation.
- Video game development.
- Server scripting.
- Desktop applications.

:::note
Part of Python's success comes from its huge community and library ecosystem. For example, for AI you have TensorFlow, for data analysis Pandas, for web development Django, etc.
:::

## Main Features of Python

### :check Simple Syntax

Python is designed to make code easy to read, almost like plain English.

```python run
print('Hello, World')
```

```output
Hello, World
```

:::tip
If a line of Python "sounds" like what you’re trying to do, it’s probably the right way to write it.
:::

### :check Interpreted

Python does not need to be compiled before running. The code is executed line by line by the interpreter.\
\
This allows:

- Quickly testing ideas.
- Running code in interactive environments such as Pyodide (in the browser) or in a terminal.
- Detecting errors line by line.

:::note
Since Python is interpreted, if there is an error on line 80, Python will execute the first 79 without any problem and will only fail when it reaches line 80.
:::

### :check Cross-platform

Python works on:

- Windows.
- macOS.
- Linux.
- Web browsers (gracias a Pyodide).
- Servers.
- Microcontrollers (MicroPython).

### :check Dynamic Typing

You don’t need to specify the variable type (`int`, `string`, etc.). Python detects it automatically.

```python
x = 10      # integer
x = "Hello"  # now it is a string
```

:::tip
The flexibility of dynamic typing is powerful, but it can sometimes cause hard-to-detect errors. Later, you will learn best practices to avoid this.
:::

## How Does Python Work Internally?

### The Python Interpreter

The interpreter takes your `.py` code, converts it into bytecode, and that bytecode is executed by a virtual machine.

Process Summary:

- You write `program.py`.
- Python converts it into bytecode (`.pyc`).
- The bytecode is executed on the Python Virtual Machine (PVM).

:::note
Bytecode is an optimized version that allows your program to start faster the next time.
:::

## What is Python Used For?

Python is extremely versatile. Some practical uses:

### Automation

You can automate almost anything: renaming files, sending emails, reading documents, working with APIs...

### Web Development

Frameworks like Django or Flask allow you to create full web applications.

:::note
Django is "batteries included," while Flask is more minimalist. Later, you will be able to choose according to your needs.
:::

### Data Science and AI

It is the standard in data analysis: Pandas, NumPy, Matplotlib, TensorFlow, Scikit-Learn...

### Video Games

With libraries like Pygame, you can create 2D games.

## First Look at Python Code

```python run input="Daniel"
name = input('What is your name? ')
print('Hello', name)
```

```output
What is your name? Daniel
Hello Daniel
```

## Unit Conclusions

In this first topic, you learned what Python is, its most important features, and how its interpreter works. You also saw its most common applications and a first snippet of code.
