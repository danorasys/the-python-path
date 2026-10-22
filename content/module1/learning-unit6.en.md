---
title: Data Input With `input()`
summary: How to receive information from the user and process it.
source: c67a5035db05
---

The `input()` function allows your program to receive information typed by the user. It is one of the first steps toward creating truly interactive programs.

## What is `input()`?

`input()` is a function that:

- Displays a message (if you provide one).
- Waits for the user to type something.
- Returns what was typed as a text string (`str`).

Example:

```python run input="Linus"
name = input("Enter your name: ")
print("Hello,", name)
```

```output
Enter your name: Linus
Hello, Linus
```

:::note
Everything that `input()` returns is text, even if the user types a number.
:::

## Converting What the User Enters

If you need to work with numbers, you must convert the text that comes from `input()`.

Use:

| Conversion | Used to |
| --- | --- |
| `int()` | Convert to an integer |
| `float` | Convert to a decimal number |
| `str()` | Convert to text |

Example:

```python run input="55"
age = input("How old are you? ")
age = int(age)    # necessary conversion
print("Next year you will be", age + 1)
```

```output
How old are you? 55
Next year you will be 56
```

:::tip
If you don’t convert it, a number cannot be added mathematically, only as text.
:::

Common error example:

```python
"5" + 1    # ERROR: you cannot mix str and int
```

## Processing Entered Data

After receiving information, you can use it for calculations, making decisions, or displaying personalized messages.

```python run input="7"
number = int(input("Enter a number: "))
double = number * 2
print("The double is:", double)
```

```output
Enter a number: 7
The double is: 14
```

## Common Errors with `input()`

### 1\. Forgetting That It Returns Text

```python
n = input("Number: ")
print(n + 10)    # ERROR
```

```python run="Test Error >>" hidden error input="5"
n = input("Number: ")
print(n + 10)
```

### 2\. Attempt to Convert Invalid Text

```python run="Test Error >>" error input="hello"
text = input("Input: ") # Input: hello
int(text)    # ERROR
```

:::note
Later, you will learn to handle these errors with `try` and `except`.
:::

## Useful Examples

### Example 1: Personalized Greeting

```python run input="Python"
name = input("What is your name? ")
print("Nice to meet you,", name)
```

```output
What is your name? Python
Nice to meet you, Python
```

### Example 2: Interactive Addition

```python run input="7|3"
a = int(input("Enter a number: "))
b = int(input("Enter another number: "))
print("The sum is:", a + b)
```

```output
Enter a number: 7
Enter another number: 3
The sum is: 10
```

### Example 3: Repeating Text

```python run input="Python"
word = input("Enter a word: ")
print(word * 3)
```

```output
Enter a word: Python
PythonPythonPython
```

:::tip
When you repeat a string, spaces are not added automatically.
:::

## Exercises to Practice

### Exercise 1: Simple Greeting

Ask the user for their name and show them a greeting.

```python practice
# Ask the user for their name and show
# them a greeting
```

:::details
```python run input="Ana"
name = input("Enter your name: ")
print("Hello", name)
```
:::

### Exercise 2: Age in the Future

Ask the user for their age and tell them how old they will be in 5 years.

```python practice
# Ask the user for their age and tell them
# how old they will be in 5 years
```

:::details
```python run input="25"
age = int(input("How old are you? "))
print("In 5 years you will be", age + 5)
```
:::

### Exercise 3: Word Multiplier

Ask the user for a word and a number. Display the word repeated that number of times.

```python practice
# Ask the user for a word and a number. Display
# the word repeated that number of times
```

:::details
```python run input="Python|3"
word = input("Enter a word: ")
amount = int(input("How many times do you want to repeat it? "))
print(word * amount)
```
:::

### Exercise 4: Temperature Conversion

Ask the user for a temperature in Celsius and convert it to Fahrenheit (show it to the user).

```python practice
# Ask the user for a temperature in Celsius and
# convert it to Fahrenheit (show it to the user)
```

:::details
```python run input="25"
c = float(input("Temperature in Celsius: "))
f = (c * 9 / 5) + 32
print("Equivalent to", f, "°F")
```
:::

## Unit Conclusions

In this unit you learned:

- How to use `input()` to receive text from the keyboard.
- That everything returned by `input()` is a string (`str`).
- How to convert those texts into numbers using `int()` and `float()`.
- How to process the entered information to perform calculations or personalize messages.
- How to avoid common mistakes, such as mixing text and numbers.
