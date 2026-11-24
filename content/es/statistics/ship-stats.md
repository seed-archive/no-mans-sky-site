# Estadísticas de las naves

**¿Cuánto de fuerte puede ser una nave reclamada?** Depende del tipo de nave: un combatiente llega a {{damageFighterHigh}} de daño, un transportista a {{shieldHaulerHigh}} de escudo y una exótica a {{agileExoticHigh}} de maniobrabilidad, mientras que un interceptor marca {{hyperdriveInterceptorHigh}} de hiperturbo. Cada tipo de nave tiene estadísticas base, en porcentaje, para estas cuatro, salvo los exploradores, sin daño, y los combatientes, sin hiperturbo. Cada una se sortea por separado, dentro de un intervalo que fijan su [tipo de nave](/guides/ship-types) y su [clase de nave](/guides/ship-classes). Las tablas de abajo muestran lo que llega a tu hangar, como el número de una ficha desnuda: sin ningún módulo instalado y sin contar el cañón inicial. [¿Qué suerte tengo?](/tools/how-lucky-am-i) sitúa entre ellas una nave que hayas reclamado.

## Cómo se sortea una estadística

Una estadística se sortea como en [estadísticas de las multiherramientas](/guides/multitool-stats): en algún punto dentro del intervalo de su tipo y su clase.

Una nave tira dos veces. El pecio muestra una tirada. Cuando lo reclamas, la nave hace una segunda tirada y se queda con la mejor de las dos, estadística por estadística. Así que una nave reclamada nunca marca menos que su pecio, y a menudo marca más.

La segunda tirada viene con el nombre de la nave. Los pecios de un mismo tipo en un sistema que llevan un mismo nombre tienen una misma segunda tirada, y solo se diferencian en la tirada propia del pecio. Un sistema tiene solo unos pocos nombres por tipo, y uno para las exóticas. Los interceptores funcionan al revés: cada uno tiene un nombre propio, y todos los interceptores de un sistema comparten una segunda tirada.

<!-- widget:ranges -->

## Cómo leer la ficha

Las tablas de abajo son los números de la ficha de una nave, leídos mientras pilotas esa nave: la ficha se mueve con la nave que pilotas, el daño hasta 4 y la maniobrabilidad hasta 57,5. Un cañón inicial que funcione añade de 20 a 41 de daño encima de ellos.

## Daño

Los combatientes son los que mejor disparan: hasta {{damageFighterHigh}}, con una mediana de {{damageFighterMedian}}. Los siguen los interceptores con {{damageInterceptorMedian}}, luego las exóticas con {{damageExoticMedian}} y las solares con {{damageSolarMedian}}. Los transbordadores se quedan en {{damageShuttleHigh}} y los transportistas van los últimos, con una mediana de {{damageHaulerMedian}}. Los exploradores no tienen daño base.

La tirada del pecio para el daño es la que fijó su clase, como en [clases de las naves](/guides/ship-classes). Fuera de los sistemas piratas la clase S está en lo más alto de esa tirada, así que toda exótica y todo transbordador tienen casi su daño máximo. En un sistema pirata la clase S va de 0,15 a 0,20, así que un transportista o un combatiente de uno de ellos necesita la segunda tirada para mejorar.

<!-- widget:damage -->

## Escudo

Los transportistas son los que más tienen: de {{shieldHaulerLow}} a {{shieldHaulerHigh}}. Las exóticas vienen después con {{shieldExoticMedian}}, y todos los demás tipos quedan cerca de 200.

La tirada del pecio para el escudo apenas se mueve: una proporción cerca de 0,20 o 0,32, y cerca de 0,52 en un interceptor. La primera tirada fija un suelo, y solo la segunda tirada levanta una nave de él: ninguna nave marca cerca del fondo de su intervalo, y más de la mitad de los interceptores quedan justo en el suelo.

<!-- widget:shield -->

## Hiperturbo

Los interceptores marcan muy por encima del resto, de {{hyperdriveInterceptorLow}} a {{hyperdriveInterceptorHigh}}: su estadística es la más pequeña, pero actúa sobre 600 donde otros tipos tienen 100. Entre los demás, los exploradores van en cabeza con {{hyperdriveExplorerMedian}}, luego las exóticas con {{hyperdriveExoticMedian}}, los transportistas con {{hyperdriveHaulerMedian}}, las solares con {{hyperdriveSolarMedian}} y los transbordadores con {{hyperdriveShuttleMedian}}. Los combatientes no tienen hiperturbo base.

<!-- widget:hyperdrive -->

## Maniobrabilidad

Las exóticas son las que mejor giran, con una mediana de {{agileExoticMedian}} y un máximo de {{agileExoticHigh}}. Las siguen los combatientes con {{agileFighterMedian}} y las solares con {{agileSolarMedian}}. Los exploradores y los interceptores quedan cerca de {{agileInterceptorMedian}}, los transbordadores en {{agileShuttleMedian}} y los transportistas los últimos, en {{agileHaulerMedian}}.

<!-- widget:agile -->

## Encontradas y mejoradas

Estas tablas recogen naves encontradas en clase S. Una nave encontrada en una clase inferior y mejorada en una estación no está en ellas.

Lo que sí te da una mejora está en [cómo mejorar una nave](/guides/ship-upgrades).
