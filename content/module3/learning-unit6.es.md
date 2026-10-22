---
title: Recorriendo Estructuras de Datos
summary: Esta unidad se centra en las diferentes formas de recorrer estructuras de datos utilizando bucles en Python. Aprenderás a utilizar ciclos `for` simples y anidados, la función `len()` para obtener el tamaño de colecciones y la función `enumerate()` para acceder simultáneamente al índice y al valor de los elementos. Se busca desarrollar la capacidad de procesar información almacenada en listas, tuplas, diccionarios y conjuntos, para trabajar con estructuras de datos más complejas.
order: 6
---

Recorrer estructuras de datos es una de las habilidades más importantes en programación, ya que permite analizar, procesar y transformar información almacenada en colecciones como listas, tuplas, diccionarios y conjuntos. En esta unidad aprenderás a utilizar bucles `for` para recorrer distintos tipos de estructuras, emplear la función `len()` para conocer el tamaño de una colección y usar `enumerate()` para obtener simultáneamente el índice y el valor de cada elemento. Además, se estudiarán bucles anidados, los cuales permiten trabajar con estructuras más complejas como listas dentro de listas o colecciones múltiples. Estas herramientas son fundamentales para desarrollar programas capaces de procesar datos de manera eficiente.

## Recorrer Estructuras con `for`

El bucle `for` permite recorrer automáticamente todos los elementos de una colección.

### Ejemplo con una Lista

```python run
frutas = ["manzana", "pera", "uva"]

for fruta in frutas:
    print(fruta)
```

```output
manzana
pera
uva
```

:::note
El bucle `for` es la forma más común y segura de recorrer colecciones en Python.
:::

## Usar `len()` para Conocer el Tamaño

La función `len()` devuelve la cantidad de elementos de una estructura de datos.

```python run
numeros = [10, 20, 30, 40]

print(len(numeros))
```

```output
4
```

### Recorrer Usando Índices

Cuando necesitamos conocer la posición de cada elemento, podemos combinar `len()` con `range()`.

```python run
nombres = ["Ana", "Luis", "Carlos"]

for i in range(len(nombres)):
    print(i, nombres[i])
```

```output
0 Ana
1 Luis
2 Carlos
```

:::tip
Este método es útil cuando necesitas modificar elementos por posición.
:::

## Usar `enumerate()`

La función `enumerate()` permite obtener el índice y el valor al mismo tiempo.

```python run
estudiantes = ["Ana", "Luis", "Pedro"]

for indice, estudiante in enumerate(estudiantes):
    print(indice, estudiante)
```

```output
0 Ana
1 Luis
2 Pedro
```

## Comparación de Métodos

| Método | Qué Permite |
| --- | --- |
| `for elemento in lista` | Obtener solo valores |
| `range(len(lista))` | Obtener índices |
| `enumerate(lista)` | Obtener índice y valor |

## Recorrer Diferentes Estructuras de Datos

### Recorrer Tuplas

```python run
coordenadas = (10, 20, 30)

for valor in coordenadas:
    print(valor)
```

```output
10
20
30
```

### Recorrer Conjuntos

```python run
numeros = {1, 2, 3}

for n in numeros:
    print(n)
```

```output
1
2
3
```

:::note
El orden puede variar.
:::

### Recorrer Diccionarios

#### Recorrer Claves

```python run
persona = {"nombre": "Ana", "edad": 25}

for clave in persona:
    print(clave)
```

```output
nombre
edad
```

#### Recorrer Valores

```python run
persona = {"nombre": "Ana", "edad": 25}

for valor in persona.values():
    print(valor)
```

```output
Ana
25
```

#### Recorrer Claves y Valores

```python run
persona = {"nombre": "Ana", "edad": 25}

for clave, valor in persona.items():
    print(clave, valor)
```

```output
nombre Ana
edad 25
```

:::tip
`items()` es la forma más completa de recorrer diccionarios.
:::

## Bucles Anidados

Un bucle anidado es un bucle dentro de otro.

Se utiliza para trabajar con estructuras más complejas.

### Ejemplo: Lista Dentro de Lista

```python run
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for fila in matriz:
    for numero in fila:
        print(numero)
```

```output
1
2
3
4
5
6
7
8
9
```

:::note
Los bucles anidados permiten recorrer estructuras multidimensionales.
:::

## Ejemplo Integrador

```python run
productos = ["Laptop", "Mouse", "Teclado"]

for indice, producto in enumerate(productos):
    print("Producto", indice, ":", producto)
```

```output
Producto 0 : Laptop
Producto 1 : Mouse
Producto 2 : Teclado
```

## Ejercicios Prácticos

