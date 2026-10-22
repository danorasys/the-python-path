---
title: Funciones con Argumentos por Defecto
summary: En esta unidad se explorará cómo definir funciones con argumentos por defecto, permitiendo que algunos parámetros tengan valores predeterminados cuando no se proporcionan al llamar la función. También se introducirá el uso de argumentos nombrados, que permiten especificar explícitamente qué valor corresponde a cada parámetro. Estas herramientas ayudan a crear funciones más flexibles, fáciles de utilizar y adaptables a diferentes situaciones.
order: 3
---

En muchas ocasiones, una función puede necesitar valores que no siempre cambian. Para estos casos, Python permite definir argumentos por defecto, es decir, parámetros que ya tienen un valor asignado si el usuario no proporciona uno al llamar la función. En esta unidad aprenderás cómo definir estos parámetros, cómo funcionan cuando se envían o no argumentos, y cómo utilizar argumentos nombrados, que permiten indicar explícitamente qué valor corresponde a cada parámetro. Estas herramientas permiten crear funciones más flexibles, fáciles de usar y adaptables a diferentes situaciones sin necesidad de modificar su definición.

## ¿Qué son los Argumentos por Defecto?

Un argumento por defecto es un parámetro que tiene un valor asignado desde la definición de la función.

Si al llamar la función no se proporciona ese valor, Python utiliza el valor predeterminado.

### Sintaxis

```python
def nombre_funcion(parametro=valor):
	instrucciones
```

### Ejemplo Básico

```python
def saludar(nombre="Usuario"):
	print("Hola", nombre)
```

Uso:

```python
saludar()
saludar("Carlos")
```

Resultado:

```python
Hola Usuario
Hola Carlos
```

```python run hidden
def saludar(nombre="Usuario"):
	print("Hola", nombre)

saludar()
saludar("Carlos")
```

:::note[Nota:]
Los argumentos por defecto hacen que los parámetros sean opcionales.
:::

## Múltiples Argumentos por Defecto

Una función puede tener varios parámetros con valores por defecto.

```python
def mostrar_datos(nombre="Desconocido", edad=0):
	print("Nombre:", nombre)
	print("Edad:", edad)
```

Uso:

```python
mostrar_datos()
mostrar_datos("Ana", 25)
```

```python run hidden
def mostrar_datos(nombre="Desconocido", edad=0):
	print("Nombre:", nombre)
	print("Edad:", edad)

mostrar_datos()
mostrar_datos("Ana", 25)
```

## Orden de los Parámetros

Los parámetros con valores por defecto deben ir después de los parámetros obligatorios.

### Incorrecto

```python
def ejemplo(a=10, b):
	pass
```

### Correcto

```python
def ejemplo(b, a=10):
	pass
```

:::tip[Tip:]
Primero define los parámetros obligatorios y luego los opcionales.
:::

## Argumentos Nombrados

Los argumentos nombrados permiten especificar el nombre del parámetro al llamar la función.

Ejemplo:

```python
def registrar(nombre, edad):
	print(nombre, edad)
```

Llamada:

```python
registrar(edad=25, nombre="Carlos")
```

Resultado:

```python
Carlos 25
```

```python run hidden
def registrar(nombre, edad):
	print(nombre, edad)

registrar(edad=25, nombre="Carlos")
```

:::note[Nota:]
El orden de los argumentos no importa cuando se usan argumentos nombrados.
:::

## Combinar Argumentos por Defecto y Nombrados

```python
def crear_usuario(nombre, rol="usuario"):
	print("Nombre:", nombre)
	print("Rol:", rol)
```

Uso:

```python
crear_usuario("Ana")
crear_usuario("Luis", rol="admin")
```

```python run hidden
def crear_usuario(nombre, rol="usuario"):
	print("Nombre:", nombre)
	print("Rol:", rol)

crear_usuario("Ana")
crear_usuario("Luis", rol="admin")
```

:::tip[Tip:]
Los argumentos nombrados mejoran la legibilidad del código, especialmente cuando hay muchos parámetros.
:::

## Resumen de Conceptos

| Concepto | Descripción |
| --- | --- |
| Argumento por defecto | Parámetro con valor inicial |
| Argumento obligatorio | Debe ser enviado |
| Argumento nombrado | Se especifica por nombre |
| Parámetro opcional | Puede omitirse |

## Ejemplo Integrador

```python run
def calcular_descuento(precio, descuento=10):
	total = precio - (precio * descuento / 100)
	return total

print(calcular_descuento(100))
print(calcular_descuento(100, 20))
```

```output label="Resultado:"
90.0
80.0
```

:::note[Nota:]
Los valores por defecto se asignan una sola vez al definir la función, no cada vez que se ejecuta.
:::

## Ejercicios Prácticos

### Ejercicio 1: Función con Valor por Defecto

Crea un programa que realice lo siguiente:

- Definir una función llamada `saludo`.
- La función debe tener un parámetro llamado `nombre` con valor por defecto `"Invitado"`.
- Dentro de la función imprimir el mensaje: `Hola, <nombre>`.
- Llamar la función sin argumentos.
- Llamar la función enviando el nombre `"Carlos"`.

