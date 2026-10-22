---
title: Parámetros y Valores de Retorno
summary: En esta unidad aprenderás cómo las funciones pueden recibir información mediante parámetros y devolver resultados utilizando la instrucción `return`. Se estudiará cómo enviar datos a una función al momento de llamarla, cómo esos valores se utilizan dentro de la función y cómo el resultado puede devolverse para ser utilizado en otras partes del programa. Esto permitirá construir funciones más dinámicas y útiles para resolver distintos tipos de problemas.
order: 2
---

En programación, las funciones no solo ejecutan instrucciones, también pueden recibir información para trabajar con ella y devolver resultados que pueden utilizarse en otras partes del programa. En esta unidad aprenderás cómo las funciones reciben datos mediante parámetros y cómo pueden devolver resultados utilizando la instrucción `return`. Comprenderás cómo enviar valores al momento de llamar una función, cómo estos valores se utilizan dentro de ella y cómo el resultado puede devolverse para continuar el procesamiento del programa. Esto permitirá construir funciones más dinámicas, reutilizables y capaces de resolver problemas más complejos.

## Parámetros en las Funciones

Los parámetros son variables que se definen dentro de la función para recibir información cuando la función es llamada.

Esto permite que la función trabaje con distintos datos cada vez que se ejecuta.

### Sintaxis Básica

```python
def nombre_funcion(parametro):
    instrucciones
```

Ejemplo:

```python
def saludar(nombre):
    print("Hola", nombre)
```

Llamando la función:

```python
saludar("Carlos")
saludar("Ana")
```

```output
Hola Carlos
Hola Ana
```

```python run hidden
def saludar(nombre):
    print("Hola", nombre)

saludar("Carlos")
saludar("Ana")
```

:::note
Los valores que se envían a una función cuando se llama se conocen como argumentos.\
    **•** Parámetro → variable definida en la función.\
    **•** Argumento → valor enviado al llamar la función.
:::

## Funciones con Varios Parámetros

Una función puede recibir más de un parámetro.

```python
def presentar(nombre, edad):
    print("Nombre:", nombre)
    print("Edad:", edad)
```

Llamando la función:

```python
presentar("Laura", 22)
```

```output
Nombre: Laura
Edad: 22
```

```python run hidden
def presentar(nombre, edad):
    print("Nombre:", nombre)
    print("Edad:", edad)

presentar("Laura", 22)
```

## Valores de Retorno

Las funciones también pueden devolver resultados usando la palabra clave `return`.

Esto permite que el resultado de la función sea utilizado en otras partes del programa.

Ejemplo:

```python
def sumar(a, b):
    resultado = a + b
    return resultado
```

Uso de la función:

```python
total = sumar(5, 3)
print(total)
```

```output
8
```

```python run hidden
def sumar(a, b):
    resultado = a + b
    return resultado

total = sumar(5, 3)
print(total)
```

:::tip
Usa `return` cuando necesites obtener un resultado de la función para usarlo después.
:::

## Diferencia Entre `print()` y `return`

| Característica | `print()` | `return` |
| --- | --- | --- |
| Muestra información | Sí | No necesariamente |
| Devuelve un valor | No | Sí |
| Se puede usar en otras operaciones | No | Sí |

Ejemplo:

```python
def suma_print(a, b):
    print(a + b)
```

```python
def suma_return(a, b):
    return a + b
```

Uso:

```python
resultado = suma_return(4, 6)
print(resultado * 2)
```

```output
20
```

```python run hidden
def suma_print(a, b):
    print(a + b)

def suma_return(a, b):
    return a + b

resultado = suma_return(4, 6)
print(resultado * 2)
```

## Flujo de una Función con Parámetros y Retorno

**1.** Se llama la función.\
**2.** Se envían argumentos.\
**3.** Los argumentos se asignan a parámetros.\
**4.** La función ejecuta sus instrucciones.\
**5.** Se devuelve el resultado con `return`.

## Ejemplo Completo

```python run
def calcular_area(base, altura):
    area = base * altura
    return area

resultado = calcular_area(5, 4)
print("El área es:", resultado)
```

```output
El área es: 20
```

## Nota Importante

Cuando Python ejecuta `return`, la función termina inmediatamente.

Ejemplo:

```python
def ejemplo():
    return 10
    print("Esto no se ejecuta")
```

:::tip
Las funciones con `return` permiten construir programas más flexibles, porque el resultado puede utilizarse en cálculos posteriores.
:::

## Resumen de Conceptos

| Concepto | Descripción |
| --- | --- |
| Parámetro | Variable que recibe información |
| Argumento | Valor enviado a la función |
| return | Devuelve un resultado |
| Función dinámica | Función que trabaja con diferentes datos |

## Ejercicios Prácticos

### Ejercicio 1: Función para Sumar Números

Crea un programa que permita calcular la suma de dos números utilizando una función.

El programa debe cumplir con lo siguiente:

- Definir una función llamada `sumar`.
- La función debe recibir dos parámetros.
- Dentro de la función se debe calcular la suma de los dos valores.
- La función debe devolver el resultado utilizando `return`.
- En el programa principal se debe llamar la función enviando los números 10 y 5.
- Guardar el resultado en una variable.
- Mostrar el resultado en pantalla.

```python practice
# Crea un programa que permita calcular la suma de dos
# números utilizando una función.
# El programa debe cumplir con lo siguiente:
# 1. Definir una función llamada sumar.
# 2. La función debe recibir dos parámetros.
# 3. Dentro de la función se debe calcular la suma de
# los dos valores.
# 4. La función debe devolver el resultado utilizando
# return.
# 5. En el programa principal se debe llamar la función
# enviando los números 10 y 5.
# 6. Guardar el resultado en una variable.
# 7. Mostrar el resultado en pantalla.
```

