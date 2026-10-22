---
title: Variables y Tipos de Datos Básicos
summary: "Qué son las variables, cómo se crean y los tipos más comunes: `int`, `float`, `str`, `bool`."
order: 4
---

## ¿Qué Es Una Variable?

Una variable es un nombre que se usa para guardar un valor en la memoria. Puedes pensar en una variable como una caja con etiqueta, donde tú decides qué guardar dentro.

Por ejemplo:

```python
nombre = "Python"
edad = 33
```

Aquí:

- La "etiqueta" es `nombre` o `edad`.
- El contenido es `"Python"` y `33`.

:::note
El signo `=` en Python no significa "igual matemático", sino "asignar un valor". Es decir: "guardar este valor en esta variable".
:::

## Python y el Tipado Dinámico

Python determina el tipo de la variable automáticamente según el valor que le asignas.

```python
x = 10       # int (entero)
x = "Hola"    # str (cadena)
```

:::tip
Puedes cambiar el tipo en cualquier momento, pero evita hacerlo. Mantener un tipo consistente hace tu código más claro.
:::

## Reglas Para Nombrar Variables

Python permite muchos nombres válidos, pero debes cumplir estas reglas:

- Solo puedes usar letras, números y guiones bajos.
- No puede comenzar con un número.
- No usar espacios.
- Evita usar palabras reservadas (`for`, `if`, `print`, etc.).

Ejemplos válidos:

```python
nombre_usuario = "Ana"
edad2 = 30
_total = 99
```

Ejemplos inválidos:

```python
2edad = 10
mi variable = "texto"
for = 5
```

:::note
Usa nombres descriptivos. Tu código será más fácil de leer sin necesidad de comentarios.
:::

## Tipos de Datos Básicos En Python

Vamos a ver los tipos más comunes para empezar:

### 1\. Enteros - `int`

Números sin decimales.

```python
edad = 20
anio = 2025
```

### 2\. Flotantes - `float`

Números con decimales.

```python
precio = 19.99
temperatura = 36.5
```

:::note
Los floats pueden tener comportamientos curiosos por cómo se representan internamente.
:::

```python
print(0.1 + 0.2)
# 0.30000000000000004
```

Pero no te preocupes, lo verás más adelante.

### 3\. Cadenas de Texto - `str`

Cualquier texto entre comillas simples o dobles.

```python
nombre = "Python"
mensaje = 'Hola mundo'
```

Puedes usar comillas triples para textos grandes:

```python
texto_largo = """Este es un texto
que ocupa varias líneas"""
```

### 4\. Booleanos - `bool`

Representan verdadero o falso:

```python
activo = True
logged_in = False
```

Se usan muchísimo en condicionales.

:::note
En Python, `True` y `False` empiezan con mayúscula.
:::

## Ver El Tipo de Una Variable

Puedes usar la función `type()` para saber el tipo de dato:

```python
x = 10
print(type(x))   # <class 'int'>
```

```python run hidden
x = 10
print(type(x))
```

Esto es muy útil cuando estás aprendiendo.

## Operaciones Según El Tipo de Dato

Cada tipo tiene operaciones específicas:

### Enteros y Floats

```python
a = 10
b = 2.5
resultado = a + b   # 12.5
```

### Cadenas

Concatenación:

```python run
saludo = "Hola" + " " + "Mundo"
print(saludo)
```

```output
Hola Mundo
```

Repetición:

```python
print("Hola" * 3)
# HolaHolaHola
```

```python run hidden
print("Hola" * 3)
```

### Booleans

```python run
verdad = True
falso = False
print(verdad and falso)  # False
```

## Conversión Entre Tipos (Casting)

Python permite convertir valores manualmente:

```python
edad = "20"
edad = int(edad)
print(type(edad))    # <class 'int'>
```

```python run hidden
edad = "20"
edad = int(edad)
print(type(edad))
```

O de número a texto:

```python
x = 10
texto = str(x)
print(type(texto))    # <class 'str'>
```

```python run hidden
x = 10
texto = str(x)
print(type(texto))
```

:::tip
`input()` siempre devuelve un string, así que a veces necesitarás convertirlo a `int` o `float`.
:::

