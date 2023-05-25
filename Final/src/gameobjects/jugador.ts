import * as Phaser from 'phaser';
import Constantes from '../constantes';
export default class Jugador extends Phaser.Physics.Arcade.Sprite{

    //Control de entrada
    private cursores: Phaser.Types.Input.Keyboard.CursorKeys; // Tecla de cursor
    private teclasWASD: any; //Teclas WASD
    private teclaEspacio: Phaser.Input.Keyboard.Key; //Tecla espacio

    private escena : Phaser.Scene; // Escena a la que se relacionará la clase

    constructor(config: any) {
           super(config.escena, config.x, config.y, config.texture); // Escena, posicion X e Y y textura
        
           this.escena = config.escena;
           //Habilida el objeto Jugador dentro de la escena
           this.escena.physics.world.enable(this); 
           this.escena.add.existing(this);

           this.body.setSize(20,30); // Redimensiona la hitbox del jugador
           this.setCollideWorldBounds(true); // Impide que el jugador salga de la pantalla

           //Control entrada
            this.cursores = this.escena.input.keyboard.createCursorKeys();
            this.teclasWASD = this.escena.input.keyboard.addKeys('W,A,S,D');
            this.teclaEspacio = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

            this.play(Constantes.JUGADOR.ANIMACION.ESPERA); // Empieza animación inicial 
    }

    update(){
        //Control de Movimiento
        if (this.teclasWASD.A.isDown || this.cursores.left.isDown){ // Si se pulsa A o flecha izquierda
            this.setVelocityX(-200); // Mueve al jugador a la izquierda

            if (this.body.blocked.down) // Si el jugador está en una plataforma
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRER, true);

            this.flipX = true;  // Gira al personaje hacia la izquierda

        } else if (this.teclasWASD.D.isDown || this.cursores.right.isDown){ // Si se pulsa D o flecha derecha
            this.setVelocityX(200); // Mueve al jugador a la derecha

            if (this.body.blocked.down) // Si el jugador está en una plataforma
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRER, true);

            this.flipX = false; // Gira al personaje hacia la derecha

        } else { // Si el jugador no está en movimiento
            this.setVelocityX(0);
            this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERA, true);
        }

        if ((this.teclaEspacio.isDown || this.teclasWASD.W.isDown || this.cursores.up.isDown)
            && this.body.blocked.down){ // Si se pulsa Espacio, W o flecha arriba & el jugador está en una plataforma
            this.setVelocityY(-300); // Asciende al jugador
            this.anims.stop(); // Para la animación anterior
            this.setTexture(Constantes.JUGADOR.ID, Constantes.JUGADOR.ANIMACION.SALTO);
        }
        
    }



}