<template>

    <div class="square">
        <b class="body">
            ({{ xPt }}, {{ yPt }})
        </b>
    </div>

</template>
<style>
.square {
    border-style: solid;
    border-width: thin;
    
}

.body {
    font-style: normal;
    padding: auto;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'

// Define x and y coordinates
const props = defineProps<{
     xPt: number,
     yPt: number,
}>()
const xPt = ref<number>(props.xPt)
const yPt = ref<number>(props.yPt)

</script>
