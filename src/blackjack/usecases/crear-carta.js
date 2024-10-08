
/**
 * 
 * @param {String} carta 
 * @param {Number} turno 
 */

export const crearCarta = (carta, turno) => {
    
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);        
}