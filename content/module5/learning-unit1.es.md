---
title: Operaciones con Cadenas (`str`)
summary: En esta unidad aprenderás a trabajar con cadenas de texto en Python, comprendiendo cómo acceder a caracteres individuales mediante indexación, extraer partes de un texto utilizando slicing y aplicar métodos comunes para transformar cadenas, como convertir a mayúsculas o minúsculas y reemplazar fragmentos de texto. También se explorará cómo manipular y analizar información textual, entendiendo que las cadenas son una de las estructuras más utilizadas en programación para representar y procesar datos.
order: 1
---

Las cadenas de texto (`str`) son fundamentales en Python, ya que permiten representar y manipular información textual. En esta unidad aprenderás a acceder a caracteres mediante indexación, extraer partes del texto con slicing y utilizar métodos para transformar y analizar cadenas, como convertir a mayúsculas, minúsculas o reemplazar contenido. Estas habilidades son clave para trabajar con datos reales, como entradas de usuario, archivos o procesamiento de texto.

## ¿Qué es una Cadena?

Una cadena es una secuencia de caracteres definida entre comillas:

```python
texto = "Hola mundo"
```

### Indexación de Cadenas

Permite acceder a caracteres individuales dentro de la cadena.

```python run
texto = "Python"

print(texto[0])  # P
print(texto[2])  # t
```

```output
P
t
```

### índices Positivos y Negativos

```python run
texto = "Python"

print(texto[0])   # P
print(texto[-1])  # n
```

```output
P
n
```

| Tipo | Ejemplo | Resultado |
| --- | --- | --- |
| Positivo | `texto[0]` | Primer carácter |
| Negativo | `texto[-1]` | Último carácter |

:::note
Las cadenas son inmutables, no se pueden modificar directamente:
:::

```python
texto = "Hola"
# texto[0] = "h"   ERROR   
```

### Slicing (Cortes de Texto)

Permite extraer partes de una cadena.

```python run
texto = "Python"

print(texto[0:3])
print(texto[2:])
print(texto[:4])
```

```output
Pyt
thon
Pyth
```

#### Sintaxis

```python
cadena[inicio:fin]
```

:::note
El índice final no se incluye en el resultado.
:::

### Slicing Avanzado

```python run
texto = "Python"

print(texto[::2])
print(texto[::-1])
```

```output
Pto
nohtyP
```

:::tip
El uso de `[::-1]` es una forma rápida de invertir una cadena.
:::

## Métodos de Cadenas

Las cadenas tienen métodos integrados para transformarlas.

### Métodos Comunes

| Método | Descripción | Ejemplo |
| --- | --- | --- |
| `upper()` | Convierte a mayúsculas | `"hola".upper()` |
| `lower()` | Convierte a minúsculas | `"HOLA".lower()` |
| `replace()` | Reemplaza texto | `"hola".replace("h","H")` |
| `strip()` | Elimina espacios | `" hola ".strip()` |
| `count()` | Cuenta ocurrencias | `"hola".count("o")` |

Ejemplo Práctico:

```python run
texto = "  hola mundo  "

print(texto.strip())
print(texto.upper())
print(texto.replace("mundo", "Python"))
```

```output
hola mundo
  HOLA MUNDO  
  hola Python  
```

:::tip
Encadenar métodos permite hacer varias operaciones en una sola línea.
:::

```python run
texto = "  hola mundo  "
print(texto.strip().upper())
```

```output
HOLA MUNDO
```

## Búsqueda en Cadenas

```python run
texto = "Hola mundo"

print("Hola" in texto)
print("Python" in texto)
```

```output
True
False
```

:::note
El operador `in` permite verificar si un texto está contenido en otro.
:::

## Longitud de una Cadena

```python run
texto = "Python"

print(len(texto))
```

```output
6
```

## Ejemplo Integrador

```python run
texto = "  Aprendiendo Python  "

texto = texto.strip()
texto = texto.replace("Python", "programación")

print(texto.upper())
```

```output
APRENDIENDO PROGRAMACIÓN
```

## Ejercicios Prácticos

### Ejercicio 1: Analizador de Texto

Crea un programa que:

- Defina una variable con el texto: `" Python es un lenguaje poderoso y Python es fácil de aprender "`.
- Elimine los espacios al inicio y final.
- Convierta todo el texto a minúsculas.
- Cuente cuántas veces aparece la palabra `"python"`.
- Reemplace `"python"` por `"Java"`.
- Muestre: Texto limpio, número de repeticiones y texto modificado.

