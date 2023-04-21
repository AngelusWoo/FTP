import * as Phaser from 'phaser';
import Carga from './escenas/carga';
import Nivel1 from "./escenas/nivel1";

const Configuracion = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Carga,Nivel1]
};

export default Configuracion;