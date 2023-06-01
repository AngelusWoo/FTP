import * as Phaser from 'phaser';
import Constantes from '../constantes';
export default class GestorDB {
    public datos: any;

    constructor() {
        if (JSON.parse(localStorage.getItem(Constantes.BASEDATOS.NOMBRE))) {
          this.datos = JSON.parse(localStorage.getItem(Constantes.BASEDATOS.NOMBRE));  
        } else {
            this.creaBD();
        }
    } 
    creaBD() {
        let bdinicial = {
            musica: true,
            efectos: true,
            puntuaciones: {
                nivel1: 0
            }
        }

        this.datos = bdinicial;
        localStorage.setItem(Constantes.BASEDATOS.NOMBRE, JSON.stringify(this.datos));

        throw new Error('Method not implemented.');
    }
}