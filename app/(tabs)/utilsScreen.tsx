import SubMenuComponent from '@/components/SubMenuComponent';
import React from 'react';


const UtilsScreen:React.FC = () => { 
  return (
 
  <SubMenuComponent
  title="Menu de utilidades"
  items={[
    { href: "utils/conversor", text: "Conversor de Unidades", color: "#3582ab", iconName: "swap-horizontal" },
    { href: "utils/areas", text: "Calculadora de áreas", color: "#6EB5FF", iconName: "cube" },
    { href: "utils/trigonometry", text: "Calculadora de razones trigonométricas", color: "#8EB5FF", iconName: "calculator-outline" }
  ]}
/>
  )
}
export default UtilsScreen;