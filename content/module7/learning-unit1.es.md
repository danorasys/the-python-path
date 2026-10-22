---
title: Errores Comunes en Python
summary: En esta unidad aprenderás a identificar los errores más frecuentes que pueden aparecer durante el desarrollo de programas en Python. Conocerás la diferencia entre errores de sintaxis, errores en tiempo de ejecución y errores lógicos, además de analizar situaciones comunes como el uso de variables inexistentes, incompatibilidades entre tipos de datos, divisiones entre cero, índices fuera de rango y otros problemas habituales. Comprender estos errores te permitirá interpretar los mensajes que genera Python y corregirlos de manera más rápida y efectiva.
order: 1
---

Al desarrollar programas es completamente normal cometer errores. De hecho, incluso los programadores con muchos años de experiencia encuentran errores constantemente durante el proceso de desarrollo. Por lo tanto, es importante aprender a identificarlos, comprender por qué ocurren y corregirlos de manera eficiente.

Python proporciona mensajes de error muy descriptivos que ayudan a localizar el origen de un problema. Sin embargo, interpretar correctamente estos mensajes requiere conocer los distintos tipos de errores que pueden presentarse y las circunstancias en las que aparecen. Algunos errores impiden que el programa siquiera pueda comenzar a ejecutarse, mientras que otros ocurren durante la ejecución o producen resultados incorrectos sin mostrar ningún mensaje de advertencia.

En esta unidad estudiarás los errores más comunes que pueden aparecer al programar en Python, aprenderás a diferenciarlos y conocerás estrategias para analizarlos y solucionarlos. Estas habilidades constituyen uno de los pilares fundamentales del desarrollo de software, ya que todo programa, sin importar su tamaño o complejidad, requerirá procesos de depuración y corrección.

## ¿Qué es un Error en Python?

Un error es cualquier situación que impide que un programa funcione de la manera esperada. Dependiendo del tipo de problema, el programa puede no ejecutarse, detenerse durante la ejecución o finalizar normalmente produciendo resultados incorrectos.

En Python, cuando ocurre un error, el intérprete genera un mensaje conocido como **Traceback**, el cual contiene información muy útil para localizar el problema. Generalmente este mensaje indica:

- El archivo donde ocurrió el error.
- La línea específica del código.
- El tipo de error detectado.
- Una descripción del problema.

Por ejemplo:

```python run
numero = 10

print(numero2)
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4, in <module>
NameError: name 'numero2' is not defined
```

En este caso, Python informa que la variable `numero2` no existe.

Gracias a estos mensajes es posible identificar rápidamente la causa del problema y corregir el código.

:::note[Nota:]
Si estás utilizando esta plataforma para ejecutar el código directamente desde el navegador, es posible que observes mensajes de error más extensos que los mostrados habitualmente en un entorno local de Python. Esto ocurre porque el código es ejecutado mediante una versión de Python integrada en el navegador (**_Pyodide_**), la cual añade información interna relacionada con el proceso de ejecución.
:::

## ¿Por Qué Ocurren los Errores?

Los errores pueden aparecer por diversas razones, entre ellas:

- Escribir incorrectamente una instrucción.
- Utilizar una variable que no existe.
- Trabajar con datos de un tipo incompatible.
- Acceder a posiciones inexistentes de una lista.
- Dividir un número entre cero.
- Diseñar incorrectamente el algoritmo.

Cada uno de estos problemas pertenece a una categoría diferente de errores.

## Tipos de Errores en Python

Los errores pueden clasificarse en tres grandes categorías:

- Errores de sintaxis.
- Errores en tiempo de ejecución.
- Errores lógicos.

Cada uno posee características distintas y requiere un enfoque diferente para solucionarlo.

### Errores de Sintaxis

Los errores de sintaxis (**_Syntax Errors_**) ocurren cuando el código no respeta las reglas del lenguaje Python.

En estos casos el intérprete ni siquiera puede comenzar la ejecución del programa, ya que no logra comprender correctamente la estructura del código.

