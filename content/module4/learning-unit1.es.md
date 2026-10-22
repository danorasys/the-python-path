---
title: Definir Funciones con `def`
summary: Las funciones son bloques de código reutilizables que permiten agrupar instrucciones para realizar una tarea específica dentro de un programa. En esta unidad aprenderás qué es una función, cómo se define utilizando la palabra clave `def` y cómo se ejecuta al ser llamada desde distintas partes del programa. También se analizará cómo el uso de funciones ayuda a organizar mejor el código, dividir problemas en partes más pequeñas y evitar la repetición innecesaria de instrucciones.
order: 1
---

Las funciones son bloques de código reutilizables que permiten agrupar instrucciones para realizar una tarea específica dentro de un programa. En Python, las funciones se definen utilizando la palabra clave `def`, lo que permite encapsular una serie de instrucciones bajo un nombre que puede ejecutarse cuando sea necesario. En esta unidad aprenderás qué son las funciones, cómo se crean y cómo se utilizan dentro de un programa. Además, comprenderás cómo las funciones ayudan a organizar el código, dividir problemas grandes en partes más pequeñas y evitar repetir instrucciones múltiples veces, lo que facilita el mantenimiento y la comprensión del programa.

## ¿Qué es una Función?

Una función es un conjunto de instrucciones agrupadas que realizan una tarea específica.

En lugar de escribir el mismo código varias veces, se puede definir una función una sola vez y ejecutarla cuando sea necesario.

### Ejemplo Cotidiano

Piensa en una función como una receta de cocina:

- La receta → es la función.
- Los pasos → son las instrucciones.
- Cocinar → es ejecutar la función.

## Sintaxis Básica de una Función

La estructura básica de una función en Python es:

```python
def nombre_funcion():
    instrucciones
```

Ejemplo:

```python
def saludar():
    print("Hola, bienvenido al programa")
```

### Ejecutar la Función

Para ejecutar la función se utiliza su nombre:

```python
saludar()
```

```output
Hola, bienvenido al programa
```

```python run hidden
def saludar():
    print("Hola, bienvenido al programa")

saludar()
```

:::note
Definir una función no ejecuta el código automáticamente. Es necesario llamar la función para que se ejecute.
:::

### Ejemplo Completo

```python run
def mostrar_mensaje():
    print("Aprendiendo funciones en Python")

mostrar_mensaje()
mostrar_mensaje()
```

```output
Aprendiendo funciones en Python
Aprendiendo funciones en Python
```

Esto demuestra cómo una función permite reutilizar código fácilmente.

## ¿Por qué Usar Funciones?

Las funciones ayudan a:

- Organizar el código.
- Evitar repeticiones.
- Facilitar el mantenimiento.
- Dividir problemas grandes en partes pequeñas.

### Comparación

| Sin Funciones | Con Funciones |
| --- | --- |
| Código repetido | Código reutilizable |
| Difícil de mantener | Más organizado |
| Programas largos | Programas modulares |

## Llamar Funciones Varias Veces

Una función puede ejecutarse muchas veces dentro de un programa.

```python run
def bienvenida():
    print("Bienvenido al sistema")

bienvenida()
bienvenida()
bienvenida()
```

```output
Bienvenido al sistema
Bienvenido al sistema
Bienvenido al sistema
```

:::tip
Si ves el mismo bloque de código repetido varias veces, probablemente debería convertirse en una función.
:::

## Funciones para Organizar Programas

Ejemplo de un programa organizado con funciones:

```python run
def mostrar_titulo():
    print("Sistema de Registro")

def mostrar_menu():
    print("1. Registrar usuario")
    print("2. Ver usuarios")

mostrar_titulo()
mostrar_menu()
```

```output
Sistema de Registro
1. Registrar usuario
2. Ver usuarios
```

Esto hace que el programa sea más claro y estructurado.

## Buenas Prácticas al Crear Funciones

| Recomendación | Explicación |
| --- | --- |
| Usar nombres claros | Ejemplo: `calcular_total()` |
| Mantener funciones pequeñas | Una tarea por función |
| Evitar código repetido | Reutilizar funciones |

### Nota Importante

En Python, la indentación es obligatoria dentro de una función.

Ejemplo correcto:

```python
def ejemplo():
    print("Dentro de la función")
```

Ejemplo incorrecto:

```python
def ejemplo():
print("Error")
```

## Ejemplo Integrador

```python run
def mostrar_bienvenida():
    print("Bienvenido al programa")

def mostrar_despedida():
    print("Gracias por usar el programa")

mostrar_bienvenida()
mostrar_despedida()
```

