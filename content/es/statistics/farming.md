# Cultivo

**¿Qué planta de cultivo da más dinero?** El {{best}}: unas {{bestDay}} unidades por planta y día, vendido en una estación espacial. Los Brotes de NipNip se venden de {{nipStationLow}} a {{nipStationHigh}} veces su valor, pero crecen más despacio.

## Las plantas

Una base cultiva {{plants, plural, one {# planta de cultivo} other {# plantas de cultivo}}}. Cada una da una cosecha fija cuando está madura, y la cosecha se vende en un terminal de comercio. La tabla va según lo que gana una planta en un día de crecimiento, cosechada en cuanto madura.

<!-- widget:plants -->

Todas las plantas menos el Equinocactus necesitan el [guante NBQ](/guides/exosuit-modules#every-exosuit-module) para cosecharlas, un módulo del exotraje que fabricas tú. Las plantas que dan una pila de un recurso (Cristal de escarcha, Bulbo estelar, Moho fúngico, Raíz de gamma, Hecesio, Mordita, Solanio, Carne de cactus) valen poco para vender; son para fabricar y refinar.

## Cuánto plantar

Recolectar es mantener pulsada la tecla de interactuar, {{harvestSeconds}} de segundo por planta, así que una hora pulsándola recoge unas {{plantsAnHour, plural, one {# planta} other {# plantas}}}; el paso hasta la planta siguiente va aparte. No plantes más de lo que puedes recoger antes de que las primeras vuelvan a madurar: un Huésped de gravitino madura en {{gravitinoGrowth}}, así que unas {{gravitinoPlants, plural, one {# planta llena} other {# plantas llenan}}} una ronda, que valen unas {{gravitinoCrop}} unidades a precio completo. El NipNip madura en {{nipnipGrowth}}: {{nipnipPlants, plural, one {# planta} other {# plantas}}}, unas {{nipnipCrop}} unidades. Una cosecha tan grande solo se vende a precio completo repartida entre muchas estaciones, como se explica más abajo, y vender lleva tiempo además de eso.

## Dónde vender

Una estación espacial paga más que un terminal de un planeta o de un carguero. Cada sistema tiene su propio precio, así que la misma cosecha se vende algo más cara en un sistema que en el siguiente.

Vender baja el precio de lo que vendes, solo en ese terminal. Para un producto como las Bolas de gravitino, cada {{productUnits, plural, one {# unidad vendida quita} other {# unidades vendidas quitan}}} {{productDrop}} del multiplicador; para un recurso en pila, cada {{substanceUnits, plural, one {# unidad quita} other {# unidades quitan}}} {{substanceDrop}}. El precio se recupera despacio: lo que vale una unidad por minuto, en el caso de un producto. Así que una cosecha grande se vende mejor repartida entre varias estaciones.

Los Brotes de NipNip son de contrabando. Fuera de un sistema pirata se venden con el recargo del contrabandista, {{smuggler}} veces: de {{nipStationLow}} a {{nipStationHigh}} veces su valor en una estación espacial, de {{nipTerminalLow}} a {{nipTerminalHigh}} veces en un terminal de un planeta. En un sistema pirata se venden cerca de su valor.

## Una cosecha frente a un interceptor accidentado

Un interceptor centinela reclamado de clase C se vende por entre {{interceptorLow}} y {{interceptorHigh}} unidades, según sus espacios de carga, como muestra [precios de los interceptores](/guides/interceptor-prices). Un interceptor reclamado se vende por tanto como de cien a varios cientos de cosechas de Huésped de gravitino, así que cultivar compensa a quien construye una granja grande y vende en muchas estaciones; [interceptores centinela](/guides/interceptors) dice dónde están los pecios.

Lo que vale más una cosecha una vez cocinada está en [platos que más se venden](/guides/best-selling-dishes).
