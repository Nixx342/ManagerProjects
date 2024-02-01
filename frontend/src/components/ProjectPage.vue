<script setup>
  import { useRoute } from 'vue-router'
  import { reactive } from 'vue'
  import axios from 'axios'
  const route = useRoute()
  const id = route.params.id
  const tasks = reactive({data: []});

  let url = `http://localhost:3000/project/${id}`
  // axios.get(url)
  axios.get(`http://localhost:3000/project/${id}`)
  .then(response => {
    tasks.data = response.data.data
  })
  .catch(error => {
    console.log(error)
  })
</script>

<template>
  <!-- <router-link to="/">Назад</router-link> -->
  <div>
    {{ id }}
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