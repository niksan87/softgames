import type { ListenerConfig } from './ts/manager.window.types';

export class WindowManager {

    private listeners: ListenerConfig[] = [];

    public get width() {

        return window.innerWidth;
        
    }

    public get height() {

        return window.innerHeight;
        
    }

    public get isLandscape() {

        return this.width > this.height;
    
    }

    public setTitle( value: string ): void {

        window.document.title = value;
    
    }

    public setReference( { key, value }: { key: string, value: any } ): void {

        window[key] = value;
    
    }

    public removeReference( alias: string ): void {

        delete window[alias];
    
    }

    public hasEventListener( config: ListenerConfig ): boolean {

        return this.listeners.includes( config );
    
    }

    public addEventListener( config: ListenerConfig ) {

        if ( this.hasEventListener( config ) ) {

            console.error( 'Cannot add event listener because it is already added.', config );
            
            return;
        
        }

        const { event, listener, options } = config;

        this.listeners.push( config );
        window.addEventListener( event, listener, options );
    
    }

    public removeEventListener( config: ListenerConfig ) {

        if ( !this.hasEventListener( config ) ) {

            console.error( 'Cannot remove event listener because it is not added.', config );
            
            return;
        
        }

        const { event, listener, options } = config;

        window.removeEventListener( event, listener, options );
    
    }

    public isBlurred(): boolean {

        return !document.hasFocus();
    
    }

    public enterFullScreen(): void {

        const docEl = document.documentElement as HTMLElement & {
            requestFullscreen?: () => Promise<void>;
            webkitRequestFullscreen?: () => Promise<void>;
            msRequestFullscreen?: () => Promise<void>;
        };

        // Check if the browser supports fullscreen mode
        if ( docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen ) {

            if ( docEl.requestFullscreen ) {

                docEl.requestFullscreen().catch( err => console.error( 'Failed to enter full-screen mode:', err ) );
            
            } else if ( docEl.webkitRequestFullscreen ) { /* Safari */

                docEl.webkitRequestFullscreen().catch( err => console.error( 'Failed to enter full-screen mode:', err ) );
            
            } else if ( docEl.msRequestFullscreen ) { /* IE11 */

                docEl.msRequestFullscreen().catch( err => console.error( 'Failed to enter full-screen mode:', err ) );
            
            }
        
        } else {

            console.warn( 'Full-screen mode is not supported by this browser.' );
        
        }
    
    }

    public exitFullScreen(): void {

        const doc = document as Document & {
            exitFullscreen?: () => Promise<void>;
            webkitExitFullscreen?: () => Promise<void>;
            msExitFullscreen?: () => Promise<void>;
        };

        // Check if the document is in fullscreen mode and can exit
        if ( document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement ) {

            if ( doc.exitFullscreen ) {

                doc.exitFullscreen().catch( err => console.error( 'Failed to exit full-screen mode:', err ) );
            
            } else if ( doc.webkitExitFullscreen ) { /* Safari */

                doc.webkitExitFullscreen().catch( err => console.error( 'Failed to exit full-screen mode:', err ) );
            
            } else if ( doc.msExitFullscreen ) { /* IE11 */

                doc.msExitFullscreen().catch( err => console.error( 'Failed to exit full-screen mode:', err ) );
            
            }
        
        } else {

            console.warn( 'Cannot exit full-screen mode because the document is not in full-screen mode.' );
        
        }
    
    }

    public toggleFullScreen(): void {

        if ( !document.fullscreenElement && // Standard mode
            !document.webkitFullscreenElement && // Safari
            !document.msFullscreenElement ) { // IE11

            this.enterFullScreen();
        
        } else {

            this.exitFullScreen();
        
        }
    
    }

}