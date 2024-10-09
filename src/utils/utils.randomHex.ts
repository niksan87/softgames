export function randomHex(): number {

    const maxVal = 0xFFFFFF;
    const randomNumber = Math.floor( Math.random() * maxVal );
    const randomColor = randomNumber.toString( 16 ).padStart( 6, '0' );
            
    return parseInt( randomColor, 16 );

}