Son generalmente los errores más fáciles de detectar porque Python indica exactamente la línea donde encontró el problema.

#### Características

- Impiden que el programa inicie.
- Son detectados antes de ejecutar el código
- Generalmente indican la línea donde aparece el error.
- Se producen por escribir incorrectamente las instrucciones.

##### Ejemplo 1: Falta de Dos Puntos

Código incorrecto:

```python run
edad = 20

if edad >= 18
	print("Mayor de edad")
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4
    if edad >= 18
                 ^
SyntaxError: expected ':'
```

Corrección:

```python run
edad = 20

if edad >= 18:
	print("Mayor de edad")
```

```output
Mayor de edad
```

##### Ejemplo 2: Paréntesis Sin Cerrar

Código incorrecto:

```python run
print("Hola Mundo"
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 2
    print("Hola Mundo"
         ^
SyntaxError: '(' was never closed
```

Corrección:

```python run
print("Hola Mundo")
```

```output
Hola Mundo
```

##### Ejemplo 3: Error de Indentación

Python utiliza la indentación para definir bloques de código.

Código incorrecto:

```python run
numero = 8

if numero > 5:
print("Es mayor que cinco")
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 5
    print("Es mayor que cinco")
    ^^^^^
IndentationError: expected an indented block after 'if' statement on line 4
```

Corrección:

```python run
numero = 8

if numero > 5:
	print("Es mayor que cinco")
```

```output
Es mayor que cinco
```

:::note[Nota:]
Aunque `IndentationError` aparece con un nombre diferente, forma parte de los errores relacionados con la sintaxis del lenguaje, ya que la indentación constituye una regla obligatoria en Python.
:::

### Errores en Tiempo de Ejecución

Los errores en tiempo de ejecución (**_Runtime Errors_**) aparecen después de que el programa ha comenzado a ejecutarse.

En estos casos, el código posee una sintaxis válida, pero durante la ejecución ocurre una situación que Python no puede resolver.

Cuando esto sucede, el programa se detiene y genera una excepción.

#### Características

- El programa comienza a ejecutarse correctamente.
- El error aparece durante la ejecución.
- Generalmente producen una excepción (**_Exception_**).
- Pueden evitarse mediante el manejo de excepciones (`try` y `except`).

##### Ejemplo 1: Variable Inexistente

```python run
nombre = "Carlos"

print(apellido)
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4, in <module>
NameError: name 'apellido' is not defined
```

Python indica que la variable nunca fue creada.

##### Ejemplo 2: División Entre Cero

```python run
numero = 20
resultado = numero / 0

print(resultado)
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 3, in <module>
ZeroDivisionError: division by zero
```

Python no permite dividir entre cero.

##### Ejemplo 3: Índice Fuera del Rango

```python run
numeros = [10, 20, 30]

print(numeros[5])
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4, in <module>
IndexError: list index out of range
```

La lista únicamente posee tres elementos.

##### Ejemplo 4: Conversión Incorrecta

```python run
edad = "veinte"

numero = int(edad)
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4, in <module>
ValueError: invalid literal for int() with base 10: 'veinte'
```

La cadena no representa un número entero válido.

##### Ejemplo 5: Tipo Incompatible

```python run
numero = 15

print(numero + " años")
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

No es posible sumar directamente un entero y una cadena.

:::note[Nota:]
Los errores en tiempo de ejecución suelen ser los más frecuentes durante el desarrollo de software, ya que muchas veces dependen de los datos proporcionados por el usuario y no únicamente del código escrito por el programador.
:::

### Errores Lógicos

Los errores lógicos son los más difíciles de detectar porque el programa no produce mensajes de error.

El código se ejecuta completamente, pero el resultado obtenido no corresponde con el esperado.

Generalmente estos errores aparecen cuando el algoritmo fue diseñado incorrectamente o cuando alguna condición no representa realmente el problema que se desea resolver.

#### Características

- El programa ejecuta sin interrupciones.
- No aparecen excepciones.
- El resultado es incorrecto.
- Requieren revisar cuidadosamente la lógica del algoritmo.

##### Ejemplo 1: Fórmula Incorrecta

Código:

```python run
base = 8
altura = 6

