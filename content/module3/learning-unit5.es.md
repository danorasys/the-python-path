---
title: Conjuntos (sets)
summary: Los conjuntos o sets son estructuras de datos que almacenan elementos únicos sin mantener un orden específico, evitando automáticamente valores duplicados. En esta unidad aprenderás cómo crear conjuntos, agregar y eliminar elementos y aplicar operaciones matemáticas entre conjuntos como unión, intersección y diferencia. Además, se analizarán casos prácticos donde los conjuntos permiten simplificar problemas relacionados con comparación de datos, filtrado de duplicados y análisis de coincidencias entre colecciones.
order: 5
---

Los conjuntos o sets son estructuras de datos que permiten almacenar colecciones de elementos únicos, es decir, sin valores duplicados, y sin mantener un orden específico. Esto los convierte en una herramienta muy útil cuando se necesita eliminar repeticiones automáticamente o comparar grupos de datos. En esta unidad aprenderás a crear conjuntos, agregar y eliminar elementos y realizar operaciones matemáticas como unión, intersección y diferencia. También descubrirás cómo los conjuntos simplifican problemas comunes relacionados con coincidencias entre datos y filtrado de información repetida.

## ¿Qué es un Set?

Un set es una colección:

- Sin elementos duplicados.
- Sin orden definido.
- Modificable (puede cambiar).

Se define usando llaves `{}`.

```python
numeros = {1, 2, 3, 4}
```

:::note[Nota:]
Aunque usan `{}`, los sets no son diccionarios porque no tienen claves ni valores.
:::

## Eliminación Automática de Duplicados

```python run
datos = {1, 2, 2, 3, 3, 3}
print(datos)
```

```output
{1, 2, 3}
```

:::tip[Tip:]
Los sets son la forma más sencilla de eliminar duplicados de una colección.
:::

## Crear Conjuntos

### Desde Valores Directos

```python run
frutas = {"manzana", "pera", "uva"}
print(frutas)
```

```output
{'manzana', 'uva', 'pera'}
```

### Desde una Lista

```python run
numeros = set([1, 2, 2, 3])
print(numeros)
```

```output
{1, 2, 3}
```

### Set Vacío

Un set vacío se crea con:

```python
conjunto = set()
```

No con `{}`, porque eso crea un diccionario vacío.

## Agregar Elementos

Se utiliza el método `add()`:

```python run
colores = {"rojo", "azul"}
colores.add("verde")

print(colores)
```

```output
{'verde', 'azul', 'rojo'}
```

## Eliminar Elementos

### Con `remove()`

```python
colores.remove("azul")
```

```output
{'rojo', 'verde'}
```

```python run hidden
colores = {"rojo", "azul"}
colores.add("verde")

colores.remove("azul")

print(colores)
```

Genera error si el elemento no existe.

### Con `discard()` (Más Seguro)

```python run
colores = {"rojo", "azul"}

colores.discard("amarillo")

print(colores)
```

```output
{'azul', 'rojo'}
```

No produce error si no está presente.

:::tip[Tip:]
Usa `discard()` cuando no estés seguro de que el elemento exista.
:::

## Recorrer un Conjunto

```python run
numeros = {1, 2, 3}

for numero in numeros:
	print(numero)
```

```output
1
2
3
```

:::note[Nota:]
El orden puede cambiar cada vez que ejecutes el programa.
:::

## Operaciones Matemáticas Entre Conjuntos

Los sets permiten aplicar operaciones similares a la teoría de conjuntos en matemáticas.

### Unión (`|`)

Combina todos los elementos sin repetir.

```python run
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)
```

```output
{1, 2, 3, 4, 5}
```

### Intersección (`&`)

Elementos en común.

```python run
a = {1, 2, 3}
b = {3, 4, 5}

print(a & b)
```

```output
{3}
```

### Diferencia (`-`)

Elementos que están en un conjunto pero no en otro.

```python run
a = {1, 2, 3}
b = {3, 4, 5}

print(a - b)
```

```output
{1, 2}
```

### Resumen de Operaciones

| Operación | Símbolo | Resultado |
| --- | --- | --- |
| Unión | `\|` | Combina todos los elementos sin repetir |
| Intersección | `&` | Coincidencias |
| Diferencia | `-` | Elementos únicos |

## Ejemplo

Comparar estudiantes inscritos en dos cursos:

```python run
python = {"Ana", "Luis", "Carlos"}
java = {"Carlos", "Sofía", "Ana"}

print(python & java)
```

```output
{'Carlos', 'Ana'}
```

:::tip[Tip:]
Los sets son ideales para análisis de coincidencias y filtros rápidos.
:::

## Ejemplo Integrador

