---
title: Ablaufsteuerung in Schleifen
summary: "Hier erfährst du, wie du die interne Ausführung einer Schleife mithilfe spezieller Anweisungen ändern kannst: `break` um sie vorzeitig zu stoppen, `continue`, um eine bestimmte Wiederholung zu überspringen, und `pass`, um einen leeren Block zu lassen, den du später ausfüllen kannst. Diese Werkzeuge ermöglichen dir eine präzisere und flexiblere Kontrolle über das Verhalten deiner Schleifen."
---

In der vorherigen Einheit hast du gelernt, wie man `while` und `for` verwendet, um Anweisungen zu wiederholen. Jetzt wirst du lernen, wie man das interne Verhalten einer Schleife während ihrer Ausführung verändert.

Python bietet drei spezielle Anweisungen:

- `break`
- `continue`
- `pass`

Diese ermöglichen eine genauere Kontrolle darüber, wie und wann Wiederholungen ausgeführt werden.

## `break` — Die Schleife Beenden

Die Anweisung `break` wird verwendet, um eine Schleife sofort zu beenden, unabhängig davon, ob die Bedingung noch wahr ist.

Wenn Python auf ein `break` trifft, verlässt es die Schleife und fährt mit dem Code fort, der nach der Schleife steht.

### Beispiel mit `while`

```python
zaehler = 1

while zaehler <= 10:
    if zaehler == 5:
        break
    print(zaehler)
    zaehler += 1
```

```output
1
2
3
4
```

In diesem Fall wird die Schleife gestoppt, sobald der Zähler 5 erreicht.

```python run hidden
zaehler = 1

while zaehler <= 10:
    if zaehler == 5:
        break
    print(zaehler)
    zaehler += 1
```

### Beispiel mit `for`

```python
for buchstabe in "Python":
    if buchstabe == "h":
        break
    print(buchstabe)
```

```output
P
y
t
```

Die Schleife wird unterbrochen, sobald der Buchstabe `"h"` gefunden wird.

```python run hidden
for buchstabe in "Python":
    if buchstabe == "h":
        break
    print(buchstabe)
```

:::note
`break` beendet die gesamte Schleife, nicht nur eine einzelne Wiederholung.
:::

:::tip
Verwende `break`, wenn du gefunden hast, wonach du suchst, und nicht weiter durchlaufen musst.
:::

## `continue` — Eine Wiederholung Überspringen

Die Anweisung `continue` beendet die Schleife nicht, sondern überspringt den restlichen Code der aktuellen Wiederholung und fährt direkt mit der nächsten Iteration fort.

Beispiel:

```python
for zahl in range(1, 6):
    if zahl == 3:
        continue
    print(zahl)
```

```output
1
2
4
5
```

Hier wird die Zahl 3 nicht ausgegeben, aber die Schleife läuft mit den übrigen Zahlen weiter.

```python run hidden
for zahl in range(1, 6):
    if zahl == 3:
        continue
    print(zahl)
```

:::note
`continue` beendet die Schleife nicht, sondern überspringt nur eine bestimmte Iteration.
:::

:::tip
Verwende es, wenn du bestimmte Fälle innerhalb der Schleife ignorieren möchtest, ohne sie vollständig zu beenden.
:::

## `pass` — Leere Anweisung

Die Anweisung `pass` macht nichts. Sie wird verwendet, wenn die Struktur vollständig sein muss, du aber noch keine Logik implementieren möchtest.

Beispiel:

```python run
for i in range(5):
    pass
```

```output
```

Sie wird auch häufig bei bedingten Anweisungen verwendet:

```python run
if True:
    pass
```

```output
```

:::note
`pass` verhindert Syntaxfehler, wenn ein Block leer ist.
:::

:::tip
Es ist nützlich, wenn du dein Programm planst und noch nicht entschieden hast, welcher Code dort eingefügt werden soll.
:::

## Vergleich der Drei Anweisungen

| Anweisung | Beendet die Schleife? | Überspringt eine Wiederholung? | Macht Etwas Sichtbares? |
| --- | --- | --- | --- |
| `break` | Ja | Nein | Ja |
| `continue` | Nein | Ja | Ja |
| `pass` | Nein | Nein | Nein |

