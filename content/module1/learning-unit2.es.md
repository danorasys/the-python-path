---
title: "Tu Primer Programa: `print()`"
summary: Cómo mostrar texto en pantalla y entender la estructura mínima de un programa.
order: 2
---

## ¿Qué es un Programa en Python?

Un programa en Python es simplemente un archivo de texto que contiene instrucciones que el intérprete ejecutará línea por línea. La estructura mínima de un programa puede ser algo tan simple como una línea que muestre un mensaje en pantalla.

:::note[Nota:]
En Python, cada línea se ejecuta en orden, de arriba hacia abajo. No necesitas una función principal obligatoria como en otros lenguajes.
:::

## La Función `print()`: Tu Primera Herramienta

La función `print()` sirve para mostrar información en pantalla. Es el punto de partida clásico en cualquier lenguaje de programación.

Ejemplo básico:

```python
print("Hola, Mundo")
```

Al ejecutar este programa, Python mostrará:

```python
Hola, Mundo
```

```python run hidden
print("Hola, Mundo")
```

:::tip[Tip:]
Todo lo que quieras mostrar debe ir dentro de los paréntesis de `print()`. Si es texto, debe estar entre comillas.
:::

## ¿Qué Puedo Mostrar Con `print()`?

### Texto (Cadenas - `str`)

```python
print("Aprender Python es divertido")
```

### Números

```python
print(2025)
```

### Variables

```python
name = "Python"
print(name)
```

```python run="Probar Todos >>" hidden
print("Aprender Python es divertido")

print(2025)

name = "Python"
print(name)
```

```output label="Salida esperada:"
Aprender Python es divertido
2025
Python
```

:::note[Nota:]
A diferencia de muchos lenguajes, Python no necesita que declares el tipo de variable; basta con asignarla.
:::

## Mostrar Varios Valores a la Vez

Python permite imprimir varios elementos separados por comas:

```python run
print("Tu edad es:", 22)
```

```output
Tu edad es: 22
```

:::note[Nota:]
Cuando usas comas dentro de `print()`, Python agrega un espacio automáticamente entre cada elemento.
:::

## Cómo Funciona `print()` Internamente

Aunque `print()` parece simple, tiene varios parámetros útiles:

```python
print(objetos, sep=" ", end="\n")
```

- `sep` → Define el separador entre elementos.
- `end` → Define lo que se imprime al final de la línea.

### Ejemplo Usando `sep`:

```python run
print("Python", "JavaScript", "Go", sep=" | ")
```

```output
Python | JavaScript | Go
```

### Ejemplo Usando `end`:

```python run
print("Hola", end="...")
print("Mundo")
```

```output
Hola...Mundo
```

:::note[Nota:]
Por defecto, `end` usa `\n`, es decir, un salto de línea. Por eso cada `print()` aparece en una línea nueva.
:::

## Espacios, Saltos de Línea y Caracteres Especiales

Puedes controlar el formato del texto usando secuencias especiales:

- `\n` → Salto de línea.
- `\t` → Tabulación.
- `\"` → Comillas dentro de comillas.
- `\\` → Barra invertida literal.

Ejemplo:

```python run
print("Línea 1\nLínea 2\nLínea 3")
```

```output
Línea 1
Línea 2
Línea 3
```

:::tip[Nota:]
Las secuencias de escape te permiten controlar exactamente cómo se ve el texto que imprimes. Son muy útiles para mostrar menús o resultados con formato.
:::

## Un Error Muy Común Al Usar `print()`

Si olvidas cerrar las comillas:

```python
print("Hola)
```

Python mostrará un error de sintaxis.

```python run="Probar Error >>" hidden
print("Hola)
```

## Estructura Mínima de un Programa en Python

```python
print("Hola desde mi primer programa en Python")
```

Esto ya es un programa completo, válido y funcional.

```output
Hola desde mi primer programa en Python
```

```python run hidden
print("Hola desde mi primer programa en Python")
```

:::tip[Tip]
Piensa en un programa como una lista de instrucciones. Si tienes dos líneas:
:::

```python
print("Primera línea")
print("Segunda línea")
```

Python siempre las ejecutará en ese orden.

```output
Primera línea
Segunda línea
```

```python run hidden
print("Primera línea")
print("Segunda línea")
```

## Ejercicio Guiado: Tu Primer Script Real

Vamos a mostrar un mensaje más personalizado.

```python
nombre = "TU NOMBRE"
print("¡Bienvenido,", nombre, "al mundo de Python!")
```

```output
¡Bienvenido, TU NOMBRE al mundo de Python!
```

:::note[Nota]
Puedes reemplazar `"TU NOMBRE"` por tu propio nombre.
:::

```python run hidden
nombre = "TU NOMBRE"
print("¡Bienvenido,", nombre, "al mundo de Python!")
```

## Conclusiones de la Unidad

En este tema aprendiste:

- Qué es un programa en Python.
- Cómo funciona `print()`.
- Cómo usar `sep` y `end`.
- Cómo controlar saltos de línea y tabulaciones.
- Cómo escribir un programa mínimo válido.

`print()` es la herramienta que usarás constantemente para ver resultados, depurar ideas y comunicarse con el usuario.
