---
title: Scope o Alcance de las Variables
summary: Esta unidad aborda el concepto de scope o alcance de las variables, explicando la diferencia entre variables locales, que existen únicamente dentro de una función, y variables globales, que pueden utilizarse en distintas partes del programa. Comprenderás cómo el alcance de las variables influye en el comportamiento del código y por qué es importante manejar correctamente los datos dentro de funciones para evitar errores o conflictos.
order: 4
---

El scope o alcance de las variables determina en qué partes de un programa una variable puede ser utilizada o modificada. En Python, este concepto es fundamental para entender cómo funcionan las funciones y cómo se manejan los datos dentro de ellas. En esta unidad aprenderás la diferencia entre variables locales, que solo existen dentro de una función, y variables globales, que pueden ser utilizadas en diferentes partes del programa. También comprenderás cómo el alcance influye directamente en el comportamiento del código y por qué es importante manejar correctamente las variables para evitar errores, conflictos o resultados inesperados.

## ¿Qué es el Scope?

El scope define el "lugar" donde una variable es accesible.

Dependiendo de dónde se declare una variable, su alcance será diferente.

## Variables Locales

Una variable local es aquella que se define dentro de una función y solo puede utilizarse dentro de ella.

Ejemplo:

```python run
def mostrar_nombre():
    nombre = "Ana"
    print(nombre)

mostrar_nombre()
```

```output
Ana
```

Error fuera de la función:

```python run error
def mostrar_nombre():
    nombre = "Ana"
    print(nombre)

print(nombre) # Error: no existe fuera de la función
```

```output
Traceback (most recent call last):
  File "<exec>", line 5, in <module>
    print(nombre) # Error: no existe fuera de la función
          ^^^^^^
NameError: name 'nombre' is not defined
```

:::note
Las variables locales desaparecen cuando la función termina su ejecución.
:::

## Variables Globales

Una variable global es aquella que se define fuera de cualquier función y puede utilizarse en todo el programa.

Ejemplo:

```python run
mensaje = "Hola mundo"

def mostrar_mensaje():
    print(mensaje)

mostrar_mensaje()
```

```output
Hola mundo
```

:::tip
Las variables globales pueden ser leídas dentro de funciones sin problema.
:::

### Modificar Variables Globales

Si quieres modificar una variable global dentro de una función, debes usar la palabra clave `global`.

Ejemplo:

```python run
contador = 0

def incrementar():
    global contador
    contador = contador + 1

incrementar()
print(contador)
```

```output
1
```

:::note
Sin `global`, Python crea una variable local nueva, no modifica la global.
:::

Ejemplo de confusión común:

```python run
x = 10

def cambiar():
    x = 5
    print(x)

cambiar()
print(x)
```

```output
5
10
```

:::note
Esto ocurre porque `x` dentro de la función es local, no afecta la variable global.
:::

### Comparación: Variables Locales VS Globales

| Característica | Local | Global |
| --- | --- | --- |
| Lugar donde se define | Dentro de función | Fuera de función |
| Alcance | Solo dentro de la función | Todo el programa |
| Duración | Temporal | Permanente |
| Acceso | Limitado | Amplio |

:::tip[Tips (Buenas prácticas)]
**1.** Evitar el uso excesivo de variables globales.\
**2.** Usar parámetros y `return` en su lugar.\
**3.** Mantener variables dentro de funciones cuando sea posible.\
**4.** Un buen programa usa funciones con parámetros, no depende de varibles globlales.
:::

## Ejemplo Integrador

```python run
contador = 0

def sumar():
    global contador
    contador += 1

def mostrar():
    print("Valor:", contador)

sumar()
sumar()
mostrar()
```

```output
Valor: 2
```

## Ejercicios Prácticos

### Ejercicio 1: Variable Local

Crea un programa que:

- Defina una función llamada `saludo`.
- Dentro de la función cree una variable llamada mensaje con el valor `"Hola desde la función"`.
- Imprima el valor dentro de la función.
- Intente imprimir la variable fuera de la función (observa el error).
- Explica en un comentario por qué ocurre el error.

