import React from 'react';
import AciertaJ from '@/components/games/aciertaO/AciertaJ';
import MenuGames from '@/components/games/MenuGames';
import HistorialGame from '@/components/games/HistorialGame';
import LogroGame from '@/components/games/LogroGame';
import {resultConfigAcierta} from '@/constants/games/constants/resultsCofig'
  
const idJuego = "juegoA2"
const indicaciones = "Acierta la mayor cantidad de operaraciones aritmeticas, en el tiempo que selecciones.";

const AciertaScreen: React.FC = () => {
  return (
    <MenuGames
    title="Acierta la operación!!!"
    playComponent={<AciertaJ />}
    historialComponent={<HistorialGame idJuego={idJuego} resultConfig={resultConfigAcierta} />}
    achievementsComponent={<LogroGame idJuego={idJuego} />}
    indicaciones={indicaciones} // Agregamos el prop indicaciones aquí
  />
  );
};

export default AciertaScreen;
