---
title: Logische und Vergleichsoperatoren
summary: Hier wirst du verstehen, wie Operatoren wie `==`, `!=`, `<`, `>`, `<=`, `>=` funktionieren und wie man sie mit `and`, `or` und `not` kombiniert, um komplexere Bedingungen zu erstellen. So kannst du mehrere Situationen gleichzeitig auswerten und präzisere Entscheidungen innerhalb deiner bedingten Strukturen treffen.
---

Vergleichsoperatoren und logische Operatoren sind essenziell, um in Python Entscheidungen zu treffen. Sie ermöglichen es dir, Werte zu vergleichen, Bedingungen zu überprüfen und mehrere Auswertungen innerhalb einer `if`-Anweisung zu kombinieren. Mit ihnen kannst du umfassendere Regeln erstellen, zum Beispiel prüfen, ob ein Alter in einem bestimmten Bereich liegt, ob ein Passwort übereinstimmt oder ob eine Aktion nur unter bestimmten Bedingungen gültig ist.

## Vergleichsoperatoren

Diese Operatoren geben `True` oder `False` zurück, je nach Bedingung.

| Operator | Bedeutung | Beispiel |
| --- | --- | --- |
| `==` | Gleich | `5 == 5 → True` |
| `!=` | Ungleich | `3 != 4 → True` |
| `<` | Kleiner als | `2 < 10 → True` |
| `>` | Größer als | `10 > 3 → True` |
| `<=` | Kleiner oder gleich | `5 <= 5 → True` |
| `>=` | Größer oder gleich | `8 >= 2 → True` |

## Praktisches Beispiel

```python run
alter = 20
if alter >= 18:
    print("Du bist volljährig")
```

```output
Du bist volljährig
```

## Logische Operatoren

Sie ermöglichen es dir, Bedingungen zu kombinieren.

### `and`

Alle Bedingungen müssen wahr sein.

Beispiel:

```python run
alter = 24
if alter >= 18 and alter < 65:
    print("Erwachsener")
```

```output
Erwachsener
```

### `or`

Mindestens eine Bedingung muss wahr sein.

Beispiel:

```python run
farbe = "rot"
if farbe == "rot" or farbe =="blau":
    print("Erlaubte Farbe")
```

```output
Erlaubte Farbe
```

### `not`

Den logischen Wert umkehren: Wenn er `True` war, wird er `False`. Wenn er `False` war, wird er `True`.

Beispiel:

```python run
verbunden = False
if not verbunden:
    print("Keine Verbindung")
```

```output
Keine Verbindung
```

## Zusätzliche Beispiele

### Häufige Vergleiche

- Überprüfung von Zeichenketten auf Gleichheit → `"hallo" == "hallo"`
- Alterszugang prüfen → `alter >= 18`
- Bereiche validieren → `0 <= zahl <= 100`
- Prüfen, ob eine Variable nicht einen bestimmten Wert hat → `variable != 0`

### Nützliche Kombinationen

- Gültiger Notenbereich → `note >= 0 and note <= 5`
- Autorisierter Benutzer nach Rolle → `rolle == "admin" or rolle == "editor"`
- Aktion deaktiviert → `not verfuegbar`

### Vergleich mehrerer Werte

```python run
temperatur = 25
if temperatur > 20 and temperatur < 30:
    print("Ideale Temperatur")
```

```output
Ideale Temperatur
```

## Tipps

:::tip
Wenn du mehrere Bedingungen kombinierst, überlege: „Möchte ich, dass alle wahr sind, oder reicht eine einzige?"
:::

:::tip
Formuliere Bedingungen klar und kurz; vermeide es, zu viele in einer einzigen `if`-Anweisung zu verwenden.
:::

:::tip
Verwende `not`, wenn du lange Regeln vereinfachen willst, zum Beispiel:\
Anstatt `if verbunden == False:` schreibe `if not verbunden:`.
:::

## Hinweise

:::note
Vergleiche in Python verwenden `==` und nicht `=`.
:::

:::note
Du kannst Vergleiche wie in der Mathematik verketten: `18 <= alter < 60`.
:::

:::note
Python wertet Bedingungen von links nach rechts aus.
:::

## Kombinierte Beispiele

### Benutzerauthentifizierung

```python run
benutzer = "python_lernender"
passwort = "passwort123"

if benutzer == "python_lernender" and passwort == "passwort123":
    print("Zugriff erlaubt")
else:
    print("Authentifizierung fehlgeschlagen")
```

```output
Zugriff erlaubt
```

### Überprüfung der Noten

```python run
punktzahl = 75

if 60 <= punktzahl <= 100:
    print("Bestanden")
elif 0 <= punktzahl < 60:
    print("Nicht bestanden")
else:
    print("Ungueltige Punktzahl")
```

```output
Bestanden
```

### Konnektivität

```python run
modus ="offline"
if not modus == "online":
    print("Offline-Modus aktiv")
else:
    print("Verbindung erfolgreich hergestellt")
```

```output
Offline-Modus aktiv
```

## Übungen zum Üben

### Übung 1: Überprüfen, Ob Eine Person Wählen Darf

Erstelle eine Variable namens `alter` und weise ihr eine ganze Zahl zu. Das Programm soll überprüfen, ob die Person 18 Jahre oder älter ist. Wenn die Bedingung erfüllt ist, wird die Nachricht `Kann wählen` angezeigt. Andernfalls wird `Darf nicht wählen` angezeigt.

