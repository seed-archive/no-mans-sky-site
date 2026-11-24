# Cargueros

**¿Cómo consigues un carguero capital de clase S?** Rescata uno de un ataque pirata en un sistema pirata, antes de tener un carguero. Cada intento vuelve a sortear la clase, y un sistema pirata da clase S {{pirateS}} de las veces, más que cualquier otro sistema.

## Normal y capital

El juego tiene dos tipos de carguero. Un carguero normal es la nave más pequeña que ves en las flotas de un sistema, y lo compras. Un carguero capital es el gigante, y solo lo consigues rescatándolo de una batalla. Aparte de dónde lo consigues y de su aspecto, el tipo fija una cosa: los espacios con los que empieza. Un carguero normal es pequeño casi siempre y mediano de vez en cuando; se lo compras a su capitán. Un carguero capital es mediano o grande, mitad y mitad, el mismo en cada batalla de un sistema, y llega a partir de tu tercera batalla. El tamaño fija los espacios con los que empieza un carguero, no el máximo que puede tener.

Todo lo demás sigue a la clase, y un carguero conserva su clase para siempre: ninguna terminal, objeto ni recompensa la mejora. Lo que crece es el inventario. Un Mamparo de carga abre un espacio, general o de tecnología, hasta el máximo que permite la clase, y ese máximo es el mismo para los dos tipos.

<!-- widget:limits -->

