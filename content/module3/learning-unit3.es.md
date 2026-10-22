---
title: "Tuplas: Datos Inmutables"
summary: Las tuplas son estructuras similares a las listas, pero con la característica principal de ser inmutables, es decir, sus elementos no pueden modificarse después de su creación. En esta unidad aprenderás qué son las tuplas, cómo se definen y cómo acceder a sus valores, así como los escenarios en los que resulta conveniente utilizarlas, especialmente cuando se desea proteger datos constantes o representar información fija. También se analizarán las diferencias prácticas entre listas y tuplas en términos de seguridad, rendimiento y uso en programas reales.
order: 3
---

Las tuplas son estructuras de datos muy parecidas a las listas, ya que permiten almacenar múltiples valores dentro de una sola variable. Sin embargo, su característica más importante es que son inmutables, lo que significa que sus elementos no pueden modificarse después de haber sido creados. En esta unidad aprenderás cómo crear tuplas, acceder a sus valores y comprender cuándo es conveniente utilizarlas, especialmente en situaciones donde los datos deben permanecer constantes o protegidos contra cambios accidentales. También analizarás las diferencias prácticas entre listas y tuplas y cómo influyen en el rendimiento y la seguridad del programa.

## ¿Qué es una Tupla?

Una tupla es una colección ordenada de elementos definida usando paréntesis `()`.

```python
coordenadas = (10, 20)
```

Puede almacenar distintos tipos de datos:

```python
datos = ("Ana", 25, True)
```

:::note
Las tuplas mantienen el orden de los elementos, igual que las listas.
:::

## Crear Tuplas

### Tupla Básica

```python
numeros = (1, 2, 3, 4)
```

### Tupla con un Solo Elemento

```python
valor = (5,)
```

:::note
La coma es obligatoria; sin ella Python no reconoce una tupla.
:::

:::tip
Si olvidas la coma, Python interpretará el valor como un número normal y no como una tupla.
:::

## Acceso a Elementos

Las tuplas usan índices igual que las listas.

```python
frutas = ("manzana", "pera", "uva")

print(frutas[0])
print(frutas[-1])
```

```output
manzana
uva
```

### Recorrer una Tupla

```python
for fruta in frutas:
    print(fruta)
```

:::note
Aunque no puedas modificar la tupla, sí puedes leer sus valores y recorrerlos.
:::

## Inmutabilidad: La Característica Principal

Una vez creada, una tupla no puede cambiar.

```python
numeros = (1, 2, 3)
numeros[0] = 10   # Error
```

Python generará un error porque intenta modificar un valor existente.

:::tip[Tips:]
La inmutabilidad ayuda a evitar errores accidentales cuando los datos no deben cambiar.
:::

## Diferencias Entre Listas y Tuplas

| Característica | Lista | Tupla |
| --- | --- | --- |
| Sintaxis | `[]` | `()` |
| Modificable | Sí | No |
| Rendimiento | Normal | Más rápido |
| Seguridad de datos | Menor | Mayor |
| Uso típico | Datos cambiantes | Datos constantes |

## ¿Cuándo Usar Tuplas?

Las tuplas son ideales cuando:

- Los datos no deben modificarse.
- Representas valores fijos.
- Quieres mayor seguridad en la información.
- Necesitas estructuras ligeras y rápidas.

Ejemplos reales:

```python
dias_semana = ("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo")
coordenada = (40.4168, -3.7038)
color_rgb = (255, 0, 0)
```

## Desempaquetado de Tuplas (Tuple Unpacking)

Python permite asignar valores automáticamente:

```python run
punto = (5, 8)

x, y = punto

print(x)
print(y)
```

```output
5
8
```

:::tip
El número de variables debe coincidir con la cantidad de elementos.
:::

## Métodos Disponibles en Tuplas

Las tuplas tienen pocos métodos porque no cambian.

| Método | Propósito |
| --- | --- |
| `count()` | Cuenta ocurrencias |
| `index()` | Busca posición |

Ejemplo:

```python run
numeros = (1, 2, 2, 3)

print(numeros.count(2))
print(numeros.index(3))
```

```output
2
3
```

## Ejemplo Integrador

