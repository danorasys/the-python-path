---
title: "Bedingungen: `if`, `elif`, `else`"
summary: In dieser Einheit lernst du, wie dein Programm Entscheidungen treffen kann, indem du `if`, `elif` und `else` verwendest, sodass der Code verschiedene Aktionen ausführt, abhängig davon, welche Bedingungen erfüllt sind. Du wirst sehen, wie der Ablauf funktioniert, wenn eine Bedingung wahr ist, was passiert, wenn keine zutrifft, und wie man mehrere Optionen hintereinander verknüpft.
source: 07ec9aa6a217
---

Bedingungen sind eines der wichtigsten Werkzeuge in jeder Programmiersprache, da sie es einem Programm ermöglichen, Entscheidungen zu treffen. Dank ihnen kann dein Code je nach Situation das eine oder andere ausführen. In Python steuern die Schlüsselwörter `if`, `elif` und `else` dieses Verhalten.

## Was ist eine Bedingung?

Eine Bedingung wertet einen Ausdruck aus, der wahr oder falsch sein kann. Wenn er wahr ist, wird ein Codeblock ausgeführt; wenn er falsch ist, werden andere Optionen geprüft oder ein alternativer Block ausgeführt.

Python verwendet Einrückungen (Tabs oder Leerzeichen), um festzulegen, welche Anweisungen zum Bedingungsblock gehören.

## Grundstruktur

### 1\. `if` (wenn…)

Es wird nur ausgeführt, wenn die Bedingung wahr ist.

```python run
alter = 18
if alter >= 18:
    print("Du bist volljährig")
```

```output
Du bist volljährig
```

### 2\. `elif` (ansonsten… aber wenn…)

Es wird verwendet, um zusätzliche Bedingungen zu prüfen, wenn die `if`-Bedingung nicht erfüllt ist.

```python run
note = 75
if note >= 90:
    print("Ausgezeichnet")
elif note >= 70:
    print("Bestanden")
```

```output
Bestanden
```

### 3\. `else` (wenn nichts anderes zutrifft...)

Es wird nur ausgeführt, wenn alle vorherigen Bedingungen falsch waren.

```python run
temperatur = 10
if temperatur > 25:
    print("Es ist heiß")
else:
    print("Es ist kalt")
```

```output
Es ist kalt
```

:::note
`else` hat keine Bedingung, da es als letzte Option ausgeführt wird, wenn keine der vorherigen Bedingungen zutrifft.
:::

## Verkettung von Bedingungen

Du kannst `if`, mehrere `elif`-Anweisungen und ein `else` kombinieren, um mehrere Pfade zu erstellen:

```python run
x = 0
if x > 0:
    print("Positiv")
elif x < 0:
    print("Negativ")
else:
    print("Null")
```

```output
Null
```

Diese Art von Struktur hilft dabei, reale Prozesse zu modellieren: Noten bewerten, Altersgruppen einteilen, Optionen auswählen usw.

:::tip
Wenn du viele Bedingungen hast, ordne sie von der spezifischsten bis zur allgemeinsten, um zu verhindern, dass eine breite Bedingung genauere Bedingungen blockiert.
:::

## Nützlichste Bedingungen

Du kannst Vergleichsoperatoren verwenden (dazu gehen wir in der nächsten Lerneinheit näher ein):

- `==` (gleich).
- `!=` (ungleich).
- `<` (kleiner als), `>` (größer als), `<=` (kleiner oder gleich), `>=` (größer oder gleich).

Du kannst auch logische Operatoren verwenden (dazu gehen wir in der nächsten Lerneinheit näher ein):

- `and` (und).
- `or` (oder).
- `not` (nicht).

Beispiel:

```python run
alter = 20
hat_ausweis = True

if alter >= 18 and hat_ausweis:
    print("Du darfst eintreten")
```

```output
Du darfst eintreten
```

:::note
Bedingungen können so einfach oder so komplex sein, wie du sie brauchst. Es ist jedoch gute Praxis, sie klar und lesbar zu halten.
:::

## Praktische Beispiele

### Beispiel 1: Prüfen, Ob Eine Zahl Gerade Oder Ungerade Ist

```python run
zahl = 8

if zahl % 2 == 0:
    print("Gerade")
else:
    print("Ungerade")
```

```output
Gerade
```

### Beispiel 2: Alter Klassifizieren

```python run
alter = 15

if alter < 13:
    print("Kind")
elif alter < 18:
    print("Teenager")
else:
    print("Erwachsener")
```

```output
Teenager
```

### Beispiel 3: Prüfen, Ob Ein Passwort Korrekt Ist

```python run
passwort = "python123%"

if passwort == "python123%":
    print("Zugriff erlaubt")
else:
    print("Zugriff verweigert")
```

```output
Zugriff erlaubt
```

## Übungen Zum Üben

### Übung 1: Volljährig Oder Minderjährig

Erstelle eine Variable mit einem Alter (z.B.: `alter = 17`).

Wenn das Alter 18 oder älter ist, zeige „Volljährig“.

Andernfalls zeige „Minderjährig“.

```python practice
# Erstelle eine Variable mit einem Alter
# (z.B.: alter = 17).
# Wenn das Alter 18 oder älter ist, zeige "Volljährig".
# Andernfalls zeige "Minderjährig"
```

:::details
```python run
alter = 17

if alter >= 18:
    print("Volljährig")
else:
    print("Minderjährig")
```
:::

### Übung 2: Zahlenklassifizierung

Erstelle eine Variable namens `n` und weise ihr einen Zahlenwert zu.

Zeige an, ob die Zahl positiv, negativ oder null ist.

```python practice
# Erstelle eine Variable namens n und weise ihr
# einen Zahlenwert zu.
# Zeige an, ob die Zahl positiv, negativ oder null ist
```

:::details
```python run
n = -5

if n > 0:
    print("Positiv")
elif n < 0:
    print("Negativ")
else:
    print("Null")
```
:::

### Übung 3: Zugriff Überprüfen

Erstelle zwei Variablen:

- `alter`.
- `hat_eintritt` (`True` oder `False`).

Wenn die Person ein Ticket hat und 16 Jahre oder älter ist, zeige „Willkommen“. Andernfalls zeige „Du kannst nicht eintreten“.

```python practice
# Erstelle zwei Variablen:
# alter
# hat_eintritt (True oder False)
# Wenn die Person ein Ticket hat und 16 Jahre oder
# älter ist, zeige "Willkommn".
# Andernfalls zeige "Du kannst nicht eintreten"
```

:::details
```python run
alter = 16
hat_eintritt = True

if alter >= 16 and hat_eintritt:
    print("Willkommen")
else:
    print("Du kannst nicht eintreten")
```
:::

## Fazit der Einheit

In dieser Einheit hast du gelernt, dass:

- Bedingungen es einem Programm ermöglichen, Entscheidungen zu treffen.
- `if`, `elif` und `else` verschiedene Ausführungspfade steuern.
- Bedingungen funktionieren, indem Ausdrücke ausgewertet werden, die wahr oder falsch sein können.
- Du logische und Vergleichsoperatoren verwenden kannst, um vollständigere Bedingungen zu erstellen.
- Es möglich ist, mehrere Fälle zu verketten, um realistischere und vielfältigere Probleme zu lösen.

Wenn du Bedingungen meisterst, hören deine Programme auf, linear zu sein, und beginnen, auf verschiedene Situationen zu reagieren.
