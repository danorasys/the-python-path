---
title: Manejo de Excepciones con `try` y `except`
summary: En esta unidad descubrirás cómo manejar errores de forma controlada mediante los bloques `try` y `except`, evitando que un programa termine inesperadamente cuando ocurre una excepción. Aprenderás a capturar distintos tipos de errores, responder adecuadamente a cada uno de ellos y proporcionar mensajes claros al usuario, desarrollando aplicaciones más robustas, confiables y capaces de continuar su ejecución incluso cuando se presentan situaciones imprevistas.
order: 2
---

Cuando un programa se ejecuta, pueden ocurrir situaciones inesperadas que impidan continuar con normalidad. Por ejemplo, un usuario puede introducir un dato inválido, intentar dividir un número entre cero o solicitar un elemento que no existe dentro de una lista. Si estos problemas no son gestionados, Python detendrá inmediatamente la ejecución del programa y mostrará un mensaje de error, lo que puede generar una mala experiencia para el usuario y dificultar el funcionamiento de la aplicación.

Para evitar que esto suceda, Python incorpora un mecanismo denominado manejo de excepciones, el cual permite detectar errores durante la ejecución y decidir cómo responder ante ellos. Gracias a este mecanismo es posible mostrar mensajes claros al usuario, solicitar nuevamente información, registrar el error para su análisis o continuar ejecutando el resto del programa cuando sea apropiado.

En esta unidad aprenderás a utilizar los bloques `try` y `except`, comprenderás cómo funciona el flujo de ejecución cuando ocurre una excepción y conocerás distintas estrategias para capturar errores específicos, haciendo que tus programas sean considerablemente más robustos, seguros y fáciles de mantener.

## ¿Qué Son las Excepciones?

Una excepción es un evento que ocurre durante la ejecución de un programa cuando Python detecta una situación que impide continuar normalmente con la instrucción actual.

Cuando aparece una excepción, Python interrumpe el flujo normal del programa y busca un bloque de código preparado para manejar ese error. Si no encuentra ninguno, la ejecución finaliza mostrando un mensaje de error (**_Traceback_**).

Por ejemplo, observa el siguiente código:

```python run
numero = 10
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

En este caso, Python detecta que una división entre cero no está permitida y genera automáticamente una excepción de tipo `ZeroDivisionError`.

Otro ejemplo:

```python run
numeros = [5, 8, 10]

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

Aquí Python intenta acceder a una posición inexistente dentro de la lista. Se genera una excepción de tipo `IndexError`.

Es importante comprender que las excepciones son situaciones que ocurren durante la ejecución del programa y que deben ser gestionadas adecuadamente.

### ¿Qué Ocurre Cuando Aparece una Excepción?

Cuando Python detecta una excepción sigue, de manera simplificada, el siguiente proceso:

- Ejecuta normalmente las instrucciones.
- Encuentra una operación que produce un error.
- Genera una excepción correspondiente al tipo de error.
- Busca un bloque `except` capaz de manejar dicha excepción.
- Si existe, ejecuta ese bloque y continúa el programa.
- Si no existe, finaliza la ejecución mostrando el mensaje de error.

Este mecanismo permite separar el código "normal" del código destinado al manejo de errores.

### ¿Por Qué Manejar Excepciones?

Manejar excepciones ofrece numerosas ventajas durante el desarrollo de software.

Entre las principales se encuentran:

- Evitar que el programa termine inesperadamente.
- Mostrar mensajes más comprensibles para el usuario.
- Detectar situaciones excepcionales de forma controlada.
- Continuar ejecutando otras partes del programa cuando sea posible.
- Facilitar el mantenimiento y depuración del código.
- Mejorar la robustez y confiabilidad de las aplicaciones.

Supongamos un programa que solicita la edad del usuario.

Sin manejo de excepciones:

```python
edad = int(input("Ingrese su edad: "))

print("Su edad es:", edad)
```

Si el usuario escribe:

```python
veinte
```

Python mostrará:

