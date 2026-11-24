# Landwirtschaft

**Welche Farmpflanze bringt am meisten ein?** {{best}}: etwa {{bestDay}} Units pro Pflanze und Tag, an einer Raumstation verkauft. NipNip-Knospen verkaufen sich für das {{nipStationLow}}- bis {{nipStationHigh}}-Fache ihres Werts, wachsen aber langsamer.

## Die Pflanzen

Eine Basis baut {{plants, plural, one {# Farmpflanze} other {# Farmpflanzen}}} an. Jede gibt eine feste Ernte, wenn sie reif ist, und die Ernte verkauft sich an einem Handelsterminal. Die Tabelle ist danach geordnet, was eine Pflanze an einem Tag Wachstum einbringt, geerntet, sobald sie reif ist.

<!-- widget:plants -->

Jede Pflanze außer dem Echinokaktus braucht zum Ernten den [Gefahrgut-Schutzhandschuh](/guides/exosuit-modules#every-exosuit-module), ein Exo-Anzug-Modul, das du baust. Die Pflanzen, die einen Stapel einer Ressource geben (Frostkristall, Sternenknolle, Pilzschimmel, Gammawurzel, Faecium, Mordit, Solanium, Kaktusfleisch), sind zum Verkaufen wenig wert; sie sind zum Herstellen und Raffinieren da.

## Wie viel du anpflanzen solltest

Ernten heißt, die Interagieren-Taste zu halten, {{harvestSeconds}} Sekunden pro Pflanze, also erntet eine Stunde Halten etwa {{plantsAnHour, plural, one {# Pflanze} other {# Pflanzen}}}; der Schritt zur nächsten Pflanze kommt hinzu. Pflanze nicht mehr an, als du ernten kannst, bevor die ersten wieder reif sind: Ein Gravitino-Wirt reift in {{gravitinoGrowth}}, also füllen etwa {{gravitinoPlants, plural, one {# Pflanze} other {# Pflanzen}}} eine Runde, zum vollen Preis etwa {{gravitinoCrop}} Units wert. NipNip reift in {{nipnipGrowth}}: {{nipnipPlants, plural, one {# Pflanze} other {# Pflanzen}}}, etwa {{nipnipCrop}} Units. Eine so große Ernte verkauft sich nur zum vollen Preis, wenn sie auf viele Stationen verteilt wird, wie unten, und das Verkaufen kostet obendrein Zeit.

## Wo du verkaufen solltest

Eine Raumstation zahlt mehr als ein Terminal auf einem Planeten oder einem Frachter. Jedes System bestimmt seinen eigenen Preis, also bringt dieselbe Ernte in einem System etwas mehr als im nächsten.

Verkaufen senkt den Preis dessen, was du verkaufst, nur an diesem Terminal. Bei einem Produkt wie Gravitino-Bällen nehmen je {{productUnits}} verkaufte Einheiten {{productDrop}} vom Multiplikator; bei einer gestapelten Ressource nehmen je {{substanceUnits}} Einheiten {{substanceDrop}}. Der Preis erholt sich langsam: bei einem Produkt um den Wert einer Einheit pro Minute. Eine große Ernte verkauft sich also am besten auf mehrere Stationen verteilt.

NipNip-Knospen sind Schmuggelware. Außerhalb eines Piratensystems verkaufen sie sich mit dem Aufschlag des Schmugglers, dem {{smuggler}}-Fachen: dem {{nipStationLow}}- bis {{nipStationHigh}}-Fachen ihres Werts an einer Raumstation, dem {{nipTerminalLow}}- bis {{nipTerminalHigh}}-Fachen an einem Planetenterminal. In einem Piratensystem verkaufen sie sich nahe ihrem Wert.

## Eine Ernte gegen einen abgestürzten Abfangjäger

Ein in Besitz genommener Wächter-Abfangjäger der Klasse C verkauft sich je nach seinen Frachtplätzen für {{interceptorLow}} bis {{interceptorHigh}} Units, wie [Abfangjäger-Preise](/guides/interceptor-prices) zeigt. Ein einziger in Besitz genommener Abfangjäger bringt so viel wie hundert bis mehrere hundert Ernten von Gravitino-Wirten, also lohnt sich Landwirtschaft für alle, die eine große Farm bauen und über viele Stationen verkaufen; [Wächter-Abfangjäger](/guides/interceptors) sagt, wo die Wracks liegen.

Als was eine Ernte gekocht mehr wert ist, steht unter [Gerichte mit dem besten Verkaufspreis](/guides/best-selling-dishes).
