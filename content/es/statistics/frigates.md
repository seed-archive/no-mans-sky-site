# Fragatas

**¿Cómo consigues una fragata de clase S?** Cómprala en las flotas de un sistema, y sigue buscando. Los rasgos de una fragata salen del lugar donde vuela, así que cada flota nueva trae fragatas nuevas. La clase S necesita cuatro rasgos buenos además del suyo propio, algo que les pasa a {{atMostS}} de ellas como mucho. O toma una más débil y envíala fuera: una fragata gana [niveles](#levels) en las expediciones, y estos le quitan los rasgos malos y le añaden buenos.

## Los tipos

Cinco tipos vuelan en las flotas de cualquier sistema, todos igual de probables: Combate, Exploración, Industrial, Comercio y Apoyo. Los piratas traen un sexto, el Saqueador. Los demás vienen de una ballena cósmica o como recompensas de expedición.

<!-- widget:kinds -->

## Comprar una

Tu flota admite {{fleet, plural, one {# fragata} other {# fragatas}}}. {{sale}} de las fragatas que vuelan con una flota están a la venta. Las fragatas que recorren un sistema en grupos propios nunca lo están.

El mismo sistema muestra fragatas distintas cada vez que llega una flota, así que puedes seguir buscando sin marcharte.

## Saqueadores

Los Saqueadores solo vuelan con un [acorazado](/guides/dreadnoughts) pirata. Se ponen a la venta en cuanto la batalla ha pagado sus recompensas, terminara como terminara, con las mismas reglas que las demás fragatas.

## Rasgos y clase

Toda fragata empieza con el rasgo de su tipo, como Especialista en combate, y con estadísticas principales dentro de los intervalos de su tipo.

<!-- widget:starts -->

Después puede sacar más rasgos: cada ronda continúa {{extra}} de las veces, y un rasgo puede ser bueno o malo. Una fragata tiene cinco espacios de rasgo, su propio rasgo y cuatro más. Un rasgo suma a una estadística, y uno malo resta; ninguna estadística baja de {{statLow}} ni sube de {{statHigh}}. Cada rasgo, con lo que hace y qué tipos lo sacan, está más abajo en Rasgos de fragata.

<!-- widget:strengths -->

La letra de la clase cuenta los rasgos: los buenos, incluido el suyo propio, menos los malos, menos dos. Así que clase S significa su propio rasgo y cuatro buenos, y un rasgo malo anula uno bueno en la letra.

<!-- widget:odds -->

Una fragata de Combate aparece en clase S {{combatS}} de las veces, un Saqueador {{raiderS}}, una fragata orgánica {{organicS}}, porque nunca saca un rasgo malo.

## Una buena fragata

Una fragata trabaja con la estadística de su propio tipo, y su propio rasgo es el único que da la gran bonificación. Así que dos fragatas nuevas de un mismo tipo empiezan parecidas, y los demás rasgos marcan la diferencia. Busca, en este orden:

- ningún rasgo malo: un rasgo malo se queda hasta que un nivel lo quita, y ese nivel no trae nada nuevo;
- rasgos buenos en su propia estadística, cuanto más grandes, mejor;
- la letra, lo último: una clase C puede llegar con tres o cuatro rasgos, uno bueno anulado por uno malo.

## Rasgos de fragata

Los rasgos buenos son los de la propia estadística de la fragata: una fragata de Combate quiere rasgos de Combate, una fragata Industrial, rasgos Industriales. Un rasgo bueno suma de {{goodLow}} a {{goodHigh}}, uno malo resta hasta {{badHigh}}, y solo el rasgo del tipo de la fragata da {{own}}.

Los rasgos buenos más grandes solo llegan al tipo al que pertenecen: los rasgos de Combate del tipo más grande a las fragatas de Combate y a los Saqueadores, los Industriales a las fragatas Industriales, y así sucesivamente. Un tipo saca con menos frecuencia los rasgos pequeños de las otras estadísticas. Los rasgos de combustible ahorran combustible, los rasgos de velocidad acortan una expedición, y un rasgo que dice Nunca se daña mantiene a salvo a la fragata en cada expedición. Una fragata de Apoyo nunca saca un rasgo malo de combustible, y un Saqueador solo saca sus rasgos malos en Industrial, Comercio y Exploración.

<!-- widget:traits -->

Un nivel nunca le da a una fragata el rasgo de su tipo, así que la gran bonificación solo llega con el tipo.

### Fragatas de recompensa

Las tres fragatas de recompensa siempre llegan con los mismos cinco rasgos.

<!-- widget:rewardTraits -->

## Enviarlas fuera

Envía fragatas del tipo de la expedición. La mayoría de sus sucesos, de {{ownLow}} a {{ownHigh}}, son de ese tipo, y en ellos cuenta la estadística de toda la flota. En los demás sucesos cuenta al {{offKind}}, y en una expedición Equilibrada al {{balanced}} en cada suceso. Cada fragata suma su estadística hasta {{statHigh}}, cada bonificación que coincide, un módulo de fragata que vende un [Piloto de nave](/guides/starship-pilots), suma {{boost}}, y los módulos de flota de tu carguero multiplican la suma, hasta {{fleetHigh}}.

Cada suceso tira de 0 a {{rollTop}} y suma la estadística de la flota; sale bien si llega a la dificultad del suceso. El primer suceso empieza cerca de {{startDifficulty}}, cada uno posterior es {{stepDifficulty}} más difícil, cada fragata que envías suma uno, y cada expedición suma una dificultad oculta, una de {{tiers}}, a todos sus sucesos. Cuando la estadística de la flota llega a la dificultad, el suceso siempre sale bien; cada punto que falta quita una posibilidad entre {{faces}}. Así que los últimos sucesos de una expedición larga fallan para una flota débil, y una flota fuerte rinde más en las largas.

<!-- widget:success -->

La estadística solo decide cuántos sucesos salen bien, no lo que traen. Cada suceso que sale bien paga una recompensa de su tipo; uno que falla no paga nada. Hasta que hayas comprado {{easyUntil, plural, one {# fragata} other {# fragatas}}}, las expediciones son fáciles y pagan mucho menos.

<!-- widget:rewards -->

Un rasgo de velocidad recorta el tiempo: cada suceso dura unas {{eventHours, plural, one {# hora} other {# horas}}}, menos una parte por cada punto de velocidad.

## Daños y pérdida

Solo un suceso fallido daña una fragata, y solo cuando has terminado más de {{damageLow, plural, one {# expedición} other {# expediciones}}}; la probabilidad crece hasta {{damageRamp}}.

<!-- widget:damage -->

La fragata más débil en el tipo del suceso es la que tiene más probabilidades de recibir el golpe. Una fragata con un rasgo que dice Nunca se daña y una fragata orgánica nunca reciben golpes.

El primer golpe daña la fragata, y tú eliges si dejarla seguir o enviarla a casa; enviada a casa, sigue contando la expedición. Un segundo golpe mientras está dañada la destruye: desaparece de tu flota para siempre. Así que envía a casa una fragata dañada. Si no queda ninguna fragata, la expedición termina enseguida. Siempre conservas las recompensas que ganó.

Los daños no son un rasgo malo. Los reparas con recursos, y nunca añaden ni quitan un rasgo.

## Niveles

Una fragata gana un nivel cuando ha terminado {{levels}} expediciones, tanto si salieron bien como si no. El número de Encuentros victoriosos de su tarjeta es solo un recuento de los sucesos que salieron bien; no mueve el nivel.

Cada nivel da {{levelPoints, plural, one {# punto} other {# puntos}}} de estadística en Combate, Exploración, Industrial y Comercio, y cambia un rasgo como mucho:

- si la fragata tiene un rasgo malo, uno de ellos se va, elegido al azar, y nada ocupa su lugar en ese nivel;
- si no tiene ninguno y tiene un espacio libre, gana un rasgo bueno de la lista de su tipo, nunca un segundo rasgo de su tipo.

Así que una fragata conserva sus rasgos malos hasta que los niveles los quitan, uno por nivel, y el espacio libre lo llena un nivel posterior. Una fragata puede llegar a S si sus rasgos malos y los rasgos buenos que le faltan caben en los niveles que le quedan; una fragata que compras ya ha gastado algunos, uno por cada rasgo que sacó además del suyo propio.

El anillo de la tarjeta se queda corto: cuenta las expediciones desde el último nivel frente al total del siguiente. Fíate del recuento de expediciones, no del anillo.

<!-- widget:levels -->

## Precio

El precio de una fragata lo fijan su tipo y su clase: una base con un margen, por un multiplicador de su clase.

<!-- widget:prices -->

Una fragata orgánica saca rasgos de una lista propia y nunca un rasgo malo: [fragatas orgánicas](/guides/organic-frigates) dice cómo llamar a una ballena y elegir el tipo de su fragata.
