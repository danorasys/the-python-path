---
title: Uso Básico de Funciones Integradas (`len()`, `sum()`, `max()`, `min()`, etc.)
summary: En esta unidad explorarás algunas de las funciones integradas más utilizadas de Python, las cuales permiten realizar operaciones comunes sin necesidad de programarlas desde cero. Aprenderás a obtener tamaños de colecciones con `len()`, calcular sumas con `sum()`, encontrar valores máximos y mínimos con `max()` y `min()`, entre otras herramientas que simplifican el desarrollo y mejoran la productividad al resolver problemas cotidianos.
order: 3
---

En Python existen numerosas funciones integradas (built-in functions) que están disponibles desde el momento en que se inicia el programa. Estas funciones permiten realizar tareas frecuentes de manera rápida y eficiente sin necesidad de escribir implementaciones propias para cada operación.

A lo largo de esta unidad aprenderás a utilizar algunas de las funciones integradas más utilizadas, incluyendo `len()`, `sum()`, `max()`, `min()`, `sorted()`, `abs()` y `round()`. Estas herramientas simplifican significativamente el desarrollo de programas y permiten escribir código más limpio, legible y mantenible.

### ¿Qué es una Función Integrada?

Una función integrada es una función que ya forma parte de Python y puede utilizarse directamente sin necesidad de importar módulos adicionales.

Por ejemplo:

```python run
numeros = [10, 20, 30, 40]

cantidad = len(numeros)

print(cantidad)
```

```output
4
```

En este caso, `len()` ya existe dentro de Python y puede utilizarse inmediatamente.

## Función `len()`

La función `len()` permite obtener la cantidad de elementos contenidos dentro de una colección.

Puede utilizarse con:

- Listas.
- Tuplas.
- Cadenas de texto.
- Diccionarios.
- Conjuntos.

### Sintaxis

```python
len(objeto)
```

### Ejemplo con una Lista

```python run
frutas = ["Manzana", "Pera", "Uva", "Mango"]

print(len(frutas))
```

```output
4
```

### Ejemplo con una Cadena

```python run
mensaje = "Python"

print(len(mensaje))
```

```output
6
```

:::note
`len()` cuenta todos los caracteres de una cadena, incluyendo espacios en blanco.
:::

```python run
texto = "Hola Mundo"

print(len(texto))
```

```output
10
```

## Función `sum()`

La función `sum()` calcula la suma de todos los elementos numéricos de una colección.

### Sintaxis

```python
sum(iterable)
```

Ejemplo:

```python run
ventas = [120, 350, 200, 430]

total = sum(ventas)

print(total)
```

```output
1100
```

:::tip
Cuando necesites sumar una gran cantidad de números almacenados en una lista, utiliza `sum()` en lugar de crear manualmente un bucle `for`.
:::

## Función `max()`

La función `max()` devuelve el valor más grande de una colección.

Ejemplo:

```python run
temperaturas = [18, 25, 31, 22, 29]

print(max(temperaturas))
```

```output
31
```

## Función `min()`

La función `min()` devuelve el valor más pequeño de una colección.

Ejemplo:

```python run
temperaturas = [18, 25, 31, 22, 29]

print(min(temperaturas))
```

```output
18
```

## Comparación entre `len()`, `sum()`, `max()` y `min()`

| Función | Propósito | Ejemplo |
| --- | --- | --- |
| `len()` | Contar elementos | `len(lista)` |
| `sum()` | Sumar valores | `sum(lista)` |
| `max()` | Obtener el valor mayor | `max(lista)` |
| `min()` | Obtener el valor menor | `min(lista)` |

## Función `sorted()`

La función `sorted()` devuelve una nueva colección ordenada.

### Orden Ascendente

```python run
numeros = [9, 4, 2, 7, 1]

resultado = sorted(numeros)

print(resultado)
```

```output
[1, 2, 4, 7, 9]
```

### Orden Descendente

