---
title: "Dein Erstes Programm: `print()`"
summary: Wie man Text auf dem Bildschirm anzeigt und die minimale Struktur eines Programms versteht.
source: 55773158d2fa
---

## Was Ist Ein Programm in Python?

Ein Programm in Python ist einfach eine Textdatei, die Anweisungen enthält, die der Interpreter Zeile für Zeile ausführt. Die minimale Struktur eines Programms kann so einfach sein wie eine einzelne Zeile, die eine Nachricht auf dem Bildschirm anzeigt.

:::note
In Python wird jede Zeile der Reihe nach von oben nach unten ausgeführt. Du brauchst keine obligatorische Hauptfunktion wie in anderen Sprachen.
:::

## Die Funktion `print()`: Dein Erstes Werkzeug

Die Funktion `print()` wird verwendet, um Informationen auf dem Bildschirm anzuzeigen. Sie ist der klassische Ausgangspunkt in jeder Programmiersprache.

Einfaches Beispiel:

```python
print("Hallo, Welt")
```

Beim Ausführen dieses Programms zeigt Python Folgendes an:

```python
Hallo, Welt
```

```python run hidden
print("Hallo, Welt")
```

:::tip
Alles, was du anzeigen möchtest, muss in den Klammern von `print()` stehen. Wenn es Text ist, muss er in Anführungszeichen gesetzt werden.
:::

## Was Kann Ich Mit `print()` Anzeigen?

### Text (Zeichenketten - `str`)

```python
print("Python lernen macht Spaß")
```

### Zahlen

```python
print(2025)
```

### Variablen

```python
name = "Python"
print(name)
```

```python run="Alles Ausprobieren >>" hidden
print("Python lernen macht Spaß")

print(2025)

name = "Python"
print(name)
```

```output label="Erwartete Ausgabe:"
Python lernen macht Spaß
2025
Python
```

:::note
Im Gegensatz zu vielen Sprachen muss man in Python den Variablentyp nicht deklarieren; es reicht, sie zuzuweisen.
:::

## Mehrere Werte Gleichzeitig Anzeigen

Python erlaubt es, mehrere Elemente durch Kommas getrennt auszugeben:

```python run
print("Dein Alter ist:", 22)
```

```output
Dein Alter ist: 22
```

:::note
Wenn du Kommas innerhalb von `print()` verwendest, fügt Python automatisch ein Leerzeichen zwischen jedem Element ein.
:::

## Wie `print()` Intern Funktioniert

Obwohl `print()` einfach erscheint, hat es mehrere nützliche Parameter:

```python
print(objekte, sep=" ", end="\n")
```

- `sep` → Definiert den Trenner zwischen Elementen.
- `end` → Definiert, was am Ende der Zeile ausgegeben wird.

### Beispiel Mit `sep`:

```python run
print("Python", "JavaScript", "Go", sep=" | ")
```

```output
Python | JavaScript | Go
```

### Beispiel Mit `end`:

```python run
print("Hallo", end="...")
print("Welt")
```

```output
Hallo...Welt
```

:::note
Standardmäßig verwendet `end` `\n`, also einen Zeilenumbruch. Deshalb erscheint jede `print()` in einer neuen Zeile.
:::

## Leerzeichen, Zeilenumbrüche und Sonderzeichen

Du kannst das Textformat mit speziellen Sequenzen steuern:

- `\n` → Zeilenumbruch.
- `\t` → Tabulator.
- `\"` → Anführungszeichen innerhalb von Anführungszeichen.
- `\\` → Literaler Backslash.

Beispiel:

```python run
print("Zeile 1\nZeile 2\nZeile 3")
```

```output
Zeile 1
Zeile 2
Zeile 3
```

:::note
Escape-Sequenzen ermöglichen es dir, genau zu steuern, wie der ausgegebene Text aussieht. Sie sind sehr nützlich, um Menüs oder formatiere Ergebnisse anzuzeigen.
:::

## Ein Sehr Häufiger Fehler Bei Der Verwendung Von `print()`

Wenn du vergisst, die Anführungszeichen zu schließen:

```python
print("Hallo)
```

Python zeigt einen Syntaxfehler an.

```python run="Fehler Ausprobieren >>" hidden error
print("Hallo)
```

## Minimale Struktur Eines Python-Programms

```python
print("Hallo von meinem ersten Python-Programm")
```

Dies ist bereits ein vollständiges, gültiges und funktionierendes Programm.

```output
Hallo von meinem ersten Python-Programm
```

```python run hidden
print("Hallo von meinem ersten Python-Programm")
```

:::tip
Betrachte ein Programm als eine Liste von Anweisungen. Wenn du zwei Zeilen hast:
:::

```python
print("Erste Zeile")
print("Zweite Zeile")
```

Python führt sie immer in dieser Reihenfolge aus.

```output
Erste Zeile
Zweite Zeile
```

```python run hidden
print("Erste Zeile")
print("Zweite Zeile")
```

## Geführte Übung: Dein Erstes Echtes Script

Wir werden eine persönlichere Nachricht anzeigen.

```python
name = "DEIN NAME"
print("Willkommen,", name, "in der Welt von Python!")
```

```output
Willkommen, DEIN NAME in der Welt von Python!
```

:::note
Du kannst `"DEIN NAME"` durch deinen eigenen Namen ersetzen.
:::

```python run hidden
name = "DEIN NAME"
print("Willkommen,", name, "in der Welt von Python!")
```

## Fazit der Einheit

In diesem Thema hast du gelernt:

- Was ein Programm in Python ist.
- Wie die Funktion `print()` funktioniert.
- Wie man `sep` und `end` verwendet.
- Wie man Zeilenumbrüche und Tabulatoren steuert.
- Wie man ein gültiges Minimalprogramm schreibt.

`print()` ist das Werkzeug, das du ständig verwenden wirst, um Ergebnisse anzuzeigen, Ideen zu debuggen und mit dem Benutzer zu kommunizieren.
