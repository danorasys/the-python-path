---
title: Funciones como Objetos
summary: "En esta unidad conocerás una característica avanzada de Python: las funciones pueden tratarse como objetos. Aprenderás que una función puede almacenarse en variables, enviarse como argumento a otras funciones o devolverse como resultado, comprendiendo conceptos fundamentales para utilizar herramientas como `map()`, `filter()` y `sorted()`. Esto te permitirá escribir programas más flexibles y reutilizables, además de introducirte a ideas utilizadas en la programación funcional."
order: 4
---

Hasta este momento has utilizado funciones principalmente para agrupar instrucciones y reutilizar código. Sin embargo, en Python las funciones poseen una característica muy poderosa: son objetos de primera clase (**First-Class Objects**).

Esto significa que una función puede almacenarse en una variable, pasarse como argumento a otra función, devolverse como resultado desde otra función e incluso almacenarse dentro de estructuras de datos como listas o diccionarios.

Comprender este concepto es fundamental para trabajar posteriormente con herramientas como `map()`, `filter()`, `sorted()`, decoradores y muchas técnicas utilizadas en programación funcional.

## ¿Qué Significa que una Función sea un Objeto?

En Python prácticamente todo es un objeto, incluyendo:

- Números.
- Cadenas de texto.
- Listas.
- Diccionarios.
- Funciones

Por lo tanto, una función puede manipularse igual que cualquier otro valor.

Por ejemplo:

```python run
def saludar():
	print("Hola")

print(type(saludar))
```

```output
<class 'function'>
```

Observa que Python reconoce a `saludar` como un objeto de tipo función.

## Asignar una Función a una Variable

Una función puede almacenarse dentro de una variable.

```python run
def saludar():
	print("Hola")

mensaje = saludar

mensaje()
```

```output
Hola
```

### ¿Qué Ocurrió?

Aquí:

```python
mensaje = saludar
```

No estamos ejecutando la función.

Estamos almacenando una referencia a la función dentro de la variable `mensaje`.

Posteriormente:

```python
mensaje()
```

ejecuta exactamente la misma función.

:::note[Nota:]
Existe una diferencia importante entre:\
`mensaje = saludar`\
y\
`mensaje = saludar()`\
La primera almacena la función.\
La segunda ejecuta la función inmediatamente.
:::

## Funciones Dentro de Estructuras de Datos

Las funciones pueden almacenarse dentro de listas.

```python run
def sumar(a, b):
	return a + b

def multiplicar(a, b):
	return a * b

operaciones = [
	sumar,
	multiplicar
]

print(operaciones[0](5, 3))
print(operaciones[1](5, 3))
```

```output
8
15
```

## Funciones como Parámetros

Una función puede recibir otra función como argumento.

```python run
def saludar():
	print("Hola")

def ejecutar(funcion):
	funcion()

ejecutar(saludar)
```

```output
Hola
```

### ¿Por Qué es Útil?

Permite construir programas más flexibles.

La función `ejecutar()` puede trabajar con cualquier función compatible.

```python run
def ejecutar(funcion):
	funcion()

def despedirse():
	print("Adiós")

ejecutar(despedirse)
```

```output
Adiós
```

### Ejemplo Práctico: Aplicar una Operación

```python run
def cuadrado(numero):
	return numero ** 2

def cubo(numero):
	return numero ** 3

def procesar(valor, operacion):
	resultado = operacion(valor)
	return resultado

print(procesar(4, cuadrado))
print(procesar(4, cubo))
```

```output
16
64
```

:::note[Nota:]
Cuando una función recibe otra función como parámetro se suele decir que trabaja con una función de orden superior (**Higher-Order Function**).
:::

## Funciones que Devuelven Otras Funciones

Una función también puede devolver otra función.

```python run
def crear_saludo():

	def saludar():
		print("Bienvenido")

	return saludar

funcion = crear_saludo()

funcion()
```

```output
Bienvenido
```

### ¿Qué Ocurrió?

La función:

```python
crear_saludo()
```

retorna otra función.

Por lo tanto:

```python
funcion = crear_saludo()
```

almacena una función dentro de la variable `funcion`.

### Ejemplo de Generador de Operaciones

```python run
def crear_multiplicador(factor):

	def multiplicar(numero):
		return numero * factor

	return multiplicar

duplicar = crear_multiplicador(2)

triplicar = crear_multiplicador(3)

print(duplicar(10))
print(triplicar(10))
```

```output
20
30
```

