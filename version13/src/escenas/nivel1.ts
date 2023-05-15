import * as Phaser from 'phaser';
export default class Nivel1 extends Phaser.Scene
{
    private width: number;
    private height: number;

    constructor () { super('Nivel1'); }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    preload () {}

    create ()
    {        
        const logo = this.add.image(400, 70, 'logo1');
        const jugarTxt: Phaser.GameObjects.Text = this.add.text
        (50, this.height/2, 'NIVEL 1', 
        {fontSize:'32px', color:'#FFFFFF'});
    }
}