```output
Bienvenido al programa
Gracias por usar el programa
```

## Ejercicios Prácticos

### Ejercicio 1: Crear una Función de Saludo

Crea un programa que realice lo siguiente:

- Definir una función llamada `saludo`.
- Dentro de la función imprimir el mensaje: `"Hola, este es mi primer programa con funciones"`.
- Ejecutar la función desde el programa principal.
- Llamar la función tres veces para observar cómo se reutiliza el código.

```python practice
# Crea un programa que realice lo siguiente:
# 1. Definir una función llamada saludo.
# 2. Dentro de la función imprimir el mensaje: "Hola,
# este es mi primer programa con funciones".
# 3. Ejecutar la función desde el programa principal.
# 4. Llamar la función tres veces para observar cómo se
# reutiliza el código
```

:::details
```python run
# 1. Definir una función llamada saludo
def saludo():
    # 2. Dentro de la función imprimir el mensaje: "Hola,
    # este es mi primer programa con funciones"
    print("Hola, este es mi primer programa con funciones")

# 3. Ejecutar la función desde el programa principal
# 4. Llamar la función tres veces para observar cómo se
# reutiliza el código
saludo()
saludo()
saludo()
```
:::

### Ejercicio 2: Función para Mostrar un Menú

Desarrolla un programa que simule un menú simple:

- Crear una función llamada `mostrar_menu`.
- Dentro de la función mostrar las siguientes opciones:

```python
1. Ver productos
2. Comprar producto
3. Salir
```

- Llamar la función desde el programa principal.
- Ejecutarla dos veces para verificar que funciona correctamente.

```python practice
# Desarrolla un programa que simule un menú simple:
# 1. Crear una función llamada mostrar_menu.
# 2. Dentro de la función mostrar las siguientes
# opciones:
#   1. Ver productos
#   2. Comprar producto
#   3. Salir
# 3. Llamar la función desde el programa principal.
# 4. Ejecutarla dos veces para verificar que funciona
# correctamente
```

:::details
```python run
# 1. Crear una función llamada mostrar_menu
def mostrar_menu():
# 2. Dentro de la función mostrar las siguientes
# opciones:
    # 1. Ver productos
    print("1. Ver productos")
    # 2. Comprar producto
    print("2. Comprar producto")
    # 3. Salir
    print("3. Salir")

# 3. Llamar la función desde el programa principal
# 4. Ejecutarla dos veces para verificar que funciona
# correctamente
mostrar_menu()
mostrar_menu()
```
:::

### Ejercicio 3: Organizar un Programa con Funciones

Crea un programa que tenga dos funciones diferentes:

- Una función llamada `titulo` que imprima:

```python
Sistema de Gestión de Estudiantes
```

- Una función llamada `mensaje_inicio` que imprima:

```python
El programa ha iniciado correctamente
```

- Ejecutar ambas funciones desde el programa principal.

```python practice
# Crea un programa que tenga dos funciones diferentes:
# 1. Una función llamada titulo que imprima: "Sistema
# de Gestión de Estudiantes"
# 2. Una función llamada mensaje_inicio que imprima:
# "El programa ha iniciado correctamente"
# 3. Ejecutar ambas funciones desde el programa
# principal
```

:::details
```python run
# 1. Una función llamada titulo que imprima: "Sistema
# de Gestión de Estudiantes"
def titulo():
    print("Sistema de Gestión de Estudiantes")

# 2. Una función llamada mensaje_inicio que imprima:
# "El programa ha iniciado correctamente"
def mensaje_inicio():
    print("El programa ha iniciado correctamente")

# 3. Ejecutar ambas funciones desde el programa
# principal
titulo()
mensaje_inicio()
```
:::

:::note[Notas Importantes:]
**1.** Las funciones agrupan instrucciones reutilizables.\
**2.** Se definen usando `def`.\
**3.** Deben ser llamadas para ejecutarse.\
**4.** Permiten organizar mejor los programas.
:::

:::tip[Tips de Aprendizaje:]
**1.** Usa funciones para evitar repetir código.\
**2.** Nombra las funciones según la tarea que realizan.\
**3.** Divide programas grandes en varias funciones pequeñas.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste qué son las funciones y cómo definirlas en Python utilizando la palabra clave `def`. Comprendiste cómo agrupar instrucciones dentro de un bloque reutilizable y cómo ejecutar esas funciones desde diferentes partes del programa. También observaste cómo las funciones ayudan a organizar el código, evitar repeticiones y dividir problemas complejos en tareas más pequeñas y manejables. Estas habilidades constituyen una base fundamental para escribir programas más estructurados, claros y fáciles de mantener.