:::note[Nota:]
Este comportamiento es la base de los llamados **Closures**, un concepto muy utilizado en programación funcional.
:::

## Relación con `map()`

La función `map()` recibe una función como argumento.

```python run
def cuadrado(numero):
	return numero ** 2

numeros = [1, 2, 3, 4, 5]

resultado = list(
	map(
		cuadrado,
		numeros
	)
)

print(resultado)
```

```output
[1, 4, 9, 16, 25]
```

## Relación con `filter()`

La función `filter()` también recibe funciones.

```python run
def es_par(numero):
	return numero % 2 == 0

numeros = [1, 2, 3, 4, 5, 6]

resultado = list(
	filter(
		es_par,
		numeros
	)
)

print(resultado)
```

```output
[2, 4, 6]
```

## Relación con `sorted()`

`sorted()` puede recibir una función para indicar cómo realizar el ordenamiento.

```python run
nombres = [
	"Alejandro",
	"Ana",
	"Carlos",
	"Beatriz"
]

resultado = sorted(
	nombres,
	key=len
)

print(resultado)
```

```output
['Ana', 'Carlos', 'Beatriz', 'Alejandro']
```

:::tip[Tip:]
Muchas funciones integradas de Python aprovechan la capacidad de tratar funciones como objetos para ofrecer comportamientos personalizables.
:::

## Resumen de Conceptos

| Concepto | Ejemplo |
| --- | --- |
| Almacenar funciones | `variable = funcion` |
| Pasar funciones como parámetro | `ejecutar(funcion)` |
| Retornar funciones | `return funcion` |
| Guardar funciones en listas | `[sumar, restar]` |
| Utilizar funciones en `map()` | `map(funcion, datos)` |
| Utilizar funciones en `filter()` | `filter(funcion, datos)` |
| Utilizar funciones en `sorted()` | `sorted(datos, key=funcion)` |

## Ejercicios para Practicar

### Ejercicio 1: Sistema de Operaciones Matemáticas Dinámicas

Una calculadora avanzada necesita permitir que diferentes operaciones matemáticas puedan ejecutarse utilizando una única función central.

Debes construir un sistema que utilice funciones como objetos para seleccionar dinámicamente la operación que será aplicada.

Instrucciones:

- Crear una función llamada `sumar()`.
- Crear una función llamada `restar()`.
- Crear una función llamada `multiplicar()`.
- Crear una función llamada `dividir()`.
- Crear una función llamada `ejecutar_operacion()` que reciba dos números y una función que represente la operación.
- Ejecutar cada operación utilizando la misma función principal.
- Mostrar todos los resultados.

```python run="Practicar >>" hidden
# Una calculadora avanzada necesita permitir que diferentes
# operaciones matemáticas puedan ejecutarse utilizando una única
# función central.
#
# Debes construir un sistema que utilice funciones como objetos para
# seleccionar dinámicamente la operación que será aplicada.
#
# Instrucciones:
# - Crear una función llamada sumar().
# - Crear una función llamada restar().
# - Crear una función llamada multiplicar().
# - Crear una función llamada dividir().
# - Crear una función llamada ejecutar_operacion() que reciba dos
#   números y una función que represente la operación.
# - Ejecutar cada operación utilizando la misma función principal.
# - Mostrar todos los resultados.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear una función que realice una suma.
def sumar(a, b):
	return a + b

# Crear una función que realice una resta.
def restar(a, b):
	return a - b

# Crear una función que realice una multiplicación.
def multiplicar(a, b):
	return a * b

# Crear una función que realice una división.
def dividir(a, b):
	return a / b

# Crear una función que reciba otra función como parámetro.
def ejecutar_operacion(numero1, numero2, operacion):
	return operacion(numero1, numero2)

# Ejecutar la suma utilizando la función principal.
print(ejecutar_operacion(20, 5, sumar))

# Ejecutar la resta utilizando la función principal.
print(ejecutar_operacion(20, 5, restar))

# Ejecutar la multiplicación utilizando la función principal.
print(ejecutar_operacion(20, 5, multiplicar))

# Ejecutar la división utilizando la función principal.
print(ejecutar_operacion(20, 5, dividir))
```
:::

### Ejercicio 2: Centro de Procesamiento de Calificaciones

Una universidad necesita aplicar diferentes transformaciones a las notas de los estudiantes.

Dependiendo de la situación, las calificaciones pueden:

- Incrementarse en 5 puntos.
- Incrementarse en 10 puntos.
- Reducirse en 2 puntos.