```python run
persona = ("Carlos", 30, "Colombia")

nombre, edad, pais = persona

print(nombre)
print(edad)
print(pais)
```

```output
Carlos
30
Colombia
```

:::note
Las tuplas funcionan muy bien para representar registros pequeños donde cada posición tiene un significado fijo.
:::

## Ejercicios Prácticos

### Ejercicio 1: Información Personal Fija

Crea un programa que:

- Defina una tupla llamada `persona` con: nombre, edad y país.
- Muestre cada dato usando índices.
- Recorra la tupla con un bucle `for`.
- Intente modificar un valor (observa el error).
- Explica en un comentario por qué ocurre ese error.

```python practice
# Crea un programa que:
# 1. Defina una tupla llamada persona con: nombre, edad
# y país.
# 2. Muestre cada dato usando índices.
# 3. Recorra la tupla con un bucle for.
# 4. Intente modificar un valor (observa el error).
# 5. Explica en un comentario por qué ocurre ese error
```

:::details
```python run
# 1. Defina una tupla llamada persona con: nombre, edad
# y país
persona = ("Ana", 22, "Colombia")

# 2. Muestre cada dato usando índices
print(persona[0])
print(persona[1])
print(persona[2])

# 3. Recorra la tupla con un bucle for
for dato in persona:
    print(dato)

# 4. Intente modificar un valor (observa el error)
# 5. Explica en un comentario por qué ocurre ese error
# persona[1] = 30  # Error: las tuplas son inmutables
```
:::

### Ejercicio 2: Coordenadas en un Plano

Realiza un programa que:

- Cree una tupla llamada `coordenada` con dos números.
- Desempaquete la tupla en variables `x` y `y`.
- Imprima ambas variables.
- Calcule la suma de las coordenadas.

```python practice
# Realiza un programa que:
# 1. Cree una tupla llamada coordenada con dos números.
# 2. Desempaquete la tupla en variables x y y.
# 3. Imprima ambas variables.
# 4. Calcule la suma de las coordenadas
```

:::details
```python run
# 1. Cree una tupla llamada coordenada con dos números
coordenada = (4, 7)

# 2. Desempaquete la tupla en variables x y y
x, y = coordenada

# 3. Imprima ambas variables
print(x)
print(y)

# 4. Calcule la suma de las coordenadas
print(x + y)
```
:::

### Ejercicio 3: Conteo Dentro de una Tupla

Desarrolla un programa que:

- Cree una tupla con varios números repetidos.
- Cuente cuántas veces aparece un número específico usando `count()`.
- Encuentre la posición de un valor usando `index()`.
- Muestre los resultados en pantalla.

```python practice
# Desarrolla un programa que:
# 1. Cree una tupla con varios números repetidos.
# 2. Cuente cuántas veces aparece un número específico
# usando count().
# 3. Encuentre la posición de un valor usando index().
# 4. Muestre los resultados en pantalla
```

:::details
```python run
# 1. Cree una tupla con varios números repetidos
numeros = (1, 3, 5, 3, 7, 3)

# 4. Muestre los resultados en pantalla

# 2. Cuente cuántas veces aparece un número específico usando count()
print(numeros.count(3))
# 3. Encuentre la posición de un valor usando index()
print(numeros.index(5))
```
:::

:::note[Notas:]
**1.** Las tuplas mantienen el orden de los datos.\
**2.** No permiten modificaciones después de crearse.\
**3.** Son más seguras para datos constantes.\
**4.** Consumen menos recursos que las listas.
:::

:::tip[Tips:]
**1.** Usa tuplas para datos que nunca cambian.\
**2.** Piensa en ellas como "registros protegidos".\
**3.** Son muy comunes para coordenadas, configuraciones y resultados múltiples.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste qué son las tuplas y cómo funcionan como estructuras de datos inmutables en Python. Comprendiste cómo crearlas, acceder a sus elementos, recorrerlas y utilizar métodos básicos como `count()` e `index()`. También analizaste sus diferencias frente a las listas y descubriste cuándo resulta más conveniente utilizarlas para proteger información constante, mejorar el rendimiento y representar datos fijos dentro de un programa.