```python run
numeros = [9, 4, 2, 7, 1]

resultado = sorted(numeros, reverse=True)

print(resultado)
```

```output
[9, 7, 4, 2, 1]
```

:::note
`sorted()` no modifica la lista original.
:::

```python run
numeros = [5, 3, 8]

ordenados = sorted(numeros)

print(numeros)
print(ordenados)
```

```output
[5, 3, 8]
[3, 5, 8]
```

## Función `abs()`

La función `abs()` devuelve el valor absoluto de un número.

Ejemplo:

```python run
numero = -15

print(abs(numero))
```

```output
15
```

## Función `round()`

La función `round()` permite redondear números decimales.

Ejemplo:

```python run
precio = 15.6789

print(round(precio, 2))
```

```output
15.68
```

## Tabla Resumen de Funciones Integradas

| Función | Descripción |
| --- | --- |
| `len()` | Cuenta elementos |
| `sum()` | Suma elementos numéricos |
| `max()` | Obtiene el mayor valor |
| `min()` | Obtiene el menor valor |
| `sorted()` | Ordena elementos |
| `abs()` | Obtiene el valor absoluto |
| `round()` | Redondea números |

## Combinando Varias Funciones

Es común utilizar varias funciones integradas dentro del mismo programa.

```python run
calificaciones = [72, 85, 91, 64, 78]

cantidad = len(calificaciones)
promedio = sum(calificaciones) / len(calificaciones)
mayor = max(calificaciones)
menor = min(calificaciones)

print("Cantidad:", cantidad)
print("Promedio:", promedio)
print("Mayor:", mayor)
print("Menor:", menor)
```

```output
Cantidad: 5
Promedio: 78.0
Mayor: 91
Menor: 64
```

:::tip
Las funciones integradas suelen estar altamente optimizadas internamente, por lo que generalmente son más eficientes y legibles que implementar la misma lógica manualmente.
:::

## Ejercicios para Practicar

### Ejercicio 1: Análisis de Ventas Mensuales

Una empresa ha registrado las ventas obtenidas durante varios meses y desea generar un pequeño informe estadístico.

```python
ventas = [1250, 1875, 980, 2150, 1640, 1990]
```

Instrucciones:

- Determinar cuántos registros de ventas existen.
- Calcular el total acumulado de ventas.
- Obtener la venta más alta registrada.
- Obtener la venta más baja registrada.
- Mostrar todos los resultados.

```python practice
# Una empresa ha registrado las ventas obtenidas durante varios meses
# y desea generar un pequeño informe estadístico.
#
# ventas = [1250, 1875, 980, 2150, 1640, 1990]
#
# Instrucciones:
# - Determinar cuántos registros de ventas existen.
# - Calcular el total acumulado de ventas.
# - Obtener la venta más alta registrada.
# - Obtener la venta más baja registrada.
# - Mostrar todos los resultados.
```

:::details
```python run
ventas = [1250, 1875, 980, 2150, 1640, 1990]

# Obtener la cantidad de registros almacenados.
cantidad_ventas = len(ventas)

# Calcular el total acumulado de ventas.
total_ventas = sum(ventas)

# Obtener la venta más alta registrada.
venta_maxima = max(ventas)

# Obtener la venta más baja registrada.
venta_minima = min(ventas)

# Mostrar los resultados obtenidos.
print("Cantidad:", cantidad_ventas)
print("Total:", total_ventas)
print("Máxima:", venta_maxima)
print("Mínima:", venta_minima)
```
:::

### Ejercicio 2: Monitoreo de Temperaturas Ambientales

Un sistema meteorológico ha almacenado las temperaturas registradas durante una semana.

```python
temperaturas = [18.4, 21.7, 25.1, 19.6, 28.3, 30.5, 24.8]
```

Instrucciones:

