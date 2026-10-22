---
title: List Comprehensions
summary: En esta unidad descubrirás cómo crear listas de manera más compacta y expresiva mediante las list comprehensions. Aprenderás a generar nuevas listas a partir de secuencias existentes, aplicar transformaciones a los elementos y utilizar condiciones dentro de una única expresión, logrando código más limpio, legible y eficiente en comparación con algunos enfoques tradicionales basados en bucles.
order: 2
---

A medida que los programas crecen, es muy común necesitar recorrer listas para generar nuevas colecciones de datos. Una de las características más elegantes y utilizadas de Python para este propósito son las **List Comprehensions**.

Las List Comprehensions permiten crear listas de forma compacta, legible y eficiente utilizando una única expresión. En lugar de crear una lista vacía y agregar elementos manualmente mediante un bucle `for`, podemos construir la lista directamente especificando cómo debe generarse cada elemento.

Su principal ventaja es que permiten escribir código más corto y expresivo sin sacrificar claridad cuando se utilizan adecuadamente.

## ¿Por Qué Usar List Comprehensions?

Supongamos que queremos obtener los cuadrados de varios números.

### Enfoque Tradicional

```python run
numeros = [1, 2, 3, 4, 5]

cuadrados = []

for numero in numeros:
    cuadrados.append(numero ** 2)

print(cuadrados)
```

```output
[1, 4, 9, 16, 25]
```

### Usando List Comprehension

```python run
numeros = [1, 2, 3, 4, 5]

cuadrados = [numero ** 2 for numero in numeros]

print(cuadrados)
```

```output
[1, 4, 9, 16, 25]
```

La segunda solución realiza exactamente la misma tarea utilizando menos código y expresando claramente la intención del programador.

## Sintaxis General

La estructura básica es:

```python
[nuevo_elemento for elemento in iterable]
```

### Componentes

| Elemento | Descripción |
| --- | --- |
| `nuevo_elemento` | Valor que será agregado a la nueva lista |
| `for elemento in iterable` | Recorrido de la colección original |
| `iterable` | Lista, tupla, rango u objeto iterable |

### Visualizando la Sintaxis

```python run
numeros = [1, 2, 3]

resultado = [numero * 10 for numero in numeros]

print(resultado)
```

Equivale a:

```python run
numeros = [1, 2, 3]

resultado = []

for numero in numeros:
    resultado.append(numero * 10)

print(resultado)
```

```output
[10, 20, 30]
```

## Transformando Datos

Una List Comprehension puede modificar los elementos durante la creación de la nueva lista.

### Convertir Palabras a Mayúsculas

```python run
palabras = ["python", "java", "c++"]

palabras_mayusculas = [palabra.upper() for palabra in palabras]

print(palabras_mayusculas)
```

```output
['PYTHON', 'JAVA', 'C++']
```

### Obtener Longitudes de Cadenas

```python run
nombres = ["Daniel", "Ana", "Sebastian"]

longitudes = [len(nombre) for nombre in nombres]

print(longitudes)
```

```output
[6, 3, 9]
```

## Utilizando Condiciones

Una de las características más poderosas es la posibilidad de filtrar elementos.

### Sintaxis

```python
[nuevo_elemento for elemento in iterable if condicion]
```

### Obtener Únicamente Números Pares

```python run
numeros = range(1, 21)

numeros_pares = [
    numero
    for numero in numeros
    if numero % 2 == 0
]

print(numeros_pares)
```

```output
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

### Obtener Palabras Largas

```python run
palabras = [
    "Python",
    "IA",
    "Programacion",
    "Codigo",
    "Desarrollo"
]

palabras_largas = [
    palabra
    for palabra in palabras
    if len(palabra) > 5]

print(palabras_largas)
```

```output
['Python', 'Programacion', 'Codigo', 'Desarrollo']
```

:::note
La condición siempre se evalúa después del `for`. Si la condición es verdadera, el elemento es agregado a la nueva lista.
:::

## Expresiones Condicionales Dentro de la Comprensión

También podemos decidir qué valor guardar según una condición.

### Sintaxis

```python
[valor_si_verdadero if condicion else valor_si_falso for elemento in iterable]
```

### Clasificar Números Como Pares o Impares

```python run
numeros = range(1, 11)