## Ejemplos Completos

### Ejemplo 1: Información del Usuario

```python run
nombre = "Python"
edad = 33
altura = 1.74
es_mayor = True

print("Nombre:", nombre)
print("Edad:", edad)
print("Altura:", altura)
print("Mayor de edad:", es_mayor)
```

```output
Nombre: Python
Edad: 33
Altura: 1.74
Mayor de edad: True
```

### Ejemplo 2: Conversión de Tipos

```python run
numero = "15"
numero = int(numero)
print("Suma:", numero + 5)
```

```output
Suma: 20
```

## Errores Comunes

:cross Error al intentar convertir texto no numérico:

```python
int("hola")
# ValueError
```

```python run="Probar Error >>" hidden error
int("hola")
```

:cross Mezclar tipos incompatibles:

```python
print("Edad: " + 20)
# TypeError
```

```python run="Probar Error >>" hidden error
print("Edad: " + 20)
```

Solución:

```python run
print("Edad:", 20)
# o
print("Edad: " + str(20))
```

```output
Edad: 20
Edad: 20
```

:::note
Este tipo de errores es muy común cuando inicias. No te preocupes, aprenderás a evitarlos con práctica.
:::

## Ejercicios Prácticos

### Ejercicio 1: Crear Variables Básicas

Crea variables para guardar:

- Tu nombre.
- Tu edad.
- Tu ciudad.
- Si eres mayor de edad (True/False).
- Tu altura (float).

Luego imprímelas usando `print()`.

```python practice
# Ejercicio 1: Crear variables básicas
# Crea variables para guardar:
# - Tu nombre
# - Tu edad
# - Tu ciudad
# - Si eres mayor de edad (True/False)
# Tu altura (float)
# Luego imprímelas usando print()
```

:::details
```python run
nombre = "TU NOMBRE"
edad = 22
ciudad = "TU CIUDAD"
es_mayor = True
altura = 1.85

print(nombre, edad, ciudad, es_mayor, altura)
```
:::

### Ejercicio 2: Suma Con Conversión

Una variable contiene un número guardado como texto (`"25"`). Convierte ese valor a un entero y súmale 10. Luego muestra el resultado.

```python practice
# Una variable contiene un número guardado como texto ("25").
# Convierte ese valor a un entero y súmale 10. Luego muestra el resultado.
```

:::details
```python run
numero = "25"      # el número viene como texto
numero = int(numero)   # conversión a entero
print(numero + 10)
```
:::

### Ejercicio 3: Tipos Mezclados

Crea tres variables:

```python
a = 10
b = 3.5
c = "Python"
```

Imprime:

- La suma entre `a` y `b`.
- La concatenación "Me gusta " + `c`.
- El tipo de cada variable usando `type()`.

```python practice
# a = 10
# b = 3.5
# c = "Python"
# Imprime:
# 1. La suma entre a y b
# 2. La concatenación "Me gusta " + c
# 3. El tipo de cada variable usando type()
```

:::details
```python run
a = 10
b = 3.5
c = "Python"

print(a + b)
print("Me gusta " + c)
print(type(a), type(b), type(c))
```
:::

### Ejercicio 4: Formar Un Mensaje

Crear variables:

```python
nombre = "Camilo"
edad = 30
```

Y muestra un mensaje como:

```python
Hola Camilo, tienes 30 años.
```

Usa concatenación o comas.

```python practice
# Crear variables:
# nombre = "Camilo"
# edad = 30
# Y muestra un mensaje como:
# Hola Camilo, tienes 30 años.
# Usa concatenación o comas
```

:::details
```python run
nombre = "Camilo"
edad = 30

print("Hola " + nombre + ", tienes " + str(edad) + " años.")
# o usando comas
print("Hola", nombre + ", tienes", edad, "años.")
```
:::

## Conclusiones de la Unidad

En este tema aprendiste:

- Qué es una variable.
- Cómo se crea y se asigna.
- Los tipos de datos más comunes y básicos: `int`, `float`, `str`, `bool`.
- Cómo convertir tipos.
- Errores típicos al trabajar con valores.
- Buenas prácticas para nombrar variables.

Estos fundamentos serán esenciales para todo lo que construyas después.
