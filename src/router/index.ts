import { createRouter, createWebHistory } from 'vue-router'
import ActorDetail from '../views/ActorDetail.vue'
import ActorListVue from '../views/ActorList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'actorList',
      component: ActorListVue
    },
    {
      path: '/actor/:id',
      name: 'actorDetail',
      component: ActorDetail,
      props: true // Pass route params as props to the component
    }
  ]
})

export default router