El sistema debe permitir seleccionar dinámicamente la función que será utilizada para modificar las notas.

Instrucciones:

- Crear una función llamada `bonificacion_cinco()`.
- Crear una función llamada `bonificacion_diez()`.
- Crear una función llamada `penalizacion_dos()`.
- Crear una función llamada `procesar_calificacion()`.
- Recibir una nota y una función.
- Aplicar la función recibida.
- Mostrar varios ejemplos de uso.

```python run="Practicar >>" hidden
# Una universidad necesita aplicar diferentes transformaciones a las
# notas de los estudiantes.
#
# Dependiendo de la situación, las calificaciones pueden:
# - Incrementarse en 5 puntos.
# - Incrementarse en 10 puntos.
# - Reducirse en 2 puntos.
#
# El sistema debe permitir seleccionar dinámicamente la función que
# será utilizada para modificar las notas.
#
# Instrucciones:
#
# - Crear una función llamada bonificacion_cinco().
# - Crear una función llamada bonificacion_diez().
# - Crear una función llamada penalizacion_dos().
# - Crear una función llamada procesar_calificacion().
# - Recibir una nota y una función.
# - Aplicar la función recibida.
# - Mostrar varios ejemplos de uso.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear una función que aumente una nota en cinco puntos.
def bonificacion_cinco(calificacion):
	return calificacion + 5

# Crear una función que aumente una nota en diez puntos.
def bonificacion_diez(calificacion):
	return calificacion + 10

# Crear una función que reduzca una nota en dos puntos.
def penalizacion_dos(calificacion):
	return calificacion - 2

# Crear una función que reciba otra función como argumento.
def procesar_calificacion(calificacion, operacion):
	return operacion(calificacion)

# Aplicar la bonificación de cinco puntos.
print(procesar_calificacion(70, bonificacion_cinco))

# Aplicar la bonificación de diez puntos.
print(procesar_calificacion(70, bonificacion_diez))

# Aplicar la penalización de dos puntos.
print(procesar_calificacion(70, penalizacion_dos))
```
:::

### Ejercicio 3: Generador de Multiplicadores Personalizados

Una aplicación científica necesita crear funciones capaces de multiplicar valores por factores configurables.

Cada función generada deberá recordar el factor utilizado durante su creación.

Instrucciones:

- Crear una función llamada `crear_multiplicador()`.
- Recibir un factor como parámetro.
- Crear una función interna llamada `multiplicar()`.
- La función interna debe multiplicar cualquier número recibido por el factor original.
- Retornar la función interna.
- Crear una función para duplicar.
- Crear una función para triplicar.
- Crear una función para multiplicar por diez.
- Probar cada una de ellas.

```python run="Practicar >>" hidden
# Una aplicación científica necesita crear funciones capaces de
# multiplicar valores por factores configurables.
#
# Cada función generada deberá recordar el factor utilizado durante su
# creación.
#
# Instrucciones:
# - Crear una función llamada crear_multiplicador().
# - Recibir un factor como parámetro.
# - Crear una función interna llamada multiplicar().
# - La función interna debe multiplicar cualquier número recibido por
#   el factor original.
# - Retornar la función interna.
# - Crear una función para duplicar.
# - Crear una función para triplicar.
# - Crear una función para multiplicar por diez.
# - Probar cada una de ellas.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear una función que genere multiplicadores personalizados.
def crear_multiplicador(factor):

	# Crear una función interna que utilice el factor recibido.
	def multiplicar(numero):
		return numero * factor

	# Retornar la función creada.
	return multiplicar

# Crear una función para duplicar valores.
duplicar = crear_multiplicador(2)

# Crear una función para triplicar valores.
triplicar = crear_multiplicador(3)

# Crear una función para multiplicar por diez.
multiplicar_por_diez = crear_multiplicador(10)

# Ejecutar la función duplicar.
print(duplicar(8))

# Ejecutar la función triplicar.
print(triplicar(8))

# Ejecutar la función multiplicar por diez.
print(multiplicar_por_diez(8))
```
:::

### Ejercicio 4: Plataforma de Validación de Datos

Una empresa recibe información de múltiples fuentes y necesita validar los datos mediante diferentes reglas.

Cada regla será una función independiente.

Instrucciones:

- Crear una función que verifique si un número es positivo.
- Crear una función que verifique si un número es par.
- Crear una función que verifique si un número es mayor que 100.
- Crear una función llamada `validar_dato()`.
- La función debe recibir un valor y una función de validación.
- Ejecutar varias validaciones utilizando la misma función principal.
- Mostrar los resultados obtenidos.

