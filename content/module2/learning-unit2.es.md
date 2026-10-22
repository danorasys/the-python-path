---
title: Operadores Lógicos y de Comparación
summary: Aquí entenderás cómo funcionan operadores como `==`, `!=`, `<`, `>`, `<=`, `>=`, y cómo combinarlos con `and`, `or` y `not` para construir condiciones más complejas. Esto te permitirá evaluar varias situaciones al mismo tiempo y crear decisiones más precisas dentro de tus estructuras condicionales.
order: 2
---

Los operadores de comparación y los operadores lógicos son esenciales para tomar decisiones en Python. Te permiten comparar valores, verificar condiciones y combinar múltiples evaluaciones dentro de un `if`. Con ellos puedes construir reglas más completas, como verificar si una edad está en un rango, si una contraseña coincide, o si una acción es válida solo bajo ciertas condiciones.

## Operadores de Comparación

Estos operadores devuelven `True` o `False`, según la condición.

| Operador | Significado | Ejemplo |
| --- | --- | --- |
| `==` | Igual a | `5 == 5 → True` |
| `!=` | Diferente de | `3 != 4 → True` |
| `<` | Menor que | `2 < 10 → True` |
| `>` | Mayor que | `10 > 3 → True` |
| `<=` | Menor o igual que | `5 <= 5 → True` |
| `>=` | Mayor o igual que | `8 >= 2 → True` |

## Ejemplo Práctico

```python run
edad = 20
if edad >= 18:
    print("Eres mayor de edad")
```

```output
Eres mayor de edad
```

## Operadores Lógicos

Te permiten combinar condiciones.

### `and`

Todas las condiciones deben ser verdaderas.

Ejemplo:

```python run
edad = 24
if edad >= 18 and edad < 65:
    print("Adulto")
```

```output
Adulto
```

### `or`

Al menos una condición debe ser verdadera.

Ejemplo:

```python run
color = "rojo"
if color == "rojo" or color =="azul":
    print("Color permitido")
```

```output
Color permitido
```

### `not`

Invierte el valor lógico: Si era `True` pasa a ser `False`. Si era `False` pasa a ser `True`.

Ejemplo:

```python run
conectado = False
if not conectado:
    print("No hay conexión")
```

```output
No hay conexión
```

## Ejemplos Adicionales

### Comparaciones Frecuentes

- Verificar igualdad de cadenas → `"hola" == "hola"`
- Revisar acceso por edad → `edad >= 18`
- Validar rangos → `0 <= numero <= 100`
- Comprovar si una variable NO tiene un valor → `variable != 0`

### Combinaciones Útiles

- Rango de notas válidas → `nota >= 0 and nota <= 5`
- Usuario autorizado según rol → `rol == "admin" or rol == "editor"`
- Acción deshabilitada → `not disponible`

### Comparación de Varios Valores

```python run
temp = 25
if temp > 20 and temp < 30:
    print("Temperatura ideal")
```

```output
Temperatura ideal
```

## Tips

:::tip
Cuando combines varias condiciones, piensa: "¿Quiero que todas sean verdaderas o solo una?"
:::

:::tip
Escribe condiciones claras y cortas; evita usar muchas dentro de un mismo `if`.
:::

:::tip
Usa `not` cuando quieras simplificar reglas largas, por ejemplo:\
En vez de `if conectado == False:` usa `if not conectado:`.
:::

## Notas

:::note
Las comparaciones en Python no usan `=` sino `==`.
:::

:::note
Puedes encadenar comparaciones como en matemáticas: `18 <= edad < 60`.
:::

:::note
Python evalúa las condiciones de izquierda a derecha.
:::

## Ejemplos Combinados

### Autenticación de Usuario

```python run
usuario = "python_learner"
contrasena = "password123"

if usuario == "python_learner" and contrasena == "password123":
    print("Acceso permitido")
else:
    print("Autenticación fallida")
```

```output
Acceso permitido
```

### Verificación de Calificaciones

```python run
puntaje = 75

if 60 <= puntaje <= 100:
    print("Aprobado")
elif 0 <= puntaje < 60:
    print("Desaprobado")
else:
    print("Puntaje inválido")
```

```output
Aprobado
```

### Conectividad

```python run
modo ="offline"
if not modo == "online":
    print("Modo sin conexión activo")
else:
    print("Conexión establecida de forma exitosa")
```

```output
Modo sin conexión activo
```

## Ejercicios para Practicar