:::details
```python run
# 1. Definir una función llamada sumar
# 2. La función debe recibir dos parámetros
def sumar(a, b):
    # 3. Dentro de la función se debe calcular la suma de
    # los dos valores
    resultado = a + b
    # 4. La función debe devolver el resultado utilizando
    # return
    return resultado

# 5. En el programa principal se debe llamar la función
# enviando los números 10 y 5
# 6. Guardar el resultado en una variable
total = sumar(10, 5)
# 7. Mostrar el resultado en pantalla
print("La suma es:", total)
```
:::

### Ejercicio 2: Función para Calcular el Área de un Rectángulo

Desarrolla un programa que calcule el área de un rectángulo utilizando funciones.

El programa debe realizar lo siguiente:

- Crear una función llamada `calcular_area`.
- La función debe recibir dos parámetros: `base` y `altura`.
- Dentro de la función calcular el área usando la fórmula: `area = base * altura`.
- Utilizar `return` para devolver el resultado.
- En el programa principal llamar la función con los valores `8` y `3`.
- Guardar el resultado en una variable.
- Mostrar el resultado en pantalla.

```python practice
# Desarrolla un programa que calcule el área de un
# rectángulo utilizando funciones.
# El programa debe realizar lo siguiente:
# 1.Crear una función llamada calcular_area.
# 2. La función debe recibir dos parámetros: base y
# altura.
# 3. Dentro de la función calcular el área usando la
# fórmula: area = base * altura.
# 4. Utilizar return para devolver el resultado.
# 5. En el programa principal llamar la función con los
# valores 8 y 3.
# 6. Guardar el resultado en una variable.
# 7. Mostrar el resultado en pantalla.
```

:::details
```python run
# 1.Crear una función llamada calcular_area
# 2. La función debe recibir dos parámetros: base y
# altura
def calcular_area(base, altura):
    # 3. Dentro de la función calcular el área usando la
    # fórmula: area = base * altura
    area = base * altura
    # 4. Utilizar return para devolver el resultado
    return area

# 5. En el programa principal llamar la función con los
# valores 8 y 3
# 6. Guardar el resultado en una variable
resultado = calcular_area(8, 3)

# 7. Mostrar el resultado en pantalla
print("El área del rectángulo es:", resultado)
```
:::

### Ejercicio 3: Función Para Calcular el Promedio

Crea un programa que calcule el promedio de tres notas utilizando una función.

El programa debe cumplir con lo siguiente:

- Crea una función llamada `calcular_promedio`.
- La función debe recibir tres parámetros que representen tres notas.
- Dentro de la función calcular el promedio utilizando la fórmula: `promedio = (nota1 + nota2 + nota3) / 3`.
- La función debe devolver el resultado usando `return`.
- En el programa principal llamar la función con las notas `4.0`, `3.5` y `4.5`.
- Guardar el resultado en una variable.
- Mostrar el promedio final.

```python practice
# Crea un programa que calcule el promedio de tres
# notas utilizando una función.
# El programa debe cumplir con lo siguiente:
# 1. Crea una función llamada calcular_promedio.
# 2. La función debe recibir tres parámetros que
# representen tres notas.
# 3. Dentro de la función calcular el promedio
# utilizando la fórmula: promedio = (nota1 + nota2 +
# nota3) / 3.
# 4. La función debe devolver el resultado usando
# return.
# 5. En el programa principal llamar la función con las
# notas 4.0, 3.5 y 4.5.
# 6. Guardar el resultado en una variable.
# 7. Mostrar el promedio final.
```

:::details
```python run
# 1. Crea una función llamada calcular_promedio
# 2. La función debe recibir tres parámetros que
# representen tres notas
def calcular_promedio(nota1, nota2, nota3):
    # 3. Dentro de la función calcular el promedio
    # utilizando la fórmula: promedio = (nota1 + nota2 +
    # nota3) / 3
    promedio = (nota1 + nota2 + nota3) / 3
    # 4. La función debe devolver el resultado usando
    # return
    return promedio

# 5. En el programa principal llamar la función con las
# notas 4.0, 3.5 y 4.5
# 6. Guardar el resultado en una variable
resultado = calcular_promedio(4.0, 3.5, 4.5)

# 7. Mostrar el promedio final
print("El promedio es:", resultado)
```
:::

:::note[Notas Importantes:]
**1.** Los parámetros permiten que una función trabaje con diferentes datos.\
**2.** `return` permite devolver resultados al programa.\
**3.** Las funciones con retorno son más flexibles y reutilizables.
:::

:::tip[Tips de Programación:]
**1.** Usa `return` cuando necesites reutilizar el resultado de la función.\
**2.** Utiliza nombres claros para los parámetros.\
**3.** Mantén las funciones simples y enfocadas en una tarea específica.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste cómo las funciones pueden recibir información mediante parámetros y devolver resultados utilizando la instrucción `return`. Comprendiste la diferencia entre parámetros y argumentos, cómo enviar datos al llamar una función y cómo utilizar el resultado devuelto para continuar el procesamiento del programa. Estas herramientas permiten crear funciones más dinámicas, reutilizables y flexibles, lo que facilita la construcción de programas más organizados. El uso adecuado de parámetros y valores de retorno es una habilidad fundamental para desarrollar programas más estructurados y escalables en Python.