```python
PythonError: Traceback (most recent call last):
  File "/lib/python311.zip/_pyodide/_base.py", line 573, in eval_code_async
    await CodeRunner(
  File "/lib/python311.zip/_pyodide/_base.py", line 395, in run_async
    await coroutine
  File "<exec>", line 9, in <module>
  File "<exec>", line 5, in __runner__
ValueError: invalid literal for int() with base 10: 'veinte'
```

```python run hidden
edad = int(input("Ingrese su edad: "))

print("Su edad es:", edad)
```

Y el programa finalizará inmediatamente.

En cambio, utilizando manejo de excepciones, el programa puede informar el problema sin finalizar abruptamente.

### Situaciones Donde es Recomendable Utilizar Excepciones

El manejo de excepciones resulta especialmente útil cuando el programa interactúa con elementos externos que no siempre pueden controlarse.

Por ejemplo:

- Entrada de datos del usuario.
- Lectura de archivos.
- Escritura de archivos.
- Conexiones de red.
- Bases de datos.
- Acceso a índices de listas.
- Conversión de tipos de datos.
- Operaciones matemáticas.

En todos estos casos pueden ocurrir situaciones inesperadas que conviene controlar.

## El Bloque `try`

El bloque `try` contiene el código que podría generar una excepción.

Su función consiste en indicar a Python:

"Intenta ejecutar este código. Si ocurre un error, no detengas inmediatamente el programa; permite que otro bloque lo gestione".

La estructura básica es:

```python
try:
    # Código que puede producir una excepción
```

Por sí solo, un bloque `try` no tiene utilidad.

Siempre debe ir acompañado de al menos un bloque `except`.

Ejemplo sencillo:

```python
try:
    numero = 10 / 0
```

Durante la ejecución ocurre una división entre cero.

Como el bloque está dentro de `try`, Python buscará inmediatamente un bloque `except` que pueda manejar esa excepción. En este momento, no hay un bloque `except` que maneje la excepción.

### ¿Qué Instrucciones Colocar Dentro del `try`?

Dentro del bloque `try` únicamente deberían ubicarse aquellas instrucciones que realmente pueden producir una excepción.

Por ejemplo:

```python
try:
    numero = int(input("Número: "))
    resultado = 100 / numero
```

En este ejemplo pueden producirse dos excepciones distintas:

- `ValueError`.
- `ZeroDivisionError`.

Ambas ocurren únicamente durante esas instrucciones.

## El Bloque `except`

El bloque `except` contiene el código que debe ejecutarse cuando ocurre una excepción.

Su estructura básica es:

```python
try:
    # Código
except:
    # Manejo del error
```

Ejemplo:

```python run
try:
    numero = 10 / 0
except:
    print("Ocurrió un error.")
```

```output
Ocurrió un error.
```

El programa no finaliza abruptamente.

### Continuación del Programa

Una gran ventaja del manejo de excepciones es que el programa puede continuar ejecutándose.

```python run
try:
    numero = 10 / 0
except:
    print("No fue posible realizar la división.")

print("El programa continúa.")
```

```output
No fue posible realizar la división.
El programa continúa.
```

### ¿Es Recomendable Usar un `except` Vacío?

Python permite escribir:

```python
except:
```

Sin embargo, esto no es una buena práctica, ya que captura cualquier excepción sin distinguir cuál ocurrió.

Es mucho más recomendable indicar explícitamente el tipo de excepción.

## Flujo de Ejecución de un `try-except`

Comprender el flujo de ejecución es fundamental para utilizar correctamente las excepciones.

Observa el siguiente ejemplo:

```python run
print("Inicio")

try:
    print("Antes del error")
    numero = 10 / 0
    print("Después del error")
except ZeroDivisionError:
    print("Se produjo una división entre cero.")

print("Fin")
```

```output
Inicio
Antes del error
Se produjo una división entre cero.
Fin
```

Observa que la línea:

```python
print("Después del error")
```

Nunca se ejecuta, porque la excepción interrumpe inmediatamente el bloque `try`.

### Flujo Cuando NO Ocurre Ninguna Excepción

```python run
try:
    numero = 20 / 4
    print(numero)
except ZeroDivisionError:
    print("Error.")
```

