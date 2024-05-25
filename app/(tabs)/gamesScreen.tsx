import SubMenuComponent from '@/components/SubMenuComponent';
import React from 'react';

const gamesScreen:React.FC = () => {
  return (
    <SubMenuComponent
    title="Menu de juegos"
    items={[
      { href: "games/adivina", text: "Adivina el juego", color: "#3582ab", iconName: "help-circle" },
      { href: "games/acierta", text: "Acierta números", color: "#6EB5FF", iconName: "checkmark" }
    ]}
  />
  );
}
export default gamesScreen
