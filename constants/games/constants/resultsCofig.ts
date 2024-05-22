 //estructura historial de juego adivina.
 const resultConfigAdivina = {
    fields: ['intentos', 'tiempo', 'exitoso', 'fecha'],
    labels: ['Intentos', 'Tiempo', 'Éxito', 'Fecha'],
  };
  //estructura de histoial de juego acierta
  const resultConfigAcierta = {
    fields: ['correctas', 'intentos', 'fecha'],
    labels: ['Correctas', 'Intentos', 'Fecha'],
  };

export {resultConfigAdivina,resultConfigAcierta}