

export function createGrid(width:number, height:number):grid{

    return JSON.parse(JSON.stringify(new Array(height).fill(new Array(width).fill('', 0))))

}