## Kombinierte Beispiele

### Beispiel 1: Nach einem Bestimmten Buchstaben Suchen

```python run
for buchstabe in "Programmierung":
    if buchstabe == "g":
        print("Buchstabe gefunden")
        break
```

```output
Buchstabe gefunden
```

### Beispiel 2: Nur Ungerade Zahlen Anzeigen

```python run
for zahl in range(1, 10):
    if zahl % 2 == 0:
        continue
    print(zahl)
```

```output
1
3
5
7
9
```

## Übungen Zum Üben

### Übung 1: Beim Finden einer Zahl Stoppen

Erstelle eine `for`-Schleife, die die Zahlen von 1 bis 10 durchläuft.\
Wenn die Zahl 7 erreicht wird, soll das Programm die Schleife mit `break` vollständig beenden.\
Gib jede Zahl aus, bevor die Schleife gestoppt wird.

```python practice
# Erstelle eine for-Schleife, die die Zahlen von 1 bis
# 10 durchläuft.
# Wenn die Zahl 7 erreicht wird, soll das Programm die
# Schleife mit break vollständig beenden.
# Gib jede Zahl aus, bevor die Schleife gestoppt wird
```

:::details
```python run
for nummer in range(1, 11):
    if nummer == 7:
        break
    print(nummer)
```
:::

### Übung 2: Einen Bestimmten Buchstaben Überspringen

Erstelle eine Variable `wort` mit dem Wert `"Computer"`.\
Verwende eine `for`-Schleife, um jeden Buchstaben anzuzeigen, außer dem Buchstaben `"o"`.\
Verwende `continue`.

```python practice
# Erstelle eine Variable wort mit dem Wert "Computer".
# Verwende eine for-Schleife, um jeden Buchstaben
# anzuzeigen, außer dem Buchstaben "o".
# Verwende continue
```

:::details
```python run
wort = "Computer"

for buchstabe in wort:
    if buchstabe == "o":
        continue
    print(buchstabe)
```
:::

### Übung 3: Eine Negative Zahl Erkennen

Erstelle eine simulierte Liste mit `range()` von -3 bis 3.\
Durchlaufe die Werte mit einer `for`-Schleife.\
Wenn du eine negative Zahl findest, gib `"Negative Zahl erkannt"` aus und beende die Schleife mit `break`.

```python practice
# Erstelle eine simulierte Liste mit range()
# von -3 bis 3.
# Durchlaufe die Werte mit einer for-Schleife.
# Wenn du eine negative Zahl findest, gib "Negative
# Zahl erkannt" aus und beende die Schleife mit break
```

:::details
```python run
for nummer in range(-3, 4):
    if nummer < 0:
        print("Negative Zahl erkannt")
        break
```
:::

### Übung 4: Unvollständige Struktur mit `pass`

Erstelle eine `for`-Schleife, die die Zahlen von 1 bis 5 durchläuft.\
Innerhalb der Schleife füge eine `if`-Bedingung ein, die überprüft, ob die Zahl größer als 3 ist.\
Vorerst soll innerhalb dieser Bedingung nichts ausgeführt werden; verwende `pass`.

```python practice
# Erstelle eine for-Schleife, die die Zahlen von 1 bis
# 5 durchläuft.
# Innerhalb der Schleife füge eine if-Bedingung ein,
# die überprüft, ob die Zahl größer als 3 ist.
# Vorerst soll innerhalb dieser Bedingung nichts
# ausgeführt werden; verwende pass
```

:::details
```python run
for nummer in range(1, 6):
    if nummer > 3:
        pass
    print(nummer)
```
:::

## Fazit der Einheit

In dieser Einheit hast du gelernt, dass:

- `break` eine Schleife sofort beendet.
- `continue` eine bestimmte Wiederholung überspringt, ohne die Schleife zu beenden.
- `pass` als leere Anweisung dient, um Strukturen syntaktisch gültig zu halten.
- Diese Werkzeuge bieten mehr Kontrolle und Flexibilität innerhalb von Schleifen.
- Zu wissen, wann man welche Anweisung verwendet, verbessert die Klarheit und Effizienz des Programms.