Así que un pequeño carguero normal de clase C y un gigantesco carguero capital de clase C se detienen ambos en {{generalC, plural, one {# espacio} other {# espacios}}} y {{techC}} de tecnología, y solo una clase S de cualquiera de los dos tipos llega a {{generalS}} y {{techS}}. El hiperturbo y las estadísticas de la flota también vienen de la clase, y todo carguero lleva 6 naves en su hangar. Si quieres lo máximo que puede hacer un carguero, quieres la clase S; si quieres el gigante, quieres uno capital.

## La batalla al llegar

El juego cuenta tu tiempo de juego y tus saltos desde la última batalla. Cuando han pasado {{hours, plural, one {# hora} other {# horas}}} y {{warps, plural, one {# salto} other {# saltos}}}, toca una batalla, y el siguiente salto la trae: los piratas atacan un carguero cuando llegas. Nunca llega en un sistema inexplorado ni en un sistema de anomalía, como uno con una Interfaz del Atlas o un agujero negro, ni con el combate espacial desactivado. Rescata el carguero y habla con su capitán. Mientras no tengas ningún carguero, el capitán te da ese gratis. O acepta en su lugar el pago: un Mamparo de carga, nanites y reputación.

Quién ataca depende de ti y del sistema. Sin un carguero propio, los piratas envían cazas. Cuando ya tienes uno, pueden enviar un acorazado, cuya destrucción paga uno de los [módulos de carguero](/guides/freighter-modules), y en un sistema pirata siempre lo hacen. La batalla que trae un sistema se sortea a partir del propio sistema, así que es la misma cada vez que toca allí. Algunos sistemas también traen un acorazado en cada llegada, toque batalla o no, y [acorazados](/guides/dreadnoughts) los tiene.

<!-- widget:battles -->

Tus dos primeras batallas rescatan un carguero normal. A partir de la tercera, el carguero que rescatas es uno capital. Una batalla cuenta en el momento en que empieza: gánala y rechaza el carguero, y sigue siendo una de tus dos, y también lo es una batalla contra un acorazado. Tener un carguero en un sistema pirata se salta esa regla: incluso la primera batalla allí es un acorazado.

## Una nave, muchas clases

Un sistema tiene un carguero capital: cada batalla allí rescata la misma nave, con la misma forma y el mismo tamaño. Solo su clase se vuelve a sortear en cada intento, a partir de un número que el juego le da a la nave cuando aparece, no a partir del sistema. Nadie puede saber la clase antes de la batalla. Así que busca una forma que te guste con la [página de cargueros capitales](/tools/capital-freighter-finder), guarda la partida en un sistema vecino con la batalla pendiente, salta allí y vuelve a cargar esa partida hasta que la nave llegue en S.

## Riqueza y clase

<!-- widget:classes -->

En un sistema pirata, un intento sale en S {{pirateS}} de las veces y en C {{pirateC}}. Cada intento es un sorteo nuevo: veinte fallos seguidos no hacen más probable el siguiente intento. Así que la suerte se reparte mucho. La mitad de los jugadores consigue la clase S en {{pirateHalf, plural, one {# intento} other {# intentos}}} o menos, nueve de cada diez en {{pirateNine}} o menos, y uno de cada cien, con mala suerte, necesita más de {{pirateAll}}. De media hacen falta {{pirateMean}}.

<!-- widget:tries -->

Un sistema de riqueza alta da S solo {{highS}} de las veces, así que la mitad de los jugadores necesita {{highHalf, plural, one {# intento} other {# intentos}}}, y un sistema de riqueza baja nunca da S. Así que vuela primero a un sistema pirata: más o menos {{pirateOneIn}} sistemas lo es, marcado con una calavera en el mapa galáctico.

## ¿Se puede comprar una clase S?

Sí, uno normal. Un sistema tiene tres cargueros normales propios, y sus flotas vuelan con esos tres. La página de [cargueros normales](/tools/freighter-finder) muestra todas las formas que puede tener un carguero normal. La clase de cada carguero se sortea a partir de la [riqueza](/guides/economy) del sistema cada vez que llega una flota: la clase S es {{pirateS}} de ellos en un sistema pirata, {{highS}} con riqueza alta, {{mediumS}} con riqueza media, y nunca con riqueza baja. Así que una flota no es la misma en cada visita, y volver a un mismo sistema muestra clases nuevas.

El precio crece con los espacios y la clase. El juego parte de {{costBase, plural, one {# millón de unidades} other {# millones de unidades}}} por {{costSlots, plural, one {# espacio} other {# espacios}}}, multiplica por los espacios divididos entre {{costSlots}} elevados a {{costPower}}, y suma {{bonusB}} para la clase B, {{bonusA}} para la A y {{bonusS}} para la S. Un carguero pequeño de clase S cuesta {{smallS}} millones de unidades, uno grande {{largeS}} millones.

<!-- widget:prices -->

Un carguero capital nunca está a la venta en una flota. Solo llega de una batalla, gratis mientras no tengas ningún carguero, y puedes volver a intentarlo desde una partida guardada. Así que, a menos que quieras el aspecto de uno normal, repite la batalla.

## Espacios supercargados

Los espacios supercargados de un carguero están en su inventario de tecnología. La clase fija cuántos: uno en C, hasta cuatro en S.

<!-- widget:supercharged -->

Todos están en las tres filas superiores del inventario de tecnología, y dónde están pertenece a la nave, no al intento. Cada intento con el carguero capital de un sistema los pone en los mismos lugares: la clase C muestra el primero de cuatro lugares, la B los dos primeros, la A los tres primeros y la S los cuatro. Un carguero normal conserva sus lugares de la misma manera, cada uno de los tres de un sistema los suyos.

Los lugares nunca se mueven. Un Mamparo de carga abre un espacio pero no mueve uno supercargado, y como la clase nunca cambia, tampoco cambia la cantidad. Un espacio supercargado puede estar en un espacio que sigue cerrado; funciona en cuanto un Mamparo de carga lo abre.

## Módulos de mejora

Ningún comerciante vende un módulo de mejora de carguero. Un acorazado pirata destruido da uno de clase S, y un carguero abandonado uno de cualquier clase. Qué sube cada módulo, y cada lugar que da uno, está en [tecnología de cargueros](/guides/freighter-technology); cómo conseguir los de clase S de los acorazados una y otra vez está en [módulos de carguero](/guides/freighter-modules).

Cuando ya tienes un carguero, un sistema pirata trae otra batalla: [acorazados](/guides/dreadnoughts).
