<script setup>
  import { reactive, ref } from 'vue'
  import axios from 'axios'
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Проекты</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  
</style>