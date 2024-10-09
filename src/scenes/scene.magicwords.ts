import * as PIXI from 'pixi.js';
import { View } from '../utils/utils.view';
import { SafeArea } from '../app/ts/app.types';
import gsap from 'gsap';
import { randomBetween } from '../utils/utils.randomBetween';
import { randomHex } from '../utils/utils.randomHex';

export class MagicWordsScene extends View {

    private title: PIXI.Text;
    private wordsContainer: PIXI.Container;
    private textOptions: string[] = [ 'Beautiful', 'Programming', 'Pixi.js', 'GSAP', 'Landscape', 'Nature', 'Fire', 'Water' ];
    private safearea: SafeArea;
    private imageCache: Map<string, PIXI.Texture> = new Map();

    public constructor( parent: PIXI.Container, safearea: SafeArea ) {

        super();

        this.safearea = safearea;

        this.title = new PIXI.Text( 'Magic Words - loading', { fill: 'white', fontWeight: 'bold', fontVariant: 'small-caps' } );
        this.title.anchor.set( 0.5 );
        this.addChild( this.title );

        this.wordsContainer = new PIXI.Container();
        this.addChild( this.wordsContainer );
        parent.addChild( this );

        this.update( safearea );

        this.preloadImages( safearea ).then( () => {

            this.startRandomTextAndImages( safearea );
        
        } );
    
    }

    public update( safearea: SafeArea ) {

        this.title.style.fontSize = Math.round( safearea.width / 30 );
        this.title.position.set( safearea.x + safearea.width / 2, safearea.y + safearea.height * 0.1 );
    
    }

    private preloadImages( safearea: SafeArea ): Promise<void> {

        const promises: Promise<void>[] = [];

        for ( let i = 0; i < 10; i++ ) {

            const randomWidth = randomBetween( safearea.width * 0.05, safearea.width * 0.5 );
            const randomHeight = randomBetween( safearea.height * 0.05, safearea.height * 0.5 );
            const imageUrl = `https://picsum.photos/${randomWidth}/${randomHeight}`;

            if ( !this.imageCache.has( imageUrl ) ) {

                const texturePromise = PIXI.Texture.fromURL( imageUrl ).then( ( texture ) => {

                    this.imageCache.set( imageUrl, texture );
                
                } );

                promises.push( texturePromise );
            
            }
        
        }

        return Promise.all( promises ).then( () => {

            this.title.text = 'Magic Words';
        
        } );
    
    }

    private startRandomTextAndImages( safearea: SafeArea ) {

        const updateTextAndImages = () => {

            this.wordsContainer.removeChildren();

            const randomText = this.textOptions[Math.floor( Math.random() * this.textOptions.length )];
            const text = new PIXI.Text( randomText, {
                fontSize: randomBetween( safearea.width * 0.01, safearea.width * 0.1 ),
                fill: randomHex(),
            } );

            text.anchor.set( 0.5 );

            text.position.set(
                randomBetween( safearea.x + text.width / 2, safearea.x + safearea.width - text.width / 2 ),
                randomBetween( safearea.y + text.height / 2, safearea.y + safearea.height - text.height / 2 )
            );

            const imgUrls = Array.from( this.imageCache.keys() );
            const randomUrl = imgUrls[Math.floor( Math.random() * imgUrls.length )];
            const texture = this.imageCache.get( randomUrl )!;
            const image = new PIXI.Sprite( texture );

            image.anchor.set( 0.5 );
            image.width = this.safearea.width * 0.2;
            image.scale.y = image.scale.x;

            image.position.set(
                randomBetween( safearea.x + image.width / 2, safearea.x + safearea.width - image.width / 2 ),
                randomBetween( safearea.y + image.height / 2, safearea.y + safearea.height - image.height / 2 )
            );
            
            this.wordsContainer.addChild( image, text );
        
        };

        gsap.to( {}, { repeat: -1, repeatDelay: 2, onRepeat: updateTextAndImages } );
    
    }

}