area = base + altura

print(area)
```

```output
14
```

Aunque el programa funciona correctamente, el área de un rectángulo no se obtiene mediante una suma de su base más su altura.

La solución correcta sería:

```python run
base = 8
altura = 6

area = base * altura

print(area)
```

```output
48
```

##### Ejemplo 2: Condición Equivocada

Código:

```python run
edad = 18

if edad > 18:
	print("Usted es un adultuo, puede ingresar")
else:
	print("Usted no es un adulto, no puede ingresar")
```

```output
Usted no es un adulto, no puede ingresar
```

El programa funciona, pero una persona de 18 años también debería poder ingresar.

Corrección:

```python run
edad = 18

if edad >= 18:
	print("Usted es un adultuo, puede ingresar")
else:
	print("Usted no es un adulto, no puede ingresar")
```

```output
Usted es un adulto, puede ingresar
```

##### Ejemplo 3: Promedio Mal Calculado

Código:

```python run
notas = [3.5, 4.2, 4.8]

promedio = sum(notas) / 2

print(promedio)
```

```output
6.25
```

El programa no genera ningún error, pero el promedio está mal calculado.

La solución correcta sería:

```python run
notas = [3.5, 4.2, 4.8]

promedio = sum(notas) / len(notas)

print(promedio)
```

```output
4.166666666666667

# Se podría considerar redondear el resultado a dos decimales, por ejemplo.
```

:::note[Nota:]
Los errores lógicos son especialmente peligrosos porque pueden pasar desapercibidos durante mucho tiempo si no se prueban cuidadosamente los resultados obtenidos por el programa.
:::

| Características | Error de Sintaxis | Error en Tiempo de Ejecución | Error Lógico |
| --- | --- | --- | --- |
| ¿El programa inicia? | No | Sí | Sí |
| ¿Se genera un mensaje de error? | Sí | Sí | No |
| ¿El programa puede finalizar? | No | Generalmente no | Sí |
| ¿Produce resultados incorrectos? | No aplica | Generalmente no | Sí |
| ¿Es fácil localizarlo? | Alta | Media | Baja |
| Ejemplos comunes | `SyntaxError`, `IndentationError` | `NameError`, `TypeError`, `IndexError`, `ValueError`, `ZeroDivisionError` | Algoritmos incorrectos, condiciones equivocadas, fórmulas erróneas |

## Ejemplos Detallados

### Ejemplo 1: Identificando un Error de Sintaxis

```python run
numero = 15

if numero > 10
	print("Número válido")
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4
    if numero > 10
                  ^
SyntaxError: expected ':'
```

Python detectará inmediatamente que falta el carácter `:` al finalizar la condición del `if`, por lo que el programa no llegará a ejecutarse.

### Ejemplo 2: Identificando un Error en Tiempo de Ejecución

```python run
edades = [20, 25, 30]

print(edades[5])
```

```output
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 393, in run_async
    coroutine = eval(self.code, globals, locals)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2, in <module>
  File "<string>", line 4, in <module>
IndexError: list index out of range
```

El programa comienza a ejecutarse correctamente, pero al intentar acceder a una posición inexistente de la lista se produce un `IndexError`, deteniendo la ejecución.

### Ejemplo 3: Identificando un Error Lógico

```python run
precio = 100
descuento = 20

precio_final = precio + descuento

print(precio_final)
```

```output
120
```

No aparece ningún mensaje de error y el programa finaliza normalmente. Sin embargo, el resultado es incorrecto, ya que el descuento debería restarse del precio original y no sumarse.

La implementación correcta sería:

```python run
precio = 100
descuento = 20

precio_final = precio - descuento

