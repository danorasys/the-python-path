---
title: Métodos Útiles de Listas
summary: En esta unidad se estudian los métodos incorporados de Python que facilitan la manipulación de listas. Aprenderás a utilizar funciones como `append()` para agregar elementos, `remove()` para eliminar valores específicos, `sort()` para ordenar datos, `reverse()` para invertir el orden y `count()` para contar ocurrencias dentro de la lista. Se enfatiza cómo estos métodos permiten escribir código más limpio, reducir operaciones manuales y mejorar la organización y el procesamiento de colecciones de datos.
order: 2
---

Las listas no solo permiten almacenar múltiples elementos, sino que también incluyen métodos incorporados que facilitan su manipulación de manera rápida y eficiente. En lugar de crear soluciones complejas manualmente, Python ofrece funciones listas para usar que permiten agregar, eliminar, ordenar y analizar datos con pocas líneas de código. En esta unidad aprenderás a utilizar métodos fundamentales como `append()`, `remove()`, `sort()`, `reverse()` y `count()`, comprendiendo cómo ayudan a escribir programas más claros, organizados y fáciles de mantener.

## ¿Qué es un Método?

Un método es una función que pertenece a un objeto (en este caso, una lista) y se utiliza usando la siguiente estructura:

```python
lista.metodo()
```

Ejemplo:

```python
numeros = [1, 2, 3, 4, 5]
numeros.append(10)
```

Aquí, `append()` es un método aplicado a la lista `numeros`.

```python run hidden
numeros = [1, 2, 3, 4, 5]
numeros.append(10)

print(numeros)
```

:::note[Nota:]
Los métodos modifican directamente la lista original; no crean una nueva lista (en la mayoría de los casos).
:::

## Método `append()`: Agregar Elementos

Permite añadir un elemento al final de la lista.

```python run
frutas = ["manzana", "pera"]
frutas.append("uva")

print(frutas)
```

```output
['manzana', 'pera', 'uva']
```

:::tip[Tip:]
`append()` agrega un solo elemento cada vez. Si agregas una lista, se insertará como un único elemento:
:::

```python
lista.append([1, 2])
```

## Método `remove()`: Eliminar por Valor

Elimina el primer elemento que coincida con el valor indicado.

```python run
numeros = [1, 2, 3, 2]
numeros.remove(2)

print(numeros)
```

```output
[1, 3, 2]
```

:::note[Nota:]
Si el valor no existe, Python genera un error.
:::

## Método `sort()`: Ordenar Listas

Ordena los elementos automáticamente.

```python run
numeros = [5, 2, 9, 1]
numeros.sort()

print(numeros)
```

```output
[1, 2, 5, 9]
```

### Orden Descendente

```python run
numeros = [5, 2, 9, 1]
numeros.sort(reverse=True)

print(numeros)
```

```output
[9, 5, 2, 1]
```

### Tabla de Comportamiento

| Lista Original | Después de `sort()` |
| --- | --- |
| `[3,1,2]` | `[1,2,3]` |
| `["c","a","b"]` | `["a","b","c"]` |

:::note[Nota:]
Todos los elementos deben ser comparables entre sí (no mezclar números y texto).
:::

## Método `reverse()`: Invertir el Orden

Invierte el orden actual de la lista.

```python run
valores = [1, 2, 3, 4]
valores.reverse()

print(valores)
```

```output
[4, 3, 2, 1]
```

:::note[Nota:]
`reverse()` no ordena, solo cambia el orden existente.
:::

## Método `count()`: Contar Ocurrencias

Cuenta cuántas veces aparece un valor dentro de la lista.

```python run
numeros = [1, 2, 2, 3, 2]
print(numeros.count(2))
```

```output
3
```

## Resumen de Métodos Aprendidos

| Método | Propósito | Modifica la Lista |
| --- | --- | --- |
| `append()` | Agregar elemento | :check |
| `remove()` | Eliminar por valor | :check |
| `sort()` | Ordenar | :check |
| `reverse()` | Invertir orden | :check |
| `count()` | Contar ocurrencias | :cross |

## Ejemplo Integrador

```python run
numeros = [4, 1, 3, 1, 5]

numeros.append(2)
numeros.remove(1)
numeros.sort()

print(numeros.count(1))
print(numeros)
```

```output
1
[1, 2, 3, 4, 5]
```

:::note[Nota:]
Observa cómo varios métodos pueden combinarse para procesar datos paso a paso sin crear estructuras adicionales.
:::

## Ejercicios Prácticos

### Ejercicio 1: Registro de Estudiantes

Crea un programa que gestione una lista de estudiantes siguiendo estas instrucciones:

- Crear una lista llamada `estudiantes` con al menos 4 nombres.
- Agregar un nuevo estudiante usando `append()`.
- Eliminar un estudiante específico usando `remove()`.
- Ordenar la lista alfabéticamente.
- Mostrar la lista final.
- Contar cuántas veces aparece un nombre específico.

