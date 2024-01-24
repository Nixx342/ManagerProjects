<script setup>
  import { defineProps } from 'vue'
  const props = defineProps(
   {
      type: Object,
      required: true
    }
  )
  const project = props.type
</script>

<template>
  <div>
    {{ project.id }}
  </div>
</template>

<style scoped>

</style>