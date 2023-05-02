import * as Phaser from 'phaser';

export default class Carga extends Phaser.Scene {
    private width: number;
    private height: number;

    constructor() {super('Menu');}

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create() {
        const logo = this.add.image(this.width / 2, 70, 'logo1');
        const jugarTxt: Phaser.GameObjects.Text = this.add.text(50, this.height / 2, 'Jugar', {fontSize: '32px', color: '#FFFFFF'}).setInteractive();
        this.cambiarEscena(jugarTxt, 'Nivel1');
    }

    /**
     * Cuando se pulse sobre el texto, nos llevará a la escena indicada
     * @param jugarTxt 
     * @param arg1 
     */
    cambiarEscena(jugarTxt: Phaser.GameObjects.Text, arg1: string) {
        jugarTxt.on('pointerdown', () => {
            this.scene.start(arg1);
        });
    }
}