etiquetas = [
    "Par"
    if numero % 2 == 0
    else "Impar"
    for numero in numeros
]

print(etiquetas)
```

```output
['Impar', 'Par', 'Impar', 'Par', 'Impar', 'Par', 'Impar', 'Par', 'Impar', 'Par']
```

### Trabajando con Múltiples Condiciones

```python run
numeros = range(1, 51)

resultado = [
    numero
    for numero in numeros
    if numero % 2 == 0 and numero % 3 == 0
]

print(resultado)
```

```output
[6, 12, 18, 24, 30, 36, 42, 48]
```

## List Comprehensions con Strings

Los strings son iterables, por lo que podemos recorrer sus caracteres.

```python run
palabra = "python"

letras = [letra.upper() for letra in palabra]

print(letras)
```

```output
['P', 'Y', 'T', 'H', 'O', 'N']
```

## List Comprehensions Anidadas

Las List Comprehensions también pueden contener múltiples bucles.

Ejemplo:

```python run
pares = [
    (x, y)
    for x in range(1, 4)
    for y in range(1, 4)
]

print(pares)
```

```output
[(1, 1), (1, 2), (1, 3), (2, 1), (2, 2), (2, 3), (3, 1), (3, 2), (3, 3)]
```

### Creando Matrices

```python run
matriz = [
    [columna for columna in range(4)]
    for fila in range(3)
]

print(matriz)
```

```output
[[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]]
```

## Comparación de Enfoques

| Característica | Bucle Tradicional | List Comprehension |
| --- | --- | --- |
| Cantidad de líneas | Mayor | Menor |
| Legibilidad | Buena | Excelente para tareas simples |
| Rendimiento | Bueno | Generalmente mejor |
| Complejidad permitida | Alta | Baja a media |
| Uso recomendado | Procesos complejos | Transformaciones simples |

## Buenas Prácticas

### Utiliza List Comprehensions Cuando

- Realices transformaciones simples.
- Filtres elementos.
- Generes nuevas listas rápidamente.

### Evítalas Cuando

- Existan múltiples condiciones complejas.
- La comprensión tenga varios niveles difíciles de leer.
- Sea necesario realizar múltiples acciones dentro del bucle.

:::tip
Si una List Comprehension requiere varias líneas para entenderse, probablemente un bucle tradicional sea una mejor opción.
:::

## Ejercicios para Practicar

### Ejercicio 1: Filtrado de Estudiantes Aprobados

Una institución educativa almacena las calificaciones finales de sus estudiantes en una lista.

```python
calificaciones = [45, 80, 62, 95, 30, 71, 88, 56]
```

Debes crear una nueva lista que contenga únicamente las calificaciones aprobatorias.

Se considera aprobada cualquier nota mayor o igual a 60.

Instrucciones:

- Crear una nueva lista utilizando una List Comprehension.
- Recorrer cada elemento de la lista original.
- Conservar únicamente las calificaciones mayores o iguales a 60.
- Guardar el resultado en una variable llamada `calificaciones_aprobadas`.
- Mostrar el contenido de la nueva lista utilizando `print()`.

```python practice
# Una institución educativa almacena las calificaciones finales de
# sus estudiantes en una lista.
#
# calificaciones = [45, 80, 62, 95, 30, 71, 88, 56]
#
# Debes crear una nueva lista que contenga únicamente las
# calificaciones aprobatorias.
#
# Se considera aprobada cualquier nota mayor o igual a 60.
#
# Intrucciones:
# - Crear una nueva lista utilizando una List Comprehension.
# - Recorrer cada elemento de la lista original.
# - Conservar únicamente las calificaciones mayores o iguales a 60.
# - Guardar el resultado en una variable llamada
#   calificaciones_aprobadas.
# - Mostrar el contenido de la nueva lista utilizando print().
```

:::details
```python run
# Una institución educativa almacena las calificaciones finales de
# sus estudiantes en una lista.
#
# calificaciones = [45, 80, 62, 95, 30, 71, 88, 56]

