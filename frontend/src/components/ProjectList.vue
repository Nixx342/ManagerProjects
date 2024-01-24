<script setup>
    import { reactive, ref } from 'vue';
    import axios from 'axios';

    const data = reactive({ data: [], loading: ref(true) });

    axios.get('http://localhost:3000')
    .then(response => {
        data.data = response.data.data;
    })
    .catch(error => {
        console.error(error)
    });
</script>

<template>
    <div>
        <div v-if="!data.data">Загрузка...</div>
        <div v-else>
            <router-link v-for="project in data.data" :key="project.id" :to="{name: 'ProjectPage', params: {id: project.id }}">{{ project.project_name }}</router-link>
        </div>


        <!-- <router-link v-else v-for="project in data.data" :key="project.id" :to="{name: 'ProjectPage', params{id: project.id}}">
            <span>{{ project.project_name }}</span>
        </router-link> -->


        <!-- <div v-else v-for="project in data.data" :key="project.id">
        <h1>{{ project.project_name }}</h1>
        <span>{{ project.id }}</span>
        </div> -->
    </div>
</template>

<style scoped>

</style>