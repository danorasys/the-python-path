---
title: Kommentare und Grundlegender Code-Stil
summary: Verwende `#`, um den Code zu dokumentieren und ihn lesbar zu halten.
source: ce508e9b295b
---

## Was Ist Ein Kommentar in Python?

Ein Kommentar ist ein Teil des Codes, der nicht ausgeführt wird. Er dient dazu, zu erklären, was ein Anweisungsblock tut, die Logik hinter einer Berechnung zu verdeutlichen oder Erinnerungen zu hinterlassen.

In Python schreibt man Kommentare mit dem Symbol `#`:

```python
# so schreibt man einen Kommentar
```

Alles, was nach `#` in derselben Zeile steht, wird von Python ignoriert.

:::note
Kommentare sind für Menschen, nicht für den Interpreter. Sie machen den Code verständlicher und helfen dir zu erinnern, was du meintest, wenn du ihn später erneut liest.
:::

## Einzeilige Kommentare

Dies ist die häufigste Art. Sie werden über eine Codezeile oder rechts daneben geschrieben.

Beispiel:

```python run
# Dieses Programm zeigt eine Begrüßung an
print("Hallo")  # Zeigt Text auf dem Bildschirm
```

```output
Hallo
```

:::tip
Vermeide offensichtliche Kommentare wie:\
`x = x + 1 # ich addiere 1 zu x`
:::

Gute Kommentare erklären das Warum, nicht das Was.

## Mehrzeilige Kommentare (Erklärender Text)

Python hat kein spezielles Symbol für mehrzeilige Kommentare wie andere Sprachen, aber du kannst dreifache Anführungszeichen `""" """` verwenden, um längeren Text zu schreiben, der nicht ausgeführt wird, solange er keiner Variablen zugewiesen ist.

Dies wird normalerweise am Anfang einer Datei oder zu Beginn von Funktionen verwendet.

Beispiel:

```python
"""
Dieses Programm berechnet die Fläche eines Kreises.
Der Benutzer gibt den Radius ein und das Ergebnis wird angezeigt.
"""
```

:::note
Technisch gesehen ist dies ein ungenutztes Stringliteral, aber Python ignoriert es, sodass es als Kommentar funktioniert.
:::

## Wofür Sind Kommentare Wirklich?

Kommentare sind keine Dekoration. Sie sind nützlich, wenn:

- Sie die Absicht hinter einer Lösung erklären.
- Sie komplizierte Teile des Codes verdeutlichen.
- Sie wichtige Entscheidungen dokumentieren.
- Sie den Leser des Codes unterstützen (auch dich selbst).

:::note
Wenn du zu viel erklären musst, ist der Code vielleicht zu komplex. Oft ist es besser, den Code zu vereinfachen, statt mehr Kommentare zu schreiben.
:::

## Grundlegender Code-Stil: Sauberen Code Schreiben

Python ist dafür bekannt, einen klaren und gut lesbaren Stil zu fördern. Hier einige wichtige Regeln:

### 1\. Verwende Beschreibende Variablennamen

:cross Schlecht:

```python
x = 10
y = 20
```

:check Gut:

```python
alter = 10
jahre_erfahrung = 20
```

:::note
Ein guter Name verhindert unnötige Kommentare.
:::

### 2\. Leerzeichen Um Operatoren

Das verbessert die Lesbarkeit enorm.

:cross Ohne Leerzeichen:

```python
summe=10+5
```

:check Mit Leerzeichen:

```python
summe = 10 + 5
```

### 3\. Eine Idee Pro Zeile

:cross Schwer zu lesen:

```python
a = 10; b = 20; print(a+b)
```

:check Klar und einfach:

```python run
a = 10
b = 20
print(a + b)
```

```output
30
```

### 4\. Halte Zeilen Kurz

Die allgemeine Empfehlung lautet, nicht mehr als 79 Zeichen pro Zeile zu verwenden (PEP 8).

:::tip
Wenn du etwas Langes schreiben musst, teile es auf mehrere Teile auf, z. B. mit `\` oder durch Konkatenation.
:::

## Kommentare Im Echten Code

Hier ein realistischeres Beispiel dafür, wie man Kommentare verwendet, um eine Idee zu verdeutlichen:

```python run
# Wir berechnen den Endpreis mit Rabatt
preis = 100
rabatt = 0.15

# Rabatt anwenden
endpreis = preis - (preis * rabatt)

print("Endpreis:", endpreis)
```

```output
Endpreis: 85.0
```

Hier erklären Kommentare den Zweck, nicht die mathematische Operation.

## Wann Solltest Du NICHT Kommentieren?

:::tip
Merke dir diese goldene Regel:\
**"Kommentiere, wenn der Leser verwirrt sein könnte; kommentiere nicht das Offensichtliche".**
:::

:cross Unnötiger Kommentar:

```python
print("Hallo")  # druckt Hallo
```

:cross Kommentare, die den Code duplizieren:

```python
x = 5   # x ist jetzt 5
```

## Geführte Übung

Füge diesem Codeausschnitt hilfreiche Kommentare hinzu:

```python run="Üben >>"
name = "Juan"
alter = 22
aktuelles_jahr = 2025

print("Dein Name ist:", name)
print("Dein Alter in 5 Jahren wird sein:", alter + 5)
```

:::details
```python
# Benutzerdaten
name = "Juan"
alter = 22
aktuelles_jahr = 2025

# Informationen anzeigen
print("Dein Name ist:", name)

# Zukünftiges Alter berechnen (aktuelles Alter + 5)
print("Dein Alter in 5 Jahren wird sein:", alter + 5)
```
:::

## Fazit der Einheit

In diesem Thema hast du gelernt:

- Wie man Kommentare mit `#` schreibt.
- Wie man erklärende Kommentare mit dreifachen Anführungszeichen erstellt.
- Gute Praktiken für Stil und Lesbarkeit.
- Was einen Kommentar nützlich macht.
- Wie man klareren und besser strukturierten Code schreibt.

Kommentare werden deine Verbündeten sein, während du zu komplexeren Programmen fortschreitest.
