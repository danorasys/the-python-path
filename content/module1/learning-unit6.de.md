---
title: Dateneingabe Mit `input()`
summary: Wie man Informationen vom Benutzer erhält und sie verarbeitet.
---

Die Funktion `input()` ermöglicht es deinem Programm, Informationen zu erhalten, die vom Benutzer eingegeben werden. Sie ist einer der ersten Schritte, um wirklich interaktive Programme zu erstellen.

## Was ist `input()`?

`input()` ist eine Funktion, die:

- Eine Nachricht anzeigt (wenn du ihr eine gibst).
- Darauf wartet, dass der Benutzer etwas eingibt.
- Die Eingabe als Zeichenkette (`str`) zurückgibt.

Beispiel:

```python run input="Linus"
name = input("Gib deinen Namen ein: ")
print("Hallo,", name)
```

```output
Gib deinen Namen ein: Linus
Hallo, Linus
```

:::note[Hinweis:]
Alles, was `input()` zurückgibt, ist Text, selbst wenn der Benutzer eine Zahl eingibt.
:::

## Die Eingabe des Benutzers Umwandeln

Wenn du mit Zahlen arbeiten musst, solltest du den Text, den `input()` liefert, umwandeln.

Verwende:

| Umwandlung | Verwendet für |
| --- | --- |
| `int()` | In eine ganze Zahl umwandeln |
| `float` | In eine Dezimalzahl umwandeln |
| `str()` | In Text umwandeln |

Beispiel:

```python run input="55"
alter = input("Wie alt bist du? ")
alter = int(alter)    # notwendige Umwandlung
print("Nächstes Jahr wirst du", alter + 1, "Jahre alt sein.")
```

```output
Wie alt bist du? 55
Nächstes Jahr wirst du 56 Jahre alt sein.
```

:::tip[Tipp:]
Wenn du die Eingabe nicht umwandelst, kann eine Zahl nicht mathematisch addiert werden, sondern nur als Text.
:::

Beispiel für einen häufigen Fehler:

```python
"5" + 1    # FEHLER: str und int können nicht gemischt werden
```

## Eingegebene Daten Verarbeiten

Nachdem du Informationen erhalten hast, kannst du sie für Berechnungen, Entscheidungen oder personalisierte Nachrichten verwenden.

```python run input="7"
zahl = int(input("Gib eine Zahl ein: "))
doppelt = zahl * 2
print("Das Doppelte ist:", doppelt)
```

```output
Gib eine Zahl ein: 7
Das Doppelte ist: 14
```

## Häufige Fehler bei `input()`

### 1\. Vergessen, dass `input()` Immer Text Zurückgibt

```python run="Fehler Ausprobieren >>" input="5" error
n = input("Zahl: ")
print(n + 10)    # FEHLER
```

### 2\. Versuchen, Ungültigen Text Umzuwandeln

```python run="Fehler Ausprobieren >>" input="hallo" error
text = input("Eingabe: ")  # Eingabe: hallo
int(text)    # FEHLER
```

:::note[Hinweis:]
Später wirst du lernen, diese Fehler mit `try` und `except` zu behandeln.
:::

## Nützliche Beispiele

### Beispiel 1: Persönliche Begrüßung

```python run input="Python"
name = input("Wie heißt du? ")
print("Freut mich,", name)
```

```output
Wie heißt du? Python
Freut mich, Python
```

### Beispiel 2: Interaktive Addition

```python run input="7|3"
a = int(input("Gib eine Zahl ein: "))
b = int(input("Gib noch eine Zahl ein: "))
print("Die Summe ist:", a + b)
```

```output
Gib eine Zahl ein: 7
Gib noch eine Zahl ein: 3
Die Summe ist: 10
```

### Beispiel 3: Text Wiederholen

```python run input="Python"
wort = input("Gib ein Wort ein: ")
print(wort * 3)
```

```output
Gib ein Wort ein: Python
PythonPythonPython
```

:::tip[Tipp:]
Wenn du eine Zeichenkette wiederholst, werden nicht automatisch Leerzeichen eingefügt.
:::

## Übungsaufgaben zum Üben

### Übung 1: Einfache Begrüßung

Bitte den Benutzer um seinen Namen und zeige eine Begrüßung an.

```python run="Üben >>" hidden
# Bitte den Benutzer um seinen Namen und zeige eine
# Begrüßung an
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>" input="Ana"
name = input("Gib deinen Namen ein: ")
print("Hallo", name)
```
:::

### Übung 2: Alter in der Zukunft

Bitte den Benutzer um sein Alter und sage ihm, wie alt er in 5 Jahren sein wird.

```python run="Üben >>" hidden
# Bitte den Benutzer um sein Alter und sage ihm, wie
# alt er in 5 Jahren sein wird
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>" input="25"
alter = int(input("Wie alt bist du? "))
print("In 5 Jahren wirst du", alter + 5, "Jahre alt sein.")
```
:::

### Übung 3: Wortmultiplikator

Bitte den Benutzer um ein Wort und eine Zahl. Zeige das Wort so oft wiederholt an, wie die Zahl angibt.

```python run="Üben >>" hidden
# Bitte den Benutzer um ein Wort und eine Zahl. Zeige
# das Wort so oft wiederholt an, wie die Zahl angibt
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>" input="Python|3"
wort = input("Gib ein Wort ein: ")
anzahl = int(input("Wie oft soll es wiederholt werden? "))
print(wort * anzahl)
```
:::

### Übung 4: Temperaturumrechnung

Bitte den Benutzer um eine Temperatur in Grad Celsius und wandle sie in Fahrenheit um.

```python run="Üben >>" hidden
# Bitte den Benutzer um eine Temperatur in Grad Celsius
# und wandle sie in Fahrenheit um
```

:::details[Mögliche Lösung anzeigen]
```python run="Lösung Ausprobieren >>" input="25"
c = float(input("Temperatur in Celsius: "))
f = (c * 9 / 5) + 32
print("Das entspricht", f, "°F")
```
:::

## Fazit der Einheit

In dieser Einheit hast du gelernt:

- `input()` zu verwenden, um Text von der Tastatur zu erhalten.
- Dass alles, was `input()` zurückgibt, eine Zeichenkette (`str`) ist.
- Diese Texte mit `int()` und `float()` in Zahlen umzuwandeln.
- Die eingegebenen Informationen zu verarbeiten, um Berechnungen durchzuführen oder personalisierte Nachrichten zu erstellen.
- Häufige Fehler zu vermeiden, wie z. B. Text und Zahlen zu vermischen.
