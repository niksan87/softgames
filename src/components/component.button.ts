import * as PIXI from 'pixi.js';
import { getTextureFromGraphics } from '../utils/utils.textureFromGraphics';
import { View } from '../utils/utils.view';
import type { SafeArea } from '../app/ts/app.types';
import gsap from 'gsap';

export class Button extends View {

    private bg: PIXI.Graphics;
    private text: PIXI.Text;
    private animating: gsap.core.Tween;

    public constructor( text: string ) {

        super();

        this.createBg();
        this.createText( text );
        this.enable();

    }

    public update( safearea: SafeArea ) {

        this.bg
            .clear()
            .beginFill( 'darkcyan' )
            .drawRoundedRect( -safearea.width * 0.5, -safearea.height * 0.5, safearea.width, safearea.height, safearea.width * 0.1 )
            .endFill();

        this.position.set( safearea.x, safearea.y );
        this.text.style.fontSize = Math.round( safearea.height * 0.25 );

        if( this.text.width > safearea.width * 0.85 ) {

            this.text.style.fontSize *= 0.75;
        
        }
        
        this.text.position.set( this.bg.x, this.bg.y );
    
    }

    private createBg() {

        const graphics = new PIXI.Graphics();

        this.bg = graphics;
        this.addChild( this.bg );
    
    }

    private createText( value: string ) {

        const text = new PIXI.Text( value, { fill: 'yellow', fontWeight: 'bold' } );

        text.anchor.set( 0.5 );
        this.text = text;
        this.addChild( this.text );
    
    }

    public disable() {

        this.interactive = false;
        this.cursor = 'normal';
    
    }

    public enable() {

        this.interactive = true;
        this.cursor = 'pointer';
    
    }

    public initInteraction( handler: Function ) {

        this.once( 'pointerdown', async () => {

            this.disable();
            
            await this?.animating;
            
            handler();

        } );

        this.on( 'pointerover', async () => {

            await this?.animating;

            this.animating = gsap.to( this, { pixi: { scale: 1.1 }, duration: 0.1 } );

        } );

        this.on( 'pointerout', async () => {

            await this?.animating;
            this.animating = gsap.to( this, { pixi: { scale: 1 }, duration: 0.1 } );

        } );
    
    }

}