---
title: Flow Control in Loops
summary: Here you will discover how to modify the internal execution of a loop using special statements like `break` to stop it early, `continue` to skip a specific iteration, and `pass` to leave an empty block to be completed later. These tools allow you to have more precise and flexible control over the behavior of your loops.
---

In the previous unit, you learned how to use `while` and `for` to repeat instructions. Now you will learn how to modify the internal behavior of a loop while it is running.

Python offers three special statements:

- `break`
- `continue`
- `pass`

These allow you to have more precise control over how and when repetitions are executed.

## `break` — Stop the Loop

The `break` statement is used to immediately terminate a loop, regardless of whether the condition is still true.

When Python encounters a `break`, it exits the loop and continues with the code that comes after the loop.

### Example with `while`

```python
counter = 1

while counter <= 10:
	if counter == 5:
		break
	print(counter)
	counter += 1
```

```output
1
2
3
4
```

In this case, the loop stops when the counter reaches 5.

```python run hidden
counter = 1

while counter <= 10:
	if counter == 5:
		break
	print(counter)
	counter += 1
```

### Example with `for`

```python
for letter in "Python":
	if letter == "h":
		break
	print(letter)
```

```output
P
y
t
```

The loop is interrupted when it finds the letter `"h"`.

```python run hidden
for letter in "Python":
	if letter == "h":
		break
	print(letter)
```

:::note[Note:]
`break` completely stops the loop, not just a single iteration.
:::

:::tip[Tip:]
Use `break` when you find what you are looking for and don’t need to continue iterating.
:::

## `continue` — Skip an Iteration

The `continue` statement does not stop the loop; instead, it skips the rest of the code in the current iteration and moves directly to the next iteration.

Example:

```python
for number in range(1, 6):
	if number == 3:
		continue
	print(number)
```

```output
1
2
4
5
```

Here, the number 3 is not printed, but the loop continues with the remaining numbers.

```python run hidden
for number in range(1, 6):
	if number == 3:
		continue
	print(number)
```

:::note[Note:]
`continue` does not end the loop; it only skips a specific iteration.
:::

:::tip[Tip:]
Use it when you want to skip certain cases within the loop without stopping it completely.
:::

## `pass` — Empty Statement

The `pass` statement does nothing. It is used when you need the structure to be complete but don’t want to implement any logic yet.

Example:

```python run
for i in range(5):
	pass
```

```output
```

It is also often used with conditional statements:

```python run
if True:
	pass
```

```output
```

:::note[Note:]
`pass` prevents syntax errors when a block is empty.
:::

:::tip[Tip:]
It is useful when you are planning your program and haven’t decided yet what code will go there.
:::

## Comparison of the Three Statements

| Instrucción | Stops the Loop? | Skips an Iteration? | Does Something Visible? |
| --- | --- | --- | --- |
| `break` | Yes | No | Yes |
| `continue` | No | Yes | Yes |
| `pass` | No | No | No |

## Combined Examples

### Example 1: Searching for a Specific Letter

```python run
for letter in "Programming":
	if letter == "g":
		print("Letter found")
		break
```

```output
Letter found
```

### Example 2: Display Only Odd Numbers

```python run
for number in range(1, 10):
	if number % 2 == 0:
		continue
	print(number)
```

```output
1
3
5
7
9
```

## Practice Exercises

### Exercise 1: Stop When a Number Is Found

Create bucle `for` loop that goes through the numbers from 1 to 10.\
When the number is 7, the program should completely stop the loop using `break`.\
Print each number before the loop stops.

```python run="Practice >>" hidden
# Create bucle for loop that goes through the numbers
# from 1 to 10.
# When the number is 7, the program should completely
# stop the loop using break.
# Print each number before the loop stops
```

:::details[View possible solution]
```python run="Try Solution >>"
for number in range(1, 11):
	if number == 7:
		break
	print(number)
```
:::

### Exercise 2: Skip a Specific Letter

Create a variable called `word` with the value `"computer"`.\
Use a `for` loop to display each letter, except the letter `"o"`.\
Use `continue`.

```python run="Practice >>" hidden
# Create a variable called word with the value
# "computer".
# Use a for loop to display each letter, except the
# letter "o".
# Use continue
```

:::details[View possible solution]
```python run="Try Solution >>"
word = "computer"

for letter in word:
	if letter == "o":
		continue
	print(letter)
```
:::

### Exercise 3: Detect Negative Number

Create a simulated list using `range()` from -3 to 3.\
Loop through the values using a `for` loop.\
If you find a negative number, print `"Negative number detected"` and stop the loop using `break`.

```python run="Practice >>" hidden
# Create a simulated list using range() from -3 to 3.
# Loop through the values using a for loop.
# If you find a negative number, print "Negative number
# detected" and stop the loop using break
```

:::details[View possible solution]
```python run="Try Solution >>"
for number in range(-3, 4):
	if number < 0:
		print("Negative number detected")
		break
```
:::

### Exercise 4: Incomplete Structure With `pass`

Create `for` loop that iterates through the numbers from 1 to 5.\
Inside the loop, add an `if` condition that checks whether the number is greater than 3.\
For now, do not perform any action inside that condition; use `pass`.

```python run="Practice >>" hidden
# Create for loop that iterates through the numbers
# from 1 to 5.
# Inside the loop, add an if condition that checks
# whether the number is greater than 3.
# For now, do not perform any action inside that
# condition; use pass
```

:::details[View possible solution]
```python run="Try Solution >>"
for number in range(1, 6):
	if number > 3:
		pass
	print(number)
```
:::

## Unit Conclusions

In this unit, you learned that:

- `break` allows you to stop a loop immediately.
- `continue` skips a specific iteration without ending the loop.
- `pass` acts as an empty statement to keep structures syntactically valid.
- These tools provide greater control and flexibility within loops.
- Knowing when to use each one improves the clarity and efficiency of your program.
