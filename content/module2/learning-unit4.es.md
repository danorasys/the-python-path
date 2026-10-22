---
title: Control de Flujo en Bucles
summary: Aquí descubrirás cómo modificar la ejecución interna de un bucle usando instrucciones especiales como `break` para detenerlo antes de tiempo, `continue` para saltar una repetición específica y `pass` para dejar un bloque vacío que completarás más adelante. Estas herramientas te permiten tener un control más preciso y flexible sobre el comportamiento de tus ciclos.
order: 4
---

En la unidad anterior aprendiste a usar `while` y `for` para repetir instrucciones. Ahora aprenderás cómo modificar el comportamiento interno de un bucle mientras está en ejecución.

Python ofrece tres instrucciones especiales:

- `break`
- `continue`
- `pass`

Estas permiten tener un control más preciso sobre cómo y cuándo se ejecutan las repeticiones.

## `break` — Detener el Bucle

La instrucción `break` se utiliza para terminar inmediatamente un bucle, sin importar si la condición todavía es verdadera.

Cuando Python encuentra un `break`, sale del ciclo y continúa con el código que está después del bucle.

### Ejemplo con `while`

```python
contador = 1

while contador <= 10:
    if contador == 5:
        break
    print(contador)
    contador += 1
```

```output
1
2
3
4
```

En este caso, el bucle se detiene cuando el contador llega a 5.

```python run hidden
contador = 1

while contador <= 10:
    if contador == 5:
        break
    print(contador)
    contador += 1
```

### Ejemplo con `for`

```python
for letra in "Python":
    if letra == "h":
        break
    print(letra)
```

```output
P
y
t
```

El ciclo se interrumpe cuando encuentra la letra `"h"`.

```python run hidden
for letra in "Python":
    if letra == "h":
        break
    print(letra)
```

:::note
`break` detiene completamente el ciclo, no solo una repetición.
:::

:::tip
Usa `break` cuando encuentres lo que estás buscando y no necesites seguir recorriendo.
:::

## `continue` — Saltar una Repetición

La instrucción `continue` no detiene el bucle, sino que salta el resto del código en la repetición actual y pasa directamente a la siguiente iteración.

Ejemplo:

```python
for numero in range(1, 6):
    if numero == 3:
        continue
    print(numero)
```

```output
1
2
4
5
```

Aquí el número 3 no se imprime, pero el bucle continúa con el resto.

```python run hidden
for numero in range(1, 6):
    if numero == 3:
        continue
    print(numero)
```

:::note
`continue` no termina el ciclo, solo omite una vuelta específica.
:::

:::tip
Úsalo cuando quieras ignorar ciertos casos dentro del bucle sin detenerlo por completo.
:::

## `pass` — Instrucción Vacía

La instrucción `pass` no hace nada. Se utiliza cuando necesitas que la estructura esté completa, pero aún no quieres implementar lógica.

Ejemplo:

```python run
for i in range(5):
    pass
```

```output
```

También se usa mucho con condicionales:

```python run
if True:
    pass
```

```output
```

:::note
`pass` evita errores de sintaxis cuando un bloque está vacío.
:::

:::tip
Es útil cuando estás planificando tu programa y aún no has decidido qué código irá allí.
:::

## Comparación de las Tres Instrucciones

| Instrucción | ¿Detiene el bucle? | ¿Salta una repetición? | ¿Hace algo visible? |
| --- | --- | --- | --- |
| `break` | Sí | No | Sí |
| `continue` | No | Sí | Sí |
| `pass` | No | No | No |

## Ejemplos Combinados

### Ejemplo 1: Buscar Una Letra Específica

```python run
for letra in "Programacion":
    if letra == "g":
        print("Letra encontrada")
        break
```

```output
Letra encontrada
```

### Ejemplo 2: Mostrar Solo Números Impares

```python run
for numero in range(1, 10):
    if numero % 2 == 0:
        continue
    print(numero)
```

```output
1
3
5
7
9
```

## Ejercicios Para Practicar

### Ejercicio 1: Detener al Encontrar Un Número

Crea un bucle `for` que recorra los números del 1 al 10.\
Cuando el número sea 7, el programa debe detener completamente el ciclo usando `break`.\
Imprime cada número antes de que el ciclo se detenga.

```python practice
# Crea un bucle for que recorra los números del 1 al
# 10.
# Cuando el número sea 7, el programa debe detener
# completamente el ciclo usando break.
# Imprime cada número antes de que el ciclo se detenga
```

:::details
```python run
for numero in range(1, 11):
    if numero == 7:
        break
    print(numero)
```
:::

### Ejercicio 2: Omitir Una Letra Específica

Crea una variable llamada `palabra` con el valor `"computadora"`.\
Usa un bucle `for` para mostrar cada letra, excepto la letra `"o"`.\
Utiliza `continue`.

```python practice
# Crea una variable llamada palabra con el valor
# "computadora".
# Usa un bucle for para mostrar cada letra, excepto la
# letra "o".
# Utiliza continue
```

:::details
```python run
palabra = "computadora"

for letra in palabra:
    if letra == "o":
        continue
    print(letra)
```
:::

### Ejercicio 3: Detectar Número Negativo

Crea una lista simulada usando `range()` del -3 al 3.\
Recorre los valores con un bucle `for`.\
Si encuentras un número negativo, imprime `"Número negativo detectado"` y detén el bucle con `break`.

```python practice
# Crea una lista simulada usando range() del -3 al 3.
# Recorre los valores con un bucle for.
# Si encuentras un número negativo, imprime "Número
# negativo detectado" y detén el bucle con break
```

:::details
```python run
for numero in range(-3, 4):
    if numero < 0:
        print("Número negativo detectado")
        break
```
:::

### Ejercicio 4: Estructura Incompleta Con `pass`

Crea un bucle `for` que recorra los números del 1 al 5.\
Dentro del bucle, coloca una condición `if` que verifique si el número es mayor que 3.\
Por ahora, no hagas nada dentro de esa condición; usa `pass`.

```python practice
# Crea un bucle for que recorra los números del 1 al 5.
# Dentro del bucle, coloca una condición if que
# verifique si el número es mayor que 3.
# Por ahora, no hagas nada dentro de esa condición; usa
# pass
```

:::details
```python run
for numero in range(1, 6):
    if numero > 3:
        pass
    print(numero)
```
:::

## Conclusiones de la Unidad

En esta unidad aprendiste que:

- `break` permite detener un bucle inmediatamente.
- `continue` salta una repetición específica sin finalizar el ciclo.
- `pass` actúa como una instrucción vacía para mantener estructuras válidas.
- Estas herramientas ofrecen mayor control y flexibilidad dentro de los bucles.
- Saber cuándo usar cada una mejora la claridad y eficiencia del programa.