print(precio_final)
```

```output
80
```

:::tip[Tips:]
**1.** Lee siempre el mensaje de error completo antes de modificar el código. Muchas veces la solución se encuentra explícitamente indicada en el propio mensaje.\
**2.** Corrige primero el primer error reportado por Python. En numerosas ocasiones, los errores posteriores desaparecen automáticamente una vez solucionado el inicial.\
**3.** Si el programa produce resultados inesperados sin mostrar errores, revisa cuidadosamente la lógica del algoritmo y verifica los valores de las variables durante la ejecución.\
**4.** Es recomendable ejecutar el programa con diferentes conjuntos de datos para comprobar que funciona correctamente en distintos escenarios y detectar posibles errores lógicos.
:::

:::note[Notas:]
**1.** Los errores forman parte natural del proceso de desarrollo de software. Incluso aplicaciones profesionales requieren constantes procesos de depuración antes de llegar a su versión final.\
**2.** Aprender a interpretar el tipo de error y el mensaje que proporciona Python es una habilidad tan importante como aprender la sintaxis del lenguaje, ya que permite resolver problemas con mayor rapidez y comprender mejor el funcionamiento interno de los programas.
:::

## Ejercicios para Practicar

### Ejercicio Práctico 1: Corrección de un Sistema de Registro de Estudiantes

Una institución educativa está desarrollando un sistema para registrar las calificaciones de varios estudiantes. Sin embargo, el programa contiene diferentes errores que impiden su correcto funcionamiento.

Tu tarea consiste en analizar cuidadosamente el código, identificar los errores presentes y corregirlos para que el programa funcione correctamente.

Durante este ejercicio deberás prestar atención tanto a la sintaxis como a los errores que aparecen durante la ejecución.

Código inicial:

```python
estudiantes = ["Ana", "Carlos", "Luisa", "Pedro"]

notas = [4.5, 3.8, 4.9, 4.2]

for i in range(len(estudiantes))
	print(estudiantes[i], "obtuvo", notas[i])

print("Proceso finalizado")
```

Instrucciones:

Debes modificar el código para cumplir con los siguientes objetivos:

- Identificar el error de sintaxis que impide ejecutar el programa.
- Corregir dicho error respetando la estructura del ciclo.
- Verificar que el recorrido de ambas listas se realice correctamente.
- Mostrar el nombre de cada estudiante junto con su respectiva nota.
- Confirmar que el programa finalice mostrando el mensaje correspondiente.

```python run="Practicar >>" hidden
# Una institución educativa está desarrollando un sistema para
# registrar las calificaciones de varios estudiantes. Sin embargo, el
# programa contiene diferentes errores que impiden su correcto
# funcionamiento.
#
# Tu tarea consiste en analizar cuidadosamente el código, identificar
# los errores presentes y corregirlos para que el programa funcione
# correctamente.
#
# Durante este ejercicio deberás prestar atención tanto a la sintaxis
# como a los errores que aparecen durante la ejecución.
#
# Código inicial:
#
# estudiantes = ["Ana", "Carlos", "Luisa", "Pedro"]
#
# notas = [4.5, 3.8, 4.9, 4.2]
#
# for i in range(len(estudiantes))
# 	print(estudiantes[i], "obtuvo", notas[i])
#
# print("Proceso finalizado")
#
# Instrucciones:
#
# Debes modificar el código para cumplir con los siguientes objetivos:
#
# - Identificar el error de sintaxis que impide ejecutar el programa.
# - Corregir dicho error respetando la estructura del ciclo.
# - Verificar que el recorrido de ambas listas se realice
#   correctamente.
# - Mostrar el nombre de cada estudiante junto con su respectiva nota.
# - Confirmar que el programa finalice mostrando el mensaje
#   correspondiente.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear la lista de estudiantes.
estudiantes = ["Ana", "Carlos", "Luisa", "Pedro"]

# Crear la lista de calificaciones.
notas = [4.5, 3.8, 4.9, 4.2]

# Corregir el error de sintaxis agregando los dos puntos al final del ciclo for.
for i in range(len(estudiantes)):

	# Mostrar el nombre del estudiante junto con su calificación correspondiente.
	print(estudiantes[i], "obtuvo", notas[i])