```output
5.0
```

En este caso el bloque `except` jamás se ejecuta.

### Capturar Excepciones Específicas

Una de las mejores prácticas consiste en capturar únicamente las excepciones que realmente esperamos.

Ejemplo:

```python
try:
    numero = int(input("Número: "))
except ValueError:
    print("Debe ingresar un número entero.")
```

Aquí únicamente se captura un `ValueError`.

La ejecución del anterior código genera la siguiente salida:

```python
Debe ingresar un número entero.
```

```python run hidden
try:
    numero = int(input("Número: "))
except ValueError:
    print("Debe ingresar un número entero.")
```

Otro ejemplo:

```python run
try:
    numeros = [10, 20, 30]
    print(numeros[5])
except IndexError:
    print("La posición indicada no existe.")
```

```output
La posición indicada no existe.
```

#### Ventajas de Capturar Excepciones Específicas

- El código es más claro.
- Facilita la depuración.
- Evita ocultar errores inesperados.
- Mejora el mantenimiento del programa.

### Capturar Múltiples Excepciones

En ocasiones una misma sección del programa puede producir diferentes tipos de excepciones.

Por ejemplo:

```python
try:
    numero = int(input("Número: "))
    resultado = 100 / numero
except ValueError:
    print("Debe ingresar un número entero.")
except ZeroDivisionError:
    print("No es posible dividir entre cero.")
```

Por lo tanto, si se ingresase una entrada como `cinco`, entonces se obtendría la siguiente salida:

```python
Debe ingresar un número entero.
```

Además, si se ingresara el valor `0`, entonces se obtendría la siguiente salida:

```python
No es posible dividir entre cero.
```

```python run hidden
try:
    numero = int(input("Número: "))
    resultado = 100 / numero
except ValueError:
    print("Debe ingresar un número entero.")
except ZeroDivisionError:
    print("No es posible dividir entre cero.")
```

Cada excepción posee su propio bloque.

También es posible agrupar varias excepciones cuando el tratamiento será exactamente el mismo.

```python run
try:
    numero = int(input("Número: "))
    resultado = 100 / numero
except (ValueError, ZeroDivisionError):
    print("Los datos ingresados no son válidos.")
```

En este caso ambas excepciones ejecutarán exactamente el mismo bloque.

Por consiguiente, si se ingresara cualquiera de las dos entradas anteriormente planteadas, se obtendría la siguiente salida:

```output
Los datos ingresados no son válidos.
```

### ¿Cuál Bloque `except` Se Ejecuta?

Python analiza los bloques `except` en el orden en que aparecen.

Cuando encuentra el primero que coincide con la excepción generada, ejecuta únicamente ese bloque.

Los demás bloques ya no se evalúan.

### Capturar la Excepción Como Objeto (`as`)

En muchas ocasiones resulta útil conocer el mensaje exacto generado por Python.

Para ello puede utilizarse la palabra reservada `as`.

Su sintaxis es:

```python
except TipoDeExcepcion as variable:
```

Ejemplo:

```python
try:
    numero = int(input("Número: "))
except ValueError as error:
    print(error)
```

Si el usuario escribe:

```python
hola
```

Se nos muestra la siguiente salida:

```python
invalid literal for int() with base 10: 'hola'
```

```python run hidden
try:
    numero = int(input("Número: "))
except ValueError as error:
    print(error)
```

La variable `error` almacena el objeto de la excepción.

Otro ejemplo:

```python run
try:
    lista = [1, 2, 3]
    print(lista[8])
except IndexError as error:
    print("Detalle del error:")
    print(error)
```

```output
Detalle del error:
list index out of range
```

Esto resulta muy útil durante la depuración.

#### ¿Cuándo Utilizar `as`?

Es recomendable utilizarlo cuando:

- Se desea registrar el error en un archivo.
- Se necesita mostrar el mensaje original.
- Se está depurando un programa.
- Se desea obtener información adicional sobre la excepción.

## Tabla Comparativa