```python practice
# Crea un programa que:
# 1. Defina una función llamada saludo.
# 2. Dentro de la función cree una variable llamada
# mensaje con el valor "Hola desde la función".
# 3. Imprima el valor dentro de la función.
# 4. Intente imprimir la variable fuera de la función
# (observa el error).
# 5. Explica en un comentario por qué ocurre el error.
```

:::details
```python run
# 1. Defina una función llamada saludo
def saludo():
    # 2. Dentro de la función cree una variable llamada
    # mensaje con el valor "Hola desde la función"
    mensaje = "Hola desde la función"
    # 3. Imprima el valor dentro de la función
    print(mensaje)

# 4. Intente imprimir la variable fuera de la función
# (observa el error)
saludo()

# 5. Explica en un comentario por qué ocurre el error
# print(mensaje)  # Error: variable local
```
:::

### Ejercicio 2: Variable Global

Desarrolla un programa que:

- Cree una variable global llamada `nombre` con tu nombre.
- Defina una función llamada `mostrar_nombre`.
- Dentro de la función imprima la variable global.
- Llama la función y verifica que funciona correctamente.

```python practice
# Desarrolla un programa que:
# 1. Cree una variable global llamada nombre con tu
# nombre.
# 2. Defina una función llamada mostrar_nombre.
# 3. Dentro de la función imprima la variable global.
# 4. Llama la función y verifica que funciona
# correctamente.
```

:::details
```python run
# 1. Cree una variable global llamada nombre con tu
# nombre
nombre = "Daniel"

# 2. Defina una función llamada mostrar_nombre
def mostrar_nombre():
    # 3. Dentro de la función imprima la variable global
    print(nombre)

# 4. Llama la función y verifica que funciona
# correctamente
mostrar_nombre()
```
:::

### Ejercicio 3: Modificar Variable Global

Crea un programa que:

- Defina una variable global llamada `contador` con valor inicial 0.
- Cree una función llamada `incrementar`.
- Dentro de la función: Usa la palabra clave `global` y aumenta el valor del contador en 1.
- Llama la función tres veces.
- Imprime el valor final del contador.

```python practice
# Crea un programa que:
# 1. Defina una variable global llamada contador con
# valor inicial 0.
# 2. Cree una función llamada incrementar.
# 3. Dentro de la función: Usa la palabra clave global
# y aumenta el valor del contador en 1.
# 4. Llama la función tres veces.
# 5. Imprime el valor final del contador.
```

:::details
```python run
# 1. Defina una variable global llamada contador con
# valor inicial 0
contador = 0

# 2. Cree una función llamada incrementar
def incrementar():
    # 3. Dentro de la función: Usa la palabra clave global
    # y aumenta el valor del contador en 1
    global contador
    contador += 1

# 4. Llama la función tres veces
incrementar()
incrementar()
incrementar()

# 5. Imprime el valor final del contador
print(contador)
```
:::

:::note[Notas Importantes:]
**1.** Las variables locales solo existen dentro de la función.\
**2.** Las variables globales pueden usarse en todo el programa.\
**3.** Para modificar una variable global se usa `global`.
:::

:::tip[Tips de Programación:]
**1.** Evita depender demasiado de variables globales.\
**2.** Usa funciones con parámetros y `return`.\
**3.** Mantén el control del flujo de datos dentro de funciones.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste el concepto de scope o alcance de las variables, comprendiendo la diferencia entre variables locales y globales, así como su impacto en el comportamiento del programa. Entendiste cómo las variables locales están limitadas a la función donde se definen, mientras que las globales pueden ser accedidas desde distintas partes del código, y cómo utilizar la palabra clave `global` para modificarlas cuando es necesario. Dominar el alcance de las variables es fundamental para evitar errores, mejorar la organización del código y desarrollar programas más claros, seguros y fáciles de mantener.