```python run
clientes_dia1 = {"Ana", "Luis", "Pedro"}
clientes_dia2 = {"Luis", "Pedro", "Sofía"}

print("Todos:", clientes_dia1 | clientes_dia2)
print("Repetidos:", clientes_dia1 & clientes_dia2)
print("Solo día 1:", clientes_dia1 - clientes_dia2)
```

```output
Todos: {'Pedro', 'Luis', 'Sofía', 'Ana'}
Repetidos: {'Pedro', 'Luis'}
Solo día 1: {'Ana'}
```

## Ejercicios Prácticos

### Ejercicio 1: Eliminación de Duplicados

Crea un programa que:

- Defina una lista con números repetidos.
- Convierta la lista en un set.
- Muestre el resultado sin duplicados.
- Recorra el set mostrando cada elemento.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina una lista con números repetidos.
# 2. Convierta la lista en un set.
# 3. Muestre el resultado sin duplicados.
# 4. Recorra el set mostrando cada elemento
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina una lista con números repetidos
numeros = [1, 2, 2, 3, 4, 4, 5]

# 2. Convierta la lista en un set
conjunto = set(numeros)

# 3. Muestre el resultado sin duplicados
print(conjunto)

# 4. Recorra el set mostrando cada elemento
for n in conjunto:
	print(n)
```
:::

### Ejercicio 2: Comparación de Grupos

Desarrolla un programa que:

- Cree dos sets con nombres de estudiantes.
- Muestre todos los estudiantes (unión).
- Muestre estudiantes en ambos grupos (intersección).
- Estudiantes solo del primer grupo (diferencia).
- Imprima cada resultado con un mensaje descriptivo.

```python run="Practicar >>" hidden
# Desarrolla un programa que:
# 1. Cree dos sets con nombres de estudiantes.
# 2. Muestre todos los estudiantes (unión).
# 3. Muestre estudiantes en ambos grupos (intersección).
# 4. Estudiantes solo del primer grupo (diferencia).
# 5. Imprima cada resultado con un mensaje descriptivo
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Cree dos sets con nombres de estudiantes
grupo_a = {"Ana", "Luis", "Pedro"}
grupo_b = {"Pedro", "Sofía", "Ana"}

# 5. Imprima cada resultado con un mensaje descriptivo

# 2. Muestre todos los estudiantes (unión)
print("Unión:", grupo_a | grupo_b)
# 3. Muestre estudiantes en ambos grupos (intersección)
print("Intersección:", grupo_a & grupo_b)
# 4. Estudiantes solo del primer grupo (diferencia)
print("Solo A:", grupo_a - grupo_b)
```
:::

### Ejercicio 3: Control de Acceso

Simula un sistema simple donde:

- Existe un set llamado `usuarios_autorizados`.
- Agrega un nuevo usuario.
- Elimina un usuario existente.
- Recorre el set mostrando los usuarios actuales.
- Comprueba si un usuario específico pertenece al conjunto usando `in`.

```python run="Practicar >>" hidden
# Simula un sistema simple donde:
# 1. Existe un set llamado usuarios_autorizados.
# 2. Agrega un nuevo usuario.
# 3. Elimina un usuario existente.
# 4. Recorre el set mostrando los usuarios actuales.
# 5. Comprueba si un usuario específico pertenece al
# conjunto usando in
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Existe un set llamado usuarios_autorizados
usuarios_autorizados = {"ana", "luis", "carlos"}

# 2. Agrega un nuevo usuario
usuarios_autorizados.add("sofia")
# 3. Elimina un usuario existente
usuarios_autorizados.remove("luis")

# 4. Recorre el set mostrando los usuarios actuales
for usuario in usuarios_autorizados:
	print(usuario)

# 5. Comprueba si un usuario específico pertenece al
# conjunto usando in
print("ana" in usuarios_autorizados)
```
:::

:::note[Notas:]
**1.** Los sets no permiten duplicados.\
**2.** No mantienen orden.\
**3.** Son ideales para comparaciones rápidas.\
**4.** Permiten operaciones matemáticas entre colecciones.
:::

:::tip[Tips:]
**1.** Usa sets cuando solo importe la existencia de un elemento.\
**2.** Son más eficientes que listas para buscar coincidencias.\
**3.** Perfectos para limpiar datos repetidos.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a trabajar con conjuntos o sets como estructuras diseñadas para almacenar elementos únicos sin orden específico. Comprendiste cómo crearlos, agregar y eliminar elementos, recorrerlos y aplicar operaciones matemáticas como unión, intersección y diferencia. También descubriste cómo los sets simplifican problemas comunes relacionados con comparación de datos y eliminación de duplicados, convirtiéndose en una herramienta poderosa para el análisis y procesamiento eficiente de información.
