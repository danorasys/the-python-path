---
title: Operaciones Matemáticas y Con Texto
summary: Uso de operadores `+`, `-`, `*`, `/`, concatenación y repetición de cadenas.
order: 5
---

En Python podemos realizar operaciones tanto con números como con textos (cadenas). Esta unidad de aprendizaje te enseñará a usar los operadores más importantes para cálculos matemáticos y manipulación básica de texto.

## Operaciones Matemáticas Básicas

Python soporta los operadores numéricos más comunes:

| Operador | Significado | Ejemplo | Resultado |
| --- | --- | --- | --- |
| `+` | Suma | `3 + 5` | `8` |
| `-` | Resta | `10 - 4` | `6` |
| `*` | Multiplicación | `6 * 2` | `12` |
| `/` | División | `9 / 2` | `4.5` |
| `//` | División entera | `9 // 2` | `4` |
| `%` | Módulo (resto) | `9 % 2` | `1` |
| `**` | Exponente | `2 ** 3` | `8` |

Ejemplos de código:

```python run
a = 10
b = 3

print(a + b)   # 13
print(a - b)    # 7
print(a * b)    # 30
print(a / b)    # 3.333...
print(a // b)    # 3 -> división entera
print(a % b)    # 1 -> residuo
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
La división `/` siempre devuelve un `float` (número decimal). Si quieres una división sin decimales, usa `//`.
:::

## Operaciones Con Texto (Strings)

Python permite manipular cadenas usando operadores especiales como:

### Concatenación (Unir Texto) → Operador `+`

```python run
asignatura1 = "Programación"
asignatura2 = "Matemáticas"

texto = asignatura1 + " " + asignatura2
print(texto)    # Programación Matemáticas
```

### Repetición de Texto → Operador `*`

```python run
print("Hola " * 3)
```

```output
Hola Hola Hola 
```

Esto es útil para generar separadores o patrones.

### Combinando Texto y Números

No puedes sumar texto con números directamente.

Esto dará error:

```python
print("Edad: " + 25)    # ERROR
```

```python run="Probar Error >>" hidden error
print("Edad: " + 25)
```

Solución: convertir el número a string:

```python
print("Edad: " + str(25))
```

```python run hidden
print("Edad " + str(25))
```

## Reglas Importantes

- Las operaciones numéricas solo funcionan con números.
- Las operaciones de texto solo funcionan con texto.
- Si mezclas números y texto → debes convertir uno al tipo del otro.

Ejemplo:

```python run
numero = 5
texto = "5"

print(numero + int(texto))   # 10
print(str(numero) + texto)   # 55
```

## Ejemplos Combinados

Crear un mensaje con operaciones:

```python run
precio = 120
impuesto = precio * 0.19
total = precio + impuesto

mensaje = "El total es: " + str(total)
print(mensaje)
```

```output
El total es: 142.8
```

## Buenas Prácticas

Usa espacios al concatenar texto (Si es necesario):

```python
"Hola" + "mundo"    # Holamundo
"Hola " + "mundo"    # Hola mundo
```

Convierte los tipos cuando mezcles números y cadenas:

```python
str(), int(), float()
```

Usa repetición para separadores:

```python run
print("-" * 40)
```

```output
----------------------------------------
```

## Ejercicios Para Practicar

### Ejercicio 1: Calculadora Básica

Crear tres variables: `a`, `b`, `c`.

Asigna valores numéricos y muestra:

- La suma de los tres.
- El promedio.
- El resultado de `a * c`.

```python practice
# Crea tres variables: a, b, c.
# Asigna valores numéricos y muestra:
# - La suma de los tres
# - El promedio
# - El resultado de a * c
```

:::details
```python run
a = 10
b = 20
c = 5

suma = a + b + c
promedio = suma / 3
producto = a * c

print("Suma:", suma)
print("Promedio:", promedio)
print("Producto:", producto)
```
:::

### Ejercicio 2: Concatenación de Texto

Une las siguientes partes para formar una única frase (Muéstrala en pantalla):

```python
parte1 = "Python "
parte2 = "es "
parte3 = "genial"
```

```python practice
# Une las siguientes partes para formar una única
# frase (Muéstrala en pantalla):
# parte1 = "Python "
# parte2 = "es "
# parte3 = "genial"
```

:::details
```python run
parte1 = "Python "
parte2 = "es "
parte3 = "genial"

frase = parte1 + parte2 + parte3
print(frase)
```
:::

### Ejercicio 3: Repetición de Cadenas

Crea una variable que contenga un símbolo (por ejemplo "\*") y repítelo 20 veces (Muéstralo en pantalla).

```python practice
# Crea una variable que contenga un símbolo
# (por ejemplo "*") y repítelo 20 veces
# (Muéstralo en pantalla)
```

:::details
```python run
simbolo = "*"
print(simbolo * 20)
```
:::

### Ejercicio 4: Convertir Antes de Sumar

Tienes un número almacenado como texto:

```python
numero = "40"
```

Convierte el número a entero y súmale 7. Por último, muestra el resultado en pantalla.

```python practice
# Tienes un número almacenado como texto:
# numero = "40"
# Convierte el número a entero y súmale 7.
# Por último, muestra el resultado en pantalla
```

:::details
```python run
numero = "40"
numero = int(numero)
print(numero + 7)
```
:::

### Ejercicio 5: Mensaje Final Combinado

Con las siguientes variables:

```python
nombre = "Linus"
edad = 55
```

Crea un mensaje como:

```python
Linus tiene 55 años
```

Por último, muestra el mensaje en pantalla.

```python practice
# Con las siguientes variables:
# nombre = "Linus"
# edad = 55
# Crea un mensaje como: Linus tiene 55 años
# Por último, muestra el mensaje en pantalla
```

:::details
```python run
nombre = "Linus"
edad = 55

mensaje = nombre + " tiene " + str(edad) + " años"
print(mensaje)
```
:::

## Conclusiones de la Unidad

En esta unidad aprendiste:

- Que Python puede hacer operaciones matemáticas básicas con `+`, `-`, `*`, `/`, `%`, `//` y `**`.
- Que las cadenas de texto se pueden unir con `+` y repetir con `*`.
- Que las operaciones con cadenas siguen reglas propias (por ejemplo, sumar textos = concatenar).
- Que es importante entender el tipo de dato para evitar errores y escribir código más claro.
