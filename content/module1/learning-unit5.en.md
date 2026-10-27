---
title: Mathematical and Text Operations
summary: Using `+`, `-`, `*`, `/` operators, string concatenation, and repetition.
source: cc76c2dab688
---

In Python, we can perform operations with both numbers and text (strings). This learning unit will teach you how to use the most important operators for mathematical calculations and basic text manipulation.

## Basic Mathematical Operations

Python supports the most common numeric operators:

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `3 + 5` | `8` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `6 * 2` | `12` |
| `/` | Division | `9 / 2` | `4.5` |
| `//` | Integer division | `9 // 2` | `4` |
| `%` | Modulo (remainder) | `9 % 2` | `1` |
| `**` | Exponent | `2 ** 3` | `8` |

Code examples:

```python run
a = 10
b = 3

print(a + b)   # 13
print(a - b)    # 7
print(a * b)    # 30
print(a / b)    # 3.333...
print(a // b)    # 3 -> integer division
print(a % b)    # 1 -> remainder
print(a ** b)    # 1000 -> 10^3
```

```output
13
7
30
3.3333333333333335
3
1
1000
```

:::note
The division `/` always returns a `float` (decimal number). If you want a division without decimals, use `//`.
:::

## Text Operations (Strings)

Python allows string manipulation using special operators such as:

### Concatenation (Joining Text) → Operator `+`

```python run
subject1 = "Programming"
subject2 = "Mathematics"

text = subject1 + " " + subject2
print(text)    # Programming Mathematics
```

### Text Repetition → Operator `*`

```python run
print("Hello " * 3)
```

```output
Hello Hello Hello 
```

This is useful for creating separators or patterns.

### Combining Text and Numbers

You cannot directly add text to numbers.

This will give an error:

```python
print("Age: " + 25)    # ERROR
```

```python run="Test Error >>" hidden error
print("Age: " + 25)
```

Solution: convert the number to a string:

```python run
print("Age: " + str(25))
```

## Important Rules

- Numeric operations only work with numbers.
- Text operations only work with text.
- If you mix numbers and text → you must convert one to the type of the other.

Example:

```python run
number = 5
text = "5"

print(number + int(text))   # 10
print(str(number) + text)   # 55
```

## Combined Examples

Create a message using operations:

```python run
price = 120
tax = price * 0.19
total = price + tax

message = "The total is: " + str(total)
print(message)
```

```output
The total is: 142.8
```

## Best Practices

Use spaces when concatenating text (if necessary):

```python
"Hello" + "world"    # Helloworld
"Hello " + "world"    # Hello world
```

Convert types when mixing numbers and strings:

```python
str(), int(), float()
```

Use repetition for separators:

```python run
print("-" * 40)
```

```output
----------------------------------------
```

## Practice Exercises

### Exercise 1: Basic Calculator

Create three variables: `a`, `b`, `c`.

Assign numeric values and display:

- The sum of the three.
- The average.
- The result of `a * c`.

```python practice
# Create three variables: a, b, c.
# Assign numeric values and display:
# - The sum of the three
# - The average
# - The result of a * c
```

:::details
```python run
a = 10
b = 20
c = 5

sum_result = a + b + c
average = sum_result / 3
product = a * c

print("Sum:", sum_result)
print("Average:", average)
print("Product:", product)
```
:::

### Exercise 2: Text Concatenation

Join the following parts to form a single sentence (Display it on screen):

```python
part1 = "Python "
part2 = "is "
part3 = "awesome"
```

```python practice
# Join the following parts to form a single
# sentence (Display it on screen):
# part1 = "Python "
# part2 = "is "
# part3 = "awesome"
```

:::details
```python run
part1 = "Python "
part2 = "is "
part3 = "awesome"

sentence = part1 + part2 + part3
print(sentence)
```
:::

### Exercise 3: String Repetition

Create a variable that contains a symbol (e.g., "\*") and repeat it 20 times (Display it on screen).

```python practice
# Create a variable that contains a
# symbol (e.g., "*") and repeat it 20 times
# (Display it on screen)
```

:::details
```python run
symbol = "*"
print(symbol * 20)
```
:::

### Exercise 4: Convert Before Adding

You have a number stored as text:

```python
number = "40"
```

Convert the number to an integer and add 7. Finally, display the result on screen.

```python practice
# You have a number stored as text:
# number = "40"
# Convert the number to an integer and add 7.
# Finally, display the result on screen
```

:::details
```python run
number = "40"
number = int(number)
print(number + 7)
```
:::

### Exercise 5: Final Combined Message

Using the following variables:

```python
name = "Linus"
age = 55
```

Create a message like this:

```python
Linus is 55 years old
```

Finally, display the message on screen.

```python practice
# Using the following variables:
# name = "Linus"
# age = 55
# Create a message like: Linus is 55 years old
# Finally, display the message on screen
```

:::details
```python run
name = "Linus"
age = 55

message = name + " is " + str(age) + " years old"
print(message)
```
:::

## Unit Conclusions

In this unit you learned:

- That Python can perform basic mathematical operations with `+`, `-`, `*`, `/`, `%`, `//`, and `**`.
- That text strings can be joined using `+` and repeated using `*`.
- That string operations follow their own rules (for example, adding texts = concatenation).
- That it is important to understand data types to avoid errors and write clearer code.