# Confirmar que el programa terminó correctamente.
print("Proceso finalizado")
```
:::

### Ejercicio Práctico 2: Diagnóstico de Errores en un Sistema de Inventario

Una empresa almacena la información de sus productos utilizando dos listas: una contiene los nombres de los productos y otra las cantidades disponibles.

El desarrollador realizó varias modificaciones al programa y ahora este presenta errores durante su ejecución.

Tu objetivo será localizar el problema, comprender por qué ocurre y corregir el código para que funcione correctamente.

Código inicial:

```python
productos = [
	"Mouse",
	"Teclado",
	"Monitor",
	"Impresora"
]

cantidades = [15, 8, 12]

for i in range(len(productos)):
	print(productos[i], "-", cantidades[i])
```

Instrucciones:

Analiza cuidadosamente el código anterior y realiza las siguientes actividades:

- Ejecutar el programa para observar el mensaje de error generado por Python.
- Identificar el tipo de error que aparece durante la ejecución.
- Analizar por qué ambas listas producen dicho problema.
- Corregir los errores asociados.
- Recorrer correctamente ambas listas.
- Mostrar el nombre de cada producto junto con la cantidad disponible.
- Verificar que el programa termine sin generar excepciones.

```python run="Practicar >>" hidden
# Una empresa almacena la información de sus productos utilizando dos
# listas: una contiene los nombres de los productos y otra las
# cantidades disponibles.
#
# El desarrollador realizó varias modificaciones al programa y ahora
# este presenta errores durante su ejecución.
#
# Tu objetivo será localizar el problema, comprender por qué ocurre y
# corregir el código para que funcione correctamente.
#
# Código inicial:
#
# productos = [
# 	"Mouse",
# 	"Teclado",
# 	"Monitor",
# 	"Impresora"
# ]
#
# cantidades = [15, 8, 12]
#
# for i in range(len(productos)):
# 	print(productos[i], "-", cantidades[i])
#
# Instrucciones:
#
# Analiza cuidadosamente el código anterior y realiza las siguientes
# actividades:
#
# - Ejecutar el programa para observar el mensaje de error generado
#   por Python.
# - Identificar el tipo de error que aparece durante la ejecución.
# - Analizar por qué ambas listas producen dicho problema.
# - Corregir los errores asociados.
# - Recorrer correctamente ambas listas.
# - Mostrar el nombre de cada producto junto con la cantidad
#   disponible.
# - Verificar que el programa termine sin generar excepciones.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear la lista con los nombres de los productos.
productos = [
	"Mouse",
	"Teclado",
	"Monitor",
	"Impresora"
]

# Corregir la lista agregando la cantidad faltante.
cantidades = [15, 8, 12, 6]

# Recorrer ambas listas utilizando sus índices.
for i in range(len(productos)):

	# Mostrar el producto junto con su cantidad correspondiente.
	print(productos[i], "-", cantidades[i])

# Mostrar un mensaje indicando que el recorrido terminó correctamente.
print("Inventario procesado correctamente.")
```
:::

### Ejercicio Práctico 3: Depuración Completa de un Sistema de Procesamiento de Ventas

Una tienda desea calcular el precio final de varios productos aplicando un descuento del 15% a aquellos cuyo precio sea superior a 100 unidades monetarias.

Sin embargo, el programa desarrollado presenta múltiples errores de diferente naturaleza. Algunos impiden su ejecución, otros generan excepciones y algunos producen resultados incorrectos.

Como desarrollador encargado del mantenimiento del sistema, deberás analizar cuidadosamente el código, localizar todos los errores y realizar las correcciones necesarias.

Este ejercicio reúne los tres tipos de errores estudiados en esta unidad: errores de sintaxis, errores en tiempo de ejecución y errores lógicos.

Código inicial:

```python
precios = [80, 150, 220, 95, 310]

descuento = 15

for precio in precios

	if precio > 100:

		precio_final = precio + (precio * descuento / 100)

	else

		precio_final = precio

print("Precio final:", precio_final)

