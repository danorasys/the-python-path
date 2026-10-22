---
title: "Diccionarios: Claves y Valores"
summary: Los diccionarios permiten almacenar información mediante pares clave-valor, facilitando la representación de datos estructurados y relacionados entre sí. En esta unidad aprenderás a crear diccionarios, acceder a valores mediante sus claves, modificar información existente, agregar nuevos elementos y recorrer el diccionario utilizando bucles. Se abordará cómo esta estructura resulta ideal para modelar objetos del mundo real, como usuarios, productos o configuraciones, donde cada dato posee un identificador único.
order: 4
---

Los diccionarios son estructuras de datos que permiten almacenar información utilizando pares **clave–valor**, lo que facilita organizar datos relacionados de forma clara y estructurada. A diferencia de listas o tuplas, donde se accede mediante posiciones numéricas, en los diccionarios cada dato se identifica mediante una **clave única**. En esta unidad aprenderás a crear diccionarios, acceder a sus valores, modificar información, agregar nuevos elementos y recorrerlos usando bucles. También comprenderás cómo los diccionarios permiten modelar situaciones reales como usuarios, productos o configuraciones dentro de un programa.

## ¿Qué es un diccionario?

Un diccionario es una colección de datos donde cada elemento tiene:

- Una **clave (key)** → identificador.
- Un **valor (value)** → información asociada.

Se define usando llaves `{}`.

```python
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}
```

:::note[Nota:]
Las claves deben ser únicas dentro del diccionario.
:::

## Acceder a Valores

Se accede usando la clave en lugar de un índice.

```python run
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

print(persona["nombre"])
print(persona["edad"])
```

```output
Ana
25
```

:::tip[Tip:]
Piensa en el diccionario como una agenda: buscas información usando el nombre del contacto, no su posición.
:::

## Modificar Valores

Puedes cambiar información existente fácilmente:

```python
persona["edad"] = 26
print(persona)
```

```output
{'nombre': 'Ana', 'edad': 26, 'pais': 'Colombia'}
```

```python run hidden
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

persona["edad"] = 26
print(persona)
```

## Agregar Nuevos Elementos

Si la clave no existe, Python la crea automáticamente.

```python
persona["profesion"] = "Ingeniera"
print(persona)
```

```output
{'nombre': 'Ana', 'edad': 26, 'pais': 'Colombia', 'profesion': 'Ingeniera'}
```

```python run hidden
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

persona["edad"] = 26
persona["profesion"] = "Ingeniera"
print(persona)
```

:::note[Nota:]
No necesitas un método especial para agregar datos; basta con asignar un valor a una nueva clave.
:::

## Eliminar Elementos

```python
del persona["pais"]
print(persona)
```

```output
{'nombre': 'Ana', 'edad': 26, 'profesion': 'Ingeniera'}
```

```python run hidden
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

persona["edad"] = 26
persona["profesion"] = "Ingeniera"

del persona["pais"]

print(persona)
```

## Recorrer un Diccionario

### Recorrer Claves

```python run
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

for clave in persona:
	print(clave)
```

```output
nombre
edad
pais
```

### Recorrer Valores

```python run
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

for valor in persona.values():
	print(valor)
```

```output
Ana
25
Colombia
```

### Recorrer Claves y Valores

```python run
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

for clave, valor in persona.items():
	print(clave, valor)
```

```output
nombre Ana
edad 25
pais Colombia
```

:::tip[Tip:]
`items()` es la forma más completa de recorrer un diccionario.
:::

## Métodos Útiles de Diccionarios

| Método | Propósito |
| --- | --- |
| `keys()` | Obtiene claves |
| `values()` | Obtiene valores |
| `items()` | Claves y valores |
| `get()` | Acceso seguro |

### Uso de `get()` (Acceso Seguro)

```python
print(persona.get("telefono"))
```

```output
None
```

```python run hidden
persona = {
	"nombre": "Ana",
	"edad": 25,
	"pais": "Colombia"
}

print(persona.get("telefono"))
```

Si la clave no existe, devuelve `None` en lugar de error.

:::note[Nota:]
Usar `get()` evita que el programa se detenga cuando una clave no está presente.
:::

## Ejemplo del Mundo Real

```python run
producto = {
	"nombre": "Laptop",
	"precio": 1200,
	"stock": 5
}

print(producto["nombre"])
```

```output
Laptop
```

Los diccionarios permiten representar objetos reales fácilmente.

## Ejemplo Integrador

```python run
usuario = {
	"username": "daniel",
	"activo": True,
	"edad": 20
}

usuario["edad"] = 22
usuario["email"] = "correo@email.com"

for clave, valor in usuario.items():
	print(clave, ":", valor)
```

```output
username : daniel
activo : True
edad : 22
email : correo@email.com
```

## Ejercicios Prácticos

### Ejercicio 1: Perfil de Usuario