### Ejercicio 1. Recorrer una Lista de Estudiantes

Crea un programa que:

- Defina una lista llamada `estudiantes` con al menos 5 nombres.
- Recorra la lista usando un bucle `for`.
- Imprima cada nombre.
- Después, use `enumerate()` para mostrar el número de posición y el nombre del estudiante.
- Finalmente, muestre cuántos estudiantes hay en la lista utilizando `len()`.

```python practice
# Crea un programa que:
# 1. Defina una lista llamada estudiantes con al menos
# 5 nombres.
# 2. Recorra la lista usando un bucle for.
# 3. Imprima cada nombre.
# 4. Después, use enumerate() para mostrar el número de
# posición y el nombre del estudiante.
# 5. Finalmente, muestre cuántos estudiantes hay en la
# lista utilizando len()
```

:::details
```python run
# 1. Defina una lista llamada estudiantes con al menos
# 5 nombres
estudiantes = ["Ana", "Luis", "Carlos", "Sofía", "Pedro"]

# 2. Recorra la lista usando un bucle for
# 3. Imprima cada nombre
for estudiante in estudiantes:
    print(estudiante)

# 4. Después, use enumerate() para mostrar el número de
# posición y el nombre del estudiante
for indice, estudiante in enumerate(estudiantes):
    print(indice, estudiante)

# 5. Finalmente, muestre cuántos estudiantes hay en la
# lista utilizando len()
print("Total:", len(estudiantes))
```
:::

### Ejercicio 2: Recorrer un Diccionario

Crea un programa que:

- Defina un diccionario llamado producto con: nombre, precio y stock.
- Recorra el diccionario mostrando solo las claves.
- Luego muestre únicamente los valores.
- Finalmente recorra el diccionario mostrando clave y valor juntos.

```python practice
# Crea un programa que:
# 1. Defina un diccionario llamado producto con:
# nombre, precio y stock.
# 2. Recorra el diccionario mostrando solo las claves.
# 3. Luego muestre únicamente los valores.
# 4. Finalmente recorra el diccionario mostrando clave
# y valor juntos
```

:::details
```python run
# 1. Defina un diccionario llamado producto con:
# nombre, precio y stock
producto = {
    "nombre": "Laptop",
    "precio": 1200,
    "stock": 5
}

# 2. Recorra el diccionario mostrando solo las claves
for clave in producto:
    print(clave)

# 3. Luego muestre únicamente los valores
for valor in producto.values():
    print(valor)

# 4. Finalmente recorra el diccionario mostrando clave
# y valor juntos
for clave, valor in producto.items():
    print(clave, valor)
```
:::

### Ejercicio 3: Matriz de Números

Crea un programa que:

- Defina una lista que contenga tres listas internas con números.
- Utilice bucles anidados para recorrer todos los números.
- Imprima cada número.
- Calcule la suma total de todos los valores.

```python practice
# Crea un programa que:
# 1. Defina una lista que contenga tres listas internas
# con números.
# 2. Utilice bucles anidados para recorrer todos los
# números.
# 3. Imprima cada número.
# 4. Calcule la suma total de todos los valores
```

:::details
```python run
# 1. Defina una lista que contenga tres listas internas
# con números
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

suma = 0

# 2. Utilice bucles anidados para recorrer todos los
# números
for fila in matriz:
    for numero in fila:
        # 3. Imprima cada número
        print(numero)
        suma += numero

# 4. Calcule la suma total de todos los valores
print("Suma total:", suma)
```
:::

## Notas Importantes

:::note[Notas Importantes:]
**1.** El bucle `for` es la herramienta principal para recorrer estructuras.\
**2.** `len()` permite conocer el tamaño de las colecciones.\
**3.** `enumerate()` facilita trabajar con índice y valor al mismo tiempo.\
**4.** Los bucles anidados permiten procesar estructuras complejas.
:::

:::tip[Tips de Aprendizaje:]
**1.** Practica recorriendo distintos tipos de estructuras.\
**2.** Usa `enumerate()` para escribir código más limpio.\
**3.** Combina bucles con estructuras de datos para resolver problemas reales.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste diferentes formas de recorrer estructuras de datos en Python utilizando bucles `for`, la función `len()` para conocer el tamaño de las colecciones y `enumerate()` para acceder simultáneamente al índice y al valor de los elementos. También exploraste cómo recorrer listas, tuplas, diccionarios y conjuntos, así como el uso de bucles anidados para trabajar con estructuras más complejas. Estas habilidades son fundamentales para procesar información almacenada en colecciones y constituyen una base esencial para desarrollar programas más avanzados y eficientes.
