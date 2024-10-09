
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { PixiPlugin } from 'gsap/all';

import { Application } from './app/app';

gsap.config( { nullTargetWarn: false } );
gsap.registerPlugin( PixiPlugin );
PixiPlugin.registerPIXI( PIXI );

window.onload = () => Application.init( {
    targetId: 'app',
    renderer: {
        background: 'black',
        width: window.innerWidth,
        height: window.innerHeight,
        autoDensity: true,
        antialias: true,
        resolution: devicePixelRatio || 1
    },
    safearea: 16 / 9
} );