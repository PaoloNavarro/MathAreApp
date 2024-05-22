import React from 'react';
import AciertaJ from '@/components/games/aciertaO/AciertaJ';
import MenuGames from '@/components/games/MenuGames';
import HistorialGame from '@/components/games/HistorialGame';
import LogroGame from '@/components/games/LogroGame';
import {resultConfigAcierta} from '@/constants/games/constants/resultsCofig'
  
const idJuego = "juegoA2"

const AciertaScreen: React.FC = () => {
  return (
    <MenuGames
      title="Adivina el número!!!"
      playComponent={<AciertaJ />}
      historialComponent={<HistorialGame idJuego={idJuego} resultConfig={resultConfigAcierta} />    }
      achievementsComponent={<LogroGame idJuego={idJuego} />
    }
    />
  );
};

export default AciertaScreen;
