---
title: Qué es Python y Cómo Funciona
summary: Introducción al lenguaje, sus características, sintaxis legible y para qué se usa.
order: 1
---

## ¿Qué es Python?

Python es un lenguaje de programación de alto nivel, creado por Guido van Rossum y publicado en 1991. Su principal característica es su sintaxis clara y legible, lo que facilita aprenderlo incluso si nunca has programado antes.

Es un lenguaje multipropósito, lo que significa que se puede usar en una gran variedad de áreas:

- Desarrollo web.
- Inteligencia Artificial y Machine Learning.
- Análisis de datos.
- Automatización de tareas.
- Desarrollo de videojuegos.
- Scripting en servidores.
- Aplicaciones de escritorio.

:::note[Nota:]
Parte del éxito de Python viene de su enorme comunidad y su ecosistema de librerías. Por ejemplo, para IA tienes TensorFlow, para datos Pandas, para web Django, etc.
:::

## Características Principales de Python

### :check Sintaxis Sencilla

Python está diseñado para que el código sea fácil de leer, como si fuera casi inglés.

```python run
print('Hola, Mundo')
```

```output
Hola, Mundo
```

:::tip[Tip:]
Si una línea de Python "suena" a lo que estás intentando hacer, probablemente es la forma correcta de escribirlo.
:::

### :check Interpretado

Python no necesita compilarse antes de ejecutarse. El código se ejecuta línea por línea mediante el intérprete.\
\
Esto permite:

- Probar ideas rápidamente.
- Ejecutar código en entornos interactivos como Pyodide (en navegador) o en un terminal.
- Detectar errores línea por línea.

:::note[Nota:]
Como Python es interpretado, si hay un error en la línea 80, Python ejecutará las primeras 79 sin problema y solo fallará cuando llegue a la 80.
:::

### :check Multiplataforma

Python funciona en:

- Windows.
- macOS.
- Linux.
- Navegadores (gracias a Pyodide).
- Servidores.
- Microcontroladores (MicroPython).

### :check Tipado Dinámico

No necesitas indicar el tipo de variable (`int`, `string`, etc.). Python lo detecta automáticamente.

```python
x = 10     # entero
x = "Hola"  # ahora es una cadena
```

:::tip[Tip:]
La flexibilidad del tipado dinámico es poderosa, pero a veces causa errores difíciles de detectar. Más adelante aprenderás buenas prácticas para evitar esto.
:::

## ¿Cómo Funciona Python Internamente?

### El Intérprete de Python

El intérprete toma tu código `.py`, lo transforma en bytecode, y ese bytecode lo ejecuta una máquina virtual.

Resumen del proceso:

- Escribes `programa.py`.
- Python lo convierte en bytecode (`.pyc`).
- El bytecode se ejecuta en la Python Virtual Machine (PVM).

:::note[Nota:]
El bytecode es una versión optimizada que permite que tu programa arranque más rápido la próxima vez.
:::

## ¿Para Qué Se Usa Python?

Python es extremadamente versátil. Algunos usos prácticos:

### Automatización

Puedes automatizar casi cualquier cosa: renombrar archivos, enviar correos, leer documentos, trabajar con APIs...

### Desarrollo Web

Frameworks como Django o Flask permiten crear aplicaciones web completas.

:::note[Nota:]
Django es "baterías incluidas", Flask es más minimalista. Más adelante podrás elegir según tus necesidades.
:::

### Ciencia de Datos y IA

Es el estándar en análisis de datos: Pandas, NumPy, Matplotlib, TensorFlow, Scikit-Learn...

### Videojuegos

Con librerías como Pygame puedes crear juegos 2D.

## Primer Vistazo a Código Python

```python run
name = input('¿Cómo te llamas?')
print('Hola', name)
```

```output
¿Cómo te llamas? Daniel
Hola Daniel
```

## Conclusiones de la Unidad

En este primer tema aprendiste qué es Python, cuáles son sus características más importantes y cómo funciona su intérprete. También viste sus aplicaciones más comunes y un primer fragmento de código.
