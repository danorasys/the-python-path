# The Python Path

## Project Overview

The Python Path is a web-based resource focused on teaching the Python programming language, aimed at anyone interested in programming, technology, and computer science. It is a platform with a dynamic approach, where knowledge is delivered through a structured and guided Learning Plan, designed to make learning Python feel like a true adventure.

The Python Path integrates educational content, examples, tips, notes, and hands-on exercises, with the ability to run Python code directly in the web browser thanks to Pyodide, allowing users to practice comfortably within a complete and interactive learning environment.

Additionally, do you think you are capable of facing the challenge of the Python Serpent? Play and learn, earn points, and put your knowledge to the test while having fun.

Because learning is an adventure!

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

- **React 19 + TypeScript (strict)**, bundled with **Vite** and deployed to **GitHub Pages**.
- **Pyodide:** runs full Python (CPython compiled to WebAssembly) in the browser, so learners can practise without installing anything or using a server. Programs can read from the keyboard with `input()`.
- **Monaco Editor:** the code editor of the Training Area (the same editor as VS Code).
- **Design:** neobrutalism built on the colours of the Python logo, with self-hosted fonts (Bricolage Grotesque, Figtree, JetBrains Mono).

## Development

Requires Node.js 20.19 or newer.

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173/the-python-path/
npm test           # unit and component tests (Vitest)
npm run lint       # ESLint with type-aware rules
npm run build      # type-check and build the production site into dist/
npm run preview    # serve the production build locally
```

### Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: lint, tests, build, and publish to GitHub Pages.
In the repository, **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**.

The app uses hash routes (`#/learn/module1/learning-unit2`) because GitHub Pages cannot rewrite unknown paths to `index.html`. Links to the old static pages (`pages/roadmap.html#module1`, `pages/learning-unit.html#module1-learning-unit2`, …) redirect to the new routes.

### Project structure

```
public/data/              Course content (JSON): roadmap, modules, learning units, quiz questions
public/pages/             Redirects from the old static URLs
src/app/                  Router, root layout and route helpers
src/components/           Shared UI: buttons, windows, callouts, header, footer, boundaries
src/content/              Typed loading, validation and caching of the JSON content
src/features/home/        Landing page
src/features/roadmap/     Road map and module pages
src/features/learning/    Learning units and the content-block renderer
src/features/practice/    Training Area: Monaco editor + Pyodide runtime
src/features/snake/       Snake game: pure engine, canvas board, quiz dialog
src/i18n/                 Interface translations (es / en / de), typed so no key can be missing
src/styles/               Design tokens and base styles
```

### Editing content

Lessons live in `public/data/modules/<module>/learning-units/<unit>/<unit>-<lang>.json`.
When a translation is missing, the site falls back to English and then Spanish, and tells the reader.
Text fields accept a small set of inline tags (`<code>`, `<strong>`, `<em>`/`<i>`, `<br>`); anything else is shown as plain text, so content can never inject scripts.

The site uses icons instead of emojis. Notes and tips draw their own icon (a pin and a light bulb), and two inline icons are available for "bad / good" examples: `<icon-cross></icon-cross>` and `<icon-check></icon-check>`.
All icons live in `src/components/ui/Icon.tsx` and were drawn for this project (none comes from an icon library), so they can be used commercially or non-commercially without attribution.

## Learning Roadmap – The Python Path

