---
title: "Listas: Colecciones Ordenadas"
summary: Las listas son estructuras de datos que permiten almacenar múltiples elementos en una misma variable manteniendo un orden específico. En esta unidad aprenderás a crear listas utilizando distintos tipos de datos, acceder a sus elementos mediante índices positivos y negativos, modificar valores existentes, agregar o eliminar elementos y recorrer la lista utilizando estructuras repetitivas. Además, comprenderás cómo las listas permiten representar colecciones dinámicas de información que pueden cambiar durante la ejecución del programa.
order: 1
---

## ¿Qué son las Listas?

Las listas son una de las estructuras de datos más importantes en Python, ya que permiten almacenar múltiples valores dentro de una sola variable manteniendo un orden específico. Cada elemento ocupa una posición llamada índice, lo que permite acceder fácilmente a la información almacenada. Las listas son además mutables, lo que significa que sus elementos pueden modificarse durante la ejecución del programa, convirtiéndolas en una herramienta ideal para trabajar con datos dinámicos como nombres de usuarios, productos, notas académicas o resultados de cálculos.

## Creación de Listas

Una lista se crea utilizando corchetes `[]` y separando los elementos con comas.

```python
numeros = [10, 20, 30, 40]
nombres = ["Ana", "Luis", "Carlos"]
mixta = ["Python", 3.11, True]
```

Una lista puede contener:

- Números.
- Texto.
- Valores booleanos
- Incluso otros objetos o listas.

:::note[Nota:]
Python permite listas con distintos tipos de datos, aunque en programas reales suele mantenerse un mismo tipo para mayor claridad.
:::

## Acceso a Elementos Mediante Índices

Cada elemento tiene una posición que inicia desde 0.

```python
frutas = ["manzana", "pera", "uva"]

print(frutas[0])   # manzana
print(frutas[2])   # uva
```

También existen índices negativos, que empiezan desde el final:

```python
print(frutas[-1])  # uva
```

```python run hidden
frutas = ["manzana", "pera", "uva"]

print(frutas[0])
print(frutas[2])
print(frutas[-1])
```

### Tabla de Índices

| Elemento | Índice Positivo | Índice Negativo |
| --- | --- | --- |
| `"manzana"` | `0` | `-3` |
| `"pera"` | `1` | `-2` |
| `"uva"` | `2` | `-1` |

### Modificar Elementos

Las listas permiten cambiar valores existentes fácilmente.

```python
colores = ["rojo", "azul", "verde"]
colores[1] = "amarillo"

print(colores)
```

```output
['rojo', 'amarillo', 'verde']
```

```python run hidden
colores = ["rojo", "azul", "verde"]
print(colores)

colores[1] = "amarillo"
print(colores)
```

## Agregar Elementos

### Método `append()`

Agrega un elemento al final.

```python
numeros = [1, 2, 3]
numeros.append(4)
```

```python run hidden
numeros = [1, 2, 3]
print(numeros)

numeros.append(4)
print(numeros)
```

### Método `insert()`

Inserta un elemento en una posición específica.

```python
numeros.insert(1, 10)
```

```python run hidden
numeros = [1, 2, 3]
print(numeros)

numeros.insert(1, 10)
print(numeros)
```

## Eliminar Elementos

```python
numeros.pop()        # elimina el último
numeros.remove(10)   # elimina por valor
del numeros[0]       # elimina por índice
```

```python run hidden
numeros = [1, 10, 2, 3]
print(numeros)

numeros.pop()
print(numeros)

numeros.remove(10)
print(numeros)

del numeros[0]
print(numeros)
```

:::tip[Tip:]
`pop()` devuelve el elemento eliminado.\
`remove()` falla si el valor no existe.
:::

## Recorrer Listas

### Usando `for`

```python run
animales = ["perro", "gato", "pez"]

for animal in animales:
	print(animal)
```

### Usando Índices

```python run
animales = ["perro", "gato", "pez"]

for i in range(len(animales)):
	print(animales[i])
```

:::tip[Tip:]
Usa el primer método cuando solo necesitas el valor; usa índices cuando necesitas la posición.
:::

## Operaciones Comunes con Listas

| Operación | Ejemplo | Resultado |
| --- | --- | --- |
| Longitud | `len(lista)` | Cantidad de elementos |
| Concatenar | `a + b` | Une listas |
| Repetir | `lista * 2` | Duplica contenido |
| Verificar | `"Ana" in lista` | `True`/`False` |

## Ejemplo Completo

```python run
estudiantes = ["Ana", "Luis", "Pedro"]
print(estudiantes)

estudiantes.append("Sofía")
print(estudiantes)
estudiantes[0] = "Ana María"
print(estudiantes)

for estudiante in estudiantes:
	print(estudiante)
```

## Ejercicios Prácticos

### Ejercicio 1: Gestión de Notas

Crea un programa que permita gestionar las notas de un estudiante siguiendo estos pasos:

