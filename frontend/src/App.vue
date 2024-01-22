<script setup>
import { reactive } from 'vue';
import axios from 'axios';

let data = reactive({ data: [] });

axios.get('http://localhost:3000')
  .then(response => {
    // Обработка успешного ответа
    data.data = response.data.data;
  })
  .catch(error => {
    // Обработка ошибки
    console.error(error)
  });
</script>

<template>
  <div>
    <div v-if="!data.data">Загрузка...</div>
    <div v-else v-for="project in data.data" :key="project.id">
      <h1>{{ project.project_name }}</h1>
      <span>{{ project.id }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>