print(precios[10])
```

Instrucciones:

Analiza cuidadosamente el programa y realiza todas las correcciones necesarias.

Para ello deberás:

- Identificar todos los errores de sintaxis presentes en el código.
- Hacer las correcciones respectivas.
- Analizar el cálculo del descuento e identificar el error lógico presente.
- Hacer las modificaciones requeridas para que el descuento se aplique.
- Mostrar el precio final correspondiente para cada producto procesado.
- Eliminar el error asociado a la lista.
- Verificar que el programa complete toda su ejecución sin producir excepciones.
- Mostrar un mensaje indicando que el procesamiento de ventas finalizó correctamente.

```python run="Practicar >>" hidden
# Una tienda desea calcular el precio final de varios productos
# aplicando un descuento del 15% a aquellos cuyo precio sea superior a
# 100 unidades monetarias.
#
# Sin embargo, el programa desarrollado presenta múltiples errores de
# diferente naturaleza. Algunos impiden su ejecución, otros generan
# excepciones y algunos producen resultados incorrectos.
#
# Como desarrollador encargado del mantenimiento del sistema, deberás
# analizar cuidadosamente el código, localizar todos los errores y
# realizar las correcciones necesarias.
#
# Este ejercicio reúne los tres tipos de errores estudiados en esta
# unidad: errores de sintaxis, errores en tiempo de ejecución y
# errores lógicos.
#
# Código inicial:
#
# precios = [80, 150, 220, 95, 310]
#
# descuento = 15
#
# for precio in precios
#
# 	if precio > 100:
#
# 		precio_final = precio + (precio * descuento / 100)
#
# 	else
#
# 		precio_final = precio
#
# print("Precio final:", precio_final)
#
# print(precios[10])
#
# Instrucciones:
#
# Analiza cuidadosamente el programa y realiza todas las correcciones
# necesarias.
#
# Para ello deberás:
#
# -Identificar todos los errores de sintaxis presentes en el código.
# - Hacer las correcciones respectivas.
# - Analizar el cálculo del descuento e identificar el error lógico
#   presente.
# - Hacer las modificaciones requeridas para que el descuento se
#   aplique.
# - Mostrar el precio final correspondiente para cada producto
#   procesado.
# - Eliminar el error asociado a la lista.
# - Verificar que el programa complete toda su ejecución sin producir
#   excepciones.
# - Mostrar un mensaje indicando que el procesamiento de ventas
#   finalizó correctamente.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear la lista con los precios de los productos.
precios = [80, 150, 220, 95, 310]

# Definir el porcentaje de descuento.
descuento = 15

# Recorrer todos los precios almacenados en la lista.
for precio in precios:

	# Verificar si el producto debe recibir descuento.
	if precio > 100:

		# Corregir el error lógico restando el descuento al precio original.
		precio_final = precio - (precio * descuento / 100)

	# Mantener el precio original cuando no aplica descuento.
	else:

		precio_final = precio

	# Mostrar el precio final correspondiente al producto procesado.
	print("Precio final:", precio_final)

# Eliminar el acceso a una posición inexistente de la lista para evitar un IndexError.

# Mostrar un mensaje indicando que todo el proceso terminó correctamente.
print("Procesamiento de ventas finalizado correctamente.")
```
:::

## Conclusiones de la Unidad

A lo largo de esta unidad aprendiste que los errores forman parte natural del proceso de desarrollo de software y que identificarlos correctamente es una habilidad fundamental para cualquier programador. Conociste las diferencias entre los errores de sintaxis, que impiden la ejecución del programa; los errores en tiempo de ejecución, que aparecen mientras el código se está ejecutando; y los errores lógicos, que producen resultados incorrectos sin generar mensajes de error. Además, comprendiste la importancia de interpretar los mensajes proporcionados por Python, analizar cuidadosamente el comportamiento del programa y aplicar un proceso sistemático de depuración para localizar y corregir fallos. Estos conocimientos constituyen la base para abordar el manejo de excepciones en las siguientes unidades, permitiéndote desarrollar aplicaciones más robustas, confiables y fáciles de mantener.
