import _ from 'underscore';
// import {crearDeck as crearNuevoDeck} from './usecases/crear-deck'
import { crearDeck, pedirCarta, valorCarta, crearCarta } from './usecases/exports';

const miModulo = (() => {
  'use strict'

  let deck         = [];
  const tipos      = ['C','D','H','S'],
        especiales = ['A','J','Q','K'];

  let puntosJugadores = [];

  // Referencias del HTML
  const btnPedir   = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo   = document.querySelector('#btnNuevo');

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

  const inicializarJuego = (numJugadores = 2) => {
      deck = crearDeck(tipos, especiales);
      puntosJugadores = [];
      for(let i = 0; i < numJugadores; i++){
          puntosJugadores.push(0);            
      }             
        
      puntosHTML.forEach(elem => elem.innerText = 0);
      divCartasJugadores.forEach(elem => elem.innerHTML = '');      

      btnPedir.disabled   = false;
      btnDetener.disabled = false;
  }
  
  // Turno: 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
      puntosHTML[turno].innerText = puntosJugadores[turno];
      return puntosJugadores[turno];
  }

  const determinarGanador = () => {
      
      const [puntosMinimos, puntosComputadora] = puntosJugadores;
      setTimeout(() => {
          if( puntosComputadora === puntosMinimos ) {
              alert('Nadie gana :(');
          } else if ( puntosMinimos > 21 ) {
              alert('Computadora gana')
          } else if( puntosComputadora > 21 ) {
              alert('Jugador Gana');
          } else {
              alert('Computadora Gana')
          }
      }, 100 );
  }

  // Turno de la computadora
  const turnoComputadora = ( puntosMinimos ) => {
      let puntosComputadora = 0;
      do {
          const carta = pedirCarta(deck);            
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
          crearCarta(carta, puntosJugadores.length - 1);          
        
      } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );
      
      determinarGanador();
  }


  // Eventos
  btnPedir.addEventListener('click', () => {

      const carta = pedirCarta(deck);
      const puntosJugador = acumularPuntos(carta, 0);

      crearCarta(carta, 0);     
     

      if ( puntosJugador > 21 ) {
          console.warn('Lo siento mucho, perdiste');
          btnPedir.disabled   = true;
          btnDetener.disabled = true;
          turnoComputadora( puntosJugador );

      } else if ( puntosJugador === 21 ) {
          console.warn('21, genial!');
          btnPedir.disabled   = true;
          btnDetener.disabled = true;
          turnoComputadora( puntosJugador );
      }

  });


  btnDetener.addEventListener('click', () => {
      btnPedir.disabled   = true;
      btnDetener.disabled = true;

      turnoComputadora( puntosJugadores[0] );
  });

  btnNuevo.addEventListener('click', () => {

      inicializarJuego();              

  });

  return {
      nuevoJuego: inicializarJuego        
  };

})();