- Crear una lista llamada `notas` con 5 calificaciones numéricas decimales.
- Mostrar la primera y la última nota usando índices.
- Cambiar la tercera nota por un nuevo valor.
- Agregar una nueva nota al final.
- Mostrar todas las notas usando un bucle.
- Mostrar cuántas notas hay en total.

```python run="Practicar >>" hidden
# Crea un programa que permita gestionar las notas de
# un estudiante siguiendo estos pasos:
# 1. Crear una lista llamada notas con 5 calificaciones
# numéricas decimales.
# 2. Mostrar la primera y la última nota usando índices.
# 3. Cambiar la tercera nota por un nuevo valor.
# 4. Agregar una nueva nota al final.
# 5. Mostrar todas las notas usando un bucle.
# 6. Mostrar cuántas notas hay en total
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Crear una lista llamada notas con 5 calificaciones numéricas decimales
notas = [3.5, 4.0, 2.8, 4.5, 3.9]

# 2. Mostrar la primera y la última nota usando índices
print(notas[0])
print(notas[-1])

# 3. Cambiar la tercera nota por un nuevo valor
notas[2] = 3.2

# 4. Agregar una nueva nota al final
notas.append(4.8)

# 5. Mostrar todas las notas usando un bucle
for nota in notas:
	print(nota)

# 6. Mostrar cuántas notas hay en total
print(len(notas))
```
:::

### Ejercicio 2: Lista de Compras

Desarrolla un programa que simule una lista de compras:

- Crear una lista con al menos 4 productos.
- Agregar un nuevo producto usando `append()`.
- Eliminar un producto específico usando `remove()`.
- Mostrar la lista completa.
- Mostrar cada producto junto con su posición usando índices.

```python run="Practicar >>" hidden
# Desarrolla un programa que simule una lista de
# compras:
# 1. Crear una lista con al menos 4 productos.
# 2. Agregar un nuevo producto usando append().
# 3. Eliminar un producto específico usando remove().
# 4. Mostrar la lista completa.
# 5. Mostrar cada producto junto con su posición usando
# índices
```

:::details[Observar posible solución]
```python
# 1. Crear una lista con al menos 4 productos
compras = ["pan", "leche", "huevos", "arroz"]

# 2. Agregar un nuevo producto usando append()
compras.append("queso")

# 3. Eliminar un producto específico usando remove()
compras.remove("leche")

# 4. Mostrar la lista completa
print(compras)

#5. Mostrar cada producto junto con su posición usando índices
for i in range(len(compras)):
	print(i, compras[i])
```

```python run="Probar Solución >>" hidden
# 1. Crear una lista con al menos 4 productos
compras = ["pan", "leche", "huevos", "arroz"]

# 2. Agregar un nuevo producto usando append()
compras.append("queso")

# 3. Eliminar un producto específico usando remove()
compras.remove("leche")

# 4. Mostrar la lista completa
print(compras)

#5. Mostrar cada producto junto con su posición usando
# índices
for i in range(len(compras)):
	print(i, compras[i])
```
:::

### Ejercicio 3: Filtrado de Números

Crea un programa que:

- Cree una lista con 10 números.
- Recorra la lista.
- Muestre únicamente los números mayores que 5.
- Cuente cuántos cumplen la condición.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Cree una lista con 10 números.
# 2. Recorra la lista.
# 3. Muestre únicamente los números mayores que 5.
# 4. Cuente cuántos cumplen la condición
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Cree una lista con 10 números
numeros = [1, 7, 3, 9, 2, 8, 6, 4, 10, 5]

# 2. Recorra la lista
contador = 0

for numero in numeros:
	# 3. Muestre únicamente los números mayores que 5
	if numero > 5:
		print(numero)
		# 4. Cuente cuántos cumplen la condición
		contador += 1

print("Cantidad:", contador)
```
:::

:::note[Notas:]
**1.** Las listas son mutables.\
**2.** Los índices comienzan en 0.\
**3.** Permiten almacenar colecciones dinámicas.\
**4.** Son fundamentales para casi cualquier programa en Python.
:::

:::tip[Tips de Aprendizaje:]
**1.** Usa nombres descriptivos para tus listas (`estudiantes`, `productos`).\
**2.** Practica modificar listas mientras el programa se ejecuta.\
**3.** Combina listas con bucles para automatizar tareas repetitivas.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste que las listas son estructuras de datos ordenadas y mutables que permiten almacenar múltiples valores dentro de una sola variable. Comprendiste cómo crearlas, acceder a sus elementos mediante índices positivos y negativos, modificarlas, agregar y eliminar información y recorrerlas utilizando bucles. Estas habilidades constituyen una base esencial para el manejo de datos en Python, ya que las listas permiten representar información dinámica y facilitan la automatización de procesos, preparando el camino para trabajar con estructuras de datos más avanzadas y programas de mayor complejidad.
