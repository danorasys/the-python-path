---
title: Formatos de Texto y f-strings
summary: En esta unidad se estudiará cómo combinar texto con valores de variables para generar salidas más claras y dinámicas, utilizando diferentes formas de formateo en Python, especialmente las f-strings, que permiten insertar expresiones directamente dentro de cadenas. Aprenderás a construir mensajes más legibles, mostrar resultados de manera organizada y mejorar la presentación de la información, lo cual es fundamental en aplicaciones que interactúan con usuarios o muestran resultados en pantalla.
order: 2
---

En muchos programas es necesario combinar texto con valores almacenados en variables para mostrar resultados claros al usuario. En esta unidad aprenderás diferentes formas de formatear texto en Python, especialmente el uso de las f-strings, una forma sencilla y poderosa de insertar valores directamente dentro de cadenas. Esto te permitirá construir mensajes más legibles, organizar mejor la salida de tus programas y mejorar la presentación de la información.

## ¿Qué es el Formateo de Texto?

El formateo de texto consiste en combinar texto con variables o valores para generar mensajes dinámicos.

Ejemplo básico:

```python run
nombre = "Daniel"
edad = 20

print("Hola, me llamo", nombre, "y tengo", edad, "años")
```

```output
Hola, me llamo Daniel y tengo 20 años
```

:::note[Nota:]
Este método funciona, pero puede volverse difícil de leer en textos más largos.
:::

## Uso de f-strings

Las f-strings permiten insertar variables directamente dentro de una cadena.

### Sintaxis

```python
f"texto {variable}"
```

Ejemplo:

```python run
nombre = "Daniel"
edad = 20

print(f"Hola, me llamo {nombre} y tengo {edad} años")
```

```output
Hola, me llamo Daniel y tengo 20 años
```

:::note[Tip:]
Las f-strings comienzan con la letra `f` antes de las comillas.
:::

## Expresiones Dentro de f-strings

Puedes realizar operaciones directamente dentro de `{}`.

```python run
a = 5
b = 3

print(f"La suma es {a + b}")
```

```output
La suma es 8
```

:::tip[Tip:]
No solo puedes mostrar variables, también puedes hacer cálculos o llamar funciones.
:::

## Formateo de Números

Las f-strings permiten controlar cómo se muestran los números.

Ejemplo (Decimales):

```python run
precio = 19.9876

print(f"Precio: {precio:.2f}")
```

```output
Precio 19.99
```

Ejemplo (Enteros con formato):

```python run
numero = 1000

print(f"{numero:,}")
```

```output
1,000
```

## Alineación de Texto

Puedes alinear texto dentro de espacios definidos.

```python run
nombre = "Ana"

print(f"{nombre:>10}")  # Derecha
print(f"{nombre:<10}")  # Izquierda
print(f"{nombre:^10}")  # Centro
```

```output
       Ana
Ana       
   Ana    
```

:::tip[Tip:]
Esto es útil para mostrar datos en forma de tabla.
:::

## Otras Formas de Formateo (Básico)

### Concatenación

```python run
nombre = "Ana"
print("Hola " + nombre)
```

```output
Hola Ana
```

### Método `format()`

```python run
nombre = "Ana"
edad = 20
print("Hola {}, tienes {} años".format(nombre, edad))
```

```output
Hola Ana, tienes 20 años
```

:::note[Nota:]
Aunque `format()` se usa, las f-strings son más modernas y recomendadas.
:::

### Comparación de Métodos

| Método | Ejemplo | Legibilidad |
| --- | --- | --- |
| Concatenación | `"Hola" + nombre` | Baja |
| `format()` | `"Hola {}".format(nombre)` | Media |
| f-string | `f"Hola {nombre}"` | Alta |

## Ejemplo Integrador

```python run
nombre = "Luis"
edad = 30
saldo = 1234.567

print(f"Usuario: {nombre}")
print(f"Edad: {edad}")
print(f"Saldo: {saldo:.2f}")
```

```output
Usuario: Luis
Edad: 30
Saldo: 1234.57
```

## Ejercicios Prácticos

### Ejercicio 1: Reporte de Usuario

Crea un programa que:

- Defina las siguientes variables: `nombre = "Laura"`, `edad = 28` y `salario = 2540.756`.
- Muestre un mensaje usando f-string que incluya: `nombre`, `edad` y `salario` con solo 2 decimales.
- El resultado debe verse organizado en múltiples líneas.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina las siguientes variables: nombre = "Laura",
# edad = 28 y salario = 2540.756.
# 2. Muestre un mensaje usando f-string que incluya:
# nombre, edad y salario con solo 2 decimales.
# 3. El resultado debe verse organizado en múltiples
# líneas.
```

:::details[Observar posible solución]
```python
# 1. Defina las siguientes variables: nombre = "Laura",
# edad = 28 y salario = 2540.756.
nombre = "Laura"
edad = 28
salario = 2540.756

# 2. Muestre un mensaje usando f-string que incluya:
# nombre, edad y salario con solo 2 decimales.
# 3. El resultado debe verse organizado en múltiples
# líneas.
print(f"Nombre: {nombre}")
print(f"Edad: {edad}")
print(f"Salario: {salario:.2f}")
```

```python run="Probar Solución >>" hidden
# 1. Defina las siguientes variables: nombre = "Laura",
# edad = 28 y salario = 2540.756.
nombre = "Laura"
edad = 28
salario = 2540.756

# 2. Muestre un mensaje usando f-string que incluya:
# Nombre, edad y salario con solo 2 decimales.
# 3. El resultado debe verse organizado en múltiples
# líneas.
print(f"Nombre: {nombre}")
print(f"Edad: {edad}")
print(f"Salario: {salario:.2f}")
```
:::

### Ejercicio 2: Tabla de Productos

Desarrolla un programa que:

- Define tres productos con: nombre y precio.
- Muestre una tabla alineada con: Nombre del producto a la izquierda y precio alineado a la derecha con 2 decimales.
- Usa f-strings para lograr la alineación.

```python run="Practicar >>" hidden
# Desarrolla un programa que:
# 1. Define tres productos con: nombre y precio.
# 2. Muestre una tabla alineada con: Nombre del
# producto a la izquierda y precio alineado a la derecha
# con 2 decimales.
# 3. Usa f-strings para lograr la alineación.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Define tres productos con: nombre y precio.
p1 = "Laptop"
p2 = "Mouse"
p3 = "Teclado"

precio1 = 1200.5
precio2 = 25.99
precio3 = 75.456

# 2. Muestre una tabla alineada con: Nombre del
# producto a la izquierda y precio alineado a la derecha
# con 2 decimales.
# 3. Usa f-strings para lograr la alineación.
print(f"{p1:<10} {precio1:>10.2f}")
print(f"{p2:<10} {precio2:>10.2f}")
print(f"{p3:<10} {precio3:>10.2f}")
```
:::

### Ejercicio 3: Calculadora Formateada

Crea un programa que:

- Defina dos números: `a = 15` y `b = 4`.
- Calcule suma.
- Calcule resta.
- Calcule multiplicación.
- División (con 2 decimales).
- Muestre los resultados en formato claro usando f-strings.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina dos números: a = 15 y b = 4.
# 2. Calcule suma.
# 3. Calcule resta.
# 4. Calcule multiplicación.
# 5. División (con 2 decimales).
# 6. Muestre los resultados en formato claro usando
# f-strings.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina dos números: a = 15 y b = 4.
a = 15
b = 4

# 6. Muestre los resultados en formato claro usando
# f-strings.

# 2. Calcule suma.
print(f"Suma: {a + b}")
# 3. Calcule resta.
print(f"Resta: {a - b}")
# 4. Calcule multiplicación.
print(f"Multiplicación: {a * b}")
# 5. División (con 2 decimales).
print(f"División: {a / b:.2f}")
```
:::

:::note[Notas Importantes:]
**1.** Los f-strings permiten insertar variables fácilmente.\
**2.** Se pueden realizar operaciones dentro de `{}`.\
**3.** Los especificadores de formato permiten controlar el formato de números y texto.
:::

:::tip[Tips de Programación:]
**1.** Usa f-strings en lugar de concatenación.\
**2.** Mejora la presentación de tus programas con formato.\
**3.** Usa alineación para mostrar datos organizados.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a combinar texto con valores mediante diferentes técnicas de formateo, especialmente el uso de f-strings, que permiten insertar variables y expresiones directamente dentro de cadenas de manera clara y eficiente. Comprendiste cómo mejorar la presentación de la información, controlar el formato de números y organizar la salida de tus programas. Estas habilidades son fundamentales para crear programas más profesionales, legibles y orientados al usuario.
