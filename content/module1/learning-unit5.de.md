---
title: Mathematische Operationen und Textoperationen
summary: Verwendung der Operatoren `+`, `-`, `*`, `/`, Verkettung und Wiederholung von Zeichenketten.
---

In Python können wir sowohl mit Zahlen als auch mit Texten (Zeichenketten) arbeiten. Diese Lerneinheit zeigt dir, wie du die wichtigsten Operatoren für mathematische Berechnungen und die grundlegende Textmanipulation verwendest.

## Grundlegende Mathematische Operationen

Python unterstützt die gängigsten numerischen Operatoren:

| Operator | Bedeutung | Beispiel | Ergebnis |
| --- | --- | --- | --- |
| `+` | Addition | `3 + 5` | `8` |
| `-` | Subtraktion | `10 - 4` | `6` |
| `*` | Multiplikation | `6 * 2` | `12` |
| `/` | Division | `9 / 2` | `4.5` |
| `//` | Ganzzahlige Division | `9 // 2` | `4` |
| `%` | Modulo (Rest) | `9 % 2` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` |

Beispiele für Code:

```python run
a = 10
b = 3

print(a + b)   # 13
print(a - b)    # 7
print(a * b)    # 30
print(a / b)    # 3.333...
print(a // b)    # 3 -> Ganzzahlige Division
print(a % b)    # 1 -> Rest
print(a ** b)    # 1000 -> 10^3
```

```output
13
7
30
3.3333333333333335
3
1
1000
```

:::note
Die Division `/` liefert immer einen `float` (Gleitkommazahl). Wenn du eine Division ohne Nachkommastellen möchtest, verwende `//`.
:::

## Operationen mit Texten (Strings)

Python ermöglicht die Manipulation von Zeichenketten mithilfe spezieller Operatoren wie:

### Konkatenation (Text Verbinden) → Operator `+`

```python
fach1 = "Programmierung"
fach2 = "Mathematik"

text = fach1 + " " + fach2
print(text)    # Programmierung Mathematik
```

```python run hidden
fach1 = "Programmierung"
fach2 = "Mathematik"

text = fach1 + " " + fach2
print(text)
```

### Textwiederholung → Operator `*`

```python run
print("Hallo " * 3)
```

```output
Hallo Hallo Hallo 
```

Das ist nützlich, um Trennzeichen oder Muster zu erzeugen.

### Kombination Von Text und Zahlen

Man kann Text und Zahlen nicht direkt addieren.

Das wird einen Fehler verursachen:

```python
print("Alter: " + 25)    # ERROR
```

```python run="Fehler Ausprobieren >>" hidden error
print("Alter: " + 25)
```

Lösung: Die Zahl in einen String umwandeln:

```python run
print("Alter: " + str(25))
```

## Wichtige Regeln

- Numerische Operationen funktionieren nur mit Zahlen.
- Textoperationen funktionieren nur mit Text.
- Wenn du Zahlen und Text mischst → musst du einen in den Typ des anderen umwandeln.

Beispiel:

```python
zahl = 5
text = "5"

print(zahl + int(text))   # 10
print(str(zahl) + text)   # 55
```

```python run hidden
zahl = 5
text = "5"

print(zahl + int(text))
print(str(zahl) + text)
```

## Kombiniertes Beispiel

Eine Nachricht mit Operationen erstellen:

```python run
preis = 120
steuer = preis * 0.19
summe = preis + steuer

nachricht = "Die Summe ist: " + str(summe)
print(nachricht)
```

```output
Die Summe ist: 142.8
```

## Gute Programmierpraktiken

Füge beim Verkettung von Texten Leerzeichen ein (falls nötig):

```python
"Hallo" + "Welt"    # HalloWelt
"Hallo " + "Welt"    # Hallo Welt
```

Wandle die Typen um, wenn du Zahlen und Zeichenketten mischst:

```python
str(), int(), float()
```

Verwende Wiederholungen für Trennzeichen:

```python run
print("-" * 40)
```

```output
----------------------------------------
```

## Praktische Übungen

### Übung 1: Grundrechner

Erstelle drei Variablen: `a`, `b`, `c`.

Weise numerische Werte zu und zeige sie an:

- Die Summe der drei.
- Der Durchschnitt
- Das Ergebnis von `a * c`.

```python practice
# Erstelle drei Variablen: a, b, c.
# Weise numerische Werte zu und zeige sie an:
# - Die Summe der drei
# - Der Durchschnitt
# - Das Ergebnis von a * c
```

:::details
```python run
a = 10
b = 20
c = 5

summe = a + b + c
durchschnitt = summe / 3
produkt = a * c

print("Summe:", summe)
print("Durchschnitt:", durchschnitt)
print("Produkt:", produkt)
```
:::

### Übung 2: Textverkettung

Füge die folgenden Teile zu einem einzigen Satz zusammen (zeige ihn auf dem Bildschirm an):

```python
teil1 = "Python "
teil2 = "ist "
teil3 = "Genial"
```

```python practice
# Füge die folgenden Teile zu einem einzigen
# Satz zusammen (zeige ihn auf dem Bildschirm an):
# teil1 = "Python "
# teil2 = "ist "
# teil3 = "Genial "
```

:::details
```python run
teil1 = "Python "
teil2 = "ist "
teil3 = "Genial"

satz = teil1 + teil2 + teil3
print(satz)
```
:::

### Übung 3: Wiederholung Von Zeichenketten

Erstelle eine Variable, die ein Symbol enthält (z.B. „\*“) und wiederhole es 20 Mal (zeige es auf dem Bildschirm an).

```python practice
# Erstelle eine Variable, die ein Symbol enthält
# (z.B. "*") und wiederhole es 20 Mal
# (zeige es auf dem Bildschirm an)
```

:::details
```python run
symbol = "*"
print(symbol * 20)
```
:::

### Übung 4: Vor dem Addieren konvertieren

Du hast eine Zahl als Text gespeichert:

```python
zahl = "40"
```

Wandle die Zahl in eine Ganzzahl um und addiere 7. Zeige zuletzt das Ergebnis auf dem Bildschirm an.

```python practice
# Du hast eine Zahl als Text gespeichert:
# zahl = "40" Wandle die Zahl in eine
# Ganzzahl um und addiere 7.
# Zeige zuletzt das Ergebnis auf dem Bildschirm an
```

:::details
```python run
zahl = "40"
zahl = int(zahl)
print(zahl + 7)
```
:::

### Übung 5: Kombinierte Abschlussnachricht

Mit den folgenden Variablen:

```python
name = "Linus"
alter = 55
```

Erstelle eine Nachricht wie:

```python
Linus ist 55 Jahre alt
```

Zeige zuletzt die Nachricht auf dem Bildschirm an.

```python practice
# Mit den folgenden Variablen:
# name = "Linus"
# alter = 55
# Erstelle eine Nachricht wie:
# Linus ist 55 Jahre alt
# Zeige zuletzt die Nachricht auf dem Bildschirm an
```

:::details
```python run
name = "Linus"
alter = 55

nachricht = name + " ist " + str(alter) + " Jahre alt"
print(nachricht)
```
:::

## Fazit der Einheit

In dieser Einheit hast du Folgendes gelernt:

- Dass Python grundlegende mathematische Operationen mit `+`, `-`, `*`, `/`, `%`, `//` und `**` durchführen kann.
- Dass Textketten mit `+` zusammengefügt und mit `*` wiederholt werden können.
- Dass Operationen mit Textketten eigene Regeln haben (z.B. Texte addieren = konkatenieren).
- Dass es wichtig ist, den Datentyp zu verstehen, um Fehler zu vermeiden und klareren Code zu schreiben.
