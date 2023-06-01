import * as Phaser from 'phaser';
import Constantes from '../constantes';
import Jugador from '../gameobjects/jugador';
export default class Nivel1 extends Phaser.Scene
{
    private width: number;
    private height: number;

    private vidas: number;
    private puntuacion: number;

    private mapaNivel : Phaser.Tilemaps.Tilemap;
    private conjuntoPatrones: Phaser.Tilemaps.Tileset;
    private capaMapaNivel: Phaser.Tilemaps.TilemapLayer;  

    private imagenFondo: Phaser.GameObjects.TileSprite;

    private jugador: Jugador;


    constructor ()
    {
        super(Constantes.ESCENAS.NIVEL1);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.vidas = 3;
        this.puntuacion = 0;
        //Con el sistema de registro global de variables
        //inicializamos las del juego                
        this.registry.set(Constantes.REGISTRO.VIDAS, this.vidas);        
        this.registry.set(Constantes.REGISTRO.PUNTUACION, this.puntuacion);        

    }


    preload () {}

    create ()
    {        
        const logo = this.add.image(400, 70, 'logo1');
        
        const jugarTxt: Phaser.GameObjects.Text = this.add.text(50, this.height/2, 'NIVEL 1', {fontSize:'32px', color:'#FFFFFF'});
        
        const vidasTxt: Phaser.GameObjects.Text = this.add.text(this.width/2, this.height/2, 'VIDAS -', {fontSize:'32px', color:'#FFFFFF'}).setInteractive();

        vidasTxt.on('pointerdown', ()=>{
            this.vidas --;
            this.registry.set(Constantes.REGISTRO.VIDAS, this.vidas);
            this.events.emit(Constantes.EVENTOS.VIDAS);
        });

        const puntuacionTxt: Phaser.GameObjects.Text  = this.add.text(this.width/2  , this.height/2 + 100 , 'Puntuacion',  { fontSize: '32px', color: '#FFFFFF' })
                                                .setInteractive();         
                                                        
        puntuacionTxt.on('pointerdown', () => {                                                                    
            this.puntuacion++;
            this.registry.set(Constantes.REGISTRO.PUNTUACION, this.puntuacion);
            this.events.emit(Constantes.EVENTOS.PUNTUACION);
        });

        /*Cargar Tilemap*/
        this.mapaNivel = this.make.tilemap({ key: Constantes.MAPAS.NIVEL1.TILEMAPJSON , tileWidth: 16, tileHeight: 16 });
        this.physics.world.bounds.setTo(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels); // Establece los límites físicos del juego que sean los mismos que el del mapa

        //Crear Jugador y aplica las animaciones
        this.mapaNivel.findObject(Constantes.JUGADOR.ID, (d: any) => {           
            this.jugador = new Jugador({
                escena: this, 
                x:d.x,
                y:d.y, 
                textura: Constantes.JUGADOR.ID
            });            
        });

        this.physics.add.collider(this.jugador, this.capaMapaNivel); // Aplica colisiones del jugador y el mapa
        
        // Aplica las texturas del mapa
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(Constantes.MAPAS.TILESET);
        
        this.capaMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.NIVEL1.CAPAPLATAFORMAS, this.conjuntoPatrones);
        this.capaMapaNivel.setCollisionByExclusion([0]); //Añade colisiones al mapa
        
        
        //Fondo
        this.imagenFondo = this.add.tileSprite(0,0,this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels, Constantes.FONDOS.NIVEL1).setOrigin(0,0).setDepth(-1);

        //Animaciones
        this.anims.create({ // Animación de espera
            key: Constantes.JUGADOR.ANIMACION.ESPERA,
            frames:this.anims.generateFrameNames (Constantes.JUGADOR.ID,{prefix: Constantes.JUGADOR.ANIMACION.ESPERA + '-',
            end:10}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({ // Animación de correr
            key: Constantes.JUGADOR.ANIMACION.CORRER, 
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID,{
                prefix:Constantes.JUGADOR.ANIMACION.CORRER + '-',
                end:11 
            }), 
            frameRate:20, // frames por segundo
            repeat: -1 //-1 hace que la animación se repita constantemente
        });

        //las cámaras siguen al jugador
        this.cameras.main.setBounds(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels); //Los límites del mapa van del inicio al fin del mapa
        this.cameras.main.startFollow(this.jugador); // La Cámara sigue al jugador


        //Crea sprite con posición final 
        let objetofinal: any = this.mapaNivel.createFromObjects(Constantes.MAPAS.POSICIONFINAL, {name: Constantes.MAPAS.POSICIONFINAL})[0];                
        this.physics.world.enable(objetofinal); // Habilita el objeto
        objetofinal.body.setAllowGravity(false); // Quita la gravedad del objeto
        objetofinal.setTexture(Constantes.OBJETOS.FINAL); // Indica la textura
        objetofinal.body.setSize(40,50); 
        objetofinal.body.setOffset(10,15); // Mueve la hitbox       
        
        //collisión para final del nivel
        this.physics.add.collider(this.jugador, objetofinal, () => { // Para las escenas de Nivel1 y HUD y nos devuelve a la escena Menu           
            this.scene.stop(Constantes.ESCENAS.NIVEL1);
            this.scene.stop(Constantes.ESCENAS.HUD);
            this.scene.start(Constantes.ESCENAS.MENU);
        });
    }

    update(): void{
        //mover el fondo
        this.imagenFondo.tilePositionY -= 0.4;

        if (parseInt(this.registry.get(Constantes.REGISTRO.VIDAS)) === 0){
            this.scene.stop(Constantes.ESCENAS.NIVEL1);
            this.scene.stop(Constantes.ESCENAS.HUD);
            this.scene.start(Constantes.ESCENAS.MENU);
        }

        this.jugador.update();
    }
}