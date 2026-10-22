---
title: Comentarios y Estilo Básico de Código
summary: Usar `#` para documentar el código y mantenerlo legible.
order: 3
---

## ¿Qué es un Comentario en Python?

Un comentario es una parte del código que no se ejecuta. Sirve para explicar lo que hace un bloque de instrucciones, aclarar la lógica detrás de un cálculo o dejar recordatorios.

En Python, los comentarios se escriben usando el símbolo `#`:

```python
# así se escribe un comentario
```

Todo lo que vaya después de `#` en esa línea será ignorado por Python.

:::note
Los comentarios son para humanos, no para el intérprete. Le dan claridad al código y ayudan a recordar lo que intentabas hacer cuando lo vuelves a leer tiempo después.
:::

## Comentarios de Una Sola Línea

Este es el tipo más común. Se colocan encima de una línea de código o a la derecha de ella.

Ejemplo:

```python run
# Este programa muestra un saludo
print("Hola")  # Muestra texto en pantalla
```

```output
Hola
```

:::tip
Evita escribir comentarios obvios como:\
`x = x + 1 # le sumo 1 a x`
:::

Los buenos comentarios explican el por qué, no el qué.

## Comentarios de Varias Líneas (Texto Explicativo)

Python no tiene un símbolo especial para comentarios multilínea como otros lenguajes, pero puedes usar comillas triples `""" """` para escribir texto largo que no será ejecutado si no está asignado a una variable.

Se usa normalmente al inicio del archivo o al comienzo de funciones.

Ejemplo:

```python
"""
Este programa calcula el área de un círculo.
El usuario ingresa el radio y se muestra el resultado.
"""
```

:::note
Técnicamente, esto es un string literal sin usar, pero Python lo ignora, así que funciona como comentario.
:::

## ¿Para Qué Sirven Los Comentarios Realmente?

Los comentarios no son decoración. Son útiles cuando:

- Explican la intención detrás de una solución.
- Aclaran partes complicadas del código.
- Documentan decisiones importantes.
- Ayudan a quien lee el código (incluyéndote a ti).

:::tip
Si tienes que explicar demasiado, quizá el código es demasiado complejo. A veces lo mejor es simplificar el código, no escribir más comentarios.
:::

## Estilo Básico de Código: Escribir Código Limpio

Python es famoso por promover un estilo claro y legible. Aquí tienes algunas reglas esenciales:

### 1\. Usa Nombres Descriptivos Para Variables

:cross Malo:

```python
x = 10
y = 20
```

:check Bueno:

```python
edad = 10
anios_experiencia = 20
```

:::note
Un buen nombre evita que necesites comentarios innecesarios.
:::

### 2\. Espacios Alrededor de Operadores

Esto mejora mucho la legibilidad.

:cross Sin espacios:

```python
suma=10+5
```

:check Con espacios:

```python
suma = 10 + 5
```

### 3\. Una Idea por Línea

:cross Difícil de leer:

```python
a = 10; b = 20; print(a+b)
```

:check Claro y simple:

```python run
a = 10
b = 20
print(a + b)
```

```output
30
```

### 4\. Mantén Las Líneas Cortas

La recomendación general es no superar 79 caracteres por línea (PEP 8).

:::tip
Si necesitas escribir algo largo, divídelo en varias partes usando `\` o concatenación.
:::

## Comentarios Dentro del Código Real

Veamos un ejemplo más realista de cómo usar comentarios para aclarar una idea:

```python run
# Calculamos el precio final con descuento
precio = 100
descuento = 0.15

# Aplicamos el descuento
precio_final = precio - (precio * descuento)

print("Precio final:", precio_final)
```

```output
Precio final: 85.0
```

Aquí los comentarios explican el propósito, no la operación matemática.

## ¿Cuándo NO Debes Comentar?

:::tip
Usa esta regla de oro:\
**"Comenta cuando el lector pueda confundirse; no comentes cosas obvias".**
:::

:cross Comentario innecesario:

```python
print("Hola")  # imprime Hola
```

:cross Comentarios que duplican el código:

```python
x = 5   # x ahora vale 5
```

## Ejercicio Guiado

Añade comentarios útiles a este fragmento de código:

```python run="Practicar >>"
nombre = "Juan"
edad= 22
anio_actual = 2025

print("Tu nombre es:", nombre)
print("Tu edad será en 5 años:", edad + 5)
```

:::details
```python
# Datos del usuaio
nombre = "Juan"
edad = 22
anio_actual = 2025

# Mostrar información
print("Tu nombre es:", nombre)

#Calculamos la edad futura (edad actual + 5)
print("Tu edad será en 5 años:", edad + 5)
```
:::

## Conclusiones de la Unidad

En esta tema aprendiste:

- Cómo se escriben comentarios con `#`.
- Cómo crear comentarios explicativos con comillas triples.
- Buenas prácticas de estilo y legibilidad.
- Qué hace que un comentario sea útil.
- Cómo escribir código más claro y estructurado.

Los comentarios serán tus aliados mientras avanzas hacia programas más complejos.