```python run="Practicar >>" hidden
# Crea un programa que realice lo siguiente:
# 1. Definir una función llamada saludo.
# 2. La función debe tener un parámetro llamado nombre
# con valor por defecto "Invitado".
# 3. Dentro de la función imprimir el mensaje: "Hola,
# <nombre>".
# 4. Llamar la función sin argumentos.
# 5. Llamar la función enviando el nombre "Carlos".
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Definir una función llamada saludo
# 2. La función debe tener un parámetro llamado nombre
# con valor por defecto "Invitado"
def saludo(nombre="Invitado"):
	# 3. Dentro de la función imprimir el mensaje: "Hola,
	# <nombre>"
	print("Hola,", nombre)

# 4. Llamar la función sin argumentos
saludo()
# 5. Llamar la función enviando el nombre "Carlos"
saludo("Carlos")
```
:::

### Ejercicio 2: Calculadora de Precio Final

Desarrolla un programa que:

- Cree una función llamada `precio_final`.
- La función debe recibir: `precio` (obligatorio) e `impuesto` (por defecto 15).
- Calcular el precio final con la fórmula: `precio_total = precio + (precio * impuesto / 100)`.
- Devolver el resultado usando `return`.
- Llamar la función una vez usando solo el `precio`.
- Llamar la función otra vez usando el `precio` e `impuesto` personalizado (por ejemplo 20).
- Mostrar ambos resultados.

```python run="Practicar >>" hidden
# Desarrolla un programa que:
# 1. Cree una función llamada precio_final.
# 2. La función debe recibir: precio (obligatorio) e
# impuesto (por defecto 15).
# 3. Calcular el precio final con la fórmula: 
# precio_total = precio + (precio * impuesto / 100).
# 4. Devolver el resultado usando return.
# 5. Llamar la función una vez usando solo el precio.
# 6. Llamar la función otra vez usando el precio e
# impuesto personalizado (por ejemplo 20).
# 7. Mostrar ambos resultados.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Cree una función llamada precio_final
# 2. La función debe recibir: precio (obligatorio) e
# impuesto (por defecto 15)
def precio_final(precio, impuesto=15):
	# 3. Calcular el precio final con la fórmula:
	# precio_total = precio + (precio * impuesto / 100)
	total = precio + (precio * impuesto / 100)
	# 4. Devolver el resultado usando return
	return total

# 5. Llamar la función una vez usando solo el precio
print(precio_final(100))
# 6. Llamar la función otra vez usando solo el precio e
# impuesto personalizado (por ejemplo 20)
print(precio_final(100, 20))
# 7. Mostrar ambos resultados
# Ya se mostraron los respectivos resultados, usando la función print()
```
:::

### Ejercicio 3: Uso de Argumentos Nombrados

Crea un programa que:

- Defina una función llamada `crear_producto`.
- La función debe recibir: `nombre`, `precio` y `cantidad` (por defecto 1).
- Imprimir los datos del producto.
- Llamar la función utilizando argumentos nombrados.
- Llamar la función cambiando el orden de los argumentos.
- Llamar la función sin especificar la cantidad.

```python run="Practicar >>" hidden
# Crea un programa que:
# 1. Defina una función llamada crear_producto.
# 2. La función debe recibir: nombre, precio y cantidad
# (por defecto 1).
# 3. Imprimir los datos del producto.
# 4. Llamar la función utilizando argumentos nombrados.
# 5. Llamar la función cambiando el orden de los
# argumentos.
# 6. Llamar la función sin especificar la cantidad.
```

:::details[Observar posible solución]
```python run="Probar Solución >>"
# 1. Defina una función llamada crear_producto
# 2. La función debe recibir: nombre, precio y cantidad
# (por defecto 1)
def crear_producto(nombre, precio, cantidad=1):
	# 3. Imprimir los datos del producto
	print("Nombre:", nombre)
	print("Precio:", precio)
	print("Cantidad:", cantidad)

# 4. Llamar la función utilizando argumentos nombrados
crear_producto(nombre="Laptop", precio=1000, cantidad=2)
# 5. Llamar la función cambiando el orden de los
# argumentos
# 6. Llamar la función sin especificar la cantidad
crear_producto(precio=500, nombre="Mouse")
```
:::

:::note[Notas Importantes:]
**1.** Los argumentos por defecto hacen los parámetros opcionales.\
**2.** Los argumentos nombrados permiten mayor claridad.\
**3.** El orden de los parámetros es importante en la definición.
:::

:::tip[Tips de Programación:]
**1.** Usa valores por defecto para simplificar el uso de funciones.\
**2.** Usa argumentos nombrados cuando haya muchos parámetros.\
**3.** Diseña funciones flexibles y fáciles de reutilizar.
:::

## Conclusiones de la Unidad

En esta unidad aprendiste cómo definir funciones con argumentos por defecto, permitiendo que algunos parámetros tengan valores predeterminados cuando no se proporcionan al llamar la función. También comprendiste el uso de argumentos nombrados, que permiten especificar explícitamente los valores de cada parámetro, mejorando la claridad y flexibilidad del código. Estas herramientas te permiten diseñar funciones más adaptables, reutilizables y fáciles de utilizar en diferentes contextos, lo que es fundamental para desarrollar programas más organizados en Python.
