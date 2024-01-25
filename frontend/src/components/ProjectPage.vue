<script setup>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import axios from 'axios'
  const route = useRoute()
  const id = route.params.id

  const tasks = ref([])
  axios.get(`/tasks/${id}`)
  // axios.get(`/api/tasks/${route.params.id}`)
  .then(response => {
    tasks.value = response.data
    console.log(response);
  })
  .catch(error => {
    console.error(error);
    console.error(error.response);
  })
</script>

<template>
  <!-- <router-link to="/">Назад</router-link> -->
  <div>
    {{ id }}
  </div>
  <ul>
    <li v-for="task in tasks" :key="task.id">
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