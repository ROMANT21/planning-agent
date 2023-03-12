<template>

    <div class="container">
        <div v-for="col in props.dim" class="grid" :key="componentKey">
            <div v-for="row in props.dim">
                <div class="space" >
                    <img v-if="grid[col-1][props.dim - row] == 1" class="agent" src="@/assets/agent.png">
                    <img v-if="grid[col-1][props.dim - row] == 2" class="obstacle" src="@/assets/obstacle.jfif">
                    <img v-if="grid[col-1][props.dim - row] == 3" class="goal" src="@/assets/goal.png">
                </div>
            </div>   
        </div>
    </div>

    <button @click="sendCommands(breadthFirstSearchAlg(currPos, grid))"></button>
</template>
<style>
/*MOVE TO SEPERATE*/ 
.container{
    display: flex;
}

.settings{

    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-top: 20px;
}

.button{
    display: flex;
    position: relative;

}

/* TODO: FIX GRID SHIFTING */
.grid{
    display: inline-grid;
}

.space {
    border-style: solid;
    border-width: thin;
    padding: 20px;
    width: 20px;
    height: 20px;
}

.agent{

    width: 200%;
    height: 203%;
}

.goal{
    width: 200%;
    height: 203%;
}

.obstacle{
    width: 200%;
    height: 200%;
}

</style>
<script setup lang="ts">
import { ref, onMounted, resolveComponent } from 'vue'


/* 
VALUES FOR GRID:
0 = empty
1 = agent
2 = obstacle
3 = goal
*/ 

// Dimensions of Grid passed from parent component
const props = defineProps<{
     dim: number,
}>()


// Create grid (dim by dim) with all values set to 0 (empty)
const grid: number[][] = new Array<Array<number>>
for (let row = 0; row < props.dim; ++row){
    grid[row] = new Array<number>
    for (let col = 0; col < props.dim; ++col){
        grid[row][col] = 0
    }
}

// Set default agent, goal, and obstacle states
var currPos: number[] = [0, 0]
grid[currPos[0]][currPos[1]] = 1        // Set agent state
grid[props.dim - 1][props.dim - 1] = 3  // Set goal state
grid[1][0] = 2                          // Set obstacle state

// Move Agent, depending on input
var componentKey = ref(0)   // Used to force re-render
window.addEventListener('keydown', (e) => {
    let nextPos: number[] = [currPos[0], currPos[1]]
    // Agent moved up one square
    if (e.key == 'ArrowUp'){
        nextPos[1] += 1
    }
    if (e.key == 'ArrowDown'){
        nextPos[1] -= 1
    }
    if (e.key == 'ArrowRight'){
        nextPos[0] += 1
    }
    if (e.key == 'ArrowLeft'){
        nextPos[0] -= 1
    }

    // Check if agent is out of bounds or hit obstacle
    if (!isPassable(nextPos)){
        return
    }

    // Check if agent is at goal state
    if (isGoalState(nextPos)){
        console.log("GOAL STATE REACHED")
    }

    // Move agent to new position
    grid[currPos[0]][currPos[1]] = 0
    currPos[0] = nextPos[0]
    currPos[1] = nextPos[1]
    grid[currPos[0]][currPos[1]] = 1
    componentKey.value += 1;
})

function isPassable(pos: number[]){
    if (pos[0] < 0 || pos[1] < 0 ||
        pos[0] >= props.dim || pos[1] >= props.dim ||
        grid[pos[0]][pos[1]] == 2){
        return false
    }
    return true
}

function isGoalState(pos: number[]) {
    if (grid[pos[0]][pos[1]] == 3){
        return true
    }
    return false
}

function simulateKeyPress (key: string) {
    // Create keydown event
    return new Promise(resolve =>{
    var event = new KeyboardEvent('keydown', {
            key: key,
            });
        window.dispatchEvent(event);
        console.log(key)
    setTimeout(() => {resolve('')}, 500)
    })
}

async function sendCommands(commands: string[]) {
    // Simulate key presses
    for (let i = 0; i < commands.length; ++i){
        await simulateKeyPress(commands[i])
    }
}

function getAdjacents(currPos: number[], grid: number[][]){
    const adjacents: number[][] = []

    // Check if the agent can move up, down, left, or right
    if (isPassable([currPos[0] + 1, currPos[1]])){
        adjacents.push([currPos[0] + 1, currPos[1]])
    }
    if (isPassable([currPos[0], currPos[1] + 1])){
        adjacents.push([currPos[0], currPos[1] + 1])
    }
    if (isPassable([currPos[0] - 1, currPos[1]])){
        adjacents.push([currPos[0] - 1, currPos[1]])
    }
    if (isPassable([currPos[0], currPos[1] - 1])){
        adjacents.push([currPos[0], currPos[1] - 1])
    }

    return adjacents
}

function breadthFirstSearchAlg(startPos: number[], grid: number[][]) {    
    // Queue and visited array
    const queue: number[][] = [startPos];   // Queue of positions to visit
    const visited  = new Set()              // Set of visited positions
    const path = new Map()             // Map of positions to their parent

    // Start BFS
    while (queue.length > 0){
        const currPos = queue.shift() as number[];
        const adjacents = getAdjacents(currPos, grid);

        // Add adjacents to queue if it hasn't been visited
        for (const adjacent of adjacents){
            
            // Set parent of adjacent
            path.set(adjacent, currPos)  
            
            // Check if adjacent is goal state
            if (grid[adjacent[0]][adjacent[1]] == 3){
                return backtrackPath(path, adjacent)
            }

            // Add adjacent to queue if it hasn't been visited
            if (!visited.has(adjacent.toString())){
                visited.add(adjacent.toString())
                queue.push(adjacent)
            }
        }
    }
    return []
}

function backtrackPath(path: Map<number[], number[]>, goalPos: number[]){
    // Backtrack path from goal state to start state
    let currPos = goalPos
    let commands: string[] = []
    while (path.has(currPos)){
        const parent = path.get(currPos) as number[]
        if (currPos[0] > parent[0]){
            commands.push('ArrowRight')
        }
        if (currPos[0] < parent[0]){
            commands.push('ArrowLeft')
        }
        if (currPos[1] > parent[1]){
            commands.push('ArrowUp')
        }
        if (currPos[1] < parent[1]){
            commands.push('ArrowDown')
        }
        currPos = parent
    }
    commands.reverse()
    return commands
}
</script>
