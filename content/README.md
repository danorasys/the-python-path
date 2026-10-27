# Guía para escribir contenido

Esta carpeta contiene toda la ruta de aprendizaje, con sus módulos y unidades, en español, inglés y alemán. El contenido se escribe en Markdown y YAML, y el proyecto genera a partir de él los archivos JSON que usa la web.

Para empezar una unidad nueva, se debe copiar [`_template.md`](_template.md), que incluye un ejemplo de cada elemento descrito aquí. La plantilla se debe revisar como texto y no en vista previa, porque la vista previa oculta las opciones de los bloques de código, como `run` o `input="..."`, y no muestra los bloques `:::` ni los iconos como en la web.

## Índice

- [Comandos](#comandos)
- [Carpetas y nombres de archivo](#carpetas-y-nombres-de-archivo)
- [Encabezado de cada archivo](#encabezado-de-cada-archivo)
- [Texto](#texto)
- [Bloques especiales](#bloques-especiales)
- [Código Python](#código-python)
- [Comprobar las salidas](#comprobar-las-salidas)
- [Traducciones](#traducciones)
- [Mover o renombrar unidades](#mover-o-renombrar-unidades)
- [Qué no está permitido y por qué](#qué-no-está-permitido-y-por-qué)
- [Errores frecuentes](#errores-frecuentes)

## Comandos

Con `npm run dev`, la página se recarga sola cada vez que se guarda un archivo. Si algo falla, el error aparece encima de la página y en la terminal, indicando el archivo y la línea.

| Comando | Para qué sirve |
| --- | --- |
| `npm run dev` | Ver el contenido en la web mientras se escribe. |
| `npm run build` | Generar la web publicable. Falla si hay errores en el contenido. |
| `npm run content:check` | Comprobar que las salidas escritas son correctas. |
| `npm run content:outputs` | Escribir en los archivos las salidas correctas. |
| `npm run content:translations` | Ver el estado de las traducciones y marcarlas como revisadas. |

## Carpetas y nombres de archivo

```
content/
├── roadmap.es.yml              Ruta principal
├── roadmap.en.yml
├── module1/
│   ├── module.es.yml           Datos del módulo
│   ├── module.en.yml
│   ├── learning-unit1.es.md    Unidad 1 en español
│   ├── learning-unit1.en.md    Unidad 1 en inglés
│   └── ...
└── module2/
    └── ...
```

- Cada módulo es una carpeta `moduleN`, y cada unidad es un archivo `learning-unitN.<idioma>.md`.
- El código de idioma (`es`, `en` o `de`) va justo antes de la extensión, por ejemplo `learning-unit1.es.md`.
- **El español es el idioma base:** cada módulo necesita su `module.es.yml` y cada unidad su archivo `.es.md`. Las versiones en inglés y alemán son opcionales.
- El número que lleva el nombre debe coincidir con la posición indicada en el campo `order`. Por ejemplo, la segunda unidad de un módulo se llama `learning-unit2` y el tercer módulo, `module3`. Si no coincide, se marca como error. Ese número también forma parte de la dirección web (`/module2/learning-unit3`).
- El proyecto ignora los archivos que empiezan por `_` o `.`, y también los `README.md`. Cualquier otro archivo que no reconozca lo marca como error, así no pasa desapercibida una errata como `learning-unit1.es.mdx`.

## Encabezado de cada archivo

Cada archivo de unidad empieza con un encabezado YAML entre dos líneas `---`, por ejemplo:

```yaml
---
title: Título de la unidad
summary: Frase corta sobre lo que se aprende.
order: 1
---
```

Los archivos `.yml` de la ruta y de los módulos usan campos parecidos (la tabla indica cuáles van en cada uno). La diferencia es que no llevan las líneas `---`, porque todo el archivo es YAML.

| Campo | Dónde | Obligatorio | Para qué sirve |
| --- | --- | --- | --- |
| `title` | Todos | Sí | Título. Los módulos y las unidades se numeran solos en la ruta, así que el título no debe incluir el número. |
| `summary` | Unidades | No | Frase corta que aparece en la tarjeta de la unidad dentro del módulo. |
| `description` | Todos | No | Texto de presentación de la ruta, del módulo o de la unidad. |
| `order` | Unidades y módulos en español | Sí | Posición: un número entero desde 1, distinto en cada unidad del módulo. Debe coincidir con el número del nombre del archivo o de la carpeta. |
| `color` | Unidades y módulos en español | No | Color de la tarjeta, como `"#3776AB"`. Sin él se alternan amarillo, azul, verde y violeta. |
| `aliases` | Unidades en español | No | Direcciones antiguas que deben llevar a esta unidad. Ver [Mover o renombrar unidades](#mover-o-renombrar-unidades). |
| `source` | Traducciones | No | Huella del texto español traducido. La escribe `npm run content:translations` y no se debe editar a mano. |

- `order`, `color` y `aliases` solo van en el archivo español: las traducciones heredan la posición y el color.
- `title`, `summary` y `description` admiten **negrita**, _cursiva_ y `código`, pero no saltos de línea.
- Si un valor contiene `: ` o empieza por `` ` ``, `"`, `[` o `{`, ponlo entre comillas dobles:

  ```yaml
  title: "Tu Primer Programa: `print()`"
  ```

### Unidades en preparación

Si una unidad en español tiene encabezado pero no contenido, el módulo la muestra sin enlace, y en el menú lateral aparece atenuada. Así se pueden anunciar unidades que todavía no están listas.

## Texto

| Escribe | Se ve como |
| --- | --- |
| `## Título` | Subtítulo principal. El título de la unidad va en el encabezado, por eso `#` no se usa. |
| `###`, `####`, `#####` | Subtítulos de segundo, tercer y cuarto nivel. |
| `**texto**` | **Negrita**. |
| `_texto_` | _Cursiva_. |
| `` `print()` `` | Código dentro del texto. |
| `- elemento` | Lista con viñetas. Cada elemento es una línea de texto. |
| `---` (en una línea sola, con una línea en blanco antes) | Línea separadora. |
| `:check` | Icono verde de correcto. |
| `:cross` | Icono rojo de incorrecto. |

Un salto de línea simple dentro de un párrafo se convierte en un espacio. Para empezar otro párrafo, se debe dejar una línea en blanco.

### Tablas

```markdown
| Operador | Significado | Ejemplo |
| --- | --- | --- |
| `+` | Suma | `3 + 5` |
| `-` | Resta | `10 - 4` |
```

La primera fila es la cabecera. Para darle un título a la tabla, se usa el bloque [`:::table`](#bloques-especiales).

### Imágenes

```markdown
![Diagrama de una variable apuntando a un valor](images/variable.png)
```

- La imagen va sola en su párrafo. El texto entre corchetes es a la vez el pie de foto y la descripción que leen los lectores de pantalla, por eso no debe quedar vacío.
- Las imágenes se guardan en `public/data/images/`. Al escribir la ruta, se empieza desde `images/` en adelante.
- Las imágenes deben ser propias o tener una licencia que permita reutilizarlas. Es mejor no enlazar imágenes alojadas en otras webs, porque pueden cambiar o desaparecer.

### Dos puntos al principio de una palabra

`:check` y `:cross` se muestran como iconos. Cualquier otro texto precedido de dos puntos, como `10:30`, aparece tal cual. Solo hace falta escapar los dos puntos con `\:` en estos casos:

- Cuando van seguidos de `[` o `{`, como `\:nombre[...]`.
- Cuando una línea empieza por `::`.

## Bloques especiales

Los bloques se abren con `:::nombre` y se cierran con `:::`.

````markdown
:::note
La división `/` siempre devuelve un `float`.
:::

:::tip
Usa nombres de variables descriptivos.
:::

:::details
```python run
print("Una posible solución")
```
:::

:::table[Operadores de comparación]
| Operador | Significado |
| --- | --- |
| `==` | Igual a |
:::
````

| Bloque | Qué muestra | Título por defecto |
| --- | --- | --- |
| `:::note` | Recuadro de nota. Admite cualquier contenido, salvo otra nota o consejo. | `Nota:` |
| `:::tip` | Recuadro de consejo. Admite cualquier contenido, salvo otra nota o consejo. | `Tip:` |
| `:::details` | Sección plegable. Admite cualquier contenido. | `Observar posible solución` |
| `:::table[Título]` | Una tabla con título. El título es obligatorio. | — |

- Para cambiar el título, se escribe entre corchetes: `:::note[Importante:]`.
- Para que una nota o un consejo no tengan título, se usan corchetes vacíos: `:::tip[]`.
- Un bloque puede ir dentro de otro, por ejemplo una nota dentro de una solución. En ese caso, el bloque exterior se abre y se cierra con más signos de dos puntos que el interior:

  ```markdown
  ::::details
  :::note
  Esta solución también funciona con números decimales.
  :::
  ::::
  ```

  Una nota o un consejo no pueden ir dentro de otra nota o consejo.

## Código Python

Un bloque de código normal solo se muestra:

````markdown
```python
print("Hola")
```
````

Un bloque de código sin lenguaje también se trata como Python, pero escribir `python` deja explícito el lenguaje.

Las opciones que van después de `python` añaden botones y definen cómo se comprueba el ejemplo:

| Opción | Qué hace |
| --- | --- |
| `run` | Añade un botón que abre el código en el editor para ejecutarlo. |
| `run="Texto >>"` | Igual que `run`, pero el botón muestra el texto indicado en lugar del texto por defecto. |
| `practice` | Ejercicio: no se muestra el código y el botón lo abre en el editor para completarlo. |
| `hidden` | Con `run`: no muestra el código, solo el botón. Útil cuando el código ya se mostró antes. |
| `error` | Con `run` o `practice`: el ejemplo debe terminar en error. Se usa para enseñar errores. |
| `input="Daniel\|36"` | Con `run` o `practice`: respuestas para cada `input()`, separadas por `\|`. Solo se usan para comprobar la salida. En la web, las respuestas se escriben al ejecutar el código. |

Se pueden combinar, como en ```` ```python run="Probar Error >>" hidden error ````. `practice` ya crea su botón y oculta el código, así que no se combina con `run` ni `hidden`.

### Textos por defecto de los botones

No hace falta escribir el texto de los botones ni de las salidas, porque cada idioma ya trae el suyo.

| | Español | Inglés | Alemán |
| --- | --- | --- | --- |
| `run` | `Probar >>` | `Try >>` | `Ausprobieren >>` |
| `run` dentro de `:::details` | `Probar Solución >>` | `Try Solution >>` | `Lösung ausprobieren >>` |
| `practice` | `Practicar >>` | `Practice >>` | `Üben >>` |
| Salida | `Salida:` | `Output:` | `Ausgabe:` |
| `:::note` | `Nota:` | `Note:` | `Hinweis:` |
| `:::tip` | `Tip:` | `Tip:` | `Tipp:` |
| `:::details` | `Observar posible solución` | `View possible solution` | `Mögliche Lösung anzeigen` |

Si un archivo usa el texto por defecto de otro idioma, por ejemplo `run="Probar >>"` en un archivo `.en.md`, se marca como error. Así no se cuelan textos sin traducir.

### Salidas

La salida va en un bloque `output`, justo después del bloque `run`:

````markdown
```python run
print(2 ** 10)
```

```output
1024
```
````

| Opción de `output` | Qué hace |
| --- | --- |
| `label="Resultado:"` | Cambia el texto que aparece encima de la salida. Con `label=""` se quita. |
| `static` | La salida no se comprueba. Se usa cuando el resultado cambia en cada ejecución, como con números aleatorios o la hora. |

- Una salida solo se comprueba si va justo después de un bloque `run` visible. En cualquier otro sitio se muestra tal cual.
- Cuando el código usa `input()`, la salida incluye la pregunta y la respuesta, tal como aparecen en la consola:

  ```
  ¿Cómo te llamas? Daniel
  Hola, Daniel
  ```

### Reglas para el código

- La sangría se hace con 4 espacios, nunca con tabuladores, como recomienda [PEP 8](https://peps.python.org/pep-0008/#indentation). Un tabulador se marca como error.
- Cada ejemplo se ejecuta por separado, así que no puede usar variables definidas en otro bloque.
- Al comprobar los ejemplos, cada uno tiene 10 segundos para terminar, así que un bloque `run` no debe contener bucles infinitos. Para mostrar un bucle infinito, se usa un bloque `python` sin `run`.
- Los ejemplos se ejecutan en un entorno aislado, así que no pueden conectarse a internet ni leer o modificar archivos reales. Sí pueden crear un archivo y leerlo dentro del mismo bloque.

## Comprobar las salidas

`npm run content:check` ejecuta cada bloque `run` y `practice` con el mismo Python que usa la web, [Pyodide](https://pyodide.org), y avisa si:

- La salida escrita en el bloque `output` no coincide con lo que imprime el código. El aviso indica la primera línea en la que difieren.
- El código falla y el bloque no tiene la opción `error`, o el bloque tiene la opción `error` y el código se ejecuta sin fallar.
- El código tiene más llamadas a `input()` que respuestas en `input="..."`, o hay respuestas que no se usan.
- El ejemplo no termina en 10 segundos, normalmente por un bucle infinito.

Para que el proyecto escriba las salidas automáticamente:

1. Se deja un bloque `output` vacío después del ejemplo:

   ````markdown
   ```output
   ```
   ````

2. Se ejecuta `npm run content:outputs`, que rellena las salidas vacías y corrige las que no coinciden sin tocar el resto del archivo.
3. Se revisa el cambio con `git diff` antes de hacer commit, para confirmar que la salida nueva es la que quieres enseñar.

Los ejemplos de las traducciones también se comprueban. Si el código imprime texto traducido, cada archivo de idioma necesita su propia salida.

## Traducciones

1. Se copia el archivo en español y se cambia `es` por el código del idioma, por ejemplo de `learning-unit3.es.md` a `learning-unit3.en.md`.
2. Se traducen `title`, `summary`, `description` y el contenido. En cambio, `order`, `color` y `aliases` se borran.
3. Se marca la traducción como revisada:

   ```
   npm run content:translations -- --stamp content/module1/learning-unit3.en.md
   ```

   Esto añade al encabezado un campo `source` con la huella del texto en español que se tradujo.

Si más adelante cambia el texto en español, `npm run dev` y `npm run build` avisan de las traducciones que han quedado desactualizadas. Esas traducciones se actualizan y se vuelven a marcar con `--stamp`. La huella solo cambia cuando cambia lo que se ve, así que reordenar campos o cambiar `**` por `__` no genera avisos.

| Opción de `content:translations` | Qué hace |
| --- | --- |
| *(ninguna)* | Cuenta, por idioma, cuántas traducciones están al día, desactualizadas o sin huella, y cuántos archivos faltan por traducir. |
| `--missing` | Lista además los archivos que faltan por traducir. |
| `--stamp <archivos>` | Marca esos archivos como revisados. |
| `--stamp-untracked` | Marca solo las traducciones que todavía no tienen huella. Nunca toca las desactualizadas. |
| `--strict` | Termina con error si hay traducciones desactualizadas o sin huella. |

- **Traducción parcial:** si un archivo traducido solo tiene encabezado, se traducen el título y el resumen. El contenido se sigue mostrando en otro idioma, y la huella solo se compara con el encabezado en español.
- **Sin traducción:** la web muestra la versión en inglés y, si tampoco existe, la versión en español.
- `--stamp` solo acepta archivos traducidos de esta carpeta, así que nunca marca los archivos en español.

## Mover o renombrar unidades

Como el número que lleva el nombre sigue la posición, al insertar, mover o quitar una unidad hay que renombrar las unidades afectadas y actualizar su `order`. Por ejemplo, para insertar una unidad nueva en la segunda posición de un módulo:

1. La unidad nueva se crea como `learning-unit2.es.md`, con `order: 2`.
2. La antigua `learning-unit2` pasa a ser `learning-unit3`, con `order: 3`, y así con las siguientes.
3. Sus traducciones (`.en.md` y `.de.md`) se renombran igual.

El nombre del archivo forma parte de la dirección web, así que al renombrarlo cambia también la dirección. Si ninguna otra unidad usa la dirección antigua, se puede añadir al archivo nuevo para que los enlaces guardados sigan funcionando. Por ejemplo, si `module6/learning-unit2.es.md` pasa a ser `module7/learning-unit1.es.md` y ninguna unidad ocupa la dirección antigua:

```yaml
aliases: [module6/learning-unit2]
```

Quien entre en la dirección antigua llegará a la nueva. Un alias no puede ser la dirección de una unidad que existe ni repetirse en dos unidades. Si otra unidad pasa a ocupar la dirección antigua, no se puede usar un alias, y los enlaces antiguos llevarán a la unidad que ahora está en esa posición.

## Qué no está permitido y por qué

| No se puede | Motivo y alternativa |
| --- | --- |
| HTML (`<div>`, `<br>`, `<script>`...) | La web escapa todo el texto para que el contenido no pueda inyectar código, así que las etiquetas HTML se muestran como texto o se marcan como error. En su lugar, se usan los elementos de esta guía. |
| Listas numeradas y casillas | La web no las muestra. En su lugar, se usan listas con `- ` o subtítulos numerados, como `### Ejercicio 1`. |
| Listas anidadas o con varios párrafos | Cada elemento es una línea de texto, así que la idea se divide en varias listas o párrafos. |
| Enlaces (`[texto](https://...)`) | La web no los muestra y se marcan como error. En su lugar, se puede escribir la dirección como código, por ejemplo `` `docs.python.org` ``. |
| Bloques de código en otros lenguajes | Solo se admiten `python` y `output`. |
| Campos de encabezado desconocidos | Se marcan como error para detectar errores de escritura, como `tittle`. |
| Contraseñas, claves o datos personales reales | Todo el contenido es público, así que se usan datos de ejemplo, como `"usuario@example.com"`. |

## Errores frecuentes

Los mensajes de error están en inglés e indican `archivo:línea:columna`.

| Mensaje | Solución |
| --- | --- |
| `The file must start with a header between two --- lines.` | La primera línea del archivo debe ser `---`. |
| `The header needs an "order" field...` | Se debe añadir `order:` con un número entero al archivo en español. |
| `"order: 3" is also used by ...` | Dos unidades del módulo tienen la misma posición, así que se debe cambiar el `order` de una de ellas. |
| `"order" only goes in the Spanish file.` | Se debe borrar `order`, `color` o `aliases` de la traducción. |
| `This unit is number 2 by its "order", so the file must be named learning-unit2.es.md.` | Hay que renombrar el archivo y sus traducciones, o corregir su `order`. Con los módulos, se renombra la carpeta o se corrige su `order`. |
| `The alias ... points to a unit that still exists.` | Otra unidad ocupa ahora esa dirección, así que hay que quitar el alias. |
| `":::note" cannot go inside another note or tip.` | Se debe sacar la nota o el consejo interior fuera del bloque. |
| `Python code must use spaces instead of tabs...` | Hay que cambiar los tabuladores por 4 espacios. |
| `"Probar >>" is the default text of the es files...` | Hay que traducir el texto, o borrarlo para que se use el texto por defecto del idioma del archivo. |
| `":word" followed by [ or { is read as a directive...` | Hay que escribir `\:` en lugar de `:`. |
| `The output does not match what the code prints...` | Hay que corregir la salida o ejecutar `npm run content:outputs`. |
| `input("...") needs a value...` | Hay que añadir `input="respuesta"` al bloque. |
| `The example failed with ...` | Hay que corregir el código, o añadir `error` si el fallo es intencionado. |
| `Unexpected file...` | Hay que revisar el nombre del archivo, o añadir `_` al principio para que se ignore. |
