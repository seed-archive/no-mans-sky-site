# Fähigkeiten im Kampf

**Wie änderst du die Fähigkeiten einer Kreatur im Kampf?** Mit Genbearbeitungen. Eine Kreatur hat fünf Fähigkeiten, eine auf jedem Platz. Sobald ihre drei Werte alle Stufe {{statCap}} erreichen, kann jede Genbearbeitung eine Fähigkeit mutieren: Der Platz würfelt aus seiner eigenen Liste neu, und der Wurf gibt nie die Fähigkeit zurück, die er hatte.

## Genbearbeitungen

Kämpfe in der Holo-Arena füllen den Mutationsfortschritt einer Kreatur, und jeder volle Balken ist eine Genbearbeitung. Eine Kreatur gibt ihre Bearbeitungen zuerst für ihre Werte aus, Kampf, Beweglichkeit und Gesundheit, eine Stufe pro Bearbeitung, bis Stufe {{statCap}} bei jedem. Das macht {{fullPotential, plural, one {# Bearbeitung} other {# Bearbeitungen}}}, und das Spiel nennt das Ergebnis maximales genetisches Potenzial. Bis dahin bleibt „Fähigkeit mutieren“ gesperrt, mit der Zeile „Kann nicht bearbeitet werden, bis die Kreatur das maximale Potenzial erreicht hat“.

Danach kommen weiter Bearbeitungen. Der Balken wird mit jeder Bearbeitung, die eine Kreatur verdient hat, länger, von {{firstEdit}} Fortschritt für die erste bis {{lastEdit}} ab Bearbeitung {{lastFrom}}, und dort bleibt er. Eine früh verdiente Bearbeitung wartet unverbraucht, also kann eine Kreatur ihr volles Potenzial mit Bearbeitungen in der Hand für ihre Fähigkeiten erreichen.

<!-- widget:edits -->

Was eine Stufe eines Werts hinzufügt, steht unter [Werte der Kreaturen](/guides/creature-stats).

## Retrovirale Kugeln

![Retrovirale Kugel](/creatures/retroviral-pellet.webp)

Eine Retrovirale Kugel ist eine Genbearbeitung in einer Pille. Füttere sie einem Begleiter, und sie fügt eine unverbrauchte Bearbeitung hinzu, genau wie ein voller Balken Mutationsfortschritt, also bezahlt sie nach dem vollen Potenzial eine Mutation einer Fähigkeit. Sie wählt keine Fähigkeit von selbst: Die Mutation würfelt wie jede andere.

Ein gewonnener Kampf kann eine fallen lassen, am häufigsten die tägliche Herausforderung von Iteration: Ozeanus, in {{dailyPellet}} der Fälle, und ein System-Champion, {{championPellet}}. Der Abschnitt Arena-Liga unten führt jeden Kampf auf.

## Die Arena-Liga

Begleiterkämpfe werden in Holo-Arenen ausgetragen, und die Arena-Liga richtet sie aus. Ein Spieler begegnet ihr in dieser Reihenfolge.

1. **Iteration: Ozeanus.** Ein Sammler an der Holo-Arena an Bord der Weltraumanomalie. Er bringt dir den ersten Kampf bei und übergibt eine Retrovirale Kugel, dann eine Holo-Arena-Einladung.
2. **Herausforderer.** Eine Einladung des Herausforderers, eine der [Karten](/guides/charts) des Spiels, markiert eine Holo-Arena auf einem Planeten in der Nähe. Besiege den Herausforderer, und die nächste Einladung kommt von selbst.
3. **Der Champion.** Nach jeweils {{challengers, plural, one {# Sieg gegen Herausforderer} other {# Siegen gegen Herausforderer}}} ist die nächste Einladung stattdessen eine Einladung des Champions: der System-Champion, der mit Kreaturen von den Planeten dieses Systems kämpft. Besiege ihn, und eine neue Einladung des Herausforderers beginnt die Runde von vorn, also sind es {{challengers}} Herausforderer, dann ein Champion, so lange du spielst.
4. **Wieder Ozeanus.** Auf Wunsch gibt Ozeanus einen Trainingskampf, der wenig zahlt, aber immer eine Einladung des Herausforderers austeilt. Jeden Tag hält Ozeanus außerdem eine schwere tägliche Herausforderung mit demselben Team für jeden Reisenden ab; sie zahlt die meisten Nanit und die beste Chance auf eine Kugel.

<!-- widget:pellets -->

Die anderen Tische der Liste brauchen keine Einladung: Jeder steht in einem eigenen Gebäude. Eine Raumstation oder ein [Außenposten im Weltraum](/guides/deep-space-outpost) gibt in {{stationPellet}} der Fälle eine Kugel, ein Handelsposten dieselben {{challengerPellet}} wie ein Herausforderer und eine Siedlung keine.

### Medaillen und ihre Eier

Siege zählen für fünf Medaillen im Katalog, jede mit zehn Rängen und einem Titel pro Rang. Auf dem höchsten Rang jeder Medaille geben die Arena-Liga-Belohnungen von Ozeanus ein Ei umsonst. Jedes schlüpft mit allen drei Bewertungen auf S und einem der festen Sätze unten. {{dailyWins, plural, one {# gewonnene tägliche Herausforderung bringt} other {# gewonnene tägliche Herausforderungen bringen}}} den Wandernden Garnelentank, {{championWins, plural, one {# besiegter Champion} other {# besiegte Champions}}} die Aeron-Krabbe und {{battleWins, plural, one {# gewonnener Kampf} other {# gewonnene Kämpfe}}} die Geno-Garnele.

<!-- widget:medals -->

## Eier deiner Begleiter

Ein Begleiter kann ein Ei legen, ein Begleiter-Ei, und das Ei trägt die Kampfbewertungen seines Elternteils. Was das Spiel vom Elternteil verlangt:

- **Gefüttert und gestreichelt.** Hunger und Einsamkeit beide bei {{eggMood}} oder weniger; die Karte nennt, was fehlt („Ist hungrig“, „Ist traurig“, „Zusätzliche Nahrung erforderlich“). Vertrauen gehört nicht zu den Gründen, die die Karte nennt.
- **In seinem heimischen Klima**, und mindestens {{growDays, plural, one {# Tag} other {# Tage}}} gewachsen, wenn es selbst aus einem Ei geschlüpft ist.
- **Ein Ei auf einmal.** {{eggHours, plural, one {# Stunde} other {# Stunden}}} zwischen zwei Eiern, kein anderes Ei von dir in der Nähe und ein freier Eierplatz.

Das Ei schlüpft {{hatchHours, plural, one {# Stunde} other {# Stunden}}} später. Vorher kann der Ei-Sequenzer auf der Weltraumanomalie es mit Zutaten resequenzieren: Größe, Eigenschaften, Farbe und Zubehör können sich verschieben, aber die Kampfbewertungen und Fähigkeiten bleiben außer seiner Reichweite.

Die Kampfbewertungen kommen von der Art, und das Ei kopiert sie, also hat ein Jungtier die Buchstaben seines Elternteils: Eine Kreatur mit lauter S legt Eier mit lauter S, und die Kreatur eines Medaillen-Eis, darunter der Wandernde Garnelentank, behält ihre drei S in ihren Eiern. Seine fünf Fähigkeiten werden beim Schlüpfen neu gezogen, aus demselben Wurf der Art, also beginnt ein Jungtier mit den Fähigkeiten, die sein Elternteil zuerst hatte, nicht mit denen, die seitdem mutiert sind.

Jedes Ei, das du ausbrütest, zählt für die Medaille „Eier ausbrüten“: {{hatchMedal, plural, one {# ausgebrütetes Ei bringt} other {# ausgebrütete Eier bringen}}} den Verdorbenen Vierbeiner.

## Die fünf Plätze

Jede Kreatur zieht aus denselben Listen, welche Affinität sie auch hat; nur ihre Fähigkeiten der eigenen Affinität nehmen diese Affinität an. Es gibt {{moves, plural, one {# Fähigkeit} other {# Fähigkeiten}}} auf den fünf Plätzen, und jeder Platz hat eine eigene Aufgabe.

Eine neue Kreatur zieht jeden Platz nach den Gewichten seiner Liste: Das ist Chance. Eine Mutation zieht erneut aus derselben Liste, überspringt aber die Fähigkeit, die der Platz hat, also macht eine schwere gehaltene Fähigkeit die anderen wahrscheinlicher, und Bei einer Mutation zeigt das Wenigste und das Meiste, was eine Fähigkeit bekommen kann. Um eine Fähigkeit zu landen, mutiere diesen Platz weiter; eine leichte Fähigkeit braucht viele Versuche.

### Platz 1: einfache Treffer

Der Treffer der eigenen Affinität der Kreatur kommt in {{ownHit}} der Fälle, und ihn solltest du behalten. Ein Treffer einer anderen Affinität lohnt sich nur gegen die Kreaturen, gegen die er stark ist, und der physische Treffer ist gegen nichts stark.

<!-- widget:moves1 -->

### Platz 2: schwerere Angriffe

Die beiden wilden Fähigkeiten sind nahezu nutzlos: physisch, mit einer zusätzlichen halben Chance zu verfehlen. Sperrfeuer landet drei Treffer in einem Zug; Treffer mit Wunde und der mehrzügige Treffer verteilen ihren Schaden auf spätere Züge, und ein Kampf kann vorher enden.

<!-- widget:moves2 -->

### Platz 3: Angriffe mit einem Haken

Jede Fähigkeit hier wiegt gleich, also hat jede dieselbe Chance. Meide den rücksichtslosen Treffer, der den Gegner heilt, und achte auf die beiden, die deiner eigenen Kreatur schaden. Spieler zählen das Entfernen von Verstärkungen, das Säubern leistet, zu den stärksten Wahlen.

<!-- widget:moves3 -->

### Platz 4: Heilungen und Schilde

Die einfache Heilung wirkt in dem Zug, in dem du sie einsetzt; Heilung über Zeit und die verzögerte Heilung zahlen später, und Absorbieren heilt nur, solange der Gegner trifft.

<!-- widget:moves4 -->

### Platz 5: Tricks

Spieler stellen Betäuben, das den Gegner einen Zug kostet, und Affinität ändern, das den Gegner in die Affinität verwandelt, die deine Kreatur am härtesten trifft, über den Rest. Wiederbeleben ist kein Wiederbeleben: Es wirkt als Opfer für die Verteidigung.

<!-- widget:moves5 -->

## Namen

Das Spiel benennt eine Fähigkeit nach ihrer Art und der Affinität der Kreatur, also zeigt eine Fähigkeit bei einer Feuer-Kreatur einen anderen Namen als bei einer Frost-Kreatur. Eine Art kann mehr als einen Namen haben, und welchen eine Kreatur zeigt, steht für diese Kreatur fest: Sie behält ihre Namen für immer, und zwei Kreaturen einer Affinität können verschiedene zeigen.

<!-- widget:names -->

## Feste Sätze

Die fünf Medaillen-Eier haben immer dieselben fünf Fähigkeiten, eine auf jedem Platz, ohne Liste, aus der gezogen wird. Eine Mutation eines ihrer Plätze tauscht die Fähigkeit des Satzes gegen den einfachen Treffer der eigenen Affinität der Kreatur, und die nächste Mutation dieses Platzes bringt die Fähigkeit des Satzes zurück, also wechselt ein Platz von ihnen immer nur zwischen den beiden. Wo die Fähigkeit des Satzes schon dieser einfache Treffer ist, wie auf dem ersten Platz der Aeron-Krabbe und des Verdorbenen Vierbeiners, verbraucht eine Mutation die Bearbeitung und lässt die Fähigkeit, wie sie war.

<!-- widget:kits -->

Was du unterwegs anbaust, kochst und raffinierst, ist die letzte Gruppe der Ratgeber, und sie beginnt mit [Landwirtschaft](/guides/farming).
