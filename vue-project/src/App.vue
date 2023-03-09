<template>
  <div>
    <square v-bind:xPt=0 v-bind:yPt=0></square>
  </div>

  <div>
    <p>Current dimensions of grid: {{ x }} by {{ y }}</p>
    <input type="text" v-model.lazy="dimensions" placeholder="Enter two numbers: x y">
    <input type="submit" @click="onClick">
  </div>
</template>

<script setup lang="ts">
import square from '@/components/square.vue'
import { ref } from 'vue'

const dimensions = ref<string>("")
var x = ref<number>(2)
var y = ref<number>(2)

// TODO: Add error handling for invalid input
const onClick = () => {
  // Parser dimensions into x and y
  x.value = parseInt(dimensions.value.split(" ")[0])
  y.value = parseInt(dimensions.value.split(" ")[1])
}

</script>

