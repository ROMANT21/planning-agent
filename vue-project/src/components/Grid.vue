<template>
    <div v-for="col in props.dim" class="grid" :key="componentKey">
        <div v-for="row in props.dim">
            <div class="space" v-if="positionGrid[props.dim - row][col-1] == true">
                <img class="agent" src="@/assets/corgi.png">
            </div>
            <div class="space" v-else></div>
        </div>   
    </div>

</template>
<style>
/* TODO: FIX CONTAINER SHIFTING */
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
    height: 200%;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Square from '@/components/Square.vue'

const props = defineProps<{
     dim: number,
}>()

var componentKey = ref(0)
const grid: number[][] = new Array<Array<number>>
for (let row = 0; row < props.dim; ++row){
    grid[row] = new Array<number>
    for (let col = 0; col < props.dim; ++col){
        grid[row][col] = col
    }
}

var positionGrid: boolean[][] = new Array<Array<boolean>>
var currPos: number[] = [0, 0]
for (let row = 0; row < props.dim; ++row){
    positionGrid[row] = new Array<boolean>
    for (let col = 0; col < props.dim; ++col){
        positionGrid[row][col] = false
    }
}
positionGrid[currPos[0]][currPos[1]] = true

// Check for when agent moves through user
window.addEventListener('keydown', (e) => {
    positionGrid[currPos[0]][currPos[1]] = false
    // Agent moved up one square
    if (e.key == 'ArrowUp'){
        currPos[0] += 1
    }
    if (e.key == 'ArrowDown'){
        currPos[0] -= 1
    }
    if (e.key == 'ArrowRight'){
        currPos[1] += 1
    }
    if (e.key == 'ArrowLeft'){
        currPos[1] -= 1
    }

    positionGrid[currPos[0]][currPos[1]] = true
        componentKey.value += 1;
    console.log(positionGrid)
    console.log(currPos[1])
})

</script>