calificaciones = [45, 80, 62, 95, 30, 71, 88, 56]

# Debes crear una nueva lista que contenga únicamente las
# calificaciones aprobatorias.
#
# Se considera aprobada cualquier nota mayor o igual a 60.
#
# Intrucciones:
# - Crear una nueva lista utilizando una List Comprehension.
# - Guardar el resultado en una variable llamada
#   calificaciones_aprobadas.

calificaciones_aprobadas = [
    # - Recorrer cada elemento de la lista original
    nota
    for nota in calificaciones
    # - Conservar únicamente las calificaciones mayores o iguales a 60.
    if nota >= 60
]

# - Mostrar el contenido de la nueva lista utilizando print().
print(calificaciones_aprobadas)
```
:::

### Ejercicio 2: Catálogo de Productos en Mayúsculas

Una tienda almacena los nombres de sus productos en la siguiente lista:

```python
productos = [
    "Laptop",
    "Mouse",
    "Teclado",
    "Monitor",
    "Memoria USB"
]
```

El administrador desea generar una nueva lista donde todos los nombres aparezcan completamente en mayúsculas.

Instrucciones:

- Crear una nueva lista utilizando una List Comprehension.
- Recorrer todos los productos de la lista original.
- Convertir cada nombre a mayúsculas mediante el método `upper()`.
- Guardar el resultado en una variable llamada `productos_mayusculas`.
- Mostrar la lista resultante.

```python practice
# Una tienda almacena los nombres de sus productos en la siguiente lista:
#
# productos = [
#   "Laptop",
#   "Mouse",
#   "Teclado",
#   "Monitor",
#   "Memoria USB"
# ]
#
# El administrador desea generar una nueva lista donde todos los nombres
# aparezcan completamente en mayúsculas.
#
# Instrucciones:
# - Crear una nueva lista utilizando una List Comprehension.
# - Recorrer todos los productos de la lista original.
# - Convertir cada nombre a mayúsculas mediante el método upper().
# - Guardar el resultado en una variable llamada productos_mayusculas.
# - Mostrar la lista resultante.
```

:::details
```python run
# Una tienda almacena los nombres de sus productos en la siguiente lista:
#
# productos = [
#   "Laptop",
#   "Mouse",
#   "Teclado",
#   "Monitor",
#   "Memoria USB"
# ]

productos = [
    "Laptop",
    "Mouse",
    "Teclado",
    "Monitor",
    "Memoria USB"
]

# El administrador desea generar una nueva lista donde todos los nombres
# aparezcan completamente en mayúsculas.
#
# Instrucciones:
# - Crear una nueva lista utilizando una List Comprehension.
# - Guardar el resultado en una variable llamada productos_mayusculas.

productos_mayusculas = [
    # - Recorrer todos los productos de la lista original.
    # - Convertir cada nombre a mayúsculas mediante el método upper().
    producto.upper()
    for producto in productos
]

# - Mostrar la lista resultante.
print(productos_mayusculas)
```
:::

### Ejercicio 3: Sistema de Monitoreo de Temperaturas

Una estación meteorológica registra temperaturas durante el día.

```python
temperaturas = [
    15, 28, 35, 42, 18,
    39, 50, 24, 45, 32
]
```

Debes generar una lista de alertas para todas las temperaturas consideradas críticas.

Una temperatura es crítica cuando supera los 40 °C.

Cada alerta debe almacenarse con el siguiente formato:

```python
ALERTA: 42°C
```

Instrucciones:

- Recorrer todas las temperaturas utilizando una List Comprehension.
- Filtrar únicamente las temperaturas superiores a 40.
- Crear una cadena de texto con el formato indicado.
- Guardar las alertas en una variable llamada `alertas_criticas`.
- Mostrar el resultado.

```python practice
# Una estación meteorológica registra temperaturas durante el día.
#
# temperaturas = [
#   15, 28, 35, 42, 18,
#   39, 50, 24, 45, 32
# ]
#
# Debes generar una lista de alertas para todas las temperaturas
# consideradas críticas.
#
# Una temperatura es crítica cuando supera los 40 °C.
#
# Cada alerta debe almacenarse con el siguiente formato:
# ALERTA: 42°C
#
# Instrucciones:
# - Recorrer todas las temperaturas utilizando una List Comprehension.
# - Filtrar únicamente las temperaturas superiores a 40.
# - Crear una cadena de texto con el formato indicado.
# - Guardar las alertas en una variable llamada alertas_criticas.
# - Mostrar el resultado.
```

:::details
```python run
# Una estación meteorológica registra temperaturas durante el día.
#
# temperaturas = [
#   15, 28, 35, 42, 18,
#   39, 50, 24, 45, 32
# ]

