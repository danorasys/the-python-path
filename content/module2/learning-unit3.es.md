---
title: Bucles `while` y `for`
summary: En esta unidad aprenderás a repetir instrucciones usando `while` y `for`, lo que permite repetir tareas sin escribir el mismo código muchas veces. Así mismo, aprenderás a recorrer una secuencia de caracteres (`str`).
order: 3
---

En programación, muchas tareas requieren repetir acciones: mostrar mensajes varias veces, contar números, o procesar texto carácter por carácter. Los bucles permiten ejecutar un mismo bloque de código múltiples veces sin necesidad de escribirlo repetidamente. En Python, los dos bucles principales son `while` y `for`.

## ¿Qué es un Bucle?

Un bucle es una estructura de control que repite un conjunto de instrucciones mientras se cumpla una condición o mientras existan elementos por recorrer.

:::note[Nota:]
Sin bucles, los programas serían largos, repetitivos y difíciles de mantener.
:::

## Bucle `while`

### ¿Cómo Funciona?

El bucle `while` repite el código mientras una condición sea verdadera. Antes de cada repetición, Python evalúa la condición.

```python run
contador = 1
while contador <= 5:
	print(contador)
	contador = contador + 1
```

```output
1
2
3
4
5
```

:::tip[Tip:]
El `while` es ideal cuando no sabes cuántas veces se repetirá el bucle, pero sí sabes cuándo debe terminar.
:::

:::note[Nota:]
Si la condición nunca se vuelve falsa, el programa entrará en un bucle infinito.
:::

### Controlando el Bucle `while`

Normalmente se usa una variable de control que cambia en cada repetición.

```python run
x = 0
while x < 3:
	print("Hola")
	x += 1
```

```output
Hola
Hola
Hola
```

## Bucle `for`

### ¿Cómo funciona?

El bucle `for` se usa para recorrer una secuencia. En esta unidad, la secuencia principal será un string (`str`), ya que una cadena es una colección de caracteres ordenados.

```python run
for letra in "Python":
	print(letra)
```

```output
P
y
t
h
o
n
```

Esto significa que el bucle toma un carácter a la vez y lo asigna a la variable `letra`.

:::note[Nota:]
Aunque aún no se han visto listas, los strings ya permiten entender el concepto de "recorrer una secuencia".
:::

### ¿Qué Significa "recorrer una secuencia"?

Recorrer una secuencia significa acceder a cada elemento uno por uno, en orden. En el caso de los strings:

- Cada carácter es un elemento.
- Se recorren de izquierda a derecha.

:::tip[Tip:]
El `for` es ideal cuando ya sabes qué vas a recorrer, como un texto o un rango de números.
:::

### Uso de `range()` con `for`

`range()` permite generar una secuencia de números.

```python run
for i in range(5):
	print(i)
```

```output
0
1
2
3
4
```

:::note[Nota:]
`range(5)` genera los números del `0` al `4`.
:::

## Ejemplos Prácticos

### Ejemplo 1: Contar del 1 al 5 con `while`

```python run
n = 1
while n <= 5:
	print(n)
	n += 1
```

```output
1
2
3
4
5
```

### Ejemplo 2: Mostrar Cada Letra de una Palabra

```python run
for c in "Hola":
	print(c)
```

```output
H
o
l
a
```

### Ejemplo 3: Repetir un Mensaje Varias Veces

```python run
for i in range(3):
	print("Aprendiendo Python")
```

```output
Aprendiendo Python
Aprendiendo Python
Aprendiendo Python
```

## Ejercicios Para Practicar

### Ejercicio 1: Contador con `while`

Crea una variable llamada `contador` que empiece en 1.\
Usa un bucle `while` para mostrar los números del 1 al 10, uno por uno.

```python run="Practicar >>" hidden
# Crea una variable llamada contador que empiece en 1.
# Usa un bucle while para mostrar los números del 1 al
# 10, uno por uno
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
contador = 1
while contador <= 10:
	print(contador)
	contador += 1
```
:::

### Ejercicio 2: Cuenta Regresiva

Crea una variable llamada `n` con el valor 5.\
Usa un bucle `while` para mostrar una cuenta regresiva hasta llegar a 1.

```python run="Practicar >>" hidden
# Crea una variable llamada n con el valor 5.
# Usa un bucle while para mostrar una cuenta regresiva
# hasta llegar a 1
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
n = 5
while n >= 1:
	print(n)
	n -= 1
```
:::

### Ejercicio 3: Recorrer un Texto

Crea una variable llamada `palabra` con cualquier texto.\
Usa un bucle `for` para mostrar cada carácter de la palabra en una línea distinta.

```python run="Practicar >>" hidden
# Crea una variable llamada palabra con cualquier
# texto. Usa un bucle for para mostrar cada carácter de
# la palabra en una línea distinta
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
palabra = "Python"
for letra in palabra:
	print(letra)
```
:::

### Ejercicio 4: Contar Letras

Usa un bucle `for` para contar cuántas letras tiene la palabra `"programacion"`.\
Utiliza una variable contadora.

```python run="Practicar >>" hidden
# Usa un bucle for para contar cuántas letras tiene la
# palabra "programacion".
# Utiliza una variable contadora
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
contador = 0
for letra in "programacion":
	contador += 1

print(contador)
```
:::

### Ejercicio 5: Número Pares

Usa un bucle `for` y `range()` para mostrar los números pares del 0 al 10.

```python run="Practicar >>" hidden
# Usa un bucle for y range() para mostrar los números
# pares del 0 al 10
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
for i in range(0, 11, 2):
	print(i)
```
:::

## Conclusiones de la Unidad

En esta unidad aprendiste que:

- Los bucles permiten repetir instrucciones sin duplicar código.
- El bucle `while` repite acciones mientras una condición sea verdadera.
- El bucle `for` sirve para recorrer secuencias, como cadenas de texto.
- Un string es una secuencia de caracteres que puede recorrerse uno por uno.
- `range()` facilita la repetición controlada con números.
- Elegir el bucle correcto hace que el código sea más claro y eficiente.
