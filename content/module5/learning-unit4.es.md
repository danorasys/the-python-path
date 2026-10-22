---
title: Mini Proyectos con Texto
summary: En esta unidad se aplicarán los conocimientos adquiridos en el manejo de cadenas y listas mediante el desarrollo de pequeños proyectos prácticos, como un contador de palabras, un verificador de contraseñas y un inversor de texto. El objetivo es que consolides tu comprensión a través de la resolución de problemas, combinando diferentes conceptos aprendidos y desarrollando la capacidad de analizar, procesar y transformar información textual de forma lógica y estructurada.
order: 4
---

En esta unidad pondrás en práctica los conocimientos aprendidos sobre cadenas (`str`), listas y manipulación de texto mediante pequeños proyectos funcionales. A diferencia de ejercicios cortos y aislados, aquí combinarás varias herramientas de Python para resolver problemas más completos, organizando mejor tu lógica y desarrollando soluciones paso a paso. Trabajarás con procesamiento de palabras, validación de información y transformación de cadenas, habilidades muy utilizadas en aplicaciones reales.

## ¿Por Qué Hacer Mini Proyectos?

Los mini proyectos ayudan a:

- Aplicar varios conceptos al mismo tiempo.
- Pensar de manera más lógica y estructurada.
- Resolver problemas similares a los de programas reales.
- Mejorar la práctica con cadenas, listas y condicionales.
- Aprender a dividir problemas grandes en partes pequeñas.

## Proyecto 1: Contador de Palabras

### ¿Qué Hace Este Proyecto?

El programa analiza un texto y calcula:

- Cuántas palabras contiene.
- Cuántos caracteres tiene.
- Cuántas veces aparece una palabra específica.

### Paso 1: Crear un Texto

```python
texto = "Python es un lenguaje muy poderoso y Python es fácil de aprender"
```

### Paso 2: Separar el Texto en Palabras

```python
palabras = texto.split()
print(palabras)
```

Resultado:

```python
['Python', 'es', 'un', 'lenguaje', 'muy', 'poderoso', 'y', 'Python', 'es', 'fácil', 'de', 'aprender']
```

:::note[Nota:]
El método `split()` convierte un texto en una lista separando las palabras por espacios.
:::

### Paso 3: Contar Palabras

```python
cantidad = len(palabras)

print(cantidad)
```

Resultado:

```python
12
```

### Paso 4: Contar Caracteres

```python
print(len(texto))
```

Resultado:

```python
64
```

### Paso 5: Contar Apariciones de una Palabra

```python
print(texto.count("Python"))
```

Resultado:

```python
2
```

```python run hidden
texto = "Python es un lenguaje muy poderoso y Python es fácil de aprender"

palabras = texto.split()

print(palabras)

cantidad = len(palabras)

print(cantidad)

print(len(texto))

print(texto.count("Python"))
```

:::tip[Tip:]
Puedes combinar `.lower()` con `.count()` para evitar problemas entre mayúsculas y minúsculas.
:::

Ejemplo:

```python run
texto = "Python es un lenguaje muy poderoso y Python es fácil de aprender"

texto = texto.lower()

print(texto.count("python"))
```

## Proyecto 2: Verificador de Contraseñas

### ¿Qué Hace Este Proyecto?

El programa revisa si una contraseña cumple ciertas reglas básicas de seguridad.

Por ejemplo:

- Tener mínimo 8 caracteres.
- Contener números.
- Contener letras mayúsculas.

### Verificación Básica

```python run
contraseña = "Python123"

if len(contraseña) >= 8:
	print("La contraseña tiene buena longitud")
else:
	print("La contraseña es demasiado corta")
```

### Buscar Números Dentro del Texto

```python
contraseña = "Python123"

tiene_numero = False

for caracter in contraseña:
	if caracter.isdigit():
		tiene_numero = True

print(tiene_numero)
```

Resultado:

```python
True
```

```python run hidden
contraseña = "Python123"

tiene_numero = False

for caracter in contraseña:
	if caracter.isdigit():
		tiene_numero = True

print(tiene_numero)
```

### Buscar Letras Mayúsculas

```python run
contraseña = "Python123"

tiene_mayuscula = False

for caracter in contraseña:
	if caracter.isupper():
		tiene_mayuscula = True

print(tiene_mayuscula)
```

:::note[Nota:]
`isdigit()` verifica si un carácter es un número.\
`isupper()` verifica si una letra está en mayúscula.
:::

### Verificador Completo

```python run
contraseña = "DG8464INndks*om568sa@"

tiene_numero = False
tiene_mayuscula = False

for caracter in contraseña:
	if caracter.isdigit():
		tiene_numero = True

	if caracter.isupper():
		tiene_mayuscula = True

if len(contraseña) >= 8 and tiene_numero and tiene_mayuscula:
	print("Contraseña válida")
else:
	print("Contraseña insegura")
```

:::tip[Tip:]
Dividir un problema en pequeñas verificaciones facilita mucho la programación.
:::

## Proyecto 3: Inversor de Texto

### ¿Qué Hace este Proyecto?

Este programa invierte el orden de un texto.

Ejemplo:

```python
Hola
```

Resultado:

```python
aloH
```

### Usando Slicing

```python run
texto = "Python"

invertido = texto[::-1]

print(invertido)
```

```output
nohtyP
```

### Explicación del Slicing

| Parte | Significado |
| --- | --- |
| `texto[inicio:fin:paso]` | Estructura general |
| `[::-1]` | Recorre el texto al revés |

