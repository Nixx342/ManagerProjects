import { createRouter, createWebHistory } from 'vue-router'
const ProjectList = () => import('../components/ProjectList.vue')
const ProjectPage = () => import('../components/ProjectPage.vue')
const NotFound = () => import('../components/NotFound.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'Home',
    component: ProjectList
   },
   {
    path: '/projects/:id',
    name: 'ProjectPage',
    component: ProjectPage,
    props: true
   },
   {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
   }
  ]
})

export default router