| Concepto | Propósito | ¿Cuándo se Ejecuta? | Ejemplo |
| --- | --- | --- | --- |
| `try` | Contiene el código que puede producir una excepción. | Siempre que el programa llega a ese bloque. | `try:  numero = int(input())` |
| `except` | Captura y maneja una excepción. | Solo cuando ocurre una excepción compatible. | `except ValueError:` |
| Excepción específica | Maneja un único tipo de error. | Cuando ocurre exactamente esa excepción. | `except IndexError:` |
| Múltiples excepciones | Maneja varios tipos de error. | Cuando ocurre cualquiera de las excepciones indicadas. | `except (ValueError, TypeError):` |
| `as` | Permite acceder al objeto de la excepción. | Cuando se desea conocer el detalle del error. | `except ValueError as error:` |

## Ejemplos Detallados

### Ejemplo 1: Conversión Segura de Números

```python
try:
    edad = int(input("Ingrese su edad: "))
    print("Edad registrada:", edad)
except ValueError:
    print("Debe ingresar únicamente números enteros.")
```

Si el usuario introduce un texto, el programa no finalizará abruptamente y mostrará un mensaje comprensible.

Por ejemplo, si el usuario ingresa:

```python
hola mundo
```

Entonces se obtendrá la siguiente salida:

```python
Debe ingresar únicamente números enteros.
```

Adicionalmente, si no se recurre a la excepción, por ejemplo, por medio de la siguiente entrada válida por parte del usuario:

```python
21
```

Entonces, se obtendrá la siguiente salida:

```python
Edad registrada: 21
```

```python run hidden
try:
    edad = int(input("Ingrese su edad: "))
    print("Edad registrada:", edad)

except ValueError:
    print("Debe ingresar únicamente números enteros.")
```

### Ejemplo 2: División Segura

```python
try:
    numerador = float(input("Numerador: "))
    denominador = float(input("Denominador: "))

    resultado = numerador / denominador

    print("Resultado:", resultado)
except ZeroDivisionError:
    print("No es posible dividir entre cero.")
except ValueError:
    print("Debe ingresar únicamente valores numéricos.")
```

Este ejemplo controla dos situaciones diferentes utilizando excepciones específicas.

Por lo tanto, la primera excepción se daría si el usuario ingresa el número cero como denominador:

```python
7
0
```

Con la anterior entrada, entonces se obtendrá la siguiente salida:

```python
No es posible dividir entre cero.
```

Adicionalmente, la segunda excepción maneja el caso cuando el usuario ingresa un valor NO numérico en algunos de los dos operandos de la división, por ejemplo:

```python
python
```

Obteniéndose la siguiente salida:

```python
Debe ingresar únicamente valores numéricos.
```

Por último, si el usurio ingresa un valor numérico valido para cada uno de los operandos, por ejemplo:

```python
72
8
```

Entonces, se obtendría la siguiente salida, correspondiente al resultado normal de la división:

```python
9.0
```

```python run hidden
try:
    numerador = float(input("Numerador: "))
    denominador = float(input("Denominador: "))

    resultado = numerador / denominador

    print("Resultado:", resultado)
except ZeroDivisionError:
    print("No es posible dividir entre cero.")
except ValueError:
    print("Debe ingresar únicamente valores numéricos.")
```

### Ejemplo 3: Acceso Seguro a una Lista

```python
try:
    frutas = [
        "Manzana",
        "Pera",
        "Banano"
    ]

    posicion = int(input("Posición: "))

    print(frutas[posicion])
except IndexError:
    print("La posición indicada no existe.")
except ValueError:
    print("Debe ingresar un número entero.")
```

El programa evita que una posición inválida provoque la terminación de la ejecución.

La primera excepción, referente a `IndexError`, maneja el caso cuando el usuario ingresa un índice que está fuera del rango de índices la lista, por ejemplo:

```python
9
```

Por lo cual, se obtendría la siguiente salida:

```python
La posición indicada no existe.
```

Adicionalmente, la segunda excepción, referente a `ValueError`, se da cuando el usuario ingresa una entrada distinta de un número entero, por ejemplo:

```python
codigo
```

Por lo cual, se obtendría la siguiente salida:

```python
Debe ingresar un número entero.
```

