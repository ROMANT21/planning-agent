<template>
  <div :key="dim">
    <Grid :dim=dim></Grid>
  </div>

  <div>
    <p>Current dimensions of grid: {{ dim }} by {{ dim }}</p>
    <input type="number" v-model.lazy="dim" placeholder="Enter two numbers: x y">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Grid from '@/components/Grid.vue'

var dim = ref<number>(4)

</script>

