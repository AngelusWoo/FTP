export default class Nivel1 extends Phaser.Scene
{
    private width: number;
    private height: number;

    private vidas: number;

    constructor ()
    {
        super('Nivel1');
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.vidas = 3;
    }


    preload ()
    {
        
    }

    create ()
    {        
        const logo = this.add.image(400, 70, 'logo1');
        
        const jugarTxt: Phaser.GameObjects.Text = this.add.text(50, this.height/2, 'NIVEL 1', {fontSize:'32px', color:'#FFFFFF'});
        
        const vidasTxt: Phaser.GameObjects.Text = this.add.text(this.width/2, this.height/2, 'VIDAS -', {fontSize:'32px', color:'#FFFFFF'}).setInteractive();

        vidasTxt.on('pointerdown', ()=>{
            this.vidas --;
            this.registry.set('vidas', this.vidas);
            this.events.emit('cambiarvidas');
        });


    }
}