temperaturas = [
    15, 28, 35, 42, 18,
    39, 50, 24, 45, 32
]

# Debes generar una lista de alertas para todas las temperaturas
# consideradas críticas.
#
# Una temperatura es crítica cuando supera los 40 °C.
#
# Cada alerta debe almacenarse con el siguiente formato:
# ALERTA: 42°C
#
# Instrucciones:
# - Guardar las alertas en una variable llamada alertas_criticas.
alertas_criticas = [
    # - Crear una cadena de texto con el formato indicado.
    f"ALERTA: {temperatura}°C"
    # - Recorrer todas las temperaturas utilizando una List Comprehension.
    for temperatura in temperaturas
    # - Filtrar únicamente las temperaturas superiores a 40.
    if temperatura > 40
]

# - Mostrar el resultado.
print(alertas_criticas)
```
:::

### Ejercicio 4: Análisis de Intentos de Inicio de Sesión

Un sistema de seguridad almacena eventos en la siguiente estructura:

```python
eventos = [
    ("LOGIN_SUCCESS", 120),
    ("LOGIN_FAILED", 18),
    ("FILE_ACCESS", 320),
    ("LOGIN_FAILED", 24),
    ("FILE_DELETE", 8),
    ("LOGIN_FAILED", 41)
]
```

Debes identificar aquellos eventos correspondientes a intentos fallidos de inicio de sesión cuya cantidad sea superior a 20.

La lista final debe contener únicamente los valores numéricos asociados a dichos eventos.

Instrucciones:

- Utilizar una List Comprehension.
- Recorrer cada tupla de la lista.
- Separar el tipo de evento y la cantidad.
- Filtrar únicamente los eventos `"LOGIN_FAILED"`.
- Conservar solo aquellos cuya cantidad sea mayor a 20.
- Guardar el resultado en una variable llamada `intentos_fallidos`.
- Mostrar la lista obtenida.

```python practice
# Un sistema de seguridad almacena eventos en la siguiente estructura:
#
# eventos = [
#   ("LOGIN_SUCCESS", 120),
#   ("LOGIN_FAILED", 18),
#   ("FILE_ACCESS", 320),
#   ("LOGIN_FAILED", 24),
#   ("FILE_DELETE", 8),
#   ("LOGIN_FAILED", 41)
# ]
#
# Debes identificar aquellos eventos correspondientes a intentos
# fallidos de inicio de sesión cuya cantidad sea superior a 20.
#
# La lista final debe contener únicamente los valores numéricos
# asociados a dichos eventos.
#
# Instrucciones:
# - Utilizar una List Comprehension.
# - Recorrer cada tupla de la lista.
# - Separar el tipo de evento y la cantidad.
# - Filtrar únicamente los eventos "LOGIN_FAILED".
# - Conservar solo aquellos cuya cantidad sea mayor a 20.
# - Guardar el resultado en una variable llamada intentos_fallidos.
# - Mostrar la lista obtenida.
```

:::details
```python run
# Un sistema de seguridad almacena eventos en la siguiente estructura:
#
# eventos = [
#   ("LOGIN_SUCCESS", 120),
#   ("LOGIN_FAILED", 18),
#   ("FILE_ACCESS", 320),
#   ("LOGIN_FAILED", 24),
#   ("FILE_DELETE", 8),
#   ("LOGIN_FAILED", 41)
# ]

eventos = [
    ("LOGIN_SUCCESS", 120),
    ("LOGIN_FAILED", 18),
    ("FILE_ACCESS", 320),
    ("LOGIN_FAILED", 24),
    ("FILE_DELETE", 8),
    ("LOGIN_FAILED", 41)
]

