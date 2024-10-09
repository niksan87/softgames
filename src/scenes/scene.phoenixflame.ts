import gsap from 'gsap';
import * as PIXI from 'pixi.js';

import { View } from '../utils/utils.view';
import { randomBetween } from '../utils/utils.randomBetween';

import type { SafeArea } from '../app/ts/app.types';

export class PhoenixFlameScene extends View {

    private particleContainer: PIXI.ParticleContainer;
    private particles: PIXI.AnimatedSprite[] = [];
    private maxParticles: number = 10;
    private fireFrames: PIXI.Texture[] = [];
    private title: PIXI.Text;

    private wood: PIXI.Sprite;

    private direction: number;
    public constructor( parent: PIXI.Container, safearea: SafeArea ) {

        super();

        this.particleContainer = new PIXI.ParticleContainer( this.maxParticles, {
            scale: true,
            position: true,
            rotation: true,
            alpha: true,
        } );
        this.title = new PIXI.Text( 'Phoenix Flame', { fill: 'darkcyan', fontWeight: 'bold', fontVariant: 'small-caps' } );
        this.title.anchor.set( 0.5 );
        this.addChild( this.title );
        parent.addChild( this );
        
        const texture = PIXI.Texture.from( '../../assets/wood.png' );
        
        this.loadFireTexture().then( () => {

            this.wood = new PIXI.Sprite( texture );
            this.wood.anchor.set( 0.5 );
            this.createFireEffect( safearea );
            this.addChild( this.wood, this.particleContainer );

            this.wood.renderable = false;
            this.update( safearea );
        
        } );
    
    }

    public update( safearea: SafeArea ): void {

        this.direction = Math.random();
        this.particleContainer.position.set(
            safearea.x + safearea.width * 0.5,
            safearea.y + safearea.height * 0.6
        );

        this.particleContainer.scale.set( safearea.width * 0.00125 );

        this.wood?.position.set( 
            this.particleContainer.x,
            this.particleContainer.y * 0.975
        );

        this.wood?.scale.set( safearea.width * 0.00025 );
        this.title.style.fontSize = Math.round( safearea.width / 30 );
        this.title.position.set( safearea.x + safearea.width / 2, safearea.y + safearea.height * 0.1 );
    
    }

    private async loadFireTexture(): Promise<void> {

        const texture = PIXI.Texture.from( '../../assets/firetexture.png' );
        const frameWidth = 128; 
        const frameHeight = 128; 
        const cols = 8; 
        const rows = 8; 

        for ( let row = 0; row < rows; row++ ) {

            for ( let col = 0; col < cols; col++ ) {

                const frame = new PIXI.Texture(
                    texture.baseTexture,
                    new PIXI.Rectangle( col * frameWidth, row * frameHeight, frameWidth, frameHeight )
                );

                this.fireFrames.push( frame ); 
            
            }
        
        }
    
    }

    private createFireEffect( safearea: SafeArea ) {

        for ( let i = 0; i < this.maxParticles; i++ ) {

            gsap.to( {}, {
                repeat: -1,
                delay: randomBetween( 0, 5 ) / 10,
                onRepeat: () => {

                    if ( this.particles.length < this.maxParticles ) {

                        this.wood.renderable = true;

                        this.createParticle( safearea );
                    
                    }
                
                }
            } );
        
        }
    
    }

    private async createParticle( safearea: SafeArea ) {

        const particle = new PIXI.AnimatedSprite( this.fireFrames );

        particle.alpha = 1;
        particle.anchor.set( 0.5, 1 );

        particle.loop = true;
        particle.play();
        particle.animationSpeed = 0.5;
        
        this.particleContainer.addChild( particle );
        this.particles.push( particle );

        gsap.fromTo(
            particle,
            {
                pixi: {
                    scale: randomBetween( 5, 10 ) / 10,
                    alpha: 1
                }
            },
            {
                pixi: {
                    scale: '-=.75',
                    y: -randomBetween( safearea.height * 0.075, safearea.height * 0.175 ),
                    x: randomBetween( 0, safearea.width * 0.025 ) * ( this.direction > 0.5 ? -1 : 1 ),
                    alpha: 0,
                    angle: randomBetween( -5, 5 )
                },
                delay: Math.random() / 2,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {

                    this.particleContainer.removeChild( particle );
                    this.particles.splice( this.particles.indexOf( particle ), 1 ); 
            
                }
            } );
    
    }

}