- Determinar la temperatura más alta registrada.
- Determinar la temperatura más baja registrada.
- Calcular la temperatura promedio.
- Redondear el promedio a dos decimales.
- Mostrar toda la información obtenida.

```python practice
# Un sistema meteorológico ha almacenado las temperaturas registradas
# durante una semana.
#
# temperaturas = [18.4, 21.7, 25.1, 19.6, 28.3, 30.5, 24.8]
#
# Instrucciones:
# - Determinar la temperatura más alta registrada.
# - Determinar la temperatura más baja registrada.
# - Calcular la temperatura promedio.
# - Redondear el promedio a dos decimales.
# - Mostrar toda la información obtenida.
```

:::details
```python run
temperaturas = [18.4, 21.7, 25.1, 19.6, 28.3, 30.5, 24.8]

# Obtener la temperatura máxima registrada.
temperatura_maxima = max(temperaturas)

# Obtener la temperatura mínima registrada.
temperatura_minima = min(temperaturas)

# Calcular el promedio de temperaturas.
promedio = sum(temperaturas) / len(temperaturas)

# Redondear el promedio a dos decimales.
promedio_redondeado = round(promedio, 2)

# Mostrar los resultados obtenidos.
print("Máxima:", temperatura_maxima)
print("Mínima:", temperatura_minima)
print("Promedio:", promedio_redondeado)
```
:::

### Ejercicio 3: Auditoría de Transacciones Bancarias

Un banco almacena movimientos financieros donde los números negativos representan retiros y los positivos representan depósitos.

```python
transacciones = [
    1200,
    -350,
    850,
    -120,
    -780,
    1500,
    -95
]
```

Instrucciones:

- Calcular el saldo final de la cuenta.
- Determinar cuál fue el depósito más grande realizado.
- Determinar cuál fue el retiro más grande realizado.
- Obtener el valor absoluto del retiro más grande.
- Mostrar toda la información obtenida.

```python practice
# Un banco almacena movimientos financieros donde los números
# negativos representan retiros y los positivos representan depósitos.
#
# transacciones = [
#   1200,
#   -350,
#   850,
#   -120,
#   -780,
#   1500,
#   -95
# ]
#
# Instrucciones:
# - Calcular el saldo final de la cuenta.
# - Determinar cuál fue el depósito más grande realizado.
# - Determinar cuál fue el retiro más grande realizado.
# - Obtener el valor absoluto del retiro más grande.
# - Mostrar toda la información obtenida.
```

:::details
```python run
transacciones = [
    1200,
    -350,
    850,
    -120,
    -780,
    1500,
    -95
]

# Calcular el saldo final de la cuenta.
saldo_final = sum(transacciones)

# Obtener el depósito más grande realizado.
deposito_mayor = max(transacciones)

# Obtener el retiro más grande realizado.
retiro_mayor = min(transacciones)

# Obtener el valor absoluto del retiro más grande.
valor_retiro = abs(retiro_mayor)

# Mostrar los resultados obtenidos.
print("Saldo final:", saldo_final)
print("Mayor depósito:", deposito_mayor)
print("Mayor retiro:", valor_retiro)
```
:::

### Ejercicio 4: Clasificación de Resultados Académicos

Una universidad desea organizar las calificaciones finales de un grupo de estudiantes.

```python
calificaciones = [72, 91, 64, 88, 95, 70, 81, 60, 77]
```

Instrucciones:

- Crear una nueva lista ordenada de menor a mayor.
- Crear una segunda lista ordenada de mayor a menor.
- Obtener la calificación más alta.
- Obtener la calificación más baja.
- Mostrar toda la información generada.

```python practice
# Una universidad desea organizar las calificaciones finales de un
# grupo de estudiantes.
#
# calificaciones = [72, 91, 64, 88, 95, 70, 81, 60, 77]
#
# Instrucciones:
# - Crear una nueva lista ordenada de menor a mayor.
# - Crear una segunda lista ordenada de mayor a menor.
# - Obtener la calificación más alta.
# - Obtener la calificación más baja.
# - Mostrar toda la información generada.
```

