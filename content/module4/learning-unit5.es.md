---
title: Funciones Anidadas y Lambdas (Básico)
summary: En esta unidad se presenta una introducción a las funciones anidadas, que permiten definir una función dentro de otra para organizar mejor ciertas tareas, y a las funciones lambda, que permiten crear funciones pequeñas en una sola línea de código. El objetivo es comprender cómo estas herramientas pueden utilizarse para escribir código más compacto y flexible en situaciones donde se requieren operaciones simples o temporales.
order: 5
---

En esta unidad aprenderás dos conceptos que permiten escribir código más organizado y compacto: las funciones anidadas y las funciones lambda. Las funciones anidadas permiten definir una función dentro de otra, lo cual es útil para estructurar mejor tareas internas y limitar el uso de ciertas funciones a un contexto específico. Por otro lado, las funciones lambda permiten crear funciones pequeñas en una sola línea, ideales para operaciones simples o temporales. Comprender estas herramientas te ayudará a escribir código más claro, flexible y eficiente en situaciones donde no es necesario definir funciones completas con `def`.

## Funciones Anidadas

Una función anidada es una función definida dentro de otra función.

### Estructura Básica

```python
def funcion_externa():

	def funcion_interna():
		print("Soy una función interna")

	funcion_interna()
```

Ejemplo:

```python run
def saludar():

	def mensaje():
		print("Hola desde la función interna")

	mensaje()

saludar()
```

```output
Hola desde la función interna
```

:::note[Nota:]
La función interna solo existe dentro de la función externa y no puede ser llamada desde fuera.
:::

### Error al Intentar Usarla Fuera

```python
mensaje()  # Error: no existe fuera
```

```output
NameError: name 'mensaje' is not defined
```

```python run hidden error
def saludar():

	def mensaje():
		print("Hola desde la función interna")

	mensaje()

mensaje()
```

:::tip[Tip:]
Usa funciones anidadas cuando una función solo tiene sentido dentro de otra.
:::

### Uso Práctico de Funciones Anidadas

```python run
def operacion():

	def sumar(a, b):
		return a + b

	resultado = sumar(5, 3)
	print(resultado)

operacion()
```

```output
8
```

:::note[Nota:]
Esto ayuda a organizar mejor el código y evitar que funciones internas se usen en otros contextos por error.
:::

## Funciones Lambda

Una función lambda es una función pequeña y anónima que se define en una sola línea.

### Sintaxis

```python
lambda parametros: expresion
```

Ejemplo básico:

```python run
sumar = lambda a, b: a + b

print(sumar(4, 6))
```

```output
10
```

:::note[Nota:]
Las funciones lambda no usan `def` ni `return`, el resultado se devuelve automáticamente.
:::

### Cuándo Usar Lambda

Se utilizan cuando:

- La función es muy simple.
- Se usa una sola vez.
- No necesitas definir una función completa.

Ejemplo:

```python run
cuadrado = lambda x: x * x

print(cuadrado(5))
```

```output
25
```

:::tip[Tip]
Si la función es compleja o tiene varias líneas, es mejor usar `def`.
:::

### Comparación: Función Normal VS Lambda

| Característica | Función con `def` | Función Lambda |
| --- | --- | --- |
| Nombre | Sí | Opcional |
| Múltiples líneas | Sí | No |
| Sintaxis | Más extensa | Más corta |
| Uso | General | Simple y rápido |

### Uso de Lambda en Funciones Integradas

Las funciones lambda se usan frecuentemente con funciones como `map()`.

Ejemplo con `map`:

```python run
numeros = [1, 2, 3, 4]

resultado = list(map(lambda x: x * 2, numeros))

print(resultado)
```

```output
[2, 4, 6, 8]
```

:::note[Nota:]
`map()` aplica una función a cada elemento de una colección.
:::

## Ejemplo Integrador

```python run
def calcular():

	def multiplicar(a, b):
		return a * b

	resultado = multiplicar(3, 4)

	doble = lambda x: x * 2

	print("Multiplicación:", resultado)
	print("Doble:", doble(resultado))

calcular()
```

