---
title: "Listas y Cadenas: Conversión entre Tipos"
summary: En esta unidad se estudiará cómo combinar texto con valores de variables para generar salidas más claras y dinámicas, utilizando diferentes formas de formateo en Python, especialmente las f-strings, que permiten insertar expresiones directamente dentro de cadenas. Aprenderás a construir mensajes más legibles, mostrar resultados de manera organizada y mejorar la presentación de la información, lo cual es fundamental en aplicaciones que interactúan con usuarios o muestran resultados en pantalla.
order: 3
---

En muchos programas es necesario transformar datos entre cadenas de texto (`str`) y listas (`list`) para poder procesarlos de manera más flexible. En esta unidad aprenderás a convertir texto en listas usando `split()` y a unir listas en una cadena con `join()`. Estas herramientas permiten separar palabras, manipular información por partes y reconstruir textos de forma eficiente, lo cual es esencial cuando trabajas con entradas de usuario, archivos o procesamiento de datos.

## ¿Por Qué Convertir Entre Cadenas y Listas?

Una cadena es útil para mostrar texto, pero una lista es más útil para manipular cada elemento por separado.

```python
texto = "Python es divertido"
```

Si quieres trabajar palabra por palabra, necesitas convertirlo a lista.

## Método `split()`

Convierte una cadena en una lista separando sus elementos.

### Sintaxis

```python
cadena.split(separador)
```

### Ejemplo Básico

```python run
texto = "Python es divertido"

palabras = texto.split()

print(palabras)
```

```output
['Python', 'es', 'divertido']
```

:::note[Nota:]
Si no se especifica separador, `split()` separa por espacios.
:::

### Separador Personalizado

```python run
texto = "manzana,pera,uva"

frutas = texto.split(",")

print(frutas)
```

```output
['manzana', 'pera', 'uva']
```

:::tip[Tip:]
Usa separadores como `,`, `;`, `-` cuando trabajes con datos estructurados.
:::

## Método `join()`

Convierte una lista en una cadena.

### Sintaxis

```python
separador.join(lista)
```

### Ejemplo Básico

```python run
palabras = ["Python", "es", "genial"]

texto = " ".join(palabras)

print(texto)
```

```output
Python es genial
```

:::note[Nota:]
Todos los elementos de la lista deben ser cadenas.
:::

### Error Común

```python
numeros = [1, 2, 3]

# print(" ".join(numeros))  # Error
```

```output
TypeError: sequence item 0: expected str instance, int found
```

```python run hidden
numeros = [1, 2, 3]

print(" ".join(numeros))  # Error
```

### Solución

```python run
numeros = [1, 2, 3]

texto = " ".join([str(n) for n in numeros])

print(texto)
```

```output
1 2 3
```

## Conversión Combinada

```python run
texto = "Hola mundo Python"

palabras = texto.split()

texto_nuevo = "-".join(palabras)

print(texto_nuevo)
```

```output
Hola-mundo-Python
```

## Procesamiento de Texto con Listas

```python run
texto = "python es poderoso"

palabras = texto.split()

for palabra in palabras:
	print(palabra.upper())
```

```output
PYTHON
ES
PODEROSO
```

:::tip[Tip:]
Convertir a lista permite recorrer y transformar cada elemento fácilmente.
:::

## Resumen de Métodos

| Método | Entrada | Salida |
| --- | --- | --- |
| `split()` | `str` | `list` |
| `join()` | `list` | `str` |

## Ejemplo Integrador

```python run
texto = "  Python es muy útil  "

texto = texto.strip()

palabras = texto.split()

palabras_mayus = [p.upper() for p in palabras]

resultado = " ".join(palabras_mayus)

print(resultado)
```

```output
PYTHON ES MUY ÚTIL
```

:::note[Nota:]
`split()` y `join()` son herramientas clave para trabajar con datos reales y texto estructurado.
:::

## Ejercicios Prácticos

### Ejercicio 1: Normalizador de Texto

Crea un programa que:

- Defina una cadena con el siguiente texto (2 espacios al inicio y al final y 4 espacios entre palabras):

```python
"  Python    es    un    lenguaje    poderoso  "
```