Por último, si se ingresa un valor de índice válido para la lista correspondiente, por ejemplo:

```python
1
```

Entonces, se obtendrá el elemento correspondiente a dicho índice:

```python
Pera
```

```python run hidden
try:
    frutas = [
        "Manzana",
        "Pera",
        "Banano"
    ]

    posicion = int(input("Posición: "))

    print(frutas[posicion])
except IndexError:
    print("La posición indicada no existe.")
except ValueError:
    print("Debe ingresar un número entero.")
```

### Ejemplo 4: Mostrar el Detalle de la Excepción

```python
try:
    numero = int(input("Número: "))
except ValueError as error:
    print("Se produjo una excepción.")
    print("Detalle:", error)
```

Además de informar que ocurrió un error, el programa muestra el mensaje generado por Python, lo cual resulta muy útil durante el proceso de depuración.

Por ejemplo, si se fuerza el error por medio de la siguiente entrada:

```python
c++
```

Entonces se obtendrá la siguiente salida:

```python
Se produjo una excepción.
Detalle: invalid literal for int() with base 10: 'c++'
```

```python run hidden
try:
    numero = int(input("Número: "))
except ValueError as error:
    print("Se produjo una excepción.")
    print("Detalle:", error)
```

:::note[Notas:]
**1.** El manejo de excepciones no evita que ocurran los errores; simplemente proporciona un mecanismo para detectarlos y decidir cómo actuar cuando aparecen.\
**2.** Siempre que sea posible, captura únicamente las excepciones que esperas que puedan ocurrir. Evita utilizar `except:` sin especificar el tipo de excepción, ya que puede ocultar errores importantes y dificultar la depuración del programa.\
**3.** Si estás utilizando esta plataforma para ejecutar el código directamente desde el navegador, es posible que observes mensajes de error más extensos que los mostrados habitualmente en un entorno local de Python. Esto ocurre porque el código es ejecutado mediante una versión de Python integrada en el navegador (**_Pyodide_**), la cual añade información interna relacionada con el proceso de ejecución. No te preocupes por esas líneas adicionales; para identificar el problema debes centrarte en la última parte del mensaje, donde Python indica el tipo de excepción (`ValueError`, `IndexError`, `ZeroDivisionError`, etc.) y una breve descripción de la causa del error.
:::

:::tip[Tips:]
**1.** Organiza el código colocando dentro del bloque `try` únicamente las instrucciones que realmente pueden producir una excepción. De esta forma el manejo de errores será más claro y el programa resultará más fácil de mantener.\
**2.** Cuando aparezca un mensaje de error muy largo, acostúmbrate a leerlo de abajo hacia arriba. En la mayoría de los casos, las últimas líneas contienen la información más importante para identificar y solucionar el problema.\
**3.** Durante el desarrollo de un programa es recomendable utilizar `except TipoDeExcepcion as error`, ya que permite acceder al mensaje original de la excepción. Esto facilita la depuración y ayuda a comprender con mayor precisión por qué ocurrió el error antes de mostrar un mensaje más amigable al usuario.
:::

## Ejercicios para Practicar

### Ejercicio 1: Calculadora Segura

Una pequeña empresa está desarrollando una calculadora para realizar operaciones matemáticas básicas. Sin embargo, algunos usuarios ingresan valores inválidos, como texto en lugar de números o intentan dividir entre cero, ocasionando que el programa termine inesperadamente.

Tu objetivo es hacer que la calculadora sea capaz de manejar estos errores utilizando `try` y `except`.

Instrucciones:

Construye un programa que cumpla con los siguientes requerimientos:

- Solicita al usuario dos números utilizando `input()`.
- Convierte ambos valores al tipo `float`.
- Calcula la división del primer número entre el segundo.
- Si el usuario escribe un valor que no sea numérico, informa que el dato ingresado no es válido.
- Si intenta dividir entre cero, informa claramente el problema.
- Si no ocurre ningún error, muestra el resultado de la división.

