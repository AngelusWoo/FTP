import Constantes from '../constantes';
export default class Carga extends Phaser.Scene {
    //Barras de Carga
    private barraCarga: Phaser.GameObjects.Graphics;
    private barraProgreso: Phaser.GameObjects.Graphics;


    constructor () { super(Constantes.ESCENAS.CARGA); }

    preload (): void {
        this.cameras.main.setBackgroundColor(0x000000); // Color de fondo
        this.creaBarras(); // Crea las barras de carga
        
        //Listener mientras se cargan los assets
        this.load.on('progress', function (value: number) {
              this.barraProgreso.clear();
              this.barraProgreso.fillStyle(0x125555, 1);
              this.barraProgreso.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
              );
            },
            this
        );

        //Listener cuando se hayan cargado todos los Assets  
        this.load.on('complete', ()=> {
                const fuenteJSON = this.cache.json.get(Constantes.FUENTES.JSON);
                this.cache.bitmapFont.add(Constantes.FUENTES.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fuenteJSON));

                this.scene.start(Constantes.ESCENAS.MENU); // Carga MENU
            },
            this
        );

        //--------------------------------------------------------
        this.load.path = 'assets/';

        //Carga los assets del juego        
        this.load.image('logo1', 'phaser3-logo.png');        
        
        //Mapas
        this.load.tilemapTiledJSON(Constantes.MAPAS.NIVEL1.TILEMAPJSON, 'niveles/nivel1.json');
        this.load.image(Constantes.MAPAS.TILESET, 'niveles/nivelestileset.png');

        //Fondo
        this.load.image(Constantes.FONDOS.NIVEL1, 'imagenes/fondos/Brown.png');

        //Fuentes                
        this.load.json(Constantes.FUENTES.JSON, 'fuentes/fuente.json');
        this.load.image(Constantes.FUENTES.IMAGEN, 'fuentes/imagenFuente.png');

        //Jugador
        this.load.atlas(Constantes.JUGADOR.ID, 'imagenes/jugador/ninjafrog.png', 'imagenes/jugador/ninjafrog.json');

        //ObjetoFinal
        this.load.image(Constantes.OBJETOS.FINAL, 'imagenes/objetos/final.png');
    }

    /**
     * Método que crea las barras de progreso
     */
    private creaBarras(): void {
        this.barraCarga = this.add.graphics();
        this.barraCarga.fillStyle(0xffffff, 1);
        this.barraCarga.fillRect(
          this.cameras.main.width / 4 - 2,
          this.cameras.main.height / 2 - 18,
          this.cameras.main.width / 2 + 4,
          20
        );
        this.barraProgreso = this.add.graphics();
      }
}