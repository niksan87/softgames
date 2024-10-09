export function convertPoint( value: { x: number, y: number } | number ): [ number, number ] {

    return typeof value === 'number' ? [ value, value ] : [ value.x, value.y ]; 

}