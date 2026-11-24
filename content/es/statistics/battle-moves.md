# Movimientos de batalla

**¿Cómo cambias los movimientos de batalla de una criatura?** Con modificaciones genéticas. Una criatura tiene cinco movimientos, uno en cada espacio. Cuando sus tres estadísticas llegan al nivel {{statCap}}, cada modificación genética puede mutar una habilidad: el espacio vuelve a sortear de su propia lista, y la tirada nunca devuelve el movimiento que tenía.

## Modificaciones genéticas

Las batallas en la Holo-Arena llenan el Progreso de la mutación de una criatura, y cada barra llena es una modificación genética. Una criatura gasta primero sus modificaciones en sus estadísticas, Combate, Agilidad y Salud, un nivel por modificación, hasta el nivel {{statCap}} en cada una. Eso hace {{fullPotential, plural, one {# modificación} other {# modificaciones}}}, y el juego llama al resultado potencial genético máximo. Hasta entonces, Capacidad de mutación sigue cerrada, con la línea «No se puede editar hasta que la criatura haya alcanzado su máximo potencial».

Las modificaciones siguen llegando después. La barra se alarga con cada modificación que una criatura ha ganado, desde {{firstEdit}} de progreso para la primera hasta {{lastEdit}} a partir de la modificación {{lastFrom}}, y ahí se queda. Una modificación ganada pronto espera sin gastar, así que una criatura puede llegar a su potencial máximo con modificaciones a mano para sus movimientos.

<!-- widget:edits -->

Lo que añade un nivel de una estadística está en [estadísticas de las criaturas](/guides/creature-stats).

## Piensos retrovirales

![Pienso retroviral](/creatures/retroviral-pellet.webp)

Un pienso retroviral es una modificación genética en una pastilla. Dáselo a un compañero y le añade una modificación sin gastar, lo mismo que una barra llena de Progreso de la mutación, así que, después del potencial máximo, paga una mutación de un movimiento. No elige un movimiento por sí solo: la mutación se sortea como cualquier otra.

Una batalla ganada puede soltar uno, sobre todo el desafío diario de Iteración: Oceanus, {{dailyPellet}} de las veces, y un campeón del sistema, {{championPellet}}. La sección de la Liga Arena de abajo lista cada batalla.

## La Liga Arena

Las batallas de criaturas se libran en las Holo-Arenas, y la Liga Arena las organiza. Un jugador se la encuentra en este orden.

1. **Iteración: Oceanus.** Un coleccionista en la Holo-Arena a bordo de la Anomalía espacial. Enseña la primera batalla y entrega un pienso retroviral, y luego una invitación a la Holo-Arena.
2. **Contrincantes.** Una Invitación del contrincante, una de las [cartas de navegación](/guides/charts) del juego, marca una Holo-Arena en un planeta cercano. Vence al contrincante y la siguiente invitación llega sola.
3. **El campeón.** Después de cada {{challengers, plural, one {# victoria} other {# victorias}}} ante contrincantes, la siguiente invitación es en cambio una Invitación del campeón: el campeón del sistema, que lucha con criaturas de los planetas de ese sistema. Vence al campeón y una nueva Invitación del contrincante vuelve a empezar la ronda, así que son {{challengers, plural, one {# contrincante} other {# contrincantes}}} y luego un campeón, mientras sigas jugando.
4. **Oceanus otra vez.** Si se lo pides, Oceanus te da una batalla de entrenamiento, que paga poco pero siempre entrega una Invitación del contrincante. Cada día organiza también un desafío diario difícil con el mismo equipo para cada Viajero; es el que más nanites paga y el que mejor probabilidad de pienso da.

<!-- widget:pellets -->

Las otras mesas de la lista no necesitan invitación: cada una está en un edificio propio. Una estación espacial o un [Puesto avanzado del espacio profundo](/guides/deep-space-outpost) da un pienso {{stationPellet}} de las veces; un puesto de comercio, el mismo {{challengerPellet}} que un contrincante, y un asentamiento, ninguno.

### Medallas y sus huevos

Las victorias cuentan para cinco medallas del Catálogo, cada una con diez rangos y un título por rango. En el rango más alto de cada una, las Recompensas de la Liga Arena de Oceanus dan un huevo gratis. Cada uno eclosiona con los tres grados en S y uno de los conjuntos fijos de abajo. {{dailyWins, plural, one {# desafío diario ganado trae} other {# desafíos diarios ganados traen}}} el Tanque de camarones errantes; {{championWins, plural, one {# campeón derrotado} other {# campeones derrotados}}}, el Cangrejo Aeron, y {{battleWins, plural, one {# batalla ganada} other {# batallas ganadas}}}, el Geno-camarón.

<!-- widget:medals -->

## Huevos de tus compañeros

Un compañero puede poner un huevo, un Huevo de compañero, y el huevo lleva los grados de batalla de su progenitor. Lo que el juego le pide al progenitor:

- **Alimentado y acariciado.** El hambre y la soledad, las dos en {{eggMood}} o menos; la tarjeta dice lo que falta («Tiene hambre», «Se siente triste», «Requiere nutrición adicional»). La confianza no está entre los motivos que da la tarjeta.
- **En su clima de origen**, y crecido al menos {{growDays, plural, one {# día} other {# días}}} si él mismo salió de un huevo.
- **Un huevo cada vez.** {{eggHours, plural, one {# hora} other {# horas}}} entre dos huevos, ningún otro huevo tuyo cerca y un espacio de huevo libre.

El huevo eclosiona {{hatchHours, plural, one {# hora} other {# horas}}} después. Antes de eso, el Secuenciador de huevos de la Anomalía espacial puede resecuenciarlo con ingredientes: el tamaño, los rasgos, el color y los accesorios pueden cambiar, pero los grados de batalla y los movimientos quedan fuera de su alcance.

Los grados de batalla vienen de la especie, y el huevo los copia, así que una cría tiene las letras de su progenitor: una criatura con todo en S pone huevos con todo en S, y la criatura de un huevo de medalla, el Tanque de camarones errantes entre ellas, conserva sus tres S en sus huevos. Sus cinco movimientos se sortean de nuevo al eclosionar, de la misma tirada de la especie, así que una cría empieza con los movimientos que su progenitor tuvo al principio, no con los mutados desde entonces.

Cada huevo que incubas cuenta para la medalla Incubar huevos: {{hatchMedal, plural, one {# huevo incubado trae} other {# huevos incubados traen}}} el Cuadrúpedo corrupto.

## Los cinco espacios

Todas las criaturas sortean de las mismas listas, sea cual sea su afinidad; solo sus movimientos de su propia afinidad toman esa afinidad. Hay {{moves, plural, one {# movimiento} other {# movimientos}}} en los cinco espacios, y cada espacio tiene una tarea propia.

Una criatura nueva sortea cada espacio según los pesos de su lista: eso es Probabilidad. Una mutación sortea de nuevo de la misma lista, pero salta el movimiento que tiene el espacio, así que un movimiento pesado que se tenga hace más probables los demás, y En una mutación muestra lo mínimo y lo máximo que puede tener un movimiento. Para conseguir un movimiento, sigue mutando ese espacio; un movimiento ligero requiere muchos intentos.

### Espacio 1: golpes simples

El golpe de la propia afinidad de la criatura sale {{ownHit}} de las veces, y es el que conviene conservar. Un golpe de otra afinidad solo vale la pena contra las criaturas frente a las que es fuerte, y el golpe físico nunca es fuerte contra nada.

<!-- widget:moves1 -->

### Espacio 2: ataques más pesados

Los dos movimientos salvajes casi no sirven: son físicos, con media probabilidad extra de fallar. Aluvión da tres golpes en un turno; el golpe y herida y el golpe de varios turnos reparten su daño en turnos posteriores, y una pelea puede acabar antes.

<!-- widget:moves2 -->

### Espacio 3: ataques con trampa

Todos los movimientos de aquí pesan lo mismo, así que cada uno tiene la misma probabilidad. Evita el golpe temerario que cura al enemigo, y ten cuidado con los dos que dañan a tu propia criatura. Los jugadores cuentan la eliminación de ventajas, que hace Purgar, entre las mejores opciones.

<!-- widget:moves3 -->

### Espacio 4: curas y escudos

La Cura a secas llega en el turno en que la usas; la cura con el tiempo y la cura retardada pagan más tarde, y Absorber cura solo mientras el enemigo golpea.

<!-- widget:moves4 -->

### Espacio 5: trucos

Los jugadores valoran Aturdir, que hace perder un turno al enemigo, y Cambiar afinidad, que convierte al enemigo en la afinidad a la que tu criatura golpea con más fuerza, por encima del resto. Revivir no revive: actúa como el sacrificio para defensa.

<!-- widget:moves5 -->

## Nombres

El juego nombra un movimiento por su tipo y por la afinidad de la criatura, así que un mismo movimiento muestra un nombre distinto en una criatura de Fuego que en una de Escarcha. Un tipo puede tener más de un nombre, y cuál muestra una criatura es fijo para esa criatura: conserva sus nombres para siempre, y dos criaturas de una misma afinidad pueden mostrar nombres distintos.

<!-- widget:names -->

## Conjuntos fijos

Los cinco huevos de medalla siempre tienen los mismos cinco movimientos, uno en cada espacio, sin lista de la que sortear. Una mutación de uno de sus espacios cambia el movimiento del conjunto por el golpe simple de la propia afinidad de la criatura, y la siguiente mutación de ese espacio devuelve el movimiento del conjunto, así que un espacio suyo solo alterna entre los dos. Donde el movimiento del conjunto ya es ese golpe simple, como en el primer espacio del Cangrejo Aeron y del Cuadrúpedo corrupto, una mutación gasta la modificación y deja el movimiento como estaba.

<!-- widget:kits -->

Lo que cultivas, cocinas y refinas por el camino es el último grupo de guías, y empieza con la [agricultura](/guides/farming).
