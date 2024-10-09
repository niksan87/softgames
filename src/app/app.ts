
import gsap from 'gsap';
import * as PIXI from 'pixi.js';

import type { AppOptions, SafeArea } from './ts/app.types';
import { isDevelopment } from '../utils/utils.isDevelopment';
import { debounce } from '../utils/utils.debounce';
import { InitScene } from '../scenes/scene.init';
import { WindowManager } from '../managers/manager.window';
import type { Scene } from '../scenes/scene';
import type { Constructor } from '../utils/ts/utils.types';

class App {

    public renderer: PIXI.IRenderer;
    public ticker: gsap.Ticker;
    private target: HTMLElement;
    private stage: PIXI.Container;
    private fps: PIXI.Text;
    public windowManager: WindowManager;
    public activeScene: Scene;
    private safearea: SafeArea;


    public init( { renderer, targetId, safearea }: AppOptions ) {

        this.windowManager = new WindowManager();
        
        this.renderer = PIXI.autoDetectRenderer( renderer );

        this.stage = new PIXI.Container();
        this.stage.width = this.renderer.width;
        this.stage.height = this.renderer.height;

        this.target = document.getElementById( targetId )!;
        this.target.appendChild<any>( this.renderer.view );

        this.ticker = gsap.ticker;
        this.ticker.add( () => {

            this.renderer.render( this.stage );
        
        } );

        this.ticker.fps( 60 );
        this.updateSafearea( safearea );
        this.initResponsive();

        if( isDevelopment() ) {

            this.initDevTools();
        
        }
        
        this.initFpsCounter();

        this.updateVisibleSafearea();

        this.changeScene( InitScene );
    
    }

    public changeScene( ctr: Constructor<Scene> ) {

        this.activeScene?.parent?.removeChild( this.activeScene );
        this.activeScene = Reflect.construct( ctr, [ this.stage, this.safearea ] );
        this.activeScene.update( this.safearea );
    
    }

    private updateSafearea( ratio ) {

        this.safearea ??= { x: 0, y: 0, width: 0, height: 0, ratio };

        if( this.windowManager.isLandscape ) {

            this.safearea.height = this.windowManager.height;
            this.safearea.width = this.safearea.height * ratio;
            this.safearea.x = ( this.windowManager.width - this.safearea.width ) / 2;
            this.safearea.y = 0;
        
        } else {

            this.safearea.width = this.windowManager.width;
            this.safearea.height = this.safearea.width / ratio;
            this.safearea.x = 0;
            this.safearea.y = ( this.windowManager.height - this.safearea.height ) / 2;
        
        }
    
    }

    private initResponsive() {

        const onResizeHandler = debounce( ( ) => {

            const { width, height } = this.windowManager;

            this.renderer.resize( width, height );
            this.updateSafearea( this.safearea.ratio );
            this.updateVisibleSafearea();
            this.activeScene.update( this.safearea );

        }, 16.67 );

        this.windowManager.addEventListener( {
            event: 'resize',
            listener: onResizeHandler
        } );

    
    }

    private initFpsCounter() {

        this.fps = new PIXI.Text( '', { fill: 'yellow' } );
        this.stage.addChild( this.fps );
        let fps = 0;
        let lastTime = 0;
        let frameCount = 0;

        this.ticker.add( ( time, delta, frame ) => {

            frameCount++;

            if ( time - lastTime >= 0.5 ) {

                fps = frameCount / ( time - lastTime );
                this.fps.text = `FPS: ${Math.round( fps )}`;

                lastTime = time;
                frameCount = 0;
            
            }
        
        } );

    
    }

    private initDevTools() {

        this.windowManager.setReference( { key: '__PIXI_STAGE__', value: this.stage } );
        this.windowManager.setReference( { key: '__PIXI_RENDERER__', value: this.renderer } );
    
    }

    private updateVisibleSafearea() {

        const exists = !!this.safearea.debug;

        this.safearea.debug ??= new PIXI.Graphics();

        this.safearea.debug
            .clear()
            .beginFill( 'white', 0.1 )
            .drawRect( 0, 0, this.safearea.width, this.safearea.height )
            .endFill();

        this.safearea.debug.position.set(
            this.safearea.x,
            this.safearea.y
        );

        if( !exists ) {

            this.stage.addChild( this.safearea.debug );

        }
    
    }

}

export const Application = new App();