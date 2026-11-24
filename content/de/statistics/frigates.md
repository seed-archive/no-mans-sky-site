# Fregatten

**Wie bekommst du eine Fregatte der Klasse S?** Kauf sie aus den Flotten eines Systems und such weiter. Die Eigenschaften einer Fregatte kommen von dem Ort, an dem sie fliegt, also bringt jede neue Flotte neue Fregatten. Klasse S braucht vier gute Eigenschaften zusätzlich zu ihrer eigenen, was höchstens {{atMostS}} von ihnen gelingt. Oder nimm eine schwächere und schick sie los: Eine Fregatte steigt auf Expeditionen [Stufen](#levels) auf, und diese tilgen ihre schlechten Eigenschaften und fügen gute hinzu.

## Die Typen

Fünf Typen fliegen in den Flotten jedes Systems, einer so wahrscheinlich wie der andere: Kampf, Erkundung, Industrie, Handel und Unterstützung. Die Piraten bringen einen sechsten, den Räuber. Die übrigen kommen von einem kosmischen Wal oder als Expeditionsbelohnungen.

<!-- widget:kinds -->

## Eine kaufen

Deine Flotte fasst {{fleet, plural, one {# Fregatte} other {# Fregatten}}}. {{sale}} der Fregatten, die mit einer Flotte fliegen, stehen zum Verkauf. Die Fregatten, die in eigenen Gruppen durch ein System ziehen, nie.

Dasselbe System zeigt jedes Mal, wenn eine Flotte ankommt, andere Fregatten, also kannst du weitersuchen, ohne es zu verlassen.

## Räuber

Räuber fliegen nur mit einem Piraten-[Schlachtschiff](/guides/dreadnoughts). Sie kommen zum Verkauf, sobald die Schlacht ihre Belohnungen ausgezahlt hat, wie auch immer sie endete, nach denselben Regeln wie andere Fregatten.

## Eigenschaften und Klasse

Jede Fregatte beginnt mit der Eigenschaft ihres Typs, etwa Kampfspezialist, und Hauptwerten innerhalb der Spannen ihres Typs.

<!-- widget:starts -->

Dann kann sie weitere Eigenschaften ziehen: Jede Runde geht in {{extra}} der Fälle weiter, und eine Eigenschaft kann gut oder schlecht sein. Eine Fregatte hat fünf Eigenschaftsplätze, ihre eigene Eigenschaft und vier weitere. Eine Eigenschaft fügt einem Wert etwas hinzu, und eine schlechte zieht etwas ab; kein Wert fällt unter {{statLow}} oder steigt über {{statHigh}}. Jede Eigenschaft, mit dem, was sie tut, und welche Typen sie ziehen, steht unten unter Fregatteneigenschaften.

<!-- widget:strengths -->

Der Klassenbuchstabe zählt die Eigenschaften: die guten, die eigene eingeschlossen, minus die schlechten, minus zwei. Klasse S heißt also ihre eigene Eigenschaft und vier gute, und eine schlechte Eigenschaft hebt im Buchstaben eine gute auf.

<!-- widget:odds -->

Eine Kampf-Fregatte erscheint in {{combatS}} der Fälle in Klasse S, ein Räuber in {{raiderS}}, eine organische Fregatte in {{organicS}}, weil sie nie eine schlechte Eigenschaft zieht.

## Eine gute Fregatte

Eine Fregatte arbeitet mit dem Wert ihres eigenen Typs, und ihre eigene Eigenschaft ist die einzige, die den großen Schub gibt. Zwei neue Fregatten eines Typs beginnen also dicht beieinander, und die anderen Eigenschaften machen den Unterschied. Achte in dieser Reihenfolge auf:

- keine schlechte Eigenschaft: Eine schlechte Eigenschaft bleibt, bis eine Stufe sie wegnimmt, und diese Stufe bringt nichts Neues;
- gute Eigenschaften auf ihrem eigenen Wert, je größer, desto besser;
- den Buchstaben zuletzt: Eine Klasse C kann mit drei oder vier Eigenschaften ankommen, eine gute von einer schlechten aufgehoben.

## Fregatteneigenschaften

Die guten Eigenschaften sind die auf dem eigenen Wert der Fregatte: Eine Kampf-Fregatte will Kampf-Eigenschaften, eine Industrie-Fregatte Industrie-Eigenschaften. Eine gute Eigenschaft fügt {{goodLow}} bis {{goodHigh}} hinzu, eine schlechte nimmt bis zu {{badHigh}} weg, und nur die Eigenschaft des Typs der Fregatte gibt {{own}}.

Die größten guten Eigenschaften kommen nur zu dem Typ, zu dem sie gehören: Kampf-Eigenschaften der größten Art zu Kampf-Fregatten und Räubern, Industrie-Eigenschaften zu Industrie-Fregatten und so weiter. Ein Typ zieht die kleinen Eigenschaften der anderen Werte seltener. Treibstoff-Eigenschaften sparen Treibstoff, Geschwindigkeits-Eigenschaften verkürzen eine Expedition, und eine Eigenschaft, die „Nie beschädigt“ sagt, hält die Fregatte auf jeder Expedition sicher. Eine Unterstützungs-Fregatte zieht nie eine schlechte Treibstoff-Eigenschaft, und ein Räuber zieht seine schlechten Eigenschaften nur auf Industrie, Handel und Erkundung.

<!-- widget:traits -->

Eine Stufe gibt einer Fregatte nie die Eigenschaft ihres Typs, also kommt der große Schub nur mit dem Typ.

### Belohnungsfregatten

Die drei Belohnungsfregatten kommen immer mit denselben fünf Eigenschaften.

<!-- widget:rewardTraits -->

## Sie losschicken

Schick Fregatten der Art der Expedition. Die meisten ihrer Ereignisse, {{ownLow}} bis {{ownHigh}}, sind von dieser Art, und bei diesen zählt der Wert der ganzen Flotte. Bei den anderen Ereignissen zählt er mit {{offKind}}, und auf einer Ausgeglichenen Expedition mit {{balanced}} bei jedem Ereignis. Jede Fregatte fügt ihren Wert bis zu {{statHigh}} hinzu, jeder passende Schub, ein Fregattenmodul, das ein [Raumschiffpilot](/guides/starship-pilots) verkauft, fügt {{boost}} hinzu, und die Flottenmodule deines Frachters multiplizieren die Summe, bis zu {{fleetHigh}}.

Jedes Ereignis würfelt 0 bis {{rollTop}} und addiert den Wert der Flotte; es geht gut, wenn es die Schwierigkeit des Ereignisses erreicht. Das erste Ereignis beginnt bei etwa {{startDifficulty}}, jedes spätere ist um {{stepDifficulty}} schwerer, jede Fregatte, die du schickst, fügt eins hinzu, und jede Expedition fügt allen ihren Ereignissen eine verborgene Schwierigkeit hinzu, eine von {{tiers}}. Wenn der Wert der Flotte die Schwierigkeit erreicht, geht das Ereignis immer gut; jeder fehlende Punkt nimmt eine Chance von {{faces}} weg. Darum scheitern die späten Ereignisse einer langen Expedition für eine schwache Flotte, und eine starke Flotte verdient am meisten auf den langen.

<!-- widget:success -->

Der Wert entscheidet nur, wie viele Ereignisse gut gehen, nicht, was sie bringen. Jedes Ereignis, das gut geht, zahlt eine Belohnung seiner Art; eines, das scheitert, zahlt nichts. Bis du {{easyUntil, plural, one {# Fregatte} other {# Fregatten}}} gekauft hast, sind Expeditionen leicht und zahlen weit weniger.

<!-- widget:rewards -->

Eine Geschwindigkeits-Eigenschaft verkürzt die Zeit: Jedes Ereignis dauert etwa {{eventHours, plural, one {# Stunde} other {# Stunden}}}, weniger einen Anteil für jeden Punkt Geschwindigkeit.

## Schaden und Verlust

Nur ein gescheitertes Ereignis beschädigt eine Fregatte, und erst, wenn du mehr als {{damageLow, plural, one {# Expedition} other {# Expeditionen}}} abgeschlossen hast; die Chance wächst bis {{damageRamp}}.

<!-- widget:damage -->

Die schwächste Fregatte in der Art des Ereignisses wird am ehesten getroffen. Eine Fregatte mit einer Eigenschaft, die „Nie beschädigt“ sagt, und eine organische Fregatte werden nie getroffen.

Der erste Treffer beschädigt die Fregatte, und du wählst, sie weitermachen zu lassen oder nach Hause zu schicken; nach Hause geschickt, zählt die Expedition für sie trotzdem. Ein zweiter Treffer, während sie beschädigt ist, zerstört sie: Sie ist für immer aus deiner Flotte verschwunden. Schick eine beschädigte Fregatte also nach Hause. Ist keine Fregatte mehr übrig, endet die Expedition sofort. Die Belohnungen, die sie gewonnen hat, behältst du immer.

Schaden ist keine schlechte Eigenschaft. Du reparierst ihn mit Ressourcen, und er fügt nie eine Eigenschaft hinzu oder entfernt eine.

## Stufen

Eine Fregatte steigt eine Stufe auf, wenn sie {{levels}} Expeditionen abgeschlossen hat, ob sie gut gingen oder nicht. Die Zahl der Erfolgreichen Gefechte auf ihrer Karte ist nur eine Zählung der Ereignisse, die gut gingen; sie bewegt die Stufe nicht.

Jede Stufe gibt {{levelPoints, plural, one {# Wertpunkt} other {# Wertpunkte}}} auf Kampf, Erkundung, Industrie und Handel und ändert höchstens eine Eigenschaft:

- hat die Fregatte eine schlechte Eigenschaft, geht eine davon, zufällig gewählt, und nichts tritt in dieser Stufe an ihre Stelle;
- hat sie keine und einen freien Platz, bekommt sie eine gute Eigenschaft aus der Liste ihres Typs, nie eine zweite Eigenschaft ihres Typs.

Eine Fregatte behält ihre schlechten Eigenschaften also, bis Stufen sie entfernen, eine pro Stufe, und der freie Platz wird von einer späteren Stufe gefüllt. Eine Fregatte kann S erreichen, wenn ihre schlechten Eigenschaften und die guten, die ihr fehlen, in die Stufen passen, die ihr bleiben; eine Fregatte, die du kaufst, hat schon einige verbraucht, eine für jede Eigenschaft, die sie über ihre eigene hinaus gezogen hat.

Der Ring auf der Karte füllt sich zu wenig: Er zählt die Expeditionen seit der letzten Stufe gegen die ganze Zahl der nächsten. Vertrau der Zahl der Expeditionen, nicht dem Ring.

<!-- widget:levels -->

## Preis

Der Preis einer Fregatte wird von ihrem Typ und ihrer Klasse bestimmt: ein Grundwert mit einer Streuung, mal einem Multiplikator ihrer Klasse.

<!-- widget:prices -->

Eine organische Fregatte zieht aus einer eigenen Liste und nie eine schlechte Eigenschaft: [Organische Fregatten](/guides/organic-frigates) sagt, wie du einen Wal rufst und die Art seiner Fregatte wählst.
