import Vue from 'vue'
import Router from 'vue-router'
import principal from '@/components/principal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'principal',
      component: principal
    }
  ]
})