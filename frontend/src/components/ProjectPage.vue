<script setup>
  import { useRoute } from 'vue-router'
  import { reactive, ref } from 'vue'
  import axios from 'axios'
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
    <!-- {{ name.data.project_name }} -->
    {{ name }}
  </div>
  <ul>
    <li v-for="task in tasks.data" :key="task.id">
      id - "{{ task.id }}"
      project_id - "{{ task.project_id }}"
      name - "{{ task.name }}"
      description - "{{ task.description }}"
      priority - "{{ task.priority }}"
    </li>
  </ul>
</template>

<style scoped>

</style>