# Debes identificar aquellos eventos correspondientes a intentos
# fallidos de inicio de sesión cuya cantidad sea superior a 20.
#
# La lista final debe contener únicamente los valores numéricos
# asociados a dichos eventos.
#
# Instrucciones:
# - Utilizar una List Comprehension.
# - Guardar el resultado en una variable llamada intentos_fallidos.
intentos_fallidos = [
    # - Recorrer cada tupla de la lista.
    cantidad
    # - Separar el tipo de evento y la cantidad.
    for tipo_evento, cantidad in eventos
    # - Filtrar únicamente los eventos "LOGIN_FAILED".
    if tipo_evento == "LOGIN_FAILED"
    # - Conservar solo aquellos cuya cantidad sea mayor a 20.
    and cantidad > 20
]

# - Mostrar la lista obtenida.
print(intentos_fallidos)
```
:::

### Ejercicio 5: Generador de Coordenadas Estratégicas

Un videojuego necesita generar posiciones válidas dentro de un mapa bidimensional.

Debes crear todas las coordenadas posibles `(x, y)` donde:

- `x` tome valores desde 1 hasta 10.
- `y` tome valores desde 1 hasta 10.

Posteriormente, solo deben conservarse aquellas coordenadas cuya suma sea múltiplo de 4.

Instrucciones:

- Utilizar una List Comprehension anidada.
- Generar todas las combinaciones posibles de coordenadas.
- Evaluar la suma de cada coordenada.
- Conservar únicamente aquellas cuya suma sea múltiplo de 4.
- Guardar el resultado en una variable llamada coordenadas.
- Mostrar la lista obtenida.

```python practice
# Un videojuego necesita generar posiciones válidas dentro de un mapa
# bidimensional.
#
# Debes crear todas las coordenadas posibles (x, y) donde:
# - x tome valores desde 1 hasta 10.
# - y tome valores desde 1 hasta 10.
#
# Posteriormente, solo deben conservarse aquellas coordenadas cuya
# suma sea múltiplo de 4.
#
# Instrucciones:
# - Utilizar una List Comprehension anidada.
# - Generar todas las combinaciones posibles de coordenadas.
# - Evaluar la suma de cada coordenada.
# - Conservar únicamente aquellas cuya suma sea múltiplo de 4.
# - Guardar el resultado en una variable llamada coordenadas.
# - Mostrar la lista obtenida.
```

:::details
```python run
# Un videojuego necesita generar posiciones válidas dentro de un mapa
# bidimensional.
#
# Debes crear todas las coordenadas posibles (x, y) donde:
# - x tome valores desde 1 hasta 10.
# - y tome valores desde 1 hasta 10.
#
# Posteriormente, solo deben conservarse aquellas coordenadas cuya
# suma sea múltiplo de 4.
#
# Instrucciones:
# - Utilizar una List Comprehension anidada.
# - Guardar el resultado en una variable llamada coordenadas.
coordenadas = [
    # - Generar todas las combinaciones posibles de coordenadas.
    (x, y)
    for x in range(1, 11)
    for y in range(1, 11)
    # - Evaluar la suma de cada coordenada.
    # - Conservar únicamente aquellas cuya suma sea múltiplo de 4.
    if (x + y) % 4 == 0
]

# - Mostrar la lista obtenida.
print(coordenadas)
```
:::

## Conclusiones de la Unidad

Las List Comprehensions son una de las características más elegantes y utilizadas de Python. Permiten construir listas de forma compacta, legible y eficiente, reduciendo la cantidad de código necesario para transformar y filtrar datos.

Durante esta unidad aprendiste a:

- Crear listas mediante List Comprehensions.
- Transformar elementos durante la construcción de una lista.
- Filtrar datos utilizando condiciones.
- Utilizar expresiones condicionales.
- Trabajar con múltiples condiciones.
- Construir comprensiones anidadas.
- Aplicar esta técnica a escenarios reales de procesamiento de datos, inventarios, monitoreo y análisis de registros.

Dominar las List Comprehensions te permitirá escribir código más idiomático en Python y mejorar la legibilidad de tus programas.
