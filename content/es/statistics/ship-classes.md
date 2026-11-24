# Clases de las naves

**¿Cómo encuentras una nave accidentada de clase S?** Busca en un sistema pirata: {{pirateS}} de sus pecios son de clase S, frente a {{highS}} con riqueza alta y ninguno con riqueza baja. O busca una exótica: son de clase S {{exoticS}} de las veces. Los transportistas lo son {{haulerS}} de las veces, y los exploradores casi nunca: {{explorerOneIn}}. Una sola tirada fija a la vez el tipo y la clase de una nave, así que cada tipo se inclina hacia las clases que comparten su parte de la tirada. Las [naves accidentadas](/ship) de la base de datos vienen con los glifos de portal de cada pecio.

## Qué fija la clase

La [riqueza](/guides/economy) reparte la tirada en clases, como para las [clases de las multiherramientas](/guides/multitool-classes). La riqueza baja no tiene clase S. La media da {{mediumS}}, la alta {{highS}} y la pirata {{pirateS}}, con {{pirateC}} en clase C. La fuente no importa.

<!-- widget:wealth -->

<!-- widget:sources -->

## Por qué se inclina un tipo de nave

El juego tira una vez, entre 0 y 1, y lee de esa tirada tanto la clase como el tipo de nave.

<!-- widget:classBands -->

<!-- widget:hullBands -->

Los transportistas quedan abajo en la tirada, donde la clase es C: {{haulerC}} de ellos. Los combatientes quedan justo encima, con {{fighterC}}. Los exploradores ocupan el centro, clase C o B, y {{explorerB}} son B. Los transbordadores quedan arriba, así que solo {{shuttleC}} son de clase C.

Dos tipos quedan fuera de esto. Un pecio centinela es un interceptor diga lo que diga la tirada, así que su clase sigue solo a la riqueza. Una solar sustituye a otro tipo, sobre todo a un transbordador, así que se reparte más. Qué tipos salen de qué sistema está en [tipos de nave](/guides/ship-types).

<!-- widget:hulls -->

## Por qué las exóticas son de clase S

Una exótica necesita lo más alto de la tirada, por encima de 0,997. Con riqueza media y alta eso es clase S, así que toda exótica allí es de clase S. La riqueza baja no tiene S, así que su parte alta es clase A. Las clases de un sistema pirata terminan en 0,20 y todo lo que pasa de ahí cae en C. El {{exoticS}} es simplemente la proporción de exóticas en los sistemas de riqueza media y alta.

<!-- widget:exotic -->

## Qué naves son de clase S

Con riqueza media y alta, la clase S es lo más alto de la tirada, así que {{mediumShuttleS}} o más de esos pecios son transbordadores, y la mayoría del resto, exóticas. En un sistema pirata la clase S va de 0,15 a 0,20, que es terreno de transportistas y combatientes: {{pirateHaulerS}} y {{pirateFighterS}}. Esa tirada baja también debilita su daño, como muestra [estadísticas de las naves](/guides/ship-stats).

Un sistema tiene una lista corta de naves. Cuando la tirada pide una solar y la lista no tiene ninguna, el pecio toma una nave de toda la lista. Así llega un explorador a la clase S, y un combatiente fuera de un sistema pirata.

<!-- widget:mix -->

La clase abre el intervalo, y las tiradas propias del pecio lo llenan: [estadísticas de las naves](/guides/ship-stats) muestra lo que llega a tu hangar.
