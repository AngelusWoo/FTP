export default class HUD extends Phaser.Scene {
    private vidasTxt : Phaser.GameObjects.Text;

    constructor(){
        super('HUD');
    }

    create(): void{
        const nivel1: Phaser.Scene = this.scene.get('Nivel1');
        nivel1.events.on('cambiarvidas', this.actualizaVidas, this);


        this.vidasTxt = this.add.text(20,20, 'Vidas:3', {fontSize:'32px', color:'#FFFFFF'});


    }

    private actualizaVidas(): void{
        this.vidasTxt.text = "Vidas:" + this.registry.get('vidas');
    }



}