```python run="Practicar >>" hidden
# Ejercicio 1: Calculadora Segura
#
# Una pequeña empresa está desarrollando una calculadora para realizar
# operaciones matemáticas básicas. Sin embargo, algunos usuarios
# ingresan valores inválidos, como texto en lugar de números o
# intentan dividir entre cero, ocasionando que el programa termine
# inesperadamente.
#
# Tu objetivo es hacer que la calculadora sea capaz de manejar estos
# errores utilizando try y except.
#
# Instrucciones:
# Construye un programa que cumpla con los siguientes requerimientos:
# - Solicita al usuario dos números utilizando input().
# - Convierte ambos valores al tipo float.
# - Calcula la división del primer número entre el segundo.
# - Si el usuario escribe un valor que no sea numérico, informa que el
#   dato ingresado no es válido.
# - Si intenta dividir entre cero, informa claramente el problema.
# - Si no ocurre ningún error, muestra el resultado de la división.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
try:
    # Solicitar el primer número al usuario.
    numero1 = float(input("Ingrese el primer número: "))
    # Solicitar el segundo número al usuario.
    numero2 = float(input("Ingrese el segundo número: "))
    # Realizar la división.
    resultado = numero1 / numero2
    # Mostrar el resultado obtenido.
    print("Resultado:", resultado)
# Capturar errores cuando el usuario escribe un valor no numérico.
except ValueError:
    print("Error: Debe ingresar únicamente números.")
# Capturar el intento de dividir entre cero.
except ZeroDivisionError:
    print("Error: No es posible dividir entre cero.")
```
:::

### Ejercicio 2: Analizador de Lista de Datos

Un sistema recibe una lista de datos provenientes de un sensor. Algunos registros contienen información correcta, mientras que otros presentan errores.

El objetivo es recorrer toda la lista y procesar cada elemento sin que el programa se detenga cuando encuentre un dato inválido.

Lista inicial:

```python
datos = [15, 28, "error", 42, 17, "Python", 65, 80]
```

Instrucciones:

Construye un programa que realice las siguientes acciones:

- Recorre todos los elementos de la lista utilizando un ciclo `for`.
- Intenta sumar 10 a cada elemento.
- Si el elemento es un número, muestra el resultado.
- Si el elemento no es un número, captura la excepción correspondiente.
- Muestra un mensaje indicando cuál fue el dato que produjo el error.
- El programa debe continuar procesando el resto de elementos aunque encuentre errores.

```python run="Practicar >>" hidden
# Ejercicio 2: Analizador de Lista de Datos
#
# Un sistema recibe una lista de datos provenientes de un sensor.
# Algunos registros contienen información correcta, mientras que otros
# presentan errores.
#
# El objetivo es recorrer toda la lista y procesar cada elemento sin
# que el programa se detenga cuando encuentre un dato inválido.
#
# Lista inicial:
# datos = [15, 28, "error", 42, 17, "Python", 65, 80]
#
# Instrucciones:
# Construye un programa que realice las siguientes acciones:
# - Recorre todos los elementos de la lista utilizando un ciclo for.
# - Intenta sumar 10 a cada elemento.
# - Si el elemento es un número, muestra el resultado.
# - Si el elemento no es un número, captura la excepción
#   correspondiente.
# - Muestra un mensaje indicando cuál fue el dato que produjo el error.
# - El programa debe continuar procesando el resto de elementos aunque
#   encuentre errores.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crear la lista de datos.
datos = [15, 28, "error", 42, 17, "Python", 65, 80]

# Recorrer todos los elementos de la lista.
for dato in datos:
    # Intentar realizar la operación.
    try:
        # Sumar 10 al elemento actual.
        resultado = dato + 10
        # Mostrar el resultado obtenido.
        print("Resultado:", resultado)
    # Capturar errores cuando el dato no sea numérico.
    except TypeError:
        print("No fue posible procesar el valor:", dato)
```
:::

### Ejercicio 3: Sistema de Registro de Usuarios

Una aplicación solicita información para registrar nuevos usuarios.

Durante el proceso pueden presentarse diferentes problemas:

- El usuario puede escribir texto donde se espera una edad.
- Puede ingresar una edad negativa.
- Puede dejar algunos datos vacíos.
- Incluso podrían ocurrir errores inesperados.