```python practice
# Erstelle eine Variable namens alter und weise ihr
# eine ganze Zahl zu. Das Programm soll überprüfen, ob
# die Person 18 Jahre oder älter ist. Wenn die
# Bedingung erfüllt ist, wird die Nachricht "Kann
# wählen" angezeigt. Andernfalls wird "Darf nicht
# wählen" angezeigt
```

:::details
```python run
alter = 17

if alter >= 18:
    print("Kann wählen")
else:
    print("Darf nicht wählen")
```
:::

### Übung 2: Nummer Innerhalb Eines Bereichs

Erstelle eine Variable namens `nummer`. Das Programm soll überprüfen, ob der Wert von `nummer` zwischen 1 und 10 liegt, einschließlich beider Grenzen. Befindet sich die Zahl im Bereich, wird `Gültige Zahl` angezeigt. Andernfalls wird `Zahl außerhalb des Bereichs` angezeigt.

```python practice
# Erstelle eine Variable namens nummer. Das Programm
# soll überprüfen, ob der Wert von nummer zwischen 1
# und 10 liegt, einschließlich beider Grenzen. Befindet
# sich die Zahl im Bereich, wird "Gültige Zahl"
# angezeigt. Andernfalls wird "Zahl außerhalb des
# Bereichs" angezeigt
```

:::details
```python run
nummer = 7

if nummer >= 1 and nummer <= 10:
    print("Gültige Zahl")
else:
    print("Zahl außerhalb des Bereichs")
```
:::

### Übung 3: Überprüfen Erlaubter Farben

Erstelle eine Variable namens `farbe`. Das Programm soll prüfen, ob die Farbe `blau` oder `rot` ist. Wenn sie mit einer dieser Farben übereinstimmt, wird `Erlaubte Farbe` angezeigt. Andernfalls wird `Nicht erlaubte Farbe` angezeigt.

```python practice
# Erstelle eine Variable namens farbe. Das Programm
# soll prüfen, ob die Farbe "blau" oder "rot" ist. Wenn
# sie mit einer dieser Farben übereinstimmt, wird
# "Erlaubte Farbe" angezeigt. Andernfalls wird "Nicht
# erlaubte Farbe" angezeigt
```

:::details
```python run
farbe = "blau"

if farbe == "blau" or farbe == "rot":
    print("Erlaubte Farbe")
else:
    print("Nicht erlaubte Farbe")
```
:::

### Übung 4: Versuchssystem

Erstelle eine Variable namens `versuche`. Wenn der Wert von `versuche` ungleich `0` ist, zeige `Versuche verfügbar` an. Wenn der Wert `0` ist, zeige `Konto gesperrt` an.

```python practice
# Erstelle eine Variable namens versuche. Wenn der Wert
# von versuche ungleich 0 ist, zeige "Versuche
# verfügbar" an. Wenn der Wert 0 ist, zeige "Konto
# gesperrt" an
```

:::details
```python run
versuche = 0

if versuche != 0:
    print("Versuche verfügbar")
else:
    print("Konto gesperrt")
```
:::

### Übung 5: Klassifikation von Zahlen

Erstelle eine Variable namens `n`. Das Programm soll bestimmen, ob die Zahl:

- Positiv (größer als 0) ist.
- Negativ (kleiner als 0) ist.
- oder Null (0) ist.

Gib für jeden Fall eine unterschiedliche Meldung aus.

```python practice
# Erstelle eine Variable namens n. Das Programm soll
# bestimmen, ob die Zahl:
# - Positiv (größer als 0) ist.
# - Negativ (kleiner als 0) ist.
# - oder Null (0) ist.
# Gib für jeden Fall eine unterschiedliche Meldung aus
```

:::details
```python run
n = -3

if n > 0:
    print("Die Zahl ist positiv")
elif n < 0:
    print("Die Zahl ist negativ")
else:
    print("Die Zahl ist null")
```
:::

### Übung 6: Systemzugang

Erstelle zwei Variablen:

- `alter`.
- `hat_zugang` (`True` oder `False`).

Das Programm soll `Zugang Erlaubt` nur dann anzeigen, wenn die Person 18 Jahre oder Älter ist und außerdem `hat_zugang` den Wert `True` hat.\
In allen anderen Fällen soll `Zugang Verweigert` angezeigt werden.

```python practice
# Erstelle zwei Variablen:
# - alter.
# - hat_zugang (True oder False).
# Das Programm soll "Zugang Erlaubt" nur dann anzeigen,
# wenn die Person 18 Jahre oder Älter ist und außerdem
# hat_zugang den Wert True hat.
# In allen anderen Fällen soll "Zugang Verweigert"
# angezeigt werden
```

:::details
```python run
alter = 20
hat_zugang = True

if alter >= 18 and hat_zugang:
    print("Zugang Erlaubt")
else:
    print("Zugang Verweigert")
```
:::

## Fazit der Einheit

In dieser Einheit hast du gelernt, Werte zu Vergleichen und Bedingungen zu Kombinieren, indem du Vergleichsoperatoren und Logische Operatoren verwendest. Jetzt kannst du präzisere Regeln in deinen Programmen erstellen, Bereiche Auswerten, mehrere Situationen gleichzeitig überprüfen und den Entscheidungsfluss mit größerer Genauigkeit steuern.\
Das Beherrschen dieser Operatoren ermöglicht es dir, intelligenteren und anpassungsfähigeren Code zu schreiben.