- [Python Learning Roadmap](https://danorasys.github.io/the-python-path/#/roadmap)

  - [1. Fundamentals of the Language](https://danorasys.github.io/the-python-path/#/roadmap/module1)

    In this module, you will learn what Python is and how to create your first programs. You will learn how to display text, use variables, work with numbers and strings, perform basic operations, and interact with the user through data input.
    
    - [1.1. What is Python and How Does It Work?](https://danorasys.github.io/the-python-path/#/learn/module1/learning-unit1)

      Introduction to the language, its features, readable syntax, and its uses.

    - [1.2. Your First Program: print()](https://danorasys.github.io/the-python-path/#/learn/module1/learning-unit2)

      How to display text on the screen and understand the basic structure of a program.
    
    - [1.3. Comments and Basic Code Style](https://danorasys.github.io/the-python-path/#/learn/module1/learning-unit3)
      
      Using # to document code and keep it readable.

    - [1.4. Variables and Basic Data Types](https://danorasys.github.io/the-python-path/#/learn/module1/learning-unit4)
      
      What variables are, how to create them, and the most common types: int, float, str, bool.

    - [1.5. Mathematical and Text Operations](https://danorasys.github.io/the-python-path/#/learn/module1/learning-unit5)
      
      Using +, -, *, / operators, string concatenation, and repetition.

    - [1.6. Data Input With input()](https://danorasys.github.io/the-python-path/#/learn/module1/learning-unit6)

      How to receive information from the user and process it.
  
  - [2. Flow Control](https://danorasys.github.io/the-python-path/#/roadmap/module2)

    In this module, you will learn how to control the flow of your program. You will use conditionals to make decisions, loops to repeat actions, and logical operators to combine conditions. You will also learn how to break or continue loops according to your program’s logic.

    - [2.1. Conditionals: if, elif, else](https://danorasys.github.io/the-python-path/#/learn/module2/learning-unit1)

      In this unit, you will learn how to allow your program to make decisions using if, elif, and else, so that the code can execute different actions depending on which conditions are met. You will see how the flow behaves when a condition is true, what happens when none match, and how to chain multiple options together.
    
    - [2.2 Logical and Comparison Operators](https://danorasys.github.io/the-python-path/#/learn/module2/learning-unit2)

      Here you will understand how operators such as ==, !=, <, >, <=, >= work, and how to combine them with and, or and not to build more complex conditions. This will allow you to evaluate multiple situations at the same time and create more precise decisions within your conditional structures.
    
    - [2.3. while and for Loops](https://danorasys.github.io/the-python-path/#/learn/module2/learning-unit3)

      In this unit, you will learn how to repeat instructions using while and for, which allows you to perform tasks repeatedly without writing the same code many times. You will also learn how to iterate over a sequence of characters (str).
    
    - [2.4. Flow Control in Loops](https://danorasys.github.io/the-python-path/#/learn/module2/learning-unit4)

      Here you will discover how to modify the internal execution of a loop using special statements like break to stop it early, continue to skip a specific iteration, and pass to leave an empty block to be completed later. These tools allow you to have more precise and flexible control over the behavior of your loops.
  
  - [3. Data Structures](https://danorasys.github.io/the-python-path/#/roadmap/module3)

    In this module, you will learn to work with different types of collections in Python. You will understand how to use lists, tuples, dictionaries, and sets to store and organize information, as well as how to iterate over and manipulate their elements.

      - [3.1. Lists: Ordered Collections](https://danorasys.github.io/the-python-path/#/learn/module3/learning-unit1)

        Lists are data structures that allow storing multiple elements in a single variable while maintaining a specific order. In this unit, you will learn how to create lists using different data types, access their elements using positive and negative indices, modify existing values, add or remove elements, and iterate through the list using looping structures. Additionally, you will understand how lists can represent dynamic collections of information that can change during the execution of a program.

      - [3.2. Useful List Methods](https://danorasys.github.io/the-python-path/#/learn/module3/learning-unit2)

        In this unit, you will study Python’s built-in methods that facilitate list manipulation. You will learn to use functions such as append() to add elements, remove() to delete specific values, sort() to organize data, reverse() to invert the order, and count() to count occurrences within the list. Emphasis is placed on how these methods help write cleaner code, reduce manual operations, and improve the organization and processing of data collections.

      - [3.3. Tuples: Immutable Data](https://danorasys.github.io/the-python-path/#/learn/module3/learning-unit3)

        Tuples are structures similar to lists, but with the main characteristic of being immutable, meaning their elements cannot be modified after creation. In this unit, you will learn what tuples are, how they are defined, and how to access their values, as well as the scenarios in which it is appropriate to use them, especially when you want to protect constant data or represent fixed information. You will also explore the practical differences between lists and tuples in terms of security, performance, and usage in real-world programs.

      - [3.4. Dictionaries: Keys and Values](https://danorasys.github.io/the-python-path/#/learn/module3/learning-unit4)

        Dictionaries allow storing information using key-value pairs, making it easier to represent structured and related data. In this unit, you will learn how to create dictionaries, access values through their keys, modify existing information, add new elements, and iterate through the dictionary using loops. You will also explore how this structure is ideal for modeling real-world objects, such as users, products, or configurations, where each piece of data has a unique identifier.

      - [3.5. Sets](https://danorasys.github.io/the-python-path/#/learn/module3/learning-unit5)

        Sets are data structures that store unique elements without maintaining a specific order, automatically preventing duplicate values. In this unit, you will learn how to create sets, add and remove elements, and apply mathematical operations between sets such as union, intersection, and difference. Additionally, practical use cases will be explored where sets help simplify problems related to data comparison, duplicate filtering, and analyzing matches between collections.

      - [3.6. Iterating Through Data Structures](https://danorasys.github.io/the-python-path/#/learn/module3/learning-unit6)

        This unit focuses on the different ways to iterate through data structures using loops in Python. You will learn how to use simple and nested for loops, the len() function to obtain the size of collections, and the enumerate() function to access both the index and the value of elements simultaneously. The goal is to develop the ability to process information stored in lists, tuples, dictionaries, and sets in order to work with more complex data structures.        