```output
Multiplicación: 12
Doble: 24
```

## Ejercicios Prácticos

### Ejercicio 1: Función Anidada Básica

Crea un programa que:

- Defina una función llamada `principal`.
- Dentro de esa función define otra función llamada `mensaje`.
- La función interna debe imprimir: `"Hola desde la función interna"`.
- Llama la función interna desde la función principal.
- Ejecuta la función principal.
- Intenta llamar la función interna fuera de la función principal (observar el error).

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina una función llamada principal.
# 2. Dentro de esa función define otra función llamada
# mensaje.
# 3. La función interna debe imprimir: "Hola desde la
# función interna".
# 4. Llama la función interna desde la función
# principal.
# 5. Ejecuta la función principal.
# 6. Intenta llamar la función interna fuera de la
# función principal (observar el error).
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina una función llamada principal
def principal():

	# 2. Dentro de esa función define otra función llamada
	# mensaje
	def mensaje():
		# 3. La función interna debe imprimir: "Hola desde la
		# función interna"
		print("Hola desde la función interna")

	# 4. Llama la función interna desde la función
	# principal
	mensaje()

# 5. Ejecuta la función principal
principal()

# 6. Intenta llamar la función interna fuera de la
# función principal (observar el error)
# mensaje()  # Error: función interna
# NameError: name 'mensaje' is not defined
```
:::

### Ejercicio 2: Uso de Lambda

Crea un programa que:

- Defina una función lambda que reciba un número.
- La función debe devolver el triple del número.
- Guarda la función en una variable.
- Llama la función con el valor `5`.
- Muestra el resultado en pantalla.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina una función lambda que reciba un número.
# 2. La función debe devolver el triple del número.
# 3. Guarda la función en una variable.
# 4. Llama la función con el valor 5.
# 5. Muestra el resultado en pantalla.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina una función lambda que reciba un número
# 2. La función debe devolver el triple del número
# 3. Guarda la función en una variable
triple = lambda x: x * 3
# 4. Llama la función con el valor 5
# 5. Muestra el resultado en pantalla
print(triple(5))
```
:::

### Ejercicio 3: Lambda con Lista

Desarrolla un programa que:

- Cree una lista con los números: `[2, 4, 6, 8]`.
- Use la función `map()` junto con una función lambda.
- La función lambda debe multiplicar cada número por `2`.
- Convierta el resultado a lista.
- Muestra el resultado final.

```python run="Practicar >>" hidden
# Desarrolla un programa que:
# 1. Cree una lista con los números: [2, 4, 6, 8].
# 2. Use la función map() junto con una función lambda.
# 3. La función lambda debe multiplicar cada número por
# 2.
# 4. Convierta el resultado a lista.
# 5. Muestra el resultado final.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Cree una lista con los números: [2, 4, 6, 8]
numeros = [2, 4, 6, 8]

# 2. Use la función map() junto con una función lambda
# 3. La función lambda debe multiplicar cada número por
# 2
# 4. Convierta el resultado a lista
resultado = list(map(lambda x: x * 2, numeros))

# 5. Muestra el resultado final
print(resultado)
```
:::

:::note[Notas Importantes:]
**1.** Las funciones anidadas solo existen dentro de otra función.\
**2.** Las funciones lambda son funciones pequeñas de una sola línea.\
**3.** Lambda devuelve el resultado automáticamente.
:::

:::tip[Tips de Programación:]
**1.** Usa funciones anidadas para organizar mejor el código interno.\
**2.** Usa lambda para operaciones simples y rápidas.\
**3.** No abuses de lambda en funciones complejas.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a utilizar funciones anidadas para organizar mejor el código y limitar el uso de funciones a contextos específicos, así como a crear funciones lambda, que permiten definir funciones pequeñas y rápidas en una sola línea. Comprendiste cuándo es adecuado usar cada una de estas herramientas y cómo contribuyen a escribir código más compacto, flexible y legible. Estas técnicas son especialmente útiles para simplificar tareas simples y mejorar la estructura general de tus programas en Python.
