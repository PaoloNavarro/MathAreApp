import React from 'react';
import AdivinaJ from '@/components/games/adivinaN/AdivinaJ';
import MenuGames from '@/components/games/MenuGames';
import HistorialGame from '@/components/games/HistorialGame';
import LogroGame from '@/components/games/LogroGame';
import {resultConfigAdivina} from '@/constants/games/constants/resultsCofig'

const idJuego="juegoA1";
const indicaciones = "Adivina el numero en el rango y tiempo que selecciones.";

const AdivinaScreen: React.FC = () => {
  return (
    <MenuGames
      title="Adivina el número!!!"
      playComponent={<AdivinaJ />}
      historialComponent={<HistorialGame idJuego={idJuego} resultConfig={resultConfigAdivina} />}
      achievementsComponent={<LogroGame idJuego={idJuego} />}
      indicaciones={indicaciones}
    />
  );
};

export default AdivinaScreen;
