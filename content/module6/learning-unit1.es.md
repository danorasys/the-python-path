---
title: Funciones Recursivas (Introducción)
summary: En esta unidad aprenderás qué es la recursión, una técnica en la que una función se llama a sí misma para resolver un problema dividiéndolo en versiones más pequeñas del mismo. Comprenderás la importancia del caso base para evitar ciclos infinitos y analizarás ejemplos sencillos que te ayudarán a desarrollar el pensamiento lógico y la capacidad de descomponer problemas complejos en pasos más simples.
order: 1
---

Las funciones recursivas son funciones que tienen la capacidad de llamarse a sí mismas para resolver un problema. La idea principal consiste en dividir una tarea grande en versiones más pequeñas del mismo problema hasta llegar a una situación simple que pueda resolverse directamente. Este enfoque es muy utilizado en informática para resolver problemas relacionados con estructuras jerárquicas, búsqueda, recorrido de datos y algoritmos matemáticos.

## ¿Qué es la Recursión?

Una función recursiva es una función que se ejecuta a sí misma durante su proceso de resolución.

Observa el siguiente ejemplo conceptual:

```python
def ejemplo():
    ejemplo()
```

Aunque la función se llama a sí misma, este código tiene un problema importante: nunca termina.

:::note
Una función recursiva siempre debe tener una condición que detenga las llamadas recursivas. De lo contrario, el programa entrará en una recursión infinita.
:::

## El Caso Base

El caso base es la condición que indica cuándo la función debe dejar de llamarse a sí misma.

Sin un caso base, la recursión nunca finaliza.

Estructura general:

```python
def funcion():

    if condicion_base:
        return resultado

return funcion()
```

## Primer Ejemplo: Cuenta Regresiva

Supongamos que queremos mostrar una cuenta regresiva desde un número hasta cero.

```python run
def cuenta_regresiva(numero):

    if numero == 0:
        print("¡Despegue!")
        return

    print(numero)
    cuenta_regresiva(numero - 1)

cuenta_regresiva(5)
```

```output
5
4
3
2
1
¡Despegue!
```

### ¿Qué Ocurre Internamente?

| Llamada | Acción |
| --- | --- |
| `cuenta_regresiva(5)` | Imprime 5 |
| `cuenta_regresiva(4)` | Imprime 4 |
| `cuenta_regresiva(3)` | Imprime 3 |
| `cuenta_regresiva(2)` | Imprime 2 |
| `cuenta_regresiva(1)` | Imprime 1 |
| `cuenta_regresiva(0)` | Caso base |

:::tip
Cuando estudies recursión, intenta imaginar una pila de llamadas donde cada ejecución espera a que termine la siguiente.
:::

## Ejemplo Clásico: Factorial

El factorial de un número se define como:

```python
5! = 5 × 4 × 3 × 2 × 1
```

Resultado:

```python
5! = 120
```

### Implementación Recursiva

```python run
def factorial(numero):

    if numero == 1:
        return 1

    return numero * factorial(numero - 1)

print(factorial(5))
```

```output
120
```

### Descomposición Paso a Paso

```python
factorial(5)

5 × factorial(4)

5 × (4 × factorial(3))

5 × (4 × (3 × factorial(2)))

5 × (4 × (3 × (2 × factorial(1))))

5 × 4 × 3 × 2 × 1

120
```

:::note
La recursión suele parecer compleja al principio porque una función se ejecuta muchas veces antes de devolver el resultado final.
:::

## Recursión para Sumar Números

Supongamos que deseamos sumar todos los números desde 1 hasta un valor dado.

Ejemplo:

```python
1 + 2 + 3 + 4 + 5 = 15
```

### Solución Recursiva

```python run
def suma_hasta(numero):

    if numero == 1:
        return 1

    return numero + suma_hasta(numero - 1)

print(suma_hasta(5))
```

```output
15
```

### Visualizando la Recursión

Veamos cómo se expande:

```python
suma_hasta(5)

5 + suma_hasta(4)

5 + (4 + suma_hasta(3))

5 + (4 + (3 + suma_hasta(2)))

5 + (4 + (3 + (2 + suma_hasta(1))))

5 + 4 + 3 + 2 + 1

15
```

## Ventajas de la Recursión

- Permite expresar soluciones de forma elegante.
- Facilita resolver problemas que tienen estructura repetitiva.
- Ayuda a desarrollar el pensamiento lógico.
- Se utiliza en numerosos algoritmos avanzados.

## Desventajas de la Recursión

- Puede consumir más memoria.
- Puede ser más lenta que algunos bucles.
- Una mala condición base puede generar errores.

## Comparación General

