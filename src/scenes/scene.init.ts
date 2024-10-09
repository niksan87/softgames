import * as PIXI from 'pixi.js';
import { Button } from '../components/component.button';
import type { SafeArea } from '../app/ts/app.types';
import { View } from '../utils/utils.view';
import gsap from 'gsap';
import { Application } from '../app/app';
import { AceOfShadowsScene } from './scene.aceofshadows';
import { MagicWordsScene } from './scene.magicwords';
import { PhoenixFlameScene } from './scene.phoenixflame';

export class InitScene extends View {

    private title: PIXI.Text;
    private continueBtn: Button;

    private aceofshadowsBtn: Button;

    private magicwordsBtn: Button;

    private phoenixflameBtn: Button;

    public constructor( parent: PIXI.Container, safearea: SafeArea ) {

        super();

        this.title = new PIXI.Text( 'SOFTGAMES | ASSIGNMENT\nNikolai Stefanov', { fill: 'darkcyan', fontWeight: 'bold', fontVariant: 'small-caps', align: 'center' } );
        this.title.anchor.set( 0.5 );
        this.continueBtn = new Button( 'Continue' );
        
        this.addChild( this.title, this.continueBtn );

        parent.addChild( this );

        this.update( safearea );
        this.continueBtn.initInteraction( async () => {

            gsap.to( this.continueBtn, { pixi: { y: safearea.y + safearea.height * 0.5, scale: 0 }, duration: 0.5, ease: 'power2.inOut' } ); 
            await gsap.to( this.title, { pixi: { y: safearea.y + safearea.height * 0.5, scale: 0 }, duration: 0.5, ease: 'power2.inOut', delay: 0.15 } );

            // Application.windowManager.enterFullScreen();

            this.removeChild( this.title, this.continueBtn );
            this.aceofshadowsBtn = new Button( 'Ace of shadows' );
            this.magicwordsBtn = new Button( 'Magic words' );
            this.phoenixflameBtn = new Button( 'Phoenix flame' );
            this.addChild( this.aceofshadowsBtn, this.magicwordsBtn, this.phoenixflameBtn );

            this.update( safearea );
        
        } );
    
    }

    public update( safearea: SafeArea ) {

        this.title.style.fontSize = Math.round( safearea.width / 30 );
        this.title.position.set( safearea.x + safearea.width / 2, safearea.y + safearea.height * 0.33 );
        this.continueBtn.update( {
            x: this.title.x,
            y: this.title.y + safearea.height * 0.33,
            width: this.title.width * 0.6,
            height: this.title.width * 0.2
        } );


        const btnHeight = safearea.width * 0.08;

        this.magicwordsBtn?.initInteraction( async () => {

            gsap.to( this.phoenixflameBtn, { pixi: { scale: 1.15, alpha: 0 }, duration: 0.25, ease: 'power2.out' } );
            await gsap.to( this.aceofshadowsBtn, { pixi: { scale: 1.15, alpha: 0 }, duration: 0.25, ease: 'power2.out' } );
            await gsap.to( this.magicwordsBtn, { pixi: { y: safearea.y + safearea.height * 0.5, scale: 0 }, duration: 0.5, ease: 'power2.inOut' } ); 
            
            Application.changeScene( MagicWordsScene );
        
        } );

        this.magicwordsBtn?.update( {
            x: safearea.x + safearea.width * 0.5,
            y: safearea.y + safearea.height * 0.5,
            width: safearea.width * 0.24,
            height: btnHeight
        } );

        this.aceofshadowsBtn?.initInteraction( async () => {

            gsap.to( this.phoenixflameBtn, { pixi: { scale: 1.15, alpha: 0 }, duration: 0.25, ease: 'power2.out' } );
            await gsap.to( this.magicwordsBtn, { pixi: { scale: 1.15, alpha: 0 }, duration: 0.25, ease: 'power2.out' } );
            await gsap.to( this.aceofshadowsBtn, { pixi: { y: safearea.y + safearea.height * 0.5, scale: 0 }, duration: 0.5, ease: 'power2.inOut' } ); 
            
            Application.changeScene( AceOfShadowsScene );
        
        } );

        this.aceofshadowsBtn?.update( {
            x: this.magicwordsBtn.x - this.magicwordsBtn.width * 1.25,
            y: this.magicwordsBtn.y,
            width: this.magicwordsBtn.width,
            height: this.magicwordsBtn.height
        } );


        this.phoenixflameBtn?.initInteraction( async () => {

            gsap.to( this.aceofshadowsBtn, { pixi: { scale: 1.15, alpha: 0 }, duration: 0.25, ease: 'power2.out' } );
            await gsap.to( this.magicwordsBtn, { pixi: { scale: 1.15, alpha: 0 }, duration: 0.25, ease: 'power2.out' } );
            await gsap.to( this.phoenixflameBtn, { pixi: { y: safearea.y + safearea.height * 0.5, scale: 0 }, duration: 0.5, ease: 'power2.inOut' } ); 
            
            Application.changeScene( PhoenixFlameScene );
        
        } );
        this.phoenixflameBtn?.update( {
            x: this.magicwordsBtn.x + this.magicwordsBtn.width * 1.25,
            y: this.magicwordsBtn.y,
            width: this.magicwordsBtn.width,
            height: this.magicwordsBtn.height
        } );
    
        gsap.fromTo(
            this.magicwordsBtn,
            {
                pixi: { scale: 0 }
            },
            {
                pixi: { scale: 1 },
                duration: 0.5,
                ease: 'power2.inOut'
            }
        );

        gsap.fromTo(
            this.aceofshadowsBtn,
            {
                pixi: { scale: 0 }
            },
            {
                pixi: { scale: 1 },
                duration: 0.5,
                delay: 0.1,
                ease: 'power2.inOut'
            }
        );

        gsap.fromTo(
            this.phoenixflameBtn,
            {
                pixi: { scale: 0 }
            },
            {
                pixi: { scale: 1 },
                duration: 0.5,
                delay: 0.2,
                ease: 'power2.inOut'
            }
        );
    
    }

}