Tu tarea consiste en construir un programa robusto utilizando varios bloques `except` para manejar cada situación.

Instrucciones:

Construye un programa que realice las siguientes acciones:

- Solicita el nombre del usuario.
- Solicita la edad.
- Convierte la edad a entero.
- Verifica que la edad sea mayor o igual que cero.
- Si la edad es negativa, genera manualmente una excepción utilizando `raise ValueError`.
- Si todo es correcto, muestra un mensaje indicando que el registro fue exitoso.
- Si ocurre un `ValueError`, informa el motivo del error.
- Si ocurre cualquier otra excepción inesperada, captura el error utilizando `Exception`.
- Muestra siempre un mensaje indicando que el proceso de registro ha finalizado.

```python run="Practicar >>" hidden
# Ejercicio 3: Sistema de Registro de Usuarios
#
# Una aplicación solicita información para registrar nuevos usuarios.
#
# Durante el proceso pueden presentarse diferentes problemas:
# - El usuario puede escribir texto donde se espera una edad.
# - Puede ingresar una edad negativa.
# - Puede dejar algunos datos vacíos.
# - Incluso podrían ocurrir errores inesperados.
#
# Tu tarea consiste en construir un programa robusto utilizando varios
# bloques except para manejar cada situación.
#
# Instrucciones:
# Construye un programa que realice las siguientes acciones:
# - Solicita el nombre del usuario.
# - Solicita la edad.
# - Convierte la edad a entero.
# - Verifica que la edad sea mayor o igual que cero.
# - Si la edad es negativa, genera manualmente una excepción
#   utilizando raise ValueError.
# - Si todo es correcto, muestra un mensaje indicando que el registro
#   fue exitoso.
# - Si ocurre un ValueError, informa el motivo del error.
# - Si ocurre cualquier otra excepción inesperada, captura el error
#   utilizando Exception.
# - Muestra siempre un mensaje indicando que el proceso de registro ha
#   finalizado.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Iniciar el bloque de manejo de excepciones.
try:
    # Solicitar el nombre del usuario.
    nombre = input("Ingrese su nombre: ")
    # Solicitar la edad.
    edad = int(input("Ingrese su edad: "))

    # Verificar que la edad no sea negativa.
    if edad < 0:
        # Generar manualmente una excepción.
        raise ValueError("La edad no puede ser negativa.")

    # Mostrar el mensaje de registro exitoso.
    print("Usuario registrado correctamente.")
# Capturar errores relacionados con valores inválidos.
except ValueError as error:
    # Mostrar el mensaje específico del error.
    print("Error:", error)
# Capturar cualquier otra excepción inesperada.
except Exception as error:
    # Mostrar información sobre el error ocurrido.
    print("Ha ocurrido un error inesperado.")
    print(error)

# Ejecutar este mensaje independientemente del resultado.
print("El proceso de registro ha finalizado.")
```
:::

## Conclusiones de la Unidad

El manejo de excepciones mediante los bloques `try` y `except` constituye una de las herramientas más importantes para desarrollar aplicaciones robustas en Python. En lugar de permitir que un error detenga completamente la ejecución del programa, las excepciones ofrecen la posibilidad de detectar situaciones inesperadas, responder adecuadamente a cada una de ellas y continuar con la ejecución cuando sea posible.

A lo largo de esta unidad aprendiste qué es una excepción, cómo funciona el flujo de ejecución de un bloque `try-except`, cómo capturar errores específicos, cómo manejar múltiples excepciones y cómo acceder a la información detallada del error mediante la cláusula `as`. También observaste que un buen manejo de excepciones mejora significativamente la experiencia del usuario al proporcionar mensajes claros y evitar cierres inesperados de la aplicación.

Estos conocimientos servirán como base para la siguiente unidad, donde ampliarás el manejo de excepciones utilizando los bloques `else` y `finally`, permitiendo ejecutar instrucciones únicamente cuando no ocurran errores o garantizar que determinadas acciones se ejecuten siempre, independientemente del resultado del programa.