| Característica | Bucles | Recursión |
| --- | --- | --- |
| Repetición | Sí | Sí |
| Fácil para principiantes | Sí | Menos |
| Requiere caso base | No | Sí |
| Uso frecuente | Muy alto | Situacional |

:::tip
Antes de escribir una función recursiva, identifica claramente dos cosas: el caso base y cómo reducir el problema en cada llamada.
:::

## Ejemplo: Contar Caracteres de una Cadena

Supongamos que queremos contar cuántos caracteres tiene un texto usando recursión.

```python run
def contar_caracteres(texto):

    if texto == "":
        return 0

    return 1 + contar_caracteres(texto[1:])

print(contar_caracteres("Python"))
```

```output
6
```

### ¿Qué Sucede?

```python
"Python"

1 + contar_caracteres("ython")

1 + 1 + contar_caracteres("thon")

1 + 1 + 1 + contar_caracteres("hon")

...

6
```

## Buenas Prácticas

- Definir siempre un caso base claro.
- Reducir el problema en cada llamada.
- Evitar recursiones infinitas.
- Probar primero con valores pequeños.
- Utilizar nombres descriptivos para las funciones.

## Ejercicios para Practicar

### Ejercicio 1: Suma de los Primeros Números Naturales

Crea una función recursiva llamada `sumar_naturales()` que reciba un número entero positivo.

La función debe calcular la suma de todos los números desde 1 hasta dicho número.

Por ejemplo:

```python
sumar_naturales(4)

1 + 2 + 3 + 4 = 10
```

No debes utilizar bucles (`for` o `while`).

```python practice
# Crea una función recursiva llamada sumar_naturales() que reciba un
# número entero positivo.
# La función debe calcular la suma de todos los números desde 1 hasta
# dicho número.
# No debes utilizar bucles (for o while).
```

:::details
```python run
# Crea una función recursiva llamada sumar_naturales() que reciba un
# número entero positivo.
# La función debe calcular la suma de todos los números desde 1 hasta
# dicho número.
# No debes utilizar bucles (for o while).

def sumar_naturales(numero):

    if numero == 1:
        return 1

    return numero + sumar_naturales(numero - 1)

print(sumar_naturales(4))
```
:::

### Ejercicio 2: Potencia Recursiva

Desarrolla una función llamada `potencia()` que reciba dos parámetros:

- Base.
- Exponente.

La función debe calcular la potencia utilizando únicamente recursión.

Ejemplo:

```python
2^4 = 16
```

No utilices el operador `**`.

```python practice
# Desarrolla una función llamada potencia() que reciba dos parámetros:
# - Base.
# - Exponente.
# La función debe calcular la potencia utilizando únicamente recursión.
# No utilices el operador **.
```

:::details
```python run
# Desarrolla una función llamada potencia() que reciba dos parámetros:
# - Base.
# - Exponente.
# La función debe calcular la potencia utilizando únicamente recursión.
# No utilices el operador **.

def potencia(base, exponente):

    if exponente == 0:
        return 1

    return base * potencia(base, exponente - 1)

print(potencia(2, 4))
```
:::

### Ejercicio 3: Contador de Vocales Recursivo

Crea una función llamada `contar_vocales()` que reciba una cadena de texto.

La función debe recorrer el texto de forma recursiva y devolver cuántas vocales contiene.

Por ejemplo:

```python
"Programacion"

Resultado: 5
```

Debes utilizar:

- Slicing.
- Condicionales.
- Recursión.

No utilices bucles.

```python practice
# Crea una función llamada contar_vocales() que reciba una cadena de
# texto.
# La función debe recorrer el texto de forma recursiva y devolver
# cuántas vocales contiene.
# Debes utilizar:
# - Slicing.
# - Condicionales.
# - Recursión.
# No utilices bucles.
```

:::details
```python run
# Crea una función llamada contar_vocales() que reciba una cadena de
# texto.
# La función debe recorrer el texto de forma recursiva y devolver
# cuántas vocales contiene.
# Debes utilizar:
# - Slicing.
# - Condicionales.
# - Recursión.
# No utilices bucles.

def contar_vocales(texto):

    if texto == "":
        return 0

    vocales = "aeiouAEIOU"

    if texto[0] in vocales:
        return 1 + contar_vocales(texto[1:])

    return contar_vocales(texto[1:])

print(contar_vocales("Programacion"))
```
:::

## Conclusiones de la Unidad

Durante esta unidad aprendiste a:

- Comprender qué es una función recursiva.
- Identificar la importancia del caso base.
- Resolver problemas mediante llamadas a la misma función.
- Analizar cómo un problema puede dividirse en versiones más pequeñas.
- Implementar soluciones recursivas para conteos, sumas y cálculos matemáticos.
- Desarrollar habilidades de pensamiento lógico para abordar problemas de forma estructurada y progresiva.
