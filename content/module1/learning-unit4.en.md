---
title: Variables and Basic Data Types
summary: "What variables are, how to create them, and the most common types: `int`, `float`, `str`, `bool`."
source: 632783c2c492
---

## What Is a Variable?

A variable is a name used to store a value in memory. You can think of a variable as a labeled box where you decide what to put inside.

For example:

```python
name = "Python"
age = 33
```

Here:

- The "label" is `name` or `age`.
- The content is `"Python"` and `33`.

:::note
The `=` sign in Python does not mean "mathematically equal", but "assign a value". In other words: "store this value in this variable".
:::

## Python and Dynamic Typing

Python determines the variable type automatically based on the value you assign to it.

```python
x = 10       # int (integer)
x = "Hello"   # str (string)
```

:::tip
You can change the type at any time, but avoid doing so. Keeping a consistent type makes your code clearer.
:::

## Rules For Naming Variables

Python allows many valid names, but you must follow these rules:

- You can only use letters, numbers and underscores.
- It cannot start with a number.
- Do not use spaces.
- Avoid reserved words (`for`, `if`, `print`, etc.).

Valid examples:

```python
user_name = "Ana"
age2 = 30
_total = 99
```

Invalid examples:

```python
2age = 10
my variable = "text"
for = 5
```

:::note
Use descriptive names. Your code will be easier to read without needing comments.
:::

## Basic Data Types in Python

Let’s look at the most common types to start with:

### 1\. Integers - `int`

Numbers without decimals.

```python
age = 20
year = 2025
```

### 2\. Floats - `float`

Numbers with decimals.

```python
price = 19.99
temperature = 36.5
```

:::tip
Floats can behave strangely because of how they are represented internally:
:::

```python
print(0.1 + 0.2)
# 0.30000000000000004
```

But don’t worry, you’ll learn more about this later.

### 3\. Strings - `str`

Any text inside single or double quotes.

```python
name = "Python"
message = 'Hello world'
```

You can use triple quotes for long text:

```python
long_text = """This is a text
that spans multiple lines"""
```

### 4\. Booleans - `bool`

Represent true or false:

```python
active = True
logged_in = False
```

They are used very often in conditionals.

:::note
In Python, `True` and `False` start with uppercase letters.
:::

## Check The Type Of a Variable

You can use the `type()` function to check the datatype:

```python
x = 10
print(type(x))   # <class 'int'>
```

```python run hidden
x = 10
print(type(x))
```

This is very useful when you are learning.

## Operations By Data Type

Each type has specific operations:

### Integers and Floats

```python
a = 10
b = 2.5
result = a + b   # 12.5
```

### Strings

Concatenation:

```python run
greeting = "Hello" + " " + "World"
print(greeting)
```

```output
Hello World
```

Repetition:

```python
print("Hello" * 3)
# HelloHelloHello
```

```python run hidden
print("Hello" * 3)
```

### Booleans

```python run
true_val = True
false_val = False
print(true_val and false_val)  # False
```

## Type Conversion (Casting)

Python allows converting values manually:

```python
age = "20"
age = int(age)
print(type(age))    # <class 'int'>
```

```python run hidden
age = "20"
age = int(age)
print(type(age))
```

Or from number to text:

```python
x = 10
text = str(x)
print(type(text))    # <class 'str'>
```

```python run hidden
x = 10
text = str(x)
print(type(text))
```

:::tip
`input()` always returns a string, so sometimes you will need to convert it to `int` or `float`.
:::

## Complete Examples

### Example 1: User Information

```python run
name = "Python"
age = 33
height = 1.74
is_adult = True

print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Adult:", is_adult)
```

```output
Name: Python
Age: 33
Height: 1.74
Adult: True
```

### Example 2: Type Conversion

```python run
number = "15"
number = int(number)
print("Sum:", number + 5)
```

```output
Sum: 20
```

## Common Errors

:cross Error when converting non-numeric text:

```python
int("hello")
# ValueError
```

```python run="Test Error >>" hidden error
int("hello")
```

:cross Mixing incompatible types:

```python
print("Age: " + 20)
# TypeError
```

```python run="Test Error >>" hidden error
print("Age: " + 20)
```

Solution:

```python run
print("Age:", 20)
# or
print("Age: " + str(20))
```

```output
Age: 20
Age: 20
```

:::note
This type of error is very common when starting out. Don’t worry, you will learn to avoid them with practice.
:::

## Practice Exercises

### Exercise 1: Create Basic Variables

Create variables to store:

- Your name.
- Your age.
- Your city.
- Whether you are an adult (True/False).
- Your height (float).

Then print them using `print()`.

```python practice
# Exercise 1: Create basic variables
# Create variables to store:
# - Your name
# - Your age
# - Your city
# - Whether you are an adult (True/False)
# - Your height (float)
# Then print them using print()
```

:::details
```python run
name = "YOUR NAME"
age = 22
city = "YOUR CITY"
is_adult = True
height = 1.85

print(name, age, city, is_adult, height)
```
:::

### Exercise 2: Addition With Conversion

A variable contains a number stored as text (`"25"`). Convert that value to an integer and add 10. Then show the result.

```python practice
# A variable contains a number stored as text ("25").
# Convert that value to an integer and add 10.
# Then show the result
```

:::details
```python run
number = "25"      # number comes as text
number = int(number)   # convert to integer
print(number + 10)
```
:::

### Exercise 3: Mixed Types

Create three variables:

```python
a = 10
b = 3.5
c = "Python"
```

Print:

- The sum of `a` and `b`.
- The concatenation "I like " + `c`.
- The type of each variable using `type()`.

```python practice
# a = 10
# b = 3.5
# c = "Python"
# Print:
# 1. The sum of a and b
# 2. The concatenation "I like " + c
# 3. The type of each variable using type()
```

:::details
```python run
a = 10
b = 3.5
c = "Python"

print(a + b)
print("I like " + c)
print(type(a), type(b), type(c))
```
:::

### Exercise 4: Build a Message

Create variables:

```python
name = "Camilo"
age = 30
```

And show a message like:

```python
Hello Camilo, you are 30 years old.
```

Use concatenation or commas.

```python practice
# Create variables:
# name = "Camilo"
# age = 30
# Show a message like:
# Hello Camilo, you are 30 years old.
# Use concatenation or commas
```

:::details
```python run
name = "Camilo"
age = 30

print("Hello " + name + ", you are " + str(age) + " years old.")
# or using commas
print("Hello", name + ", you are", age, "years old.")
```
:::

## Unit Conclusions

In this topic you learned:

- What a variable is.
- How it is created and assigned.
- The most common and basic data types: `int`, `float`, `str`, `bool`.
- How to convert types.
- Typical errors when working with values.
- Good practices for naming variables.

These fundamentals will be essential for everything you build later.
