<template>
    <div>{{ xPt }}{{ yPt }}</div>
</template>


<script setup lang="ts">

const props = defineProps<{
     xPt: number,
     yPt: number
    }>()


</script>