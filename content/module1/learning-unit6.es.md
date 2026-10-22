---
title: Entrada de Datos con `input()`
summary: Cómo recibir información del usuario y procesarla.
order: 6
---

La función `input()` permite a tu programa recibir información escrita por el usuario. Es uno de los primeros pasos para crear programas realmente interactivos.

## ¿Qué es `input()`?

`input()` es una función que:

- Muestra un mensaje (si se lo das).
- Espera a que el usuario escriba algo.
- Devuelve lo escrito como una cadena de texto (`str`).

Ejemplo:

```python run
nombre = input("Escribe tu nombre: ")
print("Hola,", nombre)
```

```output
Escribe tu nombre: Linus
Hola, Linus
```

:::note[Nota:]
Todo lo que devuelve `input()` es texto, incluso si el usuario escribe un número.
:::

## Convertir lo Que Ingresa el Usuario

Si necesitas trabajar con números, debes convertir el texto que llega desde `input()`.

Usa:

| Conversión | Sirve para |
| --- | --- |
| `int()` | Convertir a entero |
| `float` | Convertir a número decimal |
| `str()` | Convertir a texto |

Ejemplo:

```python
edad = input("¿Cuántos años tienes?")
edad = int(edad)    # conversión necesaria
print("El próximo año tendrás", edad + 1)
```

Salida

```python
¿Cuántos años tienes? 55
El próximo año tendrás 56
```

```python run hidden
edad = input("¿Cuántos años tienes?")
edad = int(edad)    # conversión necesaria
print("El próximo año tendrás", edad + 1)
```

:::tip[Tip:]
Si no conviertes, un número no podrá ser sumado matemáticamente, solo como texto.
:::

Ejemplo de error común:

```python
"5" + 1    # ERROR: no se puede mezclar str e int
```

## Procesar Datos Ingresados

Después de recibir información, puedes usarla para cálculos, decisiones o mostrar mensajes personalizados.

```python run
numero = int(input("Escribe un número: "))
doble = numero * 2
print("El doble es:", doble)
```

```output
Escribe un número: 7
El doble es: 14
```

## Errores Comunes Con `input()`

### 1\. Olvidar Que Devuelve Texto

```python run="Probar Error >>"
n = input("Número: ")
print(n + 10)    # ERROR
```

### 2\. Tratar de Convertir un Texto No Válido

```python run="Probar Error >>"
text = input("Input: ") # Input: hello
int(text)    # ERROR
```

:::note[Nota:]
Más adelante aprenderás a manejar estos errores con `try` y `except`.
:::

## Ejemplos Útiles

### Ejemplo 1: Saludo Personalizado

```python run
nombre = input("¿Cómo te llamas? ")
print("Mucho gusto,", nombre)
```

```output
¿Cómo te llamas? Python
Mucho gusto, Python
```

### Ejemplo 2: Suma Interactiva

```python run
a = int(input("Ingresa un número: "))
b = int(input("Ingrese otro: "))
print("La suma es:", a + b)
```

```output
Ingresa un número: 7
Ingresa otro: 3
La suma es: 10
```

### Ejemplo 3: Repetición Con Texto

```python run
palabra = input("Escribe una palabra: ")
print(palabra * 3)
```

```output
Escribe una palabra: Python
PythonPythonPython
```

:::tip[Tip:]
Cuando repites una cadena, no se agregan espacios automáticamente.
:::

## Ejercicios Para Practicar

### Ejercicio 1: Saludo Simple

Pídele al usuario su nombre y muéstrale un saludo.

```python run="Practicar >>" hidden
# Pídele al usuario su nombre y muéstrale un saludo
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
nombre = input("Escribe tu nombre: ")
print("Hola", nombre)
```
:::

### Ejercicio 2: Edad en el Futuro

Pídele al usuario su edad y dile cuántos años tendrá en 5 años.

```python run="Practicar >>" hidden
# Pídele al usuario su edad y dile cuántos años
# tendrá en 5 años
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
edad = int(input("¿Cuántos años tienes? "))
print("En 5 años tendrás", edad + 5)
```
:::

### Ejercicio 3: Multiplicador de Palabras

Pidele al usuario una palabra y un número. Muestra la palabra repetida ese número de veces.

```python run="Practicar >>" hidden
# Pídele al usuario una palabra y un número.
# Muestra la palabra repetida ese número de veces
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
palabra = input("Escribe una palabra: ")
cantidad = int(input("¿Cuántas veces quieres repetirla? "))
print(palabra * cantidad)
```
:::

### Ejercicio 4: Conversión de Grados

Pídele al usuario una temperatura en grados Celsius y conviértelos a Fahrenheit (Muéstraselo al usuario).

```python run="Practicar >>" hidden
# Pídele al usuario una temperatura en grados
# Celsius y conviértelos a Fahrenheit
# (Muéstraselo al usuario)
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
c = float(input("Temperatura en Celsius: "))
f = (c * 9 / 5) + 32
print("Equivalen a", f, "°F")
```
:::

## Conclusiones de la Unidad

En esta unidad aprendiste:

- A usar `input()` para recibir texto desde el teclado.
- Que todo lo que devuelve `input` es string (`str`).
- A convertir esos textos a números usando `int()` y `float()`.
- A procesar la información ingresada para realizar cálculos o personalizar mensajes.
- A evitar errores comunes como mezclar texto y números.