```python run="Practicar >>" hidden
# Una empresa recibe información de múltiples fuentes y necesita
# validar los datos mediante diferentes reglas.
#
# Cada regla será una función independiente.
#
# Instrucciones:
# - Crear una función que verifique si un número es positivo.
# - Crear una función que verifique si un número es par.
# - Crear una función que verifique si un número es mayor que 100.
# - Crear una función llamada validar_dato().
# - La función debe recibir un valor y una función de validación.
# - Ejecutar varias validaciones utilizando la misma función principal.
# - Mostrar los resultados obtenidos.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear una función que determine si un número es positivo.
def es_positivo(numero):
	return numero > 0

# Crear una función que determine si un número es par.
def es_par(numero):
	return numero % 2 == 0

# Crear una función que determine si un número es mayor que cien.
def es_mayor_que_cien(numero):
	return numero > 100

# Crear una función que reciba una función de validación.
def validar_dato(valor, regla):
	return regla(valor)

# Validar si un número es positivo.
print(validar_dato(50, es_positivo))

# Validar si un número es par.
print(validar_dato(50, es_par))

# Validar si un número es mayor que cien.
print(validar_dato(50, es_mayor_que_cien))
```
:::

### Ejercicio 5: Motor de Transformación de Registros Empresariales

Una empresa almacena información de ventas y desea aplicar diferentes estrategias de procesamiento sobre la misma colección de datos.

```python
ventas = [1200, 1500, 1800, 2100, 2400]
```

Cada estrategia será una función diferente.

Instrucciones:

- Crear una función que aplique un descuento del 10%.
- Crear una función que aplique un incremento del 15%.
- Crear una función que convierta el valor a texto descriptivo.
- Crear una función llamada `procesar_lista()`.
- La función debe recibir una lista y una función de procesamiento.
- Aplicar la función recibida a cada elemento de la lista.
- Construir una nueva lista con los resultados.
- Mostrar los resultados de las tres transformaciones.

```python run="Practicar >>" hidden
# Una empresa almacena información de ventas y desea aplicar
# diferentes estrategias de procesamiento sobre la misma colección de
# datos.
#
# ventas = [1200, 1500, 1800, 2100, 2400]
#
# Cada estrategia será una función diferente.
#
# Instrucciones:
# - Crear una función que aplique un descuento del 10%.
# - Crear una función que aplique un incremento del 15%.
# - Crear una función que convierta el valor a texto descriptivo.
# - Crear una función llamada procesar_lista().
# - La función debe recibir una lista y una función de procesamiento.
# - Aplicar la función recibida a cada elemento de la lista.
# - Construir una nueva lista con los resultados.
# - Mostrar los resultados de las tres transformaciones.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear una función que aplique un descuento del diez por ciento.
def aplicar_descuento(valor):
	return valor * 0.90

# Crear una función que aplique un incremento del quince por ciento.
def aplicar_incremento(valor):
	return valor * 1.15

# Crear una función que convierta el valor a una descripción textual.
def convertir_descripcion(valor):
	return f"Venta registrada: {valor}"

# Crear una función que procese una lista utilizando otra función.
def procesar_lista(lista, funcion):

	resultado = []

	# Recorrer todos los elementos de la lista.
	for elemento in lista:

		# Aplicar la función recibida al elemento actual.
		resultado.append(funcion(elemento))

	# Retornar la nueva lista construida.
	return resultado

ventas = [1200, 1500, 1800, 2100, 2400]

# Aplicar la estrategia de descuento.
print(procesar_lista(ventas, aplicar_descuento))

# Aplicar la estrategia de incremento.
print(procesar_lista(ventas, aplicar_incremento))

# Aplicar la estrategia de descripción.
print(procesar_lista(ventas, convertir_descripcion))
```
:::

## Conclusiones de la Unidad

Las funciones como objetos constituyen una de las características más poderosas y flexibles de Python. Gracias a esta capacidad, es posible almacenar funciones en variables, pasarlas como argumentos, devolverlas desde otras funciones y construir programas altamente reutilizables y configurables.

Estos conceptos representan la base de numerosas herramientas avanzadas del lenguaje, incluyendo `map()`, `filter()`, `sorted()`, los decoradores, los closures y gran parte de las técnicas asociadas a la programación funcional. Comprender cómo funcionan las funciones como objetos te permitirá diseñar soluciones más elegantes, modulares y escalables, preparándote para abordar proyectos de software cada vez más complejos.
