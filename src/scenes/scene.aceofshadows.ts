import gsap from 'gsap';
import * as PIXI from 'pixi.js';

import { Application } from '../app/app';

import { View } from '../utils/utils.view';

import type { SafeArea } from '../app/ts/app.types';

export class AceOfShadowsScene extends View {

    private title: PIXI.Text;
    private cards: PIXI.Sprite[] = [];
    private cardContainer: PIXI.Container;
    private cardTexture: PIXI.Texture;

    
    public constructor( parent: PIXI.Container, safearea: SafeArea ) {

        super();

        this.title = new PIXI.Text( 'Ace of shadows.', { fill: 'darkcyan', fontWeight: 'bold', fontVariant: 'small-caps' } );
        this.title.anchor.set( 0.5 );
        this.addChild( this.title );

        this.cardContainer = new PIXI.Container();
        this.addChild( this.cardContainer );
        parent.addChild( this );

        this.createCardTexture( safearea );
        this.createCardStack( );

        this.update( safearea );

        this.startAnimation( safearea );

    
    }

    public update( safearea: SafeArea ) {

        this.title.style.fontSize = Math.round( safearea.width / 30 );
        this.title.position.set( safearea.x + safearea.width / 2, safearea.y + safearea.height * 0.1 );

        this.cards.forEach( ( card, i ) => {

            card.width = safearea.width * 0.1;
            card.scale.y = card.scale.x;
            card.position.set(
                Math.round( safearea.x + safearea.width * 0.33 ),
                Math.round( safearea.y + safearea.height * 0.5 + i )    
            );
        
        } );
        
    }

    private createCardTexture( safearea: SafeArea ) {

        const cardGraphics = new PIXI.Graphics();
        const width = safearea.width * 0.1;
        const height = safearea.width * 0.15;

        cardGraphics.beginFill( 0xffffff );
        cardGraphics.lineStyle( 2, 0x000000, 0.25 ); 
        cardGraphics.drawRoundedRect( -width * 0.5, -height * 0.5, width, height, 10 ); // Card dimensions with rounded corners
        cardGraphics.endFill();
        
        this.cardTexture = Application.renderer.generateTexture( cardGraphics );
    
    }

    private createCardStack( ) {

        for ( let i = 0; i < 144; i++ ) {

            const card = new PIXI.Sprite( this.cardTexture );
            const color = Math.random() * 0xFFFFFF; // Generate a random hex color

            card.tint = color;
            this.cards.push( card );
            this.cardContainer.addChild( card );
        
        }
    
    }

    private async startAnimation( safearea: SafeArea ) {

        const moveCard = async( i: number ) => {

            const topCard = this.cards[i];

            if ( topCard ) {

                let cardUpdated = false; 
                const time = 2;

                await gsap.to( topCard.position, {
                    x: Math.round( safearea.x + safearea.width * 0.66 ),
                    y: Math.round( safearea.y + safearea.height * 0.5 + this.cards.length - i ),
                    duration: time,
                    delay: time * 0.5, // 1,
                    ease: 'power2.inOut',
                    onUpdate: function() {
    
                        if ( !cardUpdated ) {

                            cardUpdated = true;
                            topCard.parent.setChildIndex( topCard, topCard.parent.children.length - 1 ); // Move the card to the bottom of the stack
                        
                        }
                    
                    }
                } );

                if( this.cards.length > 0 ) {

                    await moveCard( --i );

                }
            
            }
            
        
        };

        await moveCard( this.cards.length - 1 );    
    
    }

}