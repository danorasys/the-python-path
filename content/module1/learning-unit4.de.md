---
title: Variablen und Grundlegende Datentypen
summary: "Was Variablen sind, wie sie erstellt werden und die gebräuchlichsten Typen: `int`, `float`, `str`, `bool`."
---

## Was Ist eine Variable?

Eine Variable ist ein Name, der verwendet wird, um einen Wert im Speicher zu speichern. Du kannst dir eine Variable wie eine beschriftete Box vorstellen, in der du entscheidest, was hineinkommt.

Zum Beispiel:

```python
name = "Python"
alter = 33
```

Hier:

- Das "Label" ist `name` oder `alter`.
- Der Inhalt ist `"Python"` und `33`.

:::note[Hinweis:]
Das Zeichen `=` bedeutet in Python nicht "mathematisch gleich", sondern "einen Wert zuweisen". Das heißt: "Speichere diesen Wert in dieser Variable".
:::

## Python und Dynamische Typisierung

Python bestimmt den Typ einer Variable automatisch anhand des zugewiesenen Werts.

```python
x = 10       # int (Ganzzahl)
x = "Hallo"   # str (Zeichenkette)
```

:::tip[Tipp:]
Du kannst den Typ jederzeit ändern, aber vermeide es. Ein konsistenter Typ macht deinen Code verständlicher.
:::

## Regeln Zum Benennen Von Variablen

Python erlaubt viele gültige Namen, aber du musst diese Regeln befolgen:

- Nur Buchstaben, Zahlen und Unterstriche sind erlaubt.
- Der Name darf nicht mit einer Zahl beginnen.
- Keine Leerzeichen verwenden.
- Vermeide reservierte Wörter (`for`, `if`, `print`, usw.).

Gültige Beispiele:

```python
benutzer_name = "Ana"
alter2 = 30
_total = 99
```

Ungültige Beispiele:

```python
2alter = 10
meine variable = "text"
for = 5
```

:::note[Hinweis:]
Verwende beschreibende Namen. Dein Code wird leichter lesbar sein, ohne viele Kommentare.
:::

## Grundlegende Datentypen in Python

Schauen wir uns die häufigsten Datentypen an:

### 1\. Ganzzahlen – `int`

Zahlen ohne Dezimalstellen.

```python
alter = 20
jahr = 2025
```

### 2\. Fließkommazahlen – `float`

Zahlen mit Dezimalstellen.

```python
preis = 19.99
temperatur = 36.5
```

:::tip[Tipp:]
Floats können aufgrund ihrer internen Darstellung manchmal überraschende Ergebnisse liefern:
:::

```python
print(0.1 + 0.2)
# 0.30000000000000004
```

Aber keine Sorge, später erfährst du mehr darüber.

### 3\. Zeichenketten – `str`

Beliebiger Text in einfachen oder doppelten Anführungszeichen.

```python
name = "Python"
nachricht = 'Hallo Welt'
```

Für längere Texte kannst du dreifache Anführungszeichen verwenden:

```python
langer_text = """Dies ist ein Text,
der mehrere Zeilen umfasst"""
```

### 4\. Booleans – `bool`

Sie repräsentieren wahr oder falsch:

```python
aktiv = True
angemeldet = False
```

Sie werden sehr häufig in Bedingungen verwendet.

:::note[Hinweis:]
In Python beginnen `True` und `False` mit einem Großbuchstaben.
:::

## Den Typ Einer Variable Anzeigen

Mit der Funktion `type()` kannst du den Datentyp herausfinden:

```python
x = 10
print(type(x))   # <class 'int'>
```

```python run hidden
x = 10
print(type(x))
```

Das ist sehr nützlich, wenn du lernst.

## Operationen Je Nach Datentyp

Jeder Typ hat eigene Operationen:

### Ganzzahlen und Floats

```python
a = 10
b = 2.5
ergebnis = a + b   # 12.5
```

### Zeichenketten

Verkettung:

```python run
gruss = "Hallo" + " " + "Welt"
print(gruss)
```

```output
Hallo Welt
```

Wiederholung:

```python
print("Hallo" * 3)
# HalloHalloHallo
```

```python run hidden
print("Hallo" * 3)
```

### Booleans

```python run
wahr = True
falsch = False
print(wahr and falsch)  # False
```

## Typumwandlung (Casting)

Python erlaubt es, Werte manuell umzuwandeln:

```python
alter = "20"
alter = int(alter)
print(type(alter))    # <class 'int'>
```

```python run hidden
alter = "20"
alter = int(alter)
print(type(alter))
```

Oder von Zahl zu Text:

```python
x = 10
text = str(x)
print(type(text))    # <class 'str'>
```

```python run hidden
x = 10
text = str(x)
print(type(text))
```

