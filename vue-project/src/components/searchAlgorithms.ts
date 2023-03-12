
export function breadthFirstSearchAlg(startPos: number[], goalPos: number[], grid: number[][]) {    
    // Queue and visited array
    const queue: number[][] = [startPos];
    const visited  = new Set()
    
    while (queue.length > 0){
        const currPos = queue.shift() as number[];
        console.log(currPos)
    }

}

breadthFirstSearchAlg([0,0], [4,5], [[0,0]])