:::details
```python run
calificaciones = [72, 91, 64, 88, 95, 70, 81, 60, 77]

# Crear una lista ordenada de menor a mayor.
orden_ascendente = sorted(calificaciones)

# Crear una lista ordenada de mayor a menor.
orden_descendente = sorted(calificaciones, reverse=True)

# Obtener la calificación más alta.
nota_maxima = max(calificaciones)

# Obtener la calificación más baja.
nota_minima = min(calificaciones)

# Mostrar toda la información obtenida.
print(orden_ascendente)
print(orden_descendente)
print(nota_maxima)
print(nota_minima)
```
:::

### Ejercicio 5: Centro de Análisis de Sensores Industriales

Una planta industrial ha registrado miles de lecturas, pero para realizar una prueba inicial se dispone del siguiente conjunto:

```python
lecturas = [
    -15,
    22,
    -7,
    34,
    -42,
    18,
    29,
    -3,
    41,
    -27
]
```

Instrucciones:

- Determinar cuántas lecturas existen.
- Obtener el valor máximo registrado.
- Obtener el valor mínimo registrado.
- Calcular la suma total de todas las lecturas.
- Obtener el valor absoluto de la lectura más negativa.
- Crear una nueva lista ordenada de menor a mayor.
- Mostrar todos los resultados obtenidos.

```python practice
# Una planta industrial ha registrado miles de lecturas, pero para
# realizar una prueba inicial se dispone del siguiente conjunto:
#
# lecturas = [
#   -15,
#   22,
#   -7,
#   34,
#   -42,
#   18,
#   29,
#   -3,
#   41,
#   -27
# ]
#
# Instrucciones:
# - Determinar cuántas lecturas existen.
# - Obtener el valor máximo registrado.
# - Obtener el valor mínimo registrado.
# - Calcular la suma total de todas las lecturas.
# - Obtener el valor absoluto de la lectura más negativa.
# - Crear una nueva lista ordenada de menor a mayor.
# - Mostrar todos los resultados obtenidos.
```

:::details
```python run
lecturas = [
    -15,
    22,
    -7,
    34,
    -42,
    18,
    29,
    -3,
    41,
    -27
]

# Determinar cuántas lecturas existen.
cantidad_lecturas = len(lecturas)

# Obtener el valor máximo registrado.
valor_maximo = max(lecturas)

# Obtener el valor mínimo registrado.
valor_minimo = min(lecturas)

# Calcular la suma total de todas las lecturas.
suma_total = sum(lecturas)

# Obtener el valor absoluto de la lectura más negativa.
valor_absoluto = abs(valor_minimo)

# Crear una nueva lista ordenada de menor a mayor.
lecturas_ordenadas = sorted(lecturas)

# Mostrar todos los resultados obtenidos.
print("Cantidad:", cantidad_lecturas)
print("Máximo:", valor_maximo)
print("Mínimo:", valor_minimo)
print("Suma:", suma_total)
print("Valor absoluto:", valor_absoluto)
print("Ordenadas:", lecturas_ordenadas)
```
:::

## Conclusiones de la Unidad

Las funciones integradas de Python constituyen algunas de las herramientas más útiles y utilizadas durante el desarrollo de programas. Gracias a funciones como `len()`, `sum()`, `max()`, `min()`, `sorted()`, `abs()` y `round()`, es posible resolver problemas comunes con muy pocas líneas de código, mejorando tanto la legibilidad como la eficiencia de las soluciones.

Dominar estas funciones permite aprovechar mejor las capacidades del lenguaje y evitar la implementación manual de operaciones que Python ya proporciona de forma optimizada. A medida que desarrolles programas más complejos, descubrirás que estas funciones aparecen constantemente en tareas relacionadas con procesamiento de datos, análisis de información, automatización y desarrollo de aplicaciones.