### Ejercicio 1: Verificar Si una Pesona Puede Votar

Crea una variable llamada `edad` y asígnale un número entero. El programa debe verificar si la persona tiene 18 años o más. Si la condición se cumple, muestra el mensaje `Puede votar`. En caso contrario, muestra `No puede votar`.

```python practice
# Crea una variable llamada edad y asígnale un número
# entero. El programa debe verificar si la persona
# tiene 18 años o más. Si la condición se cumple,
# muestra el mensaje "Puede votar". En caso contrario,
# muestra "No puede votar"
```

:::details
```python run
edad = 17

if edad >= 18:
    print("Puede votar")
else:
    print("No puede votar")
```
:::

### Ejercicio 2: Número Dentro de un Rango

Crea una variable llamada `numero`. El programa debe verificar si el valor de `numero` se encuentra entre 1 y 10, incluyendo ambos límites. Si el número está dentro del rango, muestra `Número válido`. Si no lo está, muestra `Número fuera de rango`.

```python practice
# Crea una variable llamada numero. El programa debe
# verificar si el valor de numero se encuentra entre 1
# y 10, incluyendo ambos límites. Si el número está
# dentro del rango, muestra "Número válido". Si no lo
# está, muestra "Número fuera de rango"
```

:::details
```python run
numero = 7

if numero >= 1 and numero <= 10:
    print("Número válido")
else:
    print("Número fuera de rango")
```
:::

### Ejercicio 3: Verificar Colores Permitidos

Crea una variable llamada `color`. El programa debe comprobar si el color es `azul` o `rojo`. Si coincide con alguno de esos colores, muestra `Color permitido`. En cualquier otro caso, muestra `Color no permitido`.

```python practice
# Crea una variable llamada color. El programa debe
# comprobar si el color es "azul" o "rojo". Si coincide con
# alguno de esos colores, muestra "Color permitido". En
# cualquier otro caso, muestra "Color no permitido"
```

:::details
```python run
color = "azul"

if color == "azul" or color == "rojo":
    print("Color permitido")
else:
    print("Color no permitido")
```
:::

### Ejercicio 4: Sistema de Intentos

Crea una variable llamada `intentos`. Si el valor de `intentos` es diferente de `0`, muestra `Intentos disponibles`. Si el valor es `0`, muestra `Cuenta bloqueada`.

```python practice
# Crea una variable llamada intentos. Si el valor de
# intentos es diferente de 0, muestra "Intentos
# disponibles". Si el valor es 0, muestra "Cuenta
# bloqueada"
```

:::details
```python run
intentos = 0

if intentos != 0:
    print("Intentos disponibles")
else:
    print("Cuenta bloqueada")
```
:::

### Ejercicio 5: Clasificación de Números

Crea una variable llamada `n`. El programa debe determinar si el número es:

- Positivo (mayor que 0).
- Negativo (menor que 0).
- o Cero (0).

Muestra un mensaje distinto para cada caso.

```python practice
# Crea una variable llamada n. El programa debe
# determinar si el número es:
# - Positivo (mayor que 0).
# - Negativo (menor que 0).
# - o Cero (0).
# Muestra un mensaje distinto para cada caso
```

:::details
```python run
n = -3

if n > 0:
    print("El número es positivo")
elif n < 0:
    print("El número es negativo")
else:
    print("El número es cero")
```
:::

### Ejercicio 6: Acceso al Sistema

Crea dos variables:

- `edad`.
- `tiene_acceso` (`True` o `False`).

El programa debe mostrar `Acceso permitido` solo si la persona tiene 18 años o más y además `tiene_acceso` es `True`. En cualquier otro caso, debe mostrar `Acceso denegado`.

```python practice
# Crea dos variables:
# - edad.
# - tiene_acceso (True o False).
# El programa debe mostrar "Acceso permitido" solo si la
# persona tiene 18 años o más y además tiene_acceso es
# True. En cualquier otro caso, debe mostrar "Acceso
# denegado"
```

:::details
```python run
edad = 20
tiene_acceso = True

if edad >= 18 and tiene_acceso:
    print("Acceso permitido")
else:
    print("Acceso denegado")
```
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a comparar valores y a combinar condiciones utilizando operadores de comparación y operadores lógicos. Ahora puedes construir reglas más precisas dentro de tus programas, evaluar rangos, verificar múltiples situaciones al mismo tiempo y controlar el flujo de decisiones con mayor exactitud. Dominar estos operadores te permitirá escribir código más inteligente y adaptable.
