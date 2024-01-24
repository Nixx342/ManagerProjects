<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import ProjectList from './components/ProjectList.vue'
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Проекты (НЕ РАБОТАЕТ РАЗОБРАТЬСЯ)</router-link>
      <!-- <router-link to="/sdflsd">ыва</router-link> -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  
</style>