- Elimine los espacios al inicio y al final.
- Use `split()` para dividir el texto en palabras (ignorando múltiples espacios).
- Convierta todas las palabras a minúsculas.
- Una nuevamente el texto usando un solo espacio entre palabras.
- Muestre el resultado final.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina una cadena con el siguiente texto (2
# espacios al inicio y al final y 4 espacios entre
# palabras):
# "  Python    es    un    lenguaje    poderoso  "
# 2. Elimine los espacios al inicio y al final.
# 3. Use split() para dividir el texto en palabras
# (ignorando múltiples espacios).
# 4. Convierta todas las palabras a minúsculas.
# 5. Una nuevamente el texto usando un solo espacio
# entre palabras.
# 6. Muestre el resultado final.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina una cadena con el siguiente texto (2
# espacios al inicio y al final y 4 espacios entre
# palabras):
# "  Python    es    un    lenguaje    poderoso  "
texto = "  Python    es    un    lenguaje    poderoso  "

# 2. Elimine los espacios al inicio y al final.
texto = texto.strip()

# 3. Use split() para dividir el texto en palabras
# (ignorando múltiples espacios).
palabras = texto.split()

# 4. Convierta todas las palabras a minúsculas.
palabras = [p.lower() for p in palabras]

# 5. Una nuevamente el texto usando un solo espacio
# entre palabras.
resultado = " ".join(palabras)

# 6. Muestre el resultado final.
print(resultado)
```
:::

### Ejercicio 2: Contador de Palabras Únicas

Desarrolla un programa que:

- Defina una cadena:

```python
"python java python c++ python java"
```

- Convierta el texto a lista usando `split()`.
- Cuente cuántas veces aparece cada palabra.
- Muestre el resultado en formato:

```python
python: 3
java: 2
c++: 1
```

```python run="Practicar >>" hidden
# Desarrolla un programa que:
# 1. Defina una cadena:
# "python java python c++ python java"
# 2. Convierta el texto a lista usando split().
# 3. Cuente cuántas veces aparece cada palabra.
# 4. Muestre el resultado en formato:
# python: 3
# java: 2
# c++: 1
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina una cadena:
# "python java python c++ python java"
texto = "python java python c++ python java"

# 2. Convierta el texto a lista usando split().
palabras = texto.split()

# 3. Cuente cuántas veces aparece cada palabra.
conteo = {}

for palabra in palabras:
	if palabra in conteo:
		conteo[palabra] += 1
	else:
		conteo[palabra] = 1

# 4. Muestre el resultado en formato:
# python: 3
# java: 2
# c++: 1
for clave, valor in conteo.items():
	print(f"{clave}: {valor}")
```
:::

### Ejercicio 3: Transformador de Lista a Texto Estructurado

Crea un programa que:

- Defina una lista de números:

```python
[10, 20, 30, 40, 50]
```

- Convierta cada número a cadena.
- Una los valores usando `join()` con el separador `" - "`.
- El resultado debe ser:

```python
10 - 20 - 30 - 40 - 50
```

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina una lista de números:
# [10, 20, 30, 40, 50]
# 2. Convierta cada número a cadena.
# 3. Una los valores usando join() con el separador " - ".
# 4. El resultado debe ser:
# 10 - 20 - 30 - 40 - 50
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina una lista de números:
# [10, 20, 30, 40, 50]
numeros = [10, 20, 30, 40, 50]

# 2. Convierta cada número a cadena.
numeros_str = [str(n) for n in numeros]

# 3. Una los valores usando join() con el separador " - ".
resultado = " - ".join(numeros_str)

# 4. El resultado debe ser:
# 10 - 20 - 30 - 40 - 50
print(resultado)
```
:::

:::note[Notas Importantes:]
**1.** `split()` divide cadenas en listas.\
**2.** `join()` une listas en cadenas.\
**3.** Es necesario convertir números a texto antes de usar `join()`.
:::

:::tip[Tips de Programación:]
**1.** Usa `split()` para analizar texto.\
2\. Usa `join()` para reconstruir información.\
3\. Combina listas y cadenas para resolver problemas reales.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a convertir datos entre cadenas y listas utilizando los métodos `split()` y `join()`, comprendiendo cómo separar texto en partes manipulables y cómo reconstruirlo de forma organizada. Estas herramientas te permiten procesar información textual de manera eficiente, facilitando tareas como limpieza de datos, análisis de palabras y transformación de información. Dominar estas conversiones es clave para trabajar con datos reales y construir programas más flexibles y potentes en Python.
