import gsap from 'gsap';

/**
 * Creates and returns a debounced version of the passed function which will only be invoked after the specified delay
 * has elapsed since the last time it was invoked. This implementation uses GSAP's delayedCall for better control with animation frames.
 * 
 * @param fn The function to debounce.
 * @param delay The delay in milliseconds to wait before calling `fn` after the last invocation.
 * @returns A debounced function.
 */
export function debounce<T extends any[]>( fn: ( ...args: T ) => void, delay: number ): ( ...args: T ) => void {

    let timeout: gsap.core.Tween | null = null;

    return function ( ...args: T ) {

        timeout?.kill();
        timeout = gsap.delayedCall( delay / 1000, () => fn( ...args ) );
    
    };

}