### Invertir Usando un Bucle

```python run
texto = "Python"

resultado = ""

for letra in texto:
	resultado = letra + resultado

print(resultado)
```

```output
nohtyP
```

:::note[Nota:]
Este segundo método ayuda a entender mejor cómo construir cadenas manualmente.
:::

## Combinando Proyectos

A medida que aprendas más Python, podrás combinar todas estas ideas en programas más grandes.

Por ejemplo:

- Un analizador de texto.
- Un corrector básico.
- Un generador de usuarios.
- Un sistema simple de validación.

## Tabla Resumen

| Proyecto | Conceptos Usados |
| --- | --- |
| Contador de palabras | `split()`, `len()`, `count()` |
| Verificador de contraseñas | `if`, `for`, `isdigit()`, `isupper()` |
| Inversor de texto | slicing, bucles, concatenación |

## Ejercicios para Practicar

### Ejercicio 1: Analizador de Texto Completo

Crea un programa que almacene un texto en una variable y luego muestre:

- Cantidad total de caracteres.
- Cantidad total de palabras.
- Primera palabra del texto.
- Última palabra del texto.
- El texto completamente en mayúsculas.
- El texto completamente invertido.

El programa debe utilizar:

- `split()`.
- `len()`.
- Slicing.
- Métodos de cadenas.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Almacene un texto en una variable.
#  Y luego muestre:
# 2. Cantidad total de caracteres.
# 3. Cantidad total de palabras.
# 4. Primera palabra del texto.
# 5. Última palabra del texto.
# 6. El texto completamente en mayúsculas.
# 7. El texto completamente invertido.
# El programa debe utilizar:
# 8. split().
# 9. len().
# 10. Slicing.
# 11. Métodos de cadenas.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Crea un programa que:
# 1. Almacene un texto en una variable.
texto = "Python es divertido y poderoso"

# El programa debe utilizar:
# 8. split().
palabras = texto.split()

# El programa debe utilizar:
# 9. len().
# 10. Slicing.
# 11. Métodos de cadenas.
# Y luego muestre:
# 2. Cantidad total de caracteres.
print("Caracteres:", len(texto))
# 3. Cantidad total de palabras.
print("Palabras:", len(palabras))
# 4. Primera palabra del texto.
print("Primera palabra:", palabras[0])
# 5. Última palabra del texto.
print("Última palabra:", palabras[-1])
# 6. El texto completamente en mayúsculas.
print("Mayúsculas:", texto.upper())
# 7. El texto completamente invertido.
print("Invertido:", texto[::-1])
```
:::

### Ejercicio 2: Validador de Contraseña Mejorado

Desarrolla un programa que revise si una contraseña cumple estas condiciones:

- Tiene mínimo 10 caracteres.
- Contiene al menos un número.
- Contiene al menos una letra mayúscula.
- Contiene al menos una letra minúscula.

El programa debe mostrar mensajes indicando qué condición no se cumple.

```python run="Practicar >>" hidden
# Desarrolla un programa que revise si una contraseña cumple estas
# condiciones:
# 1. Tiene mínimo 10 caracteres.
# 2. Contiene al menos un número.
# 3. Contiene al menos una letra mayúscula.
# 4. Contiene al menos una letra minúscula.
# 5. El programa debe mostrar mensajes indicando qué condición no se
# cumple.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# Desarrolla un programa que revise si una contraseña cumple estas
# condiciones:
contraseña = "PiG85D59*@fd"

tiene_numero = False
tiene_mayuscula = False
tiene_minuscula = False

for caracter in contraseña:
	# 2. Contiene al menos un número.
	if caracter.isdigit():
		tiene_numero = True

	# 3. Contiene al menos una letra mayúscula.
	if caracter.isupper():
		tiene_mayuscula = True

	# 4. Contiene al menos una letra minúscula.
	if caracter.islower():
		tiene_minuscula = True

# 5. El programa debe mostrar mensajes indicando qué condición no se
# cumple.

# 1. Tiene mínimo 10 caracteres.
if len(contraseña) < 10:
	print("La contraseña es demasiado corta")

if not tiene_numero:
	print("Falta un número")

if not tiene_mayuscula:
	print("Falta una mayúscula")

if not tiene_minuscula:
	print("Falta una minúscula")

if len(contraseña) >= 10 and tiene_numero and tiene_mayuscula and tiene_minuscula:
	print("Contraseña válida")
```
:::

### Ejercicio 3: Inversor de Frases

Crea un programa que:

- Guarde una frase en una variable.
- Invierta completamente el texto.
- Muestre también cada palabra invertida individualmente.

Ejemplo:

```python
Hola mundo
```

Resultado:

```python
odnum aloH
aloH odnum
```

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Guarde una frase en una variable.
# 2. Invierta completamente el texto.
# 3. Muestre también cada palabra invertida individualmente.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Guarde una frase en una variable.
frase = "Hola mundo"

# 2. Invierta completamente el texto.
print(frase[::-1])

# 3. Muestre también cada palabra invertida individualmente.

palabras = frase.split()

resultado = ""

for palabra in palabras:
	resultado += palabra[::-1] + " "

print(resultado)
```
:::

## Conclusiones de la Unidad

Durante esta unidad aprendiste a:

- Combinar cadenas, listas y estructuras de control.
- Procesar y analizar texto utilizando métodos de Python.
- Resolver problemas prácticos relacionados con información textual.
- Construir programas más completos utilizando lógica paso a paso.
- Aplicar varios conceptos al mismo tiempo en mini proyectos reales.
