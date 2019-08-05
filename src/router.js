import Vue from 'vue'
import Router from 'vue-router'
import CreateTask from './views/CreateTask.vue'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: CreateTask
    }
  ]
})
