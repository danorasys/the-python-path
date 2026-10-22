---
title: Logical and Comparison Operators
summary: Here you will understand how operators such as `==`, `!=`, `<`, `>`, `<=`, `>=` work, and how to combine them with `and`, `or` and `not` to build more complex conditions. This will allow you to evaluate multiple situations at the same time and create more precise decisions within your conditional structures.
---

Comparison operators and logical operators are essential for making decisions in Python. They allow you to compare values, check conditions, and combine multiple evaluations within an `if` statement. With them, you can build more complete rules, such as checking whether an age is within a range, whether a password matches, or whether an action is valid only under certain conditions.

## Comparison Operators

These operators return `True` or `False`, depending on the condition.

| Operator | Meaning | Example |
| --- | --- | --- |
| `==` | Equal to | `5 == 5 → True` |
| `!=` | Not Equal to | `3 != 4 → True` |
| `<` | Less than | `2 < 10 → True` |
| `>` | Greater than | `10 > 3 → True` |
| `<=` | Less than or equal to | `5 <= 5 → True` |
| `>=` | Greater than or equal to | `8 >= 2 → True` |

## Practical Example

```python run
age = 20
if age >= 18:
    print("You are an adult")
```

```output
You are an adult
```

## Logical Operators

They allow you to combine conditions.

### `and`

All conditions must be true.

Example:

```python run
age = 24
if age >= 18 and age < 65:
    print("Adult")
```

```output
Adult
```

### `or`

At least one condition must be true.

Example:

```python run
color = "red"
if color == "red" or color =="blue":
    print("Allowed color")
```

```output
Allowed color
```

### `not`

Inverts the logical value: If it was `True` it becomes `False`, and if it was `False` it becomes `True`.

Example:

```python run
connected = False
if not connected:
    print("No connection")
```

```output
No connection
```

## Additional Examples

### Common Comparisonss

- Check string equality → `"hello" == "hello"`
- Check age for access → `age >= 18`
- Validate ranges → `0 <= number <= 100`
- Check if a variable does NOT have a value → `variable != 0`

### Useful Combinations

- Valid grade range → `grade >= 0 and grade <= 5`
- Authorized user by role → `role == "admin" or role == "editor"`
- Disabled action → `not available`

### Comparison of Multiple Values

```python run
temp = 25
if temp > 20 and temp < 30:
    print("Ideal temperature")
```

```output
Ideal temperature
```

## Tips

:::tip
When combining multiple conditions, think: "Do I want all of them to be true, or just one?"
:::

:::tip
Write clear and short conditions; avoid using too many within the same `if`.
:::

:::tip
Use not when you want to simplify long rules. For example:\
Instead of `if connected == False:`, use `if not connected:`.
:::

## Notes

:::note
Comparisons in Python use `==`, not `=`.
:::

:::note
You can chain comparisons like in mathematics: `18 <= age < 60`.
:::

:::note
Python evaluates conditions from left to right.
:::

## Combined Examples

### User Authentication

```python run
user = "python_learner"
password = "password123"

if user == "python_learner" and password == "password123":
    print("Access granted")
else:
    print("Authentication failed")
```

```output
Access granted
```

### Grade Verification

```python run
score = 75

if 60 <= score <= 100:
    print("Passed")
elif 0 <= score < 60:
    print("Failed")
else:
    print("Invalid score")
```

```output
Passed
```

### Connectivity

```python run
mode ="offline"
if not mode == "online":
    print("Offline mode active")
else:
    print("Connection successfully established")
```

```output
Offline mode active
```

## Exercises to Practice

### Exercise 1: Check if a Person Can Vote

Create a variable called `age` and assign it an integer value. The program must check whether the person is 18 years old or older. If the condition is met, display the message `Can vote`. Otherwise, display `Cannot vote`.

```python practice
# Create a variable called age and assign it an integer
# value. The program must check whether the person is
# 18 years old or older. If the condition is met,
# display the message "Can vote". Otherwise, display
# "Cannot vote"
```

:::details
```python run
age = 17

if age >= 18:
    print("Can vote")
else:
    print("Cannot vote")
```
:::

### Exercise 2: Number Within a Range

Create a variable called `number`. The program must check whether the value of `number` is between 1 and 10, including both limits. If the number is within the range, display `Valid number`. If it is not, display `Number out of range`.

```python practice
# Create a variable called number. The program must
# check whether the value of number is between 1 and
# 10, including both limits. If the number is within
# the range, display "Valid number". If it is not,
# display "Number out of range"
```

:::details
```python run
number = 7

if number >= 1 and number <= 10:
    print("Valid number")
else:
    print("Number out of range")
```
:::

### Exercise 3: Check Allowed Colors

Create a variable called `color`. The program must check whether the color is `blue` or `red`. If it matches one of those colors, display `Allowed color`. Otherwise, display `Color not allowed`.

```python practice
# Create a variable called color. The program must
# check whether the color is "blue" or "red". If it matches
# one of those colors, display "Allowed color".
# Otherwise, display "Color not allowed"
```

:::details
```python run
color = "blue"

if color == "blue" or color == "red":
    print("Allowed color")
else:
    print("Color not allowed")
```
:::

### Exercise 4: Attempt System

Create a variable called `attempts`. If the value of attempts is different from `0`, display `Attempts available`. If the value is `0`, display `Account locked`.

```python practice
# Create a variable called attempts. If the value of
# attempts is different from 0, display "Attempts
# available". If the value is 0, display "Account
# locked"
```

:::details
```python run
attempts = 0

if attempts != 0:
    print("Attempts available")
else:
    print("Account locked")
```
:::

### Exercise 5: Number Classification

Create a variable called `n`. The program must determine whether the number is:

- Positive (greater than 0).
- Negative (less than 0).
- or Zero (0).

Display a different message for each case.

```python practice
# Create a variable called n. The program must
# determine whether the number is:
# - Positive (greater than 0).
# - Negative (less than 0).
# - or Zero (0).
# Display a different message for each case
```

:::details
```python run
n = -3

if n > 0:
    print("The number is positive")
elif n < 0:
    print("The number is negative")
else:
    print("The number is zero")
```
:::

### Exercise 6: System Access

Create two variables:

- `age`.
- `has_access` (`True` or `False`).

The program should display `Access granted` only if the person is 18 years old or older and `has_access` is `True`. In any other case, it should display `Access denied`.

```python practice
# Create two variables:
# - age.
# - has_access (True or False).
# The program should display "Access granted" only if
# the person is 18 years old or older and has_access is
# True. In any other case, it should display "Access
# denied"
```

:::details
```python run
age = 20
has_access = True

if age >= 18 and has_access:
    print("Access granted")
else:
    print("Access denied")
```
:::

## Unit Conclusions

In this unit, you learned how to compare values and combine conditions using comparison operators and logical operators. Now you can build more precise rules within your programs, evaluate ranges, check multiple situations at the same time, and control the flow of decisions more accurately. Mastering these operators will allow you to write smarter and more adaptable code.