Crea un programa que realice lo siguiente:

- Crea un diccionario llamado `usuario` con: nombre, edad y país.
- Mostrar el nombre del usuario.
- Cambiar la edad por un nuevo valor.
- Agregar una nueva clave llamada `"email"`.
- Recorrer el diccionario mostrando clave y valor.
- Eliminar el país del diccionario.
- Mostrar el diccionario final.

```python run="Practicar >>" hidden
# Crea un programa que realice lo siguiente:
# 1. Crea un diccionario llamado usuario con: nombre,
# edad y país.
# 2. Mostrar el nombre del usuario.
# 3. Cambiar la edad por un nuevo valor.
# 4. Agregar una nueva clave llamada "email".
# 5. Recorrer el diccionario mostrando clave y valor.
# 6. Eliminar el país del diccionario.
# 7. Mostrar el diccionario final
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Crea un diccionario llamado usuario con: nombre,
# edad y país
usuario = {
	"nombre": "Carlos",
	"edad": 28,
	"pais": "México"
}

# 2. Mostrar el nombre del usuario
print(usuario["nombre"])

# 3. Cambiar la edad por un nuevo valor
usuario["edad"] = 29
# 4. Agregar una nueva clave llamada "email"
usuario["email"] = "carlos@email.com"

# 5. Recorrer el diccionario mostrando clave y valor
for clave, valor in usuario.items():
	print(clave, valor)

# 6. Eliminar el país del diccionario
del usuario["pais"]

# 7. Mostrar el diccionario final
print(usuario)
```
:::

### Ejercicio 2: Inventario de Producto

Desarrolla un programa que:

- Cree un diccionario llamado `producto`.
- Incluya: nombre, precio y cantidad.
- Aumente la cantidad disponible.
- Muestre solo los valores del diccionario.
- Use `get()` para intentar acceder a una clave inexistente llamada `"categoria"`.

```python run="Practicar >>" hidden
# Desarrolla un programa que:
# 1. Cree un diccionario llamado producto.
# 2. Incluya: nombre, precio y cantidad.
# 3. Aumente la cantidad disponible.
# 4. Muestre solo los valores del diccionario.
# 5. Use get() para intentar acceder a una clave
# inexistente llamada "categoria"
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Cree un diccionario llamado producto
# 2. Incluya: nombre, precio y cantidad
producto = {
	"nombre": "Mouse",
	"precio": 25,
	"cantidad": 10
}

# 3. Aumente la cantidad disponible
producto["cantidad"] = 15

# 4. Muestre solo los valores del diccionario
for valor in producto.values():
	print(valor)

# 5. Use get() para intentar acceder a una clave
# inexistente llamada "categoria"
print(producto.get("categoria"))
```
:::

### Ejercicio 3: Registro de Estudiantes

Crea un programa que:

- Defina un diccionario donde las claves sean nombres de estudiantes y los valores sus notas (Números decimales).
- Agregue un nuevo estudiante.
- Modifique la nota de uno existente.
- Muestre todos los estudiantes y sus notas.
- Calcule cuántos estudiantes hay usando `len()`.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina un diccionario donde las claves sean
# nombres de estudiantes y los valores sus notas
# (Números decimales).
# 2. Agregue un nuevo estudiante.
# 3. Modifique la nota de uno existente.
# 4. Muestre todos los estudiantes y sus notas.
# 5. Calcule cuántos estudiantes hay usando len()
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina un diccionario donde las claves sean
# nombres de estudiantes y los valores sus notas
# (Números decimales)
notas = {
	"Ana": 4.5,
	"Luis": 3.8,
	"Sofía": 4.9
}

# 2. Agregue un nuevo estudiante
notas["Carlos"] = 4.2
# 3. Modifique la nota de uno existente
notas["Luis"] = 4.0

# 4. Muestre todos los estudiantes y sus notas
for nombre, nota in notas.items():
	print(nombre, nota)

# 5. Calcule cuántos estudiantes hay usando len()
print(len(notas))
```
:::

:::note[Notas:]
**1.** Los diccionarios usan claves en lugar de índices.\
**2.** Cada clave debe ser única.\
**3.** Permiten representar información estructurada.\
**4.** Son fundamentales en aplicaciones reales.
:::

:::tip[Tips:]
**1.** Usa nombres claros para las claves.\
**2.** Piensa en los diccionarios como objetos del mundo real.\
**3.** Practica recorriéndolos con `items()` para entender su estructura.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a trabajar con diccionarios como estructuras basadas en pares clave–valor, comprendiendo cómo crear, acceder, modificar y recorrer información estructurada. Descubriste cómo modelar datos reales mediante identificadores únicos y cómo herramientas como `items()`, `values()` y `get()` facilitan la manipulación segura de la información. Los diccionarios representan una de las estructuras más importantes de Python y serán esenciales para desarrollar programas más complejos y organizados.