```python practice
# Crea un programa que:
# 1. Defina una variable con el texto: " Python es un
# lenguaje poderoso y Python es fácil de aprender ".
# 2. Elimine los espacios al inicio y final.
# 3. Convierta todo el texto a minúsculas.
# 4. Cuente cuántas veces aparece la palabra "python".
# 5. Reemplace "python" por "Java".
# 6. Muestre: Texto limpio, número de repeticiones y
# texto modificado.
```

:::details
```python run
# 1. Defina una variable con el texto: " Python es un
# lenguaje poderoso y Python es fácil de aprender "
texto = " Python es un lenguaje poderoso y Python es fácil de aprender "

# 2. Elimine los espacios al inicio y final
# 3. Convierta todo el texto a minúsculas
texto = texto.strip().lower()

# 4. Cuente cuántas veces aparece la palabra "python"
cantidad = texto.count("python")

# 5. Reemplace "python" por "Java"
texto_modificado = texto.replace("python", "Java")

# 6. Muestre: Texto limpio, número de repeticiones y
# texto modificado
print("Texto limpio:", texto)
print("Cantidad de 'python':", cantidad)
print("Texto modificado:", texto_modificado)
```
:::

### Ejercicio 2: Inversor y Verificador de Palíndromo

Crea un programa que:

- Defina una palabra (por ejemplo `"reconocer"`).
- Invierta la palabra usando slicing.
- Compare la palabra original con la invertida.
- Indique si es un palíndromo (se lee igual al derecho y al revés).

```python practice
# Crea un programa que:
# 1. Defina una palabra (por ejemplo "reconocer").
# 2. Invierta la palabra usando slicing.
# 3. Compare la palabra original con la invertida.
# 4. Indique si es un palíndromo (se lee igual al
# derecho y al revés).
```

:::details
```python run
# 1. Defina una palabra (por ejemplo "reconocer")
palabra = "reconocer"

# 2. Invierta la palabra usando slicing
invertida = palabra[::-1]

# 3. Compare la palabra original con la invertida
# 4. Indique si es un palíndromo (se lee igual al
# derecho y al revés)
if palabra == invertida:
    print("Es un palíndromo")
else:
    print("No es un palíndromo")
```
:::

### Ejercicio 3: Procesador de Texto Avanzado

Desarrolla un programa que:

- Defina una cadena con el siguiente texto: `"Python, Java, Python, C++, Python, JavaScript"`.
- Convierta todo el texto a minúsculas.
- Reemplace `"c++"` por `"c plus plus"`.
- Cuente cuántas veces aparece `"python"`.
- Extraiga los primeros 20 caracteres del texto.
- Invierta todo el texto.
- Muestre cada resultado por separado.

```python practice
# Desarrolla un programa que:
# 1. Defina una cadena con el siguiente texto: "Python,
# Java, Python, C++, Python, JavaScript".
# 2. Convierta todo el texto a minúsculas.
# 3. Reemplace "c++" por "c plus plus".
# 4. Cuente cuántas veces aparece "python".
# 5. Extraiga los primeros 20 caracteres del texto.
# 6. Invierta todo el texto.
# 7. Muestre cada resultado por separado.
```

:::details
```python run
# 1. Defina una cadena con el siguiente texto: "Python,
# Java, Python, C++, Python, JavaScript"
texto = "Python, Java, Python, C++, Python, JavaScript"

# 2. Convierta todo el texto a minúsculas
texto = texto.lower()

# 3. Reemplace "c++" por "c plus plus"
texto = texto.replace("c++", "c plus plus")

# 4. Cuente cuántas veces aparece "python"
conteo = texto.count("python")

# 5. Extraiga los primeros 20 caracteres del texto
primeros = texto[:20]

# 6. Invierta todo el texto
invertido = texto[::-1]

# 7. Muestre cada resultado por separado
print("Texto:", texto)
print("Cantidad de 'python':", conteo)
print("Primeros 20 caracteres:", primeros)
print("Texto invertido:", invertido)
```
:::

:::note[Notas Importantes:]
**1.** Las cadenas son inmutables.\
**2.** Se pueden recorrer y manipular facilmente.\
**3.** Existen múltiples métodos integrados para trabajar con texto.
:::

:::tip[Tips de Programación:]
**1.** Usa slicing para manipular texto rápidamente.\
**2.** Usa métodos como `strip()` y `lower()` para limpiar datos.\
**3.** Combina operaiones para hacer el código más eficiente.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste a trabajar con cadenas de texto utilizando indexación, slicing y métodos integrados para transformar y analizar información. Comprendiste cómo acceder a caracteres individuales, extraer partes de un texto, modificar contenido y realizar búsquedas dentro de cadenas. Estas habilidades son esenciales para procesar datos reales y construir programas capaces de manejar información textual de forma clara y estructurada.
