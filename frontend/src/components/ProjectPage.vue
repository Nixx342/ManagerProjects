<script setup>
  import { useRoute } from 'vue-router'
  import { reactive, ref } from 'vue'
  import axios from 'axios'
  import DnD from './DrugAndDrop.vue'

  const route = useRoute()
  const id = route.params.id
  const tasks = reactive({data: []})
  let name = ref('')

  axios.get(`http://localhost:3000/project/${id}`)
  .then(response => {
    tasks.data = response.data.data
  })
  .catch(error => {
    console.log(error)
  })

  axios.get(`http://localhost:3000/name/${id}`)
  .then(response => {
    name.value = response.data
  })
  .catch(error => {
    console.error(error)
  })

</script>

<template>
  <div>
    {{ name }}
  </div>  
  <DnD />
</template>

<style scoped>
  
</style>