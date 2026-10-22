---
title: Was ist Python und Wie Funktioniert Es?
summary: Einführung in die Programmiersprache, ihre Merkmale, lesbare Syntax und Verwendungszwecke.
---

## Was ist Python?

Python ist eine hoch­entwickelte Programmiersprache, die von Guido van Rossum entwickelt und 1991 veröffentlicht wurde. Ihr Hauptmerkmal ist ihre klare und gut lesbare Syntax, die es erleichtert, sie zu lernen – selbst wenn man noch nie zuvor programmiert hat.

Es ist eine vielseitige Programmiersprache, was bedeutet, dass sie in einer Vielzahl von Bereichen eingesetzt werden kann:

- Webentwicklung.
- Künstliche Intelligenz und Machine Learning.
- Datenanalyse.
- Automatisierung von Aufgaben.
- Spieleentwicklung.
- Server-Scripting.
- Desktop-Anwendungen.

:::note[Hinweis:]
Ein großer Teil des Erfolgs von Python stammt aus seiner riesigen Community und seinem umfangreichen Bibliotheksökosystem. Zum Beispiel gibt es für KI TensorFlow, für Datenanalyse Pandas, für Webentwicklung Django usw.
:::

## Hauptmerkmale von Python

### :check Einfache Syntax

Python ist so entwickelt, dass der Code leicht zu lesen ist – fast so, als wäre er auf Englisch geschrieben.

```python run
print('Hallo, Welt')
```

```output
Hallo, Welt
```

:::tip[Tipp:]
Wenn eine Python-Zeile „klingt“, wie das, was du erreichen willst, ist sie wahrscheinlich die richtige Art, es zu schreiben.
:::

### :check Interpretiert

Python muss nicht vor der Ausführung kompiliert werden. Der Code wird Zeile für Zeile vom Interpreter ausgeführt.\
\
Dies ermöglicht:

- Ideen schnell ausprobieren.
- Code in interaktiven Umgebungen wie Pyodide (im Browser) oder im Terminal ausführen.
- Fehler Zeile für Zeile erkennen.

:::note[Hinweis:]
Da Python interpretiert wird, führt es die ersten 79 Zeilen problemlos aus, und ein Fehler tritt nur auf, wenn die 80. Zeile erreicht wird.
:::

### :check Plattformübergreifend

Python läuft auf:

- Windows.
- macOS.
- Linux.
- Webbrowser (dank Pyodide).
- Server.
- Mikrocontroller (MicroPython).

### :check Dynamische Typisierung

Du musst den Variablentyp (`int`, `string` usw.) nicht angeben. Python erkennt ihn automatisch.

```python
x = 10      # Ganzzahl
x = "Hallo"  # Jetzt ist es eine Zeichenkette (String)
```

:::tip[Tipp:]
Die Flexibilität der dynamischen Typisierung ist mächtig, kann aber manchmal schwer zu entdeckende Fehler verursachen. Später wirst du Best Practices lernen, um dies zu vermeiden.
:::

## Wie Funktioniert Python Intern?

### Der Python-Interpreter

Der Interpreter nimmt deinen `.py`-Code, wandelt ihn in Bytecode um, und dieser Bytecode wird von einer virtuellen Maschine ausgeführt.

Prozessübersicht:

- Du schreibst `programm.py`.
- Python wandelt es in Bytecode um (`.pyc`).
- Der Bytecode wird in der Python Virtual Machine (PVM) ausgeführt.

:::note[Hinweis:]
Bytecode ist eine optimierte Version, die es deinem Programm ermöglicht, beim nächsten Mal schneller zu starten.
:::

## Wofür Wird Python Verwendet?

Python ist äußerst vielseitig. Einige praktische Anwendungsbereiche:

### Automatisierung

Du kannst fast alles automatisieren: Dateien umbenennen, E-Mails senden, Dokumente lesen, mit APIs arbeiten...

### Webentwicklung

Frameworks wie Django oder Flask ermöglichen es, vollständige Webanwendungen zu erstellen.

:::note[Hinweis:]
Django ist „batteries included“, Flask ist minimalistischer. Später kannst du je nach deinen Bedürfnissen wählen.
:::

### Datenwissenschaft und KI

Es ist der Standard in der Datenanalyse: Pandas, NumPy, Matplotlib, TensorFlow, Scikit-Learn...

### Videospiele

Mit Bibliotheken wie Pygame kannst du 2D-Spiele erstellen.

## Erster Blick auf Python-Code

```python run input="Daniel"
name = input('Wie heißt du? ')
print('Hallo', name)
```

```output
Wie heißt du? Daniel
Hallo Daniel
```

## Fazit der Einheit

In diesem ersten Thema hast du gelernt, was Python ist, welche seine wichtigsten Merkmale sind und wie sein Interpreter funktioniert. Außerdem hast du seine gängigsten Anwendungsbereiche und einen ersten Codeausschnitt kennengelernt.