```python run="Practicar >>" hidden
# Crea un programa que gestione una lista de
# estudiantes siguiendo estas instrucciones:
# 1. Crear una lista llamada estudiantes con al menos 4
# nombres.
# 2. Agregar un nuevo estudiante usando append().
# 3. Eliminar un estudiante específico usando remove().
# 4. Ordenar la lista alfabéticamente.
# 5. Mostrar la lista final.
# Contar cuántas veces aparece un nombre específico
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Crear una lista llamada estudiantes con al menos 4 nombres
estudiantes = ["Carlos", "Ana", "Luis", "Ana"]

# 2. Agregar un nuevo estudiante usando append()
estudiantes.append("Sofía")
# 3. Eliminar un estudiante específico usando remove()
estudiantes.remove("Luis")
# 4. Ordenar la lista alfabéticamente
estudiantes.sort()

# 5. Mostrar la lista final
print(estudiantes)
# 6. Contar cuántas veces aparece un nombre específico
print(estudiantes.count("Ana"))
```
:::

### Ejercicio 2: Análisis de Números

Desarrolla un programa que:

- Cree una lista con 8 números enteros (algunos repetidos).
- Muestre cuántas veces aparece un número elegido.
- Ordene los números de menor a mayor.
- Invierta el orden usando `reverse()`.
- Muestre la lista después de cada operación.

```python run="Practicar >>" hidden
# Desarrolla un programa que:
# 1. Cree una lista con 8 números enteros (algunos
# repetidos).
# 2. Muestre cuántas veces aparece un número elegido.
# 3. Ordene los números de menor a mayor.
# 4. Invierta el orden usando reverse().
# 5. Muestre la lista después de cada operación
```

:::details[Observar posible solución]
```python
# 1. Cree una lista con 8 números enteros (algunos repetidos)
numeros = [5, 3, 8, 3, 1, 9, 3, 2]

# 2. Muestre cuántas veces aparece un número elegido
print(numeros.count(3))

# 3. Ordene los números de menor a mayor
numeros.sort()
# 5. Muestre la lista después de cada operación
print(numeros)

# 4. Invierta el orden usando reverse()
numeros.reverse()
# 5. Muestre la lista después de cada operación
print(numeros)
```

```python run="Probar Solución >>" hidden
# 1. Cree una lista con 8 números enteros (algunos
# repetidos)
numeros = [5, 3, 8, 3, 1, 9, 3, 2]

# 2. Muestre cuántas veces aparece un número elegido
print(numeros.count(3))

# 3. Ordene los números de menor a mayor
numeros.sort()
# 5. Muestre la lista después de cada operación
print(numeros)

# 4. Invierta el orden usando reverse()
numeros.reverse()
# 5. Muestre la lista después de cada operación
print(numeros)
```
:::

### Ejercicio 3: Inventario Simple

Simula un pequeño inventario siguiendo estos pasos:

- Crear una lista con productos.
- Agregar dos productos nuevos.
- Eliminar un producto agotado.
- Ordenar los productos.
- Mostrar el inventario final.
- Mostrar cuántas veces aparece un producto específico.

```python run="Practicar >>" hidden
# Simula un pequeño inventario siguiendo estos pasos:
# 1. Crear una lista con productos.
# 2. Agregar dos productos nuevos.
# 3. Eliminar un producto agotado.
# 4. Ordenar los productos.
# 5. Mostrar el inventario final.
# 6. Mostrar cuántas veces aparece un producto
# específico
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Crear una lista con productos
inventario = ["pan", "leche", "arroz", "pan"]

# 2. Agregar dos productos nuevos
inventario.append("huevos")
inventario.append("queso")

# 3. Eliminar un producto agotado
inventario.remove("leche")

# 4. Ordenar los productos
inventario.sort()

# 5. Mostrar el inventario final
print(inventario)
# 6. Mostrar cuántas veces aparece un producto
# específico
print(inventario.count("pan"))
```
:::

:::note[Notas:]
**1.** Los métodos simplifican tareas comunes.\
**2.** La mayoría modifica la lista original.\
**3.** Permiten escribir código más corto y legible.\
**4.** Son esenciales para manipular datos dinámicos.
:::

:::tip[Tips:]
**1.** Practica aplicando varios métodos seguidos.\
**2.** Imprime la lista después de cada cambio para entender qué ocurre.\
**3.** Aprende cuándo usar `sort()` y cuándo usar `reverse()` (no son lo mismo).
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a utilizar métodos incorporados de Python que permiten manipular listas de manera eficiente y organizada. Comprendiste cómo agregar elementos con `append()`, eliminar valores mediante `remove()`, ordenar datos usando `sort()`, invertir el orden con `reverse()` y contar ocurrencias con `count()`. Estos métodos reducen la complejidad del código, evitan operaciones manuales innecesarias y facilitan el procesamiento de colecciones de datos, convirtiéndose en herramientas fundamentales para trabajar con información en programas reales.
