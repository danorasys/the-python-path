---
title: Título de la Unidad
summary: Una frase con lo que se aprende. Aparece en la tarjeta de la unidad dentro del módulo.
order: 1
---

La unidad empieza con una o dos frases que expliquen qué se aprende en ella y por qué es útil.

## Primer Concepto

La idea se explica con frases cortas. Dentro del texto se puede usar **negrita**, _cursiva_ y `código`.

- Un punto clave.
- Otro punto clave.

```python run
nombre = "Daniel"
print("Hola,", nombre)
```

```output
Hola, Daniel
```

:::note
Una aclaración importante sobre el ejemplo.
:::

:::tip
Un consejo práctico para recordar la idea.
:::

### Datos Que Escribe el Usuario

Cuando el ejemplo usa `input()`, en `input` se escriben las respuestas que se usan para comprobar la salida, separadas por `|`.

```python run input="Daniel|36"
nombre = input("¿Cómo te llamas? ")
edad = int(input("¿Cuántos años tienes? "))
print(nombre, "tendrá", edad + 1, "el año que viene")
```

```output
¿Cómo te llamas? Daniel
¿Cuántos años tienes? 36
Daniel tendrá 37 el año que viene
```

### Errores Intencionados

Se muestra el código que falla y se añade un botón para ver el error al ejecutarlo:

```python
print("Edad: " + 25)
```

```python run="Probar Error >>" hidden error
print("Edad: " + 25)
```

### Resultados Que Cambian en Cada Ejecución

```python run
import random

print(random.randint(1, 6))
```

```output label="Por ejemplo:" static
4
```

#### Comparación

:::table[Formas de mostrar texto]
| Forma | Ejemplo | Resultado |
| --- | --- | --- |
| Una cadena | `print("Hola")` | `Hola` |
| Varias cadenas | `print("Hola", "Daniel")` | `Hola Daniel` |
:::

:check Correcto: nombres de variables descriptivos, como `edad`.

:cross Incorrecto: nombres sin significado, como `x1`.

---

## Ejercicios Para Practicar

### Ejercicio 1: Saludo Personalizado

Crea una variable con tu nombre y muestra un saludo que lo incluya.

```python practice
# Crea una variable con tu nombre.
# Muestra un saludo que lo incluya.
```

:::details
```python run
nombre = "Daniel"
print("Hola,", nombre)
```
:::