:::tip[Tipp:]
`input()` gibt immer einen String zurück, deshalb musst du ihn manchmal in `int` oder `float` umwandeln.
:::

## Komplette Beispiele

### Beispiel 1: Benutzerinformationen

```python run
name = "Python"
alter = 33
groesse = 1.74
ist_volljaehrig = True

print("Name:", name)
print("Alter:", alter)
print("Größe:", groesse)
print("Volljährig:", ist_volljaehrig)
```

```output
Name: Python
Alter: 33
Größe: 1.74
Volljährig: True
```

### Beispiel 2: Typumwandlung

```python run
zahl = "15"
zahl = int(zahl)
print("Summe:", zahl + 5)
```

```output
Summe: 20
```

## Häufige Fehler

:cross Fehler beim Umwandeln von nicht-numerischem Text:

```python
int("hallo")
# ValueError
```

```python run="Fehler Ausprobieren >>" hidden error
int("hallo")
```

:cross Inkompatible Typen mischen:

```python
print("Alter: " + 20)
# TypeError
```

```python run="Fehler Ausprobieren >>" hidden error
print("Alter: " + 20)
```

Lösung:

```python run
print("Alter:", 20)
# oder
print("Alter: " + str(20))
```

```output
Alter: 20
Alter: 20
```

:::note[Hinweis:]
Diese Fehler passieren sehr häufig am Anfang. Mit der Zeit wirst du sie vermeiden können.
:::

## Praktische Übungen

### Übung 1: Grundlegende Variablen Erstellen

Erstelle Variablen für:

- Deinen Namen.
- Dein Alter.
- Deine Stadt.
- Ob du volljährig bist (True/False).
- Deine Größe (float).

Gib sie anschließend mit `print()` aus.

```python run="Üben >>" hidden
# Übung 1: Grundlegende Variablen erstellen
# Erstelle Variablen für:
# - Deinen Namen
# - Dein Alter
# - Deine Stadt
# - Ob du volljährig bist (True/False)
# - Deine Größe (float)
# Gib sie anschließend mit print() aus
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
name = "DEIN NAME"
alter = 22
stadt = "DEINE STADT"
ist_volljaehrig = True
groesse = 1.85

print(name, alter, stadt, ist_volljaehrig, groesse)
```
:::

### Übung 2: Summe Mit Umwandlung

Eine Variable enthält eine Zahl als Text (`"25"`). Wandle diesen Wert in eine Ganzzahl um und addiere 10. Gib dann das Ergebnis aus.

```python run="Üben >>" hidden
# Eine Variable enthält eine Zahl als Text ("25").
# Wandle diesen Wert in eine Ganzzahl um und
# addiere 10. Gib dann das Ergebnis aus.
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
zahl = "25"      # Die Zahl kommt als Text
zahl = int(zahl)   # Umwandlung in int
print(zahl + 10)
```
:::

### Übung 3: Gemischte Typen

Erstelle drei Variablen:

```python
a = 10
b = 3.5
c = "Python"
```

Gib aus:

- Die Summe von `a` und `b`.
- Die Verkettung "Ich mag " + `c`.
- Den Typ jeder Variable mit `type()`.

```python run="Üben >>" hidden
# a = 10
# b = 3.5
# c = "Python"
# Gib aus:
# 1. Die Summe von a und b
# 2. Die Verkettung "Ich mag " + c
# 3. Den Typ jeder Variable mit type()
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
a = 10
b = 3.5
c = "Python"

print(a + b)
print("Ich mag " + c)
print(type(a), type(b), type(c))
```
:::

### Übung 4: Eine Nachricht Erstellen

Erstelle Variablen:

```python
name = "Camilo"
alter = 30
```

Und gib eine Nachricht aus wie:

```python
Hallo Camilo, du bist 30 Jahre alt.
```

Verwende Verkettung oder Kommata.

```python run="Üben >>" hidden
# Erstelle Variablen:
# name = "Camilo"
# alter = 30
# Gib eine Nachricht aus wie:
# Hallo Camilo, du bist 30 Jahre alt.
# Verwende Verkettung oder Kommata
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
name = "Camilo"
alter = 30

print("Hallo " + name + ", du bist " + str(alter) + " Jahre alt.")
# oder mit Kommata
print("Hallo", name + ", du bist", alter, "Jahre alt.")
```
:::

## Fazit der Einheit

In diesem Thema hast du gelernt:

- Was eine Variable ist.
- Wie man sie erstellt und zuweist.
- Die grundlegenden Datentypen: `int`, `float`, `str`, `bool`.
- Wie man Typen umwandelt.
- Häufige Fehler im Umgang mit Werten.
- Gute Praktiken für Variablennamen.

Diese Grundlagen werden für alles, was du später programmierst, entscheidend sein.
