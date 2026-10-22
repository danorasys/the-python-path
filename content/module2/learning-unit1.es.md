---
title: "Condicionales: `if`, `elif`, `else`"
summary: En esta unidad aprenderás a permitir que tu programa tome decisiones usando `if`, `elif` y `else`, de modo que el código pueda ejecutar acciones diferentes según las condiciones que se cumplan. Verás cómo se comporta el flujo cuando una condición es verdadera, qué ocurre cuando ninguna coincide y cómo encadenar múltiples opciones.
order: 1
---

Los condicionales son una de las herramientas más importantes en cualquier lenguaje de programación, pues permiten que un programa tome decisiones. Gracias a ellos, tu código puede ejecutar una cosa u otra dependiendo de la situación. En Python, las palabras clave `if`, `elif` y `else` son las que controlan este comportamiento.

## ¿Qué es un Condicional?

Un condicional evalúa una expresión que puede ser verdadera o falsa. Si es verdadera, se ejecuta un bloque de código; si es falsa, se pasa a evaluar otras opciones o se ejecuta un bloque alternativo.

Python usa sangría (tabulaciones o espacios) para definir qué instrucciones forman parte del condicional.

## Estructura Básica

### 1\. `if` (si...)

Se ejecuta solo si la condición es verdadera.

```python run
edad = 18
if edad >= 18:
	print("Eres mayor de edad")
```

```output
Eres mayor de edad
```

### 2\. `elif` (si no... pero si...)

Sirve para evaluar condiciones adicionales cuando el `if` no se cumple.

```python run
nota = 75
if nota >= 90:
	print("Excelente")
elif nota >= 70:
	print("Aprobado")
```

```output
Aprobado
```

### 3\. `else` (si nada anterior ocurrió...)

Se ejecuta solo si todas las condiciones previas fueron falsas.

```python run
temperatura = 10
if temperatura > 25:
	print("Hace calor")
else:
	print("Hace frío")
```

```output
Hace frío
```

:::note[Nota:]
El `else` no lleva condición, porque actúa como la opción final cuando nada anterior aplica.
:::

## Encadenamiento de Condiciones

Puedes combinar `if`, varios `elif` y un `else` para crear múltiples caminos:

```python run
x = 0
if x > 0:
	print("Positivo")
elif x < 0:
	print("Negativo")
else:
	print("Es cero")
```

```output
Es cero
```

Este tipo de estructura ayuda a modelar procesos reales: evaluar calificaciones, clasificar edades, seleccionar opciones, etc.

:::tip[Tip:]
Cuando tengas muchas condiciones, ordénalas de más específica a más general para evitar que una condición amplia bloquee otras más exactas.
:::

## Condiciones Más Útiles

Puedes usar operadores de comparación (Profundizaremos más sobre estos en la próxima unidad de aprendizaje):

- `==` (igual a).
- `!=` (diferente de).
- `<` (menor que), `>` (mayor que), `<=` (menor o igual que), `>=` (mayor o igual que).

También operadores lógicos (Profundizaremos más sobre estos en la próxima unidad de aprendizaje):

- `and` (y).
- `or` (o).
- `not` (no).

Ejemplo:

```python run
edad = 20
tiene_documento = True

if edad >= 18 and tiene_documento:
	print("Puedes entrar")
```

```output
Puedes entrar
```

:::note[Nota:]
Las condiciones pueden ser tan simples o tan complejas como necesites. Pero es buena práctica mantenerlas claras y legibles.
:::

## Ejemplos Prácticos

### Ejemplo 1: Verificar Si un Número es Par o Impar

```python run
numero = 8

if numero % 2 == 0:
	print("Es par")
else:
	print("Es impar")
```

```output
Es par
```

### Ejemplo 2: Clasificar Una Edad

```python run
edad = 15

if edad < 13:
	print("Niño")
elif edad < 18:
	print("Adolescente")
else:
	print("Adulto")
```

```output
Adolescente
```

### Ejemplo 3: Verificar Si Una Contraseña es Correcta

```python run
password = "python123%"

if password == "python123%":
	print("Acceso permitido")
else:
	print("Acceso denegado")
```

```output
Acceso permitido
```

## Ejercicios Para Practicar

### Ejercicio 1: Mayor o Menor

Crea una variable con una edad (por ejemplo: `edad = 17`).

Si es mayor o igual a 18, muestra "Mayor de edad".

Si no, muestra "Menor de edad".

```python run="Practicar >>" hidden
# Crea una variable con una edad
# (por ejemplo: edad = 17).
# Si es mayor o igual a 18, muestra "Mayor de edad".
# Si no, muestra "Menor de edad"
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
edad = 17

if edad >= 18:
	print("Mayor de edad")
else:
	print("Menor de edad")
```
:::

### Ejercicio 2: Clasificador de Números

Crea una variable llamada `n` y asígnale un valor numérico.

Muestra si el número es positivo, negativo o cero.

```python run="Practicar >>" hidden
# Crea una variable llamada n y asígnale
# un valor numérico.
# Muestra si el número es positivo, negativo o cero
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
n = -5

if n > 0:
	print("Positivo")
elif n < 0:
	print("Negativo")
else:
	print("Cero")
```
:::

### Ejercicio 3: Verificar Acceso

Crea dos variables:

- `edad`.
- `tiene_entrada` (`True` o `False`).

Si la persona tiene entrada y es mayor o igual a 16, muestra "Bienvenido". En cualquiero otro caso, muestra "No puedes entrar".

```python run="Practicar >>" hidden
# Crea dos variables:
# edad
# tiene_entrada (True o False)
# Si la persona tiene entrada y es mayor o igual a 16, muestra "Bienvenido".
# En cualquier otro caso, muestra "No puedes entrar"
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
edad = 16
tiene_entrada = True

if edad >= 16 and tiene_entrada:
	print("Bienvenido")
else:
	print("No puedes entrar")
```
:::

## Conclusiones de la Unidad

En esta unidad aprendiste que:

- Los condicionales permiten que un programa tome decisiones.
- `if`, `elif` y `else` controlan distintos caminos de ejecución.
- Las condiciones funcionan evaluando expresiones que pueden ser verdaderas o falsas.
- Puedes usar operadores lógicos y de comparación para crear condiciones más completas.
- Es posible encadenar varios casos para resolver problemas más reales y variados.

Cuando dominas los condicionales, tus programas dejan de ser lineales y empiezan a reaccionar a distintas situaciones.
