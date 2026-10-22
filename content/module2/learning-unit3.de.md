---
title: "`while` und `for` Schleifen"
summary: In dieser Einheit lernst du, wie man Anweisungen mit `while` und `for` wiederholt, wodurch Aufgaben ohne wiederholtes Schreiben des gleichen Codes ausgeführt werden können. Außerdem lernst du, wie man über eine Zeichenkette (`str`) iteriert.
---

En der Programmierung erfordern viele Aufgaben das Wiederholen von Aktionen: Nachrichten mehrmals anzeigen, Zahlen zählen oder Text Zeichen für Zeichen verarbeiten. Schleifen ermöglichen es, denselben Codeblock mehrfach auszuführen, ohne ihn wiederholt schreiben zu müssen. In Python sind die beiden wichtigsten Schleifen `while` und `for`.

## Was ist eine Schleife?

Eine Schleife ist eine Kontrollstruktur, die eine Reihe von Anweisungen wiederholt, solange eine Bedingung erfüllt ist oder solange es Elemente gibt, die durchlaufen werden können.

:::note[Hinweis:]
Ohne Schleifen wären Programme lang, repetitiv und schwer zu warten.
:::

## `while`-Schleife

### Wie Funktioniert Sie?

Die `while`-Schleife wiederholt den Code, solange eine Bedingung wahr ist. Vor jeder Wiederholung überprüft Python die Bedingung.

```python run
zaehler = 1
while zaehler <= 5:
	print(zaehler)
	zaehler = zaehler + 1
```

```output
1
2
3
4
5
```

:::tip[Tipp:]
Die `while`-Schleife ist ideal, wenn du nicht weißt, wie oft sich die Schleife wiederholen wird, aber weißt, wann sie enden soll.
:::

:::note[Hinweis:]
Wenn die Bedingung niemals falsch wird, gerät das Programm in eine Endlosschleife.
:::

### Steuerung der `while`-Schleife

Normalerweise wird eine Kontrollvariable verwendet, die sich bei jeder Wiederholung ändert.

```python run
x = 0
while x < 3:
	print("Hallo")
	x += 1
```

```output
Hallo
Hallo
Hallo
```

## `for`-Schleife

### Wie Funktioniert Sie?

Die `for`-Schleife wird verwendet, um eine Sequenz zu durchlaufen. In dieser Einheit wird die Hauptsequenz ein String (`str`) sein, da eine Zeichenkette eine Sammlung geordneter Zeichen ist.

```python run
for buchstabe in "Python":
	print(buchstabe)
```

```output
P
y
t
h
o
n
```

Das bedeutet, dass die Schleife ein Zeichen nach dem anderen nimmt und es der Variablen `buchstabe` zuweist.

:::note[Hinweis:]
Auch wenn Listen noch nicht behandelt wurden, ermöglichen Strings bereits, das Konzept des „Durchlaufens einer Sequenz“ zu verstehen.
:::

### Was Bedeutet „Eine Sequenz Durchlaufen“?

Eine Sequenz durchlaufen bedeutet, auf jedes Element einzeln und der Reihe nach zuzugreifen. Im Fall von Strings:

- Jedes Zeichen ist ein Element.
- Sie werden von links nach rechts durchlaufen.

:::tip[Tipp:]
Die `for`-Schleife ist ideal, wenn du bereits weißt, was du durchlaufen wirst, wie z.B. einen Text oder einen Zahlenbereich.
:::

### Verwendung von `range()` mit `for`

`range()` ermöglicht es, eine Sequenz von Zahlen zu erzeugen.

```python run
for i in range(5):
	print(i)
```

```output
0
1
2
3
4
```

:::note[Hinweis:]
`range(5)` erzeugt die Zahlen von `0` bis `4`.
:::

## Praktische Beispiele

### Beispiel 1: Von 1 bis 5 mit `while` Zählen

```python run
n = 1
while n <= 5:
	print(n)
	n += 1
```

```output
1
2
3
4
5
```

### Beispiel 2: Jeden Buchstaben Eines Wortes Anzeigen

```python run
for c in "Hallo":
	print(c)
```

```output
H
a
l
l
o
```

### Beispiel 3: Eine Nachricht Mehrmals Wiederholen

```python run
for i in range(3):
	print("Python Lernen")
```

```output
Python Lernen
Python Lernen
Python Lernen
```

## Übungen Zum Üben

### Übung 1: Zähler mit while

Erstelle eine Variable namens `zaehler`, die bei 1 beginnt.\
Verwende eine `while`-Schleife, um die Zahlen von 1 bis 10 einzeln anzuzeigen.

```python run="Üben >>" hidden
# Erstelle eine Variable namens zaehler, die bei 1
# beginnt.
# Verwende eine while-Schleife, um die Zahlen von 1 bis
# 10 einzeln anzuzeigen
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
zaehler = 1
while zaehler <= 10:
	print(zaehler)
	zaehler += 1
```
:::

### Übung 2: Countdown

Erstelle eine Variable namens `n` mit dem Wert 5.\
Verwende eine `while`-Schleife, um einen Countdown bis 1 anzuzeigen.

```python run="Üben >>" hidden
# Erstelle eine Variable namens n mit dem Wert 5.
# Verwende eine while-Schleife, um einen Countdown bis
# 1 anzuzeigen
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
n = 5
while n >= 1:
	print(n)
	n -= 1
```
:::

### Übung 3: Einen Text Durchlaufen

Erstelle eine Variable namens `wort` mit einem beliebigen Text.\
Verwende eine `for`-Schleife, um jedes Zeichen des Wortes in einer eigenen Zeile anzuzeigen.

```python run="Üben >>" hidden
# Erstelle eine Variable namens wort mit einem
# beliebigen Text.
# Verwende eine for-Schleife, um jedes Zeichen des
# Wortes in einer eigenen Zeile anzuzeigen
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
wort = "Python"
for buchstabe in wort:
	print(buchstabe)
```
:::

### Übung 4: Buchstaben Zählen

Verwende eine `for`-Schleife, um zu zählen, wie viele Buchstaben das Wort `"programmierung"` hat. Benutze eine Zählvariable.

```python run="Üben >>" hidden
# Verwende eine for-Schleife, um zu zählen, wie viele
# Buchstaben das Wort "programmierung" hat. Benutze
# eine Zählvariable
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
zaehler = 0
for buchstabe in "programmierung":
	zaehler += 1

print(zaehler)
```
:::

### Übung 5: Gerade Zahlen

Verwende eine `for`-Schleife und `range()`, um die geraden Zahlen von 0 bis 10 anzuzeigen.

```python run="Üben >>" hidden
# Verwende eine for-Schleife und range(), um die
# geraden Zahlen von 0 bis 10 anzuzeigen
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>"
for i in range(0, 11, 2):
	print(i)
```
:::

## Fazit der Einheit

In dieser Einheit hast du gelernt, dass:

- Schleifen es ermöglichen, Anweisungen zu wiederholen, ohne Code zu duplizieren.
- Die `while`-Schleife Aktionen wiederholt, solange eine Bedingung wahr ist.
- Die `for`-Schleife verwendet wird, um Sequenzen wie Zeichenketten zu durchlaufen.
- Ein String eine Sequenz von Zeichen ist, die man Zeichen für Zeichen durchlaufen kann.
- `range()` die kontrollierte Wiederholung mit Zahlen erleichtert.
- Die Wahl der richtigen Schleife den Code klarer und effizienter macht.
