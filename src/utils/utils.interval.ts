import gsap from 'gsap';

export function repeatAction( fn: () => void, interval: number ): void {

    fn();
  
    gsap.delayedCall( interval, repeatAction, [ fn, interval ] );

}