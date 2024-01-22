<script setup>
import { reactive } from 'vue';
import axios from 'axios';

let data = reactive();

axios.get('http://localhost:3000')
  .then(response => {
    // Обработка успешного ответа
    data = response.data;
  })
  .catch(error => {
    // Обработка ошибки
    console.error(error)
  });
</script>

<template>
  <div>
    <!-- <h1>{{ data.data }}</h1> -->
    <!-- // eslint-disable-next-line vue/require-v-for-key -->
    <div v-for="project in data.data" :key="project.id">
      <h1>{{ project.project_name }}</h1>
      <span>{{ project.id }}</span>
    </div>
  </div>
</template>



<style scoped>

</style>